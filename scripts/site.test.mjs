import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { loadContent, root } from "./content.mjs";
import { packageSite } from "./package-site.mjs";

const source = (name) => fs.readFileSync(path.join(root, `assets/js/${name}.js`), "utf8");
const data = loadContent();
vm.runInContext(source("test-page"), data.context);
const score = data.context.scoreAnswers;

test("all 542,689 answer combinations produce valid results and every advertised type is reachable", () => {
  let combinations = 0;
  let resultTypes = 0;
  for (const [id, page] of Object.entries(data.pages)) {
    const counts = Object.fromEntries(Object.keys(page.results).map((key) => [key, 0]));
    function walk(answers) {
      if (answers.length === page.questions.length) {
        const result = score(page, answers);
        assert.ok(Object.hasOwn(counts, result), `${id}: invalid result ${result}`);
        counts[result]++;
        combinations++;
        return;
      }
      page.questions[answers.length].options.forEach((_, index) => walk([...answers, index]));
    }
    walk([]);
    assert.deepEqual(Object.keys(counts).filter((key) => counts[key] === 0), [], `${id}: unreachable result`);
    resultTypes += Object.keys(counts).length;
  }
  assert.equal(combinations, 542689);
  assert.equal(resultTypes, 101);
});

test("specific answers about coordination, disconnection, color, planning, reflection and observation return those types", () => {
  const examples = [
    ["test-009", [0, 0, 1, 1, 0, 1, 0, 0], "harmony"],
    ["test-012", [0, 0, 0, 0, 0, 0, 0, 0], "vanish"],
    ["test-015", [0, 1, 0, 0, 0, 0, 0, 0], "color"],
    ["test-016", [0, 1, 0, 1, 0, 1, 0, 0], "curator"],
    ["test-018", [1, 1, 1, 1, 1, 1, 1, 1], "frost"],
    ["test-020", [1, 1, 0, 1, 1, 0, 0, 1], "observer"]
  ];
  for (const [id, answers, result] of examples) assert.equal(score(data.pages[id], answers), result, id);
});

test("new AI and offline quizzes match eight distinct answer meanings and disclose tie handling", () => {
  const examples = [
    ["test-024", [0, 3, 2, 1, 0, 3], "director"],
    ["test-024", [1, 0, 3, 2, 1, 0], "editor"],
    ["test-024", [2, 1, 0, 3, 2, 1], "explorer"],
    ["test-024", [3, 2, 1, 0, 3, 2], "verifier"],
    ["test-025", [0, 3, 2, 1, 0, 3], "maker"],
    ["test-025", [1, 0, 3, 2, 1, 0], "wanderer"],
    ["test-025", [2, 1, 0, 3, 2, 1], "keeper"],
    ["test-025", [3, 2, 1, 0, 3, 2], "connector"]
  ];
  for (const [id, answers, expected] of examples) {
    assert.equal(score(data.pages[id], answers), expected, id);
    assert.match(data.pages[id].callout, /동점/);
  }
  assert.equal(score(data.pages["test-024"], [0, 3, 2, 2, 1, 0]), "director");
  assert.equal(score(data.pages["test-025"], [0, 3, 2, 0, 3, 2]), "maker");
});

test("total-score range boundaries retain the original four intervals", () => {
  const page = data.pages["test-023"];
  for (const [total, expected] of [[0, "packed"], [6, "packed"], [7, "tight"], [12, "tight"], [13, "room"], [18, "room"], [19, "wide"], [24, "wide"]]) {
    let remaining = total;
    const answers = page.questions.map((question) => {
      const points = Math.min(3, remaining);
      remaining -= points;
      return question.options.findIndex((option) => option.points === points);
    });
    assert.equal(score(page, answers), expected, `total ${total}`);
  }
});

class ElementStub {
  constructor(dataset = {}) { this.dataset = dataset; this.listeners = {}; this.style = { setProperty() {} }; this.classList = { add() {}, remove() {}, toggle() {} }; this.innerHTML = ""; this.hidden = false; this.children = []; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  setAttribute() {}
  getAttribute(name) { return this.dataset[name.replace(/^data-/, "").replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())]; }
  closest(selector) {
    const attribute = selector.match(/^\[data-([a-z-]+)\]$/);
    if (!attribute) return this;
    const key = attribute[1].replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    return Object.hasOwn(this.dataset, key) ? this : null;
  }
  querySelector() { return null; }
  querySelectorAll() { return []; }
  appendChild(element) { this.children.push(element); }
  prepend() {}
  getBoundingClientRect() { return { top: 0 }; }
}

