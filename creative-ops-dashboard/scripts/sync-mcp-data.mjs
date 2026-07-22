#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dashboardRoot = resolve(import.meta.dirname, "..");
const packagesRoot = resolve(dashboardRoot, "..", "brand-packages");
const outputPath = join(dashboardRoot, "mcp", "brand-packages.generated.json");

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

const packages = readdirSync(packagesRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const root = join(packagesRoot, entry.name);
    const brand = readJson(join(root, "brand.json"));
    const modules = Object.fromEntries(
      (brand.modules ?? []).map(({ capability, path }) => [capability, readJson(join(root, path))]),
    );

    return {
      slug: entry.name,
      brand,
      tokens: readJson(join(root, "tokens.json")),
      rules: readJson(join(root, "rules.json")),
      recipes: readJson(join(root, "recipes.json")),
      media: readJson(join(root, "media.json")),
      evaluation: readJson(join(root, "evaluation.json")),
      humanGuide: existsSync(join(root, "DESIGN.md")) ? readFileSync(join(root, "DESIGN.md"), "utf8") : null,
      modules,
    };
  })
  .sort((a, b) => a.brand.brand.name.localeCompare(b.brand.brand.name));

writeFileSync(
  outputPath,
  `${JSON.stringify({ schemaVersion: "1.0.0", generatedAt: new Date().toISOString(), packages }, null, 2)}\n`,
);

console.log(`Compiled ${packages.length} brand packages for the MCP.`);
