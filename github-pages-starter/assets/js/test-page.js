function getTestPageData() {
  const testId = document.body && document.body.dataset ? document.body.dataset.testId : "";
  const content = window.SITE_CONTENT || {};
  const pages = content.pages || {};
  const cards = Array.isArray(content.cards) ? content.cards : [];

  if (!testId || !pages[testId]) {
    return null;
  }

  return {
    testId,
    page: pages[testId],
    card: cards.find((item) => item.id === testId) || null,
    cards
  };
}

function applyTestTheme(card) {
  if (!document.body) {
    return;
  }

  const thumb = card && card.thumb ? card.thumb : "linear-gradient(135deg, #fff1bf, #e7e7ff)";
  document.body.style.setProperty("--test-theme", thumb);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getRelatedCards(page, cards) {
  return (page.relatedIds || [])
    .map((id) => cards.find((card) => card.id === id))
    .filter(Boolean);
}

function getSharedResultKey(page) {
  try {
    const currentUrl = new URL(window.location.href);
    const resultKey = currentUrl.searchParams.get("result");
    return resultKey && page.results && page.results[resultKey] ? resultKey : "";
  } catch (error) {
    return "";
  }
}

function getAdSlotData(testId, placement) {
  const content = window.SITE_CONTENT || {};
  const adSlots = content.adSlots || {};
  const tests = adSlots.tests || {};
  const testSlots = tests[testId] || {};
  return testSlots[placement] || null;
}

function buildShareUrl(resultKey) {
  const currentUrl = new URL(window.location.href);
  if (resultKey) {
    currentUrl.searchParams.set("result", resultKey);
  } else {
    currentUrl.searchParams.delete("result");
  }

  return currentUrl.toString();
}

function applyShareState(page, resultKey) {
  if (!document.body || !document.body.dataset) {
    return;
  }

  if (!resultKey || !page.results || !page.results[resultKey]) {
    document.body.dataset.shareUrl = buildShareUrl("");
    document.body.dataset.shareTitle = `${page.title} | ${((window.SITE_CONFIG && window.SITE_CONFIG.siteName) || "쿠쿠")}`;
    document.body.dataset.shareDescription = page.summary || "";
    document.body.dataset.shareButtonTitle = "테스트 열기";
    return;
  }

  const result = page.results[resultKey];
  const siteName = ((window.SITE_CONFIG && window.SITE_CONFIG.siteName) || "쿠쿠");
  document.body.dataset.shareUrl = buildShareUrl(resultKey);
  document.body.dataset.shareTitle = `${page.title} - ${result.title} | ${siteName}`;
  document.body.dataset.shareDescription = result.summary || page.summary || "";
  document.body.dataset.shareButtonTitle = "결과 확인하기";
}

function decorateNavPills() {
  document.querySelectorAll(".test-nav-pills span").forEach((pill) => {
    const text = pill.textContent ? pill.textContent.trim().replace(/^#/, "") : "";
    const nextText = text === "공유" ? "테스트" : text;
    pill.textContent = `#${nextText}`;
  });
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

function hydrateCoupangSlots(root) {
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
          slot.textContent = `${slot.dataset.coupangWidth || "680"} x ${slot.dataset.coupangHeight || "110"}`;
        }
      });
    });
}

function renderInlineAd(testId, placement = "journey") {
  const slot = getAdSlotData(testId, placement);
  const products = slot && Array.isArray(slot.products) ? slot.products : [];
  const label = slot && slot.sizeLabel ? slot.sizeLabel : "728 x 90";
  const dynamic = slot && slot.coupangDynamic ? slot.coupangDynamic : null;

  return `
    <section class="test-inline-ad" aria-label="Advertisement">
      <div class="ad-card ad-card-horizontal affiliate-slot-card">
        <div class="ad-label">Ad</div>
        ${slot ? `
          <div class="affiliate-slot-copy affiliate-slot-copy-inline">
            <strong class="affiliate-slot-title">${escapeHtml(slot.heading)}</strong>
            <p class="affiliate-slot-description">${escapeHtml(slot.description)}</p>
            <div class="affiliate-slot-tags">
              ${products.map((product) => `<span class="affiliate-slot-tag">${escapeHtml(product)}</span>`).join("")}
            </div>
          </div>
        ` : ""}
        ${dynamic ? `
          <div
            class="affiliate-banner-embed affiliate-banner-embed-dynamic"
            data-coupang-slot="${escapeHtml(slot && slot.slotId ? slot.slotId : `${testId}-${placement}`)}"
            data-coupang-dynamic="${escapeHtml(slot && slot.slotId ? slot.slotId : `${testId}-${placement}`)}"
            data-coupang-id="${escapeHtml(String(dynamic.id))}"
            data-coupang-template="${escapeHtml(dynamic.template)}"
            data-coupang-tracking="${escapeHtml(dynamic.trackingCode)}"
            data-coupang-width="${escapeHtml(dynamic.width)}"
            data-coupang-height="${escapeHtml(dynamic.height)}">${escapeHtml(label)}</div>
        ` : `
          <div
            class="ad-placeholder ad-placeholder-horizontal"
            data-coupang-slot="${escapeHtml(slot && slot.slotId ? slot.slotId : `${testId}-${placement}`)}">${escapeHtml(label)}</div>
        `}
      </div>
      <p class="affiliate-disclosure">이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.</p>
    </section>
  `;
}