// These are state/HTML tests using DOM stubs, not a browser or a visual/device test.
function runtime(id, query = "") {
  const { context, pages, cards, config } = loadContent();
  const isTest = id.startsWith("test-");
  const app = new ElementStub();
  const ads = new ElementStub();
  const affiliate = new ElementStub();
  const playAd = new ElementStub();
  const store = new Map();
  const session = new Map();
  const events = [];
  const timers = [];
  const history = [];
  let starts = 0;
  const elements = { [isTest ? "testApp" : "playgroundApp"]: app, contentResultAds: ads, affiliateResultAd: affiliate, playResultAd: playAd };
  context.URL = URL;
  context.CustomEvent = class { constructor(type) { this.type = type; } };
  context.Element = context.HTMLElement = context.HTMLButtonElement = context.HTMLInputElement = context.HTMLTextAreaElement = ElementStub;
  context.document = {
    body: new ElementStub(isTest ? { testId: id } : { playId: id }),
    getElementById: (key) => elements[key] || null,
    querySelector: () => null,
    addEventListener() {},
    dispatchEvent() {},
    createElement: () => new ElementStub(),
    head: new ElementStub()
  };
  const storage = (map) => ({ getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) });
  Object.assign(context.window, {
    location: new URL(`https://coocooing.kro.kr/${isTest ? "tests" : "play"}/${id}.html${query}`),
    localStorage: storage(store), sessionStorage: storage(session),
    COOCOO_ANALYTICS: { track: (name, parameters) => events.push({ name, parameters }) },
    COOCOO_COMMUNITY: { hydrate() {}, recordParticipation() { starts++; return Promise.resolve(); } },
    PartnersCoupang: { G() {} },
    setTimeout: (callback) => { timers.push(callback); return timers.length; }, clearTimeout() {},
    setInterval: () => 1, clearInterval() {}, requestAnimationFrame() {}, addEventListener() {},
    matchMedia: () => ({ matches: true }), crypto: { getRandomValues: (array) => array.fill(0) },
    history: Object.fromEntries(["pushState", "replaceState"].map((method) => [method, (state, _, url) => { history.push(state); context.window.location = new URL(url); }]))
  });
  if (isTest) vm.runInContext(source("test-page"), context);
  if (isTest) context.createTestApp({ testId: id, page: pages[id], cards });
  else context.createPlaygroundApp();
  return { context, app, ads, store, events, history, config, starts: () => starts, click(action, extras = {}) { app.listeners.click({ target: new ElementStub({ action, ...extras }) }); }, flush() { while (timers.length) timers.shift()(); } };
}

test("25 test flows start, complete, share, restart without ads during questions or duplicate share buttons", async () => {
  for (const card of data.cards) {
    const app = runtime(card.id);
    app.click("start-test");
    assert.equal(app.ads.hidden, true);
    data.pages[card.id].questions.forEach((_, index) => app.click("choose-answer", { questionIndex: String(index), optionIndex: "0" }));
    app.flush();
    assert.equal(app.ads.hidden, false, card.id);
    assert.equal((app.app.innerHTML.match(/id="btnCopyLink"/g) || []).length, 1);
    assert.ok(app.app.innerHTML.indexOf('id="btnCopyLink"') < app.app.innerHTML.indexOf('class="result-details"'));
    assert.equal(app.events.filter((event) => event.name === "content_complete").length, 1);
    app.click("restart-test");
    assert.equal(app.ads.hidden, true);
    assert.match(app.app.innerHTML, /QUESTION 1/);
  }
  await Promise.resolve();
});

test("a shared test result is a visit, not a completion; direct participation needs one click", () => {
  const app = runtime("test-020", "?result=observer&shared=1");
  assert.equal(app.events.filter((event) => event.name === "shared_result_view").length, 1);
  assert.equal(app.events.filter((event) => event.name === "content_complete").length, 0);
  app.click("restart-test");
  assert.match(app.app.innerHTML, /QUESTION 1/);
  assert.equal(app.events.find((event) => event.name === "content_start").parameters.from_shared_result, true);
});

