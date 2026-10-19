import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { chromium, webkit, devices } from "playwright";
import { root, loadContent } from "./content.mjs";
import { packageSite } from "./package-site.mjs";

// Explicit owner-requested mode: these UI starts increment production participation totals.
const liveCounts = process.argv.includes("--live-counts");
const live = process.argv.includes("--live") || liveCounts;
const useWebKit = process.argv.includes("--webkit");
const regressionOnly = process.argv.includes("--regression-only");
const widths = process.argv.includes("--pc-only") ? [1440] : [390, 1440];
if (liveCounts && (useWebKit || regressionOnly)) throw new Error("Run --live-counts separately for the full production check");
const localApi = live ? "" : process.env.COOCOO_TEST_API_URL || "";
if (localApi && !/^http:\/\/(?:127\.0\.0\.1|localhost):\d+$/.test(localApi)) throw new Error("Participation tests require a local API; production writes require --live-counts");
const api = liveCounts ? loadContent().config.communityApiUrl.replace(/\/$/, "") : localApi;
const output = path.join(root, ".artifacts", liveCounts ? "qa-live-counts" : regressionOnly ? "qa-regression" : live ? "qa-live" : useWebKit ? "qa-webkit" : "qa-local");
fs.mkdirSync(output, { recursive: true });
const startedAt = new Date().toISOString();
const scope = liveCounts ? `all content on production (${widths.join(",")}px)` : regressionOnly ? "completion revision regression" : live ? "representative production" : useWebKit ? "representative WebKit" : "all content on packaged site";
if (fs.existsSync(path.join(output, "report.json"))) fs.copyFileSync(path.join(output, "report.json"), path.join(output, `report-${Date.now()}.json`));
fs.writeFileSync(path.join(output, "report.json"), JSON.stringify({ startedAt, scope, passed: false, stage: "setup" }, null, 2));
const site = packageSite();
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml" };
const browser = await (useWebKit ? webkit : chromium).launch({ headless: true, ...(!useWebKit && process.platform === "win32" ? { channel: process.env.COOCOO_BROWSER_CHANNEL || "msedge" } : {}) });
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = path.resolve(site, `.${pathname.endsWith("/") ? `${pathname}index.html` : pathname}`);
  if (!file.startsWith(site + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end("Not found"); return; }
  response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "text/plain; charset=utf-8" });
  response.end(fs.readFileSync(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = live ? "https://coocooing.kro.kr" : `http://127.0.0.1:${server.address().port}`;
const report = { target: base, startedAt, scope, widths, browser: await browser.version(), engine: useWebKit ? "WebKit" : "Chromium", participation: liveCounts ? "observed production API count changes; owner authorized" : api ? "observed local API count changes" : "not exercised", screenshots: [], completedTests: [], completedPlay: [], counts: [], clipboard: [], issues: [] };
if (liveCounts) report.assumptions = ["Exact deltas assume no concurrent participation; mismatches require traffic review before attributing a site defect."];
const attempts = [];
let page;
async function getCount(id) {
  const response = await fetch(`${api}/api/stats?ids=${id}`, { signal: AbortSignal.timeout(15000), cache: "no-store" });
  assert.equal(response.status, 200);
  return (await response.json()).stats[id].participationCount;
}
async function layout(label, screenshot = false) {
  const sizes = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  if (sizes.document > sizes.viewport + 2) report.issues.push(`${label}: overflow ${JSON.stringify(sizes)}`);
  const gradients = await page.evaluate(() => [...document.querySelectorAll("*")].filter((element) => element.getClientRects().length && getComputedStyle(element).backgroundImage.includes("gradient(")).map((element) => `${element.tagName}.${element.className}`).slice(0, 5));
  if (gradients.length) report.issues.push(`${label}: gradient backgrounds ${gradients.join(", ")}`);
  if (screenshot) {
    const name = `${label}.png`;
    await page.screenshot({ path: path.join(output, name), fullPage: true, scale: "css", timeout: 30000 });
    await page.screenshot({ path: path.join(output, `${label}-viewport.png`), scale: "css", timeout: 30000 });
    report.screenshots.push(name);
    if (/^home-(390|1440)$/.test(label)) {
      await page.locator("#cardGrid > a").first().screenshot({ path: path.join(output, `${label}-card.png`), scale: "css", style: ".site-header { visibility: hidden !important; }" });
      await page.locator("#playCardGrid").screenshot({ path: path.join(output, `${label}-play-cards.png`), scale: "css", style: ".site-header { visibility: hidden !important; }" });
    }
  }
}
async function checkClipboard(id, width) {
  await page.locator("#btnCopyResultImage").click();
  await page.locator("#shareFeedback").waitFor();
  if (useWebKit && (await page.locator("#shareFeedback").textContent()).includes("제한")) {
    const downloadEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "이미지 내려받기", exact: true }).click();
    await (await downloadEvent).saveAs(path.join(output, `${id}-fallback-${width}.png`));
    await page.locator("#btnInstagramShare").click();
    await page.locator('#shareFeedback a[href="https://www.instagram.com/"]').waitFor();
    assert.equal(await page.evaluate(() => window.__qaNativeShareCalls), 0);
    await page.locator("#shareFeedback").evaluate((element) => element.remove());
    report.clipboard.push({ id, width, copiedImage: false, platformDenied: true, fallbackDownload: true, instagramLink: true, nativeShareCalls: 0 });
    return;
  }
  assert.match(await page.locator("#shareFeedback").textContent(), /이미지를 복사했어요/);
  const png = await page.evaluate(async () => {
    const items = await navigator.clipboard.read();
    const image = items.find((item) => item.types.includes("image/png"));
    return [...new Uint8Array(await (await image.getType("image/png")).arrayBuffer())];
  });
  const bytes = Buffer.from(png);
  assert.equal(bytes.readUInt32BE(16), 1200); assert.equal(bytes.readUInt32BE(20), 630);
  fs.writeFileSync(path.join(output, `${id}-clipboard-${width}.png`), bytes);
  if (id.startsWith("test-")) {
    const matchesPreview = await page.evaluate(async (data) => {
      const preview = new Image(); preview.src = document.body.dataset.shareImage; await preview.decode();
      const copied = await createImageBitmap(new Blob([new Uint8Array(data)], { type: "image/png" }));
      const pixels = (image) => { const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 630; const ctx = canvas.getContext("2d"); ctx.drawImage(image, 0, 0); return ctx.getImageData(0, 0, 1200, 630).data; };
      const expected = pixels(preview), actual = pixels(copied);
      return expected.every((value, index) => value === actual[index]);
    }, png);
    assert.equal(matchesPreview, true, "Clipboard image differs from crawler preview");
  }
  await page.evaluate(() => {
    window.__qaPastedImage = false;
    const target = document.createElement("div"); target.id = "qaPasteTarget"; target.contentEditable = "true"; target.textContent = "Paste test";
    target.addEventListener("paste", (event) => { window.__qaPastedImage = [...event.clipboardData.items].some((item) => item.type === "image/png"); });
    document.body.appendChild(target); target.focus();
  });
  await page.keyboard.press("Control+V");
  await page.waitForFunction(() => window.__qaPastedImage === true);
  await page.locator("#qaPasteTarget").evaluate((target) => target.remove());
  assert.equal(await page.evaluate(() => window.__qaNativeShareCalls), 0);
  await page.locator("#btnCopyLink").click();
  const link = await page.evaluate(() => navigator.clipboard.readText());
  assert.equal(new URL(link).searchParams.get("utm_source"), "copy_link");
  assert.equal(new URL(link).searchParams.has("qa"), false);
  await page.locator("#btnInstagramShare").click();
  await page.locator('#shareFeedback a[href="https://www.instagram.com/"]').waitFor();
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "이미지 내려받기", exact: true }).click();
  await (await downloadEvent).saveAs(path.join(output, `${id}-instagram-${width}.png`));
  await page.locator("#shareFeedback").evaluate((element) => element.remove());
  report.clipboard.push({ id, width, png: "1200x630", pastedImage: true, linkCopied: true, instagramDownload: true, nativeShareCalls: 0 });
}
try {
  const data = loadContent();
  async function allCounts() {
    const ids = [...data.cards.map((card) => card.id), ...data.catalog.playCards.map((card) => card.id)];
    const response = await fetch(`${api}/api/stats?ids=${ids.join(",")}`, { signal: AbortSignal.timeout(15000), cache: "no-store" });
    assert.equal(response.status, 200);
    return Object.fromEntries(Object.entries((await response.json()).stats).map(([id, stat]) => [id, stat.participationCount]));
  }
  if (liveCounts) report.beforeCounts = await allCounts();
  for (const width of widths) {
    const context = await browser.newContext({ ...(width === 390 ? devices[useWebKit ? "iPhone 13" : "Pixel 7"] : {}), viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    if (!useWebKit) await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await context.addInitScript(() => {
      window.__qaNativeShareCalls = 0;
      Object.defineProperty(navigator, "share", { value: () => { window.__qaNativeShareCalls++; throw new Error("Unexpected OS sharing"); } });
    });
    await context.route("**/*", async (route) => {
      const request = route.request(); const url = new URL(request.url());
      if (live && !["GET", "HEAD", "OPTIONS"].includes(request.method()) && !(liveCounts && url.origin === api && request.method() === "POST" && url.pathname === "/api/participations")) {
        report.issues.push(`Blocked unexpected write: ${request.method()} ${url.origin}${url.pathname}`);
        return route.abort("blockedbyclient");
      }
      if (url.protocol === "blob:" || url.origin === base || ["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname)) return route.continue();
      if (liveCounts && url.origin === api) {
        if (request.method() === "POST") {
          assert.equal(url.pathname, "/api/participations", "Only participation writes are authorized by this check");
          attempts.push(request.postDataJSON());
        }
        return route.continue();
      }
      if (url.hostname === "coocoo-api.reviewmoa.workers.dev" && api) {
        const response = await fetch(`${api}${url.pathname}${url.search}`, { method: request.method(), headers: { "Content-Type": "application/json", Origin: "https://coocooing.kro.kr", "CF-Connecting-IP": width === 390 ? "198.51.100.1" : "198.51.100.2" }, ...(request.postData() ? { body: request.postData() } : {}) });
        if (request.method() === "POST" && url.pathname === "/api/participations") attempts.push(JSON.parse(request.postData()));
        return route.fulfill({ status: response.status, contentType: "application/json", body: await response.text(), headers: { "Access-Control-Allow-Origin": "*" } });
      }
      if (url.hostname === "coocoo-api.reviewmoa.workers.dev") return route.fulfill({ contentType: "application/json", body: '{"stats":{}}', headers: { "Access-Control-Allow-Origin": "*" } });
      return route.fulfill({ contentType: request.resourceType() === "stylesheet" ? "text/css" : "text/javascript", body: "" });
    });
    page = await context.newPage(); page.setDefaultTimeout(15000);
    page.on("pageerror", (error) => report.issues.push(error.message));
    page.on("response", (response) => { if (response.url().startsWith(base) && response.status() >= 400) report.issues.push(`${response.status()}: ${response.url()}`); });
    if (liveCounts) {
      page.on("response", (response) => { if (response.url().startsWith(api) && response.status() >= 400) report.issues.push(`${response.status()}: ${new URL(response.url()).pathname}`); });
      page.on("console", (message) => { if (message.type() === "warning" && /Community stats|participation|Reaction could not/.test(message.text())) report.issues.push(message.text()); });
    }
    const action = (name) => page.locator(`[data-action="${name}"]`);
    const go = async (file, qa = api ? "0" : "1") => {
      await page.goto(`${base}/${file}${file.includes("?") ? "&" : "?"}qa=${qa}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 3000))]));
    };
    async function start(id, button) {
      const before = api ? await getCount(id) : null;
      let displayedBefore = null;
      if (liveCounts && await page.locator(`[data-participation-count="${id}"]`).count()) {
        displayedBefore = `${before.toLocaleString("ko-KR")}회 참여`;
        await page.waitForFunction(({ id, text }) => {
          const label = document.querySelector(`[data-participation-count="${id}"]`);
          return label && !label.hidden && label.textContent === text;
        }, { id, text: displayedBefore });
      }
      const responseEvent = api ? page.waitForResponse((response) => response.url().includes("/api/participations") && response.request().method() === "POST" && response.request().postDataJSON().contentId === id) : null;
      await button.click();
      if (responseEvent) {
        const response = await responseEvent;
        assert.equal(response.status(), 201);
        const responseCount = (await response.json()).participationCount;
        const after = await getCount(id); assert.equal(after, before + 1);
        assert.equal(responseCount, after);
        report.counts.push({ id, width, before, after, responseCount, displayedBefore });
      }
    }
    await go("index.html"); await layout(`home-${width}`, true);
    if (liveCounts) {
      assert.equal(await page.evaluate(() => window.SITE_CONFIG.communityApiUrl), api);
      report.release = await page.evaluate(() => window.SITE_CONFIG.releaseVersion);
    }
    const mascot = await page.locator(".hero-kuku").evaluate((image) => ({ fit: getComputedStyle(image).objectFit, height: image.getBoundingClientRect().height, natural: image.naturalHeight }));
    assert.equal(mascot.fit, "contain"); assert.ok(mascot.height > 60 && mascot.natural > 0);
    const overlap = await page.locator(".play-card").evaluateAll((cards) => cards.some((card) => {
      const time = card.querySelector(".play-card-duration").getBoundingClientRect(), arrow = card.querySelector(".play-card-arrow").getBoundingClientRect();
      return time.right > arrow.left - 2;
    }));
    assert.equal(overlap, false, "Play-card duration overlaps its arrow");
    await go("search.html"); await layout(`search-${width}`, width === 390);
    const cards = regressionOnly ? data.cards.filter((card) => card.id === "test-024") : (live && !liveCounts) || useWebKit ? data.cards.filter((card) => ["test-020", "test-024", "test-025"].includes(card.id)) : data.cards;
    for (const card of cards) {
      const id = card.id;
      await go(card.href.replace(/^\.\//, "")); await action("start-test").waitFor();
      await layout(`${id}-intro-${width}`, id === "test-024");
      await start(id, action("start-test"));
      if (id === "test-020") {
        const first = page.locator('[data-action="choose-answer"][data-question-index="0"]').first();
        if (width === 1440) {
          const normal = await first.evaluate((button) => getComputedStyle(button).backgroundColor);
          await first.hover();
          assert.notEqual(await first.evaluate((button) => getComputedStyle(button).backgroundColor), normal, "PC hover has no feedback");
          await page.mouse.down();
          assert.notEqual(await first.evaluate((button) => getComputedStyle(button).transform), "none", "PC press has no feedback");
          await layout(`test-020-pressed-${width}`, true);
          await page.mouse.up();
        } else await first.click();
        await page.locator('[data-question-index="1"]').first().waitFor();
        await action("previous-question").click();
        assert.equal(await page.locator('[data-question-index="0"][data-option-index="0"]').getAttribute("aria-pressed"), "true");
        await layout(`test-020-restored-${width}`, true);
        if (width === 1440) {
          const selected = page.locator('[data-question-index="0"][data-option-index="0"]');
          await selected.focus(); await page.keyboard.press("Space");
          await page.locator('[data-question-index="1"]').first().waitFor();
          await action("previous-question").click();
        }
      }
      for (let index = 0; index < data.pages[id].questions.length; index++) {
        assert.equal(await page.locator("#contentResultAds").isVisible(), false);
        await layout(`${id}-question-${index}-${width}`, id === "test-024" && index === 0);
        const answers = page.locator(`[data-action="choose-answer"][data-question-index="${index}"]`);
        await answers.first().waitFor();
        const option = liveCounts && width === 1440 && id !== "test-024" ? (index + Number(id.slice(-3))) % await answers.count() : 0;
        await answers.nth(option).click();
      }
      await action("restart-test").waitFor();
      assert.equal(await action("restart-test").textContent(), "다시 하기");
      const reading = await page.locator(".result-reading").boundingBox();
      const sharing = await page.locator(".result-sharing").boundingBox();
      assert.ok(reading.y + reading.height <= sharing.y, `${id}: sharing interrupts explanation`);
      assert.equal(await page.locator(".result-reading h2").first().evaluate((heading) => getComputedStyle(heading).backgroundColor), "rgba(0, 0, 0, 0)", `${id}: stale result heading style`);
      assert.deepEqual(await page.locator(".result-share-row button").evaluateAll((buttons) => buttons.map((button) => button.id)), ["btnCopyResultImage", "btnCopyLink", "btnKakaoShare", "btnInstagramShare"]);
      await layout(`${id}-result-${width}`, ["test-020", "test-024", "test-025"].includes(id));
      if ((!live || liveCounts) && id === "test-024") {
        if (!liveCounts) await page.evaluate(() => {
          window.Kakao = { isInitialized: () => true, Share: { uploadImage: async () => ({ infos: [{ original: { url: "https://example.com/qa-result.png" } }] }), sendDefault: (payload) => { window.__qaKakaoPayload = payload; } } };
        });
        if (!liveCounts) {
          await page.locator("#btnKakaoShare").click();
          await page.waitForFunction(() => window.__qaKakaoPayload);
          const payload = await page.evaluate(() => window.__qaKakaoPayload);
          assert.equal(new URL(payload.content.link.webUrl).searchParams.get("utm_source"), "kakao");
          assert.equal(payload.content.imageWidth, 1200);
          await page.evaluate(() => { delete window.Kakao; });
        }
        await checkClipboard(id, width);
        const before = api ? await getCount(id) : null;
        const shared = await context.newPage();
        await shared.goto(`${page.url()}&shared=1`, { waitUntil: "domcontentloaded" });
        await shared.locator('[data-action="restart-test"]').waitFor();
        assert.equal(await shared.locator('[data-action="restart-test"]').textContent(), "나도 테스트하기");
        const events = await shared.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event").map((entry) => entry[1]));
        assert.equal(events.filter((name) => name === "shared_result_view").length, 1);
        assert.equal(events.includes("content_complete"), false);
        if (api) assert.equal(await getCount(id), before, "A shared-result view must not add a participation");
        await shared.close(); await page.bringToFront();
        const resultUrl = page.url(); await page.goBack(); await action("choose-answer").first().waitFor(); await page.goForward(); await action("restart-test").waitFor(); assert.equal(page.url(), resultUrl);
        if (api) assert.equal(await getCount(id), before, "Back/forward navigation must not add a participation");
        const completions = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event" && entry[1] === "content_complete").length);
        await page.goBack(); await action("previous-question").click();
        await page.locator('[data-question-index="4"][data-option-index="1"]').click();
        await page.locator('[data-question-index="5"][data-option-index="0"]').click();
        await action("restart-test").waitFor();
        assert.equal(await page.locator(".result-cover h1").textContent(), "내 색 입히는 편집자");
        assert.equal(await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event" && entry[1] === "content_complete").length), completions, "Revising answers must not emit another completion");
        if (api) assert.equal(await getCount(id), before, "Revising answers must not add a participation");
        await start(id, action("restart-test")); await action("choose-answer").first().waitFor();
      }
      report.completedTests.push(`${id}@${width}`);
      if (report.completedTests.length % 5 === 0) console.log(`Verified ${report.completedTests.length} test flows.`);
    }
    if (!live || liveCounts) for (const item of regressionOnly ? data.catalog.playCards.filter((card) => card.id === "relationship-ranking") : useWebKit ? data.catalog.playCards.slice(0, 2) : data.catalog.playCards) {
      await go(item.href.replace(/^\.\//, "")); await start(item.id, action("start"));
      await layout(`${item.id}-play-${width}`);
      switch (item.id) {
        case "chat-temperature": for (let i = 0; i < 5; i++) await action("chat-reply").first().click(); break;
        case "procrastination-bingo": await action("toggle-bingo").first().click(); await action("finish-bingo").click(); break;
        case "battery-stop": await action("stop-battery").click(); break;
        case "today-box": await action("choose-box").first().click(); break;
        case "relationship-ranking": await action("rank-down").first().click(); await action("finish-ranking").click(); break;
        case "weekly-energy-budget": await page.locator("[data-allocation-id]").evaluateAll((inputs) => { inputs.forEach((input, index) => { input.value = index === 0 ? "100" : "0"; input.dispatchEvent(new Event("input", { bubbles: true })); }); }); await action("finish-allocation").click(); break;
        case "campus-festival-story": for (let i = 0; i < 4; i++) await action("story-choice").first().click(); break;
        case "emotion-trash": await page.locator("[data-trash-input]").fill("qa private note"); await action("trash-submit").click(); break;
        case "choice-roulette": await action("roulette-spin").click(); break;
      }
      await action("restart").waitFor(); await layout(`${item.id}-result-${width}`, item.id === "chat-temperature");
      assert.deepEqual(await page.locator(".play-share-actions button").evaluateAll((buttons) => buttons.map((button) => button.id)), ["btnCopyResultImage", "btnCopyLink", "btnKakaoShare", "btnInstagramShare"]);
      if (item.id === "chat-temperature") await checkClipboard(item.id, width);
      if (item.id === "relationship-ranking") {
        const count = api ? await getCount(item.id) : null;
        const completions = await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event" && entry[1] === "content_complete").length);
        await page.goBack(); await action("rank-down").first().click(); await action("finish-ranking").click();
        await action("restart").waitFor();
        assert.equal(await page.evaluate(() => window.dataLayer.filter((entry) => entry[0] === "event" && entry[1] === "content_complete").length), completions, "Revising a play result must not emit another completion");
        if (api) assert.equal(await getCount(item.id), count);
      }
      report.completedPlay.push(`${item.id}@${width}`);
    }
    if (!live || liveCounts) {
      // Every advertised result also has a direct, crawlable URL and readable mobile/PC layout.
      let checkedResults = 0;
      for (const [id, quiz] of regressionOnly ? [] : Object.entries(data.pages)) {
        for (const [key, result] of Object.entries(quiz.results)) {
          await go(`results/${id}-${key}.html`);
          assert.equal(await page.locator(".result-cover h1").textContent(), result.title);
          assert.equal(await page.locator(".result-reading details").count(), 0);
          assert.equal(await action("restart-test").textContent(), "나도 테스트하기");
          const images = await page.locator(".result-cover img").evaluateAll((items) => items.every((image) => image.complete && image.naturalWidth > 0));
          assert.ok(images, `${id}/${key}: missing artwork`);
          await layout(`direct-${id}-${key}-${width}`);
          checkedResults++;
        }
      }
      report[`directResults${width}`] = checkedResults;
      await go("index.html"); await page.locator('[data-action="next-page"]').click();
      if (api) await page.waitForFunction(() => [...document.querySelectorAll("#cardGrid [data-participation-count]")].every((element) => !element.hidden));
      if (api) {
        const labels = await page.locator("#cardGrid [data-participation-count]").evaluateAll((elements) => elements.map((element) => ({ id: element.dataset.participationCount, text: element.textContent })));
        for (const label of labels) assert.equal(label.text, `${(await getCount(label.id)).toLocaleString("ko-KR")}회 참여`);
      }
      await page.locator('[data-mood="love"]').click();
      if (api) await page.waitForFunction(() => [...document.querySelectorAll("#cardGrid [data-participation-count]")].every((element) => !element.hidden));
      for (const smallWidth of [320, 360, 430, 768, 1024]) {
        await page.setViewportSize({ width: smallWidth, height: 844 });
        await go("index.html"); await layout(`home-${smallWidth}-${width}`, width === 390 && [320, 430].includes(smallWidth));
        await go("results/test-020-crowd.html"); await layout(`result-${smallWidth}-${width}`, width === 390 && [320, 768].includes(smallWidth));
      }
    }
    await context.close(); console.log(`Completed ${width}px: ${cards.length} test flows.`);
  }
  if (api) {
    const attempt = attempts[0], before = await getCount(attempt.contentId);
    const replay = await fetch(`${api}/api/participations`, { method: "POST", headers: { "Content-Type": "application/json", ...(liveCounts ? { Origin: base } : { "CF-Connecting-IP": "198.51.100.3" }) }, body: JSON.stringify(attempt) });
    assert.equal(replay.status, 201); assert.equal(await getCount(attempt.contentId), before);
    report.duplicateAttemptIgnored = true;
  }
  if (liveCounts) {
    report.afterCounts = await allCounts();
    for (const [id, before] of Object.entries(report.beforeCounts)) {
      assert.equal(report.afterCounts[id] - before, attempts.filter((attempt) => attempt.contentId === id).length, `${id}: total does not match observed UI starts`);
    }
    report.productionStarts = attempts.length;
  }
  assert.deepEqual(report.issues, []); report.passed = true;
} catch (error) {
  report.passed = false; report.issues.push(error.message); process.exitCode = 1;
  if (page) await page.screenshot({ path: path.join(output, "failure.png"), fullPage: true, timeout: 10000 }).catch(() => {});
} finally {
  report.finishedAt = new Date().toISOString();
  fs.writeFileSync(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.passed, tests: report.completedTests.length, play: report.completedPlay.length, verifiedCountIncrements: report.counts.length, clipboardChecks: report.clipboard.length, issues: report.issues }));
  await browser.close(); await new Promise((resolve) => server.close(resolve));
}
