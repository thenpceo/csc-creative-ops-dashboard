#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const packageArg = process.argv[2];

if (!packageArg) {
  console.error("Usage: node scripts/validate-brand-package.mjs <brand-package-directory>");
  process.exit(2);
}

const packageDir = resolve(process.cwd(), packageArg);
const errors = [];
const warnings = [];
const parsed = new Map();

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function loadJson(relativePath) {
  const absolutePath = join(packageDir, relativePath);
  if (!existsSync(absolutePath)) {
    fail(`Missing file: ${relativePath}`);
    return null;
  }

  try {
    const value = JSON.parse(readFileSync(absolutePath, "utf8"));
    parsed.set(relativePath, value);
    return value;
  } catch (error) {
    fail(`Invalid JSON in ${relativePath}: ${error.message}`);
    return null;
  }
}

function assertUnique(items, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item?.id) {
      fail(`${label} contains an item without an id`);
      continue;
    }
    if (seen.has(item.id)) fail(`Duplicate ${label} id: ${item.id}`);
    seen.add(item.id);
  }
  return seen;
}

function flattenTokenPaths(value, prefix = "") {
  const paths = new Set();
  if (!value || typeof value !== "object" || Array.isArray(value)) return paths;

  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    paths.add(path);
    if (child && typeof child === "object" && !Array.isArray(child)) {
      for (const nested of flattenTokenPaths(child, path)) paths.add(nested);
    }
  }
  return paths;
}

function walk(value, visitor, path = "$") {
  visitor(value, path);
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visitor, `${path}[${index}]`));
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) walk(child, visitor, `${path}.${key}`);
  }
}

const requiredCore = ["brand.json", "tokens.json", "rules.json", "recipes.json", "media.json", "evaluation.json", "DESIGN.md"];
for (const file of requiredCore) {
  if (!existsSync(join(packageDir, file))) fail(`Missing required core file: ${file}`);
}

const brand = loadJson("brand.json");
const tokens = loadJson("tokens.json");
const rules = loadJson("rules.json");
const recipes = loadJson("recipes.json");
const media = loadJson("media.json");
const evaluation = loadJson("evaluation.json");

if (brand?.schemaVersion !== "1.0.0") fail("brand.json schemaVersion must be 1.0.0");
if (!brand?.packageVersion) fail("brand.json packageVersion is required");

const coreFiles = brand?.files ?? {};
for (const [key, path] of Object.entries(coreFiles)) {
  if (!existsSync(join(packageDir, path))) fail(`brand.json files.${key} does not resolve: ${path}`);
}

const moduleDocuments = [];
for (const descriptor of brand?.modules ?? []) {
  const module = loadJson(descriptor.path);
  if (!module) continue;
  moduleDocuments.push({ path: descriptor.path, value: module });
  if (module.capability !== descriptor.capability) {
    fail(`Capability mismatch for ${descriptor.path}: ${descriptor.capability} != ${module.capability}`);
  }
}

const declaredModulePaths = new Set((brand?.modules ?? []).map((entry) => entry.path));
const modulesDir = join(packageDir, "modules");
if (existsSync(modulesDir)) {
  for (const name of readdirSync(modulesDir).filter((name) => name.endsWith(".json"))) {
    const relativePath = `modules/${name}`;
    if (!declaredModulePaths.has(relativePath)) warn(`Undeclared module file: ${relativePath}`);
  }
}

const ruleItems = [...(rules?.rules ?? []), ...moduleDocuments.flatMap(({ value }) => value.extends?.rules ?? [])];
const recipeItems = [...(recipes?.recipes ?? []), ...moduleDocuments.flatMap(({ value }) => value.extends?.recipes ?? [])];
const mediaItems = media?.items ?? [];

const ruleIds = assertUnique(ruleItems, "rule");
const recipeIds = assertUnique(recipeItems, "recipe");
const mediaIds = assertUnique(mediaItems, "media");
const referencableBehaviorIds = new Set([...ruleIds, ...recipeIds]);

