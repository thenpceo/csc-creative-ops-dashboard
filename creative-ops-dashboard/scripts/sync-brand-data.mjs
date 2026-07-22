import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";

const dashboardRoot = resolve(import.meta.dirname, "..");
const workspaceRoot = resolve(dashboardRoot, "..");
const packagesRoot = join(workspaceRoot, "brand-packages");
const publicRoot = join(dashboardRoot, "public", "brands");
const dataRoot = join(dashboardRoot, "src", "data");

const categories = {
  backcountry: "Outdoor",
  "competitive-cyclist": "Cycling",
  "bike-tires-direct": "Cycling",
  "home-consignment-center": "Home",
  "home-designs": "Home",
  "level-nine-sports": "Outdoor",
  motosport: "Moto",
  "one-kings-lane": "Home",
  "seattle-coffee-gear": "Kitchen",
  "steep-and-cheap": "Outdoor",
  "sur-la-table": "Kitchen",
  "western-bikeworks": "Cycling",
  trisports: "Cycling",
};

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function filesIn(path) {
  return existsSync(path) ? readdirSync(path, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => join(path, entry.name)) : [];
}

function colorValues(node, prefix = "") {
  if (!node || typeof node !== "object") return [];
  const colors = [];
  for (const [key, value] of Object.entries(node)) {
    if (value && typeof value === "object" && typeof value.value === "string" && /^#[0-9a-f]{6}$/i.test(value.value)) {
      colors.push({ name: `${prefix}${key}`, value: value.value, confidence: value.confidence ?? "inferred" });
    } else if (value && typeof value === "object") {
      colors.push(...colorValues(value, `${prefix}${key}.`));
    }
  }
  return colors;
}

function chooseColors(tokens) {
  const all = colorValues(tokens.color);
  const preferred = all.filter((item) => item.name.startsWith("brand."));
  const fallback = all.filter((item) => !/text|surface|border/.test(item.name));
  const selected = [...preferred, ...fallback, ...all].filter((item, index, array) => array.findIndex((other) => other.value === item.value) === index);
  return selected.slice(0, 5);
}

function copyAsset(source, brandDest, preferredName) {
  if (!source || !existsSync(source)) return null;
  const targetName = `${preferredName}${extname(source).toLowerCase()}`;
  const target = join(brandDest, targetName);
  copyFileSync(source, target);
  return `/brands/${basename(brandDest)}/${targetName}`;
}

function findFirst(files, pattern) {
  return files.find((file) => pattern.test(basename(file))) ?? null;
}

rmSync(publicRoot, { recursive: true, force: true });
mkdirSync(publicRoot, { recursive: true });
mkdirSync(dataRoot, { recursive: true });

const brands = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const slug = entry.name;
    const packageRoot = join(packagesRoot, slug);
    const brandDoc = readJson(join(packageRoot, "brand.json"));
    const tokens = readJson(join(packageRoot, "tokens.json"));
    const rules = readJson(join(packageRoot, "rules.json"));
    const recipes = readJson(join(packageRoot, "recipes.json"));
    const media = readJson(join(packageRoot, "media.json"));
    const officialFiles = filesIn(join(packageRoot, "media", "official"));
    const marketingFiles = filesIn(join(packageRoot, "media", "marketing-reference"));
    const generatedExampleFiles = filesIn(join(packageRoot, "media", "generated-example"));
    const brandDest = join(publicRoot, slug);
    mkdirSync(brandDest, { recursive: true });

    const logoSource = findFirst(officialFiles, /^logo-primary\./i) ?? findFirst(officialFiles, /^logo-compact\./i);
    const homepageSource = findFirst(officialFiles, /^homepage-audit\./i) ?? findFirst(officialFiles, /historical-homepage-audit/i);
    const heroSource = slug === "one-kings-lane"
      ? findFirst(officialFiles, /summer-escape-hero/i)
      : marketingFiles[0] ?? homepageSource;
    const featureSource = marketingFiles[1] ?? marketingFiles[0] ?? homepageSource;

    const detailAssets = {};
    if (slug === "one-kings-lane") {
      for (const source of officialFiles) {
        const key = basename(source, extname(source));
        detailAssets[key] = copyAsset(source, brandDest, key);
      }
      marketingFiles.slice(0, 8).forEach((source, index) => {
        detailAssets[`social-reference-${index + 1}`] = copyAsset(source, brandDest, `social-reference-${index + 1}`);
      });
      for (const source of generatedExampleFiles) {
        const key = basename(source, extname(source));
        detailAssets[key] = copyAsset(source, brandDest, key);
      }
    }

    const b = brandDoc.brand;
    return {
      slug,
      name: b.name,
      description: b.description,
      proposition: b.proposition,
      signature: b.signature,
      voiceSummary: b.voiceSummary,
      audiences: b.audiences,
      traits: b.traits,
      category: categories[slug] ?? "Retail",
      status: slug === "one-kings-lane" ? "Active" : "Not Active",
      logo: copyAsset(logoSource, brandDest, "logo"),
      homepage: copyAsset(homepageSource, brandDest, "homepage"),
      hero: copyAsset(heroSource, brandDest, "hero"),
      feature: copyAsset(featureSource, brandDest, "feature"),
      detailAssets,
      colors: chooseColors(tokens),
      typography: tokens.typography ?? {},
      shape: tokens.shape ?? {},
      layout: tokens.layout ?? {},
      counts: {
        rules: rules.rules?.length ?? 0,
        recipes: recipes.recipes?.length ?? 0,
        modules: brandDoc.modules?.length ?? 0,
        sources: media.media?.length ?? media.sources?.length ?? media.items?.length ?? 0,
        assets: officialFiles.length + marketingFiles.length + generatedExampleFiles.length,
      },
      packagePath: relative(workspaceRoot, packageRoot),
    };
  })
  .sort((a, b) => {
    if (a.slug === "one-kings-lane") return -1;
    if (b.slug === "one-kings-lane") return 1;
    return a.name.localeCompare(b.name);
  });

writeFileSync(join(dataRoot, "portfolio.generated.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), brands }, null, 2)}\n`);
console.log(`Synced ${brands.length} brand packages into the dashboard.`);
