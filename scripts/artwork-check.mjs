import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { chromium } from "playwright";
import { root, loadContent } from "./content.mjs";
import { packageSite } from "./package-site.mjs";

const { catalog, play } = loadContent();
const production = JSON.parse(fs.readFileSync(path.join(root, "docs/art-production/20261020/production.json")));
const site = packageSite();
const output = path.join(root, ".artifacts/qa-artwork");
fs.mkdirSync(output, { recursive: true });
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" };
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = path.resolve(site, `.${pathname === "/" ? "/index.html" : pathname}`);
  if (!file.startsWith(site + path.sep) || !fs.existsSync(file)) { response.writeHead(404); response.end(); return; }
  response.setHeader("Content-Type", mime[path.extname(file)] || "text/plain");
  response.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: "msedge" } : {}) });

function sharedResult(item) {
  const source = play[item.id];
  if (source.type === "chat") return item.key;
  if (source.type === "bingo") return `bingo-${{ "count-low": 4, "count-mid": 7, "count-high": 12 }[item.key]}-0`;
  if (source.type === "battery") return `battery-${{ perfect: 100, close: 95, wild: 60 }[item.key]}`;
  if (source.type === "daily") return "box-0&date=2026-10-20";
  if (source.type === "ranking") return `rank-${item.key}`;
  if (source.type === "allocation") return `energy-${item.key}-${source.buckets.map(bucket => bucket.id === item.key ? 100 : 0).join("-")}`;
  if (source.type === "story") return `story-${item.key}`;
  if (source.type === "trash") return "trash-done";
  if (source.type === "roulette") return "roulette-4";
  throw new Error("Unknown play type");
}
const cases = [{ label: "home", href: "/" }, { label: "search", href: "/search.html" }, ...production.assets.map(item => ({
  label: `${item.id}-${item.key || "intro"}`, art: item.file,
  href: item.key ? (play[item.id] ? `/play/${item.id}.html?result=${sharedResult(item)}` : `/results/${item.id}-${item.key}.html`) : `/${catalog.byId[item.id].href.replace(/^\.\//, "")}`
}))];
const screenshots = new Set(["home", "search", "test-020-intro", "test-020-crowd", "test-020-recharge", "procrastination-bingo-intro", "procrastination-bingo-count-low", "procrastination-bingo-count-high", "test-022-intro", "test-022-open", "test-022-sparkle", "test-015-intro", "test-015-cozy", "test-015-minimal", "campus-festival-story-intro", "campus-festival-story-mischief"]);
const report = { passed: false, widths: [390, 1440], screens: [], issues: [] };
try {
  for (const width of report.widths) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.route("**/*", route => route.request().url().startsWith("http://127.0.0.1:") ? route.continue() : route.abort());
    let errors = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const item of cases) {
      errors = [];
      await page.goto(`http://127.0.0.1:${server.address().port}${item.href}`);
      await page.locator("h1").first().waitFor();
      const state = await page.evaluate(async () => {
        await document.fonts.ready;
        const images = [...document.querySelectorAll('img[src*="assets/images/covers/"]')];
        for (const image of images) image.loading = "eager";
        await Promise.all(images.map(image => image.decode()));
        const reading = document.querySelector(".result-reading");
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          art: images.map(image => ({ src: image.getAttribute("src"), width: image.naturalWidth, height: image.naturalHeight, fit: getComputedStyle(image).objectFit, boxWidth: image.getBoundingClientRect().width, boxHeight: image.getBoundingClientRect().height })),
          shareAfterReading: !reading || Boolean(reading.compareDocumentPosition(document.querySelector(".result-share-row")) & Node.DOCUMENT_POSITION_FOLLOWING)
        };
      });
      assert.equal(state.overflow, false, item.label);
      assert.ok(state.shareAfterReading, item.label);
      assert.deepEqual(errors, [], item.label);
      if (item.art) assert.ok(state.art.some(art => art.src.endsWith(item.art)), item.label);
      for (const art of state.art) {
        assert.equal(art.width / art.height, 1.5, art.src);
        if (art.fit === "cover") assert.ok(Math.abs(art.boxWidth / art.boxHeight - 1.5) < .02, `Cropped: ${art.src}`);
      }
      if (screenshots.has(item.label)) {
        await page.screenshot({ path: `${output}/${item.label}-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${output}/${item.label}-${width}-viewport.png` });
      }
      report.screens.push({ label: item.label, width, ...state });
    }
    await page.close();
  }
  report.passed = true;
  console.log(`Passed ${report.screens.length} artwork screens`);
} catch (error) {
  report.issues.push(error.stack);
  throw error;
} finally {
  fs.writeFileSync(`${output}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
  server.close();
}
