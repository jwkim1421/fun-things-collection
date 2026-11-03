import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { chromium, webkit, devices } from "playwright";
import { root, loadContent } from "./content.mjs";
import { packageSite } from "./package-site.mjs";

// Desktop engine emulation only. This does not certify phones or app delivery.
const useWebKit = process.argv.includes("--webkit");
const live = process.argv.includes("--live");
const engine = useWebKit ? "webkit" : "chromium";
const sizes = useWebKit
  ? [[320, 568], [375, 667], [390, 844], [430, 932], [844, 390], [768, 1024]]
  : [[360, 740], [393, 873], [412, 915], [873, 393], [800, 1280]];
const output = path.join(root, ".artifacts", `qa-mobile-${engine}${live ? "-live" : ""}`);
fs.mkdirSync(output, { recursive: true });
const reportFile = path.join(output, "report.json");
const previous = process.argv.includes("--resume") && fs.existsSync(reportFile) ? JSON.parse(fs.readFileSync(reportFile)) : null;
if (fs.existsSync(reportFile)) fs.copyFileSync(reportFile, path.join(output, `report-${Date.now()}.json`));
const data = loadContent();
const playResults = JSON.parse(fs.readFileSync(path.join(root, "docs/art-production/20261020/production.json"))).assets.filter(item => data.play[item.id] && item.key);
function sharedPlayResult(item) {
  const content = data.play[item.id];
  switch (content.type) {
    case "chat": return item.key;
    case "bingo": return `bingo-${{ "count-low": 4, "count-mid": 7, "count-high": 12 }[item.key]}-0`;
    case "battery": return `battery-${{ perfect: 100, close: 95, wild: 60 }[item.key]}`;
    case "daily": return "box-0&date=2026-10-26";
    case "ranking": return `rank-${item.key}`;
    case "allocation": return `energy-${item.key}-${content.buckets.map(bucket => bucket.id === item.key ? 100 : 0).join("-")}`;
    case "story": return `story-${item.key}`;
    case "trash": return "trash-done";
    case "roulette": return "roulette-4";
    default: throw new Error(`Unknown play type: ${content.type}`);
  }
}
const site = live ? null : packageSite();
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml" };
const server = live ? null : createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = path.resolve(site, `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`);
  if (!file.startsWith(site + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404); response.end(); return;
  }
  response.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
  response.end(fs.readFileSync(file));
});
if (server) await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = live ? "https://coocooing.kro.kr" : `http://127.0.0.1:${server.address().port}`;
const browser = await (useWebKit ? webkit : chromium).launch({ headless: true, ...(!useWebKit && process.platform === "win32" ? { channel: "msedge" } : {}) });
const report = previous || {
  startedAt: new Date().toISOString(), target: base, engine, version: browser.version(),
  device: "desktop engine with mobile profile, touch and viewport emulation; no physical devices",
  externalServices: "blocked; Kakao SDK substituted for payload inspection; no messages sent",
  sizes, flows: [], resultViews: [], sharing: [], layouts: 0, blockedWrites: [], issues: [], passed: false
};
assert.equal(report.target, base);
assert.equal(report.engine, engine);
assert.deepEqual(report.sizes, sizes);
assert.deepEqual(report.issues, [], "Resolve failures before resuming a report");
if (previous) {
  report.resumedAt = new Date().toISOString();
  report.passed = false;
  delete report.finishedAt;
}
const resourceCache = new Map();
const save = () => fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
save();
let page, sizeLabel;
async function layout(label, screenshot = false) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.querySelectorAll('img[src*="assets/images/covers/"]')];
    images.forEach(image => { image.loading = "eager"; });
    await Promise.all(images.map(image => image.decode()));
  });
  const state = await page.evaluate(() => {
    const visible = element => element.getClientRects().length && getComputedStyle(element).visibility !== "hidden";
    const reading = document.querySelector(".result-reading");
    const sharing = document.querySelector(".result-sharing");
    const a = reading?.getBoundingClientRect(), b = sharing?.getBoundingClientRect();
    const skipLink = document.querySelector(".skip-link");
    return {
      overflow: document.documentElement.scrollWidth > innerWidth + 2,
      gradients: [...document.querySelectorAll("*")].some(element => visible(element) && getComputedStyle(element).backgroundImage.includes("gradient(")),
      readingBeforeSharing: !a || !b || a.bottom <= b.top,
      images: [...document.querySelectorAll('img[src*="assets/images/covers/"]')].every(image => image.naturalWidth > 0),
      skipLinkHidden: !skipLink || skipLink === document.activeElement || skipLink.getBoundingClientRect().bottom <= 0,
      shareButtons: [...document.querySelectorAll(".result-share-row button, .play-share-actions button")].map(button => {
        const r = button.getBoundingClientRect();
        return { id: button.id, width: r.width, height: r.height, visible: visible(button), inside: r.left >= -1 && r.right <= innerWidth + 1 };
      })
    };
  });
  assert.equal(state.overflow, false, `${label}: horizontal overflow`);
  assert.equal(state.gradients, false, `${label}: gradient background`);
  assert.equal(state.readingBeforeSharing, true, `${label}: sharing before explanation`);
  assert.equal(state.images, true, `${label}: missing artwork`);
  assert.equal(state.skipLinkHidden, true, `${label}: unfocused skip link covers the page`);
  for (const button of state.shareButtons) assert.ok(button.visible && button.inside && button.width >= 44 && button.height >= 44, `${label}: inaccessible share button ${JSON.stringify(button)}`);
  report.layouts++;
  if (screenshot) {
    await page.screenshot({ path: path.join(output, `${sizeLabel}-${label}-viewport.png`) });
    await page.screenshot({ path: path.join(output, `${sizeLabel}-${label}.png`), fullPage: true });
  }
}
async function go(href) {
  const url = new URL(href.replace(/^\.\//, ""), `${base}/`);
  url.searchParams.set("qa", "1");
  await page.goto(url.href, { waitUntil: "load" });
}
const action = name => page.locator(`[data-action="${name}"]`);
async function sharing(id) {
  // Chromium and WebKit share the Windows clipboard. Serialize across processes.
  const lock = path.join(root, ".artifacts", "mobile-share.lock");
  const deadline = Date.now() + 60000;
  while (true) {
    try { fs.closeSync(fs.openSync(lock, "wx")); break; }
    catch (error) {
      if (error.code !== "EEXIST" || Date.now() > deadline) throw error;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  try { await sharingUnlocked(id); }
  finally { fs.unlinkSync(lock); }
}
async function sharingUnlocked(id) {
  const row = page.locator(".result-share-row button, .play-share-actions button");
  assert.deepEqual(await row.evaluateAll(buttons => buttons.map(button => button.id)), ["btnCopyResultImage", "btnCopyLink", "btnKakaoShare", "btnInstagramShare"]);
  const entry = { id, size: sizeLabel, imageCopied: false, linkReadBack: false, kakao: "SDK contract only; not sent", instagram: "instructions and PNG only; not posted" };
  await page.locator("#btnCopyResultImage").tap();
  await page.locator("#shareFeedback").waitFor();
  const feedback = await page.locator("#shareFeedback").innerText();
  if (feedback.includes("이미지를 복사했어요")) {
    assert.equal(useWebKit, false, "Update the test to verify WebKit clipboard content before claiming success");
    const png = Buffer.from(await page.evaluate(async () => {
      const items = await navigator.clipboard.read();
      const image = items.find(item => item.types.includes("image/png"));
      return [...new Uint8Array(await (await image.getType("image/png")).arrayBuffer())];
    }));
    assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
    entry.imageCopied = true;
    // A real clipboard paste event, not a replaced clipboard API.
    await page.evaluate(() => {
      const target = document.createElement("div"); target.id = "qa-paste"; target.contentEditable = "true";
      target.addEventListener("paste", event => { window.__qaPasted = [...event.clipboardData.items].some(item => item.type === "image/png"); });
      document.body.appendChild(target); target.focus();
    });
    await page.keyboard.press("Control+V"); await page.waitForFunction(() => window.__qaPasted === true);
    await page.locator("#qa-paste").evaluate(element => element.remove());
    entry.imagePasted = true;
  } else {
    assert.match(feedback, /制限|제한/);
    entry.imageCopyDenied = true;
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: "이미지 내려받기", exact: true }).tap();
    const png = fs.readFileSync(await (await download).path());
    assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
    entry.fallbackPng = true;
  }
  await page.locator("#btnCopyLink").tap();
  await page.waitForFunction(() => document.querySelector("#shareFeedback")?.textContent.includes("링크를 복사했어요"));
  if (!useWebKit) {
    const link = new URL(await page.evaluate(() => navigator.clipboard.readText()));
    assert.equal(link.searchParams.get("utm_source"), "copy_link"); assert.equal(link.searchParams.has("qa"), false);
    entry.linkReadBack = true;
  }
  await page.evaluate(() => {
    window.__qaKakaoPayload = null;
    window.Kakao = { isInitialized: () => true, Share: { uploadImage: async () => ({ infos: [{ original: { url: "https://example.com/qa.png" } }] }), sendDefault: payload => { window.__qaKakaoPayload = payload; } } };
  });
  await page.locator("#btnKakaoShare").tap();
  await page.waitForFunction(() => window.__qaKakaoPayload);
  const payload = await page.evaluate(() => window.__qaKakaoPayload);
  assert.equal(payload.content.imageWidth, 1200); assert.equal(payload.content.imageHeight, 630);
  assert.equal(new URL(payload.content.link.webUrl).searchParams.get("utm_source"), "kakao");
  assert.equal(payload.content.link.webUrl, payload.content.link.mobileWebUrl);
  assert.equal(new URL(payload.content.link.webUrl).searchParams.has("qa"), false);
  await page.locator("#btnInstagramShare").tap();
  await page.locator('#shareFeedback a[href="https://www.instagram.com/"]').waitFor();
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "이미지 내려받기", exact: true }).tap();
  const png = fs.readFileSync(await (await download).path());
  assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
  entry.instagramPng = true;
  report.sharing.push(entry);
  // The received link is opened with QA restored, so this test never records a real start.
  const received = new URL(payload.content.link.webUrl);
  await go(`${received.pathname}${received.search}`);
  await action(id.startsWith("test-") ? "restart-test" : "restart").waitFor();
  await layout(`${id}-received`);
}
async function attempt(label, work) {
  try { await work(); }
  catch (error) {
    report.issues.push({ size: sizeLabel, label, error: error.stack });
    await page.screenshot({ path: path.join(output, `${sizeLabel}-${label}-failure.png`), fullPage: true }).catch(() => {});
  }
  save();
}
try {
  for (const [width, height] of sizes) {
    sizeLabel = `${width}x${height}`;
    const context = await browser.newContext({ ...devices[useWebKit ? "iPhone 13" : "Pixel 7"], viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce", serviceWorkers: "block" });
    if (!useWebKit) await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await context.route("**/*", async route => {
      const request = route.request(), url = new URL(request.url());
      if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
        report.blockedWrites.push({ method: request.method(), host: url.hostname, path: url.pathname });
        return route.abort("blockedbyclient");
      }
      if ((url.origin === base && /\.(?:js|css|png|webp|svg|woff2?)(?:$|\?)/.test(url.href)) || ["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)) {
        // Routes disable the browser HTTP cache. Cache fetched public assets for
        // this run, without substituting local code for production responses.
        if (!resourceCache.has(url.href)) resourceCache.set(url.href, (async () => {
          const response = await route.fetch();
          return { status: response.status(), headers: response.headers(), body: await response.body() };
        })());
        return route.fulfill(await resourceCache.get(url.href));
      }
      if (url.origin === base || url.protocol === "blob:") return route.continue();
      if (url.hostname === "coocoo-api.reviewmoa.workers.dev") return route.fulfill({ contentType: "application/json", body: '{"stats":{}}', headers: { "Access-Control-Allow-Origin": "*" } });
      return route.fulfill({ contentType: request.resourceType() === "stylesheet" ? "text/css" : "text/javascript", body: "" });
    });
    page = await context.newPage(); page.setDefaultTimeout(15000);
    page.on("pageerror", error => report.issues.push({ size: sizeLabel, label: page.url(), error: error.message }));
    page.on("response", response => { if (response.url().startsWith(base) && response.status() >= 400) report.issues.push({ size: sizeLabel, label: response.url(), error: `HTTP ${response.status()}` }); });
    for (const href of ["index.html", "search.html"]) await attempt(href, async () => { await go(href); await layout(href.replace(".html", ""), true); });
    for (const card of data.cards) await attempt(card.id, async () => {
      if (report.flows.some(flow => flow.id === card.id && flow.size === sizeLabel)) return;
      await go(card.href); await action("start-test").waitFor(); await layout(`${card.id}-intro`, card.id === "test-020");
      await action("start-test").tap();
      const questions = data.pages[card.id].questions;
      for (let i = 0; i < questions.length; i++) {
        const answer = page.locator(`[data-action="choose-answer"][data-question-index="${i}"]`).first();
        await answer.waitFor(); await layout(`${card.id}-q${i}`);
        await answer.tap();
        if (i === 0) {
          await page.locator('[data-question-index="1"]').first().waitFor();
          await action("previous-question").tap();
          assert.equal(await page.locator('[data-question-index="0"][data-option-index="0"]').getAttribute("aria-pressed"), "true");
          await page.locator('[data-question-index="0"][data-option-index="0"]').tap();
        }
      }
      await action("restart-test").waitFor(); await layout(`${card.id}-result`, ["test-020", "test-025"].includes(card.id));
      const resultUrl = page.url(); await page.goBack(); await action("choose-answer").first().waitFor();
      await page.goForward(); await action("restart-test").waitFor(); assert.equal(page.url(), resultUrl);
      await sharing(card.id);
      report.flows.push({ id: card.id, size: sizeLabel, type: "quiz", touch: true, historyRestored: true });
    });
    for (const item of data.catalog.playCards) await attempt(item.id, async () => {
      if (report.flows.some(flow => flow.id === item.id && flow.size === sizeLabel)) return;
      await go(item.href); await layout(`${item.id}-intro`); await action("start").tap(); await layout(`${item.id}-play`);
      switch (item.id) {
        case "chat-temperature": for (let i = 0; i < 5; i++) await action("chat-reply").first().tap(); break;
        case "procrastination-bingo": assert.equal(await action("toggle-bingo").count(), 16); await action("toggle-bingo").first().tap(); await action("finish-bingo").tap(); break;
        case "battery-stop": await action("stop-battery").tap(); break;
        case "today-box": await action("choose-box").first().tap(); break;
        case "relationship-ranking": await action("rank-down").first().tap(); await action("finish-ranking").tap(); break;
        case "weekly-energy-budget": {
          const inputs = page.locator("[data-allocation-id]");
          for (let i = 0; i < await inputs.count(); i++) await inputs.nth(i).fill(i === 0 ? "100" : "0");
          await action("finish-allocation").tap(); break;
        }
        case "campus-festival-story": for (let i = 0; i < 4; i++) await action("story-choice").first().tap(); break;
        case "emotion-trash": await page.locator("[data-trash-input]").fill("QA private note"); await action("trash-submit").tap(); break;
        case "choice-roulette": await action("roulette-spin").tap(); break;
        default: throw new Error(`Missing play flow: ${item.id}`);
      }
      await action("restart").waitFor(); await layout(`${item.id}-result`, ["procrastination-bingo", "weekly-energy-budget"].includes(item.id));
      await sharing(item.id);
      report.flows.push({ id: item.id, size: sizeLabel, type: "play", touch: true });
    });
    for (const [id, quiz] of Object.entries(data.pages)) for (const [key, result] of Object.entries(quiz.results)) await attempt(`${id}-${key}`, async () => {
      if (report.resultViews.some(view => view.id === id && view.key === key && view.size === sizeLabel)) return;
      await go(`results/${id}-${key}.html`);
      assert.equal(await page.locator(".result-cover h1").textContent(), result.title);
      assert.equal(await page.locator(".result-reading details").count(), 0);
      await layout(`${id}-${key}`);
      report.resultViews.push({ id, key, size: sizeLabel });
    });
    for (const item of playResults) await attempt(`${item.id}-${item.key}`, async () => {
      if (report.resultViews.some(view => view.id === item.id && view.key === item.key && view.size === sizeLabel)) return;
      await go(`play/${item.id}.html?shared=1&result=${sharedPlayResult(item)}`);
      await action("restart").waitFor();
      assert.ok((await page.locator(".play-result-art").getAttribute("src")).endsWith(item.file), `${item.id}/${item.key}: wrong result artwork`);
      await layout(`${item.id}-${item.key}`);
      report.resultViews.push({ id: item.id, key: item.key, size: sizeLabel });
    });
    console.log(`${engine} ${sizeLabel}: ${report.flows.length} completed flows, ${report.resultViews.length} direct results, ${report.issues.length} issues`);
    await context.close(); save();
  }
  assert.equal(report.flows.length, sizes.length * (data.cards.length + data.catalog.playCards.length));
  assert.equal(report.resultViews.length, sizes.length * (playResults.length + Object.values(data.pages).reduce((sum, quiz) => sum + Object.keys(quiz.results).length, 0)));
  assert.deepEqual(report.blockedWrites, [], "QA unexpectedly attempted a write");
  assert.deepEqual(report.issues, []);
  report.passed = true;
} catch (error) { report.issues.push({ error: error.stack }); }
finally {
  report.finishedAt = new Date().toISOString(); save();
  console.log(JSON.stringify({ passed: report.passed, engine, flows: report.flows.length, resultViews: report.resultViews.length, sharing: report.sharing.length, layouts: report.layouts, issues: report.issues.length }));
  await browser.close(); if (server) await new Promise(resolve => server.close(resolve));
}
if (!report.passed) process.exitCode = 1;
