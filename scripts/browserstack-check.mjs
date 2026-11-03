import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { root, loadContent } from "./content.mjs";

// BrowserStack's official legacy Playwright transport. Credentials never enter logs.
let credentials;
try { credentials = JSON.parse(fs.readFileSync(path.join(root, ".artifacts/browserstack.local.json"), "utf8").replace(/^\uFEFF/, "")); }
catch { throw new Error("Check the JSON format of .artifacts/browserstack.local.json"); }
if (!credentials.username || !credentials.accessKey) throw new Error("Fill username and accessKey in .artifacts/browserstack.local.json");
process.env.DEBUG = "";
process.env.PWDEBUG = "";
const require = createRequire(path.join(root, ".artifacts/browserstack-runner/package.json"));
const { _android, webkit } = require("playwright");
const version = require("playwright/package.json").version;
const profiles = [
  { id: "android-pixel7", platform: "android", deviceName: "Google Pixel 7", osVersion: "13.0", browser: "chrome" },
  { id: "ios-iphone13", platform: "ios", deviceName: "iPhone 13", osVersion: "18", browser: "safari" },
  { id: "ios-se2022", platform: "ios", deviceName: "iPhone SE 2022", osVersion: "15", browser: "safari" },
  { id: "android-galaxy", platform: "android", deviceName: "Samsung Galaxy S24 Ultra", osVersion: "14.0", browser: "chrome" },
  { id: "ios-pro-max", platform: "ios", deviceName: "iPhone 15 Pro Max", osVersion: "17", browser: "safari" }
];
const selected = profiles.find(item => item.id === process.argv[2]);
if (!selected) throw new Error(`Select one device: ${profiles.map(item => item.id).join(", ")}`);
const smoke = process.argv.includes("--smoke");
const only = process.argv.find(value => value.startsWith("--only="))?.slice(7);
if (only && only !== "emotion-trash") throw new Error("The targeted diagnostic currently supports emotion-trash only");
const output = path.join(root, ".artifacts", `qa-browserstack-${selected.id}${only ? `-${only}` : smoke ? "-smoke" : ""}`);
fs.mkdirSync(output, { recursive: true });
const reportFile = path.join(output, "report.json");
if (fs.existsSync(reportFile)) fs.copyFileSync(reportFile, path.join(output, `report-${Date.now()}.json`));
const report = { startedAt: new Date().toISOString(), profile: selected, runnerVersion: version, target: "https://coocooing.kro.kr", mode: only ? `targeted ${only}` : smoke ? "smoke" : "whole catalog", build: "coocoo-mobile-20261026", flows: [], results: [], sharing: [], issues: [], passed: false, realAppDelivery: "not tested" };
const redact = error => {
  let text = String(error?.message || error).replace(/wss:\/\/[^\s"']+/g, "[BrowserStack endpoint]");
  for (const secret of [credentials.username, credentials.accessKey, encodeURIComponent(credentials.accessKey)]) text = text.replaceAll(secret, "[redacted]");
  return text;
};
const save = () => fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
save();
const data = loadContent();
let remote, context, page;
let closing = false;
const caps = {
  deviceName: selected.deviceName, osVersion: selected.osVersion, browser: selected.browser,
  realMobile: "true", project: "Coocoo mobile website QA", build: report.build, name: `${selected.id} ${report.mode}`,
  "browserstack.username": credentials.username, "browserstack.accessKey": credentials.accessKey,
  "client.playwrightVersion": version, "browserstack.playwrightVersion": version,
  "browserstack.local": false
};
const endpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
const action = name => page.locator(`[data-action="${name}"]`);
async function go(href) {
  const url = new URL(href.replace(/^\.\//, ""), "https://coocooing.kro.kr/");
  url.searchParams.set("qa", "1");
  await page.goto(url.href, { waitUntil: "domcontentloaded", timeout: 45000 });
}
async function layout(label, screenshot = false) {
  const state = await page.evaluate(async () => {
    await document.fonts.ready;
    const images = [...document.querySelectorAll('img[src*="assets/images/covers/"]')];
    images.forEach(image => { image.loading = "eager"; });
    await Promise.all(images.map(image => image.decode()));
    const reading = document.querySelector(".result-reading")?.getBoundingClientRect();
    const sharing = document.querySelector(".result-sharing")?.getBoundingClientRect();
    return { width: innerWidth, height: innerHeight, overflow: document.documentElement.scrollWidth > innerWidth + 2, readingBeforeSharing: !reading || !sharing || reading.bottom <= sharing.top, imagesLoaded: images.every(image => image.naturalWidth > 0) };
  });
  assert.equal(state.overflow, false, `${label}: horizontal overflow`);
  assert.equal(state.readingBeforeSharing, true, `${label}: sharing interrupts explanation`);
  assert.equal(state.imagesLoaded, true, `${label}: missing artwork`);
  if (screenshot) await page.screenshot({ path: path.join(output, `${label}.png`), timeout: 30000 });
}
async function sharing(id) {
  const entry = { id, image: "not tested", link: "not tested", instagram: "not tested", kakao: "SDK contract only; not sent" };
  for (const selector of ["#btnCopyResultImage", "#btnCopyLink", "#btnKakaoShare", "#btnInstagramShare"]) {
    assert.equal(await page.locator(selector).count(), 1);
  }
  await page.evaluate(() => {
    window.__qaImageGesture = null;
    document.getElementById("btnCopyResultImage").addEventListener("click", event => {
      window.__qaImageGesture = { trusted: event.isTrusted, activation: navigator.userActivation?.isActive };
    }, { once: true });
  });
  await page.locator("#btnCopyResultImage").tap();
  await page.locator("#shareFeedback").waitFor();
  entry.image = await page.locator("#shareFeedback").innerText();
  entry.imageGesture = await page.evaluate(() => window.__qaImageGesture);
  assert.match(entry.image, /복사했어요|제한/);
  await page.locator("#btnCopyLink").tap();
  await page.waitForFunction(() => /링크를 복사했어요|링크 복사가 제한/.test(document.querySelector("#shareFeedback")?.textContent || ""));
  entry.link = await page.locator("#shareFeedback").innerText();
  await page.evaluate(() => {
    window.__qaKakaoPayload = null;
    window.Kakao = { isInitialized: () => true, Share: { uploadImage: async () => ({ infos: [{ original: { url: "https://example.com/qa.png" } }] }), sendDefault: payload => { window.__qaKakaoPayload = payload; } } };
  });
  await page.locator("#btnKakaoShare").tap();
  await page.waitForFunction(() => window.__qaKakaoPayload);
  const payload = await page.evaluate(() => window.__qaKakaoPayload);
  assert.equal(payload.content.imageWidth, 1200);
  const received = new URL(payload.content.link.webUrl);
  assert.equal(received.searchParams.get("utm_source"), "kakao");
  await page.locator("#btnInstagramShare").tap();
  await page.locator('#shareFeedback a[href="https://www.instagram.com/"]').waitFor();
  entry.instagram = "instructions visible; app upload and device download not verified";
  report.sharing.push(entry);
  await go(`${received.pathname}${received.search}`);
  await action(id.startsWith("test-") ? "restart-test" : "restart").waitFor();
  await layout(`${id}-received`);
}
async function attempt(id, work) {
  try { await work(); }
  catch (error) {
    report.issues.push({ id, error: redact(error) });
    await page.screenshot({ path: path.join(output, `${id}-failure.png`), timeout: 10000 }).catch(() => {});
  }
  save();
}
try {
  if (selected.platform === "android") {
    remote = await _android.connect(endpoint, { timeout: 90000 });
    await remote.shell("am force-stop com.android.chrome");
    report.hardware = { model: remote.model(), osSource: "requested BrowserStack capability; shell getprop is unavailable" };
    context = await remote.launchBrowser({ hasTouch: true });
  } else {
    remote = await webkit.connect(endpoint, { timeout: 90000 });
    context = await remote.newContext({ hasTouch: true });
  }
  page = await context.newPage(); page.setDefaultTimeout(20000);
  await page.addInitScript(() => {
    window["ga-disable-G-GE282CZLL6"] = true;
    window.gtag = () => {};
    const fetchRequest = window.fetch.bind(window);
    window.fetch = (input, options) => {
      const url = new URL(typeof input === "string" ? input : input.url, location.href);
      const method = options?.method || input.method || "GET";
      if (url.hostname === "coocoo-api.reviewmoa.workers.dev" && !["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) throw new Error("QA blocked a community write");
      return fetchRequest(input, options);
    };
  });
  // QA mode suppresses own writes; interception also blocks unexpected writes.
  if (selected.platform === "android") await page.route("**/*", async route => {
    try {
    const request = route.request(), url = new URL(request.url());
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) return await route.abort();
    if (url.hostname === "coocoo-api.reviewmoa.workers.dev") return await route.fulfill({ contentType: "application/json", body: '{"stats":{}}', headers: { "Access-Control-Allow-Origin": "*" } });
    if (url.hostname === "coocooing.kro.kr" || ["fonts.googleapis.com", "fonts.gstatic.com"].includes(url.hostname) || url.protocol === "blob:") return await route.continue();
    return await route.fulfill({ contentType: "text/javascript", body: "" });
    } catch (error) { if (!closing) report.issues.push({ id: "network interception", error: redact(error) }); }
  });
  page.on("pageerror", error => report.issues.push({ id: "pageerror", error: redact(error) }));
  await go("index.html");
  report.observed = await page.evaluate(() => ({ userAgent: navigator.userAgent, width: innerWidth, height: innerHeight, screenWidth: screen.width, screenHeight: screen.height, dpr: devicePixelRatio, release: window.SITE_CONFIG?.releaseVersion }));
  assert.match(report.observed.userAgent, selected.platform === "android" ? /Android/ : /iPhone|iPad/);
  await layout("home", true); await go("search.html"); await layout("search", true);
const cards = only ? [] : smoke ? data.cards.filter(card => card.id === "test-020") : data.cards;
  for (const card of cards) await attempt(card.id, async () => {
    await go(card.href); await action("start-test").waitFor(); await layout(`${card.id}-intro`, ["test-020", "test-024"].includes(card.id));
    await action("start-test").tap();
    for (let i = 0; i < data.pages[card.id].questions.length; i++) {
      const answer = page.locator(`[data-action="choose-answer"][data-question-index="${i}"]`).first();
      await answer.waitFor(); await layout(`${card.id}-question-${i}`); await answer.tap();
      if (i === 0) {
        await page.locator('[data-question-index="1"]').first().waitFor(); await action("previous-question").tap();
        assert.equal(await page.locator('[data-question-index="0"][data-option-index="0"]').getAttribute("aria-pressed"), "true");
        await page.locator('[data-question-index="0"][data-option-index="0"]').tap();
      }
    }
    await action("restart-test").waitFor(); await layout(`${card.id}-result`, ["test-020", "test-024"].includes(card.id));
    // iOS's remote Page.url cache can lag behind history.replaceState.
    const resultUrl = await page.evaluate(() => location.href);
    assert.ok(new URL(resultUrl).searchParams.has("result"));
    await page.goBack(); await action("choose-answer").first().waitFor(); await page.goForward(); await action("restart-test").waitFor();
    assert.equal(await page.evaluate(() => location.href), resultUrl);
    await sharing(card.id); report.flows.push(card.id);
    console.log(`${selected.id}: ${report.flows.length} flows`);
  });
  const plays = only ? data.catalog.playCards.filter(item => item.id === only) : smoke ? data.catalog.playCards.filter(item => item.id === "procrastination-bingo") : data.catalog.playCards;
  for (const item of plays) await attempt(item.id, async () => {
    await go(item.href); await action("start").tap(); await layout(`${item.id}-play`, item.id === "procrastination-bingo");
    switch (item.id) {
      case "chat-temperature": for (let i = 0; i < 5; i++) await action("chat-reply").first().tap(); break;
      case "procrastination-bingo": await action("toggle-bingo").first().tap(); await action("finish-bingo").tap(); break;
      case "battery-stop": await action("stop-battery").tap(); break;
      case "today-box": await action("choose-box").first().tap(); break;
      case "relationship-ranking": await action("rank-down").first().tap(); await action("finish-ranking").tap(); break;
      case "weekly-energy-budget": await page.locator("[data-allocation-id]").evaluateAll(inputs => inputs.forEach((input, index) => { input.value = index ? "0" : "100"; input.dispatchEvent(new Event("input", { bubbles: true })); })); await action("finish-allocation").tap(); break;
      case "campus-festival-story": for (let i = 0; i < 4; i++) await action("story-choice").first().tap(); break;
      case "emotion-trash": {
        await page.locator("[data-trash-input]").fill("QA private note");
        if (only) {
          await action("trash-submit").scrollIntoViewIfNeeded();
          report.keyboardDiagnostic = await page.evaluate(() => {
            const button = document.querySelector('[data-action="trash-submit"]'), r = button.getBoundingClientRect();
            return { innerHeight, viewportHeight: visualViewport?.height, offsetTop: visualViewport?.offsetTop, scrollY, focused: document.activeElement.tagName, button: { x:r.x,y:r.y,width:r.width,height:r.height }, hit: document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.outerHTML.slice(0,150) };
          });
          await page.screenshot({path:path.join(output,"before-submit.png")});
          try { await action("trash-submit").tap({timeout:5000}); report.keyboardDiagnostic.initialTapPassed = true; }
          catch (error) {
            report.keyboardDiagnostic.initialTapPassed = false;
            report.keyboardDiagnostic.initialError = redact(error).split("\n")[0];
            await page.locator("[data-trash-input]").blur();
            await page.waitForFunction(() => document.activeElement.tagName !== "TEXTAREA" && visualViewport.height > innerHeight * .9);
            await page.screenshot({path:path.join(output,"keyboard-dismissed.png")});
            await action("trash-submit").tap();
            report.keyboardDiagnostic.passedAfterBlur = true;
          }
        } else await action("trash-submit").tap();
        break;
      }
      case "choice-roulette": await action("roulette-spin").tap(); break;
      default: throw new Error(`Missing flow: ${item.id}`);
    }
    await action("restart").waitFor(); await layout(`${item.id}-result`, true); await sharing(item.id); report.flows.push(item.id);
  });
  if (!smoke && !only) for (const [id, quiz] of Object.entries(data.pages)) for (const [key, result] of Object.entries(quiz.results)) await attempt(`${id}-${key}`, async () => {
    await go(`results/${id}-${key}.html`); await action("restart-test").waitFor();
    assert.equal(await page.locator(".result-cover h1").textContent(), result.title);
    await layout(`${id}-${key}`); report.results.push(`${id}/${key}`);
  });
  assert.equal(report.flows.length, only ? 1 : smoke ? 2 : 34);
  if (!smoke && !only) assert.equal(report.results.length, 101);
  assert.deepEqual(report.issues, []);
  report.passed = true;
} catch (error) { report.issues.push({ id: "session", error: redact(error) }); }
finally {
  if (page) await page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: report.passed ? "passed" : "failed", reason: report.passed ? "Website checks passed; app delivery separately unverified" : "See private QA report; possible tool or website failure" } })}`).catch(() => {});
  closing = true;
  if (selected.platform === "android" && page) await page.unrouteAll({ behavior: "ignoreErrors" }).catch(() => {});
  if (remote) await remote.close().catch(() => {});
  report.finishedAt = new Date().toISOString(); save();
  console.log(JSON.stringify({ device: selected.id, passed: report.passed, flows: report.flows.length, results: report.results.length, issues: report.issues }));
}
if (!report.passed) process.exitCode = 1;
