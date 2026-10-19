import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chromium } from "playwright";
import { root, escapeHtml as esc } from "./content.mjs";

// Run after build when illustrations or preview text change. Build itself needs no browser.
const browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: "msedge" } : {}) });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const temporary = path.join(root, ".artifacts/preview-render");
const sourceSha256 = createHash("sha256").update(["scripts/artwork.mjs", "scripts/render-previews.mjs"].map((file) => fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n")).join("\n")).digest("hex");
fs.mkdirSync(temporary, { recursive: true });
try {
  for (const [flag, directory] of [["--metadata", "assets/images/og"], ["--result-metadata", "assets/images/og/results"]]) {
    const raw = execFileSync(process.execPath, ["scripts/build-site.mjs", flag], { cwd: root, encoding: "utf8" }).trim();
    const entries = JSON.parse(raw);
    fs.mkdirSync(path.join(root, directory), { recursive: true });
    for (const meta of entries) {
      const cover = pathToFileURL(path.join(root, `assets/images/covers/${meta.id}${meta.key ? `-${meta.key}` : ""}.svg`)).href;
      const artwork = fs.readFileSync(path.join(root, `assets/images/covers/${meta.id}${meta.key ? `-${meta.key}` : ""}.svg`), "utf8");
      const background = artwork.match(/<rect width="720" height="480" fill="([^"]+)"/)[1];
      const html = `<!doctype html><meta charset="utf-8"><style>
        *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#fffdf7;color:#263d37;font-family:"Malgun Gothic","Noto Sans KR",sans-serif;display:grid;grid-template-columns:630px 1fr;gap:44px;align-items:center;padding:0 44px 0 0}
        img{width:630px;height:630px;object-fit:contain;background:${background}}small{font-size:23px;line-height:1.6;color:#596d63}h1{font-size:49px;line-height:1.4;letter-spacing:-2px;margin:20px 0 24px;word-break:keep-all}p{font-size:26px;line-height:1.7;word-break:keep-all;margin:0}.brand{margin-top:40px;font-size:22px;font-weight:bold}span{font-weight:normal;color:#657267;font-size:18px}
        </style><img src="${cover}" alt=""><main><small>${esc(meta.key ? meta.title.split(" · ").slice(1).join(" · ").replace(/ \| 쿠쿠$/, "") : "쿠쿠의 짧은 테스트와 놀이")}</small><h1>${esc(meta.heading)}</h1><p>${esc(meta.description)}</p><div class="brand">쿠쿠 <span>coocooing.kro.kr</span></div></main>`;
      const file = path.join(temporary, "card.html");
      fs.writeFileSync(file, html);
      await page.goto(pathToFileURL(file).href);
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((image) => image.decode())); });
      const fits = await page.evaluate(() => document.querySelector("main").getBoundingClientRect().bottom <= 620 && document.documentElement.scrollWidth <= 1200);
      if (!fits) throw new Error(`Preview text overflows: ${meta.id}/${meta.key || "intro"}`);
      await page.screenshot({ path: path.join(root, meta.image) });
    }
    fs.writeFileSync(path.join(root, directory, "manifest.json"), JSON.stringify({ metadataSha256: createHash("sha256").update(raw).digest("hex"), sourceSha256, count: entries.length, renderer: "flat topic illustration, 1200x630" }, null, 2) + "\n");
    console.log(`Rendered ${entries.length} previews in ${directory}`);
  }
} finally {
  await browser.close();
}