test("all 9 play formats complete, retain share actions and keep ads outside active play", async () => {
  for (const item of data.catalog.playCards) {
    const app = runtime(item.id);
    app.click("start");
    assert.equal(app.ads.hidden, true, item.id);
    switch (item.id) {
      case "chat-temperature": for (let i = 0; i < 5; i++) app.click("chat-reply", { score: "warm" }); break;
      case "procrastination-bingo": app.click("toggle-bingo", { index: "0" }); app.click("finish-bingo"); break;
      case "battery-stop": app.click("stop-battery"); break;
      case "today-box": app.click("choose-box", { index: "0" }); break;
      case "relationship-ranking": app.click("finish-ranking"); break;
      case "weekly-energy-budget": {
        const target = new ElementStub({ allocationId: "rest" }); target.value = "100"; target.id = "allocation-rest";
        app.app.listeners.input({ target }); app.click("finish-allocation"); break;
      }
      case "campus-festival-story": for (let i = 0; i < 4; i++) app.click("story-choice", { choiceIndex: "0" }); break;
      case "emotion-trash": {
        const target = new ElementStub({ trashInput: "" }); target.value = "private-test-note";
        app.app.listeners.input({ target }); app.click("trash-submit"); break;
      }
      case "choice-roulette": app.click("roulette-spin"); break;
    }
    app.flush();
    assert.equal(app.ads.hidden, false, item.id);
    assert.equal(app.events.filter((event) => event.name === "content_complete").length, 1, item.id);
    assert.equal((app.app.innerHTML.match(/id="btnCopyLink"/g) || []).length, 1, item.id);
    assert.ok(!JSON.stringify(app.events).includes("private-test-note"));
  }
  await Promise.resolve();
});

test("all 101 result HTML variants have balanced elements, unique IDs and one primary participation action", () => {
  const voids = new Set(["img", "input", "br", "hr", "meta", "link", "source", "wbr"]);
  for (const [id, page] of Object.entries(data.pages)) {
    data.context.document.body = { dataset: { testId: id } };
    for (const key of Object.keys(page.results)) {
      const html = data.context.renderResultScreen(page, key, data.cards);
      const shareButtons = [...html.matchAll(/id="(btnCopyResultImage|btnCopyLink|btnKakaoShare|btnInstagramShare)"/g)].map((match) => match[1]);
      assert.deepEqual(shareButtons, ["btnCopyResultImage", "btnCopyLink", "btnKakaoShare", "btnInstagramShare"]);
      assert.doesNotMatch(html, /btnSmsShare|btnSaveResultImage/);
      const stack = [];
      for (const match of html.matchAll(/<\/?([a-z][a-z\d-]*)\b[^>]*>/gi)) {
        const tag = match[1].toLowerCase();
        if (voids.has(tag) || match[0].endsWith("/>")) continue;
        if (match[0].startsWith("</")) assert.equal(stack.pop(), tag, `${id}/${key}: ${tag}`);
        else stack.push(tag);
      }
      assert.deepEqual(stack, [], id);
      const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
      assert.equal(new Set(ids).size, ids.length);
      assert.equal((html.match(/data-action="restart-test"/g) || []).length, 1);
      assert.doesNotMatch(html, /undefined|\[object Object\]/);
    }
  }
});

test("daily missions change by date, shared dated results persist, and friends do not overwrite my choice", async () => {
  const app = runtime("today-box", "?result=box-0&date=2026-10-14&shared=1");
  assert.equal(app.store.size, 0);
  assert.notDeepEqual(JSON.stringify(app.context.getDailyBoxes("2026-10-14")), JSON.stringify(app.context.getDailyBoxes("2026-10-15")));
  assert.match(app.context.document.body.dataset.shareUrl, /date=2026-10-14/);
  assert.equal(app.events.filter((event) => event.name === "content_complete").length, 0);
  app.click("restart");
  app.click("choose-box", { index: "1" });
  assert.equal(app.store.size, 1);
  assert.match(app.context.document.body.dataset.shareUrl, new RegExp(`date=${app.context.getLocalDateKey()}`));
  await Promise.resolve();
});

test("share links preserve only result/date and replace the incoming marketing source", () => {
  const app = runtime("test-020", "?result=observer&utm_source=naver_blog&utm_campaign=private&qa=1&email=private");
  app.context.navigator = {};
  vm.runInContext(source("share"), app.context);
  for (const method of ["kakao", "copy_link", "image_share", "sms"]) {
    const url = new URL(app.context.buildSharedLink(method));
    assert.equal(url.searchParams.get("result"), "observer");
    assert.equal(url.searchParams.get("utm_source"), method);
    assert.equal(url.searchParams.get("shared"), "1");
    assert.equal(url.searchParams.get("utm_campaign"), "content_share");
    assert.equal(url.searchParams.has("qa"), false);
    assert.equal(url.searchParams.has("email"), false);
  }
});

