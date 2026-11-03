import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createServer } from "node:http";
import { chromium, webkit } from "playwright";
import { loadContent, root } from "./content.mjs";
import { packageSite } from "./package-site.mjs";

// Desktop browser engines and resized viewports; this is not physical-phone QA.
const useWebKit = process.argv.includes("--webkit");
const engine = useWebKit ? "webkit" : "chromium";
const sizes = [[320, 740], [390, 844], [768, 1024], [1440, 900]];
const output = path.join(root, ".artifacts", `qa-questions-${engine}`);
fs.mkdirSync(output, { recursive: true });
const site = packageSite();
const { pages } = loadContent();
const report = { passed: false, engine, sizes, questions: [], flows: [], resultViews: [], errors: [], scope: "local packaged site; external requests blocked; no real device or message delivery" };
const server = createServer((request, response) => {
  const name = new URL(request.url, "http://localhost").pathname;
  const file = path.resolve(site, `.${name === "/" ? "/index.html" : name}`);
  if (!file.startsWith(site + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
  response.setHeader("Content-Type", ({ ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".webp": "image/webp", ".svg": "image/svg+xml", ".png": "image/png" })[path.extname(file)] || "application/octet-stream");
  response.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
const save = () => fs.writeFileSync(path.join(output, "report.json"), JSON.stringify(report, null, 2));
save();
try {
  browser = await (useWebKit ? webkit : chromium).launch({ headless: true, ...(!useWebKit && process.platform === "win32" ? { channel: "msedge" } : {}) });
  report.version = browser.version();
  for (const [width, height] of sizes) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
    await context.route("**/*", route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    page.on("pageerror", error => report.errors.push(error.message));
    for (const [id, definition] of Object.entries(pages)) {
      await page.goto(`${base}/tests/${id}.html?qa=1`);
      await page.locator('[data-action="start-test"]').click();
      await page.evaluate(() => {
        window.__answerFeedback = [];
        new MutationObserver(() => {
          const selected = document.querySelector('.question-choice.is-selected[disabled]');
          if (!selected) return;
          const style = getComputedStyle(selected);
          window.__answerFeedback.push({ shadow: style.boxShadow, background: style.backgroundColor, borderWidths: [style.borderLeftWidth, style.borderRightWidth, style.borderTopWidth, style.borderBottomWidth] });
        }).observe(document.querySelector('#testApp'), { attributes: true, subtree: true });
      });
      for (let index = 0; index < definition.questions.length; index++) {
        const choices = page.locator(`.question-choice[data-question-index="${index}"]`);
        await choices.first().waitFor();
        const geometry = await page.evaluate(() => {
          const box = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; };
          return { title: box('.test-card-tab'), head: box('.test-progress-head'), track: box('.test-progress-track'), marker: box('.test-progress-paw'), prompt: box('.question-panel h1'), overflow: document.documentElement.scrollWidth > innerWidth + 1, value: document.querySelector('[role="progressbar"]').getAttribute('aria-valuenow') };
        });
        assert.ok(geometry.title.bottom <= geometry.head.top, `${id}@${width}/Q${index + 1}: title overlaps progress`);
        assert.ok(geometry.head.bottom < geometry.marker.top, `${id}@${width}: marker overlaps count`);
        assert.ok(geometry.marker.bottom < geometry.prompt.top, `${id}@${width}: marker overlaps question`);
        assert.ok(geometry.marker.left >= geometry.track.left && geometry.marker.right <= geometry.track.right, `${id}@${width}: marker outside track`);
        assert.equal(geometry.overflow, false, `${id}@${width}: horizontal overflow`);
        assert.equal(Number(geometry.value), index);
        report.questions.push({ id, width, question: index + 1, titleGap: geometry.head.top - geometry.title.bottom });
        if (index === 1) {
          await page.locator('[data-action="previous-question"]').click();
          const selected = page.locator('.question-choice.is-selected');
          assert.equal(await selected.getAttribute('data-option-index'), '0');
          assert.equal(await selected.getAttribute('aria-pressed'), 'true');
          assert.ok(!(await selected.evaluate(node => getComputedStyle(node).boxShadow)).includes('inset'));
          await selected.click();
          await choices.first().waitFor();
        }
        if (id === 'test-021' && index === 6 && [390,1440].includes(width)) {
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: path.join(output, `question-${width}.png`), fullPage: true });
          if (width === 1440) {
            await choices.first().hover();
            assert.notEqual(await choices.first().evaluate(node => getComputedStyle(node).backgroundColor), 'rgb(255, 255, 255)');
            await choices.first().focus();
            await page.keyboard.press('Space');
          } else await choices.first().click();
        } else await choices.first().click();
      }
      await page.locator('.result-cover h1').waitFor();
      const feedback = await page.evaluate(() => window.__answerFeedback);
      assert.ok(feedback.length >= definition.questions.length, `${id}: missed click feedback`);
      assert.ok(feedback.every(state => !state.shadow.includes('inset') && state.background !== 'rgb(255, 255, 255)' && new Set(state.borderWidths).size === 1), `${id}: asymmetric selection feedback`);
      report.flows.push({ id, width, selectedFeedback: feedback.length });
      save();
    }
    // Each live-rendered result is checked at the narrowest phone and PC widths.
    if ([320,1440].includes(width)) {
      for (const [id, definition] of Object.entries(pages)) for (const [key, result] of Object.entries(definition.results)) {
        await page.goto(`${base}/results/${id}-${key}.html?qa=1`);
        await page.locator('.result-reading h3').last().waitFor();
        const text = (await page.locator('.result-reading').innerText()).replace(/\s/g, '');
        assert.ok(text.includes(result.detail.replace(/\s/g, '')), `${id}/${key}: extended interpretation missing`);
        assert.ok(text.includes(result.communication.replace(/\s/g, '')), `${id}/${key}: conversation missing`);
        assert.ok(await page.evaluate(() => {
          const reading = document.querySelector('.result-reading').getBoundingClientRect();
          return reading.bottom <= document.querySelector('.result-sharing').getBoundingClientRect().top && document.documentElement.scrollWidth <= innerWidth + 1;
        }), `${id}/${key}: sharing order/overflow`);
        report.resultViews.push({ id, key, width });
      }
      if (width === 1440) {
        await page.goto(`${base}/results/test-020-crowd.html?qa=1`);
        await page.screenshot({ path: path.join(output, 'result-1440.png'), fullPage: true });
      }
    }
    await context.close();
    console.log(`${engine} ${width}px: ${report.flows.length} cumulative completions, ${report.resultViews.length} result views`);
    save();
  }
  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noScript.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const page = await noScript.newPage();
  for (const [id, definition] of Object.entries(pages)) for (const [key, result] of Object.entries(definition.results)) {
    await page.goto(`${base}/results/${id}-${key}.html?qa=1`);
    const text = (await page.locator('.result-reading').innerText()).replace(/\s/g, '');
    assert.ok(text.includes(result.detail.replace(/\s/g, '')) && text.includes(result.communication.replace(/\s/g, '')), `${id}/${key}: static reading missing`);
  }
  report.staticResults = 101;
  await noScript.close();
  assert.equal(report.errors.length, 0);
  assert.equal(report.flows.length, 25 * sizes.length);
  assert.equal(report.questions.length, Object.values(pages).reduce((sum, page) => sum + page.questions.length, 0) * sizes.length);
  report.passed = true;
} catch (error) {
  report.errors.push(error.stack);
  throw error;
} finally {
  save();
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
