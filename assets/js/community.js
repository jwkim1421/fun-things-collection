(function initializeCommunity() {
  const config = window.SITE_CONFIG || {};
  const apiBaseUrl = String(config.communityApiUrl || "").replace(/\/$/, "");
  const anonymousIdKey = "coocoo_anonymous_id";
  const revisions = new Map();

  function nextRevision(id) {
    const next = (revisions.get(id) || 0) + 1;
    revisions.set(id, next);
    return next;
  }

  function showStatus(panel, message) {
    const status = panel.querySelector("[data-community-status]");
    if (status) status.textContent = message;
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  function getAnonymousId() {
    try {
      const stored = window.localStorage.getItem(anonymousIdKey);
      if (stored) return stored;
      const nextId = createId();
      window.localStorage.setItem(anonymousIdKey, nextId);
      return nextId;
    } catch (error) {
      return createId();
    }
  }

  async function request(path, options = {}) {
    if (!apiBaseUrl) return null;

    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error(`Community API request failed: ${response.status}`);
    }

    return response.json();
  }

  async function getStats(contentIds) {
    const ids = [...new Set(contentIds.filter(Boolean))];
    if (!ids.length) return {};
    const query = new URLSearchParams({
      ids: ids.join(","),
      anonymous_id: getAnonymousId()
    });
    const result = await request(`/api/stats?${query}`);
    return result && result.stats ? result.stats : {};
  }

  async function recordParticipation(contentId) {
    if (new URLSearchParams(window.location.search).get("qa") === "1") return null;
    if (!contentId) return null;
    return request("/api/participations", {
      method: "POST",
      body: JSON.stringify({ contentId, attemptId: createId() })
    });
  }

  async function setReaction(contentId, reaction, active) {
    if (new URLSearchParams(window.location.search).get("qa") === "1") return null;
    return request("/api/reactions", {
      method: "POST",
      body: JSON.stringify({
        contentId,
        reaction,
        active,
        anonymousId: getAnonymousId()
      })
    });
  }

  function formatCount(value) {
    return Number(value || 0).toLocaleString("ko-KR");
  }

  function applyStats(root, stats) {
    root.querySelectorAll("[data-participation-count]").forEach((element) => {
      const stat = stats[element.dataset.participationCount];
      if (!stat) return;
      element.textContent = `${formatCount(stat.participationCount)}회 참여`;
      element.hidden = false;
      element.dataset.state = "ready";
    });

    root.querySelectorAll("[data-reaction-panel]").forEach((panel) => {
      const stat = stats[panel.dataset.contentId];
      if (!stat) return;
      panel.querySelectorAll("[data-reaction]").forEach((button) => {
        const reaction = button.dataset.reaction;
        const active = Boolean(stat.viewer && stat.viewer[reaction]);
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
        const count = button.querySelector("[data-reaction-count]");
        if (count) count.textContent = formatCount(stat[`${reaction}Count`]);
      });
    });
  }

  async function hydrate(root = document) {
    root.querySelectorAll("img").forEach((img) => { if (img.complete && !img.naturalWidth) showUnavailableImage(img); });
    if (!apiBaseUrl) return;
    const ids = Array.from(root.querySelectorAll("[data-participation-count], [data-reaction-panel]"))
      .map((element) => element.dataset.participationCount || element.dataset.contentId)
      .filter(Boolean);
    if (!ids.length) return;
    const requested = new Map(ids.map((id) => [id, nextRevision(id)]));
    const pending = (state, message) => root.querySelectorAll("[data-participation-count]").forEach((element) => {
      if (element.dataset.state === "ready") return;
      element.dataset.state = state;
      element.textContent = message;
      element.hidden = false;
    });
    pending("loading", "참여 수 확인 중…");

    try {
      const stats = await getStats(ids);
      const current = Object.fromEntries(Object.entries(stats).filter(([id]) => requested.get(id) === revisions.get(id)));
      applyStats(root, current);
      pending("error", "참여 수 확인 불가");
      root.querySelectorAll("[data-reaction-panel]").forEach((panel) => {
        if (!stats[panel.dataset.contentId]) showStatus(panel, "반응 수를 불러오지 못했어요. 반응을 누르면 다시 연결해요.");
      });
    } catch (error) {
      pending("error", "참여 수 확인 불가");
      root.querySelectorAll("[data-reaction-panel]").forEach((panel) => showStatus(panel, "반응 수를 불러오지 못했어요. 반응을 누르면 다시 연결해요."));
      console.warn("Community stats could not be loaded.", error);
    }
  }

  document.addEventListener("click", async (event) => {
    const button = event.target instanceof HTMLElement ? event.target.closest("[data-reaction]") : null;
    if (!button) return;
    const panel = button.closest("[data-reaction-panel]");
    if (!panel || button.disabled) return;

    const nextActive = button.getAttribute("aria-pressed") !== "true";
    nextRevision(panel.dataset.contentId);
    const buttons = panel.querySelectorAll("[data-reaction]");
    buttons.forEach((item) => { item.disabled = true; });
    panel.setAttribute("aria-busy", "true");
    showStatus(panel, "반응 저장 중…");
    button.classList.add("is-popping");
    try {
      const result = await setReaction(panel.dataset.contentId, button.dataset.reaction, nextActive);
      nextRevision(panel.dataset.contentId);
      if (result && result.stats) {
        applyStats(document, { [panel.dataset.contentId]: result.stats });
        showStatus(panel, nextActive ? "반응을 남겼어요." : "반응을 취소했어요.");
      } else {
        showStatus(panel, "검사 모드에서는 반응을 저장하지 않아요.");
      }
    } catch (error) {
      showStatus(panel, "저장하지 못했어요. 같은 버튼을 눌러 다시 시도해주세요.");
      console.warn("Reaction could not be saved.", error);
    } finally {
      window.setTimeout(() => button.classList.remove("is-popping"), 420);
      buttons.forEach((item) => { item.disabled = false; });
      panel.setAttribute("aria-busy", "false");
    }
  });

  document.addEventListener("coocoo:content-rendered", () => hydrate(document));
  document.addEventListener("DOMContentLoaded", () => hydrate(document));
  window.addEventListener("pageshow", (event) => { if (event.persisted) hydrate(document); });
  window.addEventListener("online", () => hydrate(document));
  function showUnavailableImage(img) {
    if (img?.tagName !== "IMG" || !img.src.includes("/covers/") || img.dataset.fallback) return;
    img.dataset.fallback = "true";
    img.classList.add("is-unavailable");
    img.alt = "그림을 불러오지 못했어요";
    img.src = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="720" height="480"><rect width="720" height="480" fill="#f0f1ed"/><text x="360" y="245" text-anchor="middle" font-size="26" fill="#61675d">그림을 불러오지 못했어요</text></svg>')}`;
  }
  document.addEventListener("error", (event) => showUnavailableImage(event.target), true);

  window.COOCOO_COMMUNITY = { getAnonymousId, getStats, recordParticipation, setReaction, hydrate };
})();
