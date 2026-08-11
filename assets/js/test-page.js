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

function getContentAnalyticsParams(page) {
  const testId = document.body && document.body.dataset ? document.body.dataset.testId : "";
  const questions = Array.isArray(page.questions) ? page.questions : [];
  const formats = new Set(questions.map((question) => question.layout || page.questionLayout || "buttons"));

  return {
    content_id: testId,
    content_title: page.title || "",
    content_category: page.category || "테스트",
    content_format: page.contentFormat || Array.from(formats).join(",") || "buttons",
    question_count: questions.length
  };
}

function trackContentEvent(eventName, page, parameters = {}) {
  if (!(window.COOCOO_ANALYTICS && typeof window.COOCOO_ANALYTICS.track === "function")) {
    return;
  }

  window.COOCOO_ANALYTICS.track(eventName, Object.assign(getContentAnalyticsParams(page), parameters));
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

  const defaultImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
  const defaultTheme = page.thumb || "linear-gradient(135deg, #fff1bf, #e7e7ff)";
  const mascotUrl = `${window.location.origin}/assets/images/coocoo.png`;

  if (!resultKey || !page.results || !page.results[resultKey]) {
    document.body.dataset.shareUrl = buildShareUrl("");
    document.body.dataset.shareTitle = page.shareTitle || `${page.title} | ${((window.SITE_CONFIG && window.SITE_CONFIG.siteName) || "쿠쿠")}`;
    document.body.dataset.shareDescription = page.shareDescription || page.summary || "";
    document.body.dataset.shareImage = page.shareImage || defaultImage;
    document.body.dataset.shareButtonTitle = "테스트 열기";
    document.body.dataset.shareContext = "page";
    document.body.dataset.shareTestTitle = page.title || "";
    document.body.dataset.shareResultTitle = "";
    document.body.dataset.shareResultSummary = page.summary || "";
    document.body.dataset.shareResultDescription = page.shareDescription || page.summary || "";
    document.body.dataset.shareResultIcon = page.heroEmoji || page.icon || "✨";
    document.body.dataset.shareTheme = defaultTheme;
    document.body.dataset.shareMascot = mascotUrl;
    return;
  }

  const result = page.results[resultKey];
  const siteName = ((window.SITE_CONFIG && window.SITE_CONFIG.siteName) || "쿠쿠");
  const shareDescription = result.shareDescription || result.summary || page.shareDescription || page.summary || "";
  const extendedCopy = buildResultExtendedCopy(result);
  const combinedDescription = [result.description || "", extendedCopy].filter(Boolean).join(" ");
  document.body.dataset.shareUrl = buildShareUrl(resultKey);
  document.body.dataset.shareTitle = result.shareTitle || `${page.title} - ${result.title} | ${siteName}`;
  document.body.dataset.shareDescription = shareDescription;
  document.body.dataset.shareImage = result.shareImage || page.shareImage || defaultImage;
  document.body.dataset.shareButtonTitle = "결과 확인하기";
  document.body.dataset.shareContext = "result";
  document.body.dataset.shareTestTitle = page.title || "";
  document.body.dataset.shareResultTitle = result.title || "";
  document.body.dataset.shareResultSummary = result.summary || "";
  document.body.dataset.shareResultDescription = combinedDescription || shareDescription;
  document.body.dataset.shareResultIcon = result.heroEmoji || page.heroEmoji || page.icon || "✨";
  document.body.dataset.shareTheme = defaultTheme;
  document.body.dataset.shareMascot = mascotUrl;
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
  const label = slot && slot.sizeLabel ? slot.sizeLabel : "728 x 90";
  const dynamic = slot && slot.coupangDynamic ? slot.coupangDynamic : null;

  return `
    <section class="test-inline-ad" aria-label="Advertisement">
      <div class="ad-card ad-card-horizontal affiliate-slot-card">
        <div class="ad-label">Ad</div>
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

function buildResultExtendedCopy(result) {
  const strengths = Array.isArray(result.strengths) ? result.strengths.slice(0, 2) : [];
  const emphasis = strengths.length
    ? `특히 ${strengths.join(", ")} 쪽에서 강점이 또렷하게 드러납니다.`
    : "";
  const tip = result.tip ? result.tip : "";

  return [emphasis, tip].filter(Boolean).join(" ");
}

function buildResultTraitExtended(result) {
  const strengths = Array.isArray(result.strengths) ? result.strengths.filter(Boolean) : [];
  const first = strengths[0] || result.summary || "이 타입";
  const second = strengths[1] || result.matchLabel || "주변 사람";
  const third = strengths[2] || result.moodItems?.[0] || "일상 패턴";

  return `${first}이 기본 결이라면, ${second}처럼 이어지는 관계나 상황에서 반응이 더 선명해집니다. 특히 ${third} 쪽으로 움직일 때 당신답다는 느낌이 또렷해질 가능성이 큽니다.`;
}

function toKeywordCandidate(text) {
  const cleaned = String(text || "")
    .replace(/[.,!?]/g, "")
    .trim();

  if (!cleaned) {
    return "";
  }

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return parts.slice(0, 2).join(" ");
  }

  return cleaned.slice(0, 8);
}

function buildResultTraitLead(result) {
  const strengths = Array.isArray(result.strengths) ? result.strengths.filter(Boolean) : [];
  const summary = result.summary || result.title || "";
  const first = strengths[0] || "";
  const second = strengths[1] || "";
  const lines = [];

  if (summary && first) {
    lines.push(`${summary}인 만큼, 일상에서는 ${first} 쪽으로 성향이 드러나는 편입니다.`);
  } else if (summary) {
    lines.push(`${summary} 성향은 일상에서 비교적 꾸준하게 반복되는 패턴으로 나타납니다.`);
  }

  if (second) {
    lines.push(`${second} 감각도 함께 가지고 있어서, 상황에 따라 반응 방식이 더 선명하게 읽힐 수 있어요.`);
  } else if (first) {
    lines.push(`${first}이 눈에 띄는 포인트라서 주변 사람도 비교적 빠르게 이 무드를 알아차릴 가능성이 큽니다.`);
  }

  return lines.join(" ");
}

function buildResultKeywords(result) {
  const moodItems = Array.isArray(result.moodItems) ? result.moodItems : [];
  const strengths = Array.isArray(result.strengths) ? result.strengths : [];
  const extras = strengths.map(toKeywordCandidate).filter(Boolean);
  const fallbackSeed = [
    toKeywordCandidate(result.title),
    toKeywordCandidate(result.summary),
    toKeywordCandidate(result.tip),
    "쿠쿠 무드",
    "관계 리듬",
    "감정 패턴",
    "상황 해석",
    "일상 리듬",
    "반응 포인트"
  ];
  const candidates = [...moodItems, ...extras, toKeywordCandidate(result.matchLabel), ...fallbackSeed]
    .filter(Boolean);
  const unique = [];

  candidates.forEach((item) => {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  });

  const fallbackKeywords = ["쿠쿠 타입", "관계 감각", "리듬 포인트", "무드 결", "생활 패턴"];
  fallbackKeywords.forEach((item) => {
    if (unique.length < 5 && !unique.includes(item)) {
      unique.push(item);
    }
  });

  return unique.slice(0, 5);
}

function buildResultMatchExtended(result) {
  const strengths = Array.isArray(result.strengths) ? result.strengths : [];
  const anchor = strengths[0] || result.summary || "이 결과";
  const matchLabel = result.matchLabel || "상대";

  return `${matchLabel} 타입은 ${anchor} 쪽 성향을 자연스럽게 받아주거나 보완해주는 편이라, 함께 있을 때 리듬이 더 편안하게 맞춰질 가능성이 큽니다.`;
}

function buildResultMatchFollowup(result) {
  const moodItems = Array.isArray(result.moodItems) ? result.moodItems.filter(Boolean) : [];
  const firstMood = moodItems[0] || "지금의 무드";
  const secondMood = moodItems[1] || "관계 흐름";

  return `${firstMood}을 더 자연스럽게 꺼내게 해주고, ${secondMood}이 필요한 순간에는 서로의 템포를 조절해주기 쉬운 조합입니다. 그래서 오래 갈수록 편안함과 재미를 같이 느끼기 좋은 편이에요. 가까워질수록 서로를 억지로 바꾸기보다, 각자의 강점을 편하게 살려주는 식의 궁합으로 이어질 가능성이 큽니다.`;
}

function buildResultTraitFollowup(result) {
  const firstStrength = Array.isArray(result.strengths) && result.strengths[0] ? result.strengths[0] : "지금의 리듬";
  const secondStrength = Array.isArray(result.strengths) && result.strengths[1] ? result.strengths[1] : "관계 감각";
  const tip = result.tip || "지금의 호흡을 믿고 가볍게 조절해보세요.";

  return `${firstStrength}이 핵심 축이라면, ${secondStrength}은 일상에서 그 성향을 더 자연스럽게 드러내는 장치에 가깝습니다. 그래서 지금의 결과는 단순 취향보다, 요즘 내가 어떤 방식으로 반응하고 회복하는지를 비교적 선명하게 보여주는 편이에요. ${tip}`;
}

function buildResultMatchDetail(result) {
  const label = result.matchLabel || "상대";
  const summary = result.summary || "지금의 성향";

  return `${label} 타입과 함께 있을 때는 ${summary}이 조금 더 편안하고 안정적으로 드러나는 경우가 많습니다. 서로의 속도와 거리감이 어긋나기보다 맞물릴 가능성이 높아서, 일상적인 대화나 약속에서도 피로감보다 자연스러운 합이 먼저 느껴질 수 있어요.`;
}

function scoreAnswers(page, answers) {
  if (page.scoringMode === "range-total") {
    const totalScore = answers.reduce((sum, answerIndex, questionIndex) => {
      const question = page.questions[questionIndex];
      const option = question && question.options ? question.options[answerIndex] : null;
      return sum + Number(option && option.points ? option.points : 0);
    }, 0);

    const matchedRange = (page.resultRanges || []).find((range) => (
      totalScore >= Number(range.min) && totalScore <= Number(range.max)
    ));

    if (matchedRange && matchedRange.key && page.results && page.results[matchedRange.key]) {
      return matchedRange.key;
    }
  }

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
  const layout = question.layout || page.questionLayout || (question.options.length >= 5 ? "five-choice" : "buttons");

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
            <div class="test-progress-train" style="left:clamp(18px, ${progressPercent}%, calc(100% - 18px))">🚂</div>
          </div>
          <section class="question-panel">
            <h1>${escapeHtml(question.prompt)}</h1>
            <div class="question-choice-list ${layout === "image-grid" ? "is-image-grid" : ""} ${layout === "five-choice" ? "is-five-choice" : ""}">
              ${question.options.map((option, optionIndex) => `
                <button
                  class="question-choice ${layout === "image-grid" ? "question-choice-image" : ""} ${layout === "five-choice" ? "question-choice-compact" : ""}"
                  type="button"
                  data-action="choose-answer"
                  data-question-index="${questionIndex}"
                  data-option-index="${optionIndex}">
                  ${layout === "image-grid"
                    ? `
                      <span class="question-choice-emoji">${escapeHtml(option.emoji || "🪄")}</span>
                      <span class="question-choice-label">${escapeHtml(option.label)}</span>
                      ${option.description ? `<small class="question-choice-help">${escapeHtml(option.description)}</small>` : ""}
                    `
                    : `
                      <span class="question-choice-label">${escapeHtml(option.label)}</span>
                      ${option.description ? `<small class="question-choice-help">${escapeHtml(option.description)}</small>` : ""}
                    `
                  }
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
            <div class="test-progress-train" style="left:calc(100% - 18px)">🚂</div>
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
  const sharePrompt = page.sharePrompt || `이 결과를 친구에게 보내고 “너도 나를 이렇게 봤어?”라고 물어보세요.`;
  const resultExtendedCopy = buildResultExtendedCopy(result);
  const resultTraitLead = buildResultTraitLead(result);
  const resultKeywords = buildResultKeywords(result);
  const resultMatchExtended = buildResultMatchExtended(result);
  const resultTraitFollowup = buildResultTraitFollowup(result);
  const resultMatchDetail = buildResultMatchDetail(result);

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
                ${resultExtendedCopy ? `<p class="result-summary-extended">${escapeHtml(resultExtendedCopy)}</p>` : ""}
              </div>
            </div>
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(resultTraitTitle)}</div>
          <div class="result-section-body result-traits">
            ${resultTraitLead ? `<p class="result-traits-lead">${escapeHtml(resultTraitLead)}</p>` : ""}
            ${result.strengths.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
            <p class="result-tip-line">${escapeHtml(result.tip)}</p>
            <p class="result-traits-extended">${escapeHtml(buildResultTraitExtended(result))}</p>
            <p class="result-traits-followup">${escapeHtml(resultTraitFollowup)}</p>
          </div>
        </section>

        <aside class="result-kuku-comment">
          <img src="../assets/images/coocoo.png" alt="" />
          <div>
            <span>쿠쿠의 한마디</span>
            <p>${escapeHtml(result.kukuComment || result.tip || "이 결과, 친구 거랑 나란히 놓으면 더 웃길지도 몰라.")}</p>
          </div>
        </aside>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(result.moodTitle || "추천 무드")}</div>
          <div class="result-section-body result-chip-board">
            ${resultKeywords.map((item) => `<span class="result-pill">${escapeHtml(item)}</span>`).join("")}
          </div>
        </section>

        <section class="result-section">
          <div class="result-section-title">${escapeHtml(result.matchTitle || "찰떡 궁합")}</div>
          <div class="result-section-body result-match-board">
            <strong>${escapeHtml(result.matchLabel || "")}</strong>
            <p>${escapeHtml(result.matchDescription || "")}</p>
            <p class="result-match-extended">${escapeHtml(resultMatchExtended)}</p>
            <p class="result-match-detail">${escapeHtml(resultMatchDetail)}</p>
            <p class="result-match-followup">${escapeHtml(buildResultMatchFollowup(result))}</p>
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

        <p class="result-share-nudge">${escapeHtml(sharePrompt)}</p>
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
    resultKey: initialSharedResultKey,
    startedAt: 0
  };

  let loadingTimer = null;
  let restoringHistory = false;

  function snapshotState() {
    return {
      currentQuestion: state.currentQuestion,
      answers: [...state.answers],
      resultKey: state.resultKey,
      startedAt: state.startedAt
    };
  }

  function restoreSnapshot(snapshot = {}) {
    state.currentQuestion = Number(snapshot.currentQuestion) || 0;
    state.answers = Array.isArray(snapshot.answers) ? [...snapshot.answers] : [];
    state.resultKey = snapshot.resultKey || "";
    state.startedAt = Number(snapshot.startedAt) || 0;
  }

  function writeHistory(screen, options = {}) {
    if (restoringHistory) {
      return;
    }

    const url = new URL(window.location.href);
    if (screen === "result" && state.resultKey) {
      url.searchParams.set("result", state.resultKey);
    } else {
      url.searchParams.delete("result");
    }

    const historyState = {
      coocooTest: true,
      testId: data.testId,
      screen,
      snapshot: snapshotState()
    };
    const method = options.replace ? "replaceState" : "pushState";
    window.history[method](historyState, "", url);
  }

  function scrollTestToTop() {
    window.requestAnimationFrame(() => {
      const top = Math.max(0, root.getBoundingClientRect().top + window.scrollY - 12);
      window.scrollTo({ top, left: 0, behavior: "auto" });
    });
  }

  function clearLoadingTimer() {
    if (loadingTimer) {
      window.clearTimeout(loadingTimer);
      loadingTimer = null;
    }
  }

  function render(options = {}) {
    if (state.screen === "intro") {
      applyShareState(data.page, "");
      root.innerHTML = renderIntroScreen(data.page);
      hydrateCoupangSlots(root);
    } else if (state.screen === "question") {
      applyShareState(data.page, "");
      root.innerHTML = renderQuestionScreen(data.page, state.currentQuestion);
      hydrateCoupangSlots(root);
    } else if (state.screen === "loading") {
      applyShareState(data.page, "");
      root.innerHTML = renderLoadingScreen(data.page);
      hydrateCoupangSlots(root);
    } else if (state.screen === "result") {
      applyShareState(data.page, state.resultKey);
      root.innerHTML = renderResultScreen(data.page, state.resultKey, data.cards);
      hydrateCoupangSlots(root);
    }

    if (options.scroll !== false) {
      scrollTestToTop();
    }
  }

  function resolveResult() {
    state.resultKey = scoreAnswers(data.page, state.answers);
    const durationSeconds = state.startedAt
      ? Math.max(1, Math.round((Date.now() - state.startedAt) / 1000))
      : 0;
    trackContentEvent("content_complete", data.page, {
      result_key: state.resultKey,
      duration_seconds: durationSeconds
    });
    try {
      const completedIds = JSON.parse(window.sessionStorage.getItem("coocoo_completed_content_ids") || "[]");
      const currentId = getContentAnalyticsParams(data.page).content_id;
      if (currentId && !completedIds.includes(currentId)) {
        completedIds.push(currentId);
        window.sessionStorage.setItem("coocoo_completed_content_ids", JSON.stringify(completedIds));
      }
    } catch (error) {
      console.warn("Unable to persist completed content analytics state.", error);
    }
    state.screen = "result";
    writeHistory("result", { replace: true });
    render();
  }

  function startLoadingAndResolve(options = {}) {
    state.screen = "loading";
    writeHistory("loading", { replace: Boolean(options.replaceHistory) });
    render();
    clearLoadingTimer();
    loadingTimer = window.setTimeout(resolveResult, 1400);
  }

  root.addEventListener("click", (event) => {
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-action]") : null;
    if (!target) {
      return;
    }

    const action = target.getAttribute("data-action");

    if (action === "start-test") {
      const analyticsParams = getContentAnalyticsParams(data.page);
      let completedIds = [];
      try {
        completedIds = JSON.parse(window.sessionStorage.getItem("coocoo_completed_content_ids") || "[]");
      } catch (error) {
        console.warn("Unable to read completed content analytics state.", error);
      }
      trackContentEvent("content_start", data.page);
      const secondStartKey = `coocoo_second_start_${analyticsParams.content_id}`;
      if (completedIds.some((id) => id !== analyticsParams.content_id) && !window.sessionStorage.getItem(secondStartKey)) {
        trackContentEvent("second_content_start", data.page, {
          previous_content_count: completedIds.length
        });
        window.sessionStorage.setItem(secondStartKey, "1");
      }
      state.screen = "question";
      state.currentQuestion = 0;
      state.answers = [];
      state.resultKey = "";
      state.startedAt = Date.now();
      writeHistory("question");
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
      writeHistory("question");
      render();
      return;
    }

    if (action === "restart-test") {
      clearLoadingTimer();
      state.screen = "intro";
      state.currentQuestion = 0;
      state.answers = [];
      state.resultKey = "";
      state.startedAt = 0;
      writeHistory("intro");
      render();
    }
  });

  function restoreHistoryScreen(historyState) {
    clearLoadingTimer();
    restoringHistory = true;
    restoreSnapshot(historyState.snapshot);
    state.screen = historyState.screen;
    render();
    restoringHistory = false;

    if (state.screen === "loading") {
      startLoadingAndResolve({ replaceHistory: true });
    }
  }

  function handlePopState(event) {
    if (event.state?.coocooTest && event.state.testId === data.testId) {
      restoreHistoryScreen(event.state);
    }
  }

  window.addEventListener("popstate", handlePopState);

  render();
  writeHistory(state.screen, { replace: true });
  return {
    destroy() {
      clearLoadingTimer();
      window.removeEventListener("popstate", handlePopState);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".test-play-main");
  if (main) {
    main.id = main.id || "mainContent";
    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = "#mainContent";
    skipLink.textContent = "본문 바로가기";
    document.body.prepend(skipLink);
  }

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
