const PLAY_CONTENT = {
  "chat-temperature": {
    type: "chat",
    title: "썸 탈 때 내 답장 온도는?",
    category: "대화형 테스트",
    intro: "쿠쿠가 보내는 메시지에 평소처럼 답해보세요. 말의 길이와 표현 온도로 내 대화 리듬을 읽어드려요.",
    icon: "💬",
    questions: [
      { message: "오늘 수업 끝났어? 뭐 하고 있어?", replies: [
        { label: "응! 방금 끝났어 ㅎㅎ 너는?", score: "warm" },
        { label: "방금 끝났어", score: "calm" },
        { label: "끝! 오늘 볼래?", score: "direct" }
      ] },
      { message: "아까 네가 추천한 노래 들어봤는데 좋더라", replies: [
        { label: "진짜? 어떤 부분이 제일 좋았어?", score: "warm" },
        { label: "오 취향 맞아서 다행이다", score: "calm" },
        { label: "그럼 다음 플레이리스트도 내가 골라줄게", score: "direct" }
      ] },
      { message: "이번 주말에는 뭐 해?", replies: [
        { label: "아직 없어! 너는 뭐 하고 싶은데?", score: "warm" },
        { label: "아직 정해진 건 없어", score: "calm" },
        { label: "토요일 비워둘게. 만나자", score: "direct" }
      ] },
      { message: "오늘 좀 피곤해 보이던데 괜찮아?", replies: [
        { label: "알아봐줘서 고마워. 너 보니까 좀 괜찮아졌어", score: "warm" },
        { label: "응, 오늘만 좀 바빴어. 괜찮아", score: "calm" },
        { label: "피곤한데 너랑 통화하면 풀릴 것 같아", score: "direct" }
      ] },
      { message: "나 사실 너랑 이야기할 때 재밌어", replies: [
        { label: "나도! 네 연락 오면 괜히 반가워", score: "warm" },
        { label: "나도 편하고 재밌어", score: "calm" },
        { label: "그럼 우리 썸 맞는 거지?", score: "direct" }
      ] }
    ],
    results: {
      warm: { title: "포근한 38도 답장형", line: "마음을 숨기기보다 상대가 안심할 만큼 따뜻하게 돌려주는 타입", detail: "당신의 답장은 질문과 반응이 함께 있어 대화를 자연스럽게 이어갑니다. 상대의 말에서 작은 포인트를 잡아 다시 건네는 힘이 있어요. 다만 매번 분위기를 책임지려 하지 않아도 괜찮습니다.", icon: "☕" },
      calm: { title: "은근한 24도 답장형", line: "과하지 않은 말투로 편안함을 오래 남기는 타입", detail: "당신은 빠르게 달아오르기보다 안정적인 리듬을 선호합니다. 짧아도 필요한 답은 놓치지 않아 부담 없는 신뢰를 만들어요. 가끔은 한 문장만 더 보태면 관심이 훨씬 선명하게 전달됩니다.", icon: "🌿" },
      direct: { title: "직진 42도 답장형", line: "타이밍이 왔다 싶으면 관계의 온도를 직접 올리는 타입", detail: "당신은 애매한 신호보다 구체적인 제안과 솔직한 표현에 강합니다. 상대가 고민할 시간을 줄여주는 시원함이 매력이에요. 다만 상대의 속도를 한 번 확인하면 직진의 장점이 더 빛납니다.", icon: "🔥" }
    }
  },
  "procrastination-bingo": {
    type: "bingo",
    title: "대학생 미루기 습관 빙고",
    category: "체크형 놀이",
    intro: "최근 일주일을 떠올리며 찔리는 칸을 눌러보세요. 빙고가 없어도 선택한 칸 수로 결과가 나옵니다.",
    icon: "▦",
    cells: [
      "강의 자료만 열어봄", "할 일 목록 꾸미기", "일단 간식부터", "마감 시간 재확인",
      "책상 정리 시작", "관련 없는 검색", "친구 진행률 물어봄", "5분만 누워 있기",
      "제목만 작성", "갑자기 빨래", "완벽한 시작 기다림", "마감 전날 각성",
      "파일명만 만들기", "카페 자리 탐색", "타이머만 설정", "결국 해내긴 함"
    ]
  },
  "battery-stop": {
    type: "battery",
    title: "쿠쿠 배터리 100%에 멈추기",
    category: "30초 게임",
    intro: "버튼을 누르면 배터리가 빠르게 차올라요. 100%에 가장 가깝다고 느낀 순간 다시 눌러 멈춰보세요.",
    icon: "⚡"
  },
  "today-box": {
    type: "daily",
    title: "쿠쿠의 오늘 상자",
    category: "하루 한 번",
    intro: "생각을 오래 하지 말고 지금 눈에 먼저 들어오는 상자를 골라보세요. 오늘 하루에 붙일 작은 미션을 드려요.",
    icon: "□",
    boxes: [
      { label: "빨간 상자", icon: "●", title: "먼저 말 걸기", detail: "오늘 떠오른 사람 한 명에게 짧게 안부를 보내보세요. 길게 쓰지 않아도 충분해요.", tone: "coral" },
      { label: "파란 상자", icon: "▲", title: "10분 비우기", detail: "이어폰과 화면을 잠깐 내려놓고 아무것도 하지 않는 10분을 만들어보세요.", tone: "blue" },
      { label: "노란 상자", icon: "■", title: "작은 완료 만들기", detail: "미뤄둔 일 중 5분 안에 끝나는 것 하나를 골라 오늘 바로 지워보세요.", tone: "yellow" }
    ]
  }
};

function escapePlayHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function trackPlayEvent(eventName, content, params = {}) {
  if (!(window.COOCOO_ANALYTICS && typeof window.COOCOO_ANALYTICS.track === "function")) return;
  const contentId = document.body.dataset.playId || "";
  window.COOCOO_ANALYTICS.track(eventName, Object.assign({
    content_id: contentId,
    content_title: content.title,
    content_category: content.category,
    content_format: content.type
  }, params));

  if (eventName === "content_complete" && contentId) {
    try {
      const completedIds = JSON.parse(window.sessionStorage.getItem("coocoo_completed_content_ids") || "[]");
      if (!completedIds.includes(contentId)) {
        completedIds.push(contentId);
        window.sessionStorage.setItem("coocoo_completed_content_ids", JSON.stringify(completedIds));
      }
    } catch (error) {
      console.warn("Unable to persist playground analytics state.", error);
    }
  }
}

function applyPlayShare(content, resultTitle, resultLine, resultKey) {
  const body = document.body;
  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set("result", resultKey);
  body.dataset.shareContext = "result";
  body.dataset.shareUrl = shareUrl.toString();
  body.dataset.shareTitle = `${content.title} - ${resultTitle} | 쿠쿠`;
  body.dataset.shareDescription = resultLine;
  body.dataset.shareTestTitle = content.title;
  body.dataset.shareResultTitle = resultTitle;
  body.dataset.shareResultSummary = resultLine;
  body.dataset.shareResultDescription = resultLine;
  body.dataset.shareResultIcon = content.icon;
  body.dataset.shareTheme = content.type === "chat"
    ? "linear-gradient(135deg, #f5b8a8, #fffdf8)"
    : content.type === "bingo"
      ? "linear-gradient(135deg, #b8d3df, #fffdf8)"
      : "linear-gradient(135deg, #f2d27f, #fffdf8)";
  body.dataset.shareMascot = `${window.location.origin}/assets/images/coocoo.png`;
  body.dataset.shareButtonTitle = "결과 확인하기";
}

function resultActions() {
  return `
    <div class="play-share-actions">
      <button type="button" id="btnCopyLink">링크 복사</button>
      <button type="button" id="btnKakaoShare">Kakao 공유</button>
    </div>
    <a class="play-home-link" href="../index.html#play">다른 놀이 고르기 →</a>
  `;
}

function getLocalDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

let playgroundAdScriptPromise = null;

function hydratePlayResultAd() {
  const slot = document.getElementById("playResultAd");
  if (!slot) return;

  if (!playgroundAdScriptPromise) {
    playgroundAdScriptPromise = new Promise((resolve, reject) => {
      if (window.PartnersCoupang && window.PartnersCoupang.G) {
        resolve();
        return;
      }
      const existing = document.querySelector('script[data-coupang-partners="true"]');
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://ads-partners.coupang.com/g.js";
      script.async = true;
      script.dataset.coupangPartners = "true";
      script.addEventListener("load", resolve, { once: true });
      script.addEventListener("error", reject, { once: true });
      document.head.appendChild(script);
    });
  }

  playgroundAdScriptPromise.then(() => {
    slot.textContent = "";
    const slotWidth = Math.max(300, Math.min(680, Math.floor(slot.clientWidth || 680)));
    const script = document.createElement("script");
    script.textContent = `new PartnersCoupang.G({"id":989147,"template":"carousel","trackingCode":"AF1716783","width":"${slotWidth}","height":"110","tsource":""});`;
    slot.appendChild(script);
  }).catch(() => {
    slot.textContent = "광고를 불러오지 못했어요.";
  });
}

