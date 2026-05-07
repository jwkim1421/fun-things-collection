const config = window.SITE_CONFIG || {};
const content = window.SITE_CONTENT || {};
const cards = Array.isArray(content.cards) ? content.cards : [];

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
    <a class="tool-card" href="${card.href}">
      <div class="tool-thumb" style="--thumb: ${card.thumb}">
        <span>${card.badge}</span>
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
    document.title = config.siteName;
  }

  if (siteTagline && config.siteName && config.siteName !== "YOUR_SITE_NAME") {
    siteTagline.textContent = `${config.siteName}의 테스트와 콘텐츠를 한곳에서 둘러보세요.`;
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

renderCards();
populateHeader();
