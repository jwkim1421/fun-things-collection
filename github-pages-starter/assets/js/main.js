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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderAffiliateSlot(slot, layout = "horizontal") {
  const isRail = layout === "rail";
  const tags = Array.isArray(slot.products) ? slot.products : [];

  return `
    <div class="ad-label">Ad</div>
    <div class="affiliate-slot-copy ${isRail ? "affiliate-slot-copy-rail" : ""}">
      <strong class="affiliate-slot-title">${escapeHtml(slot.heading || "쿠팡 추천 상품")}</strong>
      <p class="affiliate-slot-description">${escapeHtml(slot.description || "")}</p>
      <div class="affiliate-slot-tags">
        ${tags.map((product) => `<span class="affiliate-slot-tag">${escapeHtml(product)}</span>`).join("")}
      </div>
    </div>
    <div class="ad-placeholder ${isRail ? "" : "ad-placeholder-horizontal"}" data-coupang-slot="${escapeHtml(slot.slotId || "")}">
      ${escapeHtml(slot.sizeLabel || (isRail ? "160 x 600" : "728 x 90"))}
    </div>
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
}

function getTotalPages() {
  return Math.max(1, Math.ceil(cards.length / ITEMS_PER_PAGE));
}

function getCardsForPage(page) {
  const start = (page - 1) * ITEMS_PER_PAGE;
  return cards.slice(start, start + ITEMS_PER_PAGE);
}

function renderCards() {
  const grid = document.getElementById("cardGrid");
  if (!grid) return;

  if (!cards.length) {
    grid.innerHTML = `
      <article class="empty-card">
        <h4>카드 데이터가 비어 있습니다</h4>
        <p><code>assets/js/content-data.js</code>에 홈 카드 목록을 추가해 주세요.</p>
      </article>
    `;
    return;
  }

  const pageCards = getCardsForPage(currentPage);

  grid.innerHTML = pageCards.map((card) => `
    <a class="tool-card poster-card" href="${card.href}">
      <div class="poster-topbar">
        <span class="poster-icon">${card.icon || "◉"}</span>
        <strong>${card.title}</strong>
      </div>
      <div class="tool-thumb poster-stage" style="--thumb: ${card.thumb}">
        <div class="poster-chip-row">
          <span class="poster-chip poster-chip-soft">${card.posterTitle || card.category || "테스트"}</span>
          <span class="poster-chip poster-chip-highlight">${card.badge || "쿠쿠 추천"}</span>
        </div>
        <div class="poster-stickers">
          ${(card.stickers || []).map((sticker) => `<i>${sticker}</i>`).join("")}
        </div>
        <div class="poster-copy">
          <span>${card.posterTitle || card.category || "테스트"}</span>
          <strong>${card.posterSubtitle || card.title}</strong>
          <p>${card.description}</p>
        </div>
      </div>
      <div class="tool-body">
        <div class="tool-meta">
          <small>${card.category || "콘텐츠"}</small>
          <small>${card.duration || "1분"}</small>
        </div>
        <h4>${card.title}</h4>
        <p>${card.description}</p>
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

  const allTests = document.getElementById("allTests");
  if (allTests) {
    allTests.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function populateHeader() {
  const siteTitle = document.getElementById("siteTitle");
  const siteTagline = document.getElementById("siteTagline");
  const footerSiteName = document.getElementById("footerSiteName");
  const year = document.getElementById("year");

  if (siteTitle && config.siteName) {
    siteTitle.textContent = config.siteName;
    document.title = `${config.siteName} | 마음에 드는 테스트를 골라보세요`;
  }

  if (siteTagline && config.siteName && config.siteName !== "YOUR_SITE_NAME") {
    siteTagline.textContent = `${config.siteName}의 테스트와 콘텐츠를 한곳에서 둘러보세요.`;
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
populateHomeAffiliateSlots();