function createPlaygroundApp() {
  const root = document.getElementById("playgroundApp");
  const playId = document.body.dataset.playId;
  const content = PLAY_CONTENT[playId];
  if (!root || !content) return;

  document.title = `${content.title} | 쿠쿠`;
  const state = { screen: "intro", index: 0, scores: {}, selected: new Set(), battery: 0, timer: null, direction: 1, startedAt: 0 };

  function renderIntro() {
    root.innerHTML = `
      <section class="play-intro tone-${content.type === "chat" ? "coral" : content.type === "bingo" ? "blue" : content.type === "battery" ? "yellow" : "green"}">
        <span class="play-content-type">${escapePlayHtml(content.category)}</span>
        <div class="play-intro-icon" aria-hidden="true">${content.icon}</div>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p>${escapePlayHtml(content.intro)}</p>
        <button class="play-primary-button" type="button" data-action="start">시작하기</button>
      </section>
    `;
  }

  function renderChat() {
    const question = content.questions[state.index];
    root.innerHTML = `
      <section class="chat-game" aria-live="polite">
        <div class="play-progress-label"><span>대화 ${state.index + 1} / ${content.questions.length}</span><span>${Math.round((state.index / content.questions.length) * 100)}%</span></div>
        <div class="chat-phone">
          <div class="chat-person"><span>쿠쿠</span><small>방금 전</small></div>
          <div class="chat-bubble chat-bubble-them">${escapePlayHtml(question.message)}</div>
          <p class="chat-guide">평소의 나와 가장 가까운 답장을 골라보세요.</p>
          <div class="chat-replies">
            ${question.replies.map((reply) => `<button type="button" data-action="chat-reply" data-score="${reply.score}">${escapePlayHtml(reply.label)}</button>`).join("")}
          </div>
        </div>
      </section>
    `;
  }

  function finishChat(forcedResultKey = "", shouldTrack = true) {
    const resultKey = forcedResultKey || Object.entries(state.scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "calm";
    const result = content.results[resultKey];
    applyPlayShare(content, result.title, result.line, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, result.detail);
    hydratePlayResultAd();
  }

  function renderBingo() {
    root.innerHTML = `
      <section class="bingo-game">
        <div class="play-progress-label"><span>선택한 칸 ${state.selected.size}</span><span>빙고 ${countBingos()}</span></div>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p>나에게 해당하는 칸을 모두 눌러주세요.</p>
        <div class="bingo-grid">
          ${content.cells.map((cell, index) => `<button type="button" class="bingo-cell ${state.selected.has(index) ? "is-selected" : ""}" data-action="toggle-bingo" data-index="${index}" aria-pressed="${state.selected.has(index)}">${escapePlayHtml(cell)}</button>`).join("")}
        </div>
        <button class="play-primary-button" type="button" data-action="finish-bingo" ${state.selected.size ? "" : "disabled"}>결과 보기</button>
      </section>
    `;
  }

  function countBingos() {
    const lines = [
      [0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],
      [0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],
      [0,5,10,15],[3,6,9,12]
    ];
    return lines.filter((line) => line.every((index) => state.selected.has(index))).length;
  }

  function finishBingo(forcedSelectedCount = null, forcedBingos = null, shouldTrack = true) {
    const selectedCount = forcedSelectedCount === null ? state.selected.size : forcedSelectedCount;
    const bingos = forcedBingos === null ? countBingos() : forcedBingos;
    const result = selectedCount <= 4
      ? { icon: "✓", title: "미루기 방어 우등생", line: "시작 허들이 낮고 할 일을 비교적 빠르게 손에 잡는 편", detail: "해야 할 일을 오래 바라보기보다 작은 행동으로 옮기는 힘이 있어요. 컨디션이 흔들릴 때도 평소에 쓰던 시작 신호 하나만 지키면 리듬을 금방 되찾습니다." }
      : selectedCount <= 9
        ? { icon: "…", title: "합리적 미루기 협상가", line: "조금 미루지만 마감과 타협하며 결국 완성하는 편", detail: "본격적으로 시작하기 전 준비 동작이 긴 편이지만, 해야 할 시점은 놓치지 않습니다. 준비를 하나만 줄이고 10분짜리 초안을 먼저 만들면 훨씬 가벼워져요." }
        : { icon: "!", title: "마감 직전 집중 각성형", line: "압박이 생기면 놀라운 집중력이 켜지는 극적인 완성 타입", detail: "미루는 동안 마음은 편하지 않지만 마지막 순간의 집중력으로 결과를 만들어냅니다. 능력이 없는 게 아니라 시작 조건이 까다로운 편이니, 가짜 마감을 하루 앞에 두는 방식이 잘 맞아요." };
    const resultKey = `bingo-${selectedCount}-${bingos}`;
    applyPlayShare(content, result.title, result.line, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, bingo_count: bingos, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, `${result.line} · 완성 빙고 ${bingos}개`, result.detail);
    hydratePlayResultAd();
  }

  function renderBattery() {
    root.innerHTML = `
      <section class="battery-game">
        <span class="play-content-type">타이밍 게임</span>
        <h1>100%에 멈춰!</h1>
        <p>너무 빠르면 지나칠 수 있어요. 숫자와 게이지를 함께 보세요.</p>
        <div class="battery-device" aria-label="현재 배터리 ${Math.round(state.battery)}퍼센트">
          <div class="battery-level" style="height:${Math.min(state.battery, 100)}%"></div>
          <strong>${Math.round(state.battery)}%</strong>
        </div>
        <button class="play-primary-button battery-stop-button" type="button" data-action="stop-battery">여기서 멈추기</button>
      </section>
    `;
  }

  function updateBattery() {
    state.battery += 1.7 * state.direction;
    if (state.battery >= 120) state.direction = -1;
    if (state.battery <= 0) state.direction = 1;
    const level = root.querySelector(".battery-level");
    const label = root.querySelector(".battery-device strong");
    const device = root.querySelector(".battery-device");
    if (level) level.style.height = `${Math.min(state.battery, 100)}%`;
    if (label) label.textContent = `${Math.round(state.battery)}%`;
    if (device) device.setAttribute("aria-label", `현재 배터리 ${Math.round(state.battery)}퍼센트`);
  }

  function finishBattery(forcedBattery = null, shouldTrack = true) {
    window.clearInterval(state.timer);
    state.timer = null;
    const batteryValue = forcedBattery === null ? state.battery : forcedBattery;
    const score = Math.max(0, 100 - Math.round(Math.abs(100 - batteryValue)));
    const result = score >= 98
      ? { icon: "★", title: "쿠쿠 충전 장인", line: `${Math.round(batteryValue)}%에서 정지. 손끝 감각이 거의 완벽해요!` }
      : score >= 90
        ? { icon: "+", title: "감 좋은 충전러", line: `${Math.round(batteryValue)}%에서 정지. 한 번만 더 하면 100이 보여요.` }
        : { icon: "↻", title: "과감한 타이밍 탐험가", line: `${Math.round(batteryValue)}%에서 정지. 감을 알았으니 재도전하면 달라져요.` };
    const resultKey = `battery-${Math.round(batteryValue)}`;
    applyPlayShare(content, result.title, result.line, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, game_score: score, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, "결과는 운보다 리듬에 가까워요. 너무 오래 재지 말고 첫 감각을 믿을 때 점수가 더 잘 나올 수 있습니다.", true);
    hydratePlayResultAd();
  }

  function renderDaily() {
    const todayKey = getLocalDateKey();
    const saved = window.localStorage.getItem(`coocoo_today_box_${todayKey}`);
    if (saved !== null) {
      finishDaily(Number(saved), false);
      return;
    }
    root.innerHTML = `
      <section class="daily-game">
        <span class="play-content-type">${todayKey}</span>
        <h1>오늘은 어떤 상자?</h1>
        <p>한 번 고르면 오늘은 바꿀 수 없어요. 첫눈에 들어오는 하나를 눌러보세요.</p>
        <div class="daily-box-grid">
          ${content.boxes.map((box, index) => `<button type="button" class="daily-box tone-${box.tone}" data-action="choose-box" data-index="${index}"><span>${box.icon}</span><strong>${escapePlayHtml(box.label)}</strong></button>`).join("")}
        </div>
      </section>
    `;
  }

  function finishDaily(index, shouldTrack = true) {
    const box = content.boxes[index] || content.boxes[0];
    const todayKey = getLocalDateKey();
    window.localStorage.setItem(`coocoo_today_box_${todayKey}`, String(index));
    applyPlayShare(content, box.title, box.detail, `box-${index}`);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: `box-${index}`, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, box.icon, box.title, "오늘 쿠쿠가 꺼내준 작은 미션", box.detail);
    hydratePlayResultAd();
  }

  function renderPlayResult(source, icon, title, line, detail, replay = false) {
    return `
      <section class="play-result">
        <span class="play-content-type">${escapePlayHtml(source.category)} 결과</span>
        <div class="play-result-icon" aria-hidden="true">${icon}</div>
        <h1>${escapePlayHtml(title)}</h1>
        <strong>${escapePlayHtml(line)}</strong>
        <p>${escapePlayHtml(detail)}</p>
        <div class="kuku-comment"><img src="../assets/images/coocoo.png" alt="" /><span>쿠쿠의 한마디</span><p>${replay ? "한 번 더 하면 손끝 감각이 더 선명해질지도 몰라!" : "결과가 마음에 들었다면 친구에게 보내 서로 비교해봐!"}</p></div>
        ${replay ? `<button class="play-primary-button" type="button" data-action="restart">다시 도전하기</button>` : ""}
        ${resultActions()}
        <div class="play-result-ad-wrap">
          <span>AD</span>
          <div id="playResultAd" class="play-result-ad">680 × 110</div>
          <small>이 페이지는 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있습니다.</small>
        </div>
      </section>
    `;
  }

  function startContent() {
    state.startedAt = Date.now();
    trackPlayEvent("content_start", content);
    try {
      const completedIds = JSON.parse(window.sessionStorage.getItem("coocoo_completed_content_ids") || "[]");
      const secondStartKey = `coocoo_second_start_${playId}`;
      if (completedIds.some((id) => id !== playId) && !window.sessionStorage.getItem(secondStartKey)) {
        trackPlayEvent("second_content_start", content, { previous_content_count: completedIds.length });
        window.sessionStorage.setItem(secondStartKey, "1");
      }
    } catch (error) {
      console.warn("Unable to read playground analytics state.", error);
    }
    if (content.type === "chat") renderChat();
    if (content.type === "bingo") renderBingo();
    if (content.type === "battery") {
      state.battery = 0;
      state.direction = 1;
      renderBattery();
      state.timer = window.setInterval(updateBattery, 35);
    }
    if (content.type === "daily") renderDaily();
  }

  root.addEventListener("click", (event) => {
    const button = event.target instanceof HTMLElement ? event.target.closest("[data-action]") : null;
    if (!button) return;
    const action = button.dataset.action;
    if (action === "start" || action === "restart") startContent();
    if (action === "chat-reply") {
      state.scores[button.dataset.score] = (state.scores[button.dataset.score] || 0) + 1;
      state.index += 1;
      state.index >= content.questions.length ? finishChat() : renderChat();
    }
    if (action === "toggle-bingo") {
      const index = Number(button.dataset.index);
      state.selected.has(index) ? state.selected.delete(index) : state.selected.add(index);
      renderBingo();
    }
    if (action === "finish-bingo") finishBingo();
    if (action === "stop-battery") finishBattery();
    if (action === "choose-box") finishDaily(Number(button.dataset.index));
  });

  const sharedResult = new URLSearchParams(window.location.search).get("result") || "";
  if (content.type === "chat" && content.results[sharedResult]) {
    finishChat(sharedResult, false);
  } else if (content.type === "bingo" && /^bingo-\d+-\d+$/.test(sharedResult)) {
    const [, selectedCount, bingos] = sharedResult.match(/^bingo-(\d+)-(\d+)$/);
    finishBingo(Number(selectedCount), Number(bingos), false);
  } else if (content.type === "battery" && /^battery-\d+$/.test(sharedResult)) {
    finishBattery(Number(sharedResult.replace("battery-", "")), false);
  } else if (content.type === "daily" && /^box-[0-2]$/.test(sharedResult)) {
    finishDaily(Number(sharedResult.replace("box-", "")), false);
  } else {
    renderIntro();
  }
}

document.addEventListener("DOMContentLoaded", createPlaygroundApp);
