import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { chromium } from "playwright";
import { loadContent, root } from "./content.mjs";
import { packageSite } from "./package-site.mjs";

const output = path.join(root, ".artifacts/qa-review");
fs.mkdirSync(output, { recursive: true });
const site = packageSite();
const server = createServer((request, response) => {
  const name = new URL(request.url, "http://localhost").pathname;
  const file = path.resolve(site, `.${name === "/" ? "/index.html" : name}`);
  if (!file.startsWith(site + path.sep) || !fs.existsSync(file)) { response.writeHead(404); response.end(); return; }
  response.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" })[path.extname(file)] || "text/plain");
  response.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.platform === "win32" ? { channel: "msedge" } : {}) });
const report = { passed: false, intros: [], bingo: [], async: [], images: [], productionWrites: 0 };
const { catalog } = loadContent();
try {
  for (const [width, height] of [[1024,768],[1280,720],[1440,900],[768,1024],[320,812],[375,812],[390,844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.route("**/*", route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    for (const item of catalog.items) {
      await page.goto(`${base}/${item.href.replace(/^\.\//, "")}?qa=1`);
      const start = page.locator('[data-action="start-test"], [data-action="start"]');
      await start.waitFor();
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].filter(img => img.fetchPriority === "high").map(img => img.decode())); });
      const box = await start.boundingBox();
      assert.ok(box.x >= 0 && box.x + box.width <= width + 1 && box.y >= 0 && box.y + box.height <= height, `${item.id}@${width}: start outside first screen ${JSON.stringify(box)}`);
      assert.ok(box.height >= 44);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${item.id}@${width}: overflow`);
      report.intros.push({ id: item.id, width, height, startBottom: box.y + box.height });
      if (item.id === "test-020" && [375,1024].includes(width)) await page.screenshot({ path: path.join(output, `intro-${width}.png`) });
    }
    if (width === 375) {
      await page.goto(`${base}/?qa=1`);
      await page.locator("#playCardGrid a").first().waitFor();
      assert.equal(await page.locator("#playCardGrid").evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(" ").length), 2);
      for (const box of await page.locator(".site-footer a").evaluateAll(links => links.map(a => ({ width: a.getBoundingClientRect().width, height: a.getBoundingClientRect().height })))) assert.ok(box.width >= 44 && box.height >= 44);
    }
    if ([320,375,1440].includes(width)) {
      await page.goto(`${base}/play/procrastination-bingo.html?qa=1`);
      await page.locator('[data-action="start"]').click();
      assert.equal(await page.locator(".bingo-grid").evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(" ").length), 4);
      const cells = await page.locator(".bingo-cell").evaluateAll(nodes => nodes.map(node => ({ x: node.getBoundingClientRect().x, y: node.getBoundingClientRect().y, height: node.clientHeight, scroll: node.scrollHeight, text: node.textContent })));
      assert.equal(new Set(cells.slice(0,4).map(cell => cell.y)).size, 1);
      assert.ok(cells.every(cell => cell.height >= 44 && cell.scroll <= cell.height + 1));
      const finish = page.locator('[data-action="finish-bingo"]');
      assert.equal(await finish.isDisabled(), true);
      assert.equal(await page.locator("#bingoHint").isVisible(), true);
      let previous = [];
      for (const [selected, lines] of [[[0],0],[[0,1,2,3],1],[[0,4,8,12],1],[[0,5,10,15],1],[[3,6,9,12],1],[[0,1,2,3,4,8,12],2],[Array.from({ length:16 },(_,i)=>i),10]]) {
        for (const index of previous) await page.locator(`.bingo-cell[data-index="${index}"]`).click();
        for (const index of selected) await page.locator(`.bingo-cell[data-index="${index}"]`).click();
        assert.match(await page.locator(".play-progress-label").textContent(), new RegExp(`빙고 ${lines}$`));
        assert.equal(await page.locator(".bingo-cell.is-complete").count(), lines ? selected.length : 0);
        assert.equal(await page.locator("#bingoHint").isVisible(), false);
        report.bingo.push({ width, selected, lines }); previous = selected;
      }
      if (width === 375) await page.screenshot({ path:path.join(output,"bingo-375.png"), fullPage:true });
      await finish.click();
      assert.match(page.url(), /result=bingo-16-10/);
      await page.goto(`${base}/play/weekly-energy-budget.html?qa=1`);
      await page.locator('[data-action="start"]').click();
      assert.ok((await page.locator('input[type="range"]').first().boundingBox()).height >= 44);
      await page.goto(`${base}/play/relationship-ranking.html?qa=1`);
      await page.locator('[data-action="start"]').click();
      for (const box of await page.locator(".ranking-controls button").evaluateAll(buttons => buttons.map(button => ({ width:button.getBoundingClientRect().width, height:button.getBoundingClientRect().height })))) assert.ok(box.width >= 44 && box.height >= 44);
    }
    await page.close(); console.log(`Review UI checked at ${width}×${height}.`);
  }

  const page = await browser.newPage({ viewport: { width:375, height:812 } });
  let statsMode = "delay", reactionMode = "fail", reactionRequests = 0;
  await page.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin === base) return route.continue();
    if (url.pathname === "/api/stats") {
      if (statsMode === "delay") await new Promise(resolve => setTimeout(resolve, 700));
      if (["fail","delay"].includes(statsMode)) return route.fulfill({ status:503, body:"unavailable" });
      const stats = Object.fromEntries(url.searchParams.get("ids").split(",").map(id => [id, { participationCount:0, funCount:0, relatableCount:0, viewer:{} }]));
      return route.fulfill({ json:{ stats } });
    }
    if (url.pathname === "/api/reactions") {
      reactionRequests++; await new Promise(resolve => setTimeout(resolve, 500));
      if (reactionMode === "fail") return route.fulfill({ status:503, body:"unavailable" });
      const payload = route.request().postDataJSON();
      return route.fulfill({ json:{ stats:{ participationCount:0, funCount:payload.active?1:0, relatableCount:0, viewer:{ fun:payload.active } } } });
    }
    return route.abort();
  });
  await page.goto(`${base}/tests/test-020.html`);
  const stat = page.locator(".intro-participation");
  await page.waitForFunction(() => document.querySelector(".intro-participation")?.dataset.state === "loading");
  assert.match(await stat.textContent(), /확인 중/);
  await page.waitForFunction(() => document.querySelector(".intro-participation")?.dataset.state === "error");
  assert.match(await stat.textContent(), /확인 불가/);
  statsMode = "zero";
  await page.evaluate(() => window.dispatchEvent(new Event("online")));
  await page.waitForFunction(() => document.querySelector(".intro-participation")?.textContent === "0회 참여");
  report.async.push("participation: loading → failure without fake zero → online retry → real zero");
  await page.goto(`${base}/results/test-020-observer.html`);
  await page.locator('[data-reaction-count="fun"]').getByText("0",{exact:true}).waitFor();
  const reaction = page.locator('[data-reaction="fun"]');
  const reactionStatus = page.locator("[data-community-status]");
  await reaction.click();
  assert.match(await reactionStatus.textContent(), /저장 중/);
  assert.equal(await page.locator('[data-reaction="relatable"]').isDisabled(), true);
  await page.evaluate(() => document.querySelector('[data-reaction="fun"]').click());
  await page.waitForFunction(() => document.querySelector("[data-community-status]")?.textContent.includes("저장하지 못"));
  assert.equal(reactionRequests,1);
  assert.equal(await reaction.getAttribute("aria-pressed"),"false");
  assert.equal(await reaction.locator("b").textContent(),"0");
  reactionMode = "success";
  await reaction.click();
  await page.waitForFunction(() => document.querySelector('[data-reaction="fun"]')?.getAttribute("aria-pressed") === "true");
  assert.equal(await reaction.locator("b").textContent(),"1");
  await reaction.click();
  await page.waitForFunction(() => document.querySelector('[data-reaction="fun"]')?.getAttribute("aria-pressed") === "false");
  assert.equal(await reaction.locator("b").textContent(),"0");
  const positions = await page.evaluate(() => [".result-reading",".result-sharing",".community-reactions",".result-related-grid"].map(selector => document.querySelector(selector).getBoundingClientRect().top));
  assert.deepEqual(positions,[...positions].sort((a,b)=>a-b));
  report.async.push("reaction: pending/serialized clicks → unchanged failure → retry → success → undo; interpretation before share/reaction/recommendations");

  await page.route("**/covers/*.webp", async route => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return route.fulfill({status:404,body:"missing"});
  });
  await page.goto(`${base}/?qa=1`);
  const card = page.locator("#cardGrid a").first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('#cardGrid a img')?.dataset.fallback === "true");
  assert.ok(await card.locator("h4").textContent());
  assert.ok((await card.boundingBox()).height > 100);
  assert.equal(await card.locator("img").evaluate(img=>img.naturalWidth),720);
  report.images.push("delayed 404 image retains title, link, 3:2 area and neutral fallback");
  await card.click(); await page.locator('[data-action="start-test"]').waitFor();
  await page.close();
  report.passed = true;
} finally {
  fs.writeFileSync(path.join(output,"report.json"),JSON.stringify(report,null,2));
  await browser.close(); server.close();
}
console.log(`Review checks passed: ${report.intros.length} introductions, ${report.bingo.length} bingo patterns, async failure/retry and image fallback.`);
