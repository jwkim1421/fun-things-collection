const config = window.SITE_CONFIG || {};
const content = window.SITE_CONTENT || {};
const cards = Array.isArray(content.cards) ? content.cards : [];

function renderFeaturedStrip() {
  const strip = document.getElementById("featuredStrip");
  if (!strip || !cards.length) return;

  const featuredCards = cards.slice(0, 3);

  strip.innerHTML = featuredCards.map((card, index) => `
    <a class="featured-card" href="${card.href}">
      <div class="featured-badge-row">
        <span class="featured-rank">TOP ${index + 1}</span>
        <span class="featured-badge">${card.badge || "추천"}</span>
      </div>
      <div class="featured-copy">
        <small>${card.category || "테스트"} · ${card.duration || "1분"}</small>
        <h4>${card.title}</h4>
        <p>${card.description}</p>
      </div>
      <div class="featured-thumb" style="--thumb: ${card.thumb}">
        <div class="featured-thumb-top">
          <span>${card.icon || "◉"}</span>
          <strong>${card.posterTitle || card.title}</strong>
        </div>
        <div class="featured-thumb-center">
          <em>${card.posterSubtitle || card.description}</em>
        </div>
      </div>
    </a>
  `).join("");
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

  grid.innerHTML = cards.map((card) => `
    <a class="tool-card poster-card" href="${card.href}">
      <div class="poster-topbar">
        <span class="poster-icon">${card.icon || "◉"}</span>
        <strong>${card.title}</strong>
      </div>
      <div class="tool-thumb poster-stage" style="--thumb: ${card.thumb}">
        <div class="poster-stickers">
          ${(card.stickers || []).map((sticker) => `<i>${sticker}</i>`).join("")}
        </div>
        <div class="poster-copy">
          <span>${card.posterTitle || card.category || "테스트"}</span>
          <strong>${card.posterSubtitle || card.title}</strong>
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

function populateHeader() {
  const siteTitle = document.getElementById("siteTitle");
  const siteTagline = document.getElementById("siteTagline");
  const year = document.getElementById("year");

  if (siteTitle && config.siteName) {
    siteTitle.textContent = config.siteName;
    document.title = `${config.siteName} | 오늘 기분에 맞는 테스트`;
  }

  if (siteTagline && config.siteName && config.siteName !== "YOUR_SITE_NAME") {
    siteTagline.textContent = `${config.siteName}의 테스트와 콘텐츠를 한곳에서 둘러보세요.`;
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

renderFeaturedStrip();
renderCards();
populateHeader();