function renderShareIcon(type) {
  if (type === "copy") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="8" width="10" height="11" rx="2"></rect>
        <rect x="5" y="4" width="10" height="11" rx="2"></rect>
      </svg>
    `;
  }

  if (type === "sms") {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"></path>
        <path d="M7 10h10"></path>
        <path d="M7 13h7"></path>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4c5.2 0 9 3.3 9 7.4S17.2 19 12.8 19l-4.5 2.4.9-3.4C6.2 17 3 14.4 3 11.4 3 7.3 6.8 4 12 4Z"></path>
      <path d="M9.2 10.3h5.6"></path>
      <path d="M9.2 13.2h3.7"></path>
    </svg>
  `;
}

function scoreAnswers(page, answers) {
  const totals = {};

  Object.keys(page.results || {}).forEach((key) => {
    totals[key] = 0;
  });

  answers.forEach((answerIndex, questionIndex) => {
    const question = page.questions[questionIndex];
    const option = question && question.options ? question.options[answerIndex] : null;

    if (!option || !option.scores) {
      return;
    }

    Object.entries(option.scores).forEach(([key, score]) => {
      totals[key] = (totals[key] || 0) + score;
    });
  });

  const ranking = Object.entries(totals).sort((left, right) => right[1] - left[1]);
  return ranking.length ? ranking[0][0] : "";
}

function renderIntroScreen(page) {
  const testId = document.body && document.body.dataset ? document.body.dataset.testId : "";
  const stickers = (page.heroArt && page.heroArt.stickers) || [];
  const centerEmoji = (page.heroArt && page.heroArt.centerEmoji) || "🚂";

  return `
    <div class="test-flow-stack">
      <section class="test-card-shell intro-shell">
        <div class="test-card-tab">${escapeHtml(page.title)}</div>
        <article class="test-card intro-card">
          <div class="intro-art">
            <div class="intro-stickers">
              ${stickers.map((sticker) => `<span>${escapeHtml(sticker)}</span>`).join("")}
            </div>
            <div class="intro-center-mark">${escapeHtml(centerEmoji)}</div>
            <div class="intro-copy">
              <strong>${escapeHtml(page.heroCardTitle || page.title)}</strong>
              <span>${escapeHtml(page.heroCardSubtitle || page.summary)}</span>
            </div>
          </div>
          <button class="test-main-button" type="button" data-action="start-test">
            ${escapeHtml(page.startLabel || "테스트 시작하기")}
          </button>
        </article>
      </section>
      ${renderInlineAd(testId, "start")}
    </div>
  `;
}

function renderQuestionScreen(page, questionIndex) {
  const testId = document.body && document.body.dataset ? document.body.dataset.testId : "";
  const question = page.questions[questionIndex];
  const total = page.questions.length;
  const current = questionIndex + 1;
  const answeredCount = questionIndex;
  const progressPercent = Math.round((answeredCount / total) * 100);

  return `
    <div class="test-flow-stack">
      <section class="test-card-shell question-shell">
        <div class="test-card-tab">${escapeHtml(page.title)}</div>
        <article class="test-card question-card">
          <div class="test-progress-head">
            <strong>QUESTION ${current} / ${total}</strong>
            <span>${progressPercent}%</span>
          </div>
          <div class="test-progress-track" aria-hidden="true">
            <div class="test-progress-fill" style="width:${progressPercent}%"></div>
            <div class="test-progress-train" style="left:calc(${progressPercent}% - 18px)">🚂</div>
          </div>
          <section class="question-panel">
            <h1>${escapeHtml(question.prompt)}</h1>
            <div class="question-choice-list">
              ${question.options.map((option, optionIndex) => `
                <button
                  class="question-choice"
                  type="button"
                  data-action="choose-answer"
                  data-question-index="${questionIndex}"
                  data-option-index="${optionIndex}">
                  ${escapeHtml(option.label)}
                </button>
              `).join("")}
            </div>
          </section>
        </article>
      </section>
      ${renderInlineAd(testId, "journey")}
    </div>
  `;
}

