const config = window.SITE_CONFIG || {};
const content = window.SITE_CONTENT || {};
const cards = Array.isArray(content.cards)
  ? [...content.cards].sort((left, right) => {
      const leftNumber = Number(String(left.id || "").replace(/[^\d]/g, "")) || 0;
      const rightNumber = Number(String(right.id || "").replace(/[^\d]/g, "")) || 0;
      return rightNumber - leftNumber;
    })
  : [];
const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let activeMood = "all";

const catalog = window.COOCOO_CATALOG || { playCards: [], themes: [], itemsForTheme: () => [] };
const PLAY_CARDS = catalog.playCards;

const MOOD_FILTERS = [
  { id: "all", label: "전부 보기", match: () => true },
  { id: "quick", label: "1분 안에 끝내기", match: (card) => /1분|90초/.test(card.duration || "") },
  { id: "friend", label: "친구에게 보내기", match: (card) => /관계|친구|케미|소셜/.test(`${card.category} ${card.title}`) },
  { id: "escape", label: "시험기간 현실 도피", match: (card) => /라이프|취향|무드|스트레스|주말|여행/.test(`${card.category} ${card.title}`) },
  { id: "love", label: "연애가 복잡할 때", match: (card) => /연애|썸|매력/.test(`${card.category} ${card.title}`) }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function friendlyHomeCopy(value) {
  return String(value || "")
    .replaceAll("테스트입니다", "테스트예요")
    .replaceAll("콘텐츠입니다", "콘텐츠예요")
    .replaceAll("카드입니다", "카드예요")
    .replaceAll("편입니다", "편이에요")
    .replaceAll("있습니다", "있어요")
    .replaceAll("없습니다", "없어요")
    .replaceAll("됩니다", "돼요")
    .replaceAll("합니다", "해요");
}

let coupangScriptPromise = null;

function ensureCoupangScript() {
  if (window.PartnersCoupang && window.PartnersCoupang.G) {
    return Promise.resolve();
  }

  if (coupangScriptPromise) {
    return coupangScriptPromise;
  }

  coupangScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-coupang-partners="true"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("쿠팡 파트너스 스크립트를 불러오지 못했습니다.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://ads-partners.coupang.com/g.js";
    script.async = true;
    script.dataset.coupangPartners = "true";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("쿠팡 파트너스 스크립트를 불러오지 못했습니다.")), { once: true });
    document.head.appendChild(script);
  });

  return coupangScriptPromise;
}

function hydrateCoupangSlots(root = document) {
  const slots = Array.from(root.querySelectorAll("[data-coupang-dynamic]"));
  if (!slots.length) return;

  ensureCoupangScript()
    .then(() => {
      if (!(window.PartnersCoupang && window.PartnersCoupang.G)) {
        return;
      }

      slots.forEach((slot) => {
        slot.innerHTML = "";
        const script = document.createElement("script");
        script.textContent = `
          new PartnersCoupang.G({
            id: ${Number(slot.dataset.coupangId)},
            template: "${slot.dataset.coupangTemplate}",
            trackingCode: "${slot.dataset.coupangTracking}",
            width: "${slot.dataset.coupangWidth}",
            height: "${slot.dataset.coupangHeight}",
            tsource: ""
          });
        `;
        slot.appendChild(script);
      });
    })
    .catch(() => {
      slots.forEach((slot) => {
        if (!slot.textContent.trim()) {
          slot.textContent = `${slot.dataset.coupangWidth || "160"} x ${slot.dataset.coupangHeight || "600"}`;
        }
      });
    });
}

