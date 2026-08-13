(function initializeCommunity() {
  const config = window.SITE_CONFIG || {};
  const apiBaseUrl = String(config.communityApiUrl || "").replace(/\/$/, "");
  const anonymousIdKey = "coocoo_anonymous_id";

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
    if (!contentId) return null;
    return request("/api/participations", {
      method: "POST",
      body: JSON.stringify({ contentId, attemptId: createId() })
    });
  }

  async function setReaction(contentId, reaction, active) {
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
    if (!apiBaseUrl) return;
    const ids = Array.from(root.querySelectorAll("[data-participation-count], [data-reaction-panel]"))
      .map((element) => element.dataset.participationCount || element.dataset.contentId)
      .filter(Boolean);
    if (!ids.length) return;

    try {
      applyStats(root, await getStats(ids));
    } catch (error) {
      console.warn("Community stats could not be loaded.", error);
    }
  }

  document.addEventListener("click", async (event) => {
    const button = event.target instanceof HTMLElement ? event.target.closest("[data-reaction]") : null;
    if (!button) return;
    const panel = button.closest("[data-reaction-panel]");
    if (!panel || button.disabled) return;

    const nextActive = button.getAttribute("aria-pressed") !== "true";
    button.disabled = true;
    button.classList.add("is-popping");
    try {
      const result = await setReaction(panel.dataset.contentId, button.dataset.reaction, nextActive);
      if (result && result.stats) applyStats(document, { [panel.dataset.contentId]: result.stats });
    } catch (error) {
      console.warn("Reaction could not be saved.", error);
    } finally {
      window.setTimeout(() => button.classList.remove("is-popping"), 420);
      button.disabled = false;
    }
  });

  document.addEventListener("coocoo:content-rendered", () => hydrate(document));
  document.addEventListener("DOMContentLoaded", () => hydrate(document));

  window.COOCOO_COMMUNITY = { getAnonymousId, getStats, recordParticipation, setReaction, hydrate };
})();