function renderLoadingScreen(page) {
  const testId = document.body && document.body.dataset ? document.body.dataset.testId : "";
  const total = page.questions.length;
  return `
    <div class="test-flow-stack">
      <section class="loading-shell">
        <article class="loading-card">
          <div class="test-progress-head loading-progress-head">
            <strong>QUESTION ${total} / ${total}</strong>
            <span>100%</span>
          </div>
          <div class="test-progress-track loading-progress-track" aria-hidden="true">
            <div class="test-progress-fill" style="width:100%"></div>
            <div class="test-progress-train" style="left:calc(100% - 36px)">🚂</div>
          </div>
          <div class="loading-orb">🚉</div>
          <p class="loading-copyright">쿠쿠 테스트 로딩 중</p>
          <h1>${escapeHtml(page.loadingTitle || "결과를 불러오는 중")}</h1>
          <p>${escapeHtml(page.loadingMessage || "")}</p>
          <p class="loading-hint">${escapeHtml(page.loadingHint || "")}</p>
        </article>
      </section>
      ${renderInlineAd(testId, "journey")}
    </div>
  `;
}

function renderResultScreen(page, resultKey, cards) {
  const testId = document.body && document.body.dataset ? document.body.dataset.testId : "";
  const result = page.results[resultKey];
  const relatedCards = getRelatedCards(page, cards);
  const preview = (page.resultPreview || [])
    .map((label) => `<span class="result-pill">${escapeHtml(label)}</span>`)
    .join("");
  const resultHeaderTitle = page.resultHeaderTitle || "나의 결과는?";
  const resultTraitTitle = page.resultTraitTitle || "이런 타입이에요";
  const relatedSectionTitle = page.relatedSectionTitle || "다음 테스트도 이어서 보기";
  const shareSectionTitle = page.shareSectionTitle || "공유용 요약";

  return `
    <div class="test-flow-stack">
      <section class="test-card-shell result-shell">
        <div class="test-card-tab">${escapeHtml(page.title)}</div>
        <article class="test-card result-card">
        <section class="result-header-board">
          <div class="result-header-title">${escapeHtml(resultHeaderTitle)}</div>
          <div class="result-header-body">
            <div class="result-avatar-box">
              <div class="result-avatar">${escapeHtml(result.heroEmoji || "💗")}</div>
              <strong>${escapeHtml(result.title)}</strong>
            </div>
            <div class="result-summary-box">
              <div class="result-mini-badge">${escapeHtml(result.matchTitle || "결과")}</div>
              <div class="result-summary-copy">
                <strong>${escapeHtml(result.summary)}</strong>
                <p>${escapeHtml(result.description)}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(resultTraitTitle)}</div>
          <div class="result-section-body result-traits">
            ${result.strengths.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
            <p class="result-tip-line">${escapeHtml(result.tip)}</p>
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(result.moodTitle || "추천 무드")}</div>
          <div class="result-section-body result-chip-board">
            ${result.moodItems.map((item) => `<span class="result-pill">${escapeHtml(item)}</span>`).join("")}
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(result.matchTitle || "찰떡 궁합")}</div>
          <div class="result-section-body result-match-board">
            <strong>${escapeHtml(result.matchLabel || "")}</strong>
            <p>${escapeHtml(result.matchDescription || "")}</p>
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(relatedSectionTitle)}</div>
          <div class="result-section-body result-related-grid">
            ${relatedCards.map((card) => `
              <a class="result-related-card" href="${card.href}">
                <div class="result-related-icon">${escapeHtml(card.icon || "◉")}</div>
                <strong>${escapeHtml(card.title)}</strong>
                <span>${escapeHtml(card.description)}</span>
              </a>
            `).join("")}
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(shareSectionTitle)}</div>
          <div class="result-section-body result-preview-board">
            <p>${escapeHtml(page.callout || "")}</p>
            <div class="result-preview-pills">${preview}</div>
          </div>
        </section>

        <div class="result-share-row">
          <button class="share-icon-btn" id="btnCopyLink" type="button" aria-label="링크 복사" title="링크 복사">
            ${renderShareIcon("copy")}
          </button>
          <button class="share-icon-btn" id="btnSmsShare" type="button" aria-label="문자 공유" title="문자 공유">
            ${renderShareIcon("sms")}
          </button>
          <button class="share-icon-btn share-icon-btn-kakao" id="btnKakaoShare" type="button" aria-label="카카오 공유" title="카카오 공유">
            ${renderShareIcon("kakao")}
            <span class="share-icon-btn-label">Kakao</span>
          </button>
        </div>

        <div class="result-action-row">
          <button class="test-main-button" type="button" data-action="restart-test">
            ${escapeHtml(page.resetButtonLabel || "다시 해보기")}
          </button>
          <a class="test-sub-button" href="../index.html">
            ${escapeHtml(page.otherTestLabel || "다른 테스트 해보기")}
          </a>
        </div>
        </article>
      </section>
      ${renderInlineAd(testId, "result")}
    </div>
  `;
}

