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
      thumb: "#ffe1ef"
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
      thumb: "#fff4c8"
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
      thumb: "#e5f0ff"
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
      thumb: "#fff0d1"
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
      thumb: "#effad6"
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
      thumb: "#e6f9ec"
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
      thumb: "#ffe7cf"
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
      thumb: "#eef6ff"
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
      thumb: "#fff1d3"
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
      thumb: "#e8f2ff"
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
      thumb: "#fff0f0"
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
      thumb: "#e8ffe9"
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
      thumb: "#fff0d9"
    },
    {
      id: "test-020",
      title: "소셜 배터리 사용법",
      description: "사람 많은 자리에서 살아나는지, 깊은 대화에서 충전되는지 보는 소셜 배터리 테스트예요.",
      href: "./tests/test-020.html",
      badge: "관계",
      category: "관계 테스트",
      duration: "2분",
      icon: "🔋",
      posterTitle: "소셜 배터리",
      posterSubtitle: "나는 어디서 충전될까?",
      stickers: ["🎉", "🫂", "👀", "🌙"],
      thumb: "#dce6df",
      featuredLabel: "요즘 반응 좋은 대표 테스트",
      featuredHook: "사람 속에서 살아나는지, 깊은 대화에서 충전되는지 바로 비교해보세요.",
      featuredReason: "관계형 테스트 중 가장 넓게 공감이 붙는 카드"
    },
    {
      id: "test-021",
      title: "지금 내 에너지 레벨은?",
      description: "다섯 가지 반응 중 지금의 나와 가장 가까운 것을 골라보는 컨디션 테스트예요.",
      href: "./tests/test-021.html",
      badge: "5지선다",
      category: "컨디션 테스트",
      duration: "2분",
      icon: "📶",
      posterTitle: "에너지 레벨",
      posterSubtitle: "지금 나는 몇 칸일까?",
      stickers: ["🔋", "☀️", "☕", "🛋️"],
      thumb: "#d9e7d2"
    },
    {
      id: "test-022",
      title: "오늘 끌리는 장면은?",
      description: "설명보다 먼저 눈에 들어오는 장면으로 오늘의 감정 무드를 골라보는 테스트예요.",
      href: "./tests/test-022.html",
      badge: "이미지 선택",
      category: "무드 테스트",
      duration: "2분",
      icon: "🖼️",
      posterTitle: "오늘의 장면",
      posterSubtitle: "눈길이 머무는 곳은?",
      stickers: ["🌊", "🌃", "🌿", "🎡"],
      thumb: "#c9dbe8"
    },
    {
      id: "test-023",
      title: "요즘 내 여유 잔량은?",
      description: "일상 반응에 점수를 쌓아 요즘 마음의 여백이 얼마나 남았는지 보는 테스트예요.",
      href: "./tests/test-023.html",
      badge: "점수형",
      category: "라이프 테스트",
      duration: "2분",
      icon: "🫙",
      posterTitle: "여유 잔량",
      posterSubtitle: "마음에 빈칸이 남았을까?",
      stickers: ["🫧", "📅", "🎧", "🌙"],
      thumb: "#ead8c4"
    }
  ];

  extraCards.push(
    { id: "test-024", title: "AI와 일할 때 나는 어떤 파트너?", description: "AI에게 일을 부탁하고 결과를 다듬는 6가지 상황으로 나의 협업 스타일을 찾아봐요.", href: "./tests/test-024.html", badge: "AI 협업", category: "성향 테스트", duration: "90초", icon: "🤖", posterTitle: "AI 협업 스타일", posterSubtitle: "기획자? 탐험가? 검증가?", stickers: ["🤖", "💡", "📝", "🔎"], thumb: "#d9e7f4" },
    { id: "test-025", title: "알림 OFF, 나의 오프라인 모드는?", description: "소식을 잠깐 놓쳐도 괜찮은 시간, 화면 밖에서 내가 고르는 즐거움을 찾아봐요.", href: "./tests/test-025.html", badge: "JOMO", category: "취향 테스트", duration: "90초", icon: "🔕", posterTitle: "나의 오프라인 모드", posterSubtitle: "알림을 끄면 뭘 할까?", stickers: ["🔕", "🌿", "🎨", "☕"], thumb: "#e2ebd5" }
  );

  const extraPages = {
    "test-024": makePage({
      category: "성향 테스트",
      title: "AI와 일할 때 나는 어떤 파트너?",
      summary: "AI에게 일을 부탁하고 결과를 다듬는 6가지 상황으로 나의 협업 스타일을 찾아봐요.",
      introNotice: "AI 활용 능력을 평가하지 않아요. 써본 적이 없다면 상상하며 골라도 좋아요. 실제 AI 연결 없이 브라우저에서 계산해요.",
      heroCardSubtitle: "기획자? 탐험가? 검증가?",
      heroArt: { centerEmoji: "🤖", stickers: ["💡", "📝", "🔎", "🧭", "✨", "📎"] },
      loadingMessage: "내가 AI에게 맡기는 일과 직접 챙기는 일을 모으고 있어요.",
      questions: [
        { prompt: "친구들과 갈 여행 계획을 AI에게 부탁한다면, 첫 문장은?", options: [
          { label: "예산·시간·꼭 가고 싶은 곳부터 정리해줄게", scores: { director: 3 } },
          { label: "내 초안을 줄 테니 동선과 표현을 다듬어줘", scores: { editor: 3 } },
          { label: "내가 생각 못 한 색다른 코스도 보여줘", scores: { explorer: 3 } },
          { label: "추천마다 확인할 공식 정보도 함께 알려줘", scores: { verifier: 3 } }
        ] },
        { prompt: "AI가 그럴듯한 소개 글을 줬다. 다음 행동은?", options: [
          { label: "내 말투에 맞게 문장을 하나씩 바꾼다", scores: { editor: 3 } },
          { label: "완전히 다른 분위기의 버전도 받아본다", scores: { explorer: 3 } },
          { label: "날짜나 수치가 맞는지 원문을 확인한다", scores: { verifier: 3 } },
          { label: "처음 정한 독자와 목적에 맞는지 본다", scores: { director: 3 } }
        ] },
        { prompt: "답변이 마음에 안 들 때 나는?", options: [
          { label: "역할이나 형식을 바꿔 실험해본다", scores: { explorer: 3 } },
          { label: "어떤 근거로 나온 답인지 확인한다", scores: { verifier: 3 } },
          { label: "원하는 결과와 조건을 더 구체적으로 쓴다", scores: { director: 3 } },
          { label: "쓸 만한 부분만 남겨 직접 고친다", scores: { editor: 3 } }
        ] },
        { prompt: "모임 발표를 준비할 때 내가 가장 오래 붙잡는 것은?", options: [
          { label: "인용한 자료가 실제로 있는지와 출처", scores: { verifier: 3 } },
          { label: "누구에게 무엇을 전할지 정한 개요", scores: { director: 3 } },
          { label: "듣는 사람이 이해하기 쉬운 문장", scores: { editor: 3 } },
          { label: "시선을 끌 만한 새로운 표현 방식", scores: { explorer: 3 } }
        ] },
        { prompt: "시간이 10분 남았다면 AI와 어떤 일을 하고 싶어?", options: [
          { label: "복잡한 할 일을 실행 순서로 쪼개기", scores: { director: 3 } },
          { label: "쓰던 글을 내 느낌으로 마무리하기", scores: { editor: 3 } },
          { label: "엉뚱한 아이디어를 여러 갈래로 펼치기", scores: { explorer: 3 } },
          { label: "받은 정보 중 확인이 필요한 곳 표시하기", scores: { verifier: 3 } }
        ] },
        { prompt: "결과물을 보고 가장 뿌듯한 순간은?", options: [
          { label: "누가 봐도 내 취향과 목소리가 느껴질 때", scores: { editor: 3 } },
          { label: "처음엔 없던 새로운 방향을 찾았을 때", scores: { explorer: 3 } },
          { label: "중요한 사실을 내 손으로 확인했을 때", scores: { verifier: 3 } },
          { label: "처음 세운 목적에 딱 맞게 완성했을 때", scores: { director: 3 } }
        ] }
      ],
      results: {
        director: { title: "방향 잡는 기획자", summary: "AI가 달리기 전에 목적지부터 고르는 파트너", description: "당신의 선택은 원하는 결과와 조건을 먼저 정하는 쪽에 모였어요. 할 일을 나누고 순서를 잡는 과정 자체가 협업의 중요한 부분이라고 느끼는 편이에요.", strengths: ["목적을 먼저 정함", "조건을 구체적으로 전달함", "할 일의 순서를 나눔"], tip: "다음에는 꼭 지킬 조건 세 가지와 바뀌어도 되는 한 가지를 나눠 적어보세요.", moodTitle: "협업 키워드", moodItems: ["목적지", "조건", "실행 순서"], matchTitle: "서로 보완할 파트너", matchLabel: "옆길 찾는 탐험가", matchDescription: "분명한 방향에 예상 밖의 아이디어를 더해볼 수 있어요.", heroEmoji: "🧭" },
        editor: { title: "내 색 입히는 편집자", summary: "초안에 나의 말투와 취향을 남기는 파트너", description: "당신의 선택은 받은 답을 그대로 쓰기보다 직접 손보는 쪽에 모였어요. 문장 하나의 분위기나 읽는 사람의 느낌까지 챙길 때 결과물이 내 것이 된다고 느끼는 편이에요.", strengths: ["자기 목소리를 남김", "쓸 부분을 골라냄", "읽는 사람을 생각함"], tip: "다음에는 바꾸고 싶은 문장과 마음에 드는 문장을 하나씩 표시해서 비교해보세요.", moodTitle: "협업 키워드", moodItems: ["내 말투", "다듬기", "마지막 손길"], matchTitle: "서로 보완할 파트너", matchLabel: "근거 챙기는 검증가", matchDescription: "자연스러운 표현에 사실 확인을 더하면 함께 읽기 편해져요.", heroEmoji: "📝" },
        explorer: { title: "옆길 찾는 탐험가", summary: "첫 답을 출발점 삼아 다른 가능성을 여는 파트너", description: "당신의 선택은 여러 버전을 비교하고 새로운 시도를 해보는 쪽에 모였어요. 빠른 정답보다 생각의 범위가 넓어지는 순간에 재미를 느끼는 편이에요.", strengths: ["다른 관점을 시도함", "여러 버전을 비교함", "낯선 아이디어를 반김"], tip: "마지막에는 가장 해보고 싶은 아이디어 하나를 골라 작은 행동으로 바꿔보세요.", moodTitle: "협업 키워드", moodItems: ["만약에", "다른 버전", "새로운 길"], matchTitle: "서로 보완할 파트너", matchLabel: "방향 잡는 기획자", matchDescription: "많은 가능성 중 지금 실행할 것을 함께 고르기 좋아요.", heroEmoji: "💡" },
        verifier: { title: "근거 챙기는 검증가", summary: "매끈한 답변에도 확인할 곳을 남겨두는 파트너", description: "당신의 선택은 출처와 날짜, 사실을 직접 확인하는 쪽에 모였어요. 답변이 자신 있게 쓰였다는 이유만으로 믿기보다 확인할 자료를 찾는 과정을 중요하게 여기는 편이에요.", strengths: ["출처를 찾아봄", "불확실한 부분을 구분함", "중요한 사실을 재확인함"], tip: "다음에는 반드시 확인할 사실과 자유롭게 상상해도 되는 부분을 먼저 나눠보세요.", moodTitle: "협업 키워드", moodItems: ["원문", "확인 표시", "최종 판단"], matchTitle: "서로 보완할 파트너", matchLabel: "내 색 입히는 편집자", matchDescription: "확인한 내용이 잘 전달되도록 함께 문장을 다듬기 좋아요.", heroEmoji: "🔎" }
      },
      resultPreview: ["방향 잡는 기획자", "내 색 입히는 편집자", "옆길 찾는 탐험가", "근거 챙기는 검증가"],
      relatedIds: ["test-011", "test-009", "test-025"],
      callout: "재미용 선택 테스트예요. AI 활용 능력이나 직무 적합도를 평가하지 않아요. 동점이면 결과 소개 순서의 유형이 표시돼요."
    }),
    "test-025": makePage({
      category: "취향 테스트",
      title: "알림 OFF, 나의 오프라인 모드는?",
      summary: "소식을 잠깐 놓쳐도 괜찮은 시간, 화면 밖에서 내가 고르는 즐거움을 찾아봐요.",
      introNotice: "JOMO는 소식을 잠깐 놓쳐도 지금의 시간을 즐기는 태도예요. 휴대폰 사용량이나 건강을 진단하지 않는 취향 테스트예요.",
      heroCardSubtitle: "알림을 끄면 뭘 할까?",
      heroArt: { centerEmoji: "🔕", stickers: ["🌿", "🎨", "☕", "📚", "🚶", "🫖"] },
      loadingMessage: "화면 밖에서 눈길이 가는 순간들을 모으고 있어요.",
      questions: [
        { prompt: "한 시간 동안 알림을 꺼두기로 했다. 제일 먼저 손이 가는 것은?", options: [
          { label: "낙서할 종이나 만들다 만 소품", scores: { maker: 3 } },
          { label: "가볍게 신고 나갈 운동화", scores: { wanderer: 3 } },
          { label: "편한 담요와 읽던 책", scores: { keeper: 3 } },
          { label: "같이 차 마실 사람의 빈 의자", scores: { connector: 3 } }
        ] },
        { prompt: "친구가 인기 장소에 갔다는데, 오늘 내 선택은?", options: [
          { label: "집 앞 처음 보는 골목으로 걷는다", scores: { wanderer: 3 } },
          { label: "늘 가던 조용한 곳에서 쉰다", scores: { keeper: 3 } },
          { label: "가까운 사람과 편하게 수다 떤다", scores: { connector: 3 } },
          { label: "내가 해보고 싶던 작은 작업을 한다", scores: { maker: 3 } }
        ] },
        { prompt: "카페에서 휴대폰을 가방에 넣었다. 내 눈길은?", options: [
          { label: "늘 마시는 차의 향과 맛", scores: { keeper: 3 } },
          { label: "맞은편 사람이 꺼내는 이야기", scores: { connector: 3 } },
          { label: "냅킨에 그려보고 싶은 모양", scores: { maker: 3 } },
          { label: "창밖의 낯선 간판과 지나는 풍경", scores: { wanderer: 3 } }
        ] },
        { prompt: "사진으로 남기지 않아도 좋았던 순간은?", options: [
          { label: "대화가 잘 통해 한참 웃었던 시간", scores: { connector: 3 } },
          { label: "서툴지만 내 손으로 완성한 것", scores: { maker: 3 } },
          { label: "걷다가 우연히 발견한 작은 공원", scores: { wanderer: 3 } },
          { label: "좋아하는 음악을 한 곡 끝까지 들은 때", scores: { keeper: 3 } }
        ] },
        { prompt: "아무 약속 없는 오후, 무엇 하나만 챙긴다면?", options: [
          { label: "재료를 꺼내 무언가 만들기", scores: { maker: 3 } },
          { label: "정해둔 길 없이 잠깐 걷기", scores: { wanderer: 3 } },
          { label: "익숙한 자리를 편하게 정돈하기", scores: { keeper: 3 } },
          { label: "반가운 사람과 함께 밥 먹기", scores: { connector: 3 } }
        ] },
        { prompt: "알림을 다시 켜기 전, 가장 듣고 싶은 내 한마디는?", options: [
          { label: "오늘 새로운 풍경을 하나 찾았네", scores: { wanderer: 3 } },
          { label: "평소 좋아하던 걸 충분히 즐겼네", scores: { keeper: 3 } },
          { label: "같이 있는 사람에게 집중해서 좋았네", scores: { connector: 3 } },
          { label: "작아도 내 손으로 하나 남겼네", scores: { maker: 3 } }
        ] }
      ],
      results: {
        maker: { title: "손끝 몰입 모드", summary: "스크롤 대신 내 손으로 작은 흔적을 남기는 시간", description: "당신의 선택은 그리기나 만들기처럼 직접 해보는 즐거움에 모였어요. 누군가의 완성작을 보는 것보다 조금 서툴러도 내가 만든 결과를 볼 때 시간이 꽉 찬 느낌이 드는 편이에요.", strengths: ["작은 시작을 즐김", "과정에 눈길을 줌", "내 흔적을 남김"], tip: "새 도구를 사기 전에 집에 있는 종이 한 장으로 10분만 놀아보세요.", moodTitle: "오프라인 키워드", moodItems: ["손끝", "낙서", "작은 완성"], matchTitle: "같이 즐길 친구", matchLabel: "골목 탐험 모드", matchDescription: "산책에서 찾은 장면을 함께 그리고 만들어보기 좋아요.", heroEmoji: "🎨" },
        wanderer: { title: "골목 탐험 모드", summary: "추천 피드 밖에서 나만의 장면을 발견하는 시간", description: "당신의 선택은 주변을 걷고 우연한 풍경을 만나는 쪽에 모였어요. 유명한 장소를 다 챙기기보다 오늘 내 눈에 들어오는 작은 변화를 찾을 때 재미를 느끼는 편이에요.", strengths: ["새로운 풍경을 발견함", "정해진 계획 없이 즐김", "주변을 세밀하게 봄"], tip: "다음 산책에는 평소와 다른 모퉁이 하나만 골라 걸어보세요.", moodTitle: "오프라인 키워드", moodItems: ["한 블록", "발견", "우연한 풍경"], matchTitle: "같이 즐길 친구", matchLabel: "손끝 몰입 모드", matchDescription: "발견한 풍경을 말이나 그림으로 나누기 좋아요.", heroEmoji: "🌿" },
        keeper: { title: "익숙한 평온 모드", summary: "새로운 소식보다 좋아하던 감각을 오래 누리는 시간", description: "당신의 선택은 익숙한 자리와 취향을 충분히 즐기는 쪽에 모였어요. 뭔가 특별한 일을 해야 한다는 부담이 줄어들 때 차 한 잔이나 음악 한 곡도 만족스러운 시간이 되는 편이에요.", strengths: ["내 취향을 알고 있음", "작은 감각을 즐김", "편안한 자리를 만듦"], tip: "좋아하는 노래 한 곡을 다른 일을 하지 않고 끝까지 들어보세요.", moodTitle: "오프라인 키워드", moodItems: ["단골 자리", "차 한 잔", "한 곡 끝까지"], matchTitle: "같이 즐길 친구", matchLabel: "눈앞의 대화 모드", matchDescription: "편안한 자리에 부담 없는 대화가 더해지기 좋아요.", heroEmoji: "🫖" },
        connector: { title: "눈앞의 대화 모드", summary: "단체방 소식 대신 지금 함께 있는 사람을 만나는 시간", description: "당신의 선택은 가까운 사람과 얼굴을 보며 시간을 나누는 쪽에 모였어요. 많은 소식을 아는 것보다 한 사람의 이야기를 충분히 듣고 함께 웃는 순간을 더 오래 기억하는 편이에요.", strengths: ["상대 이야기에 집중함", "작은 일상을 나눔", "함께 있는 시간을 챙김"], tip: "함께 식사할 때 서로 오늘 가장 웃겼던 일 하나씩만 들려줘보세요.", moodTitle: "오프라인 키워드", moodItems: ["마주 보기", "한 끼", "같이 웃기"], matchTitle: "같이 즐길 친구", matchLabel: "익숙한 평온 모드", matchDescription: "소란스럽지 않은 공간에서 편하게 이야기하기 좋아요.", heroEmoji: "☕" }
      },
      resultPreview: ["손끝 몰입 모드", "골목 탐험 모드", "익숙한 평온 모드", "눈앞의 대화 모드"],
      relatedIds: ["test-020", "test-002", "test-024"],
      callout: "어느 모드가 더 건강하거나 좋은 것은 아니에요. 오늘 선택한 즐거움만 가볍게 비교해요. 동점이면 결과 소개 순서의 유형이 표시돼요."
    }),
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
        q("다른 사람 의견은 내게?", "참고는 하지만 내 기준이 더 중요하다.", { logic: 2, quick: 1 }, "최종 선택 전에 꼭 한 번 더 듣는다.", { harmony: 4 }),
        q("선택이 길어질 때 나는?", "정보가 부족해서라고 느낀다.", { logic: 2 }, "결정 피로가 와서 빨리 끝내고 싶어진다.", { quick: 2 }),
        q("갑자기 기회가 생기면?", "기본 조건부터 빠르게 체크한다.", { logic: 2, quick: 1 }, "끌리면 일단 잡고 본다.", { gut: 2 }),
        q("후회가 적은 결정은?", "충분히 따져보고 내린 결정", { logic: 2 }, "당시 마음이 확실했던 결정", { gut: 2 }),
        q("친구와 같이 정할 때 나는?", "각자 원하는 걸 정리하며 중간점을 찾는다.", { harmony: 4 }, "대략 방향이 보이면 빨리 결론 내린다.", { quick: 2, logic: 1 }),
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
        q("사람 많은 자리에 다녀온 뒤 나는?", "연락과 약속을 끊고 완전히 쉬고 싶다.", { vanish: 4 }, "즐겁지만 결국 친한 사람과 정리하고 싶어진다.", { duo: 2, circle: 1 }),
        q("쉬는 날 연락이 많이 오면?", "답장 템포를 늦추며 내 호흡을 찾는다.", { solo: 2, vanish: 1 }, "지금 가능한 사람들과 가볍게 이어간다.", { circle: 2 }),
        q("가장 편한 약속은?", "정해진 시간 없이 느슨한 만남", { duo: 2, solo: 1 }, "여럿이 만나도 역할 없는 편한 모임", { circle: 2 }),
        q("사람에게서 힘을 얻는 방식은?", "깊게 연결되는 한두 명의 대화", { duo: 2 }, "그날그날 가볍게 섞이는 활기", { circle: 2 }),
        q("내 충전 버튼에 가까운 건?", "아예 잠수 타듯 쉬기", { vanish: 4 }, "편한 관계와 적당히 이어져 있기", { duo: 2, circle: 1 })
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
        q("방에 들어왔을 때 제일 먼저 보이는 건?", "방 전체의 색 조합과 포인트 컬러", { color: 3, cozy: 1 }, "정리된 구조와 비어 있는 면", { minimal: 2, collector: 1 }),
        q("침대 주변에 더 잘 어울리는 건?", "포근한 쿠션과 담요", { cozy: 2 }, "딱 필요한 것만 놓인 깔끔함", { minimal: 2 }),
        q("내 방의 만족도를 올리는 건?", "좋아하는 소품이 조금씩 보이는 것", { collector: 2, color: 1 }, "눈에 거슬리는 것이 없는 정돈감", { minimal: 2 }),
        q("벽을 꾸민다면?", "사진, 포스터, 메모로 나답게 채우고 싶다.", { collector: 2 }, "한두 포인트만 두고 여백을 살리고 싶다.", { minimal: 2, cozy: 1 }),
        q("가장 편안한 공간은?", "따뜻한 조명과 폭신한 텍스처가 있는 공간", { cozy: 2 }, "선이 단정하고 시야가 정리된 공간", { minimal: 2 }),
        q("소품을 고를 때 나는?", "내 취향이 드러나는 디테일을 본다.", { collector: 2, color: 1 }, "전체 공간을 해치지 않는지를 본다.", { minimal: 2, cozy: 1 }),
        q("방의 기분 전환은 보통 어떻게 하나?", "침구와 소품의 색 조합을 바꾼다.", { color: 3, cozy: 1 }, "정리부터 하며 구조를 다시 맞춘다.", { minimal: 2 }),
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
        q("모임 일정 정리에서 더 가까운 건?", "장소와 이동 순서를 묶어 전체 일정을 제안한다.", { curator: 4, anchor: 1 }, "사람들이 되는 흐름을 보며 자연스럽게 정해진다.", { pulse: 2, flex: 1 }),
        q("당일 약속이 가장 편한 경우는?", "거의 없다. 미리 알아야 좋다.", { anchor: 2, curator: 1 }, "컨디션 좋으면 오히려 더 가볍고 좋다.", { pulse: 2 }),
        q("나와 약속 잡기 쉬운 사람은?", "동선과 준비할 일을 함께 정리해주는 사람", { curator: 4, anchor: 1 }, "조금 바뀌어도 서로 가볍게 맞출 수 있는 사람", { flex: 2 }),
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
        q("기분 전환 방식은?", "밖으로 나가 몸을 움직이며 바꾸기", { blaze: 2 }, "혼자 정리하거나 기록하며 바꾸기", { frost: 4 }),
        q("옷을 고를 때 끌리는 건?", "경쾌한 색과 가벼운 실루엣", { bloom: 2, blaze: 1 }, "톤 다운된 색과 포근한 질감", { hush: 2, frost: 1 }),
        q("지금의 계절을 느끼는 포인트는?", "거리의 활기와 에너지", { blaze: 2, bloom: 1 }, "빛, 바람, 냄새 같은 미묘한 변화", { hush: 2, frost: 1 }),
        q("내 감성이 가장 살아나는 시간은?", "새 계획을 세우는 낮", { bloom: 2 }, "하루를 차분히 정리하는 밤", { frost: 4 }),
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
      summary: "사람 많은 자리와 깊은 대화 중 어디에서 더 살아나는지 보는 소셜 배터리 테스트예요.",
      shareDescription: "사람 많은 자리에서 살아나는지, 깊은 대화에서 충전되는지 바로 확인하는 소셜 배터리 대표 테스트예요.",
      shareSectionTitle: "친구랑 비교하면 더 재밌어요",
      sharePrompt: "친구에게 보내고 누가 사람 속에서 켜지고 누가 혼자 회복해야 하는지 비교해보세요.",
      heroCardSubtitle: "나는 어디서 충전될까?",
      heroArt: { centerEmoji: "🔋", stickers: ["🎉", "🫂", "👀", "🌙", "💬", "☕"] },
      loadingMessage: "답변을 모아 소셜 배터리 사용법을 정리하고 있어요.",
      questions: [
        q("사람 많은 모임에 다녀온 뒤 나는?", "조금 피곤해도 기분은 오르는 편", { crowd: 2, observer: 1 }, "즐겁더라도 결국 혼자 정리 시간이 필요하다", { recharge: 2, deep: 1 }),
        q("새 사람을 만나는 자리에선?", "어색해도 금방 섞이는 편", { crowd: 2 }, "처음엔 조용히 보다가 한두 사람과 연결된다", { observer: 4, deep: 1 }),
        q("가장 편한 대화는?", "여러 명이 왔다 갔다 하는 활기", { crowd: 2 }, "깊이 있는 1대1 대화", { deep: 2 }),
        q("주말 약속이 연달아 잡히면?", "은근히 신나고 살아나는 느낌", { crowd: 2 }, "하루쯤은 꼭 비워둬야 버틸 수 있다", { recharge: 2 }),
        q("내가 사람 자리에서 자주 하는 건?", "반응하고 섞이며 분위기를 따라간다", { crowd: 2, observer: 1 }, "사람들을 보며 흐름과 거리감을 읽는다", { observer: 4 }),
        q("관계에서 더 중요한 건?", "다양한 연결과 활기", { crowd: 2 }, "적어도 깊이 있는 몇 사람", { deep: 2, recharge: 1 }),
        q("대화가 길어지면 나는?", "새 사람, 새 주제가 들어와도 괜찮다", { crowd: 2 }, "깊은 얘기 한 번이 더 기억에 남는다", { deep: 2 }),
        q("내 소셜 배터리를 한마디로 하면?", "사람 속에서 켜지는 편", { crowd: 2, observer: 1 }, "사람을 고르고 쉬며 쓰는 편", { recharge: 2, deep: 1 })
      ],
      results: {
        crowd: { title: "활기 충전형", summary: "사람 속에서 오히려 에너지가 살아나는 타입", shareTitle: "내 소셜 배터리 결과는 활기 충전형", shareDescription: "활기 있는 자리와 여러 사람 속에서 오히려 에너지가 올라오는 타입이에요. 사람 많은 곳이 당신에겐 충전소에 가까워요.", description: "다양한 사람, 활기 있는 자리, 빠른 공기 속에서 에너지가 오르는 편이에요. 가벼운 연결 속에서 기분도 금방 환기돼요.", strengths: ["사교 에너지", "새로운 자리 적응력", "활기 속 회복"], tip: "사람 속 에너지가 크고, 빈 일정에서는 다시 천천히 배터리가 차오르는 편이에요.", kukuComment: "사람 속에서 잘 살아나지만, 빈칸 하루도 은근히 좋아하잖아!", moodTitle: "배터리 키워드", moodItems: ["활기", "다양한 연결", "현장감"], matchTitle: "찰떡 케미", matchLabel: "깊은 대화형", matchDescription: "상대의 깊이가 넓은 관계 속에 의미를 더해줄 수 있어요.", heroEmoji: "🎉" },
        deep: { title: "깊은 대화형", summary: "많은 사람보다 진한 연결에서 충전되는 타입", shareTitle: "내 소셜 배터리 결과는 깊은 대화형", shareDescription: "사람이 많을수록 살아나는 타입은 아니고, 적더라도 진한 대화에서 배터리가 차오르는 편이에요.", description: "얕고 넓은 연결보다 적더라도 깊은 대화에서 더 큰 만족과 에너지를 얻어요. 편한 사람과 진하게 연결될 때 배터리가 차올라요.", strengths: ["깊이 있는 관계 선호", "대화의 밀도", "정서적 만족감"], tip: "여러 사람을 빠르게 만나는 것보다 한 사람과 긴 대화를 나눌 때 만족감이 커요.", kukuComment: "네 배터리는 사람 수보다 대화 밀도를 따지나 봐.", moodTitle: "배터리 키워드", moodItems: ["깊은 대화", "진한 연결", "정서 충전"], matchTitle: "찰떡 케미", matchLabel: "활기 충전형", matchDescription: "상대의 넓은 에너지가 깊은 관계에 새로운 환기를 만들어줘요.", heroEmoji: "☕" },
        observer: { title: "조용한 관찰형", summary: "바로 섞기보다 먼저 읽고 들어가는 타입", shareTitle: "내 소셜 배터리 결과는 조용한 관찰형", shareDescription: "처음부터 섞이기보다 분위기를 먼저 읽고 천천히 들어가는 타입이에요. 조용하지만 꽤 정확하게 사람을 봐요.", description: "사람이 모인 자리에서도 먼저 분위기와 사람들의 결을 읽는 편이에요. 조용히 있더라도 사라진 게 아니라, 충분히 본 뒤 움직여요.", strengths: ["사람 읽는 감각", "분위기 파악 능력", "불필요한 소모를 줄임"], tip: "말을 꺼내기 전에 자리의 분위기와 사람 사이 거리를 먼저 읽는 편이에요.", kukuComment: "배경 스캔은 조용한데 사람 보는 눈은 꽤 빠르네?", moodTitle: "배터리 키워드", moodItems: ["관찰", "거리 조절", "신중함"], matchTitle: "찰떡 케미", matchLabel: "휴식 보존형", matchDescription: "상대의 차분한 회복 감각이 조용한 에너지를 편안하게 받아줘요.", heroEmoji: "👀" },
        recharge: { title: "휴식 보존형", summary: "사람을 좋아해도 결국 혼자 회복 시간이 꼭 필요한 타입", shareTitle: "내 소셜 배터리 결과는 휴식 보존형", shareDescription: "사람을 좋아해도 결국 혼자 비우고 회복하는 시간이 꼭 필요한 타입이에요. 배터리를 관리하며 쓰는 편이에요.", description: "관계를 즐기더라도 그만큼 혼자 회복하는 시간이 꼭 필요해요. 소셜 배터리를 무한처럼 쓰기보다 아껴 쓰는 편이에요.", strengths: ["자기 회복 감각", "무리 없는 관계 유지", "소모 신호 감지"], tip: "즐거운 약속 뒤에는 혼자 조용히 비우는 시간이 자연스럽게 따라오는 편이에요.", kukuComment: "사람이 싫은 게 아니라 충전기가 집에 있는 거지?", moodTitle: "배터리 키워드", moodItems: ["빈칸 일정", "회복 시간", "자기 리듬"], matchTitle: "찰떡 케미", matchLabel: "조용한 관찰형", matchDescription: "상대도 거리감을 이해해서 함께 있어도 덜 소모될 가능성이 커요.", heroEmoji: "🌙" }
      },
      resultPreview: ["활기 충전형", "깊은 대화형", "조용한 관찰형", "휴식 보존형"],
      relatedIds: ["test-012", "test-005", "test-019"],
      callout: "사람을 좋아하는 것과 사람 속에서 충전되는 것은 의외로 다를 수 있어요. 친구와 비교하면 그 차이가 더 재밌게 보여요."
    }),
    "test-021": makePage({
      category: "컨디션 테스트",
      title: "지금 내 에너지 레벨은?",
      summary: "다섯 가지 반응 중 요즘의 나와 가까운 것을 고르며 현재 에너지 온도를 확인해요.",
      heroCardSubtitle: "지금 나는 몇 칸일까?",
      heroArt: { centerEmoji: "📶", stickers: ["🔋", "☀️", "☕", "🛋️", "🎧", "🌙"] },
      questionLayout: "five-choice",
      loadingMessage: "고른 반응을 모아 지금의 에너지 레벨을 맞춰보고 있어요.",
      questions: [
        { prompt: "아침 알람이 울렸을 때 가장 가까운 반응은?", options: [
          { label: "바로 일어나 오늘 할 일을 떠올린다", scores: { full: 2 } },
          { label: "한 번 미루지만 금방 움직인다", scores: { steady: 2 } },
          { label: "침대에서 오늘 일정을 계산한다", scores: { saving: 2 } },
          { label: "일어났지만 정신은 아직 로딩 중", scores: { low: 2 } },
          { label: "알람과 협상하다 시간이 사라진다", scores: { empty: 2 } }
        ] },
        { prompt: "갑자기 저녁 약속이 생기면?", options: [
          { label: "좋아, 오히려 하루가 재밌어졌다", scores: { full: 2 } },
          { label: "상대와 장소가 괜찮으면 간다", scores: { steady: 2 } },
          { label: "내일 일정부터 보고 정한다", scores: { saving: 2 } },
          { label: "반갑지만 벌써 조금 피곤하다", scores: { low: 2 } },
          { label: "오늘의 나는 집과 이미 약속했다", scores: { empty: 2 } }
        ] },
        { prompt: "해야 할 일이 세 개 겹치면 나는?", options: [
          { label: "순서를 정하고 바로 하나를 끝낸다", scores: { full: 2 } },
          { label: "쉬운 것부터 흐름을 만든다", scores: { steady: 2 } },
          { label: "중요한 것만 남기고 덜어낸다", scores: { saving: 2 } },
          { label: "목록을 보다가 잠깐 멍해진다", scores: { low: 2 } },
          { label: "일단 화면을 닫고 현실을 외면한다", scores: { empty: 2 } }
        ] },
        { prompt: "친구가 고민을 길게 털어놓으면?", options: [
          { label: "끝까지 듣고 같이 방법도 찾아본다", scores: { full: 2 } },
          { label: "공감하며 내가 할 수 있는 만큼 듣는다", scores: { steady: 2 } },
          { label: "오늘 들을 여유가 있는지 먼저 본다", scores: { saving: 2 } },
          { label: "마음은 있는데 집중이 자꾸 흐려진다", scores: { low: 2 } },
          { label: "미안하지만 지금은 내 배터리도 없다", scores: { empty: 2 } }
        ] },
        { prompt: "쉬는 시간이 30분 생기면?", options: [
          { label: "산책이나 작은 볼일을 하나 해낸다", scores: { full: 2 } },
          { label: "좋아하는 영상이나 음악을 즐긴다", scores: { steady: 2 } },
          { label: "아무 일정도 넣지 않고 비워둔다", scores: { saving: 2 } },
          { label: "앉아 있다가 어느새 시간이 끝난다", scores: { low: 2 } },
          { label: "그대로 누워서 세상과 잠깐 끊긴다", scores: { empty: 2 } }
        ] },
        { prompt: "요즘 메시지 답장 속도는?", options: [
          { label: "읽으면 바로 답하고 대화도 이어간다", scores: { full: 2 } },
          { label: "조금 늦어도 무난하게 답한다", scores: { steady: 2 } },
          { label: "중요한 연락부터 골라 답한다", scores: { saving: 2 } },
          { label: "답장을 생각만 하고 놓칠 때가 있다", scores: { low: 2 } },
          { label: "알림 숫자가 이제 배경처럼 보인다", scores: { empty: 2 } }
        ] },
        { prompt: "이번 주 나를 가장 닮은 문장은?", options: [
          { label: "할 만하고, 재밌는 일도 더 찾고 싶다", scores: { full: 2 } },
          { label: "적당히 바쁘지만 내 리듬은 지킨다", scores: { steady: 2 } },
          { label: "쓸 에너지와 아낄 에너지를 구분한다", scores: { saving: 2 } },
          { label: "크게 문제는 없지만 계속 졸린 느낌", scores: { low: 2 } },
          { label: "이번 주는 로딩 화면이 너무 길다", scores: { empty: 2 } }
        ] },
        { prompt: "지금 딱 하나를 받을 수 있다면?", options: [
          { label: "새로운 계획을 시작할 기회", scores: { full: 2 } },
          { label: "기분 좋은 약속 하나", scores: { steady: 2 } },
          { label: "아무도 건드리지 않는 자유 시간", scores: { saving: 2 } },
          { label: "생각 없이 푹 잘 수 있는 밤", scores: { low: 2 } },
          { label: "이번 주를 건너뛰는 리모컨", scores: { empty: 2 } }
        ] }
      ],
      results: {
        full: { title: "에너지 만땅형", summary: "움직일수록 다음 재미가 더 잘 보이는 상태", description: "요즘의 당신은 새로운 일과 사람을 받아들일 여유가 꽤 있어요. 일정이 조금 늘어도 피로보다 기대가 먼저 오는 날이 많아요.", strengths: ["시작 속도가 빠름", "새로운 자극을 잘 받음", "사람과 일 사이 전환이 가벼움"], tip: "에너지가 넉넉한 날의 속도와 표정이 지금 꽤 선명해요.", kukuComment: "지금 너 옆에 있으면 나까지 괜히 바빠질 것 같은데?", moodTitle: "에너지 키워드", moodItems: ["시작", "활기", "호기심"], matchTitle: "같이 놀기 좋은 타입", matchLabel: "안정 유지형", matchDescription: "당신의 추진력과 상대의 고른 리듬이 잘 섞여요.", heroEmoji: "🔋" },
        steady: { title: "안정 유지형", summary: "무리하지 않으면서 일상을 고르게 굴리는 상태", description: "크게 들뜨지도 바닥나지도 않은 채 내 속도를 유지하고 있어요. 필요한 일과 즐거운 일을 적당히 나누는 감각이 살아 있어요.", strengths: ["고른 생활 리듬", "무리 없는 관계 온도", "일상 회복력이 안정적"], tip: "화려하진 않아도 꽤 오래 가는 배터리 모드예요.", kukuComment: "너 은근 오래 가는 타입이네. 배터리 표시가 잘 안 줄어.", moodTitle: "에너지 키워드", moodItems: ["균형", "지속", "평온"], matchTitle: "같이 놀기 좋은 타입", matchLabel: "에너지 만땅형", matchDescription: "상대의 활기가 평온한 리듬에 작은 재미를 더해줘요.", heroEmoji: "🌤️" },
        saving: { title: "선택 절전형", summary: "중요한 곳에만 에너지를 골라 쓰는 상태", description: "지금은 모든 요청에 같은 힘을 쓰기보다 무엇을 남길지 빠르게 고르는 편이에요. 사람과 일정 사이에서 나만의 절전 기준이 분명해요.", strengths: ["우선순위 감각", "거절과 보류의 구분", "에너지 소비를 잘 알아챔"], tip: "꺼진 게 아니라 필요한 순간을 위해 밝기를 낮춘 모드에 가까워요.", kukuComment: "선택적 절전이라더니 좋아하는 얘기 나오면 바로 켜지잖아.", moodTitle: "에너지 키워드", moodItems: ["선택", "절전", "우선순위"], matchTitle: "같이 놀기 좋은 타입", matchLabel: "안정 유지형", matchDescription: "서로 과하게 끌어당기지 않아 편하게 시간을 보낼 수 있어요.", heroEmoji: "🪫" },
        low: { title: "느린 충전형", summary: "움직이고는 있지만 로딩이 평소보다 긴 상태", description: "할 일은 해내도 전환마다 작은 멈춤이 필요한 때예요. 반응이 느린 건 의지가 없어서라기보다 쓸 수 있는 여백이 줄어든 쪽에 가까워요.", strengths: ["내 피로 신호를 알아챔", "꼭 필요한 일은 놓치지 않음", "느린 속도에서도 계속 움직임"], tip: "지금은 빠른 모드보다 한 칸씩 채워지는 화면이 더 닮았어요.", kukuComment: "답장 쓰다 잠든 거 아니지? 아직 커서 깜빡이는 중이지?", moodTitle: "에너지 키워드", moodItems: ["로딩", "느린 전환", "작은 회복"], matchTitle: "같이 놀기 좋은 타입", matchLabel: "선택 절전형", matchDescription: "서로의 남은 에너지를 굳이 설명하지 않아도 알아보기 쉬워요.", heroEmoji: "☕" },
        empty: { title: "완전 방전형", summary: "오늘의 할당량을 이미 꽤 많이 써버린 상태", description: "사소한 선택이나 짧은 답장도 평소보다 무겁게 느껴질 수 있어요. 지금의 당신은 게으른 사람보다 충전 화면을 오래 보고 있는 사람에 가까워요.", strengths: ["바닥 신호가 분명함", "불필요한 자극에서 멀어짐", "혼자 있는 시간의 필요를 잘 앎"], tip: "지금 화면에는 번쩍이는 알림보다 조용한 충전 표시가 더 잘 어울려요.", kukuComment: "오늘은 네가 아니라 충전기 쪽이 주인공인 날이네.", moodTitle: "에너지 키워드", moodItems: ["방전", "무알림", "정지 화면"], matchTitle: "같이 놀기 좋은 타입", matchLabel: "느린 충전형", matchDescription: "말을 많이 하지 않아도 같은 속도로 쉬기 편한 조합이에요.", heroEmoji: "🛌" }
      },
      resultPreview: ["에너지 만땅형", "안정 유지형", "선택 절전형", "느린 충전형", "완전 방전형"],
      relatedIds: ["test-002", "test-019", "test-020"],
      callout: "같은 하루라도 누구는 시작 화면이고 누구는 충전 화면일 수 있어요."
    }),
    "test-022": makePage({
      category: "무드 테스트",
      title: "오늘 끌리는 장면은?",
      summary: "설명보다 먼저 눈길이 가는 장면을 고르며 오늘의 감정 무드를 찾아봐요.",
      heroCardSubtitle: "눈길이 머무는 곳은?",
      heroArt: { centerEmoji: "🖼️", stickers: ["🌊", "🌃", "🌿", "🎡", "☕", "🌙"] },
      questionLayout: "image-grid",
      loadingMessage: "고른 장면의 색과 공기를 이어 오늘의 무드를 만들고 있어요.",
      questions: [
        { prompt: "지금 창문을 열었을 때 보고 싶은 풍경은?", options: [
          { emoji: "🌊", label: "바람 부는 바다", description: "탁 트인 수평선", scores: { open: 2 } },
          { emoji: "🌃", label: "불빛 많은 거리", description: "늦은 밤의 활기", scores: { sparkle: 2 } },
          { emoji: "🌿", label: "조용한 숲길", description: "나뭇잎 사이 그늘", scores: { calm: 2 } },
          { emoji: "🛋️", label: "정돈된 내 방", description: "익숙한 담요와 음악", scores: { cozy: 2 } }
        ] },
        { prompt: "오늘 한 장의 사진을 남긴다면?", options: [
          { emoji: "☁️", label: "넓은 하늘", description: "아무것도 막지 않는 장면", scores: { open: 2 } },
          { emoji: "🎡", label: "놀이공원 불빛", description: "색이 가득한 순간", scores: { sparkle: 2 } },
          { emoji: "🍃", label: "흔들리는 그림자", description: "조용히 움직이는 빛", scores: { calm: 2 } },
          { emoji: "☕", label: "따뜻한 테이블", description: "컵과 작은 디저트", scores: { cozy: 2 } }
        ] },
        { prompt: "마음에 저장하고 싶은 소리는?", options: [
          { emoji: "🌬️", label: "창문을 지나는 바람", description: "멀리 나가는 느낌", scores: { open: 2 } },
          { emoji: "🎵", label: "공연 직전의 음악", description: "곧 시작될 것 같은 떨림", scores: { sparkle: 2 } },
          { emoji: "🌧️", label: "잔잔한 빗소리", description: "생각이 느려지는 리듬", scores: { calm: 2 } },
          { emoji: "📻", label: "작은 라디오 소리", description: "방 안을 채우는 목소리", scores: { cozy: 2 } }
        ] },
        { prompt: "오늘의 색을 하나 고른다면?", options: [
          { emoji: "🩵", label: "맑은 파랑", description: "공간이 넓어지는 색", scores: { open: 2 } },
          { emoji: "❤️", label: "선명한 빨강", description: "시선이 먼저 가는 색", scores: { sparkle: 2 } },
          { emoji: "💚", label: "차분한 초록", description: "숨이 고르게 되는 색", scores: { calm: 2 } },
          { emoji: "🤎", label: "부드러운 갈색", description: "익숙하고 포근한 색", scores: { cozy: 2 } }
        ] },
        { prompt: "잠깐 사라질 수 있다면 어디로?", options: [
          { emoji: "🚆", label: "처음 가는 도시", description: "목적지는 도착해서 정하기", scores: { open: 2 } },
          { emoji: "🎪", label: "사람 많은 축제", description: "웃음과 음악 사이", scores: { sparkle: 2 } },
          { emoji: "🏞️", label: "호수 옆 벤치", description: "말 없이 물결 보기", scores: { calm: 2 } },
          { emoji: "🏠", label: "불 켜진 작은 집", description: "아무도 재촉하지 않는 곳", scores: { cozy: 2 } }
        ] },
        { prompt: "오늘 옆에 두고 싶은 물건은?", options: [
          { emoji: "🗺️", label: "접힌 지도", description: "아직 안 가본 곳 표시하기", scores: { open: 2 } },
          { emoji: "📸", label: "작은 카메라", description: "재밌는 순간 바로 남기기", scores: { sparkle: 2 } },
          { emoji: "📓", label: "빈 노트", description: "떠오르는 생각 천천히 적기", scores: { calm: 2 } },
          { emoji: "🧸", label: "오래된 인형", description: "익숙한 촉감 곁에 두기", scores: { cozy: 2 } }
        ] },
        { prompt: "하루 끝에 걷고 싶은 길은?", options: [
          { emoji: "🌉", label: "강 위의 긴 다리", description: "밤공기와 넓은 시야", scores: { open: 2 } },
          { emoji: "🏙️", label: "네온사인 골목", description: "아직 끝나지 않은 하루", scores: { sparkle: 2 } },
          { emoji: "🌲", label: "가로수 사이 산책로", description: "발소리만 들리는 길", scores: { calm: 2 } },
          { emoji: "🏡", label: "집 앞 익숙한 골목", description: "곧 도착한다는 안도감", scores: { cozy: 2 } }
        ] },
        { prompt: "지금 가장 머물고 싶은 장면은?", options: [
          { emoji: "🛫", label: "이륙 직전 창가", description: "어디든 갈 수 있는 순간", scores: { open: 2 } },
          { emoji: "🎆", label: "불꽃이 터지는 밤", description: "짧고 선명한 장면", scores: { sparkle: 2 } },
          { emoji: "🌙", label: "달빛 든 빈 방", description: "생각이 가라앉는 시간", scores: { calm: 2 } },
          { emoji: "🕯️", label: "작은 조명 아래", description: "내 것들에 둘러싸인 자리", scores: { cozy: 2 } }
        ] }
      ],
      results: {
        open: { title: "바람 환기형", summary: "넓은 장면과 새로운 공기가 필요한 오늘", description: "오늘은 익숙한 화면보다 시야가 트이는 장면에 마음이 먼저 가요. 멀리 가고 싶다기보다, 잠깐이라도 다른 공기로 바뀌는 순간이 끌리는 날이에요.", strengths: ["새로운 풍경에 빠르게 반응함", "공간이 바뀌면 기분도 잘 전환됨", "가능성이 열린 장면을 좋아함"], tip: "오늘의 시선은 닫힌 결론보다 열린 창문 쪽에 더 오래 머물러요.", kukuComment: "지도만 펼쳤는데 벌써 마음은 한 정거장 먼저 갔네.", moodTitle: "장면 키워드", moodItems: ["바람", "수평선", "이동"], matchTitle: "함께 보고 싶은 장면", matchLabel: "포근한 귀가형", matchDescription: "멀리 본 뒤 편하게 돌아올 자리가 있는 조합이에요.", heroEmoji: "🌊" },
        sparkle: { title: "반짝 점화형", summary: "선명한 색과 재밌는 사건이 당기는 오늘", description: "오늘은 조용히 지나가는 장면보다 한 번 더 돌아보게 되는 빛과 소리에 마음이 움직여요. 평범한 하루 안에서도 작은 사건 하나를 기다리는 무드예요.", strengths: ["재밌는 순간을 잘 발견함", "사람과 분위기에서 에너지를 얻음", "선명한 기억을 남기고 싶어함"], tip: "오늘의 시선은 설명보다 먼저 반짝이는 것에 솔직하게 반응해요.", kukuComment: "조용히 고르라니까 제일 반짝이는 걸 바로 집었네.", moodTitle: "장면 키워드", moodItems: ["불빛", "사건", "설렘"], matchTitle: "함께 보고 싶은 장면", matchLabel: "고요한 관찰형", matchDescription: "당신의 반짝임과 상대의 차분함이 장면을 더 오래 남겨줘요.", heroEmoji: "🎡" },
        calm: { title: "고요 관찰형", summary: "작은 움직임과 잔잔한 공기가 편한 오늘", description: "오늘은 큰 자극보다 빛의 변화나 작은 소리처럼 천천히 알아차리는 장면이 끌려요. 마음이 조용한 쪽으로 기울며 주변을 세밀하게 보고 있어요.", strengths: ["미묘한 분위기를 잘 느낌", "천천히 머무는 시간을 좋아함", "작은 변화에서 의미를 찾음"], tip: "오늘의 장면은 빠르게 넘기기보다 한 프레임 오래 보는 쪽에 가까워요.", kukuComment: "아무 말 없는 장면 골라놓고 속으로는 제일 많이 보고 있지?", moodTitle: "장면 키워드", moodItems: ["그늘", "빗소리", "정적"], matchTitle: "함께 보고 싶은 장면", matchLabel: "반짝 점화형", matchDescription: "상대의 생동감이 고요한 화면에 재미있는 초점을 더해줘요.", heroEmoji: "🌿" },
        cozy: { title: "포근한 귀가형", summary: "익숙한 온도와 안전한 자리가 끌리는 오늘", description: "오늘은 새로운 곳보다 나를 이미 잘 아는 공간에 마음이 가요. 익숙한 물건과 작은 조명처럼 긴 설명 없이 편안해지는 장면을 찾고 있어요.", strengths: ["나를 편하게 하는 요소를 잘 앎", "익숙한 공간에서 회복이 빠름", "부드러운 온도와 촉감을 좋아함"], tip: "오늘의 시선은 멀리 있는 이벤트보다 가까운 온기를 먼저 찾아요.", kukuComment: "결국 제일 좋은 자리는 네 담요 옆이었구나.", moodTitle: "장면 키워드", moodItems: ["온기", "익숙함", "귀가"], matchTitle: "함께 보고 싶은 장면", matchLabel: "바람 환기형", matchDescription: "상대의 새로운 공기가 익숙한 하루에 가벼운 환기를 만들어줘요.", heroEmoji: "🛋️" }
      },
      resultPreview: ["바람 환기형", "반짝 점화형", "고요 관찰형", "포근한 귀가형"],
      relatedIds: ["test-014", "test-018", "test-015"],
      callout: "같은 사진을 봐도 먼저 들어오는 색과 소리는 사람마다 꽤 달라요."
    }),
    "test-023": makePage({
      category: "라이프 테스트",
      title: "요즘 내 여유 잔량은?",
      summary: "일상 반응에 점수를 쌓아 마음에 남은 여백을 확인하는 점수 누적형 테스트예요.",
      heroCardSubtitle: "마음에 빈칸이 남았을까?",
      heroArt: { centerEmoji: "🫙", stickers: ["🫧", "📅", "🎧", "🌙", "☕", "💬"] },
      scoringMode: "range-total",
      loadingMessage: "일상에 남은 작은 빈칸을 모아 여유 잔량을 계산하고 있어요.",
      questions: [
        { prompt: "예정에 없던 부탁이 들어오면?", options: [
          { label: "흥미로우면 기꺼이 해본다", points: 3 }, { label: "일정을 보고 가능하면 한다", points: 2 }, { label: "미루거나 범위를 줄여서 한다", points: 1 }, { label: "듣는 순간 마음부터 꽉 막힌다", points: 0 }
        ] },
        { prompt: "카페에서 주문을 기다리는 몇 분 동안?", options: [
          { label: "주변을 구경하며 그냥 기다린다", points: 3 }, { label: "메시지 한두 개를 확인한다", points: 2 }, { label: "할 일을 떠올리며 마음이 급해진다", points: 1 }, { label: "왜 이렇게 오래 걸리지 싶어진다", points: 0 }
        ] },
        { prompt: "친구의 긴 메시지를 받으면?", options: [
          { label: "천천히 읽고 내 생각도 길게 보낸다", points: 3 }, { label: "읽고 여유 있을 때 답한다", points: 2 }, { label: "핵심만 보고 짧게 반응한다", points: 1 }, { label: "알림만 봐도 답장 숙제가 생긴 느낌", points: 0 }
        ] },
        { prompt: "하루 계획이 조금 어긋났을 때?", options: [
          { label: "그럴 수도 있지 하고 새 흐름을 탄다", points: 3 }, { label: "중요한 일정만 다시 맞춘다", points: 2 }, { label: "괜찮은 척하지만 계속 신경 쓰인다", points: 1 }, { label: "하나 틀어지면 하루 전체가 망한 느낌", points: 0 }
        ] },
        { prompt: "요즘 식사 시간은 어떤 편?", options: [
          { label: "천천히 먹으며 맛도 잘 느낀다", points: 3 }, { label: "보통 속도로 무난하게 챙긴다", points: 2 }, { label: "다음 일을 생각하며 빠르게 먹는다", points: 1 }, { label: "끼니를 놓치거나 대충 넘길 때가 많다", points: 0 }
        ] },
        { prompt: "재밌어 보이는 영상이나 글을 발견하면?", options: [
          { label: "지금 멈춰서 끝까지 즐긴다", points: 3 }, { label: "저장해두고 실제로 나중에 본다", points: 2 }, { label: "저장은 하지만 대부분 쌓여간다", points: 1 }, { label: "재밌어 보여도 볼 힘이 없다", points: 0 }
        ] },
        { prompt: "주말에 빈 시간이 생기면?", options: [
          { label: "하고 싶던 일을 떠올리며 신난다", points: 3 }, { label: "푹 쉬거나 가볍게 나간다", points: 2 }, { label: "밀린 일을 처리해야 마음이 놓인다", points: 1 }, { label: "누워만 있다가 끝나도 회복이 안 된다", points: 0 }
        ] },
        { prompt: "지금 내 머릿속 화면에 가장 가까운 건?", options: [
          { label: "창이 몇 개만 열린 깔끔한 화면", points: 3 }, { label: "필요한 창이 적당히 열린 화면", points: 2 }, { label: "탭이 많지만 아직 버틸 만한 화면", points: 1 }, { label: "어디서 소리가 나는지도 모르는 화면", points: 0 }
        ] }
      ],
      resultRanges: [
        { min: 19, max: 24, key: "wide" },
        { min: 13, max: 18, key: "room" },
        { min: 7, max: 12, key: "tight" },
        { min: 0, max: 6, key: "packed" }
      ],
      results: {
        wide: { title: "여백 넉넉형", summary: "예상 밖의 일도 잠깐 구경할 공간이 남은 상태", description: "요즘의 당신은 일정과 감정 사이에 작은 빈칸이 꽤 남아 있어요. 갑작스러운 변화가 와도 바로 밀려나기보다 한 번 보고 고를 수 있는 여유가 있어요.", strengths: ["기다림을 크게 불편해하지 않음", "예정 밖 재미를 받아들일 수 있음", "일상 속 감각이 비교적 또렷함"], tip: "지금은 빈칸이 낭비보다 재미가 들어올 자리처럼 보여요.", kukuComment: "네 일정표에는 낙서할 칸도 남아 있네. 좀 부럽다.", moodTitle: "여유 키워드", moodItems: ["빈칸", "느린 식사", "예정 밖 재미"], matchTitle: "비슷한 리듬", matchLabel: "숨통 한 칸형", matchDescription: "서로 급하게 결론 내리지 않아 편하게 시간을 보내기 좋아요.", heroEmoji: "🫙" },
        room: { title: "숨통 한 칸형", summary: "바쁘지만 내가 고를 수 있는 작은 공간은 남은 상태", description: "할 일은 많아도 모든 순간에 쫓기지는 않아요. 중요한 것과 미뤄도 되는 것을 나누며 일상에 한 칸 정도의 숨통을 남겨두는 편이에요.", strengths: ["우선순위를 조절함", "작은 휴식을 실제로 사용함", "변화에 어느 정도 유연함"], tip: "꽉 차기 직전에도 한 칸을 남기는 감각이 요즘의 당신과 닮았어요.", kukuComment: "한 칸 남겨둔 거 내가 간식 놓는 자리로 써도 돼?", moodTitle: "여유 키워드", moodItems: ["한 칸", "조절", "짧은 휴식"], matchTitle: "비슷한 리듬", matchLabel: "여백 넉넉형", matchDescription: "상대의 느긋함이 남은 한 칸을 더 편하게 지켜줘요.", heroEmoji: "🫧" },
        tight: { title: "빽빽 일정형", summary: "일상은 굴러가지만 작은 변수에도 화면이 복잡해지는 상태", description: "필요한 일은 해내고 있지만 예상 밖의 요청이 끼어들 공간은 넓지 않아요. 쉬는 순간에도 다음 할 일을 떠올리며 머릿속 탭이 계속 열려 있는 편이에요.", strengths: ["바쁜 중에도 기본 일정을 유지함", "중요한 일을 놓치지 않음", "부족한 여유를 빠르게 알아챔"], tip: "요즘 화면은 고장 난 게 아니라 열린 탭이 유난히 많은 쪽에 가까워요.", kukuComment: "탭 하나 닫으면 다른 데서 두 개가 열리는 마술 중이지?", moodTitle: "여유 키워드", moodItems: ["열린 탭", "다음 일정", "짧은 답장"], matchTitle: "비슷한 리듬", matchLabel: "숨통 한 칸형", matchDescription: "상대의 작은 여백이 복잡한 흐름을 잠깐 느슨하게 해줘요.", heroEmoji: "📚" },
        packed: { title: "여백 실종형", summary: "쉬는 시간까지 다른 일의 꼬리표가 따라오는 상태", description: "지금은 짧은 기다림이나 메시지 하나도 새 할 일처럼 느껴질 수 있어요. 해야 할 일보다 그것들이 동시에 떠 있는 상태 자체가 더 무겁게 다가오는 때예요.", strengths: ["과부하 신호가 분명함", "핵심만 남기려는 감각", "지금의 상태를 숨기기 어려울 만큼 솔직함"], tip: "오늘의 화면에는 새 탭보다 잠깐의 빈 화면이 더 잘 어울려요.", kukuComment: "여유가 실종됐는데 마지막 목격 장소가 네 일정표래.", moodTitle: "여유 키워드", moodItems: ["과부하", "알림 피로", "빈 화면"], matchTitle: "비슷한 리듬", matchLabel: "빽빽 일정형", matchDescription: "서로 긴 설명 없이도 지금 복잡한 상태를 알아보기 쉬워요.", heroEmoji: "🗂️" }
      },
      resultPreview: ["여백 넉넉형", "숨통 한 칸형", "빽빽 일정형", "여백 실종형"],
      relatedIds: ["test-004", "test-016", "test-002"],
      callout: "여유는 시간이 많고 적은 것보다, 갑작스러운 한 가지가 들어올 자리가 있는지에 더 가까워요."
    })
  };

  const productGroups = {
    beauty: {
      label: "뷰티 소품",
      summary: "설렘, 첫인상, 자기표현 무드와 자연스럽게 이어지는 가벼운 추천군",
      products: ["틴트", "립밤", "미니 향수"]
    },
    rest: {
      label: "회복·휴식",
      summary: "피로 회복과 감정 정리에 잘 붙는 편안한 셀프케어 추천군",
      products: ["수면안대", "온열팩", "허브차"]
    },
    travel: {
      label: "여행·외출",
      summary: "가볍게 챙기기 좋고 테스트 무드와도 잘 맞는 외출 추천군",
      products: ["파우치", "텀블러", "여행 보틀"]
    },
    focus: {
      label: "집중·루틴",
      summary: "루틴을 만들거나 몰입을 돕는 데 어울리는 실용 추천군",
      products: ["스터디 타이머", "플래너", "데스크 소품"]
    },
    relation: {
      label: "관계·선물",
      summary: "친구와 공유하거나 가볍게 선물하기 좋은 감정 연결 추천군",
      products: ["키링", "포토앨범", "미니 선물템"]
    },
    mood: {
      label: "무드·공간",
      summary: "공간 감성과 정서 무드를 살려주는 홈 라이프 추천군",
      products: ["디퓨저", "무드등", "캔들"]
    },
    digital: {
      label: "디지털 소품",
      summary: "바로 쓰기 좋고 클릭 부담이 낮은 데일리 디지털 추천군",
      products: ["보조배터리", "이어폰", "거치대"]
    }
  };

  const homeAdSlots = {
    leftRail: {
      slotId: "home-left-rail",
      heading: "쿠쿠 추천 · 뷰티 소품",
      description: "연애, 성향 테스트와 잘 어울리는 가벼운 뷰티 아이템을 먼저 배치합니다.",
      products: productGroups.beauty.products,
      sizeLabel: "160 x 600",
      showCopy: false,
      coupangDynamic: { id: 989212, template: "carousel", trackingCode: "AF1716783", width: "160", height: "600" }
    },
    rightRail: {
      slotId: "home-right-rail",
      heading: "쿠쿠 추천 · 디지털 소품",
      description: "모바일 사용자에게 잘 맞는 보조배터리, 이어폰, 거치대 계열을 추천합니다.",
      products: productGroups.digital.products,
      sizeLabel: "160 x 600",
      showCopy: false,
      coupangDynamic: { id: 989213, template: "carousel", trackingCode: "AF1716783", width: "160", height: "600" }
    },
    bottomBanner: {
      slotId: "home-bottom-banner",
      heading: "쿠쿠 추천 · 회복 루틴 아이템",
      description: "홈 최하단은 계절성과 상관없이 무난하게 클릭되는 휴식·회복 상품군으로 시작합니다.",
      products: productGroups.rest.products,
      sizeLabel: "728 x 90",
      showCopy: false,
      coupangDynamic: { id: 989227, template: "carousel", trackingCode: "AF1716783", width: "728", height: "90" }
    }
  };

  const testGroupMap = {
    "test-001": { start: "beauty", journey: "beauty", result: "beauty" },
    "test-002": { start: "rest", journey: "rest", result: "rest" },
    "test-003": { start: "travel", journey: "travel", result: "travel" },
    "test-004": { start: "focus", journey: "focus", result: "focus" },
    "test-005": { start: "relation", journey: "relation", result: "relation" },
    "test-006": { start: "mood", journey: "rest", result: "mood" },
    "test-007": { start: "beauty", journey: "beauty", result: "beauty" },
    "test-008": { start: "beauty", journey: "beauty", result: "beauty" },
    "test-009": { start: "focus", journey: "focus", result: "digital" },
    "test-010": { start: "digital", journey: "digital", result: "relation" },
    "test-011": { start: "focus", journey: "digital", result: "focus" },
    "test-012": { start: "rest", journey: "rest", result: "mood" },
    "test-013": { start: "beauty", journey: "beauty", result: "beauty" },
    "test-014": { start: "mood", journey: "digital", result: "mood" },
    "test-015": { start: "mood", journey: "mood", result: "mood" },
    "test-016": { start: "digital", journey: "focus", result: "digital" },
    "test-017": { start: "beauty", journey: "relation", result: "beauty" },
    "test-018": { start: "mood", journey: "mood", result: "mood" },
    "test-019": { start: "rest", journey: "rest", result: "digital" },
    "test-020": { start: "relation", journey: "rest", result: "digital" },
    "test-021": { start: "rest", journey: "rest", result: "digital" },
    "test-022": { start: "mood", journey: "mood", result: "mood" },
    "test-023": { start: "focus", journey: "rest", result: "rest" },
    "test-024": { start: "focus", journey: "focus", result: "digital" },
    "test-025": { start: "rest", journey: "rest", result: "rest" }
  };

  const placementMeta = {
    start: {
      title: "시작 화면 추천",
      prefix: "테스트 시작 전 가볍게 보기 좋은"
    },
    journey: {
      title: "진행 중 추천",
      prefix: "질문 흐름을 크게 해치지 않게 붙일"
    },
    result: {
      title: "결과 화면 추천",
      prefix: "결과 확인 후 자연스럽게 이어보기 좋은"
    }
  };

  function buildTestSlot(testId, placement, groupKey) {
    const group = productGroups[groupKey];
    const placementInfo = placementMeta[placement];

    return {
      slotId: `${testId}-${placement}`,
      heading: `${placementInfo.title} · ${group.label}`,
      description: `${placementInfo.prefix} ${group.label} 상품군입니다.`,
      products: group.products,
      sizeLabel: "728 x 90"
    };
  }

  const testAdSlots = Object.fromEntries(
    Object.entries(testGroupMap).map(([testId, placements]) => [
      testId,
      {
        start: buildTestSlot(testId, "start", placements.start),
        journey: buildTestSlot(testId, "journey", placements.journey),
        result: buildTestSlot(testId, "result", placements.result)
      }
    ])
  );

  Object.values(testAdSlots).forEach((slots) => {
    ["start", "journey", "result"].forEach((placement) => {
      slots[placement].coupangDynamic = {
        id: 989147,
        template: "carousel",
        trackingCode: "AF1716783",
        width: "680",
        height: "110"
      };
    });
  });

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

  // Editorial additions belong beside the question/result source, not in generated pages.
  // Each row is a concrete scene, a blind spot and one small action for that result.
  const resultStories = {
    "test-001": {
      engine: ["주말에 가고 싶은 곳을 발견하면 링크를 보내는 데서 끝나지 않아요. 언제 갈지 묻고 첫 약속까지 연결해두는 장면이 잘 어울려요.", "상대가 생각하는 시간까지 무관심으로 읽으면 혼자 서둘렀다고 느낄 수 있어요. 제안에 대한 답과 관계의 답을 구분해보세요.", "다음 데이트는 후보 두 개를 제안하고 마지막 선택은 상대에게 맡겨보세요."],
      station: ["만남이 끝나면 잘 들어갔는지 확인하고 다음에 볼 날짜를 천천히 잡아요. 특별한 이벤트보다 약속한 시간에 나타나는 일이 더 자연스러워요.", "늘 같은 안정감이 상대에게는 마음이 식은 것처럼 보일 수도 있어요. 익숙한 행동의 의미를 말로 전하면 오해를 줄일 수 있어요.", "평소 하던 배려 하나에 ‘너랑 오래 잘 지내고 싶어서’라는 이유를 붙여보세요."],
      guide: ["상대가 말수가 줄면 무슨 일이 있었는지 먼저 살펴요. 해결책을 내기 전에 오늘 이야기를 더 듣고 싶다고 말하는 쪽에 가까워요.", "상대의 기분에 맞추다 보면 내가 원했던 데이트나 대화가 뒤로 밀릴 수 있어요. 편하게 해주는 역할을 늘 혼자 맡을 필요는 없어요.", "오늘은 상대에게 묻기 전에 내가 하고 싶은 것 한 가지를 먼저 말해보세요."],
      signal: ["짧은 메시지를 바로 결론 내리지 않고 최근의 분위기와 함께 읽어요. 마음을 정할 때도 한 번의 설렘보다 여러 번의 장면을 떠올려요.", "관찰만 길어지면 상대는 당신이 아무 생각도 없다고 오해할 수 있어요. 아직 확신이 없다는 상태도 나눌 수 있는 마음이에요.", "완벽한 고백 대신 ‘오늘 같이 있어서 좋았어’처럼 확인된 마음 하나만 전해보세요."]
    },
    "test-002": {
      sprint: ["급한 요청이 오면 우선 내가 처리하고 나중에 쉬자는 쪽으로 움직여요. 일이 끝나도 다음 요청이 들어와 휴식이 뒤로 밀리는 장면이 떠올라요.", "처리한 일이 많다는 것과 오늘 쓸 힘이 남았다는 것은 다른 이야기예요. 해낼 수 있어도 맡지 않을 일을 골라도 괜찮아요.", "오늘 업무가 끝나는 시간을 적고 그 뒤의 요청 하나는 다음 날로 조정해보세요."],
      buffer: ["바쁜 날에도 점심을 천천히 먹거나 동료와 잠깐 웃을 자리를 찾아요. 일의 속도가 너무 거칠어지면 중간에 작은 쉼표를 놓는 쪽이에요.", "주변 분위기를 부드럽게 만드는 동안 내 피로를 작게 말하고 넘길 수도 있어요. 모두가 괜찮아 보여도 내 상태는 따로 살펴보세요.", "퇴근 전에 오늘 유난히 힘들었던 순간과 편했던 순간을 한 줄씩 남겨보세요."],
      reset: ["일이 몰리는 날에는 쉬는 시간도 미리 정해둬요. 산책, 샤워, 일찍 눕기처럼 업무 화면을 끄는 나만의 순서가 떠오르는 편이에요.", "쉬는 계획을 지키지 못한 날까지 실패로 세면 휴식도 숙제가 될 수 있어요. 회복 루틴은 평가표보다 선택지로 두어도 좋아요.", "계획이 틀어진 날에도 할 수 있는 가장 짧은 휴식 한 가지를 정해두세요."],
      alert: ["메신저 알림만 봐도 답할 일이 먼저 떠오르고, 퇴근 뒤의 작은 결정까지 귀찮게 느껴지는 날이 선택에 담겨 있어요.", "이 결과만으로 건강 상태나 원인을 알 수는 없어요. 평소와 다른 어려움이 이어진다면 테스트 설명보다 실제 상태를 우선해 살펴주세요.", "이번 주 일정에서 미룰 수 있는 일 하나를 골라 상대에게 조정을 요청해보세요."]
    },
    "test-003": {
      planner: ["출발 전 지도에 식당과 이동 시간을 저장해둬요. 현지에서는 어디로 갈지 다투기보다 이미 알아둔 선택지에서 고르는 순간이 편해요.", "준비한 장소를 모두 방문하려다 지금 눈앞의 좋은 풍경을 놓칠 수 있어요. 계획은 여행을 돕는 도구이지 완주 목록은 아니에요.", "다음 일정표에 목적지를 정하지 않은 한 시간을 남겨보세요."],
      explorer: ["걷다가 흥미로운 골목을 보면 지도에서 잠깐 벗어나요. 예약한 식당보다 우연히 발견한 가게 이야기를 오래 들려주는 쪽이에요.", "내게 즐거운 즉흥성이 동행에게는 이동과 대기의 부담일 수 있어요. 방향을 바꾸기 전에 남은 체력과 비용도 함께 물어보세요.", "떠나기 전 동행과 ‘꼭 지킬 예약 한 개’만 합의해두세요."],
      comfort: ["여행지를 고를 때 전망만큼 침대와 이동 거리를 살펴요. 일정 사이에 숙소로 돌아와 쉬는 시간을 넣으면 다음 장면도 더 즐기기 편해요.", "불편할 가능성을 모두 피하려면 선택지가 너무 좁아질 수 있어요. 짧고 되돌아오기 쉬운 새 경험부터 골라보세요.", "숙소 근처에서 처음 먹어보는 메뉴나 가게 한 곳만 정해보세요."],
      local: ["유명 명소의 줄보다 동네 빵집의 아침이 궁금해요. 여행 사진에도 간판, 버스 정류장, 산책길 같은 일상적인 장면이 남기 쉬워요.", "천천히 머무는 방식이 모두에게 같은 즐거움은 아닐 수 있어요. 동행이 꼭 보고 싶은 대표 장소도 일정에 한 칸 마련해보세요.", "한 동네에서 오래 머무를 시간과 동행의 필수 방문지 하나를 함께 정해보세요."]
    },
    "test-004": {
      timer: ["큰 과제도 오늘 할 분량과 멈출 시간을 나누면 시작하기 쉬워요. 시간이 끝났을 때 어디까지 했는지 보이는 작업 방식이 잘 어울려요.", "타이머를 지키는 데 몰두하면 막 풀리기 시작한 문제를 너무 일찍 끊을 수 있어요. 시간과 실제 진도 중 무엇이 필요한지 살펴보세요.", "다음 작업은 한 구간만 정하고, 끝날 때 이어 할 첫 문장을 적어두세요."],
      diver: ["관심 있는 자료를 열면 관련 문서를 계속 따라가요. 시작은 늦어도 흐름을 타면 주변 소리보다 지금 푸는 문제에 오래 머무는 편이에요.", "깊이 파고든 시간이 곧 필요한 결과와 같지는 않아요. 식사나 다른 약속을 놓치지 않도록 중간에 확인할 표식이 있으면 좋아요.", "작업 전에 오늘 필요한 결과 한 개와 잠깐 멈춰볼 시간을 적어두세요."],
      ritual: ["늘 쓰는 음료를 놓고 책상을 정리한 뒤 파일을 열어요. 그 순서가 맞으면 해야 할 일과 쉬는 시간의 경계가 또렷해지는 편이에요.", "평소 자리나 도구가 없다는 이유로 시작이 계속 미뤄질 수 있어요. 좋은 환경을 기다리기보다 최소한의 조건을 남겨보세요.", "밖에서도 할 수 있는 준비 동작 하나와 5분짜리 시작 작업을 골라보세요."],
      spark: ["같은 문서를 오래 볼 때보다 다른 방식의 예시를 만나면 아이디어가 붙어요. 새 질문이나 도구를 시험하는 순간에 속도가 살아나는 편이에요.", "흥미로운 시작이 여러 개 쌓이면 정작 끝난 일은 적어질 수 있어요. 새 아이디어를 버리기보다 지금 할 일과 따로 모아두세요.", "새 아이디어는 메모에 옮기고 지금 작업의 완료 기준 한 개만 체크해보세요."]
    },
    "test-005": {
      manager: ["단체 약속에서 예약과 정산을 누가 할지 비어 있으면 자연스럽게 손이 가요. 친구들이 편하게 만날 수 있게 뒤에서 흐름을 연결해요.", "매번 알아서 해주면 친구들은 그 역할이 힘든지 모를 수 있어요. 서운함이 쌓이기 전에 이번에 맡고 싶은 범위를 알려주세요.", "다음 약속에서 예약과 정산 중 한 가지는 다른 친구에게 부탁해보세요."],
      listener: ["여러 명이 웃고 있어도 조용해진 친구에게 눈이 가요. 집에 돌아온 뒤 괜찮았는지 따로 메시지를 보내는 장면이 잘 어울려요.", "들어주는 시간이 길수록 내 이야기를 꺼낼 타이밍을 놓칠 수 있어요. 공감받고 싶은 날이라는 신호를 직접 주어도 괜찮아요.", "친구에게 ‘오늘은 내 얘기도 조금 들어줄래?’라고 먼저 말해보세요."],
      spark: ["처음 만난 친구들이 어색해하면 공통 화제나 가벼운 농담을 꺼내요. 모임을 떠올릴 때 무슨 이야기에 같이 웃었는지 먼저 생각나요.", "늘 재미있는 사람이어야 한다고 생각하면 조용한 날의 나를 숨길 수 있어요. 모임의 공기를 매번 혼자 책임질 필요는 없어요.", "다음 만남에는 억지로 화제를 만들기보다 친구의 이야기에 잠깐 기대보세요."],
      free: ["급하게 산책하자는 제안에도 부담 없이 합류해요. 꼭 무엇을 해야 한다는 규칙보다 같이 있는 시간이 편한 관계를 좋아해요.", "편한 사이라도 연락 없이 계획이 바뀌면 상대는 기다릴 수 있어요. 자유로운 선택과 서로 알아야 할 약속은 나누어 챙겨보세요.", "당일 계획이 바뀌면 출발 전에 한 줄로 알려주는 약속을 정해보세요."]
    },
    "test-006": {
      cocoon: ["금요일 밤에는 다음 날 알람을 끄는 것부터 기분이 좋아져요. 익숙한 잠옷과 간식, 보던 콘텐츠가 있는 집에서 주말의 실감이 나요.", "편안해서 남은 시간과 아쉬워서 흘려보낸 시간은 느낌이 달라요. 남이 정한 알찬 주말보다 내가 만족했는지부터 물어보세요.", "집에서 하고 싶은 일 하나를 고르고 짧게 창밖 공기도 느껴보세요."],
      social: ["주말 일정에 좋아하는 사람 이름이 하나 들어 있으면 기대가 생겨요. 만나서 별일 아닌 이야기를 나눈 뒤 오히려 기분이 가벼워지는 편이에요.", "빈 일정이 아쉬워 모든 제안을 받으면 즐거운 만남도 의무처럼 느껴질 수 있어요. 사람 없는 시간까지 미리 배정해도 괜찮아요.", "이번 주말 약속 사이에 이동도 연락도 없는 한 시간을 비워보세요."],
      reset: ["빨래나 장보기처럼 다음 주의 나를 돕는 일을 끝내면 마음이 놓여요. 늦잠과 외출 어느 한쪽으로 몰리지 않는 하루가 편한 쪽이에요.", "다음 주 준비만 하다 보면 이번 주말에 하고 싶었던 일은 빠질 수 있어요. 정돈된 하루와 재미있었던 하루를 함께 챙겨보세요.", "주말 할 일 목록에 꼭 하지 않아도 되는 즐거움 하나를 넣어보세요."],
      roam: ["목적지가 없어도 운동화를 신고 동네를 한 바퀴 돌고 싶어져요. 새로 생긴 가게나 달라진 나무를 보고 돌아오는 시간이 잘 어울려요.", "밖으로 나가는 일이 또 하나의 의무가 되면 쉬는 의미가 흐려져요. 컨디션이 낮은 날에는 짧게 돌아와도 충분해요.", "오늘은 익숙한 길에서 한 블록만 다르게 걸어보세요."]
    },
    "test-007": {
      spark: ["재미있는 이야기가 떠오르면 다음 날까지 아껴두지 않고 바로 보내요. 대화가 즐거웠다면 다음 만남도 구체적으로 제안하고 싶어져요.", "빠른 답장이 내게 편하다고 상대에게도 편한 것은 아니에요. 답이 늦는 한 장면만으로 호감을 단정하지 않으면 대화가 덜 급해져요.", "질문을 연달아 보내기 전에 상대가 답할 자리를 한 번 남겨보세요."],
      steady: ["어제 나눈 이야기를 오늘 가볍게 이어가요. 특별히 꾸미지 않은 일상 이야기도 서로 편하게 주고받을 때 호감이 쌓이는 편이에요.", "늘 편한 톤만 유지하면 친구로만 느끼는지 상대가 헷갈릴 수 있어요. 좋은 분위기를 깨지 않고도 마음을 조금 더 또렷하게 말할 수 있어요.", "평소 안부에 ‘너랑 얘기하니까 좋다’라는 진심 한 줄을 더해보세요."],
      tease: ["별것 아닌 표현을 둘만의 별명으로 바꾸고 지난 농담을 다시 꺼내요. 서로 웃는 순간을 만들 때 거리도 가까워졌다고 느끼기 쉬워요.", "농담에 담은 호감이 늘 전달되지는 않아요. 상대가 진지한 이야기를 꺼낼 때까지 장난으로 돌리면 중요한 마음이 가려질 수 있어요.", "다음 대화에서는 농담 뒤에 고마웠던 점 하나를 장난 없이 붙여보세요."],
      calm: ["답장을 쓰기 전 앞선 이야기를 다시 보고 말투를 골라요. 메시지가 많기보다 서로의 관심사가 이어지는 대화에 마음이 가요.", "신중하게 고른 짧은 답이 상대에게는 거리감으로 읽힐 수도 있어요. 조심스럽다는 이유로 반가운 마음까지 줄일 필요는 없어요.", "답장 첫 문장에 ‘그 얘기 궁금했어’처럼 반가움을 직접 적어보세요."]
    },
    "test-008": {
      glow: ["처음 모임에서는 조용해도 다음에 만날 때 지난 이야기를 기억해요. 사소한 취향을 챙긴 행동이 뒤늦게 떠오르는 매력과 닮았어요.", "알아주기를 기다리기만 하면 새로운 관계에서는 당신의 장점이 보일 기회가 적어요. 배려와 함께 나에 대한 작은 이야기도 건네보세요.", "다음 만남에서 요즘 좋아하는 것 하나를 먼저 소개해보세요."],
      comfort: ["친구가 특별한 이유 없이도 옆자리에 앉고 싶은 사람에 가까워요. 무슨 말을 해야 한다는 부담 없이 같이 있는 시간을 편하게 만들어요.", "누구에게나 괜찮다고만 말하면 내 기준이 없는 사람처럼 보일 수 있어요. 편안함 속에서도 좋아하는 것과 싫은 것은 분명히 말해도 돼요.", "오늘 선택 하나는 ‘나는 이게 좋아’라고 이유까지 말해보세요."],
      wit: ["무거운 이야기를 가볍게 풀어주는 비유나 상황에 맞는 한마디가 떠올라요. 큰 목소리보다 정확한 타이밍으로 기억되는 장면이 어울려요.", "센스 있게 넘어가는 말이 내 감정을 대신할 때도 있어요. 웃음을 만들지 않아도 충분히 나눌 가치가 있는 이야기가 있어요.", "웃긴 이야기 하나를 나눈 뒤 요즘 신경 쓰이는 일도 짧게 꺼내보세요."],
      mystery: ["조용히 지내다가 의외의 취미나 취향이 하나씩 드러나요. 처음의 인상과 다른 면을 알아갈수록 더 궁금해지는 분위기에 가까워요.", "설명하지 않은 부분은 멋진 여백이기도 하지만 상대가 다가갈 길이 없는 벽이 될 수도 있어요. 대화의 입구는 하나 열어두세요.", "취미 사진 한 장을 보여주고 왜 좋아하는지 한 문장만 들려주세요."]
    },
    "test-009": {
      logic: ["선택지가 생기면 가격, 시간, 조건부터 나란히 놓아요. 누가 추천했는지보다 내 상황에 맞는 근거가 있는지 알아본 뒤 결정하는 편이에요.", "비교 항목이 늘어날수록 작은 선택도 큰 과제가 될 수 있어요. 되돌릴 수 있는 결정이라면 정보가 조금 부족해도 시도할 여지가 있어요.", "오늘의 작은 선택 하나는 기준 두 개와 고민할 시간만 정해보세요."],
      gut: ["설명을 다 듣기 전에도 어떤 쪽이 끌리는지 감이 오는 편이에요. 사람과 장소의 분위기처럼 표로 만들기 어려운 단서를 선택에 반영해요.", "익숙함에서 오는 편안함을 좋은 선택의 증거로 착각할 수 있어요. 비용이나 마감처럼 확인 가능한 조건도 한 번 따로 살펴보세요.", "끌리는 이유 한 가지와 반드시 확인할 조건 한 가지를 적어보세요."],
      harmony: ["단체 메뉴를 정할 때 내 취향만큼 못 먹는 사람이 있는지 먼저 물어요. 누구도 크게 불편하지 않을 접점을 찾는 과정이 자연스러워요.", "모두가 만족할 답을 기다리다 정작 내 선택은 사라질 수 있어요. 조율할 수 있는 조건과 내가 지키고 싶은 조건을 구분해보세요.", "의견을 묻기 전에 내가 원하는 후보 하나도 함께 제안해보세요."],
      quick: ["비슷한 선택지가 남으면 일단 하나 골라 다음 단계로 넘어가요. 결정 뒤 실제로 써보거나 움직이면서 조정하는 편이 더 편해요.", "내가 바로 바꿀 수 있는 선택도 다른 사람에게는 준비가 필요한 약속일 수 있어요. 함께 영향을 받는 사람이 있는지 확인해보세요.", "빠르게 정하기 전 ‘이 결정으로 누가 무엇을 준비해야 하지?’를 한 번 물어보세요."]
    },
    "test-010": {
      planner: ["사고 싶은 물건이 생기면 이번 달 지출과 사용할 횟수를 먼저 떠올려요. 계획 안에서 고른 소비는 작은 물건이어도 마음 편하게 즐겨요.", "계획을 지키는 일이 목적이 되면 충분히 쓸 수 있는 돈도 아깝게만 느껴질 수 있어요. 즐거움을 위한 몫을 남기는 것도 내 선택이에요.", "이미 정한 예산 안에서 마음 편히 써도 되는 즐거움 한 가지를 정해보세요."],
      joy: ["힘들었던 날 좋아하는 디저트나 작은 소품이 눈에 들어와요. 물건의 기능보다 오늘의 기분을 바꾸는 순간을 중요하게 보는 편이에요.", "기분을 위해 산 물건이 쌓여도 그날의 불편함은 남아 있을 수 있어요. 사고 싶은 것과 지금 필요한 기분을 따로 이름 붙여보세요.", "결제 전에 원하는 물건과 원하는 기분을 한 줄씩 적고 잠깐 다시 골라보세요."],
      curator: ["유행하는 물건인지보다 이미 가진 것과 어떻게 어울릴지 떠올려요. 디자인의 작은 차이를 비교하고 오래 찾아낸 물건에 애착이 생겨요.", "희소하거나 취향에 맞는다는 이유만으로 실제 쓸 자리를 놓칠 수 있어요. 수집하는 즐거움과 보관할 공간도 함께 생각해보세요.", "구매 후보를 고를 때 둘 장소와 사용할 장면을 하나씩 떠올려보세요."],
      saver: ["당장 필요하지 않은 물건은 그냥 지나가도 아쉽지 않아요. 사지 않은 선택 덕분에 나중의 선택지가 남는다는 점에서 만족을 느껴요.", "아끼는 방식이 너무 엄격하면 필요한 교체나 가까운 사람과의 즐거움도 계속 미룰 수 있어요. 쓰지 않는 이유를 한번 살펴보세요.", "최근 미뤄둔 소비 중 생활에 실제로 도움이 될 것 하나만 다시 확인해보세요."]
    },
    "test-011": {
      captain: ["팀 채팅이 조용해지면 마감과 다음 할 일을 먼저 꺼내요. 누가 무엇을 언제까지 할지 정리될 때 팀이 움직인다는 느낌을 받아요.", "일을 빨리 정리하려다 다른 사람의 아이디어가 들어올 자리를 닫을 수 있어요. 정리 전에 아직 나오지 않은 의견을 한 번 물어보세요.", "다음 회의에서 할 일을 나누기 전에 팀원마다 의견 하나씩 받을 시간을 두세요."],
      maker: ["회의에서 방향이 정해지면 우선 초안이나 시제품을 만들고 싶어요. 완성된 설명보다 실제로 볼 수 있는 한 장이 대화를 쉽게 만든다고 느껴요.", "보여줄 수 있는 일이 빠르다 보니 애매한 일까지 내 몫으로 쌓일 수 있어요. 제작 전에 범위와 완료 기준을 맞춰두면 덜 억울해져요.", "초안을 만들기 전 이번 버전에 넣을 것과 뺄 것을 한 줄씩 합의해보세요."],
      mediator: ["팀원들의 의견이 엇갈리면 무엇이 서로 다른지 다시 말로 풀어요. 말이 적었던 사람에게도 묻고 모두가 이해한 다음 단계로 이어가요.", "갈등을 줄이는 데 집중하면 결정해야 할 문제가 계속 미뤄질 수 있어요. 합의할 부분과 책임자가 정할 부분을 구분해보세요.", "다음 의견 충돌에서는 공통 목표 한 개와 정할 시한을 함께 적어보세요."],
      spark: ["팀의 속도가 처지면 새 예시를 찾아오거나 가볍게 분위기를 바꿔요. 막힌 방향을 다른 각도에서 보게 하는 제안에 힘이 실려요.", "새 방향을 여는 일이 계속되면 이미 정한 작업이 흔들릴 수 있어요. 지금 고칠 문제인지 다음에 써볼 아이디어인지 나눠보세요.", "다음 제안에는 ‘이번 마감에 필요한 이유’를 한 문장 붙여보세요."]
    },
    "test-012": {
      solo: ["쉬는 날에는 누군가를 만나기 전에 혼자 먹고 걷는 시간이 먼저 필요해요. 내 속도를 되찾은 뒤에야 연락도 반갑게 느껴지는 쪽이에요.", "혼자 있는 시간을 지키고 싶다는 말이 없으면 상대는 거절당했다고 느낄 수 있어요. 거리 두기와 관계의 마음을 따로 전해보세요.", "약속을 거절할 때 혼자 쉬고 싶다는 이유와 다시 연락할 때를 함께 알려보세요."],
      duo: ["여러 사람의 번갈아 드는 이야기보다 편한 친구 한 명과 오래 앉아 있고 싶어요. 말 사이의 침묵도 어색하지 않은 만남에 가까워요.", "한 사람에게만 모든 이야기를 기대면 서로의 일정이 달라질 때 허전함이 커질 수 있어요. 만남 밖에서 편한 시간도 마련해보세요.", "좋아하는 친구에게 짧은 산책을 제안하고 남은 시간은 혼자 쓸 계획도 남겨두세요."],
      circle: ["부담 없는 모임에서 여러 이야기를 듣고 웃으면 기분이 바뀌어요. 오랜 대화 하나보다 가볍게 오가는 안부 속에서 쉬는 느낌을 찾아요.", "모임에 맞추다 보면 조용히 보내고 싶었던 날까지 일정이 찰 수 있어요. 가벼운 만남도 오늘의 여유 안에서 고를 수 있어요.", "다음 모임에는 나올 시간을 미리 정하고 그 시간을 편하게 알려보세요."],
      vanish: ["연락이 쌓인 날에는 메시지 창을 열지 않고 아무 반응도 요구받지 않는 시간이 끌려요. 쉬는 동안만큼은 설명까지 잠깐 내려놓고 싶어요.", "예고 없는 침묵은 편한 사람에게 걱정으로 남을 수 있어요. 긴 설명 없이도 쉬는 중이라는 작은 신호를 남길 방법이 있어요.", "가까운 사람에게 ‘오늘은 연락 쉬고 내일 답할게’ 한 줄만 남겨보세요."]
    },
    "test-013": {
      direct: ["관심이 생기면 둘이 만날 이유를 구체적으로 만들어요. 상대의 취향을 물은 뒤 다음 만남을 제안하는 데까지 오래 걸리지 않는 편이에요.", "선명한 표현이 매력이어도 상대가 정할 시간을 남겨야 편한 제안이 돼요. 망설이는 답을 설득해야 할 문제로 보지 않아도 괜찮아요.", "다음 제안에는 ‘편할 때 답해줘’라는 여백을 함께 전해보세요."],
      play: ["가벼운 장난을 주고받는 중에 둘만 아는 이야기가 늘어나요. 웃을 포인트를 찾으면서 상대에게 조금씩 가까워지는 방식이 편해요.", "장난의 크기가 커지면 호감보다 놀림으로 전달될 수 있어요. 상대가 함께 웃는지 살피고 불편해하는 주제는 내려놓아주세요.", "농담 대신 상대의 좋은 점 하나를 구체적으로 말하는 대화를 해보세요."],
      care: ["좋아하는 음료를 기억하거나 바쁜 날 작은 도움을 건네요. 특별한 말보다 일상에 실제로 도움이 되는 행동으로 관심을 전하는 편이에요.", "도움을 많이 줬다는 이유로 같은 마음을 기대하면 서로 부담스러울 수 있어요. 배려와 상대의 선택은 별개로 두어야 편해요.", "챙겨주는 행동 한 번을 줄이고 같이 하고 싶은 일을 솔직하게 제안해보세요."],
      subtle: ["한 번에 큰 표현을 하기보다 자연스럽게 대화할 자리를 늘려요. 취향이 겹치는 순간이나 자주 마주치는 작은 계기를 반갑게 받아들여요.", "우연만 기다리면 상대는 내 관심을 알아차리지 못할 수 있어요. 눈치로만 읽히길 바라기보다 부담 없는 말 한마디를 골라보세요.", "공통 관심사 링크와 함께 ‘네 생각이 나서 보냈어’라고 전해보세요."]
    },
    "test-014": {
      archive: ["사진첩에 커피잔, 하늘, 버스 창밖 같은 그날의 작은 기록이 남아요. 완벽한 한 장보다 당시의 기분을 떠올릴 단서가 더 소중해요.", "장면을 남기느라 지금 느끼는 시간을 놓칠 수도 있어요. 모든 순간을 보관하지 않아도 좋아했던 하루가 사라지는 것은 아니에요.", "오늘은 한 장만 찍고 화면을 내려놓은 채 같은 풍경을 조금 더 봐주세요."],
      aesthetic: ["빛이 떨어지는 자리나 배경의 선이 먼저 눈에 들어와요. 같은 물건도 조금 옮겨 찍으면 다른 분위기가 되는 과정이 재미있어요.", "잘 찍혔는지를 오래 살피면 당시의 표정이나 사건은 뒷전이 될 수 있어요. 흔들린 사진도 남길 만한 이야기를 품고 있어요.", "다음 사진 묶음에는 구도가 완벽하지 않아도 좋아하는 순간 한 장을 남겨보세요."],
      candid: ["친구가 크게 웃거나 예상 밖의 장면이 생기면 손이 먼저 움직여요. 정돈된 포즈보다 잠깐 지나가는 표정을 다시 볼 때 즐거워요.", "내게 재미있는 표정도 사진 속 사람에게는 공개하기 싫은 장면일 수 있어요. 순간을 남기는 일과 공유하는 일은 따로 골라주세요.", "친구 사진을 올리기 전에 보여주고 괜찮은지 한 번 물어보세요."],
      story: ["한 장을 고르기보다 만남의 시작과 끝이 보이게 사진 순서를 잡아요. 문장과 함께 엮으면 평범한 하루에도 이야기가 생긴다고 느껴요.", "이야기를 예쁘게 완성하려다 마음에 남았던 작은 장면을 뺄 수 있어요. 잘 맞지 않아도 나에게 중요한 컷은 남겨두세요.", "최근 사진 세 장을 고르고 그날의 제목을 한 줄만 붙여보세요."]
    },
    "test-015": {
      cozy: ["방에 들어오면 조명을 낮추고 몸이 편한 자리를 찾아요. 천의 감촉이나 작은 향처럼 앉아 있을 때 느끼는 분위기가 중요해요.", "편한 물건을 더하다 보면 정작 쉬고 싶은 자리가 좁아질 수 있어요. 따뜻한 분위기와 몸을 펼 공간을 함께 남겨보세요.", "가장 오래 쉬는 자리 하나에서 잘 쓰지 않는 물건 세 개만 옮겨보세요."],
      minimal: ["책상 위가 비어 있으면 해야 할 일도 한결 선명해 보여요. 물건을 고를 때 수보다 자리를 차지할 이유부터 따지는 쪽이에요.", "빈 공간을 유지하는 일이 편안함보다 더 큰 기준이 될 수 있어요. 실제로 자주 쓰는 물건까지 숨길 필요는 없어요.", "자주 꺼내는 물건 하나는 손이 닿는 곳에 두고 편한지 비교해보세요."],
      collector: ["좋아하는 작품의 작은 소품이나 여행 기념품이 눈에 띄어요. 물건을 보면 어디서 왜 골랐는지 이야기까지 함께 떠오르는 방이에요.", "애착 있는 물건이 늘면 새로 들어온 취향을 둘 자리가 부족해질 수 있어요. 모두 버리기보다 보이는 구성을 바꿀 방법을 찾아보세요.", "좋아하는 물건 다섯 개만 앞에 두고 나머지는 다음 전시 차례로 쉬게 해주세요."],
      color: ["작은 컵이나 포스터의 색 하나가 방의 분위기를 바꾼다고 느껴요. 가구를 바꾸기보다 눈에 들어오는 포인트를 고르는 일이 즐거워요.", "마음에 드는 색을 각각 더하다 보면 쉬고 싶은 분위기와 멀어질 수 있어요. 물건 하나의 예쁨과 공간 전체의 느낌을 나란히 보세요.", "지금 방에서 좋아하는 색 두 개를 고르고 작은 소품 배치만 바꿔보세요."]
    },
    "test-016": {
      anchor: ["약속이 잡히면 출발 시간과 이동 경로를 미리 확인해요. 언제 만나는지 확실해지면 다른 일도 편하게 배치할 수 있어요.", "정해진 시간이 바뀌면 상대의 마음까지 가볍게 느껴질 수 있어요. 사정 때문에 바뀐 것과 약속을 가볍게 여기는 행동은 구분해보세요.", "다음 약속은 확정 시간과 늦어질 때 연락할 기준을 함께 정해보세요."],
      flex: ["장소가 바뀌어도 가능한 경로를 다시 찾아요. 친구의 상황에 따라 계획을 조금 바꾸는 일은 약속을 이어가는 과정처럼 느껴져요.", "괜찮다고 여러 번 양보하면 나도 지켜야 할 일정이 있다는 사실이 빠질 수 있어요. 조정 가능한 범위를 먼저 알려주세요.", "다음 약속을 잡을 때 가능한 시간대와 바꾸기 어려운 한 조건을 말해보세요."],
      pulse: ["멀리 있는 일정은 감이 덜 오고 당일 컨디션이 보여야 움직이기 편해요. 갑자기 빈 시간이 생기면 가볍게 만나자는 말도 잘 꺼내요.", "내가 편한 결정 시점이 상대에게는 준비하기 늦은 때일 수 있어요. 확정할 수 없어도 언제 알려줄지는 약속할 수 있어요.", "답을 바로 못 정하면 확답할 시간을 정해 먼저 보내보세요."],
      curator: ["어디서 만나 무엇을 먹을지 한 흐름으로 생각해요. 모임의 목적과 친구들의 취향이 맞는 동선을 찾을 때 정리하는 재미가 있어요.", "모든 장면을 준비하면 당일에 바꾸기 어려워질 수 있어요. 실제 만남에서 생기는 우연도 들어올 칸을 남겨두세요.", "다음 약속에서는 첫 장소만 정하고 두 번째 장소는 같이 골라보세요."]
    },
    "test-017": {
      shy: ["잘했다는 말을 들으면 시선이 잠깐 다른 곳으로 가요. 대답은 짧아도 집에 가는 길에 그 말을 다시 떠올리는 장면이 어울려요.", "민망해서 바로 부정하면 칭찬한 사람은 자신의 마음까지 거절당했다고 느낄 수 있어요. 크게 반응하지 않아도 받았다는 신호는 줄 수 있어요.", "다음 칭찬에는 설명을 붙이지 않고 ‘고마워, 기분 좋다’만 말해보세요."],
      fuel: ["내가 공들인 부분을 알아봐 주는 말을 들으면 다음 시도도 하고 싶어져요. 누가 어떤 점을 좋게 봤는지 기억하고 힘을 얻는 쪽이에요.", "아무 반응이 없는 날을 못한 날로 세지 않아도 괜찮아요. 다른 사람이 발견하지 못한 노력까지 사라지는 것은 아니에요.", "오늘 스스로 괜찮았다고 느낀 행동 한 가지를 구체적으로 적어보세요."],
      cool: ["칭찬에는 고맙다고 짧게 답하고 원래 하던 일을 이어가요. 말이 크지 않아도 어떤 부분을 좋게 봤는지 속으로 천천히 받아들이는 편이에요.", "담담한 반응 때문에 별로 기쁘지 않았다고 오해받을 수 있어요. 내 방식대로 받아들였다는 이야기를 뒤에 덧붙여도 좋아요.", "기억에 남은 칭찬을 해준 사람에게 그 말이 좋았다고 다시 전해보세요."],
      joke: ["칭찬을 들으면 ‘이제 알았어?’ 같은 장난으로 민망함을 넘겨요. 웃고 지나가지만 누가 내 좋은 점을 봤다는 사실은 반가워요.", "항상 웃음으로 마무리하면 진심으로 해준 말도 가벼워 보일 수 있어요. 장난의 마지막에 짧게 고마움을 붙일 자리가 있어요.", "다음에는 한 번 웃은 뒤 ‘그래도 그렇게 봐줘서 고마워’라고 말해보세요."]
    },
    "test-018": {
      bloom: ["날이 달라지면 새 노트나 작은 계획을 꺼내고 싶어져요. 늘 보던 길도 새롭게 보이고 미뤄둔 시작에 마음이 가는 장면과 닮았어요.", "시작하고 싶은 것이 동시에 늘면 금방 할 일만 많아질 수 있어요. 새 계절에 전부 달라질 필요 없이 하나만 이어가도 괜찮아요.", "다시 해보고 싶은 일 하나를 골라 첫 10분만 해보세요."],
      blaze: ["빛이 선명한 날에는 약속이나 외출을 만들고 싶어져요. 사진을 보는 것보다 밖에서 직접 움직이고 소리를 듣는 장면에 마음이 먼저 가요.", "신나는 일정으로 가득 채우면 조용히 보내고 싶던 시간은 밀릴 수 있어요. 즐겁게 움직인 날에도 아무것도 정하지 않은 칸을 두세요.", "다음 외출 뒤에는 바로 다른 약속을 붙이지 않고 돌아올 시간을 남겨보세요."],
      hush: ["바람의 온도나 저녁 빛이 달라졌다는 사실을 오래 느껴요. 예전에 듣던 노래와 지금의 마음을 나란히 놓는 시간이 어울려요.", "생각이 깊어질수록 같은 장면만 반복해서 떠올릴 수 있어요. 정리된 결론을 기다리지 않고 가볍게 바깥으로 꺼내도 좋아요.", "오늘 눈에 들어온 변화 한 가지를 짧게 적거나 친구에게 들려주세요."],
      frost: ["계절이 조용해지면 물건과 일정을 차분히 정리하고 싶어져요. 새로운 일을 늘리기보다 이미 가진 것의 자리를 찾아주는 시간이 편해요.", "편한 고요함이 사람과의 연결까지 모두 닫는 기준이 될 수 있어요. 혼자 있을 시간과 유지하고 싶은 연락 하나를 함께 남겨보세요.", "정리할 서랍 하나를 고르고 끝난 뒤 반가운 사람에게 짧게 안부를 보내보세요."]
    },
    "test-019": {
      move: ["머리가 복잡하면 자리에서 일어나 걷거나 주변을 치우고 싶어져요. 생각을 모두 해결하기 전에 몸의 자세와 장소부터 바꾸는 편이에요.", "움직이는 동안 잊었던 문제가 돌아오면 또 실패했다고 느낄 수 있어요. 잠깐 환기하는 일과 필요한 대화를 하는 일은 서로 다른 단계예요.", "가볍게 움직인 뒤 아직 남은 걱정이 무엇인지 한 문장만 적어보세요."],
      talk: ["답답한 일을 말하다가 내가 어디서 서운했는지 알아차려요. 바로 해결되지 않아도 들어주는 사람이 있으면 이야기를 이어가기 편해요.", "친구는 조언이 필요한지 그냥 들어주면 되는지 모를 수 있어요. 원하는 반응을 먼저 알려주면 같은 이야기도 덜 엇갈려요.", "이야기를 시작할 때 ‘해결책보다 잠깐 들어줬으면 해’처럼 부탁해보세요."],
      nest: ["복잡한 날에는 소리를 줄이고 익숙한 자리에서 아무것도 정하지 않고 싶어요. 해야 할 일을 잠깐 보이지 않는 곳에 두는 방식이 떠올라요.", "잠시 쉬기 위해 미룬 일과 계속 피하고 싶은 일이 섞일 수 있어요. 쉬는 시간을 존중하면서 다시 볼 시점 하나만 남겨두세요.", "지금 쉬어도 되는 일 하나를 치워두고 다시 확인할 때를 가볍게 정해보세요."],
      create: ["답답함을 말로 풀기보다 무언가를 만들거나 정리할 때 손이 움직여요. 눈앞에서 한 가지가 달라지는 과정을 보고 싶어 하는 쪽이에요.", "쉬려고 시작한 활동도 잘해야 한다는 기준이 붙으면 부담이 될 수 있어요. 보여주거나 완성하지 않는 버전으로 해도 괜찮아요.", "아무에게도 보여주지 않을 낙서나 메모를 5분만 만들어보세요."]
    },
    "test-020": {
      crowd: ["처음 보는 사람이 섞인 자리에서도 새 이야기가 나오면 귀가 열려요. 집에서는 나가기 귀찮았는데 막상 만나고 돌아오는 길엔 한결 생기 있는 장면과 닮았어요.", "만남이 즐거웠다는 이유로 피곤하지 않았다고 넘기기 쉬워요. 빈 저녁까지 약속으로 채우기 전에 다음 날의 나도 같은 속도를 원하는지 살펴보세요.", "다음 모임 뒤에는 새 약속 대신 조용히 돌아올 시간을 한 칸 남겨보세요."],
      deep: ["모임이 끝난 뒤 두세 명만 남아 진짜 궁금했던 이야기를 나눌 때 더 편해져요. 많은 안부보다 서로의 생각이 이어진 대화 한 번이 오래 남는 편이에요.", "대화가 깊지 않았다는 이유로 가벼운 만남을 전부 아쉽게 볼 수도 있어요. 웃고 헤어지는 짧은 연결에도 그날의 역할이 있어요.", "편한 친구 한 명에게 요즘 궁금했던 질문 하나를 건네고 내 이야기도 나눠보세요."],
      observer: ["새 모임에 들어가면 누가 어떤 이야기를 하는지 먼저 들어요. 끼어들 기회가 생겼을 때 앞서 나온 말을 기억해 연결하는 모습이 잘 어울려요.", "생각을 고르는 동안 아무 관심이 없는 사람으로 보일 수 있어요. 길게 말하지 않아도 고개를 끄덕이거나 질문 하나로 참여 중임을 보여줄 수 있어요.", "다음 모임에서는 처음 10분 안에 궁금한 점 한 가지만 질문해보세요."],
      recharge: ["좋아하는 친구를 만나도 헤어지고 나면 혼자 있는 시간이 필요해요. 즐거웠던 약속을 또 잡기 전에 일정표의 빈칸부터 확인하는 편이에요.", "쉼이 필요하다는 말을 미루면 결국 갑자기 모든 연락을 끊고 싶어질 수 있어요. 관계를 싫어해서가 아니라는 마음과 쉬고 싶은 상태를 같이 전하세요.", "다음 주 일정에 약속을 잡지 않을 저녁 하나를 먼저 표시해두세요."]
    },
    "test-021": {
      full: ["평소라면 다음으로 미뤘을 제안에도 한번 해볼까 하는 마음이 들어요. 해야 할 일 밖의 취미나 사람에게 눈이 가는 요즘의 선택과 닮았어요.", "오늘의 여유를 다음 주의 나에게도 그대로 기대하면 일정이 빨리 찰 수 있어요. 에너지가 높은 날에도 줄일 수 있는 선택지를 남겨보세요.", "새 일을 하나 넣는다면 그다음 날에는 비워둘 시간도 같이 정해보세요."],
      steady: ["할 일을 끝내고 가벼운 즐거움 하나를 챙길 힘은 남아 있어요. 무리해서 속도를 올리기보다 오늘 가능한 만큼 이어가는 편이에요.", "지금 괜찮다는 이유로 작은 피로를 계속 뒤로 미룰 수 있어요. 편한 리듬을 유지하는 데 무엇이 도움 되는지 알아두면 선택하기 쉬워져요.", "요즘 잘 맞는 하루의 요소 하나를 적고 다음 주에도 남겨보세요."],
      saving: ["여러 요청이 들어오면 다 받기보다 지금 해야 할 것부터 골라요. 남은 시간과 사람을 만날 여유를 의식하며 답하는 모습에 가까워요.", "아끼는 선택만 반복하다 보면 나에게 즐거웠던 것까지 함께 빠질 수 있어요. 꼭 필요한 일과 작지만 반가운 일을 모두 한 칸씩 남겨보세요.", "오늘 줄일 요청 한 개와 남기고 싶은 즐거움 한 개를 나란히 적어보세요."],
      low: ["한 일을 끝낸 뒤 바로 다음으로 넘어가기보다 잠깐 멈추고 싶어요. 평소 쉬웠던 메시지 답장도 생각을 골라야 하는 날이 선택에 담겨 있어요.", "반응이 느린 하루를 내 성격이나 능력 전체로 해석할 필요는 없어요. 이 결과는 지금 고른 답의 이야기이며 상태의 원인을 판정하지 않아요.", "오늘 할 일을 가장 작은 한 단계로 줄이고 마친 뒤 쉬어도 되는 때를 정해보세요."],
      empty: ["무엇을 먹을지 고르는 일도 부담스럽고 새 약속보다 취소된 일정이 반가운 장면이 떠올라요. 지금은 더 해내라는 말이 편하지 않을 수 있어요.", "이 이름이 당신의 상태를 확정하는 말은 아니에요. 일상을 힘들게 하는 변화가 계속된다면 테스트 결과와 별개로 실제 상황을 살펴봐주세요.", "오늘 바로 답하지 않아도 되는 요청 한 가지를 미루고 필요한 도움을 구체적으로 부탁해보세요."]
    },
    "test-022": {
      open: ["창문 너머 하늘이나 멀리 이어지는 길에 눈이 머물러요. 대단한 여행보다 익숙한 자리에서 시야가 한 번 바뀌는 장면이 끌리는 날이에요.", "밖으로 나가야만 기분이 달라진다고 정해두지 않아도 괜찮아요. 갈 수 없는 날에도 자리나 시선을 조금 바꾸는 선택지가 있어요.", "지금 있는 곳에서 창밖이나 다른 방향을 잠깐 바라봐보세요."],
      sparkle: ["작은 전시, 재미있는 간판, 반짝이는 소품이 평소보다 반가워요. 하루를 대표할 만한 장면 하나를 발견하고 싶은 무드에 가까워요.", "더 특별한 자극을 계속 찾으면 지나가는 즐거움을 금방 작게 볼 수 있어요. 크고 새로운 사건이 없어도 마음에 든 한 장면이면 충분해요.", "오늘 두 번 돌아본 물건이나 풍경 하나를 사진 또는 한 줄로 남겨보세요."],
      calm: ["찻잔의 김이나 벽에 옮겨가는 빛처럼 조용한 변화가 눈에 들어와요. 여러 장면을 넘기기보다 한 장면에 조금 더 머무르고 싶어져요.", "조용한 무드가 곧 사람을 피해야 한다는 뜻은 아니에요. 편한 사람과 말없이 시간을 보내는 방식도 오늘의 선택이 될 수 있어요.", "하던 화면을 잠깐 끄고 가까이 들리는 소리 하나를 끝까지 들어보세요."],
      cozy: ["외출 후 켜는 작은 조명이나 늘 앉는 자리가 유난히 반가워요. 낯선 즐거움보다 설명하지 않아도 편한 장면 쪽으로 마음이 기울어요.", "익숙함을 고른 하루를 재미없는 하루로 평가할 필요는 없어요. 다만 늘 편했던 것이 오늘도 편한지는 내 기분에 다시 물어볼 수 있어요.", "좋아하는 컵이나 담요 한 가지를 가까이 두고 다른 일을 잠깐 내려놓아보세요."]
    },
    "test-023": {
      wide: ["갑작스러운 제안이 들어와도 일단 일정과 마음을 살펴볼 틈이 있어요. 쉬는 시간에 다음 할 일보다 해보고 싶은 것이 먼저 떠오르는 편이에요.", "빈칸이 있다는 이유만으로 모두 채워야 하는 것은 아니에요. 지금의 여유가 유지되는 데 무엇을 하지 않은 덕도 있는지 돌아보세요.", "이번 주 비어 있는 시간 하나는 새 일정으로 바꾸지 않고 그대로 남겨보세요."],
      room: ["할 일이 이어져도 점심이나 귀가 뒤의 작은 시간은 지키고 싶어요. 완전히 한가하지는 않지만 다 급한 일로 묶지는 않는 모습이에요.", "남겨둔 한 칸에 다른 사람의 부탁이 계속 들어오면 내가 쓸 시간은 사라질 수 있어요. 그 빈칸도 이미 목적이 있는 시간이라고 말할 수 있어요.", "쉬려고 남긴 시간 하나를 일정표에 실제 약속처럼 표시해보세요."],
      tight: ["한 일을 하는 동안 다음 마감과 답할 메시지가 함께 떠올라요. 일정은 돌아가지만 예정보다 늦어지면 다른 일까지 밀리는 날과 닮았어요.", "다 해낸다는 사실만으로 여유가 충분하다고 볼 수는 없어요. 각 작업을 더 빨리 하는 것보다 동시에 열린 일을 줄이는 선택도 있어요.", "이번 주 할 일 중 동시에 진행하지 않아도 되는 두 가지에 순서를 붙여보세요."],
      packed: ["잠깐 쉬는 중에도 누락한 일이 없는지 다시 확인하게 돼요. 새로운 요청의 크기보다 이미 여러 일이 겹쳐 있다는 사실이 더 무겁게 다가와요.", "결과 이름은 일정과 마음의 선택을 묶어 표현한 말이에요. 이 상태를 계속 버텨야 할 기준으로 삼거나 건강 판정으로 읽지 않아도 괜찮아요.", "가장 가까운 마감 하나를 골라 범위나 기한을 조정할 수 있는지 먼저 물어보세요."]
    },
    "test-024": {
      director: ["답을 요청하기 전 누구에게 보여줄지, 어떤 형식인지, 빠지면 안 되는 조건부터 적어요. 초안을 한 번에 받기보다 일을 나누어 맡기는 편이에요.", "조건을 처음부터 너무 촘촘히 정하면 예상 밖의 좋은 답을 놓칠 수 있어요. 꼭 지킬 기준과 실험해도 되는 부분을 분리해보세요.", "다음 요청에는 필수 조건 세 개와 자유롭게 제안받을 부분 한 개를 적어보세요."],
      editor: ["받은 문장을 그대로 붙이기보다 읽는 사람을 떠올리며 고쳐요. 낯선 표현을 내 말로 바꾸고 문장의 순서를 손보는 데 시간이 들어가요.", "자연스럽게 다듬은 문장도 사실이 맞다는 보장은 없어요. 매끄러운 표현과 확인된 내용은 별도로 살펴볼 필요가 있어요.", "다듬은 문장에서 사실을 주장하는 문장 하나를 골라 원문 자료와 비교해보세요."],
      explorer: ["같은 질문도 다른 방향으로 바꾸어 물어보고 여러 초안을 나란히 봐요. 첫 답의 완성도보다 몰랐던 선택지를 발견하는 재미가 커요.", "후보가 늘어나는 과정이 결정 자체를 대신할 수 있어요. 더 많은 버전이 필요한지 실제로 하나를 써볼 때인지 구분해보세요.", "지금 모은 후보 중 하나를 골라 10분 안에 시험할 방법을 적어보세요."],
      verifier: ["숫자나 출처가 나오면 링크와 날짜부터 열어봐요. 말이 자신 있게 쓰였다는 이유보다 실제로 확인할 수 있는 자료가 있는지 살펴요.", "모든 문장을 같은 깊이로 확인하려면 작업이 오래 멈출 수 있어요. 틀렸을 때 영향이 큰 주장부터 살피는 순서를 정해보세요.", "다음 답변에서는 반드시 확인할 주장 두 개를 고르고 원문과 날짜를 함께 남겨보세요."]
    },
    "test-025": {
      maker: ["쉬는 시간에 화면을 넘기기보다 종이, 재료, 도구를 만지고 싶어져요. 조금 삐뚤어도 내가 한 흔적이 남은 결과를 보는 재미가 커요.", "취미에도 잘 만든 결과를 요구하면 가벼운 시간이 과제처럼 바뀔 수 있어요. 완성하거나 공개하지 않을 연습도 선택할 수 있어요.", "집에 있는 재료로 10분 동안만 만들어보고 완성 여부는 평가하지 않아보세요."],
      wanderer: ["휴대폰을 내려놓으면 가까운 길을 직접 걸어보고 싶어져요. 리뷰로 본 유명한 곳보다 오늘 내 눈에 들어온 가게와 풍경이 궁금해요.", "걷는 시간에도 많은 장소를 확인하려 하면 화면 속 목록과 다를 바 없어질 수 있어요. 아무것도 발견하지 못한 길도 괜찮은 산책이에요.", "오늘 산책에서는 목적지 하나를 줄이고 평소 지나치던 길에 잠깐 머물러보세요."],
      keeper: ["새 소식을 찾기보다 익숙한 음악이나 책을 다시 꺼내고 싶어져요. 무엇을 더 알아야 한다는 마음이 줄면 이미 가진 취향을 충분히 즐겨요.", "익숙한 선택이 좋아서인지 고르기 귀찮아서인지 가끔 다를 수 있어요. 반복을 멈출 필요 없이 오늘도 좋은 이유를 알아차려보세요.", "좋아하던 노래 한 곡을 다른 일을 하지 않고 끝까지 들어보세요."],
      connector: ["같은 장소에 앉은 사람의 이야기를 더 오래 듣고 싶어져요. 온라인의 많은 안부보다 눈앞에서 주고받은 표정과 웃음이 선명하게 남아요.", "함께 있는 시간에도 상대가 말하고 싶지 않은 주제가 있을 수 있어요. 깊은 대화를 만드는 일보다 서로 편한 속도를 먼저 살펴주세요.", "가까운 사람과 식사하며 오늘 웃었던 일 하나씩만 나눠보세요."]
    }
  };
  // Pairs are comparisons for this playful content, not compatibility predictions.
  const resultRelations = {
    "test-001": ["engine|guide|제안을 행동으로 옮기는 속도와 상대의 마음을 살피는 말이 만나면 약속을 함께 만들기 좋아요.", "station|signal|꾸준한 약속과 신중한 관찰은 서두르지 않고 신뢰를 쌓는 대화에 어울려요.", "표현하는 속도가 다를 때는 연락 횟수보다 지금 원하는 만남의 템포를 먼저 이야기해보세요."],
    "test-002": ["sprint|reset|일을 밀고 가는 사람과 멈출 때를 정하는 사람이 쉬는 시점과 업무 범위를 같이 확인할 수 있어요.", "buffer|alert|괜찮은 척을 요구하기보다 지금 줄일 부담을 이야기하는 관계로 읽어보세요. 누군가가 회복을 책임져야 한다는 뜻은 아니에요.", "비슷한 업무량에도 느끼는 부담은 다를 수 있어요. 버티는 힘을 비교하기보다 맡을 수 있는 범위를 각각 말해보세요."],
    "test-003": ["planner|local|동선을 준비한 뒤 한 동네에 오래 머무를 칸을 두면 둘의 여행 방식이 함께 들어갈 수 있어요.", "explorer|comfort|새로운 길을 걷되 돌아와 쉴 자리를 확보하면 모험과 편안함을 한 일정에 담기 좋아요.", "같은 장소를 가도 보고 싶은 장면이 다를 수 있어요. 꼭 지킬 예약과 따로 움직여도 되는 시간을 먼저 정해보세요."],
    "test-004": ["timer|diver|시간 구간을 나누는 방식과 깊이 파고드는 방식은 시작과 점검 시점을 정할 때 서로 참고할 수 있어요.", "ritual|spark|익숙한 시작 순서 안에 새로운 예시 하나를 넣으면 반복과 흥미를 함께 남길 수 있어요.", "작업 속도를 같게 맞추기보다 결과를 확인할 때와 방해받지 않을 시간을 함께 정해보세요."],
    "test-005": ["manager|spark|만남의 준비를 챙기는 사람과 어색함을 푸는 사람이 역할을 나누면 한 사람에게 부담이 몰리지 않아요.", "listener|free|진지하게 듣는 시간과 부담 없이 함께 있는 시간을 번갈아 고르면 서로 다른 편안함을 알아가기 좋아요.", "친구마다 편한 역할이 달라도 늘 같은 일을 맡을 필요는 없어요. 다음 만남은 역할을 한 가지씩 바꿔보세요."],
    "test-006": ["cocoon|roam|가까이 한 바퀴 걷고 집에서 쉬는 약속처럼 외출의 크기를 줄이면 둘의 주말을 함께 만들 수 있어요.", "social|reset|반가운 만남 하나와 다음 주를 준비할 시간을 나누어 두면 약속과 생활 리듬을 같이 챙길 수 있어요.", "각자의 쉬는 모습을 게으름이나 과한 활동으로 평가하기보다 이번 주말에 필요한 시간을 말해보세요."],
    "test-007": ["spark|steady|먼저 여는 호감 표현에 편안한 답장이 이어지면 빠른 시작과 꾸준한 대화를 함께 만들 수 있어요.", "tease|calm|가벼운 농담 뒤에 궁금한 질문을 붙이면 웃음과 차분한 관심이 같은 대화에 들어가요.", "답장 속도나 농담의 양이 같아야 호감이 같은 것은 아니에요. 연락이 편한 때를 직접 물어보세요."],
    "test-008": ["glow|mystery|천천히 드러나는 배려와 의외의 취향은 서로에 대해 한 가지씩 알아가는 만남에 어울려요.", "comfort|wit|편하게 머무는 분위기와 적당한 타이밍의 농담이 만나면 조용한 날도 즐거운 날도 함께 보내기 좋아요.", "매력이 눈에 띄는 시점은 다를 수 있어요. 첫인상 하나로 역할을 정하기보다 서로의 다른 면을 물어보세요."],
    "test-009": ["logic|gut|끌리는 후보를 먼저 고른 뒤 중요한 조건을 확인하면 직감과 근거가 한 결정에 함께 쓰일 수 있어요.", "harmony|quick|각자의 조건을 짧게 모으고 정할 시한을 두면 의견을 듣는 일과 앞으로 가는 일을 같이 챙길 수 있어요.", "선택 기준이 다른 사람에게 답을 재촉하거나 끝없는 설명을 요구하기 전에 결정의 크기와 시한부터 맞춰보세요."],
    "test-010": ["planner|joy|즐거움에 쓸 몫을 미리 정하면 계획을 지키면서도 작은 소비를 편하게 고를 수 있어요.", "curator|saver|오래 좋아할 이유와 실제 쓸 자리를 함께 살피면 갖고 싶은 마음과 남길 공간을 나란히 볼 수 있어요.", "소비 취향은 우열이 아니에요. 함께 쓰는 돈이 있다면 서로의 취향보다 합의한 범위를 먼저 확인해보세요."],
    "test-011": ["captain|maker|다음 할 일을 정하는 역할과 눈에 보이는 초안을 만드는 역할을 나누면 회의와 실행을 연결하기 좋아요.", "mediator|spark|엇갈린 의견을 정리한 뒤 새로운 예시를 더하면 막힌 대화에서 공통 방향을 찾는 데 참고할 수 있어요.", "선호하는 역할이 달라도 책임과 마감은 모두에게 필요해요. 성향으로 일을 떠넘기지 않고 이번 작업의 몫을 정해보세요."],
    "test-012": ["solo|vanish|쉬는 동안 반응을 요구하지 않는다는 점이 닮았어요. 다시 연락할 때를 짧게 남기면 침묵을 덜 오해할 수 있어요.", "duo|circle|조용한 만남과 가벼운 모임을 번갈아 고르면 함께 있는 시간의 크기를 조절할 수 있어요.", "혼자 쉬고 싶은 사람과 만나고 싶은 사람 모두 틀리지 않아요. 만남의 길이와 답할 때를 구체적으로 정해보세요."],
    "test-013": ["direct|subtle|한 번은 분명하게 제안하고 다음에는 자연스럽게 대화할 자리를 만들면 표현의 크기를 조절할 수 있어요.", "play|care|가볍게 웃는 말에 상대의 취향을 챙기는 행동이 더해지면 장난 속 관심을 더 알아보기 쉬워요.", "같은 행동도 호감의 뜻은 다를 수 있어요. 타입을 근거로 상대 마음을 단정하기보다 반응과 의사를 존중해주세요."],
    "test-014": ["archive|story|작은 순간을 많이 남긴 기록과 순서를 엮는 시선이 만나면 하루의 이야기를 함께 꾸리기 좋아요.", "aesthetic|candid|정돈된 한 장과 자연스러운 표정을 번갈아 남기면 같은 하루를 다른 눈으로 볼 수 있어요.", "어떤 사진이 좋은지 취향은 달라도 공개 범위는 사진 속 사람과 합의할 일이에요. 올리기 전에 같이 골라보세요."],
    "test-015": ["cozy|color|편한 자리와 좋아하는 포인트색을 함께 정하면 물건을 많이 늘리지 않고 분위기를 바꿀 수 있어요.", "minimal|collector|전시할 자리와 비워둘 자리를 나누면 좋아하는 물건과 여백이 같은 방에 머물 수 있어요.", "함께 쓰는 공간이라면 취향을 하나로 맞추기보다 각자 정할 구역과 공용 공간의 기준을 나눠보세요."],
    "test-016": ["anchor|flex|확정할 시간은 지키고 바꿔도 되는 조건은 남겨두면 예측 가능함과 유연함을 함께 챙길 수 있어요.", "pulse|curator|미리 첫 장소만 정한 뒤 당일 선택을 남겨두면 준비하는 재미와 그날의 기분을 둘 다 담을 수 있어요.", "계획하는 시점이 다르면 무심함으로 오해하기 쉬워요. 언제까지 확답할지부터 짧게 맞춰보세요."],
    "test-017": ["shy|fuel|작은 고마움과 밝은 반응은 크기가 달라도 칭찬을 반갑게 받는 서로의 방식을 알아볼 단서가 돼요.", "cool|joke|담담한 말과 가벼운 농담 뒤에 고마움을 한 번 더 전하면 겉의 반응만으로 마음을 오해하지 않기 좋아요.", "반응이 크지 않아도 기쁘지 않은 것은 아닐 수 있어요. 어떤 말이 좋았는지 물어보고 내 마음도 직접 전해보세요."],
    "test-018": ["bloom|hush|새로 시작하고 싶은 마음과 계절을 천천히 느끼는 마음을 짧은 산책이나 기록으로 함께 나누기 좋아요.", "blaze|frost|바깥에서 움직인 시간 뒤에 조용히 정리하는 시간을 두면 서로 다른 계절의 리듬을 한 날에 담을 수 있어요.", "같은 날씨에도 끌리는 장면은 다를 수 있어요. 지금 하고 싶은 일 한 가지씩을 고르고 번갈아 해보세요."],
    "test-019": ["move|nest|잠깐 움직인 뒤 조용히 쉬는 시간을 두면 장소를 바꾸고 싶은 마음과 자극을 줄이고 싶은 마음을 같이 챙길 수 있어요.", "talk|create|이야기로 풀 부분과 손으로 표현할 부분을 나누면 모든 기분을 한 방식으로 설명하지 않아도 괜찮아요.", "내게 편한 방법이 상대에게도 편한 해소법은 아닐 수 있어요. 조언하기 전에 지금 무엇이 필요한지 물어보세요."],
    "test-020": ["crowd|deep|새로운 이야기를 넓게 여는 사람과 한 이야기를 오래 잇는 사람이 만남의 폭과 깊이를 번갈아 만들 수 있어요.", "observer|recharge|조용한 참여와 혼자 쉬는 시간을 관심 없음으로 읽지 않는다면 각자의 속도를 지키며 만나기 좋아요.", "한 사람은 더 만나고 싶고 다른 사람은 귀가하고 싶을 수 있어요. 서운함을 추측하기 전에 머물 시간과 쉴 때를 먼저 말해보세요."],
    "test-021": ["full|steady|새 시도를 하고 싶은 날과 평소 리듬을 지키고 싶은 날의 일정을 함께 보며 약속의 크기를 고를 수 있어요.", "saving|low|많이 해내도록 격려하기보다 지금 남길 일과 미룰 일을 작게 나누는 대화에 어울려요.", "에너지 이름은 요즘의 선택을 표현한 것이며 사람의 능력 순위가 아니에요. 같은 속도를 요구하기보다 지금 가능한 범위를 물어보세요."],
    "test-022": ["open|cozy|가까운 곳에 잠깐 나갔다가 익숙한 자리로 돌아오는 하루라면 환기와 포근함을 함께 고를 수 있어요.", "sparkle|calm|눈에 띄는 장면 하나를 고른 뒤 천천히 머무르면 발견하는 재미와 고요한 시선을 함께 나눌 수 있어요.", "오늘 끌리는 풍경이 다르더라도 오래가는 성격 차이로 읽을 필요는 없어요. 지금 좋은 장면 한 가지씩을 보여주세요."],
    "test-023": ["wide|room|여유가 남은 시간을 모두 채우지 않고 각자 지키고 싶은 빈칸을 말하는 대화에 어울려요.", "tight|packed|누가 더 바쁜지 비교하기보다 조정할 일정과 부탁할 도움을 구체적으로 찾는 쪽으로 읽어보세요.", "여유가 다른 사람끼리는 같은 부탁의 무게도 다르게 느껴질 수 있어요. 가능한 범위와 답할 시간을 먼저 물어보세요."],
    "test-024": ["director|explorer|지킬 조건 안에서 새로운 후보를 찾으면 방향이 있는 실험을 해보기 좋아요.", "editor|verifier|내 말로 다듬는 작업과 사실을 확인하는 작업을 나누면 읽기 좋은 문장과 확인된 내용을 함께 챙길 수 있어요.", "하나의 작업에도 여러 역할이 필요해요. 스타일을 고정된 능력으로 읽기보다 이번 작업에 빠진 단계를 찾아보세요."],
    "test-025": ["maker|wanderer|걷다가 본 모양을 그리거나 주운 아이디어로 만들면 바깥의 발견과 손끝의 시간을 이어갈 수 있어요.", "keeper|connector|편한 장소와 익숙한 음악 곁에서 이야기를 나누면 혼자 즐기던 취향을 부담 없이 소개하기 좋아요.", "알림을 끈 시간이 모두에게 같을 필요는 없어요. 함께 보낼 시간과 각자 몰입할 시간을 나누어 골라보세요."]
  };
  Object.entries(resultStories).forEach(([id, stories]) => {
    const page = pages[id];
    const [first, second, contrastReason] = resultRelations[id];
    const pairs = [first, second].map((row) => row.split("|"));
    Object.entries(stories).forEach(([key, [scene, watchOut, action]]) => {
      const result = page.results[key];
      const pair = pairs.find((row) => row.slice(0, 2).includes(key));
      const otherPair = pairs.find((row) => row !== pair);
      const matchKey = pair ? pair[0] === key ? pair[1] : pair[0] : "saving";
      const matchReason = pair ? pair[2] : "적은 일정 안에서도 편하게 지낼 수 있는 범위를 함께 이야기하는 상대로 읽어보세요.";
      Object.assign(result, { scene, watchOut, action, matchKey,
        matchReason, contrastKey: otherPair ? otherPair[0] : "full", contrastReason });
    });
  });
  pages["test-021"].results.empty.matchReason = "지금 가능한 일을 작게 나누고 당장 답을 요구하지 않는 만남을 함께 생각해볼 상대로 읽어보세요.";
  Object.values(pages).forEach((page) => {
    page.resultMethodNote = page.scoringMode === "range-total"
      ? "답변별 0~3점의 합계로 나눠요. 0~6점은 여백 실종형, 7~12점은 빽빽 일정형, 13~18점은 숨통 한 칸형, 19~24점은 여백 넉넉형이에요. 점수는 건강이나 능력의 등급이 아니에요."
      : `답변별 유형 점수를 더해 가장 높은 타입을 보여줘요. 동점이면 ${Object.values(page.results).map((result) => result.title).join(" → ")} 순서에서 앞선 타입이 표시돼요.`;
  });
  pages["test-002"].results.alert.description = "이번에 고른 답에는 쉬는 시간을 확보하기 어렵거나, 쉬어도 아쉬움이 남는 장면이 모였어요. 더 버텨야 한다는 결론보다 요즘 부담이 어떻게 겹쳐 있는지 돌아볼 이야기로 읽어주세요. 이 짧은 테스트는 피로의 원인이나 건강 상태를 판정하지 않아요.";
  pages["test-019"].results.move.description = "답답한 일이 있을 때 자리에 가만히 있기보다 걷거나 장소를 바꾸고 싶다는 선택이 모였어요. 모든 문제를 풀기 전에 지금의 장면부터 바꾸는 방식이 더 익숙한 쪽이에요. 특정 활동의 효과를 보장하는 결과는 아니에요.";
  pages["test-021"].results.low.description = "이번 선택에는 할 일을 이어가면서도 전환할 때마다 잠깐 멈추고 싶은 장면이 모였어요. 평소보다 천천히 답하고 작은 일부터 고르고 싶은 요즘의 모습으로 읽어주세요. 이 결과로 의지나 능력, 몸 상태의 원인을 판단하지 않아요.";
  pages["test-021"].results.empty.description = "작은 결정과 새로운 약속보다 아무것도 정하지 않을 시간이 끌린다는 답이 모였어요. 오늘의 부담을 가볍게 이름 붙인 결과이지 당신을 규정하는 성격이나 건강 등급은 아니에요. 지금 줄이거나 부탁할 수 있는 일을 먼저 살펴보세요.";
  siteContent.adSlots = Object.assign({}, siteContent.adSlots, {
    home: homeAdSlots,
    tests: testAdSlots
  });
})();
