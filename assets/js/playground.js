const PLAY_CONTENT = {
  "chat-temperature": {
    type: "chat",
    title: "썸 탈 때 내 답장 온도는?",
    category: "대화형 테스트",
    intro: "쿠쿠가 보내는 메시지에 평소처럼 답해보세요. 말의 길이와 표현 온도로 내 대화 리듬을 살펴봐요.",
    icon: "💬",
    iconAsset: "kuku-chat.svg",
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
      warm: { title: "포근한 38도 답장형", line: "마음을 숨기기보다 상대가 안심할 만큼 따뜻하게 돌려주는 타입", detail: "질문과 반응이 함께 있어서 대화가 자연스럽게 이어져요. 상대의 말에서 작은 포인트를 잡아 다시 건네는 힘도 있어요. 매번 분위기를 책임질 필요는 없으니 편한 날엔 짧게 답해도 괜찮아요.", icon: "☕" },
      calm: { title: "은근한 24도 답장형", line: "과하지 않은 말투로 편안함을 오래 남기는 타입", detail: "빠르게 달아오르기보다 안정적인 리듬을 좋아해요. 짧아도 필요한 답은 놓치지 않아 부담 없는 신뢰를 만들어요. 한 문장이 더 붙는 날에는 관심이 더 선명하게 보일지도 몰라요.", icon: "🌿" },
      direct: { title: "직진 42도 답장형", line: "타이밍이 왔다 싶으면 관계의 온도를 직접 올리는 타입", detail: "애매한 신호보다 구체적인 제안과 솔직한 표현에 강해요. 상대가 고민할 시간을 줄여주는 시원함이 매력이에요. 속도가 비슷한 사람을 만나면 대화가 아주 빠르게 뜨거워져요.", icon: "🔥" }
    }
  },
  "procrastination-bingo": {
    type: "bingo",
    title: "대학생 미루기 습관 빙고",
    category: "체크형 놀이",
    intro: "최근 일주일을 떠올리며 찔리는 칸을 눌러보세요. 빙고가 없어도 선택한 칸 수로 결과가 나와요.",
    icon: "▦",
    iconAsset: "kuku-bingo.svg",
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
    icon: "⚡",
    iconAsset: "kuku-battery.svg"
  },
  "today-box": {
    type: "daily",
    title: "쿠쿠의 오늘 상자",
    category: "하루 한 번",
    intro: "오래 고민하지 말고 지금 눈에 먼저 들어오는 상자를 골라보세요. 오늘 하루에 붙일 작은 미션이 나와요.",
    icon: "□",
    boxes: [
      { label: "빨간 상자", icon: "●", title: "먼저 말 걸기", detail: "오늘 떠오른 사람 한 명에게 짧게 안부를 보내보세요. 길게 쓰지 않아도 충분해요.", tone: "coral" },
      { label: "파란 상자", icon: "▲", title: "10분 비우기", detail: "이어폰과 화면을 잠깐 내려놓고 아무것도 하지 않는 10분을 만들어보세요.", tone: "blue" },
      { label: "노란 상자", icon: "■", title: "작은 완료 만들기", detail: "미뤄둔 일 중 5분 안에 끝나는 것 하나를 골라 오늘 바로 지워보세요.", tone: "yellow" }
    ]
  },
  "relationship-ranking": {
    type: "ranking",
    title: "관계에서 포기 못 하는 것 순위",
    category: "카드 순위형",
    intro: "다섯 장을 내가 중요하게 생각하는 순서로 옮겨보세요. 가장 위에 둔 카드가 지금의 관계 기준을 보여줘요.",
    icon: "↕",
    items: [
      { id: "trust", icon: "◇", title: "믿고 말할 수 있는 편안함", description: "솔직한 이야기를 꺼내도 불안하지 않은 관계" },
      { id: "fun", icon: "✦", title: "같이 있으면 터지는 웃음", description: "별일이 없어도 시간이 금방 가는 관계" },
      { id: "space", icon: "○", title: "각자의 시간을 지키는 거리", description: "붙어 있지 않아도 마음이 편한 관계" },
      { id: "growth", icon: "↗", title: "서로를 움직이게 하는 자극", description: "새로운 생각과 용기를 주고받는 관계" },
      { id: "rhythm", icon: "≈", title: "연락과 만남의 잘 맞는 박자", description: "설명하지 않아도 템포가 자연스러운 관계" }
    ],
    results: {
      trust: { icon: "◇", title: "안심 우선형", line: "재미보다 먼저 마음 놓을 자리를 찾는 타입", detail: "당신에게 좋은 관계는 말을 고르느라 지치지 않는 관계예요. 화려한 이벤트보다 솔직한 대화와 예측 가능한 태도가 오래 남아요." },
      fun: { icon: "✦", title: "웃음 우선형", line: "같이 있을 때 공기가 가벼워지는 게 중요한 타입", detail: "당신은 관계의 온도를 웃음과 반응으로 읽어요. 사소한 장난이 통하고 일상이 재밌어지는 사람에게 마음이 오래 머물러요." },
      space: { icon: "○", title: "여백 우선형", line: "가까워도 각자의 시간을 지켜야 편한 타입", detail: "당신은 거리와 애정을 반대말로 보지 않아요. 혼자 있는 시간을 존중하면서도 필요할 때 자연스럽게 연결되는 관계를 좋아해요." },
      growth: { icon: "↗", title: "자극 우선형", line: "함께 있을수록 새로운 내가 보이는 관계를 찾는 타입", detail: "당신은 서로의 세계를 넓혀주는 관계에 끌려요. 새로운 취향과 생각을 나누고, 한 걸음 움직이게 만드는 사람이 오래 기억돼요." },
      rhythm: { icon: "≈", title: "박자 우선형", line: "연락과 만남의 템포가 맞아야 마음이 편한 타입", detail: "당신은 관계를 말보다 리듬으로 느끼는 편이에요. 답장 속도와 만나는 빈도가 자연스럽게 맞을 때 애정을 가장 편하게 표현해요." }
    }
  },
  "weekly-energy-budget": {
    type: "allocation",
    title: "이번 주 에너지 100을 어디에 쓸까?",
    category: "포인트 배분형",
    intro: "이번 주에 남은 에너지 100을 다섯 곳에 나눠주세요. 정답 없이 지금 마음이 가는 만큼만 배분하면 돼요.",
    icon: "100",
    buckets: [
      { id: "study", icon: "▤", label: "과제와 공부" },
      { id: "people", icon: "●", label: "친구와 약속" },
      { id: "love", icon: "♡", label: "연애와 설렘" },
      { id: "hobby", icon: "✦", label: "취미와 덕질" },
      { id: "rest", icon: "☾", label: "휴식과 멍" }
    ],
    results: {
      study: { icon: "▤", title: "마감 집중 투자형", line: "이번 주 에너지가 해야 할 일 쪽으로 가장 많이 향한 타입", detail: "머릿속에서 끝내야 할 일이 큰 자리를 차지하고 있어요. 몰입이 시작되면 속도가 붙지만, 에너지를 전부 한 칸에 몰아넣지는 않았는지도 같이 보여요." },
      people: { icon: "●", title: "사람 약속 투자형", line: "혼자 계획하기보다 사람을 만나며 살아나는 타입", detail: "이번 주의 기대가 사람과의 대화와 약속에 많이 연결돼 있어요. 누구를 만나느냐에 따라 같은 시간도 전혀 다른 에너지로 느껴지는 편이에요." },
      love: { icon: "♡", title: "설렘 집중 투자형", line: "해야 할 일 사이에서도 마음 가는 사람이 먼저 떠오르는 타입", detail: "이번 주 에너지의 중심에 감정과 관계가 있어요. 답장 하나와 약속 하나가 하루 기분을 크게 바꾸는 시기일지도 몰라요." },
      hobby: { icon: "✦", title: "좋아하는 것 투자형", line: "의무보다 내 취향을 챙길 때 배터리가 살아나는 타입", detail: "이번 주에는 생산성보다 좋아하는 것에 쓰는 시간이 중요해 보여요. 짧더라도 내 취향에 깊게 빠지는 순간이 하루의 인상을 바꿔요." },
      rest: { icon: "☾", title: "회복 우선 투자형", line: "더 채우기보다 먼저 비우고 싶은 마음이 큰 타입", detail: "이번 주의 에너지는 움직임보다 회복을 향하고 있어요. 아무것도 하지 않는 시간도 이번 배분표에서는 당당한 한 칸이에요." }
    }
  },
  "campus-festival-story": {
    type: "story",
    title: "축제 날, 쿠쿠를 어디서 만날까?",
    category: "분기형 스토리",
    intro: "학교 축제에서 쿠쿠가 사라졌어요. 장면마다 마음 가는 선택을 골라 나만의 결말을 찾아보세요.",
    icon: "?",
    totalSteps: 4,
    startNode: "gate",
    nodes: {
      gate: {
        label: "오후 5:10 · 축제 입구",
        icon: "旗",
        scene: "친구에게서 '쿠쿠 봤어?'라는 메시지가 왔어요. 무대 쪽은 시끄럽고, 반대편 골목에는 작은 부스들이 줄지어 있어요.",
        choices: [
          { label: "사람 많은 무대부터 뒤져본다", next: "stage" },
          { label: "조용한 부스 골목으로 들어간다", next: "booth" }
        ]
      },
      stage: {
        label: "오후 5:24 · 메인 무대",
        icon: "音",
        scene: "공연이 시작되자 모두 앞을 보고 있어요. 그런데 뒤쪽에서 쿠쿠 꼬리처럼 보이는 노란 손수건이 잠깐 흔들렸어요.",
        choices: [
          { label: "사람들 사이를 뚫고 손수건을 따라간다", next: "backstage" },
          { label: "일단 공연 한 곡을 끝까지 즐긴다", next: "snackLane" }
        ]
      },
      booth: {
        label: "오후 5:22 · 동아리 부스 골목",
        icon: "店",
        scene: "한산한 골목 끝 타로 부스에 노란 털 몇 가닥과 별 모양 스티커가 남아 있어요. 쿠쿠는 방금 다른 곳으로 간 것 같아요.",
        choices: [
          { label: "부스 주인에게 쿠쿠가 간 방향을 묻는다", next: "stampCorner" },
          { label: "별 스티커가 붙은 길을 직접 따라간다", next: "tarotTable" }
        ]
      },
      backstage: {
        label: "오후 5:31 · 무대 뒤편",
        icon: "幕",
        scene: "손수건은 백스테이지 문고리에 묶여 있고, 안쪽에서는 상자를 끄는 소리와 웃음소리가 번갈아 들려요.",
        choices: [
          { label: "문틈으로 보이는 꼬리를 바로 쫓아간다", next: "chase" },
          { label: "스태프에게 쿠쿠가 있는지 먼저 물어본다", next: "wait" }
        ]
      },
      snackLane: {
        label: "오후 5:34 · 푸드트럭 거리",
        icon: "食",
        scene: "노래가 끝난 뒤 바닥에서 쿠쿠 이름이 적힌 영수증을 발견했어요. 바로 옆 포토 부스에서는 익숙한 웃음소리가 들려요.",
        choices: [
          { label: "영수증에 찍힌 가게부터 빠르게 찾아간다", next: "chase" },
          { label: "웃음소리가 난 포토 부스 앞에서 기다린다", next: "wait" }
        ]
      },
      stampCorner: {
        label: "오후 5:33 · 스탬프 행사장",
        icon: "印",
        scene: "부스 주인은 쿠쿠가 스탬프를 모으러 갔다고 했어요. 행사장에는 막 찍힌 발자국과 아직 마르지 않은 잉크가 남아 있어요.",
        choices: [
          { label: "새 발자국을 따라 행사장 안으로 들어간다", next: "chase" },
          { label: "완성 도장을 받는 곳에서 쿠쿠를 기다린다", next: "wait" }
        ]
      },
      tarotTable: {
        label: "오후 5:35 · 타로 부스 옆길",
        icon: "星",
        scene: "별 스티커는 작은 쉼터에서 끊겼어요. 테이블에는 뒤집힌 카드 한 장과 쿠쿠가 좋아하는 레몬 사탕이 놓여 있어요.",
        choices: [
          { label: "카드를 뒤집고 적힌 장소로 바로 향한다", next: "chase" },
          { label: "사탕 하나를 들고 쉼터에서 잠깐 기다린다", next: "wait" }
        ]
      },
      chase: {
        label: "오후 5:43 · 마지막 단서",
        icon: "!",
        scene: "드디어 커튼 너머로 쿠쿠의 그림자가 보여요. 쿠쿠는 아직 당신이 바로 뒤까지 온 줄 모르는 것 같아요.",
        choices: [
          { label: "커튼을 열고 쿠쿠 이름을 크게 부른다", result: "spotlight" },
          { label: "옆에 있던 소품을 들고 깜짝 등장한다", result: "mischief" }
        ]
      },
      wait: {
        label: "오후 5:45 · 잠깐의 여백",
        icon: "○",
        scene: "조금 기다리자 멀리서 쿠쿠가 두리번거리며 걸어와요. 먼저 발견한 건 당신이지만, 쿠쿠도 곧 이쪽을 볼 것 같아요.",
        choices: [
          { label: "손을 흔들어 친구들과 함께 부른다", result: "together" },
          { label: "그대로 앉아 쿠쿠가 먼저 발견하길 기다린다", result: "observer" }
        ]
      }
    },
    results: {
      spotlight: { icon: "!", title: "현장 돌파형 결말", line: "궁금한 장면이 보이면 사람들 사이로 먼저 들어가는 타입", detail: "쿠쿠는 무대 장비를 옮기던 중이었어요. 당신이 찾아오자 기다렸다는 듯 손수건을 흔들고, 둘은 공연보다 더 정신없는 백스테이지 구경을 시작했어요." },
      together: { icon: "♪", title: "같이 즐기는 결말", line: "찾는 일도 중요하지만 지금 옆의 사람과 순간을 놓치지 않는 타입", detail: "노래가 끝나자 쿠쿠가 바로 뒤에서 박수를 치고 있었어요. 결국 모두 같은 공연을 보고 있었던 셈이죠. 친구들과 웃다가 자연스럽게 합류한 저녁이 오래 남았어요." },
      mischief: { icon: "?", title: "장난 선공형 결말", line: "반가운 마음을 진지한 인사보다 장난으로 먼저 보여주는 타입", detail: "쿠쿠는 화들짝 놀라 카드를 떨어뜨렸지만 곧바로 웃었어요. 둘은 서로의 오늘 운세를 마음대로 지어주며 부스 마감 시간까지 눌러앉았어요." },
      observer: { icon: "○", title: "느긋한 관찰형 결말", line: "서두르지 않고 상대가 나를 발견하는 순간을 즐기는 타입", detail: "세 장째 카드를 넘기던 쿠쿠가 드디어 당신을 보고 눈을 동그랗게 떴어요. 말없이 웃은 뒤 둘은 가장 한산한 길로 축제를 한 바퀴 돌았어요." }
    }
  },
  "emotion-trash": {
    type: "trash",
    title: "오늘 마음, 여기 두고 갈래?",
    category: "감정 비우기 · 1분",
    intro: "머릿속에 걸리는 말을 짧게 적고 구겨서 보내요. 적은 문장은 저장하지 않아요.",
    icon: "⌁",
    presets: ["과제", "답장", "약속", "눈치", "피곤함"]
  },
  "choice-roulette": {
    type: "roulette",
    title: "쿠쿠야, 하나만 골라줘",
    category: "선택 룰렛 · 30초",
    intro: "오늘 고민되는 선택지만 켜두세요. 쿠쿠가 핑계 없이 하나를 골라줘요.",
    icon: "↻",
    items: ["맛있는 거 먹기", "산책하기", "카페 가기", "집에서 쉬기", "친구 만나기", "밀린 일 하나 끝내기"]
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

function renderPlayIcon(icon, iconAsset) {
  if (iconAsset) {
    return `<img src="../assets/images/${escapePlayHtml(iconAsset)}" alt="" />`;
  }
  return escapePlayHtml(icon);
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

function getKukuComment(contentType, resultKey) {
  const comments = {
    battery: {
      perfect: "이 정도면 손끝에 충전기 센서 달린 거 아니야?",
      close: "아깝다! 숫자는 살짝 비켜갔는데 감은 꽤 좋았어.",
      wild: "100은 지나갔지만 과감함만큼은 만점이네."
    },
    bingo: "미루기의 종류도 이렇게 다양할 줄은 몰랐지?",
    chat: "답장 온도는 숫자보다 상대에 따라 더 자주 바뀌더라.",
    daily: "오늘 상자는 골랐고, 이제 어떻게 쓸지는 네 마음이야.",
    ranking: "맨 위 카드보다 두 번째 카드에서 더 오래 고민한 거 아니야?",
    allocation: "100을 나누는 데도 지금 마음이 꽤 솔직하게 나오네.",
    story: "다른 길을 골랐으면 쿠쿠를 완전히 다른 곳에서 만났겠지?",
    trash: "적어낸 말은 쿠쿠도 기억하지 않을게. 여기 두고 가자.",
    roulette: "쿠쿠가 골랐으니 결과가 마음에 안 들면 네 마음은 이미 정해진 거야."
  };

  if (contentType === "battery") return comments.battery[resultKey] || comments.battery.close;
  return comments[contentType] || "이 결과, 친구 거랑 나란히 놓으면 더 웃길지도 몰라.";
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
  const state = {
    screen: "intro",
    index: 0,
    scores: {},
    selected: new Set(),
    battery: 0,
    timer: null,
    direction: 1,
    startedAt: 0,
    order: [],
    allocation: {},
    storyNode: "",
    storyPath: [],
    rouletteEnabled: []
  };
  let restoringHistory = false;

  root.setAttribute("tabindex", "-1");

  function snapshotState(resultKey = "") {
    return {
      index: state.index,
      scores: Object.assign({}, state.scores),
      selected: Array.from(state.selected),
      battery: state.battery,
      direction: state.direction,
      startedAt: state.startedAt,
      order: [...state.order],
      allocation: Object.assign({}, state.allocation),
      storyNode: state.storyNode,
      storyPath: [...state.storyPath],
      rouletteEnabled: [...state.rouletteEnabled],
      resultKey
    };
  }

  function restoreSnapshot(snapshot = {}) {
    state.index = Number(snapshot.index) || 0;
    state.scores = Object.assign({}, snapshot.scores || {});
    state.selected = new Set(Array.isArray(snapshot.selected) ? snapshot.selected : []);
    state.battery = Number(snapshot.battery) || 0;
    state.direction = Number(snapshot.direction) || 1;
    state.startedAt = Number(snapshot.startedAt) || Date.now();
    state.order = Array.isArray(snapshot.order) ? [...snapshot.order] : [];
    state.allocation = Object.assign({}, snapshot.allocation || {});
    state.storyNode = snapshot.storyNode || content.startNode || "";
    state.storyPath = Array.isArray(snapshot.storyPath) ? [...snapshot.storyPath] : [];
    state.rouletteEnabled = Array.isArray(snapshot.rouletteEnabled) ? [...snapshot.rouletteEnabled] : [];
  }

  function writeHistory(screen, options = {}) {
    if (restoringHistory) return;
    state.screen = screen;
    const resultKey = options.resultKey || "";
    const url = new URL(window.location.href);
    resultKey ? url.searchParams.set("result", resultKey) : url.searchParams.delete("result");
    const historyState = {
      coocooPlay: true,
      playId,
      screen,
      snapshot: snapshotState(resultKey)
    };
    const method = options.replace ? "replaceState" : "pushState";
    window.history[method](historyState, "", url);
  }

  function replacePlayHistory() {
    if (state.screen === "play") writeHistory("play", { replace: true });
  }

  function scrollPlaygroundToTop() {
    window.requestAnimationFrame(() => {
      const top = Math.max(0, root.getBoundingClientRect().top + window.scrollY - 12);
      window.scrollTo({ top, left: 0, behavior: "auto" });
    });
  }

  function renderIntro() {
    const introTone = {
      chat: "coral",
      bingo: "blue",
      battery: "yellow",
      daily: "green",
      ranking: "paper",
      allocation: "yellow",
      story: "coral",
      trash: "blue",
      roulette: "green"
    }[content.type] || "paper";
    root.innerHTML = `
      <section class="play-intro tone-${introTone}">
        <span class="play-content-type">${escapePlayHtml(content.category)}</span>
        <div class="play-intro-icon" aria-hidden="true">${renderPlayIcon(content.icon, content.iconAsset)}</div>
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
    writeHistory("result", { resultKey, replace: !shouldTrack });
    applyPlayShare(content, result.title, result.line, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, result.detail, { comment: getKukuComment("chat") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
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
    writeHistory("result", { resultKey, replace: !shouldTrack });
    applyPlayShare(content, result.title, result.line, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, bingo_count: bingos, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, `${result.line} · 완성 빙고 ${bingos}개`, result.detail, { comment: getKukuComment("bingo") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
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
      ? { key: "perfect", icon: "🏆", title: "쿠쿠 충전 장인", line: `${Math.round(batteryValue)}%에서 정지. 거의 정답 같은 손끝 감각!`, detail: "멈춰야 할 순간을 정확하게 잡았어요. 숫자가 차오르는 속도와 손끝 타이밍이 제대로 맞아떨어졌네요." }
      : score >= 90
        ? { key: "close", icon: "🔋", title: "감 좋은 충전러", line: `${Math.round(batteryValue)}%에서 정지. 100 근처를 제대로 읽었어요.`, detail: "완벽한 숫자는 살짝 비켜갔지만 타이밍 감각은 충분히 가까웠어요. 이번 기록은 꽤 자랑해도 돼요." }
        : { key: "wild", icon: "⚡", title: "과감한 타이밍 탐험가", line: `${Math.round(batteryValue)}%에서 정지. 망설임보다 손이 먼저 움직였어요.`, detail: "정확함보다 과감함이 먼저 나온 기록이에요. 숫자보다 순간의 속도감을 즐긴 쪽에 가까워요." };
    const resultKey = `battery-${Math.round(batteryValue)}`;
    writeHistory("result", { resultKey, replace: !shouldTrack });
    applyPlayShare(content, result.title, result.line, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, game_score: score, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, result.detail, {
      resultLabel: "충전 결과",
      restart: true,
      comment: getKukuComment("battery", result.key)
    });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function renderDaily(useSavedResult = true) {
    const todayKey = getLocalDateKey();
    const saved = window.localStorage.getItem(`coocoo_today_box_${todayKey}`);
    if (useSavedResult && saved !== null) {
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
    const resultKey = `box-${index}`;
    writeHistory("result", { resultKey, replace: !shouldTrack });
    applyPlayShare(content, box.title, box.detail, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: `box-${index}`, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, box.icon, box.title, "오늘 쿠쿠가 꺼내준 작은 미션", box.detail, { comment: getKukuComment("daily") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function getRankingItems() {
    const itemMap = new Map(content.items.map((item) => [item.id, item]));
    return state.order.map((id) => itemMap.get(id)).filter(Boolean);
  }

  function renderRanking() {
    if (!state.order.length) state.order = content.items.map((item) => item.id);
    const items = getRankingItems();
    root.innerHTML = `
      <section class="ranking-game">
        <div class="play-progress-label"><span>나의 우선순위</span><span>맨 위가 1순위</span></div>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p>위·아래 버튼으로 순서를 바꾸거나 카드를 끌어 옮겨보세요.</p>
        <ol class="ranking-list">
          ${items.map((item, index) => `
            <li class="ranking-item" draggable="true" data-ranking-id="${item.id}">
              <span class="ranking-position">${index + 1}</span>
              <span class="ranking-icon" aria-hidden="true">${item.icon}</span>
              <span class="ranking-copy"><strong>${escapePlayHtml(item.title)}</strong><small>${escapePlayHtml(item.description)}</small></span>
              <span class="ranking-controls">
                <button type="button" data-action="rank-up" data-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="${escapePlayHtml(item.title)} 위로 이동">↑</button>
                <button type="button" data-action="rank-down" data-index="${index}" ${index === items.length - 1 ? "disabled" : ""} aria-label="${escapePlayHtml(item.title)} 아래로 이동">↓</button>
              </span>
            </li>
          `).join("")}
        </ol>
        <button class="play-primary-button" type="button" data-action="finish-ranking">이 순서로 결과 보기</button>
      </section>
    `;
  }

  function moveRanking(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= state.order.length || toIndex >= state.order.length) return;
    const [moved] = state.order.splice(fromIndex, 1);
    state.order.splice(toIndex, 0, moved);
    replacePlayHistory();
    renderRanking();
  }

  function finishRanking(forcedResultKey = "", shouldTrack = true) {
    const resultKey = forcedResultKey || state.order[0] || content.items[0].id;
    const result = content.results[resultKey] || content.results[content.items[0].id];
    writeHistory("result", { resultKey: `rank-${resultKey}`, replace: !shouldTrack });
    applyPlayShare(content, result.title, result.line, `rank-${resultKey}`);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, result.detail, { resultLabel: "관계 순위 결과", comment: getKukuComment("ranking") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function getAllocationTotal() {
    return content.buckets.reduce((total, bucket) => total + (Number(state.allocation[bucket.id]) || 0), 0);
  }

  function renderAllocation() {
    const total = getAllocationTotal();
    root.innerHTML = `
      <section class="allocation-game">
        <div class="allocation-total"><span>배분한 에너지</span><strong>${total} / 100</strong><small>${100 - total} 남음</small></div>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p>각 항목의 막대를 움직여 합계 100을 만들어보세요.</p>
        <div class="allocation-list">
          ${content.buckets.map((bucket) => {
            const value = Number(state.allocation[bucket.id]) || 0;
            return `
              <label class="allocation-row">
                <span class="allocation-icon" aria-hidden="true">${bucket.icon}</span>
                <strong>${escapePlayHtml(bucket.label)}</strong>
                <output for="allocation-${bucket.id}">${value}</output>
                <input id="allocation-${bucket.id}" type="range" min="0" max="100" step="5" value="${value}" data-allocation-id="${bucket.id}" />
              </label>
            `;
          }).join("")}
        </div>
        <button class="play-primary-button" type="button" data-action="finish-allocation" ${total === 100 ? "" : "disabled"}>100을 다 나눴어요</button>
      </section>
    `;
  }

  function finishAllocation(forcedResultKey = "", shouldTrack = true) {
    const topBucket = [...content.buckets].sort((left, right) => (state.allocation[right.id] || 0) - (state.allocation[left.id] || 0))[0];
    const resultKey = forcedResultKey || topBucket.id;
    const result = content.results[resultKey] || content.results[content.buckets[0].id];
    const values = content.buckets.map((bucket) => Number(state.allocation[bucket.id]) || 0).join("-");
    const sharedKey = `energy-${resultKey}-${values}`;
    writeHistory("result", { resultKey: sharedKey, replace: !shouldTrack });
    applyPlayShare(content, result.title, result.line, sharedKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, allocation_total: getAllocationTotal(), duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, result.detail, { resultLabel: "에너지 배분 결과", comment: getKukuComment("allocation") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function renderStory() {
    const node = content.nodes[state.storyNode] || content.nodes[content.startNode];
    const step = state.storyPath.length + 1;
    root.innerHTML = `
      <section class="story-game">
        <div class="play-progress-label"><span>장면 ${step} / ${content.totalSteps || 2}</span><span>${escapePlayHtml(node.label)}</span></div>
        <div class="story-scene-icon" aria-hidden="true">${node.icon}</div>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p class="story-scene-copy">${escapePlayHtml(node.scene)}</p>
        <div class="story-choice-list">
          ${node.choices.map((choice, index) => `
            <button type="button" data-action="story-choice" data-choice-index="${index}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <strong>${escapePlayHtml(choice.label)}</strong>
              <b aria-hidden="true">→</b>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function chooseStory(index) {
    const node = content.nodes[state.storyNode] || content.nodes[content.startNode];
    const choice = node.choices[index];
    if (!choice) return;
    state.storyPath.push(index);

    if (choice.result) {
      finishStory(choice.result);
      return;
    }

    state.storyNode = choice.next;
    replacePlayHistory();
    renderStory();
    scrollPlaygroundToTop();
  }

  function finishStory(forcedResultKey = "", shouldTrack = true) {
    const resultKey = forcedResultKey || "observer";
    const result = content.results[resultKey] || content.results.observer;
    const sharedKey = `story-${resultKey}`;
    writeHistory("result", { resultKey: sharedKey, replace: !shouldTrack });
    applyPlayShare(content, result.title, result.line, sharedKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, story_path: state.storyPath.join("-"), duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, result.icon, result.title, result.line, result.detail, { resultLabel: "축제 이야기 결말", comment: getKukuComment("story") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function renderTrash() {
    root.innerHTML = `
      <section class="trash-game">
        <span class="play-content-type">${escapePlayHtml(content.category)}</span>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p>직접 적어도 되고, 지금 마음과 가까운 단어부터 눌러도 돼요.</p>
        <div class="trash-presets" aria-label="마음 단어 고르기">
          ${content.presets.map((preset) => `<button type="button" data-action="trash-preset" data-preset="${escapePlayHtml(preset)}">${escapePlayHtml(preset)}</button>`).join("")}
        </div>
        <div class="trash-paper">
          <label for="trashNote">지금 머릿속에 걸리는 말</label>
          <textarea id="trashNote" data-trash-input maxlength="120" rows="5" placeholder="여기에 잠깐 두고 갈 말을 적어보세요."></textarea>
          <small><span data-trash-count>0</span> / 120 · 입력한 문장은 저장하지 않아요.</small>
        </div>
        <button class="play-primary-button" type="button" data-action="trash-submit" disabled>구겨서 보내기</button>
      </section>
    `;
  }

  function finishTrash(shouldTrack = true) {
    const resultKey = "trash-done";
    writeHistory("result", { resultKey, replace: !shouldTrack });
    applyPlayShare(content, "여기 두고 가기 완료", "걸리던 말을 적고 화면 밖으로 보냈어요.", resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, "○", "여기 두고 가기 완료", "걸리던 말을 적고 화면 밖으로 보냈어요.", "무슨 말을 적었는지는 어디에도 남지 않아요. 잠깐 적어낸 것만으로 충분하니, 이 화면에서는 가볍게 두고 가요.", { resultLabel: "감정 비우기 완료", comment: getKukuComment("trash") });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function renderRoulette() {
    const enabled = new Set(state.rouletteEnabled);
    root.innerHTML = `
      <section class="roulette-game">
        <span class="play-content-type">${escapePlayHtml(content.category)}</span>
        <h1>${escapePlayHtml(content.title)}</h1>
        <p>후보를 눌러 켜거나 끌 수 있어요. 두 개 이상 남겨주세요.</p>
        <div class="roulette-wheel" aria-hidden="true"><span>↻</span></div>
        <div class="roulette-options">
          ${content.items.map((item, index) => `<button type="button" class="${enabled.has(index) ? "is-active" : ""}" data-action="roulette-toggle" data-index="${index}" aria-pressed="${enabled.has(index)}"><span>${String(index + 1).padStart(2, "0")}</span>${escapePlayHtml(item)}</button>`).join("")}
        </div>
        <button class="play-primary-button" type="button" data-action="roulette-spin" ${enabled.size >= 2 ? "" : "disabled"}>룰렛 돌리기</button>
      </section>
    `;
  }

  function toggleRoulette(index) {
    const enabled = new Set(state.rouletteEnabled);
    enabled.has(index) ? enabled.delete(index) : enabled.add(index);
    state.rouletteEnabled = [...enabled].sort((left, right) => left - right);
    replacePlayHistory();
    renderRoulette();
  }

  function spinRoulette() {
    if (state.rouletteEnabled.length < 2) return;
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    const resultIndex = state.rouletteEnabled[values[0] % state.rouletteEnabled.length];
    const wheel = root.querySelector(".roulette-wheel");
    const button = root.querySelector('[data-action="roulette-spin"]');
    if (wheel) wheel.classList.add("is-spinning");
    if (button instanceof HTMLButtonElement) button.disabled = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => finishRoulette(resultIndex), reduceMotion ? 60 : 900);
  }

  function finishRoulette(resultIndex = 0, shouldTrack = true) {
    const safeIndex = Math.max(0, Math.min(content.items.length - 1, Number(resultIndex) || 0));
    const selectedItem = content.items[safeIndex];
    const resultKey = `roulette-${safeIndex}`;
    writeHistory("result", { resultKey, replace: !shouldTrack });
    applyPlayShare(content, selectedItem, `오늘의 선택은 '${selectedItem}'이에요.`, resultKey);
    if (shouldTrack) trackPlayEvent("content_complete", content, { result_key: resultKey, enabled_count: state.rouletteEnabled.length, duration_seconds: Math.max(1, Math.round((Date.now() - state.startedAt) / 1000)) });
    root.innerHTML = renderPlayResult(content, "↻", selectedItem, `오늘의 선택은 '${selectedItem}'이에요.`, "룰렛은 골랐고, 따를지 말지는 여전히 네 마음이에요. 결과를 보자마자 다른 후보가 아쉬웠다면 그것도 꽤 정확한 답이에요.", { resultLabel: "선택 룰렛 결과", comment: getKukuComment("roulette"), restart: true });
    hydratePlayResultAd();
    scrollPlaygroundToTop();
  }

  function renderPlayResult(source, icon, title, line, detail, options = {}) {
    const resultLabel = options.resultLabel || `${source.category} 결과`;
    return `
      <section class="play-result">
        <span class="play-content-type">${escapePlayHtml(resultLabel)}</span>
        <div class="play-result-icon" aria-hidden="true">${icon}</div>
        <h1>${escapePlayHtml(title)}</h1>
        <strong>${escapePlayHtml(line)}</strong>
        <p>${escapePlayHtml(detail)}</p>
        <div class="kuku-comment"><img src="../assets/images/coocoo.png" alt="" /><span>쿠쿠의 한마디</span><p>${escapePlayHtml(options.comment || "친구 결과랑 나란히 놓으면 더 웃길지도 몰라.")}</p></div>
        ${options.restart ? `<button class="play-primary-button" type="button" data-action="restart">다시 도전하기</button>` : ""}
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
    window.clearInterval(state.timer);
    state.timer = null;
    state.screen = "play";
    state.index = 0;
    state.scores = {};
    state.selected = new Set();
    state.battery = 0;
    state.direction = 1;
    state.order = content.type === "ranking" ? content.items.map((item) => item.id) : [];
    state.allocation = content.type === "allocation"
      ? Object.fromEntries(content.buckets.map((bucket) => [bucket.id, 0]))
      : {};
    state.storyNode = content.type === "story" ? content.startNode : "";
    state.storyPath = [];
    state.rouletteEnabled = content.type === "roulette" ? content.items.map((item, index) => index) : [];
    state.startedAt = Date.now();
    writeHistory("play");
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
    if (content.type === "ranking") renderRanking();
    if (content.type === "allocation") renderAllocation();
    if (content.type === "story") renderStory();
    if (content.type === "trash") renderTrash();
    if (content.type === "roulette") renderRoulette();
    scrollPlaygroundToTop();
  }

  root.addEventListener("click", (event) => {
    const button = event.target instanceof HTMLElement ? event.target.closest("[data-action]") : null;
    if (!button) return;
    const action = button.dataset.action;
    if (action === "start" || action === "restart") startContent();
    if (action === "chat-reply") {
      state.scores[button.dataset.score] = (state.scores[button.dataset.score] || 0) + 1;
      state.index += 1;
      if (state.index >= content.questions.length) {
        finishChat();
      } else {
        replacePlayHistory();
        renderChat();
        scrollPlaygroundToTop();
      }
    }
    if (action === "toggle-bingo") {
      const index = Number(button.dataset.index);
      state.selected.has(index) ? state.selected.delete(index) : state.selected.add(index);
      replacePlayHistory();
      renderBingo();
    }
    if (action === "finish-bingo") finishBingo();
    if (action === "stop-battery") finishBattery();
    if (action === "choose-box") finishDaily(Number(button.dataset.index));
    if (action === "rank-up") moveRanking(Number(button.dataset.index), Number(button.dataset.index) - 1);
    if (action === "rank-down") moveRanking(Number(button.dataset.index), Number(button.dataset.index) + 1);
    if (action === "finish-ranking") finishRanking();
    if (action === "finish-allocation") finishAllocation();
    if (action === "story-choice") chooseStory(Number(button.dataset.choiceIndex));
    if (action === "trash-preset") {
      const textarea = root.querySelector("[data-trash-input]");
      if (textarea instanceof HTMLTextAreaElement) {
        textarea.value = textarea.value ? `${textarea.value}, ${button.dataset.preset}` : button.dataset.preset || "";
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();
      }
    }
    if (action === "trash-submit") {
      const paper = root.querySelector(".trash-paper");
      if (paper) paper.classList.add("is-discarding");
      if (button instanceof HTMLButtonElement) button.disabled = true;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => finishTrash(), reduceMotion ? 60 : 520);
    }
    if (action === "roulette-toggle") toggleRoulette(Number(button.dataset.index));
    if (action === "roulette-spin") spinRoulette();
  });

  root.addEventListener("input", (event) => {
    const textarea = event.target instanceof HTMLTextAreaElement ? event.target.closest("[data-trash-input]") : null;
    if (textarea) {
      const count = root.querySelector("[data-trash-count]");
      const submit = root.querySelector('[data-action="trash-submit"]');
      if (count) count.textContent = String(textarea.value.length);
      if (submit instanceof HTMLButtonElement) submit.disabled = !textarea.value.trim();
      return;
    }
    const input = event.target instanceof HTMLInputElement ? event.target.closest("[data-allocation-id]") : null;
    if (!input) return;
    const bucketId = input.dataset.allocationId;
    const previous = Number(state.allocation[bucketId]) || 0;
    const totalWithoutCurrent = getAllocationTotal() - previous;
    state.allocation[bucketId] = Math.min(Number(input.value), Math.max(0, 100 - totalWithoutCurrent));
    input.value = String(state.allocation[bucketId]);
    replacePlayHistory();
    const total = getAllocationTotal();
    const output = root.querySelector(`output[for="${input.id}"]`);
    const totalValue = root.querySelector(".allocation-total strong");
    const remainingValue = root.querySelector(".allocation-total small");
    const finishButton = root.querySelector('[data-action="finish-allocation"]');
    if (output) output.textContent = String(state.allocation[bucketId]);
    if (totalValue) totalValue.textContent = `${total} / 100`;
    if (remainingValue) remainingValue.textContent = `${100 - total} 남음`;
    if (finishButton instanceof HTMLButtonElement) finishButton.disabled = total !== 100;
  });

  let draggedRankingId = "";
  root.addEventListener("dragstart", (event) => {
    const item = event.target instanceof HTMLElement ? event.target.closest("[data-ranking-id]") : null;
    if (!item) return;
    draggedRankingId = item.dataset.rankingId || "";
    if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
  });

  root.addEventListener("dragover", (event) => {
    if (draggedRankingId && event.target instanceof HTMLElement && event.target.closest("[data-ranking-id]")) event.preventDefault();
  });

  root.addEventListener("drop", (event) => {
    const target = event.target instanceof HTMLElement ? event.target.closest("[data-ranking-id]") : null;
    if (!target || !draggedRankingId) return;
    event.preventDefault();
    moveRanking(state.order.indexOf(draggedRankingId), state.order.indexOf(target.dataset.rankingId));
    draggedRankingId = "";
  });

  function renderHistoryScreen(historyState) {
    restoringHistory = true;
    window.clearInterval(state.timer);
    state.timer = null;
    restoreSnapshot(historyState.snapshot);
    state.screen = historyState.screen;

    if (state.screen === "intro") renderIntro();
    if (state.screen === "play" && content.type === "chat") renderChat();
    if (state.screen === "play" && content.type === "bingo") renderBingo();
    if (state.screen === "play" && content.type === "battery") {
      renderBattery();
      state.timer = window.setInterval(updateBattery, 35);
    }
    if (state.screen === "play" && content.type === "daily") renderDaily(false);
    if (state.screen === "play" && content.type === "ranking") renderRanking();
    if (state.screen === "play" && content.type === "allocation") renderAllocation();
    if (state.screen === "play" && content.type === "story") renderStory();
    if (state.screen === "play" && content.type === "trash") renderTrash();
    if (state.screen === "play" && content.type === "roulette") renderRoulette();

    const resultKey = historyState.snapshot?.resultKey || "";
    if (state.screen === "result" && content.type === "chat") finishChat(resultKey, false);
    if (state.screen === "result" && content.type === "bingo" && /^bingo-\d+-\d+$/.test(resultKey)) {
      const [, selectedCount, bingos] = resultKey.match(/^bingo-(\d+)-(\d+)$/);
      finishBingo(Number(selectedCount), Number(bingos), false);
    }
    if (state.screen === "result" && content.type === "battery") finishBattery(Number(resultKey.replace("battery-", "")), false);
    if (state.screen === "result" && content.type === "daily") finishDaily(Number(resultKey.replace("box-", "")), false);
    if (state.screen === "result" && content.type === "ranking") finishRanking(resultKey.replace("rank-", ""), false);
    if (state.screen === "result" && content.type === "allocation") finishAllocation(resultKey.split("-")[1] || "", false);
    if (state.screen === "result" && content.type === "story") finishStory(resultKey.replace("story-", ""), false);
    if (state.screen === "result" && content.type === "trash") finishTrash(false);
    if (state.screen === "result" && content.type === "roulette") finishRoulette(Number(resultKey.replace("roulette-", "")), false);
    restoringHistory = false;
    scrollPlaygroundToTop();
  }

  window.addEventListener("popstate", (event) => {
    if (event.state?.coocooPlay && event.state.playId === playId) renderHistoryScreen(event.state);
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
  } else if (content.type === "ranking" && /^rank-[a-z]+$/.test(sharedResult)) {
    state.order = content.items.map((item) => item.id);
    finishRanking(sharedResult.replace("rank-", ""), false);
  } else if (content.type === "allocation" && /^energy-[a-z]+(?:-\d+){5}$/.test(sharedResult)) {
    const parts = sharedResult.split("-");
    const resultKey = parts[1];
    state.allocation = Object.fromEntries(content.buckets.map((bucket, index) => [bucket.id, Number(parts[index + 2]) || 0]));
    finishAllocation(resultKey, false);
  } else if (content.type === "story" && /^story-[a-z]+$/.test(sharedResult)) {
    state.storyNode = content.startNode;
    finishStory(sharedResult.replace("story-", ""), false);
  } else if (content.type === "trash" && sharedResult === "trash-done") {
    finishTrash(false);
  } else if (content.type === "roulette" && /^roulette-\d+$/.test(sharedResult)) {
    finishRoulette(Number(sharedResult.replace("roulette-", "")), false);
  } else {
    renderIntro();
    writeHistory("intro", { replace: true });
  }
}

document.addEventListener("DOMContentLoaded", createPlaygroundApp);