for (const rule of ruleItems) {
  for (const sourceId of rule.sourceIds ?? []) {
    if (!mediaIds.has(sourceId)) fail(`Rule ${rule.id} references missing source/media id: ${sourceId}`);
  }
}

for (const recipe of recipeItems) {
  for (const reference of recipe.ruleRefs ?? []) {
    if (!referencableBehaviorIds.has(reference)) fail(`Recipe ${recipe.id} references missing rule or recipe id: ${reference}`);
  }
}

for (const { path, value } of moduleDocuments) {
  for (const selector of value.extends?.mediaSelectors ?? []) {
    if (!mediaIds.has(selector)) fail(`${path} references missing media selector: ${selector}`);
  }
}

const tokenPaths = flattenTokenPaths(tokens);
for (const { path, value } of moduleDocuments) {
  walk(value.extends?.tokens, (candidate, candidatePath) => {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return;
    for (const [key, tokenRef] of Object.entries(candidate)) {
      if (!key.endsWith("Ref") || typeof tokenRef !== "string") continue;
      if (!tokenPaths.has(tokenRef)) fail(`${path} ${candidatePath}.${key} references missing token: ${tokenRef}`);
    }
  });
}

for (const item of mediaItems) {
  if (/^https?:\/\//.test(item.uri)) continue;
  const assetPath = join(packageDir, item.uri);
  if (!existsSync(assetPath)) {
    fail(`Media ${item.id} does not resolve: ${item.uri}`);
    continue;
  }
  if (item.checksumSha256 && statSync(assetPath).isFile()) {
    const actual = createHash("sha256").update(readFileSync(assetPath)).digest("hex");
    if (actual !== item.checksumSha256) fail(`Checksum mismatch for ${item.id}`);
  }
}

for (const [relativePath, document] of parsed) {
  const schemaPath = document?.$schema;
  if (!schemaPath) {
    fail(`${relativePath} is missing $schema`);
    continue;
  }
  if (!/^https?:\/\//.test(schemaPath)) {
    const resolvedSchema = resolve(dirname(join(packageDir, relativePath)), schemaPath);
    if (!existsSync(resolvedSchema)) fail(`${relativePath} schema does not resolve: ${schemaPath}`);
  }
}

const weights = evaluation?.dimensions?.map((dimension) => dimension.weight) ?? [];
const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
if (Math.abs(weightTotal - 1) > 0.000001) fail(`Evaluation weights must sum to 1; found ${weightTotal}`);

const designText = existsSync(join(packageDir, "DESIGN.md")) ? readFileSync(join(packageDir, "DESIGN.md"), "utf8") : "";
if (brand?.packageVersion && !designText.includes(`Package version: **${brand.packageVersion}**`)) {
  fail("DESIGN.md package version does not match brand.json");
}

const forbiddenToolTerms = [
  { label: "named generation provider", pattern: /fal\.ai/gi },
  { label: "named motion tool", pattern: /hyperframes/gi },
  { label: "named web framework", pattern: /tailwind/gi },
  { label: "named 3D framework", pattern: /three\.js/gi },
  { label: "named browser rendering API", pattern: /webgl/gi },
  { label: "named shader language", pattern: /\bglsl\b/gi }
];

for (const file of ["brand.json", "tokens.json", "rules.json", "recipes.json", "media.json", "evaluation.json", "DESIGN.md", ...moduleDocuments.map(({ path }) => path)]) {
  const contents = readFileSync(join(packageDir, file), "utf8");
  for (const forbidden of forbiddenToolTerms) {
    if (forbidden.pattern.test(contents)) fail(`${file} contains tool-specific term: ${forbidden.label}`);
    forbidden.pattern.lastIndex = 0;
  }
}

if (warnings.length) {
  console.log("Warnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Validated ${brand.brand.name} package ${brand.packageVersion}`);
console.log(`- ${ruleItems.length} rules`);
console.log(`- ${recipeItems.length} recipes`);
console.log(`- ${mediaItems.length} media/source records`);
console.log(`- ${moduleDocuments.length} capability modules`);
console.log(`- ${mediaItems.filter((item) => item.checksumSha256).length} checksummed local assets`);
