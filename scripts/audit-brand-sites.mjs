import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const dependencyRoot =
  process.env.CODEX_WORKSPACE_NODE_MODULES ||
  "/Users/nicholas/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const require = createRequire(path.join(dependencyRoot, "package.json"));
const { chromium } = require("playwright");

const sites = [
  ["backcountry", "Backcountry", "https://www.backcountry.com"],
  ["competitive-cyclist", "Competitive Cyclist", "https://www.competitivecyclist.com"],
  ["bike-tires-direct", "BikeTiresDirect", "https://www.biketiresdirect.com"],
  ["home-consignment-center", "Home Consignment Center", "https://www.homeconsignmentcenter.com"],
  ["home-designs", "Home Designs", "https://www.cabinetryunlimited.com"],
  ["level-nine-sports", "Level Nine Sports", "https://www.levelninesports.com"],
  ["motosport", "MotoSport", "https://www.motosport.com"],
  ["one-kings-lane", "One Kings Lane", "https://www.onekingslane.com"],
  ["seattle-coffee-gear", "Seattle Coffee Gear", "https://www.seattlecoffeegear.com"],
  ["steep-and-cheap", "Steep & Cheap", "https://www.steepandcheap.com"],
  ["sur-la-table", "Sur La Table", "https://www.surlatable.com"],
  ["western-bikeworks", "Western Bikeworks", "https://www.westernbikeworks.com"],
  ["trisports", "TriSports", "https://www.trisports.com"],
];

const outputRoot = path.resolve("research");
const screenshotRoot = path.join(outputRoot, "screenshots");
await fs.mkdir(screenshotRoot, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

function tally(items, limit = 16) {
  const counts = new Map();
  for (const item of items.filter(Boolean)) counts.set(item, (counts.get(item) || 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

for (const [slug, name, url] of sites) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  const record = { slug, name, requestedUrl: url, capturedAt: new Date().toISOString() };

  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);
    record.status = response?.status() ?? null;
    record.finalUrl = page.url();

    const pageData = await page.evaluate(() => {
      const visible = (el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      };
      const normalize = (value) => String(value || "").trim();
      const all = [...document.querySelectorAll("body *")].filter(visible).slice(0, 2500);
      const styleRows = all.map((el) => {
        const s = getComputedStyle(el);
        return {
          color: normalize(s.color),
          backgroundColor: normalize(s.backgroundColor),
          borderColor: normalize(s.borderColor),
          fontFamily: normalize(s.fontFamily),
          fontSize: normalize(s.fontSize),
          fontWeight: normalize(s.fontWeight),
          lineHeight: normalize(s.lineHeight),
          letterSpacing: normalize(s.letterSpacing),
          borderRadius: normalize(s.borderRadius),
          boxShadow: normalize(s.boxShadow),
        };
      });
      const summarize = (selector, limit = 8) =>
        [...document.querySelectorAll(selector)]
          .filter(visible)
          .slice(0, limit)
          .map((el) => {
            const s = getComputedStyle(el);
            return {
              tag: el.tagName.toLowerCase(),
              text: normalize(el.textContent).replace(/\s+/g, " ").slice(0, 140),
              color: normalize(s.color),
              backgroundColor: normalize(s.backgroundColor),
              fontFamily: normalize(s.fontFamily),
              fontSize: normalize(s.fontSize),
              fontWeight: normalize(s.fontWeight),
              lineHeight: normalize(s.lineHeight),
              letterSpacing: normalize(s.letterSpacing),
              textTransform: normalize(s.textTransform),
              borderRadius: normalize(s.borderRadius),
              border: normalize(s.border),
              padding: normalize(s.padding),
              boxShadow: normalize(s.boxShadow),
            };
          });

      const variables = {};
      const roots = [document.documentElement, document.body].filter(Boolean);
      for (const root of roots) {
        const computed = getComputedStyle(root);
        for (const prop of computed) {
          if (!prop.startsWith("--")) continue;
          const value = normalize(computed.getPropertyValue(prop));
          if (value && /(color|font|radius|space|gap|shadow|brand|primary|secondary|accent|background|foreground)/i.test(prop)) {
            variables[prop] = value;
          }
        }
      }

      return {
        title: document.title,
        lang: document.documentElement.lang || null,
        description: document.querySelector('meta[name="description"]')?.content || null,
        themeColor: document.querySelector('meta[name="theme-color"]')?.content || null,
        logoCandidates: [...document.querySelectorAll('img[alt*="logo" i], header img, [class*="logo" i] img')]
          .filter(visible)
          .slice(0, 8)
          .map((img) => ({ alt: img.alt || null, src: img.currentSrc || img.src || null })),
        variables,
        headings: summarize("h1, h2, h3", 12),
        controls: summarize('button, [role="button"], input[type="submit"], a[class*="button" i], a[class*="btn" i]', 12),
        body: summarize("body", 1)[0] || null,
        samples: styleRows,
      };
    });

    record.title = pageData.title;
    record.description = pageData.description;
    record.themeColor = pageData.themeColor;
    record.logoCandidates = pageData.logoCandidates;
    record.variables = pageData.variables;
    record.headings = pageData.headings;
    record.controls = pageData.controls;
    record.body = pageData.body;
    record.palette = tally(
      pageData.samples.flatMap((row) => [row.color, row.backgroundColor, row.borderColor]).filter(
        (value) => value && value !== "rgba(0, 0, 0, 0)" && value !== "transparent"
      ),
      24
    );
    record.fontFamilies = tally(pageData.samples.map((row) => row.fontFamily), 12);
    record.fontSizes = tally(pageData.samples.map((row) => row.fontSize), 12);
    record.fontWeights = tally(pageData.samples.map((row) => row.fontWeight), 8);
    record.radii = tally(pageData.samples.map((row) => row.borderRadius), 12);
    record.shadows = tally(
      pageData.samples.map((row) => row.boxShadow).filter((value) => value && value !== "none"),
      8
    );

    const screenshotPath = path.join(screenshotRoot, `${slug}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    record.screenshot = path.relative(outputRoot, screenshotPath);
  } catch (error) {
    record.error = String(error?.message || error);
    record.finalUrl = page.url();
  } finally {
    results.push(record);
    await context.close();
  }
}

await browser.close();
await fs.writeFile(path.join(outputRoot, "brand-site-audit.json"), `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results.map(({ slug, status, finalUrl, title, error }) => ({ slug, status, finalUrl, title, error })), null, 2));