test("static titles/canonical/preview images are unique; all content remains described without JavaScript", () => {
  const metadata = execFileSync(process.execPath, ["scripts/build-site.mjs", "--metadata"], { cwd: root, encoding: "utf8" }).trim();
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "assets/images/og/manifest.json"), "utf8"));
  assert.equal(manifest.metadataSha256, createHash("sha256").update(metadata).digest("hex"), "Preview images are stale: run scripts/render-assets.ps1");
  const titles = new Set();
  for (const item of data.catalog.items) {
    const file = item.href.replace(/^\.\//, "");
    const html = fs.readFileSync(path.join(root, file), "utf8");
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title)); titles.add(title);
    assert.match(html, /name="google-adsense-account"/);
    assert.match(html, /rel="canonical" href="https:\/\/coocooing.kro.kr\/(?:tests|play)\/[^"?]+"/);
    assert.match(html, /<h1>[^<]+<\/h1>/);
    assert.equal((html.match(/content-generated:start/g) || []).length, 1);
    assert.equal((html.match(/id="contentResultAds"/g) || []).length, 1);
    const png = fs.readFileSync(path.join(root, "assets/images/og", `${item.id}.png`));
    assert.equal(png.readUInt32BE(16), 1200); assert.equal(png.readUInt32BE(20), 630);
  }
  const html = fs.readFileSync(path.join(root, "search.html"), "utf8");
  for (const item of data.catalog.items) assert.ok(html.includes(`href="${item.href}"`));
  const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
  for (const id of ["test-024", "test-025"]) assert.ok(sitemap.includes(`/tests/${id}.html</loc>`));
});

test("AdSense approval gate blocks requests, and visible enabled placements initialize once", () => {
  const context = vm.createContext({ window: { SITE_CONFIG: { ...data.config, adsenseEnabled: false } }, document: { addEventListener() {}, querySelectorAll() { throw new Error("Unapproved ads queried"); } } });
  vm.runInContext(source("ads"), context);
  context.initAdsenseSlots();
  const placement = { hidden: true, parentElement: { closest: () => null } };
  const slot = { dataset: {}, classList: { add() {} }, closest: () => placement };
  let loads = 0;
  context.document = { querySelector: () => loads ? {} : null, querySelectorAll: () => [slot], createElement: () => ({ dataset: {} }), head: { appendChild: () => loads++ } };
  context.window.SITE_CONFIG.adsenseEnabled = true;
  context.initAdsenseSlots(); context.initAdsenseSlots();
  assert.equal(loads, 1); assert.equal(context.window.adsbygoogle.length, 1); assert.equal(placement.hidden, false);
  assert.match(fs.readFileSync(path.join(root, "ads.txt"), "utf8"), /^google.com, pub-7367164333546101, DIRECT, f08c47fec0942fa0\s*$/);
});

test("image copying writes a promised PNG during the click without an OS share window", async () => {
  const { context } = loadContent();
  const writes = [];
  let finishCanvas;
  context.ClipboardItem = class { constructor(items) { this.items = items; } };
  context.navigator = { clipboard: { write: (items) => { writes.push(items); return Promise.resolve(); } }, share: () => { throw new Error("Native sharing must not open"); } };
  vm.runInContext(source("share"), context);
  context.buildDynamicShareCanvas = () => new Promise((resolve) => { finishCanvas = resolve; });
  const copying = context.copyResultImage();
  assert.equal(writes.length, 1, "write must happen before asynchronous image rendering finishes");
  const png = new Blob(["png"], { type: "image/png" });
  finishCanvas({ toBlob: (callback) => callback(png) });
  await copying;
  assert.equal(await writes[0][0].items["image/png"], png);
  context.navigator.clipboard = undefined;
  await assert.rejects(context.copyResultImage(), /Image clipboard is unavailable/);
});

test("generation is repeatable without accumulating nested markup", () => {
  const files = ["index.html", "search.html", "tests/test-020.html", "play/today-box.html"];
  const hashes = () => files.map((file) => createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex"));
  execFileSync(process.execPath, ["scripts/build-site.mjs"], { cwd: root });
  const first = hashes();
  execFileSync(process.execPath, ["scripts/build-site.mjs"], { cwd: root });
  assert.deepEqual(hashes(), first);
});

test("the deploy artifact excludes reports, plans, server config and old scripts; old URLs are redirects", () => {
  const destination = packageSite();
  const files = fs.readdirSync(destination, { recursive: true }).map((file) => file.replaceAll("\\", "/"));
  assert.equal(files.some((file) => /\.(?:csv|zip|md)$|cloudflare\/|scripts\/|\.DS_Store/.test(file)), false);
  assert.equal(files.some((file) => /^github-pages-starter\/assets\//.test(file)), false);
  assert.equal(files.some((file) => /^(?:docs|node_modules)\//.test(file)), false);
  for (const file of files.filter((file) => /^(?:tests\/tests|github-pages-starter)\/.*\.html$/.test(file))) {
    const html = fs.readFileSync(path.join(destination, file), "utf8");
    assert.match(html, /noindex,follow/); assert.match(html, /http-equiv="refresh"/); assert.doesNotMatch(html, /<script/);
  }
});
