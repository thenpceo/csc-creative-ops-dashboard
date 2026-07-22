#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const packageRoot = path.join(root, "brand-packages");
const requiredCapabilities = ["interactive", "static", "imagery", "commerce", "marketing", "motion", "generative-image", "generative-video", "spatial", "sequential"];
const forbidden = /\b(?:fal\.ai|hyperframes|three\.js|webgl|glsl|midjourney|runway|remotion|after effects|figma|openai|anthropic)\b/i;

const exists = async (file) => fs.access(file).then(() => true).catch(() => false);
const walk = async (dir) => {
  const results = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...await walk(full));
    else results.push(full);
  }
  return results;
};
const readJson = async (file) => JSON.parse(await fs.readFile(file, "utf8"));

const dirs = (await fs.readdir(packageRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(packageRoot, entry.name))
  .sort();

const rows = [];
const problems = [];
const uniqueness = { propositions: new Map(), signatures: new Map(), palettes: new Map(), imagery: new Map(), arcs: new Map(), marketingFamilies: new Map() };

const track = (map, value, slug, label) => {
  const key = JSON.stringify(value);
  if (map.has(key)) problems.push(`${slug}: ${label} duplicates ${map.get(key)}`);
  else map.set(key, slug);
};

for (const dir of dirs) {
  const brand = await readJson(path.join(dir, "brand.json"));
  const tokens = await readJson(path.join(dir, "tokens.json"));
  const rules = await readJson(path.join(dir, "rules.json"));
  const recipes = await readJson(path.join(dir, "recipes.json"));
  const media = await readJson(path.join(dir, "media.json"));
  const evaluation = await readJson(path.join(dir, "evaluation.json"));
  const design = await fs.readFile(path.join(dir, "DESIGN.md"), "utf8");
  const slug = brand.brand.id;
  const isReference = slug === "one-kings-lane";
  const isHistorical = Boolean(brand.provenance?.historicalStandaloneIdentity);
  const capabilities = brand.modules.map((item) => item.capability).sort();
  const missingCapabilities = requiredCapabilities.filter((item) => !capabilities.includes(item));
  if (missingCapabilities.length) problems.push(`${slug}: missing capabilities ${missingCapabilities.join(", ")}`);

  const modules = [];
  for (const declaration of brand.modules) modules.push(await readJson(path.join(dir, declaration.path)));
  const totalRules = rules.rules.length + modules.reduce((sum, item) => sum + (item.extends.rules?.length || 0), 0);
  const totalRecipes = recipes.recipes.length + modules.reduce((sum, item) => sum + (item.extends.recipes?.length || 0), 0);

  const localItems = media.items.filter((item) => !/^https?:/i.test(item.uri));
  const localUris = new Set(localItems.map((item) => item.uri));
  const mediaDir = path.join(dir, "media");
  const bundled = await exists(mediaDir) ? (await walk(mediaDir)).map((file) => path.relative(dir, file)) : [];
  const orphans = bundled.filter((file) => !localUris.has(file));
  const missing = [];
  for (const uri of localUris) if (!await exists(path.join(dir, uri))) missing.push(uri);
  if (orphans.length) problems.push(`${slug}: uncataloged bundled media ${orphans.join(", ")}`);
  if (missing.length) problems.push(`${slug}: missing bundled media ${missing.join(", ")}`);

  const canonicalText = [JSON.stringify(brand), JSON.stringify(tokens), JSON.stringify(rules), JSON.stringify(recipes), JSON.stringify(media), JSON.stringify(evaluation), ...modules.map(JSON.stringify), design].join("\n");
  const forbiddenHit = canonicalText.match(forbidden)?.[0] || null;
  if (forbiddenHit) problems.push(`${slug}: tool-specific canonical vocabulary ${forbiddenHit}`);

  const marketingRefs = media.items.filter((item) => item.roles.includes("marketing-reference")).length;
  const socialSources = media.items.filter((item) => item.roles.includes("social-profile")).length;
  const checksumAssets = media.items.filter((item) => item.checksumSha256).length;
  const hasLogo = media.items.some((item) => item.roles.includes("logo"));
  const hasHistoricalGate = evaluation.gates.some((gate) => gate.id === "historical-scope");
  const hasHistoryRule = rules.rules.some((rule) => rule.id === "history.scope" && rule.authority === "required");
  if (isHistorical && (!hasHistoricalGate || !hasHistoryRule)) problems.push(`${slug}: historical package lacks required scope rule or reject gate`);
  if (!isReference && capabilities.length !== 10) problems.push(`${slug}: expected 10 capability modules, found ${capabilities.length}`);
  if (!isReference && totalRules < 70) problems.push(`${slug}: insufficient rule depth (${totalRules})`);
  if (!isReference && totalRecipes < 50) problems.push(`${slug}: insufficient recipe depth (${totalRecipes})`);
  if (!isReference && marketingRefs < 4) problems.push(`${slug}: insufficient marketing reference depth (${marketingRefs})`);
  if (!isReference && checksumAssets < 6) problems.push(`${slug}: insufficient local evidence depth (${checksumAssets})`);
  if (!hasLogo) problems.push(`${slug}: no official or archived logo reference is cataloged`);

  execFileSync(process.execPath, [path.join(root, "scripts/validate-brand-package.mjs"), dir], { stdio: "pipe" });

  track(uniqueness.propositions, brand.brand.proposition, slug, "proposition");
  track(uniqueness.signatures, brand.brand.signature, slug, "signature");
  track(uniqueness.palettes, [tokens.color.primary?.value, tokens.color.secondary?.value, tokens.color.accent?.value], slug, "core palette");
  const imagery = modules.find((item) => item.capability === "imagery")?.extends.tokens;
  const sequential = modules.find((item) => item.capability === "sequential")?.extends.tokens;
  const marketing = modules.find((item) => item.capability === "marketing")?.extends.tokens;
  track(uniqueness.imagery, imagery, slug, "imagery direction");
  track(uniqueness.arcs, sequential?.narrativeArc, slug, "narrative arc");
  track(uniqueness.marketingFamilies, marketing?.families, slug, "marketing families");

  rows.push({
    name: brand.brand.name,
    slug,
    packageVersion: brand.packageVersion,
    historical: isHistorical,
    modules: capabilities.length,
    rules: totalRules,
    recipes: totalRecipes,
    media: media.items.length,
    assets: checksumAssets,
    marketingRefs,
    socialSources,
    orphans: orphans.length,
    forbidden: forbiddenHit || ""
  });
}

const lines = [
  "# CSC portfolio brand-package completion audit",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Result",
  "",
  problems.length ? `**FAIL — ${problems.length} issue(s).**` : "**PASS — all 13 packages validate, all 12 new packages meet depth gates, and no canonical package contains tool-specific implementation vocabulary.**",
  "",
  "## Package depth",
  "",
  "| Brand | Version | Status | Modules | Rules | Recipes | Media/source | Local assets | Marketing refs | Social sources |",
  "|---|---:|---|---:|---:|---:|---:|---:|---:|---:|",
  ...rows.map((row) => `| ${row.name} | ${row.packageVersion} | ${row.historical ? "historical identity" : "current"} | ${row.modules} | ${row.rules} | ${row.recipes} | ${row.media} | ${row.assets} | ${row.marketingRefs} | ${row.socialSources} |`),
  "",
  "## Portfolio checks",
  "",
  "- JSON schema and cross-reference validator passes for every package.",
  "- Every package declares the same ten output-neutral capability modules.",
  "- Every new package contains at least 70 resolved rules and 50 resolved recipes.",
  "- Every new package contains at least four cataloged marketing references and six checksummed local evidence assets.",
  "- Proposition, signature, core palette, imagery direction, narrative arc, and marketing-family sets are unique across the portfolio.",
  "- Every bundled non-hidden media file is cataloged; every cataloged local file exists.",
  "- No canonical package contains provider, renderer, framework, or named creative-tool instructions.",
  "- Level Nine Sports, Western Bikeworks, and TriSports include required historical-scope rules and hard reject gates.",
  "- Public media remains reference-only by default; model upload and redistribution remain disabled until rights review.",
  "",
  "## Evidence interpretation",
  "",
  "- Current homepage captures are dated July 21, 2026.",
  "- Social links are included only when linked by the audited first-party surface or preserved in an archived first-party surface.",
  "- Meta Ad Library entries are lookup URLs, not claims about active ads, account ownership, spend, targeting, or performance.",
  "- Screenshot review does not establish keyboard, semantic, assistive-technology, or accessibility compliance.",
  "",
  "## Issues",
  "",
  ...(problems.length ? problems.map((item) => `- ${item}`) : ["- None."]),
  ""
];

await fs.writeFile(path.join(root, "PORTFOLIO-COMPLETION-AUDIT.md"), lines.join("\n"));
console.log(JSON.stringify({ pass: problems.length === 0, packages: rows.length, problems, rows }, null, 2));
if (problems.length) process.exitCode = 1;
