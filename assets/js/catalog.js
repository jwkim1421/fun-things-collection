(function buildContentCatalog() {
  const testCards = Array.isArray(window.SITE_CONTENT?.cards) ? window.SITE_CONTENT.cards : [];

  const playCards = [
    { id: "chat-temperature", href: "./play/chat-temperature.html", eyebrow: "대화형 테스트", title: "썸 탈 때 내 답장 온도는?", description: "쿠쿠와 카톡하듯 답장을 고르면 내 대화 온도가 보여요.", time: "2분", icon: "💬", iconAsset: "kuku-chat.svg", tone: "coral", tags: ["연애", "썸", "대화", "관계"] },
    { id: "procrastination-bingo", href: "./play/procrastination-bingo.html", eyebrow: "체크형 놀이", title: "대학생 미루기 습관 빙고", description: "찔리는 칸을 눌러 오늘의 미루기 레벨을 완성해보세요.", time: "1분", icon: "▦", iconAsset: "kuku-bingo.svg", tone: "blue", tags: ["대학생", "학교", "빙고", "공감"] },
    { id: "battery-stop", href: "./play/battery-stop.html", eyebrow: "30초 게임", title: "쿠쿠 배터리 100%에 멈추기", description: "빠르게 차오르는 배터리를 100에 가장 가깝게 멈춰요.", time: "30초", icon: "⚡", iconAsset: "kuku-battery.svg", tone: "yellow", tags: ["게임", "순발력", "30초", "도전"] },
    { id: "today-box", href: "./play/today-box.html", eyebrow: "하루 한 번", title: "쿠쿠의 오늘 상자", description: "상자 하나를 고르면 오늘의 작은 미션이 나와요.", time: "20초", icon: "□", tone: "green", tags: ["오늘", "미션", "랜덤", "20초"] },
    { id: "relationship-ranking", href: "./play/relationship-ranking.html", eyebrow: "카드 순위형", title: "관계에서 포기 못 하는 것 순위", description: "다섯 장을 옮겨 지금 가장 중요한 관계 기준을 골라요.", time: "2분", icon: "↕", tone: "paper", tags: ["관계", "친구", "랭킹", "가치관"] },
    { id: "weekly-energy-budget", href: "./play/weekly-energy-budget.html", eyebrow: "포인트 배분형", title: "이번 주 에너지 100을 어디에 쓸까?", description: "에너지 100을 나누면 지금 마음이 향한 곳이 보여요.", time: "1분", icon: "100", tone: "yellow", tags: ["에너지", "일주일", "배분", "라이프"] },
    { id: "campus-festival-story", href: "./play/campus-festival-story.html", eyebrow: "분기형 스토리", title: "축제 날, 쿠쿠를 어디서 만날까?", description: "고른 길에 따라 쿠쿠를 만나는 장소와 결말이 달라져요.", time: "2분", icon: "?", tone: "coral", tags: ["대학생", "축제", "스토리", "선택"] },
    { id: "emotion-trash", href: "./play/emotion-trash.html", eyebrow: "감정 비우기", title: "오늘 마음, 여기 두고 갈래?", description: "걸리는 말을 짧게 적고 구겨서 화면 밖으로 보내요.", time: "1분", icon: "⌁", tone: "blue", tags: ["감정", "힐링", "오늘", "마음"] },
    { id: "choice-roulette", href: "./play/choice-roulette.html", eyebrow: "선택 룰렛", title: "쿠쿠야, 하나만 골라줘", description: "고민되는 선택지만 켜두면 쿠쿠가 하나를 뽑아줘요.", time: "30초", icon: "↻", tone: "green", tags: ["선택", "룰렛", "랜덤", "30초"] }
  ].map((item) => ({
    ...item,
    type: "play",
    category: item.eyebrow,
    duration: item.time,
    tags: /^(?:20|30)초$|^1분$/.test(item.time) ? [...item.tags, "짧은놀이"] : item.tags
  }));

  const tagRules = [
    ["연애", /연애|썸|플러팅|매력/], ["관계", /관계|친구|소셜|팀플/],
    ["대학생", /대학생|학교|팀플|축제/], ["라이프", /라이프|주말|여행|방|일정|소비/],
    ["감정", /감정|감성|무드|스트레스|심리/], ["취향", /취향|여행|사진|방|계절/],
    ["성향", /성향|성격|타입|반응|결정/], ["회복", /회복|충전|배터리|에너지|여유/],
    ["짧은놀이", /30초|90초|1분/]
  ];

  function tagsForTest(card) {
    const searchable = `${card.title || ""} ${card.category || ""} ${card.description || ""}`;
    const tags = tagRules.filter(([, pattern]) => pattern.test(searchable)).map(([tag]) => tag);
    return [...new Set([String(card.category || "테스트").replace(/\s*테스트$/, ""), ...tags])].filter(Boolean);
  }

  const tests = testCards.map((card) => ({
    ...card,
    type: "test",
    tags: tagsForTest(card)
  }));

  const items = [...tests, ...playCards];
  const byId = Object.fromEntries(items.map((item) => [item.id, item]));
  const themes = [
    { id: "popular", title: "처음이라면 이 카드부터", description: "쿠쿠 대표 테스트와 짧은 놀이부터 모았어요.", ids: ["test-020", "chat-temperature", "procrastination-bingo", "battery-stop"] },
    { id: "relationship", title: "연애와 관계가 궁금한 날", description: "답장 온도부터 친구 사이의 거리까지 가볍게 펼쳐봐요.", tags: ["연애", "관계"] },
    { id: "campus", title: "대학생 현실 공감 구역", description: "팀플, 미루기, 축제처럼 캠퍼스에서 자주 만나는 장면이에요.", tags: ["대학생"] },
    { id: "mood", title: "마음이 조금 복잡한 날", description: "지금 감정과 회복 리듬을 천천히 확인해봐요.", tags: ["감정", "회복"] },
    { id: "quick", title: "1분 안에 잠깐 놀기", description: "설명은 짧게, 결과는 바로 볼 수 있는 카드예요.", tags: ["짧은놀이"] }
  ];

  function itemsForTheme(theme, limit = 6) {
    const selected = theme.ids
      ? theme.ids.map((id) => byId[id]).filter(Boolean)
      : items.filter((item) => theme.tags.some((tag) => item.tags.includes(tag)));
    return selected.slice(0, limit);
  }

  window.COOCOO_CATALOG = { items, tests, playCards, themes, byId, itemsForTheme };
})();
