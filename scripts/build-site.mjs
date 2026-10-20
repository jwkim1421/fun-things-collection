import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { loadContent, root, escapeHtml as esc } from "./content.mjs";
import { validateArtwork } from "./artwork.mjs";

const { context, config, cards, pages, catalog, play } = loadContent();
const siteUrl = config.siteUrl;
if (!/^ca-pub-\d{16}$/.test(config.adsenseClient)) throw new Error("Invalid AdSense publisher ID in site-config.js");
const metadata = catalog.items.map((item) => {
  const source = item.type === "test" ? pages[item.id] : play[item.id];
  const title = item.type === "test" && !/테스트|체크|진단/.test(source.title)
    ? `${source.title.replace(/[?？]$/, "")} 테스트` : source.title;
  return { id: item.id, file: item.href.replace(/^\.\//, ""), title: `${title} | 쿠쿠`, heading: source.title, description: source.summary || source.intro, category: source.category, image: `assets/images/og/${item.id}.png`, type: item.type };
});

if (process.argv.includes("--metadata")) {
  console.log(JSON.stringify(metadata));
  process.exit(0);
}
const resultMetadata = Object.entries(pages).flatMap(([id, page]) => Object.entries(page.results).map(([key, result]) => ({
  id, key, file: `results/${id}-${key}.html`, title: `${result.title} · ${page.title} | 쿠쿠`,
  heading: result.title, description: result.summary, image: `assets/images/og/results/${id}-${key}.png`, type: "test"
})));
if (process.argv.includes("--result-metadata")) {
  console.log(JSON.stringify(resultMetadata));
  process.exit(0);
}
if (process.argv.includes("--play-result-metadata")) {
  const production = JSON.parse(fs.readFileSync(path.join(root, "docs/art-production/20261020/production.json"), "utf8"));
  console.log(JSON.stringify(production.assets.filter(item => item.key && play[item.id]).map(item => {
    const content = play[item.id];
    const result = content.results?.[item.key];
    return { id: item.id, key: item.key,
      title: result ? `${result.title} · ${content.title} | 쿠쿠` : `${content.title} | 쿠쿠`,
      heading: result?.title || content.title, description: result?.line || content.intro,
      image: `assets/images/og/play-results/${item.id}-${item.key}.png`, type: "play" };
  })));
  process.exit(0);
}
validateArtwork(pages, catalog, play);

function replaceRequired(text, expression, replacement, label) {
  if (!expression.test(text)) throw new Error(`Missing template: ${label}`);
  return text.replace(expression, replacement);
}

fs.writeFileSync(path.join(root, "ads.txt"), `google.com, ${config.adsenseClient.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`);

function setHead(html, meta) {
  // Windows checkouts may contain CRLF or lone CR from earlier generated heads.
  html = html.replace(/\r\n?/g, "\n");
  const url = new URL(meta.file === "index.html" ? "" : meta.file, siteUrl).href;
  const image = new URL(meta.image || "assets/images/kuku-og-card.png", siteUrl).href;
  const head = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="google-adsense-account" content="${esc(config.adsenseClient)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${esc(meta.heading || meta.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${url}" />`
  ].join("\n  ");
  html = html.replace(/^\s*<meta (?:name="(?:description|google-adsense-account|twitter:[^"]+)"|property="og:[^"]+")[^>]*>\r?\n/gm, "");
  html = html.replace(/^\s*<link rel="canonical"[^>]*>\r?\n/gm, "");
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>\n  ${head}`, meta.file);
  html = html.replace(/assets\/images\/coocoo\.png/g, "assets/images/apple-touch-icon.png");
  if (!html.includes('assets/js/artwork.js')) {
    html = html.replace(/(<script\b)/, `<script defer src="${meta.file.includes("/") ? "../" : "./"}assets/js/artwork.js"></script>\n  $1`);
  }
  html = html.replace(/(<link rel="icon"[^>]*href=")[^"]+/, (_, prefix) => `${prefix}${meta.file.includes("/") ? "../" : "./"}assets/images/favicon-32x32.png`);
  if (meta.type === "test" || meta.type === "play" || meta.file === "index.html") {
    if (!html.includes('src="' + (meta.file.includes("/") ? "../" : "./") + 'assets/js/ads.js"')) {
      html = html.replace("</head>", `  <script defer src="${meta.file.includes("/") ? "../" : "./"}assets/js/ads.js"></script>\n</head>`);
    }
  }
  return html;
}

function adMarkup(type) {
  const affiliate = type === "test" ? '<div id="affiliateResultAd"></div>' : `<div class="play-result-ad-wrap"><span>광고</span><div id="playResultAd" class="play-result-ad"></div><small>이 페이지는 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있습니다.</small></div>`;
  return `<aside id="contentResultAds" class="content-result-ads" hidden aria-label="결과 아래 광고">
      <section class="adsense-placement" hidden aria-label="광고"><small>광고</small><ins data-adsense-placement="result" style="display:block" data-ad-format="auto" data-full-width-responsive="true"></ins></section>
      ${affiliate}
    </aside>`;
}

for (const meta of metadata) {
  const file = path.join(root, meta.file);
  let html = setHead(fs.readFileSync(file, "utf8"), meta);
  const source = meta.type === "test" ? pages[meta.id] : play[meta.id];
  const results = Object.values(source.results || {});
  const facts = meta.type === "test" ? `${source.questions.length}문항 · ${cards.find((card) => card.id === meta.id).duration}` : catalog.byId[meta.id].duration;
  const fallback = `<section class="content-intro"><h1>${esc(meta.heading)}</h1><p>${esc(meta.description)}</p><p>${esc(facts)}</p><noscript><p>참여하려면 브라우저의 JavaScript를 켜주세요. 아래에서 콘텐츠 소개를 읽을 수 있어요.</p></noscript></section>`;
  const guide = `<details class="content-guide"><summary>콘텐츠 소개와 이용 방법</summary><div class="content-intro"><h2>${esc(meta.heading)} 안내</h2><p>${esc(meta.description)}</p><p>${meta.type === "test" ? `최근의 나와 가까운 답을 ${source.questions.length}번 고르면 결과가 나와요. 정답은 없으며 질문마다 한 가지를 선택해요.` : "시작 버튼을 누른 뒤 화면의 안내에 따라 선택하거나 움직여보세요. 정답이 없는 짧은 놀이예요."}</p><p>소요 시간: ${esc(facts)}. 결과를 확인한 뒤 이미지나 링크로 친구와 비교해보세요.</p>${results.length ? `<h3>어떤 결과가 있나요?</h3><ul>${results.map((result) => `<li><strong>${esc(result.title)}</strong> — ${esc(result.summary || result.line)}</li>`).join("")}</ul>` : ""}<p class="content-disclaimer">재미로 즐기는 콘텐츠이며 전문적인 심리 검사나 진단이 아니에요. 답변과 결과는 브라우저에서 계산해요.</p><p><a href="../privacy.html">개인정보처리방침</a> · <a href="../contact.html">문의하기</a> · <a href="../search.html">전체 콘텐츠 찾기</a></p></div></details>`;
  const appId = meta.type === "test" ? "testApp" : "playgroundApp";
  const tag = meta.type === "test" ? "section" : "div";
  // This marked region owns only generated fallback/guide/ad HTML, never the interactive code.
  const region = new RegExp(`(<${tag}[^>]*id="${appId}"[^>]*>)[\\s\\S]*?<\\/${tag}>(?=\\s*(?:<!-- content-generated:start -->|<\\/main>))(?:\\s*<!-- content-generated:start -->[\\s\\S]*?<!-- content-generated:end -->)?`);
  html = replaceRequired(html, region, `$1${fallback}</${tag}>\n    <!-- content-generated:start -->\n    ${adMarkup(meta.type)}\n    ${guide}\n    <!-- content-generated:end -->`, meta.file);
  fs.writeFileSync(file, html);
}

const rootPages = [
  { file: "index.html", title: "쿠쿠 | 친구랑 비교하는 짧은 테스트와 놀이", description: "소셜 배터리, 썸 답장 온도, 대학생 빙고까지. 1~3분 테스트와 놀이 결과를 친구와 비교해보세요." },
  { file: "search.html", title: "테스트와 짧은 놀이 전체 검색 | 쿠쿠", description: `AI 협업·연애·관계·취향 등 쿠쿠의 테스트 ${cards.length}개와 짧은 놀이 ${catalog.playCards.length}개를 찾아보세요.` },
  { file: "privacy.html", title: "개인정보처리방침 | 쿠쿠", description: "쿠쿠의 브라우저 저장소, 익명 참여 통계, 광고 및 분석 도구에 대한 안내입니다." },
  { file: "contact.html", title: "문의하기 | 쿠쿠", description: "쿠쿠 테스트 수정 요청, 새 콘텐츠 제안, 광고 문의 방법을 확인하세요." }
];

function cardLink(item) {
  return `<a class="search-result-card" href="${esc(item.href)}" data-content-id="${esc(item.id)}"><img class="search-result-cover" src="./${context.contentArtwork(item.id)}" alt="" width="1200" height="800" loading="lazy" /><div><small>${esc(item.type === "play" ? "짧은 놀이" : item.category)}</small><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><small>${esc(item.duration)}</small></div></a>`;
}

for (const meta of rootPages) {
  const file = path.join(root, meta.file);
  let html = setHead(fs.readFileSync(file, "utf8"), meta);
  if (meta.file === "index.html") {
    html = html.replace(/(class="hero-scene" src=")[^"]+/, `$1./${context.contentArtwork("test-020")}`);
    html = replaceRequired(html, /(<div class="play-card-grid" id="playCardGrid">)[\s\S]*?<\/div>(?=\s*<p><a class="ghost-link")/, `$1${catalog.playCards.slice(0, 3).map(cardLink).join("\n")}</div>`, "home play grid");
    html = replaceRequired(html, /(<section class="card-grid" id="cardGrid"[^>]*>)[\s\S]*?<\/section>/, `$1${[...catalog.tests].reverse().slice(0, 12).map(cardLink).join("\n")}</section>`, "home tests");
  }
  if (meta.file === "search.html") {
    html = replaceRequired(html, /(<div class="search-result-grid" id="searchResultGrid">)[\s\S]*?<\/div>\s*<\/section>/, `$1${catalog.items.map(cardLink).join("\n")}</div>\n    </section>`, "search catalog");
  }
  fs.writeFileSync(file, html);
}

function redirect(file, destination) {
  const url = new URL(destination, siteUrl).href;
  const target = path.join(root, file);
  const html = `<!doctype html>\n<html lang="ko"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex,follow" /><meta http-equiv="refresh" content="0;url=${url}" /><link rel="canonical" href="${url}" /><title>쿠쿠 새 페이지로 이동</title></head><body><p>주소가 바뀌었어요. <a href="${url}">현재 쿠쿠 페이지 열기</a></p></body></html>\n`;
  if (!fs.existsSync(target) || fs.readFileSync(target, "utf8") !== html) fs.writeFileSync(target, html);
}

for (const name of fs.readdirSync(path.join(root, "tests/tests")).filter((file) => file.endsWith(".html"))) redirect(`tests/tests/${name}`, `tests/${name}`);
for (const name of fs.readdirSync(path.join(root, "github-pages-starter/tests")).filter((file) => file.endsWith(".html"))) redirect(`github-pages-starter/tests/${name}`, `tests/${name}`);
for (const name of ["index.html", "contact.html", "privacy.html", "404.html"]) redirect(`github-pages-starter/${name}`, name === "index.html" || name === "404.html" ? "" : name);

// All sitemap pages have generated metadata updated in this release.
const sitemapFile = path.join(root, "sitemap.xml");
// Use the browser renderer for the static result too, so crawlers and visitors read the same copy.
vm.runInContext(fs.readFileSync(path.join(root, "assets/js/test-page.js"), "utf8"), context);
fs.mkdirSync(path.join(root, "results"), { recursive: true });
for (const meta of resultMetadata) {
  let html = setHead(fs.readFileSync(path.join(root, `tests/${meta.id}.html`), "utf8"), meta);
  html = html.replace(`data-test-id="${meta.id}"`, `data-test-id="${meta.id}" data-initial-result="${meta.key}"`);
  context.document.body = { dataset: { testId: meta.id } };
  const resultHtml = context.renderResultScreen(pages[meta.id], meta.key, cards, { shared: true });
  html = replaceRequired(html, /(<section[^>]*id="testApp"[^>]*>)[\s\S]*?<\/section>(?=\s*<!-- content-generated:start -->)/,
    `$1${resultHtml}<noscript><p>버튼을 사용하려면 JavaScript를 켜주세요. <a href="../tests/${meta.id}.html">테스트 소개 보기</a></p></noscript></section>`, meta.file);
  fs.writeFileSync(path.join(root, meta.file), html.replace(/[\t ]+$/gm, ""));
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...rootPages, ...metadata, ...resultMetadata].map((meta) => `  <url><loc>${new URL(meta.file === "index.html" ? "" : meta.file, siteUrl).href}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(sitemapFile, sitemap);
console.log(`Built ${metadata.length} content pages, ${resultMetadata.length} result pages, 4 root pages and legacy address redirects.`);