function createTestApp(data) {
  const root = document.getElementById("testApp");
  if (!root) {
    return null;
  }

  const initialSharedResultKey = getSharedResultKey(data.page);

  const state = {
    screen: initialSharedResultKey ? "result" : "intro",
    currentQuestion: 0,
    answers: [],
    resultKey: initialSharedResultKey
  };

  let loadingTimer = null;

  function clearLoadingTimer() {
    if (loadingTimer) {
      window.clearTimeout(loadingTimer);
      loadingTimer = null;
    }
  }

  function render() {
    if (state.screen === "intro") {
      applyShareState(data.page, "");
      root.innerHTML = renderIntroScreen(data.page);
      hydrateCoupangSlots(root);
      return;
    }

    if (state.screen === "question") {
      applyShareState(data.page, "");
      root.innerHTML = renderQuestionScreen(data.page, state.currentQuestion);
      hydrateCoupangSlots(root);
      return;
    }

    if (state.screen === "loading") {
      applyShareState(data.page, "");
      root.innerHTML = renderLoadingScreen(data.page);
      hydrateCoupangSlots(root);
      return;
    }

    if (state.screen === "result") {
      applyShareState(data.page, state.resultKey);
      root.innerHTML = renderResultScreen(data.page, state.resultKey, data.cards);
      hydrateCoupangSlots(root);
    }
  }

  function startLoadingAndResolve() {
    state.screen = "loading";
    render();
    clearLoadingTimer();
    loadingTimer = window.setTimeout(() => {
      state.resultKey = scoreAnswers(data.page, state.answers);
      state.screen = "result";
      render();
    }, 1400);
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-action]") : null;
    if (!target) {
      return;
    }

    const action = target.getAttribute("data-action");

    if (action === "start-test") {
      state.screen = "question";
      state.currentQuestion = 0;
      state.answers = [];
      state.resultKey = "";
      render();
      return;
    }

    if (action === "choose-answer") {
      const questionIndex = Number(target.getAttribute("data-question-index"));
      const optionIndex = Number(target.getAttribute("data-option-index"));

      state.answers[questionIndex] = optionIndex;

      if (questionIndex >= data.page.questions.length - 1) {
        startLoadingAndResolve();
        return;
      }

      state.currentQuestion = questionIndex + 1;
      render();
      return;
    }

    if (action === "restart-test") {
      clearLoadingTimer();
      state.screen = "intro";
      state.currentQuestion = 0;
      state.answers = [];
      state.resultKey = "";
      render();
    }
  });

  render();
  return {
    destroy() {
      clearLoadingTimer();
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const data = getTestPageData();
  if (!data) {
    return;
  }

  const siteName = (window.SITE_CONFIG && window.SITE_CONFIG.siteName) || "쿠쿠";
  const pageTitle = data.page.title || data.card?.title || document.title;
  const description = data.page.summary || data.card?.description || "";

  document.title = `${pageTitle} | ${siteName}`;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && description) {
    metaDescription.setAttribute("content", description);
  }

  applyTestTheme(data.card);
  decorateNavPills();
  createTestApp(data);
});