function renderAffiliateSlot(slot, layout = "horizontal") {
  const isRail = layout === "rail";
  const tags = Array.isArray(slot.products) ? slot.products : [];
  const embedHtml = slot.embedHtml || "";
  const dynamic = slot.coupangDynamic || null;
  const showCopy = slot.showCopy !== false;

  return `
    <div class="ad-label">Ad</div>
    ${showCopy ? `
      <div class="affiliate-slot-copy ${isRail ? "affiliate-slot-copy-rail" : ""}">
        <strong class="affiliate-slot-title">${escapeHtml(slot.heading || "쿠팡 추천 상품")}</strong>
        <p class="affiliate-slot-description">${escapeHtml(slot.description || "")}</p>
        <div class="affiliate-slot-tags">
          ${tags.map((product) => `<span class="affiliate-slot-tag">${escapeHtml(product)}</span>`).join("")}
        </div>
      </div>
    ` : ""}
    ${dynamic
      ? `<div
          class="affiliate-banner-embed affiliate-banner-embed-dynamic ${isRail ? "affiliate-banner-embed-rail" : "affiliate-banner-embed-horizontal"}"
          data-coupang-slot="${escapeHtml(slot.slotId || "")}"
          data-coupang-dynamic="${escapeHtml(slot.slotId || "")}"
          data-coupang-id="${escapeHtml(String(dynamic.id))}"
          data-coupang-template="${escapeHtml(dynamic.template)}"
          data-coupang-tracking="${escapeHtml(dynamic.trackingCode)}"
          data-coupang-width="${escapeHtml(dynamic.width)}"
          data-coupang-height="${escapeHtml(dynamic.height)}">${escapeHtml(slot.sizeLabel || (isRail ? "160 x 600" : "728 x 90"))}</div>`
      : embedHtml
      ? `<div class="affiliate-banner-embed ${isRail ? "affiliate-banner-embed-rail" : "affiliate-banner-embed-horizontal"}" data-coupang-slot="${escapeHtml(slot.slotId || "")}">${embedHtml}</div>`
      : `<div class="ad-placeholder ${isRail ? "" : "ad-placeholder-horizontal"}" data-coupang-slot="${escapeHtml(slot.slotId || "")}">
          ${escapeHtml(slot.sizeLabel || (isRail ? "160 x 600" : "728 x 90"))}
        </div>`
    }
  `;
}

function populateHomeAffiliateSlots() {
  const homeSlots = content.adSlots && content.adSlots.home ? content.adSlots.home : null;
  if (!homeSlots) return;

  const left = document.getElementById("homeLeftRailAd");
  const right = document.getElementById("homeRightRailAd");
  const bottom = document.getElementById("homeBottomBannerAd");

  if (left && homeSlots.leftRail) {
    left.innerHTML = renderAffiliateSlot(homeSlots.leftRail, "rail");
  }

  if (right && homeSlots.rightRail) {
    right.innerHTML = renderAffiliateSlot(homeSlots.rightRail, "rail");
  }

  if (bottom && homeSlots.bottomBanner) {
    bottom.innerHTML = renderAffiliateSlot(homeSlots.bottomBanner, "horizontal");
  }

  hydrateCoupangSlots(document);
}

function getTotalPages() {
  return Math.max(1, Math.ceil(getFilteredCards().length / ITEMS_PER_PAGE));
}

function getCardsForPage(page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  return getFilteredCards().slice(start, start + ITEMS_PER_PAGE);
}

function getFilteredCards() {
  const filter = MOOD_FILTERS.find((item) => item.id === activeMood) || MOOD_FILTERS[0];
  return cards.filter(filter.match);
}

function getCardTone(card) {
  const text = `${card.category || ""} ${card.title || ""}`;
  if (/연애|썸|매력/.test(text)) return "coral";
  if (/관계|친구|소셜/.test(text)) return "blue";
  if (/자기관리|심리|집중|스트레스/.test(text)) return "green";
  if (/취향|라이프|여행|무드/.test(text)) return "yellow";
  return "paper";
}

function renderPlayCards() {
  const grid = document.getElementById("playCardGrid");
  if (!grid) return;

  grid.innerHTML = PLAY_CARDS.map((card, index) => `
    <a class="play-card tone-${card.tone}" href="${card.href}" data-content-id="${card.id}">
      <span class="play-card-number">0${index + 1}</span>
      <div class="play-card-heading">
        <span class="play-card-icon" aria-hidden="true">${card.iconAsset
          ? `<img src="./assets/images/${card.iconAsset}" alt="" />`
          : card.icon}</span>
        <strong>${card.title}</strong>
      </div>
      <p>${card.description}</p>
      <small><span>${card.eyebrow}</span><span>${card.time}</span></small>
      <span class="play-card-arrow" aria-hidden="true">↗</span>
      <span class="content-stat" data-participation-count="${card.id}" hidden></span>
    </a>
  `).join("");
}

