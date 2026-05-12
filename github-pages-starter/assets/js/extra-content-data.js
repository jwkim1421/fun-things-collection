(function extendSiteContent() {
  const siteContent = window.SITE_CONTENT || (window.SITE_CONTENT = {});
  const cards = Array.isArray(siteContent.cards) ? siteContent.cards : (siteContent.cards = []);
  const pages = siteContent.pages || (siteContent.pages = {});

  function makePage(definition) {
    const questionCount = Array.isArray(definition.questions) ? definition.questions.length : 0;

    return Object.assign(
      {
        intro: "가볍게 답하면서 지금의 성향을 빠르게 확인하는 쿠쿠 테스트입니다.",
        pills: [definition.category || "테스트", `${questionCount}문항`, "가볍게 보기"],
        eyebrow: "Kuku Test",
        heroCardTitle: definition.title,
        heroCardSubtitle: definition.heroCardSubtitle || definition.summary,
        startLabel: "테스트 시작하기",
        loadingTitle: "결과를 불러오는 중",
        loadingHint: "잠시만요. 가장 닮은 결과를 정리하고 있어요.",
        relatedIntro: "비슷한 무드의 테스트도 이어서 눌러보세요.",
        startButtonLabel: "테스트 시작하기",
        resetButtonLabel: "다시 해보기",
        otherTestLabel: "다른 테스트 보기"
      },
      definition
    );
  }

  function q(prompt, leftLabel, leftScores, rightLabel, rightScores) {
    return {
      prompt,
      options: [
        { label: leftLabel, scores: leftScores },
        { label: rightLabel, scores: rightScores }
      ]
    };
  }

  const extraCards = [
    {
      id: "test-007",
      title: "썸 대화 온도 체크",
      description: "메시지 텐션과 답장 스타일로 보는 나의 썸 대화 리듬 테스트입니다.",
      href: "./tests/test-007.html",
      badge: "연애",
      category: "연애 테스트",
      duration: "2분",
      icon: "💬",
      posterTitle: "썸 대화 체크",
      posterSubtitle: "내 말투의 온도는?",
      stickers: ["📱", "💗", "🫧", "🌙"],
      thumb: "linear-gradient(135deg, #ffe1ef, #fff0bf)"
    },
    {
      id: "test-008",
      title: "첫인상보다 오래가는 내 매력은?",
      description: "처음보다 시간이 지날수록 더 크게 보이는 나의 매력 포인트를 알아보는 테스트입니다.",
      href: "./tests/test-008.html",
      badge: "매력",
      category: "성격 테스트",
      duration: "2분",
      icon: "✨",
      posterTitle: "숨은 매력 체크",
      posterSubtitle: "오래가는 내 포인트",
      stickers: ["🌟", "🎀", "💡", "🪞"],
      thumb: "linear-gradient(135deg, #fff4c8, #ffe2f6)"
    },
    {
      id: "test-009",
      title: "결정을 내리는 순간의 나",
      description: "직감파인지 분석파인지, 선택 앞에서 드러나는 내 결심 방식을 보는 테스트입니다.",
      href: "./tests/test-009.html",
      badge: "성향",
      category: "성향 테스트",
      duration: "2분",
      icon: "🧭",
      posterTitle: "결정 타입",
      posterSubtitle: "나는 어떻게 고를까?",
      stickers: ["🗂️", "⚡", "🤝", "🧠"],
      thumb: "linear-gradient(135deg, #e5f0ff, #f8e1ff)"
    },
    {
      id: "test-010",
      title: "돈 쓸 때 드러나는 소비 타입",
      description: "계획형인지 감정형인지, 결제 순간에 드러나는 내 소비 성향 테스트입니다.",
      href: "./tests/test-010.html",
      badge: "라이프",
      category: "라이프",
      duration: "2분",
      icon: "💳",
      posterTitle: "소비 타입 체크",
      posterSubtitle: "나는 어디에 쓸까?",
      stickers: ["👜", "🧾", "☕", "🎁"],
      thumb: "linear-gradient(135deg, #fff0d1, #ffe4e4)"
    },
    {
      id: "test-011",
      title: "팀플에서 맡게 되는 역할",
      description: "모임이나 협업에서 내가 자연스럽게 맡는 포지션을 알아보는 팀플 테스트입니다.",
      href: "./tests/test-011.html",
      badge: "관계",
      category: "관계 테스트",
      duration: "2분",
      icon: "🧩",
      posterTitle: "팀플 포지션",
      posterSubtitle: "나는 어떤 역할?",
      stickers: ["📎", "📣", "🤝", "🛠️"],
      thumb: "linear-gradient(135deg, #effad6, #e3f0ff)"
    },
    {
      id: "test-012",
      title: "쉬는 날 인간관계 충전법",
      description: "혼자 쉬어야 풀리는지, 사람 만나야 살아나는지 보는 관계 충전 테스트입니다.",
      href: "./tests/test-012.html",
      badge: "충전",
      category: "관계 테스트",
      duration: "90초",
      icon: "🌿",
      posterTitle: "관계 충전법",
      posterSubtitle: "쉬는 날 누구와?",
      stickers: ["🛋️", "☕", "👥", "🌙"],
      thumb: "linear-gradient(135deg, #e6f9ec, #f6eaff)"
    },
    {
      id: "test-013",
      title: "나의 플러팅 방식 찾기",
      description: "직진형인지 은근형인지, 설렘이 생겼을 때 드러나는 나의 플러팅 방식 테스트입니다.",
      href: "./tests/test-013.html",
      badge: "썸",
      category: "연애 테스트",
      duration: "2분",
      icon: "😏",
      posterTitle: "플러팅 방식",
      posterSubtitle: "나는 어떻게 티 낼까?",
      stickers: ["💘", "😉", "🎵", "💌"],
      thumb: "linear-gradient(135deg, #ffe7cf, #ffdff1)"
    },
    {
      id: "test-014",
      title: "사진첩 무드로 보는 감성 타입",
      description: "내 사진첩에 가장 많이 남는 장면으로 보는 감성 기록 스타일 테스트입니다.",
      href: "./tests/test-014.html",
      badge: "감성",
      category: "취향 테스트",
      duration: "2분",
      icon: "📸",
      posterTitle: "사진첩 무드",
      posterSubtitle: "내가 남기는 장면",
      stickers: ["🌤️", "🎞️", "🌊", "☕"],
      thumb: "linear-gradient(135deg, #eef6ff, #ffe9d9)"
    },
    {
      id: "test-015",
      title: "내 방이 말해주는 취향 무드",
      description: "내가 편안함을 느끼는 공간 취향과 방 꾸미기 무드를 보는 테스트입니다.",
      href: "./tests/test-015.html",
      badge: "취향",
      category: "취향 테스트",
      duration: "2분",
      icon: "🛋️",
      posterTitle: "방 무드 체크",
      posterSubtitle: "내 공간 취향은?",
      stickers: ["🪴", "🕯️", "🧸", "📚"],
      thumb: "linear-gradient(135deg, #fff1d3, #f4e4ff)"
    },
    {
      id: "test-016",
      title: "약속 잡을 때 드러나는 일정 성향",
      description: "일정을 세세히 맞추는 편인지, 흐름대로 잡는 편인지 보는 약속 스타일 테스트입니다.",
      href: "./tests/test-016.html",
      badge: "생활",
      category: "라이프",
      duration: "90초",
      icon: "📅",
      posterTitle: "약속 일정 성향",
      posterSubtitle: "나는 어떻게 잡을까?",
      stickers: ["🗓️", "📍", "⏰", "📞"],
      thumb: "linear-gradient(135deg, #e8f2ff, #ffe7ef)"
    },
    {
      id: "test-017",
      title: "칭찬 들었을 때 반응 타입",
      description: "칭찬 앞에서 수줍어지는지, 힘이 나는지, 장난으로 넘기는지 보는 반응 테스트입니다.",
      href: "./tests/test-017.html",
      badge: "심리",
      category: "성격 테스트",
      duration: "90초",
      icon: "🫶",
      posterTitle: "칭찬 반응 체크",
      posterSubtitle: "나는 어떻게 받을까?",
      stickers: ["🌷", "😳", "🔥", "🎉"],
      thumb: "linear-gradient(135deg, #fff0f0, #fff5bf)"
    },
    {
      id: "test-018",
      title: "계절이 바뀌면 깨어나는 감성은?",
      description: "계절 변화에 맞춰 더 크게 살아나는 나의 무드를 보는 감성 테스트입니다.",
      href: "./tests/test-018.html",
      badge: "무드",
      category: "감성 테스트",
      duration: "2분",
      icon: "🍃",
      posterTitle: "계절 감성 체크",
      posterSubtitle: "나는 어떤 계절 무드?",
      stickers: ["🌸", "☀️", "🍂", "❄️"],
      thumb: "linear-gradient(135deg, #e8ffe9, #ffe9f6)"
    },
    {
      id: "test-019",
      title: "스트레스 해소 버튼 찾기",
      description: "움직이면 풀리는지, 말해야 풀리는지, 혼자 정리해야 풀리는지 보는 테스트입니다.",
      href: "./tests/test-019.html",
      badge: "회복",
      category: "심리 체크",
      duration: "2분",
      icon: "🎮",
      posterTitle: "스트레스 해소법",
      posterSubtitle: "내 버튼은 어디?",
      stickers: ["🏃", "💬", "🛌", "🎨"],
      thumb: "linear-gradient(135deg, #fff0d9, #e4f2ff)"
    },
    {
      id: "test-020",
      title: "소셜 배터리 사용법",
      description: "사람 많은 자리가 살아나는지, 깊은 대화가 맞는지 보는 소셜 배터리 테스트입니다.",
      href: "./tests/test-020.html",
      badge: "관계",
      category: "관계 테스트",
      duration: "2분",
      icon: "🔋",
      posterTitle: "소셜 배터리",
      posterSubtitle: "나는 어디서 충전될까?",
      stickers: ["🎉", "🫂", "👀", "🌙"],
      thumb: "linear-gradient(135deg, #fff1bf, #e7e7ff)"
    }
  ];

  const extraPages = {
    "test-007": makePage({
      category: "연애 테스트",
      title: "썸 대화 온도 체크",
      summary: "답장 톤과 표현 습관으로 보는 나의 썸 대화 온도 테스트입니다.",
      heroCardSubtitle: "내 말투의 온도는?",
      heroArt: { centerEmoji: "💬", stickers: ["📱", "💗", "🫧", "🌙", "💌", "😉"] },
      loadingMessage: "답변을 조합해서 당신의 썸 대화 리듬을 정리하고 있습니다.",
      questions: [
        q("호감 가는 사람이 스토리를 올리면 나는?", "가볍게 반응하며 먼저 물꼬를 튼다.", { spark: 2, tease: 1 }, "괜히 티 날까 봐 한 번 더 보고 지나간다.", { calm: 2, steady: 1 }),
        q("답장이 늦게 왔을 때 더 가까운 반응은?", "내 텐션은 유지하되 분위기를 끌고 간다.", { spark: 2 }, "상대 속도에 맞춰 차분하게 템포를 조절한다.", { steady: 2, calm: 1 }),
        q("썸 대화에서 내가 자주 쓰는 방식은?", "농담이나 이모지로 분위기를 가볍게 만든다.", { tease: 2, spark: 1 }, "상대 하루를 묻고 공감하며 흐름을 잇는다.", { steady: 2 }),
        q("연락이 잘 통하는 순간 나는?", "이 기세로 더 재밌는 대화를 이어가고 싶다.", { spark: 2, tease: 1 }, "좋은 흐름을 깨지 않게 적당한 템포를 유지한다.", { steady: 2, calm: 1 }),
        q("상대가 장난을 걸어오면 나는?", "더 센스 있게 받아치며 분위기를 살린다.", { tease: 2 }, "웃으며 받아주되 과하지 않게 맞춘다.", { calm: 2, steady: 1 }),
        q("호감 표현에서 더 가까운 것은?", "은근히 티 내기보다 제법 잘 드러나는 편", { spark: 2 }, "조금씩 편안함을 쌓다가 자연스럽게 표현하는 편", { steady: 2, calm: 1 }),
        q("대화가 끊길 것 같을 때 나는?", "새 화제나 장난을 던져 다시 살린다.", { tease: 2, spark: 1 }, "굳이 억지로 잇지 않고 다음 타이밍을 본다.", { calm: 2 }),
        q("내가 가장 듣고 싶은 말은?", "너랑 대화하면 텐션이 올라가", { spark: 2, tease: 1 }, "너랑 대화하면 편하고 마음이 놓여", { steady: 2, calm: 1 })
      ],
      results: {
        spark: { title: "직진 온도상승형", summary: "대화에 불이 붙으면 먼저 분위기를 살리는 타입", description: "당신은 썸 대화에서 텐션을 살리는 힘이 좋습니다. 답장이 오면 흐름을 놓치지 않고, 감정이 생기면 비교적 솔직하게 드러나는 편입니다.", strengths: ["대화 텐션을 살리는 추진력", "호감이 생기면 흐름을 주도하는 편", "어색함을 길게 끌지 않음"], tip: "당신의 빠른 텐션이 매력이지만, 상대 속도를 한 박자만 읽어주면 훨씬 안정적으로 이어집니다.", moodTitle: "대화 무드 키워드", moodItems: ["빠른 티키타카", "먼저 반응하기", "설렘 텐션"], matchTitle: "찰떡 케미", matchLabel: "편안한 스며듦형", matchDescription: "당신의 생동감에 상대의 안정감이 더해지면 대화가 오래 갑니다.", heroEmoji: "🔥" },
        steady: { title: "편안한 스며듦형", summary: "가볍지만 오래 가는 흐름을 만드는 타입", description: "당신은 썸 대화에서 과한 밀당보다 편안한 호흡을 선호합니다. 상대가 부담 없이 답할 수 있는 분위기를 만들고, 신뢰가 쌓이는 속도에 강합니다.", strengths: ["편안한 대화 리듬", "상대가 부담을 덜 느끼는 표현", "꾸준히 이어가는 안정감"], tip: "편안함이 강점이라면, 가끔은 호감이 있다는 신호를 한 번 더 보여줘도 좋아요.", moodTitle: "대화 무드 키워드", moodItems: ["잔잔한 텐션", "천천히 스며듦", "안정감"], matchTitle: "찰떡 케미", matchLabel: "직진 온도상승형", matchDescription: "상대의 적극성이 당신의 편안함과 만나면 균형이 좋습니다.", heroEmoji: "☕" },
        tease: { title: "장난 센스형", summary: "장난과 농담 속에서 설렘을 만드는 타입", description: "당신은 대화에서 무게를 낮추고 가볍게 분위기를 살리는 데 강합니다. 유머와 센스로 기억되기 쉽고, 서로 웃을 수 있는 공기를 만드는 힘이 큽니다.", strengths: ["장난 섞인 센스", "어색함을 빨리 풀어냄", "기억에 남는 대화 포인트"], tip: "재미가 큰 무기인 만큼, 결정적인 순간엔 진심 한 줄을 얹어주면 훨씬 선명해집니다.", moodTitle: "대화 무드 키워드", moodItems: ["농담 반 진심 반", "센스 있는 답장", "분위기 메이킹"], matchTitle: "찰떡 케미", matchLabel: "차분 관찰형", matchDescription: "당신의 장난기를 상대의 신중함이 안정감 있게 받아줄 때 케미가 좋아집니다.", heroEmoji: "😏" },
        calm: { title: "차분 관찰형", summary: "대화의 온도와 타이밍을 섬세하게 읽는 타입", description: "당신은 대화의 양보다 결을 보는 편입니다. 너무 빠르게 들이밀기보다 상대의 반응, 템포, 말투를 읽으면서 안정적인 흐름을 찾습니다.", strengths: ["타이밍 감각", "상대 리듬을 잘 읽음", "과하지 않은 매력"], tip: "생각이 정리될 때까지 기다리기보다, 가벼운 호감 표현부터 먼저 써보면 더 자연스럽게 이어집니다.", moodTitle: "대화 무드 키워드", moodItems: ["느린 호흡", "반응 읽기", "타이밍 보기"], matchTitle: "찰떡 케미", matchLabel: "장난 센스형", matchDescription: "상대의 가벼운 장난이 당신의 조심스러움을 편하게 풀어줍니다.", heroEmoji: "🌙" }
      },
      resultPreview: ["직진 온도상승형", "편안한 스며듦형", "장난 센스형", "차분 관찰형"],
      relatedIds: ["test-013", "test-001", "test-017"],
      callout: "친구와 서로의 대화 온도를 비교하면 누가 먼저 텐션을 올리는 타입인지 재밌게 보여요."
    }),
    "test-008": makePage({
      category: "성격 테스트",
      title: "첫인상보다 오래가는 내 매력은?",
      summary: "처음보다 시간이 지날수록 더 크게 느껴지는 나의 매력 포인트를 알아보는 테스트입니다.",
      heroCardSubtitle: "오래가는 내 포인트",
      heroArt: { centerEmoji: "✨", stickers: ["🌟", "🎀", "💡", "🪞", "🌼", "🫶"] },
      loadingMessage: "답변을 조합해서 당신의 오래가는 매력 포지션을 정리하고 있습니다.",
      questions: [
        q("사람들이 나와 친해진 뒤 자주 말하는 것은?", "생각보다 훨씬 따뜻하다는 말", { comfort: 2, glow: 1 }, "생각보다 더 재밌고 센스 있다는 말", { wit: 2, mystery: 1 }),
        q("내가 편한 분위기는?", "누군가가 마음 놓고 쉴 수 있는 분위기", { comfort: 2 }, "이야기 흐름이 살아 있고 반응이 오가는 분위기", { wit: 2, glow: 1 }),
        q("처음엔 조용해 보여도 실제로는?", "은근히 배려가 많고 챙기는 편", { comfort: 2, mystery: 1 }, "한마디씩 툭툭 던지는 포인트가 있다", { wit: 2 }),
        q("사람들이 나를 오래 기억하는 이유는?", "함께 있으면 기분이 차분해져서", { comfort: 2 }, "생각보다 인상이 남는 포인트가 있어서", { mystery: 2, glow: 1 }),
        q("내가 자주 듣는 칭찬은?", "말이나 행동이 다정하다는 말", { glow: 2, comfort: 1 }, "은근히 웃기고 매력 있다는 말", { wit: 2 }),
        q("친해질수록 더 드러나는 건?", "편안함과 신뢰", { comfort: 2, glow: 1 }, "개성과 의외성", { mystery: 2, wit: 1 }),
        q("사람과 가까워질 때 나는?", "작은 걸 기억하고 챙기며 스며든다.", { glow: 2, comfort: 1 }, "타이밍 좋은 말과 반응으로 존재감이 커진다.", { wit: 2 }),
        q("내 매력을 한 단어로 고른다면?", "포근함", { comfort: 2, glow: 1 }, "여운", { mystery: 2, wit: 1 })
      ],
      results: {
        glow: { title: "은근 발광형", summary: "시간이 지날수록 따뜻함이 선명해지는 타입", description: "당신의 매력은 처음부터 화려하게 튀기보다, 알고 지낼수록 점점 크게 느껴지는 쪽에 가깝습니다. 사소한 배려와 온기가 오래 남습니다.", strengths: ["자연스러운 따뜻함", "부담 없는 호감", "작게 오래 남는 여운"], tip: "이미 좋은 빛을 갖고 있으니, 가끔은 스스로를 더 드러내는 순간도 만들어보세요.", moodTitle: "내 매력 키워드", moodItems: ["온기", "배려", "잔잔한 존재감"], matchTitle: "찰떡 포인트", matchLabel: "위트 레이더형", matchDescription: "당신의 따뜻함에 상대의 재치가 더해지면 공기가 더 풍성해집니다.", heroEmoji: "🌟" },
        comfort: { title: "포근 안정형", summary: "함께 있으면 마음이 놓이는 타입", description: "당신은 시간이 지날수록 편안함과 안정감을 주는 사람으로 기억됩니다. 자극적이지 않아도 오래 찾게 되는 매력이 큽니다.", strengths: ["함께 있으면 마음이 놓임", "신뢰를 주는 태도", "관계를 오래가게 하는 힘"], tip: "당신의 안정감은 큰 무기예요. 여기에 취향이나 의견을 더 보여주면 더 입체적으로 기억됩니다.", moodTitle: "내 매력 키워드", moodItems: ["편안함", "신뢰", "포근함"], matchTitle: "찰떡 포인트", matchLabel: "미스터리 잔상형", matchDescription: "당신의 안정감이 상대의 깊은 인상을 더 오래 남게 해줍니다.", heroEmoji: "🧸" },
        wit: { title: "위트 레이더형", summary: "말 한마디와 반응 센스로 매력이 커지는 타입", description: "당신은 오래 볼수록 재치와 센스가 더 큰 매력으로 느껴집니다. 적당한 타이밍의 말, 분위기를 읽는 반응, 웃음을 만드는 감각이 돋보입니다.", strengths: ["센스 있는 반응", "분위기를 살리는 말맛", "기억에 남는 포인트"], tip: "센스가 강점인 만큼, 진심이 필요한 순간에는 한 번 더 또렷한 표현을 해보면 좋아요.", moodTitle: "내 매력 키워드", moodItems: ["재치", "반응력", "밝은 공기"], matchTitle: "찰떡 포인트", matchLabel: "포근 안정형", matchDescription: "상대의 차분함이 당신의 재치를 더 편안하게 빛나게 합니다.", heroEmoji: "🎈" },
        mystery: { title: "미스터리 잔상형", summary: "의외성과 깊이로 오래 기억되는 타입", description: "당신은 처음보다 나중에 더 궁금해지는 사람에 가깝습니다. 한 번에 다 드러나지 않는 결, 의외의 취향, 조용한 존재감이 오래 남습니다.", strengths: ["궁금증을 남기는 분위기", "의외성 있는 매력", "깊은 인상"], tip: "모든 걸 다 보여주지 않아도 좋지만, 너무 조용하면 지나칠 수 있어요. 한 포인트는 선명하게 남겨보세요.", moodTitle: "내 매력 키워드", moodItems: ["여운", "깊이", "의외성"], matchTitle: "찰떡 포인트", matchLabel: "은근 발광형", matchDescription: "상대의 온기가 당신의 조용한 매력을 더 편하게 드러내게 합니다.", heroEmoji: "🌙" }
      },
      resultPreview: ["은근 발광형", "포근 안정형", "위트 레이더형", "미스터리 잔상형"],
      relatedIds: ["test-017", "test-014", "test-013"],
      callout: "첫인상보다 오래 남는 포인트는 스스로보다 주변 사람이 더 잘 볼 때도 있어요."
    }),
    "test-009": makePage({
      category: "성향 테스트",
      title: "결정을 내리는 순간의 나",
      summary: "선택 앞에서 내가 무엇을 먼저 보는지, 나의 결심 방식을 알아보는 테스트입니다.",
      heroCardSubtitle: "나는 어떻게 고를까?",
      heroArt: { centerEmoji: "🧭", stickers: ["🧠", "⚡", "🤝", "📋", "🎯", "☁️"] },
      loadingMessage: "답변을 조합해서 당신의 결정 스타일을 정리하고 있습니다.",
      questions: [
        q("메뉴를 고를 때 나는?", "후기나 실패 확률을 먼저 본다.", { logic: 2 }, "지금 당기는 쪽으로 빠르게 간다.", { gut: 2, quick: 1 }),
        q("중요한 선택을 앞두면?", "혼자 정리하고 기준을 세운다.", { logic: 2, harmony: 1 }, "생각보다 느낌과 직감이 크게 작용한다.", { gut: 2 }),
        q("다른 사람 의견은 내게?", "참고는 하지만 내 기준이 더 중요하다.", { logic: 2, quick: 1 }, "최종 선택 전에 꼭 한 번 더 듣는다.", { harmony: 2 }),
        q("선택이 길어질 때 나는?", "정보가 부족해서라고 느낀다.", { logic: 2 }, "결정 피로가 와서 빨리 끝내고 싶어진다.", { quick: 2 }),
        q("갑자기 기회가 생기면?", "기본 조건부터 빠르게 체크한다.", { logic: 2, quick: 1 }, "끌리면 일단 잡고 본다.", { gut: 2 }),
        q("후회가 적은 결정은?", "충분히 따져보고 내린 결정", { logic: 2 }, "당시 마음이 확실했던 결정", { gut: 2 }),
        q("친구와 같이 정할 때 나는?", "각자 원하는 걸 정리하며 중간점을 찾는다.", { harmony: 2 }, "대략 방향이 보이면 빨리 결론 내린다.", { quick: 2, logic: 1 }),
        q("내 선택 스타일을 한마디로 말하면?", "이해하고 납득되면 움직이는 편", { logic: 2, harmony: 1 }, "감이 오면 망설임이 줄어드는 편", { gut: 2, quick: 1 })
      ],
      results: {
        logic: { title: "분석 나침반형", summary: "기준을 세우고 납득해야 움직이는 타입", description: "당신은 선택 앞에서 구조와 근거를 중시합니다. 충분히 이해한 뒤 결정해야 후회가 적고, 그래서 중요한 문제일수록 더 안정적인 결론을 내립니다.", strengths: ["기준이 분명함", "후회가 적은 결정", "복잡한 선택에 강함"], tip: "충분한 분석은 강점이지만, 작은 선택까지 같은 에너지를 쓰면 지칠 수 있어요.", moodTitle: "선택 키워드", moodItems: ["기준", "납득", "정리"], matchTitle: "찰떡 보완", matchLabel: "직감 스위치형", matchDescription: "상대의 직감이 당신의 긴 검토 시간을 가볍게 풀어줄 수 있습니다.", heroEmoji: "🧠" },
        gut: { title: "직감 스위치형", summary: "설명보다 느낌이 먼저 움직이는 타입", description: "당신은 선택의 순간에 직감이 선명하게 오는 편입니다. 끌리는 방향과 분위기를 빠르게 읽고, 감이 맞을 때 좋은 선택을 잘 만들어냅니다.", strengths: ["빠른 감지력", "현장감 있는 선택", "기회 포착"], tip: "직감이 좋을수록, 큰 선택 하나쯤은 근거를 덧붙여보면 결과가 더 단단해집니다.", moodTitle: "선택 키워드", moodItems: ["끌림", "타이밍", "감"], matchTitle: "찰떡 보완", matchLabel: "분석 나침반형", matchDescription: "당신의 감에 상대의 구조가 더해지면 실행력과 안정감이 같이 살아납니다.", heroEmoji: "⚡" },
        harmony: { title: "조율 밸런스형", summary: "사람과 상황의 균형을 보며 고르는 타입", description: "당신은 내 선택만큼 주변과의 합도 중요하게 여깁니다. 혼자만 맞는 결정보다 함께 오래갈 수 있는 결정을 잘 만드는 편입니다.", strengths: ["균형 감각", "관계 속 조율 능력", "무리 없는 결론"], tip: "조율이 장점이지만, 내 마음이 작아지지 않도록 최종 기준은 한 번 더 챙겨보세요.", moodTitle: "선택 키워드", moodItems: ["균형", "조율", "합"], matchTitle: "찰떡 보완", matchLabel: "빠른 결정형", matchDescription: "상대의 결단력이 당신의 고민을 앞으로 밀어주는 역할을 할 수 있습니다.", heroEmoji: "🤝" },
        quick: { title: "빠른 결정형", summary: "길게 끌기보다 결론을 내야 편한 타입", description: "당신은 결정 자체를 미루는 것보다, 어느 정도 보이면 빠르게 끝내는 쪽에 가깝습니다. 실행이 빠르고 관성이 생기기 전에 움직이는 힘이 큽니다.", strengths: ["결단력", "실행 속도", "선택 피로를 줄이는 감각"], tip: "당신의 속도는 강점입니다. 다만 큰 결정에서는 한 번만 더 확인하는 습관이 도움이 됩니다.", moodTitle: "선택 키워드", moodItems: ["속도", "결론", "실행"], matchTitle: "찰떡 보완", matchLabel: "조율 밸런스형", matchDescription: "상대의 균형감이 당신의 빠른 결정을 부드럽게 다듬어줍니다.", heroEmoji: "🎯" }
      },
      resultPreview: ["분석 나침반형", "직감 스위치형", "조율 밸런스형", "빠른 결정형"],
      relatedIds: ["test-010", "test-016", "test-004"],
      callout: "결정을 내리는 방식은 취향, 일, 인간관계에서 은근히 모두 드러나더라고요."
    }),
    "test-010": makePage({
      category: "라이프",
      title: "돈 쓸 때 드러나는 소비 타입",
      summary: "계획형인지 감정형인지, 내 소비 습관의 핵심 버튼을 알아보는 테스트입니다.",
      heroCardSubtitle: "나는 어디에 쓸까?",
      heroArt: { centerEmoji: "💳", stickers: ["👜", "🧾", "☕", "🎁", "💸", "🛍️"] },
      loadingMessage: "답변을 조합해서 당신의 소비 스타일을 정리하고 있습니다.",
      questions: [
        q("월급날이 오면 먼저 하는 일은?", "고정 지출과 예산부터 확인한다.", { planner: 2, saver: 1 }, "갖고 싶던 것부터 장바구니를 다시 본다.", { joy: 2, curator: 1 }),
        q("할인 문자를 받았을 때 나는?", "정말 필요할 때만 반응한다.", { saver: 2, planner: 1 }, "원래 고민하던 거면 지금이다 싶다.", { joy: 2, curator: 1 }),
        q("더 돈이 아깝지 않은 쪽은?", "기억에 남는 경험", { joy: 2 }, "오래 쓰는 물건", { curator: 2, planner: 1 }),
        q("예상치 못한 지출이 생기면?", "다른 항목을 줄여 균형을 맞춘다.", { planner: 2 }, "일단 해결하고 나중에 정리한다.", { joy: 2, saver: 1 }),
        q("선물 고를 때 나는?", "받는 사람이 오래 쓸 걸 생각한다.", { curator: 2 }, "딱 지금 기분 좋아질 걸 고른다.", { joy: 2 }),
        q("내 소비 후회는 주로 언제 오나?", "계획 없이 연달아 결제했을 때", { saver: 2, planner: 1 }, "너무 참다가 결국 한 번에 크게 쓸 때", { joy: 2, curator: 1 }),
        q("쇼핑 만족도가 큰 순간은?", "예산 안에서 깔끔하게 마무리됐을 때", { planner: 2, saver: 1 }, "딱 마음에 드는 걸 찾았을 때", { curator: 2, joy: 1 }),
        q("내 소비를 한마디로 하면?", "흐름을 계산하며 쓰는 편", { planner: 2, saver: 1 }, "필요와 기분 사이에서 의미를 찾는 편", { joy: 2, curator: 1 })
      ],
      results: {
        planner: { title: "예산 설계형", summary: "큰 흐름을 먼저 보는 안정적 소비 타입", description: "당신은 소비에서도 구조를 중시합니다. 예산과 우선순위를 먼저 보고, 무리 없는 선에서 만족도를 만드는 편입니다.", strengths: ["예산 감각", "후회가 적은 소비", "장기 흐름 관리"], tip: "계획이 강점인 만큼, 가끔은 작은 기쁨 예산도 따로 잡아두면 더 균형이 좋아집니다.", moodTitle: "소비 키워드", moodItems: ["예산", "우선순위", "안정감"], matchTitle: "찰떡 보완", matchLabel: "기분 충전형", matchDescription: "당신의 구조에 상대의 작은 즐거움 감각이 더해지면 더 풍성해집니다.", heroEmoji: "📊" },
        joy: { title: "기분 충전형", summary: "지금의 행복감을 위해 쓰는 데 만족이 큰 타입", description: "당신은 소비를 단순 지출보다 기분을 돌보는 방식으로 느낄 때가 많습니다. 잘 쓴 돈이 주는 즉각적인 만족을 중요하게 여깁니다.", strengths: ["행복 체감이 빠름", "경험 소비 만족도 높음", "자기 보상 감각"], tip: "기분을 챙기는 소비는 좋지만, 반복되면 패턴이 되니 한도만 정해두면 더 좋아요.", moodTitle: "소비 키워드", moodItems: ["보상", "즐거움", "즉시 만족"], matchTitle: "찰떡 보완", matchLabel: "예산 설계형", matchDescription: "상대의 안정감이 당신의 즐거움을 더 오래가게 도와줍니다.", heroEmoji: "🎁" },
        curator: { title: "취향 수집형", summary: "무작정 많이보다 제대로 마음에 드는 것을 모으는 타입", description: "당신은 소비에서도 취향의 결을 중요하게 생각합니다. 오래 두고 좋아할 수 있는 것, 내 취향에 맞는 것에 만족이 큽니다.", strengths: ["취향이 분명함", "만족도 높은 선택", "오래 쓰는 물건에 강함"], tip: "좋은 안목은 강점이에요. 다만 너무 완벽한 걸 찾다가 타이밍을 놓치지 않게만 주의해보세요.", moodTitle: "소비 키워드", moodItems: ["취향", "안목", "오래 쓰기"], matchTitle: "찰떡 보완", matchLabel: "절제 저축형", matchDescription: "상대의 절제력이 당신의 취향 소비를 더 안정적으로 받쳐줍니다.", heroEmoji: "🧺" },
        saver: { title: "절제 저축형", summary: "무리 없는 흐름과 안전감을 더 크게 보는 타입", description: "당신은 지금의 기쁨보다 미래의 안정감을 크게 보는 편입니다. 그래서 소비 전 한 번 더 생각하고, 불필요한 지출에 예민할 수 있습니다.", strengths: ["절제력", "안정 지향", "불필요한 소비 차단"], tip: "잘 아끼는 것도 능력이지만, 나를 위한 작은 소비 하나쯤은 죄책감 없이 허용해도 괜찮아요.", moodTitle: "소비 키워드", moodItems: ["안정", "절제", "미래 대비"], matchTitle: "찰떡 보완", matchLabel: "취향 수집형", matchDescription: "상대의 취향 감각이 당신의 절제에 즐거움을 조금 더해줍니다.", heroEmoji: "🐷" }
      },
      resultPreview: ["예산 설계형", "기분 충전형", "취향 수집형", "절제 저축형"],
      relatedIds: ["test-009", "test-015", "test-019"],
      callout: "돈 쓰는 방식은 성격보다도 지금의 리듬을 꽤 잘 보여주는 지표가 되기도 해요."
    }),
    "test-011": makePage({
      category: "관계 테스트",
      title: "팀플에서 맡게 되는 역할",
      summary: "모임이나 협업에서 내가 자연스럽게 맡는 역할을 알아보는 팀플 포지션 테스트입니다.",
      heroCardSubtitle: "나는 어떤 역할?",
      heroArt: { centerEmoji: "🧩", stickers: ["📣", "📎", "🛠️", "🤝", "🗂️", "💡"] },
      loadingMessage: "답변을 조합해서 당신의 팀플 포지션을 정리하고 있습니다.",
      questions: [
        q("팀 과제가 시작되면 나는?", "큰 방향과 역할 분배부터 본다.", { captain: 2, mediator: 1 }, "실제로 해야 할 작업부터 손에 잡는다.", { maker: 2, spark: 1 }),
        q("회의가 길어질 때 더 가까운 역할은?", "정리해서 결론을 내리게 한다.", { captain: 2 }, "무거워진 분위기를 풀어준다.", { spark: 2, mediator: 1 }),
        q("마감이 다가오면 나는?", "누가 어디까지 했는지 체크한다.", { captain: 2, mediator: 1 }, "내 파트를 끝까지 책임지고 밀어붙인다.", { maker: 2 }),
        q("갈등이 생기면 나는?", "오해를 풀고 중간 지점을 찾는다.", { mediator: 2 }, "일단 할 일부터 끝내고 보자고 한다.", { maker: 2, captain: 1 }),
        q("팀플에서 제일 중요하게 보는 건?", "전체 흐름이 안 무너지는 것", { captain: 2 }, "각자 잘할 수 있게 분위기가 유지되는 것", { mediator: 2, spark: 1 }),
        q("내가 칭찬받는 포인트는?", "든든하고 믿음직하다는 말", { captain: 2, maker: 1 }, "같이 하면 덜 힘들고 재밌다는 말", { spark: 2, mediator: 1 }),
        q("처음 만난 팀원과도 나는?", "일단 해야 할 구조를 빨리 맞춘다.", { captain: 2 }, "분위기를 보며 편하게 말 걸어본다.", { mediator: 2, spark: 1 }),
        q("내 포지션을 한마디로 말하면?", "흐름을 잡는 사람", { captain: 2, mediator: 1 }, "분위기와 실행을 살리는 사람", { maker: 2, spark: 1 })
      ],
      results: {
        captain: { title: "흐름 리더형", summary: "전체 방향과 구조를 먼저 잡는 타입", description: "당신은 팀 안에서 큰 흐름을 보고 구조를 세우는 데 강합니다. 누가 무엇을 해야 하는지, 언제까지 가야 하는지를 비교적 빠르게 파악합니다.", strengths: ["전체 구조 파악", "역할 분배", "마감 관리"], tip: "리더십이 강점인 만큼, 팀원마다 일하는 속도 차이를 읽어주면 더 부드럽게 이끌 수 있어요.", moodTitle: "팀플 키워드", moodItems: ["구조", "마감", "방향"], matchTitle: "찰떡 조합", matchLabel: "분위기 점화형", matchDescription: "당신의 구조 위에 상대의 공기 조절 능력이 더해지면 팀플 만족도가 확 올라갑니다.", heroEmoji: "📣" },
        maker: { title: "실행 메이커형", summary: "말보다 손이 먼저 움직이는 타입", description: "당신은 팀플에서 실제 결과물을 만들어내는 힘이 큽니다. 해야 할 일이 보이면 빨리 손에 잡고, 끝까지 책임지고 가는 편입니다.", strengths: ["실행력", "완성도", "현실 감각"], tip: "혼자 다 떠안지 않도록 중간 공유만 자주 해도 훨씬 덜 지칩니다.", moodTitle: "팀플 키워드", moodItems: ["실행", "완성", "책임"], matchTitle: "찰떡 조합", matchLabel: "흐름 리더형", matchDescription: "상대가 방향을 잡아주면 당신의 실행력이 훨씬 더 빛납니다.", heroEmoji: "🛠️" },
        mediator: { title: "조율 브릿지형", summary: "사람 사이를 이어주며 균형을 맞추는 타입", description: "당신은 팀플에서 사람과 사람 사이의 공기를 잘 읽습니다. 말이 안 통할 때 중간점을 찾고, 모두가 너무 불편해지지 않게 조율하는 힘이 있습니다.", strengths: ["관계 조율", "분위기 안정", "오해 완충"], tip: "조율도 중요한 일입니다. 다만 조율만 하다가 내 작업 비중이 흐려지지 않게 한 번은 선을 그어보세요.", moodTitle: "팀플 키워드", moodItems: ["균형", "중재", "공기 조절"], matchTitle: "찰떡 조합", matchLabel: "실행 메이커형", matchDescription: "상대의 손빠름이 당신의 조율을 실제 성과로 이어주기 좋습니다.", heroEmoji: "🤝" },
        spark: { title: "분위기 점화형", summary: "지치지 않게 텐션을 살리는 타입", description: "당신은 팀이 너무 무거워질 때 공기를 바꾸는 힘이 있습니다. 아이디어를 던지고, 웃음을 만들고, 팀원들이 덜 지치게 하는 역할을 자주 맡습니다.", strengths: ["분위기 환기", "아이디어 전환", "에너지 유지"], tip: "좋은 공기를 만드는 건 큰 재능이에요. 여기에 내 파트의 마감 한 줄만 더 선명하면 존재감이 더 커집니다.", moodTitle: "팀플 키워드", moodItems: ["환기", "아이디어", "밝은 텐션"], matchTitle: "찰떡 조합", matchLabel: "흐름 리더형", matchDescription: "상대가 방향을 잡고 당신이 공기를 살리면 팀이 훨씬 안정적으로 굴러갑니다.", heroEmoji: "💡" }
      },
      resultPreview: ["흐름 리더형", "실행 메이커형", "조율 브릿지형", "분위기 점화형"],
      relatedIds: ["test-005", "test-016", "test-020"],
      callout: "같은 팀플에서도 누구는 구조, 누구는 공기, 누구는 실행을 맡아요. 그 차이를 보는 재미가 있어요."
    }),
    "test-012": makePage({
      category: "관계 테스트",
      title: "쉬는 날 인간관계 충전법",
      summary: "쉬는 날 누구와 있어야 가장 회복되는지, 나의 관계 충전 방식을 알아보는 테스트입니다.",
      heroCardSubtitle: "쉬는 날 누구와?",
      heroArt: { centerEmoji: "🌿", stickers: ["🛋️", "☕", "👥", "🌙", "📵", "🎧"] },
      loadingMessage: "답변을 조합해서 당신의 인간관계 충전 방식을 정리하고 있습니다.",
      questions: [
        q("바쁜 한 주가 끝난 주말, 가장 먼저 떠오르는 건?", "조용히 혼자 쉬고 싶다.", { solo: 2, vanish: 1 }, "편한 사람 한두 명은 보고 싶다.", { duo: 2, circle: 1 }),
        q("갑자기 약속이 취소되면 나는?", "오히려 숨통이 트여서 좋을 때가 있다.", { solo: 2, vanish: 1 }, "아쉽지만 다른 친구에게 연락해볼 수도 있다.", { circle: 2, duo: 1 }),
        q("휴식에 더 가까운 건?", "말 수가 적어도 편한 시간", { solo: 2 }, "좋아하는 사람과 도란도란 있는 시간", { duo: 2 }),
        q("사람 많은 자리에 다녀온 뒤 나는?", "생각보다 에너지가 금방 닳는다.", { vanish: 2, solo: 1 }, "즐겁지만 결국 친한 사람과 정리하고 싶어진다.", { duo: 2, circle: 1 }),
        q("쉬는 날 연락이 많이 오면?", "답장 템포를 늦추며 내 호흡을 찾는다.", { solo: 2, vanish: 1 }, "지금 가능한 사람들과 가볍게 이어간다.", { circle: 2 }),
        q("가장 편한 약속은?", "정해진 시간 없이 느슨한 만남", { duo: 2, solo: 1 }, "여럿이 만나도 역할 없는 편한 모임", { circle: 2 }),
        q("사람에게서 힘을 얻는 방식은?", "깊게 연결되는 한두 명의 대화", { duo: 2 }, "그날그날 가볍게 섞이는 활기", { circle: 2 }),
        q("내 충전 버튼에 가까운 건?", "아예 잠수 타듯 쉬기", { vanish: 2, solo: 1 }, "편한 관계와 적당히 이어져 있기", { duo: 2, circle: 1 })
      ],
      results: {
        solo: { title: "혼자 숨고르기형", summary: "혼자 있는 시간이 있어야 진짜 충전되는 타입", description: "당신은 관계를 싫어한다기보다, 쉬는 날만큼은 혼자 내 호흡을 회복해야 에너지가 차는 편입니다. 조용한 시간이 큰 회복 자원입니다.", strengths: ["자기 회복 감각", "혼자서도 안정적으로 쉬는 힘", "과잉 연결을 조절하는 능력"], tip: "혼자 쉬는 시간은 꼭 필요하지만, 미리 한두 사람에겐 충전 모드라고 알려두면 관계 피로가 줄어요.", moodTitle: "충전 키워드", moodItems: ["조용한 시간", "혼자 루틴", "느린 호흡"], matchTitle: "찰떡 케미", matchLabel: "도란도란 1대1형", matchDescription: "혼자 충전한 뒤엔 깊이 있는 한 사람과의 연결이 가장 편안하게 느껴질 수 있어요.", heroEmoji: "🌙" },
        duo: { title: "도란도란 1대1형", summary: "많은 사람보다 편한 한 사람과 있을 때 충전되는 타입", description: "당신은 사람 자체보다 관계의 깊이를 더 중요하게 느낍니다. 북적임보다 편한 사람과의 잔잔한 대화에서 에너지가 차오릅니다.", strengths: ["깊은 연결에서 회복", "편안한 관계 유지", "과하지 않은 사회성"], tip: "당신의 충전 방식은 분명해요. 너무 많은 약속보다 정말 편한 관계를 남기는 선택이 맞습니다.", moodTitle: "충전 키워드", moodItems: ["1대1 대화", "편한 사람", "깊은 연결"], matchTitle: "찰떡 케미", matchLabel: "가벼운 모임형", matchDescription: "상대가 가벼운 활기를 주고, 당신은 관계를 더 깊게 만들어주는 조합이 됩니다.", heroEmoji: "☕" },
        circle: { title: "가벼운 모임형", summary: "여럿과 섞이는 활기 속에서 에너지가 살아나는 타입", description: "당신은 너무 무거운 관계보다 가볍고 즐거운 연결에서 힘을 얻는 편입니다. 분위기가 좋은 모임, 가벼운 만남, 적당한 섞임이 잘 맞습니다.", strengths: ["사람 속에서 에너지 회복", "가벼운 연결을 편하게 유지", "분위기 적응력"], tip: "즐거운 모임도 과하면 피곤할 수 있으니, 돌아와서 비우는 시간까지 세트로 잡아두면 좋아요.", moodTitle: "충전 키워드", moodItems: ["가벼운 만남", "활기", "즉흥 약속"], matchTitle: "찰떡 케미", matchLabel: "혼자 숨고르기형", matchDescription: "상대의 차분함이 당신에게 좋은 리셋 타이밍을 알려줄 수 있습니다.", heroEmoji: "🎉" },
        vanish: { title: "잠수 회복형", summary: "완전히 연결을 끊어야 비로소 회복되는 타입", description: "당신은 피로가 쌓이면 관계 자체를 잠깐 끊고 싶어지는 편입니다. 연락, 약속, 반응에서 잠시 멀어지는 시간이 큰 회복 장치가 됩니다.", strengths: ["내 피로 신호를 빨리 느낌", "단절을 통해 회복하는 감각", "과한 연결에서 벗어나는 용기"], tip: "잠수는 회복 방법일 수 있지만, 너무 갑작스러우면 오해가 생길 수 있어요. 한 줄 공지가 큰 도움이 됩니다.", moodTitle: "충전 키워드", moodItems: ["잠수 모드", "무알림", "완전 오프"], matchTitle: "찰떡 케미", matchLabel: "혼자 숨고르기형", matchDescription: "비슷한 회복 감각을 가진 사람과는 서로의 거리감도 편안하게 받아들일 수 있습니다.", heroEmoji: "📵" }
      },
      resultPreview: ["혼자 숨고르기형", "도란도란 1대1형", "가벼운 모임형", "잠수 회복형"],
      relatedIds: ["test-020", "test-019", "test-006"],
      callout: "쉬는 날 누구를 보고 싶어지는지가 요즘 에너지 상태를 생각보다 잘 보여주더라고요."
    }),
    "test-013": makePage({
      category: "연애 테스트",
      title: "나의 플러팅 방식 찾기",
      summary: "호감이 생겼을 때 내가 어떤 방식으로 티를 내는지 알아보는 플러팅 테스트입니다.",
      heroCardSubtitle: "나는 어떻게 티 낼까?",
      heroArt: { centerEmoji: "😏", stickers: ["💘", "😉", "🎵", "💌", "✨", "🌹"] },
      loadingMessage: "답변을 조합해서 당신의 플러팅 방식을 정리하고 있습니다.",
      questions: [
        q("호감 가는 사람이 생기면 먼저 드는 생각은?", "이왕이면 확실히 다가가고 싶다.", { direct: 2, play: 1 }, "일단 상대가 편한지부터 살핀다.", { care: 2, subtle: 1 }),
        q("상대의 변화가 보이면 나는?", "바로 말 걸며 반응을 던져본다.", { direct: 2 }, "작은 칭찬이나 배려로 티를 낸다.", { care: 2, subtle: 1 }),
        q("내가 자주 쓰는 방식은?", "장난스럽게 분위기를 띄우며 다가간다.", { play: 2 }, "조용히 챙기고 필요한 걸 기억한다.", { care: 2 }),
        q("플러팅의 핵심은 내게?", "상대가 내 호감을 눈치채는 것", { direct: 2 }, "부담 없이 자연스럽게 스며드는 것", { subtle: 2, care: 1 }),
        q("대화할 때 더 가까운 쪽은?", "분명한 호감 표현을 은근히 섞는다.", { direct: 2, play: 1 }, "상대 말에 집중하며 편안함을 만든다.", { care: 2 }),
        q("썸에서 내가 강한 순간은?", "분위기를 전환하며 확실히 끌어당길 때", { play: 2, direct: 1 }, "관심을 행동으로 오래 보여줄 때", { subtle: 2, care: 1 }),
        q("상대가 먼저 다가오면 나는?", "좋아, 이제 텐션을 올려본다.", { direct: 2, play: 1 }, "그제야 조금 더 선명하게 표현한다.", { subtle: 2, care: 1 }),
        q("내 플러팅을 한마디로 하면?", "분위기와 속도를 만드는 편", { direct: 2, play: 1 }, "편안함 속에서 천천히 보이는 편", { care: 2, subtle: 1 })
      ],
      results: {
        direct: { title: "직진 시그널형", summary: "호감이 생기면 비교적 선명하게 드러나는 타입", description: "당신은 좋아하는 마음을 마냥 숨기기보다, 어느 정도는 보여줘야 흐름이 생긴다고 느끼는 편입니다. 분명하고 빠른 신호에 강점이 있습니다.", strengths: ["분명한 시그널", "관계 전개 속도", "호감 표현의 솔직함"], tip: "당신의 확실함은 매력이지만, 상대가 숨 고를 공간도 함께 주면 더 편안한 썸이 됩니다.", moodTitle: "플러팅 키워드", moodItems: ["선명함", "추진력", "시그널"], matchTitle: "찰떡 케미", matchLabel: "다정 배려형", matchDescription: "상대의 부드러움이 당신의 빠른 속도를 편안하게 받아주기 좋습니다.", heroEmoji: "💘" },
        play: { title: "장난 유도형", summary: "재미와 텐션 속에서 설렘을 만드는 타입", description: "당신은 썸에서도 웃음과 농담, 장난 속에 호감을 섞는 편입니다. 너무 무겁지 않게 자연스럽게 끌어당기는 데 강합니다.", strengths: ["센스 있는 플러팅", "어색함 해소", "가벼운 설렘 만들기"], tip: "장난이 매력이지만, 중요한 순간에는 진심 한 줄을 더하면 인상이 훨씬 또렷해집니다.", moodTitle: "플러팅 키워드", moodItems: ["장난", "센스", "가벼운 텐션"], matchTitle: "찰떡 케미", matchLabel: "은근 스며듦형", matchDescription: "상대의 차분함이 당신의 장난기를 더 매력적으로 느끼게 합니다.", heroEmoji: "😉" },
        care: { title: "다정 배려형", summary: "챙김과 공감으로 호감을 보여주는 타입", description: "당신은 말보다 행동과 분위기로 마음을 전하는 편입니다. 상대의 상태를 보고 챙기고, 편안함을 통해 호감을 느끼게 합니다.", strengths: ["배려와 공감", "편안한 공기", "오래 가는 호감"], tip: "챙김이 큰 강점이라도, 상대는 그게 호감인지 모를 수 있어요. 아주 작은 신호 하나는 더해보세요.", moodTitle: "플러팅 키워드", moodItems: ["챙김", "공감", "편안함"], matchTitle: "찰떡 케미", matchLabel: "직진 시그널형", matchDescription: "상대의 분명함과 당신의 배려가 만나면 설렘과 안정감이 함께 갑니다.", heroEmoji: "🌼" },
        subtle: { title: "은근 스며듦형", summary: "천천히 결을 보여주며 스며드는 타입", description: "당신은 썸에서 급하게 분위기를 띄우기보다, 편안함과 반복 속에서 호감이 쌓이게 하는 편입니다. 드러나지 않아도 여운이 남습니다.", strengths: ["잔잔한 여운", "부담 없는 접근", "천천히 깊어지는 매력"], tip: "천천히는 좋지만 너무 은근하면 놓칠 수도 있어요. 결정적인 순간엔 표현을 한 단계만 올려보세요.", moodTitle: "플러팅 키워드", moodItems: ["스며듦", "여운", "잔잔함"], matchTitle: "찰떡 케미", matchLabel: "장난 유도형", matchDescription: "상대의 가벼운 텐션이 당신의 은근한 매력을 더 잘 꺼내줍니다.", heroEmoji: "🌙" }
      },
      resultPreview: ["직진 시그널형", "장난 유도형", "다정 배려형", "은근 스며듦형"],
      relatedIds: ["test-007", "test-001", "test-008"],
      callout: "호감 표현은 의외로 말투보다 방식에서 차이가 더 잘 보일 때가 많아요."
    }),
    "test-014": makePage({
      category: "취향 테스트",
      title: "사진첩 무드로 보는 감성 타입",
      summary: "내 사진첩에 자주 남는 장면을 통해 감성 기록 스타일을 보는 테스트입니다.",
      heroCardSubtitle: "내가 남기는 장면",
      heroArt: { centerEmoji: "📸", stickers: ["🌤️", "🎞️", "🌊", "☕", "🍃", "📔"] },
      loadingMessage: "답변을 조합해서 당신의 감성 기록 타입을 정리하고 있습니다.",
      questions: [
        q("사진을 찍을 때 더 자주 멈추는 건?", "풍경과 빛이 예쁜 순간", { aesthetic: 2, archive: 1 }, "사람들의 표정과 분위기", { candid: 2, story: 1 }),
        q("앨범을 다시 볼 때 좋은 건?", "색감과 구도가 예뻐서 만족되는 사진", { aesthetic: 2 }, "그날의 공기가 떠오르는 사진", { story: 2, candid: 1 }),
        q("여행지에서 사진을 찍는 방식은?", "장면이 가장 예쁘게 보이게 잡는다.", { aesthetic: 2, archive: 1 }, "순간을 놓치지 않게 바로 찍는다.", { candid: 2 }),
        q("지우지 못하는 사진은?", "흐려도 추억이 강한 사진", { story: 2, candid: 1 }, "구도는 완벽하지 않아도 취향인 사진", { archive: 2, aesthetic: 1 }),
        q("사진첩을 꾸민다면?", "분위기 맞는 컷끼리 모아둔다.", { archive: 2, aesthetic: 1 }, "순서대로 넘기며 흐름을 남긴다.", { story: 2 }),
        q("나를 가장 설레게 하는 건?", "한 컷만 봐도 감성이 살아나는 장면", { aesthetic: 2 }, "사람들의 순간이 자연스럽게 남은 장면", { candid: 2, story: 1 }),
        q("사진을 찍는 이유에 더 가까운 건?", "예쁜 걸 오래 간직하고 싶어서", { archive: 2, aesthetic: 1 }, "그 순간의 감정을 놓치고 싶지 않아서", { story: 2, candid: 1 }),
        q("내 사진첩 무드를 한마디로 하면?", "취향을 모아둔 보드", { archive: 2, aesthetic: 1 }, "하루의 장면을 꿰맨 기록", { story: 2, candid: 1 })
      ],
      results: {
        archive: { title: "무드 아카이버형", summary: "좋아하는 장면을 취향대로 모아두는 타입", description: "당신은 사진첩을 단순 저장소보다 무드 보드처럼 쓰는 편입니다. 마음에 드는 장면, 색감, 공간의 결을 잘 모아둡니다.", strengths: ["취향 선별 능력", "일관된 무드 감각", "기록 정리 습관"], tip: "이미 좋은 취향 창고를 갖고 있어요. 가끔은 설명 없는 우연한 컷도 남겨보면 더 입체적인 기록이 됩니다.", moodTitle: "기록 키워드", moodItems: ["무드", "취향", "정리"], matchTitle: "찰떡 무드", matchLabel: "이야기 편집형", matchDescription: "상대의 서사 감각이 당신의 무드 컬렉션에 더 풍부한 맥락을 더해줍니다.", heroEmoji: "🗂️" },
        aesthetic: { title: "빛과 구도형", summary: "예쁜 장면을 가장 예쁘게 남기고 싶은 타입", description: "당신은 사진에서 감각적인 완성도를 중요하게 느낍니다. 색감, 구도, 빛을 보는 눈이 좋아서 한 컷의 만족감이 큽니다.", strengths: ["미적 감각", "장면 포착 능력", "한 컷 완성도"], tip: "잘 찍는 것도 좋지만, 가끔은 덜 예뻐도 진한 순간을 남겨보면 더 오래 기억에 남을 수 있어요.", moodTitle: "기록 키워드", moodItems: ["빛", "색감", "구도"], matchTitle: "찰떡 무드", matchLabel: "순간 포착형", matchDescription: "상대의 자연스러운 순간 포착이 당신의 미적 기록에 생동감을 더합니다.", heroEmoji: "🌤️" },
        candid: { title: "순간 포착형", summary: "계획되지 않은 표정과 장면을 사랑하는 타입", description: "당신은 꾸민 사진보다 흐트러진 순간, 자연스러운 표정, 예상 밖 장면에 더 끌립니다. 사진 속 생동감이 큰 매력입니다.", strengths: ["자연스러운 순간 포착", "사람의 표정 감지", "생동감 있는 기록"], tip: "당신의 사진은 공기가 살아있어요. 여기에 두세 장만 정리해두면 앨범 만족도가 더 커집니다.", moodTitle: "기록 키워드", moodItems: ["표정", "순간", "자연스러움"], matchTitle: "찰떡 무드", matchLabel: "빛과 구도형", matchDescription: "상대의 미적 감각이 당신의 생동감 있는 컷을 더 빛나게 정리해줄 수 있습니다.", heroEmoji: "📷" },
        story: { title: "이야기 편집형", summary: "사진 한 장보다 흐름 전체를 남기고 싶은 타입", description: "당신은 사진을 볼 때도 그날의 순서와 감정선이 중요합니다. 한 컷보다 장면의 연결을 통해 더 큰 의미를 느끼는 편입니다.", strengths: ["맥락 기억력", "감정선 기록", "흐름 보는 감각"], tip: "이미 좋은 서사 감각이 있으니, 마음에 드는 대표 컷 하나를 같이 고르면 기억이 더 선명해집니다.", moodTitle: "기록 키워드", moodItems: ["서사", "흐름", "기억"], matchTitle: "찰떡 무드", matchLabel: "무드 아카이버형", matchDescription: "상대의 정리 감각과 당신의 서사 감각이 만나면 아주 좋은 앨범이 됩니다.", heroEmoji: "📔" }
      },
      resultPreview: ["무드 아카이버형", "빛과 구도형", "순간 포착형", "이야기 편집형"],
      relatedIds: ["test-015", "test-018", "test-003"],
      callout: "사진첩은 단순 취미보다, 내가 무엇을 오래 붙잡는 사람인지 보여주는 기록 같아요."
    }),
    "test-015": makePage({
      category: "취향 테스트",
      title: "내 방이 말해주는 취향 무드",
      summary: "내가 편안함을 느끼는 공간 취향과 방의 분위기를 알아보는 테스트입니다.",
      heroCardSubtitle: "내 공간 취향은?",
      heroArt: { centerEmoji: "🛋️", stickers: ["🪴", "🕯️", "🧸", "📚", "🖼️", "☁️"] },
      loadingMessage: "답변을 조합해서 당신의 공간 취향 무드를 정리하고 있습니다.",
      questions: [
        q("방에 들어왔을 때 제일 먼저 보이는 건?", "조명이랑 색감 같은 전체 분위기", { cozy: 2, color: 1 }, "정리된 구조와 비어 있는 면", { minimal: 2, collector: 1 }),
        q("침대 주변에 더 잘 어울리는 건?", "포근한 쿠션과 담요", { cozy: 2 }, "딱 필요한 것만 놓인 깔끔함", { minimal: 2 }),
        q("내 방의 만족도를 올리는 건?", "좋아하는 소품이 조금씩 보이는 것", { collector: 2, color: 1 }, "눈에 거슬리는 것이 없는 정돈감", { minimal: 2 }),
        q("벽을 꾸민다면?", "사진, 포스터, 메모로 나답게 채우고 싶다.", { collector: 2 }, "한두 포인트만 두고 여백을 살리고 싶다.", { minimal: 2, cozy: 1 }),
        q("가장 편안한 공간은?", "따뜻한 조명과 폭신한 텍스처가 있는 공간", { cozy: 2 }, "선이 단정하고 시야가 정리된 공간", { minimal: 2 }),
        q("소품을 고를 때 나는?", "내 취향이 드러나는 디테일을 본다.", { collector: 2, color: 1 }, "전체 공간을 해치지 않는지를 본다.", { minimal: 2, cozy: 1 }),
        q("방의 기분 전환은 보통 어떻게 하나?", "커버, 향, 조명처럼 감각적인 걸 바꾼다.", { cozy: 2, color: 1 }, "정리부터 하며 구조를 다시 맞춘다.", { minimal: 2 }),
        q("내 공간을 한마디로 하면?", "나를 편하게 감싸는 아지트", { cozy: 2, collector: 1 }, "불필요한 걸 덜어낸 안심 구역", { minimal: 2, color: 1 })
      ],
      results: {
        cozy: { title: "포근 아지트형", summary: "따뜻하고 감싸는 분위기에서 편안함을 느끼는 타입", description: "당신은 공간에서 기능보다 체감 온도를 더 크게 느낍니다. 폭신함, 따뜻한 빛, 안정적인 촉감 같은 요소가 마음을 풀어줍니다.", strengths: ["편안한 분위기 감각", "휴식에 강한 공간 취향", "자기 돌봄 감도"], tip: "이미 좋은 안식처 감각이 있어요. 여기에 작은 정리 루틴만 더하면 만족도가 더 커집니다.", moodTitle: "공간 키워드", moodItems: ["따뜻한 조명", "폭신함", "안정감"], matchTitle: "찰떡 무드", matchLabel: "여백 미니멀형", matchDescription: "상대의 정돈감이 당신의 포근함을 더 세련되게 살려줍니다.", heroEmoji: "🧸" },
        minimal: { title: "여백 미니멀형", summary: "비워낼수록 마음이 정리되는 타입", description: "당신은 공간에서 여백과 구조가 주는 안정을 크게 느낍니다. 시야가 단정해야 마음도 정돈되고, 덜어낼수록 더 편안해지는 편입니다.", strengths: ["정리 감각", "질서에서 오는 안정감", "필요한 것만 남기는 선택력"], tip: "정돈이 강점인 만큼, 한 포인트 정도는 취향을 드러내는 장치로 남겨두면 더 입체적인 공간이 됩니다.", moodTitle: "공간 키워드", moodItems: ["여백", "정돈", "구조"], matchTitle: "찰떡 무드", matchLabel: "포근 아지트형", matchDescription: "상대의 따뜻한 감각이 당신 공간에 적당한 온기를 더해줄 수 있어요.", heroEmoji: "📐" },
        collector: { title: "취향 수집형", summary: "좋아하는 물건과 기억으로 공간을 채우는 타입", description: "당신은 방을 단순 거주 공간보다 나를 설명하는 취향의 보드처럼 느낍니다. 물건 하나에도 애정과 기억이 깃들어 있는 편입니다.", strengths: ["취향 표현력", "디테일 애정", "기억이 있는 공간 구성"], tip: "채우는 재능이 큰 만큼, 진짜 좋아하는 것만 남기는 선별 기준이 있으면 더 빛나요.", moodTitle: "공간 키워드", moodItems: ["취향", "소품", "기억"], matchTitle: "찰떡 무드", matchLabel: "색감 포인트형", matchDescription: "상대의 색감 감각이 당신의 취향 컬렉션을 더 돋보이게 해줄 수 있습니다.", heroEmoji: "🖼️" },
        color: { title: "색감 포인트형", summary: "작은 색과 포인트로 공간의 기분을 바꾸는 타입", description: "당신은 공간의 감정을 색과 포인트에서 읽는 편입니다. 전체를 크게 바꾸지 않아도 한두 포인트로 분위기를 전환하는 감각이 좋습니다.", strengths: ["색감 감각", "분위기 전환 능력", "작은 포인트 활용"], tip: "이미 감도는 충분해요. 포인트를 더 살리고 싶다면 기본 베이스 톤을 하나 정해두는 것도 도움이 됩니다.", moodTitle: "공간 키워드", moodItems: ["색 포인트", "분위기 전환", "감도"], matchTitle: "찰떡 무드", matchLabel: "취향 수집형", matchDescription: "상대의 디테일 취향과 당신의 색감 포인트가 만나면 공간이 더 풍성해집니다.", heroEmoji: "🎨" }
      },
      resultPreview: ["포근 아지트형", "여백 미니멀형", "취향 수집형", "색감 포인트형"],
      relatedIds: ["test-014", "test-010", "test-018"],
      callout: "공간 취향은 성격보다도 ‘어떻게 쉬고 싶은지’를 더 잘 말해줄 때가 있어요."
    }),
    "test-016": makePage({
      category: "라이프",
      title: "약속 잡을 때 드러나는 일정 성향",
      summary: "일정을 세세히 맞추는지, 유연하게 흐름을 타는지 보는 약속 스타일 테스트입니다.",
      heroCardSubtitle: "나는 어떻게 잡을까?",
      heroArt: { centerEmoji: "📅", stickers: ["🗓️", "📍", "⏰", "📞", "🫧", "📝"] },
      loadingMessage: "답변을 조합해서 당신의 일정 성향을 정리하고 있습니다.",
      questions: [
        q("약속을 잡을 때 먼저 확인하는 건?", "시간과 장소를 정확히 맞춘다.", { anchor: 2, curator: 1 }, "대략 방향만 잡고 디테일은 나중에 본다.", { flex: 2, pulse: 1 }),
        q("친구가 '아무 때나 좋아'라고 하면 나는?", "그럴수록 후보 시간을 정확히 제안한다.", { anchor: 2 }, "그날 가까워지면 다시 얘기해도 괜찮다.", { pulse: 2 }),
        q("약속 장소 선택은?", "이동 동선과 편의성을 먼저 본다.", { anchor: 2, curator: 1 }, "그날 끌리는 분위기가 더 중요하다.", { flex: 2, pulse: 1 }),
        q("시간이 조금 바뀌면 나는?", "왜 바뀌는지 알아야 마음이 놓인다.", { anchor: 2 }, "괜찮아, 그럴 수 있지 하고 맞춘다.", { flex: 2 }),
        q("모임 일정 정리에서 더 가까운 건?", "대화가 길어지기 전에 결론을 내고 싶다.", { curator: 2, anchor: 1 }, "사람들이 되는 흐름을 보며 자연스럽게 정해진다.", { pulse: 2, flex: 1 }),
        q("당일 약속이 가장 편한 경우는?", "거의 없다. 미리 알아야 좋다.", { anchor: 2, curator: 1 }, "컨디션 좋으면 오히려 더 가볍고 좋다.", { pulse: 2 }),
        q("나와 약속 잡기 쉬운 사람은?", "정확하게 답을 주는 사람", { curator: 2, anchor: 1 }, "조금 바뀌어도 서로 가볍게 맞출 수 있는 사람", { flex: 2 }),
        q("내 일정 스타일을 한마디로 하면?", "안정적으로 맞춰야 마음이 편하다.", { anchor: 2, curator: 1 }, "유연하게 흘러가도 충분히 괜찮다.", { flex: 2, pulse: 1 })
      ],
      results: {
        anchor: { title: "정시 앵커형", summary: "시간과 동선이 맞아야 마음이 편한 타입", description: "당신은 약속에서 구조와 예측 가능성을 중요하게 생각합니다. 누가 늦고 어디서 헤매는지보다, 깔끔하게 맞춰지는 흐름이 중요합니다.", strengths: ["정확한 일정 감각", "예측 가능한 진행", "동선 안정성"], tip: "당신의 정리 능력은 강점이에요. 다만 모든 약속을 같은 온도로 관리하면 피곤할 수 있으니, 가벼운 약속은 힘을 조금 빼도 괜찮아요.", moodTitle: "일정 키워드", moodItems: ["정확함", "동선", "안정감"], matchTitle: "찰떡 조합", matchLabel: "유연 적응형", matchDescription: "상대의 유연함이 당신의 빡빡함을 부드럽게 풀어줄 수 있어요.", heroEmoji: "⏰" },
        flex: { title: "유연 적응형", summary: "상황이 바뀌어도 크게 흔들리지 않는 타입", description: "당신은 약속의 목적이 중요하지 디테일은 조금 달라져도 괜찮은 편입니다. 그래서 다른 사람과 맞추는 데 스트레스가 적고, 유연하게 움직입니다.", strengths: ["적응력", "스트레스 적은 일정 감각", "변수 대응"], tip: "유연함이 장점이지만, 너무 열어두면 중요한 약속도 흐려질 수 있어요. 기준 한 줄은 잡아두세요.", moodTitle: "일정 키워드", moodItems: ["유연함", "적응", "부담 없음"], matchTitle: "찰떡 조합", matchLabel: "정시 앵커형", matchDescription: "상대의 구조감이 당신의 유연함을 더 편하게 받쳐줍니다.", heroEmoji: "🫧" },
        pulse: { title: "당일 펄스형", summary: "그날의 흐름과 컨디션에 크게 반응하는 타입", description: "당신은 약속을 너무 일찍 확정해두는 것보다, 그날의 기분과 상황을 보며 움직이는 게 더 편할 수 있습니다. 즉흥성에서 활기가 생깁니다.", strengths: ["즉흥 대응력", "가벼운 만남에 강함", "컨디션 중심 선택"], tip: "당일 감각이 좋은 만큼, 중요한 약속 하나만큼은 미리 선명하게 잡아두면 관계 피로가 줄어요.", moodTitle: "일정 키워드", moodItems: ["컨디션", "즉흥", "그날의 흐름"], matchTitle: "찰떡 조합", matchLabel: "정리 큐레이터형", matchDescription: "상대의 정리력이 당신의 즉흥성을 편하게 수용해줄 수 있습니다.", heroEmoji: "⚡" },
        curator: { title: "정리 큐레이터형", summary: "약속 전체의 경험을 세팅하는 데 강한 타입", description: "당신은 단순히 시간만 맞추는 것이 아니라, 어디서 만나서 어떻게 흘러갈지까지 자연스럽게 정리하는 힘이 있습니다.", strengths: ["전체 경험 설계", "세심한 정리", "모임 만족도 향상"], tip: "다 챙기지 않아도 충분히 좋은 약속이 될 수 있어요. 꼭 필요한 포인트만 남기는 것도 좋은 기술입니다.", moodTitle: "일정 키워드", moodItems: ["세팅", "정리", "만족도"], matchTitle: "찰떡 조합", matchLabel: "당일 펄스형", matchDescription: "상대의 즉흥성이 당신의 정리된 흐름에 예상 밖의 재미를 더해줄 수 있습니다.", heroEmoji: "📍" }
      },
      resultPreview: ["정시 앵커형", "유연 적응형", "당일 펄스형", "정리 큐레이터형"],
      relatedIds: ["test-009", "test-011", "test-003"],
      callout: "약속을 잡는 방식은 의외로 관계 템포와 피로도를 그대로 보여주는 습관이기도 해요."
    }),
    "test-017": makePage({
      category: "성격 테스트",
      title: "칭찬 들었을 때 반응 타입",
      summary: "칭찬을 받았을 때 내가 어떻게 반응하는지 보는 리액션 테스트입니다.",
      heroCardSubtitle: "나는 어떻게 받을까?",
      heroArt: { centerEmoji: "🫶", stickers: ["🌷", "😳", "🔥", "🎉", "🫣", "✨"] },
      loadingMessage: "답변을 조합해서 당신의 칭찬 반응 타입을 정리하고 있습니다.",
      questions: [
        q("갑자기 칭찬을 들으면 먼저 드는 감정은?", "고맙지만 어쩐지 민망하다.", { shy: 2, cool: 1 }, "오, 힘이 좀 나는데? 싶다.", { fuel: 2, joke: 1 }),
        q("칭찬에 대한 첫 반응은?", "아니에요 하며 한 번 줄인다.", { shy: 2 }, "고맙다고 받고 더 열심히 하게 된다.", { fuel: 2 }),
        q("친한 친구가 크게 치켜세우면?", "장난처럼 흘리며 민망함을 덜어낸다.", { joke: 2, shy: 1 }, "겉으론 덤덤해도 속으론 오래 남는다.", { cool: 2, fuel: 1 }),
        q("칭찬을 들었을 때 더 가까운 쪽은?", "정말 그렇게 보였나 한 번 의심해본다.", { cool: 2 }, "기분 좋고 동기부여가 된다.", { fuel: 2 }),
        q("온라인에서 칭찬 댓글이 달리면?", "좋지만 답은 짧고 조심스럽게 단다.", { shy: 2, cool: 1 }, "반가워서 하트나 이모지를 아끼지 않는다.", { fuel: 2, joke: 1 }),
        q("내가 편한 칭찬 방식은?", "조용히 툭 건네는 진심 어린 말", { cool: 2, shy: 1 }, "분위기 좋게 크게 해주는 말", { fuel: 2, joke: 1 }),
        q("칭찬 후 내 행동은?", "괜히 더 잘해야 할 것 같아진다.", { fuel: 2, cool: 1 }, "민망해서 다른 얘기로 빨리 넘긴다.", { joke: 2, shy: 1 }),
        q("내 칭찬 리액션을 한마디로 하면?", "쑥스럽지만 오래 남는 편", { shy: 2, cool: 1 }, "좋은 에너지를 받는 편", { fuel: 2, joke: 1 })
      ],
      results: {
        shy: { title: "수줍 수납형", summary: "좋지만 티 내기엔 조금 쑥스러운 타입", description: "당신은 칭찬이 싫은 건 아니지만, 막상 받으면 민망함이 먼저 오는 편입니다. 겉으론 작게 반응해도 속으로는 오래 품고 있는 경우가 많습니다.", strengths: ["겸손함", "진심을 오래 기억함", "가벼운 과장에 흔들리지 않음"], tip: "좋은 말은 받는 것도 관계의 일부예요. '고마워' 한마디만 더 편하게 꺼내봐도 충분합니다.", moodTitle: "리액션 키워드", moodItems: ["쑥스러움", "조용한 기쁨", "속마음 저장"], matchTitle: "찰떡 포인트", matchLabel: "에너지 충전형", matchDescription: "상대의 밝은 리액션이 당신도 더 편하게 반응하도록 도와줄 수 있어요.", heroEmoji: "🫣" },
        fuel: { title: "에너지 충전형", summary: "칭찬을 들으면 동력이 살아나는 타입", description: "당신은 진심 어린 칭찬을 꽤 큰 에너지로 받아들이는 편입니다. 인정받았다는 감각이 바로 힘으로 연결되기 쉽습니다.", strengths: ["동기부여 전환", "긍정 에너지 흡수", "반응이 선명함"], tip: "좋은 에너지를 잘 받는 건 강점이에요. 다만 외부 인정에만 기대지 않도록 내 기준도 함께 챙겨보세요.", moodTitle: "리액션 키워드", moodItems: ["동기부여", "밝은 반응", "긍정 에너지"], matchTitle: "찰떡 포인트", matchLabel: "덤덤 흡수형", matchDescription: "상대의 차분함이 당신의 에너지를 더 안정감 있게 받쳐줄 수 있습니다.", heroEmoji: "🔥" },
        cool: { title: "덤덤 흡수형", summary: "겉으론 담담하지만 속으로는 곱씹는 타입", description: "당신은 칭찬을 들었을 때 큰 리액션보다는 담담하게 반응하는 편입니다. 하지만 그 말이 진심이었는지, 왜 그렇게 느꼈는지는 속으로 오래 생각합니다.", strengths: ["표정은 안정적이지만 내면은 깊음", "의미 있는 말에 강하게 반응", "가벼운 과장보다 진심을 구분함"], tip: "덤덤함이 멋이지만, 고마운 마음을 조금 더 보여주면 관계도 더 따뜻해질 수 있어요.", moodTitle: "리액션 키워드", moodItems: ["담담함", "내면 반응", "진심 구분"], matchTitle: "찰떡 포인트", matchLabel: "장난 회피형", matchDescription: "상대의 가벼운 농담이 당신의 담담함을 덜 부담스럽게 풀어줄 수 있습니다.", heroEmoji: "🧊" },
        joke: { title: "장난 회피형", summary: "민망함을 유머로 자연스럽게 넘기는 타입", description: "당신은 칭찬을 정면으로 받기보다 웃음과 장난으로 공기를 부드럽게 바꾸는 편입니다. 민망함을 다루는 센스가 있습니다.", strengths: ["공기 완충 능력", "센스 있는 리액션", "민망함을 잘 다룸"], tip: "장난은 좋은 기술이지만, 진짜 고마운 순간엔 짧게라도 진심을 남기면 더 오래 기억됩니다.", moodTitle: "리액션 키워드", moodItems: ["유머", "완충", "민망함 회피"], matchTitle: "찰떡 포인트", matchLabel: "수줍 수납형", matchDescription: "상대의 조용한 반응과 당신의 가벼운 유머가 은근히 좋은 균형을 만듭니다.", heroEmoji: "😆" }
      },
      resultPreview: ["수줍 수납형", "에너지 충전형", "덤덤 흡수형", "장난 회피형"],
      relatedIds: ["test-008", "test-005", "test-020"],
      callout: "칭찬에 대한 반응만 봐도 내가 관계에서 어떤 온도로 움직이는지 꽤 잘 보일 때가 있어요."
    }),
    "test-018": makePage({
      category: "감성 테스트",
      title: "계절이 바뀌면 깨어나는 감성은?",
      summary: "계절이 바뀔 때 가장 크게 살아나는 나의 무드와 감성을 알아보는 테스트입니다.",
      heroCardSubtitle: "나는 어떤 계절 무드?",
      heroArt: { centerEmoji: "🍃", stickers: ["🌸", "☀️", "🍂", "❄️", "🌙", "☁️"] },
      loadingMessage: "답변을 조합해서 당신의 계절 감성 타입을 정리하고 있습니다.",
      questions: [
        q("날씨가 바뀌는 걸 느끼면 먼저 떠오르는 건?", "새로운 시작의 기분", { bloom: 2 }, "옷, 향, 음악 같은 분위기 변화", { hush: 2, frost: 1 }),
        q("가장 좋아하는 공기는?", "햇살이 선명하고 움직이기 좋은 공기", { blaze: 2, bloom: 1 }, "조용히 생각이 많아지는 서늘한 공기", { hush: 2, frost: 1 }),
        q("계절이 바뀌면 내 플레이리스트는?", "좀 더 가볍고 밝아진다.", { bloom: 2, blaze: 1 }, "더 차분하고 깊어진다.", { hush: 2, frost: 1 }),
        q("기분 전환 방식은?", "밖으로 나가 몸을 움직이며 바꾸기", { blaze: 2 }, "혼자 정리하거나 기록하며 바꾸기", { frost: 2, hush: 1 }),
        q("옷을 고를 때 끌리는 건?", "경쾌한 색과 가벼운 실루엣", { bloom: 2, blaze: 1 }, "톤 다운된 색과 포근한 질감", { hush: 2, frost: 1 }),
        q("지금의 계절을 느끼는 포인트는?", "거리의 활기와 에너지", { blaze: 2, bloom: 1 }, "빛, 바람, 냄새 같은 미묘한 변화", { hush: 2, frost: 1 }),
        q("내 감성이 가장 살아나는 시간은?", "새 계획을 세우는 낮", { bloom: 2 }, "생각이 깊어지는 밤", { frost: 2, hush: 1 }),
        q("계절의 변화가 내게 주는 건?", "다시 움직일 이유", { blaze: 2, bloom: 1 }, "내 마음을 돌아볼 틈", { hush: 2, frost: 1 })
      ],
      results: {
        bloom: { title: "봄빛 시작형", summary: "새로운 공기와 시작의 감성에 크게 반응하는 타입", description: "당신은 계절이 바뀔 때 특히 새로움과 설렘을 크게 느낍니다. 무드가 밝아지고, 다시 뭔가를 시작하고 싶어지는 힘이 커집니다.", strengths: ["시작 에너지", "밝은 감도", "새로움에 대한 열린 태도"], tip: "설렘이 큰 만큼 금방 흩어질 수도 있어요. 지금 좋은 무드를 붙잡을 작은 루틴 하나를 정해보세요.", moodTitle: "계절 키워드", moodItems: ["설렘", "새 시작", "밝은 공기"], matchTitle: "찰떡 무드", matchLabel: "가을 사색형", matchDescription: "상대의 깊이가 당신의 밝은 감성을 더 오래 남게 해줄 수 있습니다.", heroEmoji: "🌸" },
        blaze: { title: "여름 활력형", summary: "움직임과 에너지 속에서 감성이 커지는 타입", description: "당신은 계절 변화 속에서도 몸이 먼저 반응하는 편입니다. 활기, 바깥 공기, 선명한 빛처럼 에너지가 느껴질수록 기분이 살아납니다.", strengths: ["활력", "행동 전환력", "낙관적인 에너지"], tip: "움직이는 힘이 큰 만큼, 너무 달리기만 하지 않도록 조용한 회복 한 타임도 함께 챙겨보세요.", moodTitle: "계절 키워드", moodItems: ["활기", "햇살", "움직임"], matchTitle: "찰떡 무드", matchLabel: "겨울 정리형", matchDescription: "상대의 차분함이 당신의 에너지를 더 균형 있게 만들어줍니다.", heroEmoji: "☀️" },
        hush: { title: "가을 사색형", summary: "서늘한 변화 속에서 생각과 감성이 깊어지는 타입", description: "당신은 계절의 미묘한 결을 잘 느끼는 편입니다. 차분한 바람, 달라지는 빛, 잔잔한 변화 속에서 감정과 생각이 깊어집니다.", strengths: ["섬세한 감각", "깊은 몰입", "분위기 해석 능력"], tip: "깊어지는 감성은 매력이지만 너무 오래 잠기지 않도록, 바깥으로 꺼내는 루틴도 하나 만들어보세요.", moodTitle: "계절 키워드", moodItems: ["사색", "서늘함", "깊이"], matchTitle: "찰떡 무드", matchLabel: "봄빛 시작형", matchDescription: "상대의 밝은 시작 에너지가 당신의 깊이를 환기해줄 수 있습니다.", heroEmoji: "🍂" },
        frost: { title: "겨울 정리형", summary: "조용한 시간 속에서 마음을 정리하는 타입", description: "당신은 계절 변화가 주는 정적 속에서 오히려 편안함을 느낍니다. 바쁘게 움직이기보다 나를 정리하고 차분히 비우는 시간에 감성이 살아납니다.", strengths: ["정리 감각", "고요한 회복", "자기 점검 능력"], tip: "차분함이 강점이지만, 너무 닫히지 않게 작게라도 밖의 자극을 들이는 순간이 필요할 수 있어요.", moodTitle: "계절 키워드", moodItems: ["고요", "정리", "정적"], matchTitle: "찰떡 무드", matchLabel: "여름 활력형", matchDescription: "상대의 활기가 당신의 정적인 무드에 좋은 환기를 만들어줄 수 있습니다.", heroEmoji: "❄️" }
      },
      resultPreview: ["봄빛 시작형", "여름 활력형", "가을 사색형", "겨울 정리형"],
      relatedIds: ["test-014", "test-015", "test-006"],
      callout: "같은 계절을 맞아도 누구는 밖으로, 누구는 안으로 움직여요. 그 차이를 보는 재미가 있어요."
    }),
    "test-019": makePage({
      category: "심리 체크",
      title: "스트레스 해소 버튼 찾기",
      summary: "스트레스를 받았을 때 내가 가장 잘 풀리는 방식이 무엇인지 알아보는 테스트입니다.",
      heroCardSubtitle: "내 버튼은 어디?",
      heroArt: { centerEmoji: "🎮", stickers: ["🏃", "💬", "🛌", "🎨", "☕", "🌙"] },
      loadingMessage: "답변을 조합해서 당신의 스트레스 해소 버튼을 정리하고 있습니다.",
      questions: [
        q("답답한 일이 생겼을 때 먼저 하고 싶은 건?", "몸을 움직여서 기분부터 바꾸기", { move: 2 }, "누군가에게 털어놓으며 정리하기", { talk: 2 }),
        q("혼자 있는 시간이 생기면 나는?", "침대나 소파에서 아무것도 안 하며 쉬고 싶다.", { nest: 2 }, "뭔가 만들거나 정리하며 몰입하고 싶다.", { create: 2 }),
        q("머리가 복잡할 때 더 가까운 쪽은?", "걷거나 운동해야 생각이 정리된다.", { move: 2 }, "말로 꺼내야 답답함이 줄어든다.", { talk: 2 }),
        q("내가 가장 빨리 진정되는 순간은?", "몸이 먼저 풀렸을 때", { move: 2 }, "내 이야기를 누가 이해해줬다고 느낄 때", { talk: 2 }),
        q("집에서 쉬는 방식은?", "아예 누워서 세상과 끊기기", { nest: 2 }, "정리, 취미, 기록으로 집중 돌리기", { create: 2 }),
        q("스트레스가 오래 갈 때 나는?", "몸이 무겁고 움직여야 할 것 같다.", { move: 2, nest: 1 }, "생각이 많아져 어디든 꺼내야 할 것 같다.", { talk: 2, create: 1 }),
        q("나를 회복시키는 공간은?", "산책길, 헬스장, 바깥 공기 있는 곳", { move: 2 }, "내 방, 침대, 조용한 구석", { nest: 2, create: 1 }),
        q("내 회복 버튼을 한 단어로 하면?", "전환", { move: 2, create: 1 }, "정리", { talk: 2, nest: 1 })
      ],
      results: {
        move: { title: "몸부터 전환형", summary: "움직여야 머리도 같이 풀리는 타입", description: "당신은 스트레스가 머리에만 남아 있지 않고 몸으로도 크게 느껴지는 편입니다. 그래서 움직임을 통해 상태를 바꾸는 것이 가장 빠른 해소법이 됩니다.", strengths: ["기분 전환 속도", "행동으로 풀어내는 힘", "에너지 회복 전환력"], tip: "움직임이 큰 회복 장치인 만큼, 짧아도 매일 가능한 루틴 하나를 정해두면 훨씬 든든합니다.", moodTitle: "해소 키워드", moodItems: ["산책", "운동", "바깥 공기"], matchTitle: "찰떡 루틴", matchLabel: "포근 잠수형", matchDescription: "상대의 정적 회복이 당신에게도 균형 있는 쉼을 알려줄 수 있습니다.", heroEmoji: "🏃" },
        talk: { title: "말로 정리형", summary: "꺼내야 비로소 마음이 정리되는 타입", description: "당신은 스트레스가 쌓일수록 누군가와의 대화가 필요해지는 편입니다. 말로 풀어내는 과정에서 감정도 구조도 정리됩니다.", strengths: ["대화 속 정리 능력", "감정 인식", "관계 기반 회복"], tip: "좋은 리스너가 있는 건 큰 자산이지만, 혼자서도 정리할 수 있는 메모 루틴 하나쯤은 같이 갖고 있으면 좋아요.", moodTitle: "해소 키워드", moodItems: ["통화", "수다", "공감"], matchTitle: "찰떡 루틴", matchLabel: "몰입 창작형", matchDescription: "상대의 창작 루틴이 당신이 풀어낸 감정을 다른 형태로 정리하게 도와줄 수 있습니다.", heroEmoji: "💬" },
        nest: { title: "포근 잠수형", summary: "잠깐 세상과 거리를 두어야 회복되는 타입", description: "당신은 스트레스가 높아질수록 자극을 줄이고 고요한 공간으로 숨고 싶어지는 편입니다. 조용히 누워 있거나 아무것도 안 하는 시간이 큰 회복 자원입니다.", strengths: ["자극 차단 감각", "정적 회복력", "에너지 보존"], tip: "잠수는 회복이 될 수 있지만 너무 길어지면 더 무거워질 수 있어요. 아주 작은 움직임 하나는 곁들여보세요.", moodTitle: "해소 키워드", moodItems: ["침대", "무알림", "고요"], matchTitle: "찰떡 루틴", matchLabel: "몸부터 전환형", matchDescription: "상대의 움직임 감각이 당신이 너무 오래 가라앉지 않게 도와줄 수 있어요.", heroEmoji: "🛌" },
        create: { title: "몰입 창작형", summary: "무언가를 만들거나 정리하며 해소하는 타입", description: "당신은 스트레스를 그냥 흘려보내기보다, 다른 무언가에 몰입하며 해소하는 편입니다. 정리, 기록, 만들기, 편집 같은 활동이 회복 루틴이 되기 쉽습니다.", strengths: ["몰입 전환", "감정의 생산적 처리", "손으로 정리하는 힘"], tip: "몰입이 좋은 해소법인 만큼, 너무 결과물에 집착하지 않도록 '가볍게 하는 버전'도 하나 준비해두세요.", moodTitle: "해소 키워드", moodItems: ["기록", "정리", "취미 몰입"], matchTitle: "찰떡 루틴", matchLabel: "말로 정리형", matchDescription: "상대의 대화가 당신의 몰입을 시작하게 만드는 좋은 계기가 될 수 있습니다.", heroEmoji: "🎨" }
      },
      resultPreview: ["몸부터 전환형", "말로 정리형", "포근 잠수형", "몰입 창작형"],
      relatedIds: ["test-002", "test-012", "test-020"],
      callout: "해소 버튼은 성격보다 지금의 피로 상태를 더 잘 보여줄 때도 있습니다."
    }),
    "test-020": makePage({
      category: "관계 테스트",
      title: "소셜 배터리 사용법",
      summary: "사람 많은 자리와 깊은 대화 중 어디에서 더 살아나는지 보는 소셜 배터리 테스트입니다.",
      heroCardSubtitle: "나는 어디서 충전될까?",
      heroArt: { centerEmoji: "🔋", stickers: ["🎉", "🫂", "👀", "🌙", "💬", "☕"] },
      loadingMessage: "답변을 조합해서 당신의 소셜 배터리 사용법을 정리하고 있습니다.",
      questions: [
        q("사람 많은 모임에 다녀온 뒤 나는?", "조금 피곤해도 기분은 오르는 편", { crowd: 2, observer: 1 }, "즐겁더라도 결국 혼자 정리 시간이 필요하다", { recharge: 2, deep: 1 }),
        q("새 사람을 만나는 자리에선?", "어색해도 금방 섞이는 편", { crowd: 2 }, "처음엔 조용히 보다가 한두 사람과 연결된다", { observer: 2, deep: 1 }),
        q("가장 편한 대화는?", "여러 명이 왔다 갔다 하는 활기", { crowd: 2 }, "깊이 있는 1대1 대화", { deep: 2 }),
        q("주말 약속이 연달아 잡히면?", "은근히 신나고 살아나는 느낌", { crowd: 2 }, "하루쯤은 꼭 비워둬야 버틸 수 있다", { recharge: 2 }),
        q("내가 사람 자리에서 자주 하는 건?", "반응하고 섞이며 분위기를 따라간다", { crowd: 2, observer: 1 }, "사람들을 보며 흐름과 거리감을 읽는다", { observer: 2 }),
        q("관계에서 더 중요한 건?", "다양한 연결과 활기", { crowd: 2 }, "적어도 깊이 있는 몇 사람", { deep: 2, recharge: 1 }),
        q("대화가 길어지면 나는?", "새 사람, 새 주제가 들어와도 괜찮다", { crowd: 2 }, "깊은 얘기 한 번이 더 기억에 남는다", { deep: 2 }),
        q("내 소셜 배터리를 한마디로 하면?", "사람 속에서 켜지는 편", { crowd: 2, observer: 1 }, "사람을 고르고 쉬며 쓰는 편", { recharge: 2, deep: 1 })
      ],
      results: {
        crowd: { title: "활기 충전형", summary: "사람 속에서 오히려 에너지가 살아나는 타입", description: "당신은 다양한 사람, 활기 있는 자리, 빠른 공기 속에서 에너지가 오르는 편입니다. 가벼운 연결 속에서 기분이 환기됩니다.", strengths: ["사교 에너지", "새로운 자리 적응력", "활기 속 회복"], tip: "사람 속 에너지가 크지만, 회복 없는 연속 스케줄은 피로를 남길 수 있어요. 빈칸 하루를 같이 챙겨보세요.", moodTitle: "배터리 키워드", moodItems: ["활기", "다양한 연결", "현장감"], matchTitle: "찰떡 케미", matchLabel: "깊은 대화형", matchDescription: "상대의 깊이가 당신의 넓은 관계 속에 의미를 더해줄 수 있습니다.", heroEmoji: "🎉" },
        deep: { title: "깊은 대화형", summary: "많은 사람보다 진한 연결에서 충전되는 타입", description: "당신은 얕고 넓은 연결보다 적더라도 깊은 대화에서 더 큰 만족과 에너지를 얻습니다. 편한 사람과 진하게 연결될 때 배터리가 차오릅니다.", strengths: ["깊이 있는 관계 선호", "대화의 밀도", "정서적 만족감"], tip: "깊은 연결이 강점이라면, 가끔은 가벼운 자리도 부담 없이 활용해보세요. 배터리 사용 폭이 넓어집니다.", moodTitle: "배터리 키워드", moodItems: ["깊은 대화", "진한 연결", "정서 충전"], matchTitle: "찰떡 케미", matchLabel: "활기 충전형", matchDescription: "상대의 넓은 에너지가 당신의 깊은 관계에 새로운 환기를 만들어줍니다.", heroEmoji: "☕" },
        observer: { title: "조용한 관찰형", summary: "바로 섞기보다 먼저 읽고 들어가는 타입", description: "당신은 사람 자리에서도 먼저 분위기와 사람들의 결을 읽는 편입니다. 조용히 있더라도 없는 게 아니라, 충분히 보고 나서 움직입니다.", strengths: ["사람 읽는 감각", "분위기 파악 능력", "불필요한 소모를 줄임"], tip: "관찰이 강점이지만 너무 오래 머무르면 존재감이 흐려질 수 있어요. 한 번쯤 먼저 반응해보는 것도 좋습니다.", moodTitle: "배터리 키워드", moodItems: ["관찰", "거리 조절", "신중함"], matchTitle: "찰떡 케미", matchLabel: "휴식 보존형", matchDescription: "상대의 차분한 회복 감각이 당신의 조용한 에너지를 편안하게 받아줍니다.", heroEmoji: "👀" },
        recharge: { title: "휴식 보존형", summary: "사람을 좋아해도 결국 혼자 회복 시간이 꼭 필요한 타입", description: "당신은 관계를 즐기더라도, 그만큼 혼자 회복하는 시간이 꼭 필요합니다. 소셜 배터리를 무한처럼 쓰기보다 관리하며 쓰는 편입니다.", strengths: ["자기 회복 감각", "무리 없는 관계 유지", "소모 신호 감지"], tip: "당신의 리듬을 미리 알려두면 약속도 덜 피곤해져요. 회복 시간이 필요하다는 건 아주 정상적인 사용법입니다.", moodTitle: "배터리 키워드", moodItems: ["빈칸 일정", "회복 시간", "자기 리듬"], matchTitle: "찰떡 케미", matchLabel: "조용한 관찰형", matchDescription: "상대도 거리감을 이해하는 편이라 함께 있어도 덜 소모될 가능성이 큽니다.", heroEmoji: "🌙" }
      },
      resultPreview: ["활기 충전형", "깊은 대화형", "조용한 관찰형", "휴식 보존형"],
      relatedIds: ["test-012", "test-005", "test-019"],
      callout: "사람을 좋아하는 것과 사람 속에서 충전되는 것은 의외로 다른 얘기일 수 있어요."
    })
  };

  const existingIds = new Set(cards.map((card) => card.id));
  extraCards.forEach((card) => {
    if (!existingIds.has(card.id)) {
      cards.push(card);
    }
  });

  Object.keys(extraPages).forEach((id) => {
    if (!pages[id]) {
      pages[id] = extraPages[id];
    }
  });
})();
