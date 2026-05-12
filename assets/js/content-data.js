(function attachSiteContent() {
  function createPage(definition) {
    const questionCount = Array.isArray(definition.questions) ? definition.questions.length : 0;

    return Object.assign(
      {
        intro: "한 화면에 한 문항씩 답하며 결과를 가볍게 확인하는 원핸드형 테스트입니다.",
        pills: [definition.category || "테스트", `${questionCount}문항`, "원핸드 진행"],
        eyebrow: "Kuku Test",
        heroCardTitle: definition.title,
        heroCardSubtitle: definition.heroCardSubtitle || definition.summary,
        startLabel: "테스트 시작하기",
        loadingTitle: "결과를 불러오는 중",
        loadingHint: "잠시만요. 가장 닮은 결과를 정리하고 있어요.",
        relatedIntro: "테스트를 마쳤다면 비슷한 무드의 카드도 이어서 둘러보세요.",
        operationNotes: [
          "모든 질문은 두 가지 선택지로 구성해 모바일에서 빠르게 답할 수 있게 했습니다.",
          "답변 데이터는 브라우저 안에서만 계산되며 별도로 저장하지 않습니다.",
          "결과 화면에서는 다시하기와 다른 테스트 진입 버튼을 크게 두어 재방문 흐름을 만들었습니다."
        ],
        startButtonLabel: "테스트 시작하기",
        resetButtonLabel: "다시 해보기",
        otherTestLabel: "다른 테스트 보기"
      },
      definition
    );
  }

  const cards = [
    {
      id: "test-001",
      title: "내 연애 열차 운행 타입은?",
      description: "한 화면씩 답하면서 알아보는 원핸드형 연애 성향 테스트입니다.",
      href: "./tests/test-001.html",
      badge: "추천",
      category: "연애 테스트",
      duration: "2분",
      icon: "🚂",
      posterTitle: "연애 열차 테스트",
      posterSubtitle: "내 감정 운행 타입은?",
      stickers: ["💌", "🎟️", "☁️", "🫧"],
      thumb: "linear-gradient(180deg, #fff0b5 0%, #ffe88f 100%)"
    },
    {
      id: "test-002",
      title: "직장인 회복력 체크",
      description: "요즘 나의 번아웃 회복 탄력을 가볍게 점검해보는 심리 체크 테스트입니다.",
      href: "./tests/test-002.html",
      badge: "신규",
      category: "심리 체크",
      duration: "2분",
      icon: "🧃",
      posterTitle: "회복력 체크",
      posterSubtitle: "요즘 나의 배터리 잔량",
      stickers: ["🌿", "🛋️", "☕"],
      thumb: "linear-gradient(135deg, #dff4ff, #eef2ff)"
    },
    {
      id: "test-003",
      title: "나만의 여행 성향 찾기",
      description: "계획파인지 즉흥파인지, 여행에서 가장 편한 리듬을 알아보는 취향 테스트입니다.",
      href: "./tests/test-003.html",
      badge: "인기",
      category: "취향 테스트",
      duration: "2분",
      icon: "🗺️",
      posterTitle: "여행 성향 찾기",
      posterSubtitle: "계획파 vs 즉흥파",
      stickers: ["🌤️", "🧳", "🍊"],
      thumb: "linear-gradient(135deg, #fff0c9, #ffe2e7)"
    },
    {
      id: "test-004",
      title: "집중력 루틴 진단",
      description: "집중이 잘되는 시간과 방식, 나에게 맞는 몰입 루틴을 찾는 자기관리 테스트입니다.",
      href: "./tests/test-004.html",
      badge: "핫",
      category: "자기관리",
      duration: "90초",
      icon: "🧠",
      posterTitle: "집중 루틴 진단",
      posterSubtitle: "내 집중 스위치는?",
      stickers: ["📚", "⏰", "✨"],
      thumb: "linear-gradient(135deg, #ddf5e3, #f4ecff)"
    },
    {
      id: "test-005",
      title: "친구 케미 점수 보기",
      description: "친구 사이에서 내가 어떤 포지션인지, 어떤 케미가 잘 맞는지 보는 관계 테스트입니다.",
      href: "./tests/test-005.html",
      badge: "공유형",
      category: "관계 테스트",
      duration: "1분",
      icon: "🫂",
      posterTitle: "친구 케미 점수",
      posterSubtitle: "우리 호흡은 몇 점?",
      stickers: ["🎈", "📱", "🌈"],
      thumb: "linear-gradient(135deg, #ffe6d7, #f7defe)"
    },
    {
      id: "test-006",
      title: "주말 충전 방식 찾기",
      description: "밖순이인지 집순이인지, 주말마다 나를 가장 잘 살리는 회복 루틴을 찾는 테스트입니다.",
      href: "./tests/test-006.html",
      badge: "라이프",
      category: "라이프",
      duration: "1분",
      icon: "🛌",
      posterTitle: "주말 충전 방식",
      posterSubtitle: "밖순이 vs 집순이",
      stickers: ["🌙", "🧺", "🎧"],
      thumb: "linear-gradient(135deg, #e2ebff, #ffe1ef)"
    }
  ];

  const pages = {
    "test-001": createPage({
      category: "연애 테스트",
      title: "내 연애 열차 운행 타입은?",
      summary: "소개 화면에서 시작해 질문을 한 장씩 넘기며, 연애에서 내가 어떤 리듬으로 관계를 이끄는지 알아보는 테스트입니다.",
      intro: "원핸드로도 편하게 진행되도록 한 화면에 한 질문만 보여주는 구성입니다. 답변은 저장하지 않고 브라우저 안에서만 계산됩니다.",
      pills: ["연애 테스트", "12문항", "원핸드 진행"],
      eyebrow: "Love Train Type Test",
      heroCardSubtitle: "질문 12개로 보는 관계 리듬",
      heroArt: {
        centerEmoji: "🚂",
        stickers: ["💌", "🎟️", "🌼", "☁️", "💗", "🫧", "⭐", "🌙"]
      },
      loadingMessage: "답변을 조합해서 당신의 연애 열차 운행 타입을 정리하고 있습니다.",
      questions: [
        { prompt: "호감 가는 사람에게 답장이 늦게 왔을 때 나는?", options: [{ label: "왜 늦었는지 여러 상황을 상상하며 신경이 쓰인다.", scores: { engine: 2, signal: 1 } }, { label: "상대 리듬을 존중하고 내 일상을 먼저 챙긴다.", scores: { station: 2, guide: 1 } }] },
        { prompt: "첫 데이트 장소를 정해야 할 때 더 가까운 쪽은?", options: [{ label: "재밌고 설레는 곳을 직접 골라 분위기를 만든다.", scores: { engine: 2 } }, { label: "상대 취향을 먼저 듣고 편안한 동선을 맞춘다.", scores: { guide: 2, station: 1 } }] },
        { prompt: "서운한 일이 생겼을 때 내가 먼저 하는 일은?", options: [{ label: "감정이 올라오지만 바로 이야기해서 풀고 싶다.", scores: { engine: 2 } }, { label: "상황을 정리한 뒤 타이밍을 봐서 조심스럽게 말한다.", scores: { signal: 2, station: 1 } }] },
        { prompt: "연애에서 제일 중요한 건 무엇에 더 가까운가요?", options: [{ label: "심장이 뛰는 설렘과 강한 끌림", scores: { engine: 2 } }, { label: "편안함, 신뢰, 그리고 오래 갈 수 있는 안정감", scores: { station: 2, guide: 1 } }] },
        { prompt: "상대가 힘든 일을 털어놓으면 나는?", options: [{ label: "기분부터 살피며 지금 가장 필요한 말을 해주고 싶다.", scores: { guide: 2 } }, { label: "당장 해결할 수 있는 현실적인 방법부터 같이 찾는다.", scores: { station: 2, signal: 1 } }] },
        { prompt: "관계가 익숙해질수록 나는 어떤 편인가요?", options: [{ label: "새로운 이벤트나 자극이 있어야 더 재밌다.", scores: { engine: 2 } }, { label: "익숙함 속에서 더 단단해지는 관계가 마음 편하다.", scores: { station: 2, guide: 1 } }] },
        { prompt: "연인이 갑자기 계획을 바꿨을 때 나는?", options: [{ label: "아쉽지만 그 상황 안에서 또 다른 재미를 찾는다.", scores: { engine: 2, guide: 1 } }, { label: "왜 바뀌었는지 이해하고 새 흐름을 차분히 맞춘다.", scores: { signal: 2, station: 1 } }] },
        { prompt: "좋아하는 마음을 표현하는 방식은?", options: [{ label: "보고 싶다, 좋다 같은 말을 비교적 자주 하는 편이다.", scores: { engine: 2, guide: 1 } }, { label: "직접 표현보다는 행동과 배려로 보여주는 편이다.", scores: { station: 2, signal: 1 } }] },
        { prompt: "갈등이 생겼을 때 더 가까운 대처는?", options: [{ label: "지금 풀고 넘어가야 마음이 편하다.", scores: { engine: 2, guide: 1 } }, { label: "감정이 정리된 뒤 대화하는 편이 더 낫다.", scores: { signal: 2, station: 1 } }] },
        { prompt: "상대가 나를 어떻게 기억하면 가장 좋을까요?", options: [{ label: "함께 있으면 분위기가 살아나는 사람", scores: { engine: 2 } }, { label: "편안하고 믿음직해서 오래 생각나는 사람", scores: { station: 2, guide: 1 } }] },
        { prompt: "연인과 연락 스타일은 어느 쪽이 더 편한가요?", options: [{ label: "생각날 때마다 자주 주고받는 편이 더 좋다.", scores: { engine: 2, guide: 1 } }, { label: "서로 일상을 해치지 않는 선에서 여유 있게 주고받는 게 좋다.", scores: { station: 2, signal: 1 } }] },
        { prompt: "연애 초반, 마음이 커지고 있다는 걸 느끼면 나는?", options: [{ label: "조금 더 적극적으로 다가가면서 관계를 빠르게 진전시키고 싶다.", scores: { engine: 2, guide: 1 } }, { label: "좋아하는 마음은 있지만 천천히 흐름을 보며 확신을 쌓아간다.", scores: { signal: 2, station: 1 } }] }
      ],
      results: {
        engine: { title: "직진 기관사형", summary: "설렘이 생기면 관계의 엔진을 직접 켜는 타입", description: "당신은 감정이 움직일 때 망설이기보다 먼저 분위기를 만드는 편입니다. 마음이 생기면 표현도 빠르고, 데이트의 흐름도 내가 이끌어가는 쪽이 더 편합니다. 관계에 생기와 재미를 불어넣는 힘이 크지만, 때로는 내 속도가 상대에게 빠르게 느껴질 수 있으니 템포를 맞춰보는 감각이 함께 가면 더 매력적입니다.", strengths: ["분위기를 주도하고 설렘을 키우는 힘", "좋아하는 감정을 표현하는 솔직함", "새로운 추억과 이벤트를 잘 만드는 편"], tip: "내가 앞에서 끌어줄 때도, 상대가 숨 고를 여백을 함께 만들어주면 관계가 더 오래 갑니다.", moodTitle: "추천 데이트 무드", moodItems: ["야간 드라이브", "즉흥 산책", "새로 생긴 팝업 구경"], matchTitle: "찰떡 궁합", matchLabel: "다정 안내원형", matchDescription: "당신의 추진력 위에 상대의 배려가 얹히면 속도감 있으면서도 안정적인 관계가 됩니다.", heroEmoji: "🚂" },
        station: { title: "안정 역장형", summary: "관계의 흐름을 편안하고 오래가게 정리하는 타입", description: "당신은 연애에서도 순간의 감정보다 꾸준히 쌓이는 안정감을 중요하게 생각합니다. 상대의 생활 리듬을 존중하고, 무리 없는 동선을 설계하는 데 강점이 있습니다. 편안함과 신뢰를 주는 사람으로 기억되기 쉽고 오래 갈 수 있는 기반을 잘 만듭니다. 다만 너무 차분하게만 보이지 않도록, 가끔은 감정을 먼저 표현해주는 것이 큰 힘이 됩니다.", strengths: ["신뢰를 천천히 단단하게 쌓는 편", "갈등 상황에서도 균형을 잡는 힘", "편안한 관계 리듬을 만드는 안정감"], tip: "안정감이 당신의 무기라면, 표현은 당신의 숨은 매력입니다. 좋을 때 더 좋다고 말해보세요.", moodTitle: "추천 데이트 무드", moodItems: ["조용한 카페", "동네 산책", "같이 장보기"], matchTitle: "찰떡 궁합", matchLabel: "직진 기관사형", matchDescription: "당신의 안정감은 상대의 열정이 너무 흔들리지 않게 잡아주는 좋은 균형점이 됩니다.", heroEmoji: "🏡" },
        guide: { title: "다정 안내원형", summary: "상대 기분을 잘 살피며 관계의 공기를 부드럽게 만드는 타입", description: "당신은 사람의 감정 결을 잘 읽고, 상대가 편안해질 수 있는 말을 건네는 데 강점이 있습니다. 배려가 자연스럽고, 함께 있을 때 ‘마음이 놓인다’는 인상을 주기 쉽습니다. 관계를 부드럽게 이어가는 힘이 좋지만, 때로는 내 마음보다 상대를 먼저 살피느라 지칠 수도 있습니다. 배려만큼 내 감정도 돌보면 더 건강한 관계가 됩니다.", strengths: ["상대 기분을 섬세하게 읽는 공감력", "대화 분위기를 부드럽게 만드는 감각", "상대가 편안함을 느끼게 하는 다정함"], tip: "상대의 감정만큼 내 감정도 중요한 정보예요. 배려와 표현을 함께 가져가 보세요.", moodTitle: "추천 데이트 무드", moodItems: ["전시회 데이트", "포토부스 찍기", "편지 주고받기"], matchTitle: "찰떡 궁합", matchLabel: "관찰 신호등형", matchDescription: "당신의 따뜻함과 상대의 섬세함이 만나면 깊고 조용한 호흡이 만들어집니다.", heroEmoji: "💁" },
        signal: { title: "관찰 신호등형", summary: "상황과 타이밍을 읽으며 깊이 있게 관계를 살피는 타입", description: "당신은 눈에 보이는 말보다 분위기, 맥락, 타이밍 같은 보이지 않는 흐름을 잘 읽는 편입니다. 성급히 결론 내리기보다 한 번 더 관찰하고 생각한 뒤 움직이는 경향이 있고, 그만큼 관계를 깊게 이해하려는 힘이 있습니다. 다만 마음속 정리가 길어지면 표현 타이밍을 놓칠 수 있으니, 완벽하게 정리되기 전에도 조금씩 꺼내는 연습이 도움이 됩니다.", strengths: ["상황을 읽고 타이밍을 잡는 감각", "감정과 맥락을 깊게 해석하는 시선", "가볍지 않은 관계를 만들어가는 진중함"], tip: "모든 생각이 끝난 뒤에 말하려 하지 않아도 괜찮아요. 중간 생각도 충분히 대화가 됩니다.", moodTitle: "추천 데이트 무드", moodItems: ["야경 보기", "긴 산책", "조용한 바에서 대화"], matchTitle: "찰떡 궁합", matchLabel: "다정 안내원형", matchDescription: "상대의 다정한 표현이 당신의 깊은 생각을 편안하게 꺼내게 도와줍니다.", heroEmoji: "🚦" }
      },
      resultPreview: ["직진 기관사형", "안정 역장형", "다정 안내원형", "관찰 신호등형"],
      relatedIds: ["test-002", "test-005", "test-006"],
      callout: "결과를 친구에게 보내고 서로의 운행 타입을 비교해보면 더 재밌어요."
    }),
    "test-002": createPage({
      category: "심리 체크",
      title: "직장인 회복력 체크",
      summary: "요즘 업무 피로를 어떻게 소화하고 있는지, 나의 회복 탄력성을 10문항으로 살펴보는 테스트입니다.",
      heroCardSubtitle: "요즘 나의 배터리 잔량",
      heroArt: { centerEmoji: "🧃", stickers: ["🌿", "☕", "🛋️", "📩", "🫧", "🪴", "🌤️", "💤"] },
      loadingMessage: "답변을 조합해서 당신의 회복 루틴과 현재 에너지 상태를 정리하고 있습니다.",
      questions: [
        { prompt: "업무가 몰릴 때 나는 먼저 무엇을 하나요?", options: [{ label: "우선순위를 정리하고 할 일을 쪼개서 본다.", scores: { ritual: 2, buffer: 1 } }, { label: "일단 눈앞의 급한 것부터 처리하며 버틴다.", scores: { sprint: 2, alert: 1 } }] },
        { prompt: "퇴근 후 가장 자주 드는 생각은?", options: [{ label: "잠깐 쉬고 나면 다시 괜찮아질 것 같다.", scores: { buffer: 2 } }, { label: "아무것도 하기 싫고 기운이 뚝 떨어진다.", scores: { alert: 2, sprint: 1 } }] },
        { prompt: "휴식 시간이 생기면 더 끌리는 쪽은?", options: [{ label: "혼자 조용히 정리되는 시간을 갖고 싶다.", scores: { reset: 2, ritual: 1 } }, { label: "사람 만나며 기분 전환을 하고 싶다.", scores: { buffer: 2, sprint: 1 } }] },
        { prompt: "일이 꼬일 때 내 반응은?", options: [{ label: "문제가 뭔지 바로 파악하고 다시 순서를 잡는다.", scores: { ritual: 2 } }, { label: "속으로는 지치지만 표면적으로는 일단 끌고 간다.", scores: { sprint: 2, alert: 1 } }] },
        { prompt: "휴대폰 알림이 쌓이면 어떤 편인가요?", options: [{ label: "한 번에 정리하며 흐름을 통제하려 한다.", scores: { ritual: 2, reset: 1 } }, { label: "알림만 봐도 더 피곤해져서 미루게 된다.", scores: { alert: 2 } }] },
        { prompt: "요즘 주말을 보내는 방식은?", options: [{ label: "에너지를 채우는 루틴을 일부러 만든다.", scores: { reset: 2, ritual: 1 } }, { label: "쉬긴 쉬는데 회복된 느낌은 잘 안 든다.", scores: { alert: 2, sprint: 1 } }] },
        { prompt: "동료가 힘들어 보일 때 나는?", options: [{ label: "서로 무너지지 않게 분위기를 살피고 챙긴다.", scores: { buffer: 2 } }, { label: "나도 벅차서 먼저 내 일부터 끝내고 싶다.", scores: { sprint: 2, alert: 1 } }] },
        { prompt: "에너지 관리에서 더 중요한 것은?", options: [{ label: "무너지기 전에 쉬는 타이밍을 잡는 것", scores: { reset: 2, ritual: 1 } }, { label: "어쨌든 마감 전까지 버티는 추진력", scores: { sprint: 2 } }] },
        { prompt: "연속으로 바쁜 날이 이어질 때 나는?", options: [{ label: "짧아도 쉬는 루틴을 꼭 넣으려 한다.", scores: { ritual: 2, reset: 1 } }, { label: "쉬는 감각이 무뎌져 그냥 관성으로 움직인다.", scores: { alert: 2 } }] },
        { prompt: "지금의 나를 가장 잘 설명하는 말은?", options: [{ label: "피곤해도 회복 포인트를 아는 편", scores: { buffer: 2, ritual: 1 } }, { label: "쉬어도 덜 쉬는 느낌이 남아 있다.", scores: { alert: 2, reset: 1 } }] }
      ],
      results: {
        sprint: { title: "버티는 스프린터형", summary: "체력과 책임감으로 끝까지 끌고 가는 편", description: "당신은 바쁜 상황에서 일단 해내는 힘이 강합니다. 순간 추진력과 책임감이 좋아 팀에서 믿음직하게 보일 수 있지만, 회복 없이 오래 버티는 방식이 굳어지면 어느 순간 급격히 방전될 수 있습니다.", strengths: ["마감 앞에서 강한 집중력", "어려운 상황에서도 손을 놓지 않는 끈기", "실행력이 빠르고 즉각적임"], tip: "버티는 힘이 큰 만큼, 쉬는 힘을 루틴으로 만들면 훨씬 오래 갑니다.", moodTitle: "지금 추천하는 회복 방식", moodItems: ["할 일 3개만 남기기", "퇴근 후 무알림 1시간", "짧은 낮잠"], matchTitle: "찰떡 조합", matchLabel: "리셋 설계형", matchDescription: "당신의 추진력에 회복 루틴이 얹히면 오래 가는 페이스가 완성됩니다.", heroEmoji: "🏃" },
        buffer: { title: "회복 쿠션형", summary: "무리 속에서도 사람과 감정의 쿠션을 만드는 편", description: "당신은 바쁜 일상 속에서도 나와 주변의 기분을 함께 살피는 편입니다. 너무 거칠게 몰아붙이기보다 완충 지대를 만들 줄 알아서, 오래 봤을 때 안정감 있는 회복력을 보여줍니다.", strengths: ["분위기를 부드럽게 만드는 힘", "과몰입 직전에 템포를 낮추는 감각", "타인과 나를 함께 챙기는 균형"], tip: "이미 좋은 완충 장치를 갖고 있으니, 피로 신호를 더 빨리 기록해보면 회복 속도가 빨라집니다.", moodTitle: "지금 추천하는 회복 방식", moodItems: ["따뜻한 음료", "가벼운 산책", "친한 사람과 통화"], matchTitle: "찰떡 조합", matchLabel: "루틴 관리자형", matchDescription: "당신의 완충력과 루틴형의 정리력이 합쳐지면 번아웃 예방 효과가 큽니다.", heroEmoji: "🛟" },
        reset: { title: "리셋 설계형", summary: "쉬는 시간도 전략적으로 설계하는 편", description: "당신은 쉬는 방식에 기준이 있는 사람입니다. 막연히 쉬기보다 언제, 어떻게 쉬어야 효과가 나는지 감을 알고 있고, 나를 다시 세팅하는 루틴을 만드는 데 강점이 있습니다.", strengths: ["회복 루틴을 구조화하는 능력", "피로 신호를 비교적 빨리 감지함", "일과 휴식의 간격을 조절하는 힘"], tip: "지금의 루틴을 지키는 것만으로도 충분히 강점입니다. 가끔은 계획 없는 휴식도 허용해보세요.", moodTitle: "지금 추천하는 회복 방식", moodItems: ["산책 루틴", "스트레칭 10분", "취침 전 디지털 오프"], matchTitle: "찰떡 조합", matchLabel: "버티는 스프린터형", matchDescription: "스프린터형의 추진력을 당신의 리셋 감각이 균형 있게 잡아줍니다.", heroEmoji: "🔋" },
        alert: { title: "방전 경고형", summary: "지금은 쉬는 감각을 회복하는 것이 먼저인 상태", description: "당신은 현재 피로가 꽤 쌓여 있는 쪽에 가깝습니다. 쉬고 있어도 완전히 회복되지 않는 느낌이 남거나, 아무것도 하기 싫은 순간이 반복될 수 있습니다. 이건 의지 부족보다 에너지 적신호에 가깝습니다.", strengths: ["이미 내 상태를 인식하고 있다는 점", "과한 부담에서 물러서야 할 순간을 느끼는 감각", "지금 필요한 도움을 찾을 가능성이 높음"], tip: "회복은 의지가 아니라 자원입니다. 이번 주는 줄일 것 한 가지를 먼저 정하는 게 중요해요.", moodTitle: "지금 추천하는 회복 방식", moodItems: ["일정 하나 미루기", "잠부터 확보하기", "조용한 혼자 시간"], matchTitle: "찰떡 조합", matchLabel: "회복 쿠션형", matchDescription: "완충을 잘 만드는 사람과 함께 있으면 당신의 피로도 훨씬 빨리 낮아질 수 있습니다.", heroEmoji: "🚨" }
      },
      resultPreview: ["버티는 스프린터형", "회복 쿠션형", "리셋 설계형", "방전 경고형"],
      relatedIds: ["test-004", "test-006", "test-001"],
      callout: "지금 내 배터리 상태를 친구와 비교해보면 의외로 서로의 회복 방식 차이가 잘 보여요."
    }),
    "test-003": createPage({
      category: "취향 테스트",
      title: "나만의 여행 성향 찾기",
      summary: "여행 준비부터 현지 일정까지, 내가 가장 편안하게 움직이는 여행 리듬을 알아보는 테스트입니다.",
      heroCardSubtitle: "계획파 vs 즉흥파",
      heroArt: { centerEmoji: "🗺️", stickers: ["🌤️", "🧳", "🍊", "📸", "🚌", "🗿", "🍜", "🌊"] },
      loadingMessage: "답변을 조합해서 당신에게 가장 잘 맞는 여행 스타일을 정리하고 있습니다.",
      questions: [
        { prompt: "여행 준비를 시작할 때 먼저 하는 일은?", options: [{ label: "숙소, 동선, 맛집부터 차근차근 정리한다.", scores: { planner: 2, comfort: 1 } }, { label: "대략적인 지역만 정하고 현지에서 흐름을 본다.", scores: { explorer: 2, local: 1 } }] },
        { prompt: "예상치 못한 비가 온다면?", options: [{ label: "플랜 B를 꺼내서 일정을 바로 바꾼다.", scores: { planner: 2 } }, { label: "비 오는 분위기 자체를 즐길 수 있는 곳을 찾는다.", scores: { explorer: 2, local: 1 } }] },
        { prompt: "숙소를 고를 때 더 중요한 것은?", options: [{ label: "교통, 청결, 동선이 좋은 안정감", scores: { comfort: 2, planner: 1 } }, { label: "동네 분위기와 낯선 매력이 느껴지는 경험", scores: { local: 2, explorer: 1 } }] },
        { prompt: "여행 사진 스타일은?", options: [{ label: "미리 저장한 포인트를 정확히 찍는 편", scores: { planner: 2 } }, { label: "걷다가 우연히 만난 장면을 담는 편", scores: { explorer: 2, local: 1 } }] },
        { prompt: "현지 식당에 들어갈 때 나는?", options: [{ label: "후기와 평점을 확인하고 실패 확률을 줄인다.", scores: { comfort: 2, planner: 1 } }, { label: "왠지 끌리는 곳이면 직접 들어가 본다.", scores: { explorer: 2, local: 1 } }] },
        { prompt: "여행의 만족도를 좌우하는 건?", options: [{ label: "계획한 코스를 부드럽게 소화한 느낌", scores: { planner: 2, comfort: 1 } }, { label: "예상 밖의 장면을 만난 순간", scores: { explorer: 2, local: 1 } }] },
        { prompt: "동행이 갑자기 일정을 바꾸자고 하면?", options: [{ label: "변경 이유만 괜찮으면 다시 짜서 맞춰본다.", scores: { comfort: 2, planner: 1 } }, { label: "좋아, 그게 더 재밌을 수도 있지 하고 따라간다.", scores: { explorer: 2 } }] },
        { prompt: "혼자 여행을 간다면 더 끌리는 건?", options: [{ label: "안정적이고 잘 알려진 도시", scores: { comfort: 2 } }, { label: "동네를 천천히 걷기 좋은 지역", scores: { local: 2, explorer: 1 } }] },
        { prompt: "기념품을 고를 때 나는?", options: [{ label: "꼭 필요한 선물 위주로 깔끔하게 산다.", scores: { planner: 2, comfort: 1 } }, { label: "현지 감성이 묻은 작은 물건을 한참 본다.", scores: { local: 2 } }] },
        { prompt: "여행 후 가장 오래 남는 기억은?", options: [{ label: "모든 게 순조롭게 맞아떨어진 하루", scores: { planner: 2, comfort: 1 } }, { label: "즉흥적으로 들어간 골목이나 가게", scores: { explorer: 2, local: 1 } }] }
      ],
      results: {
        planner: { title: "동선 설계자형", summary: "여행의 흐름을 미리 그려두면 더 편안한 타입", description: "당신은 여행에서 준비가 곧 즐거움인 사람에 가깝습니다. 미리 정리한 동선과 정보가 있어야 현지에서도 더 여유를 느끼고, 일정이 부드럽게 맞아떨어질 때 만족도가 큽니다.", strengths: ["실패 확률을 줄이는 준비성", "동행과의 일정 조율이 안정적임", "시간과 체력을 효율적으로 쓰는 편"], tip: "준비가 강점인 만큼 하루 한 칸 정도는 즉흥 슬롯으로 비워두면 여행의 재미가 더 살아나요.", moodTitle: "추천 여행 무드", moodItems: ["도시 2박 3일", "맛집 지도 만들기", "테마별 하루 코스"], matchTitle: "찰떡 동행", matchLabel: "동네 산책가형", matchDescription: "당신의 안정감에 상대의 현지 감성이 더해지면 여행이 한층 다채로워집니다.", heroEmoji: "🧭" },
        explorer: { title: "즉흥 모험가형", summary: "예상 밖의 순간을 만나야 여행이 재밌는 타입", description: "당신은 여행에서 우연한 장면과 낯선 자극을 즐깁니다. 계획이 너무 촘촘하면 오히려 답답할 수 있고, 현지에서 방향을 틀 수 있는 여유가 있어야 만족도가 올라갑니다.", strengths: ["새로운 장소에 대한 적응력", "즉흥 상황을 즐기는 유연함", "여행 자체의 생동감을 크게 느끼는 편"], tip: "즉흥성이 강점이라도 숙소와 첫 이동 동선만큼은 최소한 잡아두면 더 편하게 즐길 수 있어요.", moodTitle: "추천 여행 무드", moodItems: ["골목 탐방", "노플랜 하루", "우연히 들어간 카페"], matchTitle: "찰떡 동행", matchLabel: "안정 휴양형", matchDescription: "상대가 기본 축을 잡아주면 당신의 즉흥성이 더 빛나고 피로는 줄어듭니다.", heroEmoji: "🎒" },
        comfort: { title: "안정 휴양형", summary: "몸과 마음이 편해야 진짜 여행을 즐길 수 있는 타입", description: "당신은 여행에서도 컨디션과 편안함을 중요하게 생각합니다. 좋은 숙소, 무리 없는 이동, 과하지 않은 일정을 선호하고, 그렇게 해야 진짜로 풍경과 기분을 즐길 수 있습니다.", strengths: ["내 컨디션을 잘 아는 감각", "무리하지 않는 일정 조절", "동행을 편안하게 만드는 배려"], tip: "편안함 위에 작은 모험 한 가지를 얹으면 여행 만족도가 더 커질 수 있어요.", moodTitle: "추천 여행 무드", moodItems: ["리조트 휴양", "브런치 중심 일정", "느린 체크리스트"], matchTitle: "찰떡 동행", matchLabel: "즉흥 모험가형", matchDescription: "상대의 생동감이 여행의 온도를 높이고, 당신의 안정감이 리듬을 잡아줍니다.", heroEmoji: "🏖️" },
        local: { title: "동네 산책가형", summary: "관광지보다 그 도시의 생활감을 좋아하는 타입", description: "당신은 유명한 포인트를 다 보는 것보다, 그 도시의 평범한 결을 천천히 느끼는 편입니다. 작은 가게, 주택가, 동네 카페처럼 생활감이 있는 장면에서 더 큰 만족을 느낍니다.", strengths: ["장소의 분위기를 깊게 느끼는 감각", "관광보다 생활형 경험에 강함", "은근히 오래 남는 기억을 잘 만듦"], tip: "좋아하는 동네 한 곳을 정해 오래 머물러보는 방식이 특히 잘 맞습니다.", moodTitle: "추천 여행 무드", moodItems: ["동네 카페 투어", "시장 구경", "아침 산책"], matchTitle: "찰떡 동행", matchLabel: "동선 설계자형", matchDescription: "상대가 큰 흐름을 잡아주면 당신은 그 안에서 가장 좋은 동네의 결을 찾아낼 수 있어요.", heroEmoji: "🏘️" }
      },
      resultPreview: ["동선 설계자형", "즉흥 모험가형", "안정 휴양형", "동네 산책가형"],
      relatedIds: ["test-006", "test-001", "test-005"],
      callout: "여행 같이 가는 친구와 서로 결과를 비교하면, 왜 준비 방식이 달랐는지 재밌게 보일 거예요."
    }),
    "test-004": createPage({
      category: "자기관리",
      title: "집중력 루틴 진단",
      summary: "집중이 잘되는 시간과 방식, 그리고 내가 몰입을 유지하는 루틴을 10문항으로 점검해보는 테스트입니다.",
      heroCardSubtitle: "내 집중 스위치는?",
      heroArt: { centerEmoji: "🧠", stickers: ["📚", "⏰", "✨", "🎧", "🪄", "💡", "📝", "☕"] },
      loadingMessage: "답변을 조합해서 당신의 집중 스타일과 맞는 루틴을 정리하고 있습니다.",
      questions: [
        { prompt: "할 일을 시작할 때 더 필요한 것은?", options: [{ label: "정리된 리스트와 분명한 순서", scores: { timer: 2, ritual: 1 } }, { label: "흥미가 생기는 순간 바로 뛰어드는 감각", scores: { diver: 2, spark: 1 } }] },
        { prompt: "집중이 잘되는 시간대는?", options: [{ label: "정해진 루틴이 있는 시간", scores: { ritual: 2, timer: 1 } }, { label: "그날 갑자기 감이 오는 순간", scores: { diver: 2, spark: 1 } }] },
        { prompt: "작업 환경을 만들 때 나는?", options: [{ label: "책상, 음료, 조명까지 일정하게 맞춘다.", scores: { ritual: 2 } }, { label: "환경은 조금 달라도 바로 흐름을 타는 편이다.", scores: { diver: 2 } }] },
        { prompt: "집중이 끊겼을 때 더 가까운 반응은?", options: [{ label: "잠깐 멈추고 다시 리셋 포인트를 만든다.", scores: { timer: 2, ritual: 1 } }, { label: "다른 일로 넘어갔다가 다시 돌아온다.", scores: { spark: 2, diver: 1 } }] },
        { prompt: "마감이 다가오면 나는?", options: [{ label: "시간을 쪼개며 남은 작업량을 관리한다.", scores: { timer: 2 } }, { label: "압박이 오히려 몰입 스위치를 켠다.", scores: { diver: 2, spark: 1 } }] },
        { prompt: "좋아하는 작업 방식은?", options: [{ label: "짧게 끊어 가며 꾸준히 진도 내기", scores: { timer: 2, ritual: 1 } }, { label: "한 번 시작하면 길게 파고들기", scores: { diver: 2 } }] },
        { prompt: "잡생각이 많아질 때 나는?", options: [{ label: "메모하고 다시 해야 할 일로 돌아온다.", scores: { ritual: 2, timer: 1 } }, { label: "잡생각도 아이디어라 느껴 잠깐 따라가본다.", scores: { spark: 2 } }] },
        { prompt: "멀티태스킹에 대한 태도는?", options: [{ label: "한 번에 하나씩 끝내는 게 훨씬 효율적이다.", scores: { timer: 2, ritual: 1 } }, { label: "두세 가지를 번갈아야 오히려 덜 질린다.", scores: { spark: 2, diver: 1 } }] },
        { prompt: "집중이 가장 잘되는 순간은?", options: [{ label: "내가 만든 루틴이 딱 맞아떨어질 때", scores: { ritual: 2 } }, { label: "재밌는 문제를 발견해 몰입이 붙을 때", scores: { diver: 2, spark: 1 } }] },
        { prompt: "지금의 나에게 필요한 건?", options: [{ label: "꾸준히 유지할 수 있는 집중 구조", scores: { timer: 2, ritual: 1 } }, { label: "새로운 자극과 흥미를 살리는 장치", scores: { spark: 2, diver: 1 } }] }
      ],
      results: {
        timer: { title: "시간 설계형", summary: "시간을 잘게 쪼개며 꾸준히 진도를 내는 타입", description: "당신은 작업을 한 번에 몰아치기보다, 시간을 나누고 흐름을 관리하면서 안정적으로 진도를 내는 편입니다. 부담을 낮추고 꾸준함을 만드는 구조에 강합니다.", strengths: ["일정을 작은 단위로 잘 나눔", "진도 관리가 안정적임", "마감 앞에서 비교적 흔들림이 적음"], tip: "지금 구조 위에 시작 전 5분 워밍업만 더하면 몰입 속도가 더 빨라질 수 있어요.", moodTitle: "추천 집중 루틴", moodItems: ["25분 집중", "체크리스트 3개", "타이머 사용"], matchTitle: "찰떡 보완", matchLabel: "몰입 잠수형", matchDescription: "당신의 구조감에 상대의 깊은 몰입이 더해지면 실행과 완성도가 모두 좋아집니다.", heroEmoji: "⏱️" },
        diver: { title: "몰입 잠수형", summary: "한 번 흐름이 붙으면 깊게 파고드는 타입", description: "당신은 흥미가 붙는 순간 집중력이 깊게 내려가는 편입니다. 시작 장벽만 넘으면 오랫동안 몰입할 수 있고, 특히 한 가지를 깊게 파고들 때 강점을 보입니다.", strengths: ["깊은 몰입이 가능함", "복잡한 문제를 오래 붙들 수 있음", "완성도 있는 결과를 만드는 편"], tip: "시작 장벽을 낮추는 장치를 만들면 당신의 몰입력은 훨씬 자주 발휘됩니다.", moodTitle: "추천 집중 루틴", moodItems: ["시작 전 3분 정리", "방해 요소 차단", "긴 몰입 블록"], matchTitle: "찰떡 보완", matchLabel: "시간 설계형", matchDescription: "상대의 구조감이 당신의 몰입을 더 자주, 더 안정적으로 끌어낼 수 있습니다.", heroEmoji: "🌊" },
        ritual: { title: "루틴 관리자형", summary: "환경과 흐름을 세팅해야 집중이 살아나는 타입", description: "당신은 집중을 의지보다 시스템으로 보는 편입니다. 책상, 음료, 조명, 순서 같은 작은 루틴이 잘 맞을수록 몰입력이 좋아지고, 그 안정감 속에서 성과가 잘 납니다.", strengths: ["집중 환경을 잘 설계함", "반복 가능한 루틴을 만들 줄 앎", "컨디션에 따라 조절하는 감각이 좋음"], tip: "이미 시스템이 있는 편이니, 루틴이 무너졌을 때 복구하는 백업 루틴도 하나 준비해보세요.", moodTitle: "추천 집중 루틴", moodItems: ["고정 플레이리스트", "책상 리셋", "시작 신호 만들기"], matchTitle: "찰떡 보완", matchLabel: "반짝 아이디어형", matchDescription: "당신의 안정적 루틴에 상대의 새로운 자극이 더해지면 지루함 없이 오래 갈 수 있습니다.", heroEmoji: "🪄" },
        spark: { title: "반짝 아이디어형", summary: "새로운 자극과 흥미가 붙을 때 집중이 살아나는 타입", description: "당신은 일정한 반복보다 새로운 흥미와 자극이 있을 때 집중력이 확 살아나는 편입니다. 아이디어 전환이 빠르고, 질리지 않게 작업 흐름을 바꾸는 데 강점이 있습니다.", strengths: ["새로운 관점과 아이디어 전환이 빠름", "지루함을 줄이는 감각이 있음", "복수의 관심사를 연결하는 능력"], tip: "흥미는 강점이지만 흩어짐도 함께 옵니다. 마무리 장치를 하나 두면 결과가 훨씬 좋아져요.", moodTitle: "추천 집중 루틴", moodItems: ["작업 배경 바꾸기", "보상 간식", "짧은 전환 휴식"], matchTitle: "찰떡 보완", matchLabel: "루틴 관리자형", matchDescription: "당신의 생동감에 상대의 구조감이 더해지면 실행력이 안정적으로 이어집니다.", heroEmoji: "✨" }
      },
      resultPreview: ["시간 설계형", "몰입 잠수형", "루틴 관리자형", "반짝 아이디어형"],
      relatedIds: ["test-002", "test-006", "test-003"],
      callout: "내 집중 방식이 친구와 어떻게 다른지 비교해보면 공부나 일할 때 더 잘 맞는 조합도 찾을 수 있어요."
    }),
    "test-005": createPage({
      category: "관계 테스트",
      title: "친구 케미 점수 보기",
      summary: "친구 사이에서 내가 자주 맡는 역할과, 어떤 케미가 가장 편한지 알아보는 관계 테스트입니다.",
      heroCardSubtitle: "우리 호흡은 몇 점?",
      heroArt: { centerEmoji: "🫂", stickers: ["🎈", "📱", "🌈", "🎮", "🍿", "💬", "🧃", "🧁"] },
      loadingMessage: "답변을 조합해서 당신의 친구 케미 포지션을 정리하고 있습니다.",
      questions: [
        { prompt: "모임 날짜를 잡을 때 나는?", options: [{ label: "사람들 의견을 모아 일정표처럼 정리한다.", scores: { manager: 2, listener: 1 } }, { label: "가볍게 분위기를 띄우며 참여를 유도한다.", scores: { spark: 2, free: 1 } }] },
        { prompt: "친구가 고민을 말하면 더 가까운 쪽은?", options: [{ label: "끝까지 들어주고 감정부터 공감한다.", scores: { listener: 2 } }, { label: "상황을 가볍게 풀며 기분을 환기시킨다.", scores: { spark: 2, free: 1 } }] },
        { prompt: "단톡방에서 나는 어떤 편인가요?", options: [{ label: "필요한 정보나 정리를 잘 올리는 편", scores: { manager: 2 } }, { label: "짤, 농담, 반응으로 분위기를 살리는 편", scores: { spark: 2 } }] },
        { prompt: "약속 장소에 조금 늦을 것 같다면?", options: [{ label: "미리 상황을 공유하고 최대한 정확히 알린다.", scores: { manager: 2, listener: 1 } }, { label: "유연하게 합류하면서 흐름을 맞춘다.", scores: { free: 2 } }] },
        { prompt: "여행이나 놀러 갈 때 나는?", options: [{ label: "필요한 것들을 챙기며 빠진 부분을 본다.", scores: { manager: 2 } }, { label: "당일의 재미와 분위기를 크게 만든다.", scores: { spark: 2, free: 1 } }] },
        { prompt: "친구가 서운해 보일 때 나는?", options: [{ label: "따로 연락해 차분히 마음을 묻는다.", scores: { listener: 2 } }, { label: "자연스럽게 웃으며 어색함을 풀어본다.", scores: { spark: 2, free: 1 } }] },
        { prompt: "내가 제일 편한 친구 관계는?", options: [{ label: "약속과 흐름이 안정적으로 맞는 관계", scores: { manager: 2, listener: 1 } }, { label: "즉흥적이어도 재밌고 편한 관계", scores: { free: 2, spark: 1 } }] },
        { prompt: "모임이 조용해질 때 나는?", options: [{ label: "사람들 상태를 보고 대화 주제를 다시 꺼낸다.", scores: { listener: 2, manager: 1 } }, { label: "일단 웃기거나 재밌는 얘기로 공기를 바꾼다.", scores: { spark: 2 } }] },
        { prompt: "갈등 상황에서 더 가까운 내 역할은?", options: [{ label: "오해가 안 커지게 정리하고 중간을 맞춘다.", scores: { manager: 2, listener: 1 } }, { label: "너무 무겁지 않게 분위기를 누그러뜨린다.", scores: { free: 2, spark: 1 } }] },
        { prompt: "친구들이 나를 자주 찾는 이유는?", options: [{ label: "믿고 맡길 수 있는 안정감이 있어서", scores: { manager: 2, listener: 1 } }, { label: "함께 있으면 재밌고 편해져서", scores: { spark: 2, free: 1 } }] }
      ],
      results: {
        manager: { title: "든든한 총무형", summary: "모임의 흐름과 실무를 은근히 책임지는 타입", description: "당신은 친구 관계에서도 자연스럽게 판을 정리하는 역할을 맡는 편입니다. 일정, 준비물, 흐름을 맞추는 데 강점이 있어 주변에서 믿고 기대는 사람이 되기 쉽습니다.", strengths: ["정리와 조율에 강함", "사람들이 편하게 움직이게 만듦", "믿고 맡길 수 있는 안정감"], tip: "책임지는 역할이 익숙해도, 가끔은 남이 정한 흐름에 편하게 올라타는 시간도 필요해요.", moodTitle: "찰떡 친구 무드", moodItems: ["계획 여행", "역할 분담", "단체 일정 조율"], matchTitle: "잘 맞는 조합", matchLabel: "분위기 메이커형", matchDescription: "당신의 정리력과 상대의 생동감이 만나면 모임이 가장 안정적이면서도 재밌어집니다.", heroEmoji: "📋" },
        listener: { title: "다정한 공감형", summary: "친구 마음을 잘 읽고 정서적 쿠션이 되는 타입", description: "당신은 무리 속에서도 누가 지쳤는지, 누가 서운한지 빠르게 느끼는 편입니다. 조용히 들어주고 진심으로 반응해주는 힘이 커서 관계를 오래가게 만드는 역할을 합니다.", strengths: ["친구의 감정 변화를 잘 읽음", "깊은 대화를 편안하게 만듦", "관계를 오래 유지하는 안정감"], tip: "공감도 좋지만 내 기분도 같이 표현해야 관계가 더 건강하게 오래 갑니다.", moodTitle: "찰떡 친구 무드", moodItems: ["산책 수다", "심야 통화", "조용한 카페"], matchTitle: "잘 맞는 조합", matchLabel: "자유로운 즉흥형", matchDescription: "상대의 가벼움이 당신의 부담을 덜고, 당신의 다정함이 관계를 깊게 만들어줍니다.", heroEmoji: "💗" },
        spark: { title: "분위기 메이커형", summary: "친구 사이 공기를 환하게 바꾸는 타입", description: "당신은 함께 있을 때 분위기를 띄우고, 어색함을 줄이는 데 강점이 있습니다. 무거워질 수 있는 순간에도 자연스럽게 유쾌한 흐름을 만들며 모임의 온도를 올립니다.", strengths: ["사람들을 웃게 만드는 힘", "어색한 순간을 풀어내는 감각", "함께 있으면 기억이 선명해짐"], tip: "즐거움이 강점인 만큼, 가끔은 진지한 마음도 함께 보여주면 더 깊은 신뢰가 생깁니다.", moodTitle: "찰떡 친구 무드", moodItems: ["즉흥 번개", "놀이형 모임", "짧은 여행"], matchTitle: "잘 맞는 조합", matchLabel: "든든한 총무형", matchDescription: "상대가 흐름을 잡아주면 당신의 에너지가 훨씬 편하게 빛날 수 있습니다.", heroEmoji: "🎉" },
        free: { title: "자유로운 즉흥형", summary: "편하고 자연스러운 흐름 속에서 케미가 살아나는 타입", description: "당신은 규칙보다 편안함과 자연스러운 호흡을 중요하게 생각합니다. 즉흥적인 제안에도 잘 반응하고, 너무 빡빡한 관계보다 부담 없는 케미에서 만족도가 높습니다.", strengths: ["유연하고 편안한 분위기", "즉흥 상황에 대한 적응력", "친구를 부담 없이 이어주는 감각"], tip: "자유로움이 강점이라도, 중요한 약속 한두 가지는 더 선명하게 챙기면 신뢰가 더 커집니다.", moodTitle: "찰떡 친구 무드", moodItems: ["당일 약속", "드라이브", "동네 산책"], matchTitle: "잘 맞는 조합", matchLabel: "다정한 공감형", matchDescription: "상대의 세심함이 당신의 자유로움을 더 편안하게 지켜주고, 당신은 관계에 숨통을 틔워줍니다.", heroEmoji: "🌈" }
      },
      resultPreview: ["든든한 총무형", "다정한 공감형", "분위기 메이커형", "자유로운 즉흥형"],
      relatedIds: ["test-001", "test-003", "test-006"],
      callout: "친구들과 서로 결과를 공유하면, 왜 약속 잡는 방식이 다른지 은근 잘 보입니다."
    }),
    "test-006": createPage({
      category: "라이프",
      title: "주말 충전 방식 찾기",
      summary: "주말에 내가 가장 잘 회복되는 방식이 무엇인지, 나에게 맞는 충전 루틴을 알아보는 테스트입니다.",
      heroCardSubtitle: "밖순이 vs 집순이",
      heroArt: { centerEmoji: "🛌", stickers: ["🌙", "🧺", "🎧", "🛋️", "☀️", "🧋", "🧸", "🚶"] },
      loadingMessage: "답변을 조합해서 당신에게 가장 잘 맞는 주말 충전 방식을 정리하고 있습니다.",
      questions: [
        { prompt: "주말 아침이 오면 가장 먼저 드는 생각은?", options: [{ label: "오늘은 집에서 천천히 늘어지고 싶다.", scores: { cocoon: 2, reset: 1 } }, { label: "나가기 전부터 기분 좋은 일정이 떠오른다.", scores: { social: 2, roam: 1 } }] },
        { prompt: "기분 전환이 필요할 때 더 끌리는 것은?", options: [{ label: "이불, 소파, 좋아하는 콘텐츠", scores: { cocoon: 2 } }, { label: "밖 공기, 카페, 산책, 약속", scores: { roam: 2, social: 1 } }] },
        { prompt: "친구가 주말 번개를 제안하면?", options: [{ label: "상태가 괜찮으면 좋지만 우선 쉬는 일정부터 본다.", scores: { reset: 2, cocoon: 1 } }, { label: "재밌겠다 싶으면 꽤 쉽게 나가는 편이다.", scores: { social: 2, roam: 1 } }] },
        { prompt: "주말 만족도를 가장 크게 좌우하는 건?", options: [{ label: "몸이 확실히 쉬었다는 느낌", scores: { reset: 2, cocoon: 1 } }, { label: "좋은 사람이나 장소를 만난 기분", scores: { social: 2, roam: 1 } }] },
        { prompt: "주말에 외출한다면 더 가까운 쪽은?", options: [{ label: "꼭 필요한 일정만 짧게 다녀온다.", scores: { cocoon: 2, reset: 1 } }, { label: "겸사겸사 여기저기 둘러보며 시간을 쓴다.", scores: { roam: 2 } }] },
        { prompt: "나를 제일 잘 살리는 휴식은?", options: [{ label: "혼자 보내는 깊은 정리 시간", scores: { reset: 2, cocoon: 1 } }, { label: "즐거운 약속이나 소소한 모임", scores: { social: 2 } }] },
        { prompt: "주말 저녁이 다가올 때 나는?", options: [{ label: "내일을 위해 에너지를 잘 남겨두고 싶다.", scores: { reset: 2 } }, { label: "마지막까지 재밌게 보내고 싶다.", scores: { social: 2, roam: 1 } }] },
        { prompt: "쇼핑이나 구경을 할 때는?", options: [{ label: "딱 필요한 것만 사고 빨리 돌아온다.", scores: { cocoon: 2 } }, { label: "걷다가 발견한 곳도 들러본다.", scores: { roam: 2, social: 1 } }] },
        { prompt: "주말 계획을 세울 때 더 중요한 건?", options: [{ label: "충분히 쉬는 시간 확보", scores: { reset: 2, cocoon: 1 } }, { label: "한두 개라도 기분 좋은 일정 넣기", scores: { social: 2, roam: 1 } }] },
        { prompt: "지금의 나에게 가장 필요한 주말은?", options: [{ label: "아무도 방해하지 않는 집콕 회복", scores: { cocoon: 2, reset: 1 } }, { label: "햇빛 보고 나가서 기분 환기하기", scores: { roam: 2, social: 1 } }] }
      ],
      results: {
        cocoon: { title: "포근 집콕형", summary: "집 안에서 천천히 충전해야 진짜 회복되는 타입", description: "당신은 주말의 핵심을 ‘밖에 나가지 않아도 괜찮은 평온함’에서 찾는 편입니다. 혼자 있는 시간, 좋아하는 공간, 익숙한 루틴이 몸과 마음을 안정시켜 줍니다.", strengths: ["내가 편한 환경을 잘 앎", "과한 에너지 소비를 줄일 수 있음", "혼자만의 회복 루틴이 분명함"], tip: "집콕이 잘 맞아도 잠깐 햇빛 보는 시간 하나를 더하면 회복감이 더 선명해질 수 있어요.", moodTitle: "추천 주말 루틴", moodItems: ["이불 속 정주행", "늦은 브런치", "집 정리"], matchTitle: "잘 맞는 조합", matchLabel: "가벼운 산책형", matchDescription: "상대가 바깥 공기를 살짝 더해주면 무리 없이 기분 전환까지 챙길 수 있습니다.", heroEmoji: "🏠" },
        social: { title: "약속 충전형", summary: "좋은 사람을 만나야 에너지가 차는 타입", description: "당신은 주말에 사람을 만날 때 오히려 기분이 살아나는 편입니다. 혼자 쉬는 것도 좋지만, 즐거운 약속이 하나쯤 있어야 주말이 더 선명하게 느껴집니다.", strengths: ["사람에게서 에너지를 얻는 편", "좋은 추억이 회복으로 연결됨", "주말의 온도를 높이는 감각"], tip: "약속이 강점이라도 너무 빽빽하면 오히려 피로해질 수 있으니 쉬는 틈도 함께 남겨두세요.", moodTitle: "추천 주말 루틴", moodItems: ["브런치 약속", "친구와 전시", "저녁 산책"], matchTitle: "잘 맞는 조합", matchLabel: "리듬 회복형", matchDescription: "상대의 안정감이 당신의 약속 충전을 과하게 소모되지 않게 잡아줍니다.", heroEmoji: "🎈" },
        reset: { title: "리듬 회복형", summary: "주말의 목적은 다음 주를 위한 밸런스 회복", description: "당신은 주말을 단순히 쉬는 시간이 아니라, 다음 주를 버틸 수 있게 만드는 리셋 시간으로 보는 편입니다. 너무 과하지도, 너무 늘어지지도 않는 균형 감각이 좋습니다.", strengths: ["회복과 생활 리듬을 함께 챙김", "주말 후반에도 안정적으로 컨디션 유지", "다음 주 준비까지 자연스럽게 연결"], tip: "이미 균형감이 좋은 편이라, 하고 싶었던 작은 즐거움 하나를 더 넣으면 만족감이 더 커질 수 있어요.", moodTitle: "추천 주말 루틴", moodItems: ["낮잠 + 산책", "한 끼 제대로 챙기기", "다음 주 가벼운 준비"], matchTitle: "잘 맞는 조합", matchLabel: "포근 집콕형", matchDescription: "상대의 깊은 휴식 감각이 당신의 밸런스를 더 안정적으로 만들어줍니다.", heroEmoji: "🔄" },
        roam: { title: "가벼운 산책형", summary: "집에만 있으면 오히려 답답해지는 타입", description: "당신은 큰 일정이 없어도 밖으로 한 번 나가야 기분이 환기되는 편입니다. 멀리 가지 않아도 동네 산책, 가벼운 구경, 작은 외출이 회복의 핵심이 됩니다.", strengths: ["적은 비용으로도 기분 전환이 가능함", "밖에서 에너지를 재정비하는 감각", "주말을 답답하지 않게 쓰는 편"], tip: "움직임이 잘 맞는 편이라도, 돌아와서 천천히 정리하는 시간까지 붙이면 회복감이 더 오래갑니다.", moodTitle: "추천 주말 루틴", moodItems: ["동네 카페", "공원 산책", "가벼운 장보기"], matchTitle: "잘 맞는 조합", matchLabel: "포근 집콕형", matchDescription: "상대의 느긋함이 당신의 바깥 에너지를 지나치지 않게 잡아주는 조합입니다.", heroEmoji: "🚶" }
      },
      resultPreview: ["포근 집콕형", "약속 충전형", "리듬 회복형", "가벼운 산책형"],
      relatedIds: ["test-003", "test-002", "test-004"],
      callout: "주말에 왜 누군가는 집에 있고 싶고, 누군가는 꼭 나가고 싶은지 서로 비교해보면 재미있어요."
    })
  };

  window.SITE_CONTENT = { cards, pages };
})();