function renderContentShelves() {
  const root = document.getElementById("contentShelves");
  if (!root || !catalog.themes.length) return;

  root.innerHTML = catalog.themes.map((theme) => {
    const items = catalog.itemsForTheme(theme, 6);
    return `
      <section class="content-shelf" aria-labelledby="shelf-${theme.id}">
        <div class="content-shelf-head">
          <div><span class="section-index">THEME</span><h3 id="shelf-${theme.id}">${escapeHtml(theme.title)}</h3><p>${escapeHtml(theme.description)}</p></div>
          <a href="./search.html?q=${encodeURIComponent(theme.tags?.[0] || "")}">더 찾아보기 →</a>
        </div>
        <div class="content-shelf-track">
          ${items.map((item) => `
            <a class="shelf-card tone-${getCardTone(item)}" href="${item.href}" data-content-id="${item.id}">
              <span class="shelf-card-icon" aria-hidden="true">${item.icon || "◉"}</span>
              <small>${item.type === "play" ? "짧은 놀이" : item.category || "테스트"}</small>
              <strong>${escapeHtml(item.title)}</strong>
              <span class="content-stat" data-participation-count="${item.id}" hidden></span>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderMoodFilters() {
  const row = document.getElementById("moodFilters");
  if (!row) return;

  row.innerHTML = MOOD_FILTERS.map((filter) => `
    <button class="mood-filter ${filter.id === activeMood ? "is-active" : ""}" type="button" data-mood="${filter.id}" aria-pressed="${filter.id === activeMood}">
      ${filter.label}
    </button>
  `).join("");
}

function renderCards() {
  const grid = document.getElementById("cardGrid");
  if (!grid) return;

  const filteredCards = getFilteredCards();
  if (!filteredCards.length) {
    grid.innerHTML = `
      <article class="empty-card">
        <h4>이 기분에 맞는 카드가 아직 없어요</h4>
        <p>다른 기분을 골라보거나 전체 카드를 둘러보세요.</p>
      </article>
    `;
    return;
  }

  const pageCards = getCardsForPage(currentPage);

  grid.innerHTML = pageCards.map((card) => `
    <a class="tool-card editorial-card tone-${getCardTone(card)}" href="${card.href}" data-content-id="${card.id}">
      <div class="editorial-card-head">
        <span>${card.category || "테스트"}</span>
      </div>
      <div class="editorial-card-art">
        <div class="editorial-card-title-row">
          <span class="editorial-card-icon" aria-hidden="true">${card.icon || "◉"}</span>
          <p>${friendlyHomeCopy(card.posterSubtitle || card.description)}</p>
        </div>
      </div>
      <div class="tool-body">
        <h4>${card.title}</h4>
        <p>${friendlyHomeCopy(card.description)}</p>
        <span class="card-open-label"><span>열어보기 <i aria-hidden="true">→</i></span><small>${card.duration || "1분"}</small></span>
        <span class="content-stat" data-participation-count="${card.id}" hidden></span>
      </div>
    </a>
  `).join("");
}

function renderPagination() {
  const pager = document.getElementById("cardPager");
  if (!pager) return;

  const totalPages = getTotalPages();
  if (totalPages <= 1) {
    pager.innerHTML = "";
    pager.hidden = true;
    return;
  }

  pager.hidden = false;
  pager.innerHTML = `
    <button class="pager-btn" type="button" data-action="prev-page" ${currentPage === 1 ? "disabled" : ""}>&lt;&lt; Prev</button>
    <span class="pager-status">${currentPage} / ${totalPages}</span>
    <button class="pager-btn" type="button" data-action="next-page" ${currentPage === totalPages ? "disabled" : ""}>Next &gt;&gt;</button>
  `;

  pager.querySelector('[data-action="prev-page"]')?.addEventListener("click", () => changePage(currentPage - 1));
  pager.querySelector('[data-action="next-page"]')?.addEventListener("click", () => changePage(currentPage + 1));
}

function changePage(nextPage) {
  const totalPages = getTotalPages();
  const safePage = Math.max(1, Math.min(totalPages, nextPage));
  if (safePage === currentPage) return;

  currentPage = safePage;
  renderCards();
  renderPagination();

  const allTests = document.getElementById("tests");
  if (allTests) {
    allTests.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.getElementById("moodFilters")?.addEventListener("click", (event) => {
  const button = event.target instanceof HTMLElement ? event.target.closest("[data-mood]") : null;
  if (!button) return;
  activeMood = button.dataset.mood || "all";
  currentPage = 1;
  renderMoodFilters();
  renderCards();
  renderPagination();
});

function populateHeader() {
  const siteTitle = document.getElementById("siteTitle");
  const siteTagline = document.getElementById("siteTagline");
  const footerSiteName = document.getElementById("footerSiteName");
  const year = document.getElementById("year");

  if (siteTitle && config.siteName) {
    siteTitle.textContent = config.siteName;
    document.title = `${config.siteName} | 잠깐 놀다 가는 디지털 놀이터`;
  }

  if (siteTagline && config.siteName && config.siteName !== "YOUR_SITE_NAME") {
    siteTagline.textContent = "1~3분이면 기분이 바뀌는 짧은 테스트와 놀이";
  }

  if (footerSiteName && config.siteName) {
    footerSiteName.textContent = config.siteName;
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

renderCards();
renderPagination();
populateHeader();
renderPlayCards();
renderMoodFilters();
renderContentShelves();
populateHomeAffiliateSlots();
document.dispatchEvent(new CustomEvent("coocoo:content-rendered"));
