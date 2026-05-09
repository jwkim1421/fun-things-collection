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
  const stickers = (page.heroArt && page.heroArt.stickers) || [];
  const centerEmoji = (page.heroArt && page.heroArt.centerEmoji) || "🚂";

  return `
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
  `;
}

function renderQuestionScreen(page, questionIndex) {
  const question = page.questions[questionIndex];
  const total = page.questions.length;
  const current = questionIndex + 1;
  const answeredCount = questionIndex;
  const progressPercent = Math.round((answeredCount / total) * 100);

  return `
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
        <p class="test-card-footnote">한 손으로 답하기 편하도록 한 문항씩만 보여드리고 있어요.</p>
      </article>
    </section>
  `;
}

function renderLoadingScreen(page) {
  const total = page.questions.length;
  return `
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
  `;
}

function renderResultScreen(page, resultKey, cards) {
  const result = page.results[resultKey];
  const relatedCards = getRelatedCards(page, cards);
  const preview = (page.resultPreview || [])
    .map((label) => `<span class="result-pill">${escapeHtml(label)}</span>`)
    .join("");

  return `
    <section class="test-card-shell result-shell">
      <div class="test-card-tab">${escapeHtml(page.title)}</div>
      <article class="test-card result-card">
        <section class="result-header-board">
          <div class="result-header-title">나의 연애 열차 타입은?</div>
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
          <div class="result-section-title">나는 이런 연애 타입!</div>
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
          <div class="result-section-title">다음 테스트도 이어서 보기</div>
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
          <div class="result-section-title">공유용 요약</div>
          <div class="result-section-body result-preview-board">
            <p>${escapeHtml(page.callout || "")}</p>
            <div class="result-preview-pills">${preview}</div>
          </div>
        </section>

        <div class="result-share-row">
          <button class="ghost-btn" id="btnCopyLink" type="button">링크 복사</button>
          <button class="ghost-btn" id="btnSmsShare" type="button">문자 공유</button>
          <button class="solid-btn" id="btnKakaoShare" type="button">카카오 공유</button>
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
  `;
}

function createTestApp(data) {
  const root = document.getElementById("testApp");
  if (!root) {
    return null;
  }

  const state = {
    screen: "intro",
    currentQuestion: 0,
    answers: [],
    resultKey: ""
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
      root.innerHTML = renderIntroScreen(data.page);
      return;
    }

    if (state.screen === "question") {
      root.innerHTML = renderQuestionScreen(data.page, state.currentQuestion);
      return;
    }

    if (state.screen === "loading") {
      root.innerHTML = renderLoadingScreen(data.page);
      return;
    }

    if (state.screen === "result") {
      root.innerHTML = renderResultScreen(data.page, state.resultKey, data.cards);
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

  document.title = data.page.title || data.card?.title || document.title;
  createTestApp(data);
});
