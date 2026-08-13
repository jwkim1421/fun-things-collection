(function initializeSearch() {
  const catalog = window.COOCOO_CATALOG;
  const form = document.getElementById("contentSearchForm");
  const input = document.getElementById("contentSearchInput");
  const tagRoot = document.getElementById("recommendedTags");
  const resultRoot = document.getElementById("searchResultGrid");
  const summary = document.getElementById("searchSummary");
  if (!catalog || !form || !input || !tagRoot || !resultRoot || !summary) return;

  const recommendedTags = ["연애", "관계", "대학생", "라이프", "감정", "취향", "성향", "회복", "짧은놀이", "게임"];

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }

  function normalized(value) {
    return String(value || "").trim().toLocaleLowerCase("ko-KR").replace(/^#/, "");
  }

  function matches(item, query) {
    if (!query) return true;
    const words = query.split(/\s+/).filter(Boolean);
    const haystack = normalized([item.title, item.description, item.category, ...(item.tags || [])].join(" "));
    return words.every((word) => haystack.includes(word));
  }

  function render(query) {
    const safeQuery = normalized(query);
    const results = catalog.items.filter((item) => matches(item, safeQuery));
    summary.textContent = safeQuery ? `‘${query.trim()}’ 검색 결과 ${results.length}개` : `테스트와 짧은 놀이 ${results.length}개를 모았어요.`;
    resultRoot.innerHTML = results.length ? results.map((item) => `
      <a class="search-result-card" href="${escapeHtml(item.href)}" data-content-id="${escapeHtml(item.id)}">
        <span class="search-result-icon" aria-hidden="true">${escapeHtml(item.icon || "◉")}</span>
        <div><small>${escapeHtml(item.type === "play" ? "짧은 놀이" : item.category || "테스트")}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p>
          <div class="search-result-tags">${(item.tags || []).slice(0, 4).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
        <span class="content-stat" data-participation-count="${escapeHtml(item.id)}" hidden></span>
      </a>
    `).join("") : `<div class="search-empty"><strong>아직 딱 맞는 카드가 없어요.</strong><p>검색어를 짧게 줄이거나 추천 검색어를 눌러보세요.</p></div>`;
    const url = new URL(window.location.href);
    safeQuery ? url.searchParams.set("q", query.trim()) : url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
    document.dispatchEvent(new CustomEvent("coocoo:content-rendered"));
  }

  tagRoot.innerHTML = recommendedTags.map((tag) => `<button type="button" data-search-tag="${tag}">#${tag}</button>`).join("");
  tagRoot.addEventListener("click", (event) => {
    const button = event.target instanceof HTMLElement ? event.target.closest("[data-search-tag]") : null;
    if (!button) return;
    input.value = button.dataset.searchTag || "";
    render(input.value);
  });
  form.addEventListener("submit", (event) => { event.preventDefault(); render(input.value); });
  input.addEventListener("input", () => render(input.value));

  const initialQuery = new URLSearchParams(window.location.search).get("q") || "";
  input.value = initialQuery;
  render(initialQuery);
})();
