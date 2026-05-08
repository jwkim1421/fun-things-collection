(function attachSiteContent() {
  window.SITE_CONTENT = {
    cards: [
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
        description: "번아웃 신호를 카드형 콘텐츠로 풀어내는 샘플 페이지 슬롯입니다.",
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
        description: "가볍게 공유하기 좋은 취향형 콘텐츠 예시를 위한 카드입니다.",
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
        description: "광고형 정보 페이지와 테스트형 페이지 사이의 중간 구조를 보여줍니다.",
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
        description: "간단한 결과 공유와 추가 카드 유입을 유도하기 좋은 패턴입니다.",
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
        description: "다음 카드 확장을 염두에 둔 카테고리 카드의 마지막 샘플입니다.",
        href: "./tests/test-006.html",
        badge: "샘플",
        category: "라이프",
        duration: "1분",
        icon: "🛌",
        posterTitle: "주말 충전 방식",
        posterSubtitle: "밖순이 vs 집순이",
        stickers: ["🌙", "🧺", "🎧"],
        thumb: "linear-gradient(135deg, #e2ebff, #ffe1ef)"
      }
    ],
    pages: {
      "test-001": {
        title: "내 연애 열차 운행 타입은?",
        summary: "소개 화면에서 시작해 질문을 한 장씩 넘기며, 연애에서 내가 어떤 리듬으로 관계를 이끄는지 알아보는 테스트입니다.",
        intro: "원핸드로도 편하게 진행되도록 한 화면에 한 질문만 보여주는 구성입니다. 답변은 저장하지 않고 브라우저 안에서만 계산됩니다.",
        pills: ["연애 테스트", "10문항", "원핸드 진행"],
        eyebrow: "Love Train Type Test",
        heroCardTitle: "내 연애 열차 운행 타입은?",
        heroCardSubtitle: "질문 10개로 보는 관계 리듬",
        heroArt: {
          centerEmoji: "🚂",
          stickers: ["💌", "🎟️", "🌼", "☁️", "💗", "🫧", "⭐", "🌙"]
        },
        startLabel: "테스트 시작하기",
        loadingTitle: "결과를 불러오는 중",
        loadingMessage: "답변을 조합해서 당신의 연애 열차 운행 타입을 정리하고 있습니다.",
        loadingHint: "잠시만요. 가장 닮은 관계 리듬을 찾는 중이에요.",
        questions: [
          {
            prompt: "호감 가는 사람에게 답장이 늦게 왔을 때 나는?",
            options: [
              {
                label: "왜 늦었는지 여러 상황을 상상하며 신경이 쓰인다.",
                scores: { engine: 2, signal: 1 }
              },
              {
                label: "상대 리듬을 존중하고 내 일상을 먼저 챙긴다.",
                scores: { station: 2, guide: 1 }
              }
            ]
          },
          {
            prompt: "첫 데이트 장소를 정해야 할 때 더 가까운 쪽은?",
            options: [
              {
                label: "재밌고 설레는 곳을 직접 골라 분위기를 만든다.",
                scores: { engine: 2 }
              },
              {
                label: "상대 취향을 먼저 듣고 편안한 동선을 맞춘다.",
                scores: { guide: 2, station: 1 }
              }
            ]
          },
          {
            prompt: "서운한 일이 생겼을 때 내가 먼저 하는 일은?",
            options: [
              {
                label: "감정이 올라오지만 바로 이야기해서 풀고 싶다.",
                scores: { engine: 2 }
              },
              {
                label: "상황을 정리한 뒤 타이밍을 봐서 조심스럽게 말한다.",
                scores: { signal: 2, station: 1 }
              }
            ]
          },
          {
            prompt: "연애에서 제일 중요한 건 무엇에 더 가까운가요?",
            options: [
              {
                label: "심장이 뛰는 설렘과 강한 끌림",
                scores: { engine: 2 }
              },
              {
                label: "편안함, 신뢰, 그리고 오래 갈 수 있는 안정감",
                scores: { station: 2, guide: 1 }
              }
            ]
          },
          {
            prompt: "상대가 힘든 일을 털어놓으면 나는?",
            options: [
              {
                label: "기분부터 살피며 지금 가장 필요한 말을 해주고 싶다.",
                scores: { guide: 2 }
              },
              {
                label: "당장 해결할 수 있는 현실적인 방법부터 같이 찾는다.",
                scores: { station: 2, signal: 1 }
              }
            ]
          },
          {
            prompt: "관계가 익숙해질수록 나는 어떤 편인가요?",
            options: [
              {
                label: "새로운 이벤트나 자극이 있어야 더 재밌다.",
                scores: { engine: 2 }
              },
              {
                label: "익숙함 속에서 더 단단해지는 관계가 마음 편하다.",
                scores: { station: 2, guide: 1 }
              }
            ]
          },
          {
            prompt: "연인이 갑자기 계획을 바꿨을 때 나는?",
            options: [
              {
                label: "아쉽지만 그 상황 안에서 또 다른 재미를 찾는다.",
                scores: { engine: 2, guide: 1 }
              },
              {
                label: "왜 바뀌었는지 이해하고 새 흐름을 차분히 맞춘다.",
                scores: { signal: 2, station: 1 }
              }
            ]
          },
          {
            prompt: "좋아하는 마음을 표현하는 방식은?",
            options: [
              {
                label: "보고 싶다, 좋다 같은 말을 비교적 자주 하는 편이다.",
                scores: { engine: 2, guide: 1 }
              },
              {
                label: "직접 표현보다는 행동과 배려로 보여주는 편이다.",
                scores: { station: 2, signal: 1 }
              }
            ]
          },
          {
            prompt: "갈등이 생겼을 때 더 가까운 대처는?",
            options: [
              {
                label: "지금 풀고 넘어가야 마음이 편하다.",
                scores: { engine: 2, guide: 1 }
              },
              {
                label: "감정이 정리된 뒤 대화하는 편이 더 낫다.",
                scores: { signal: 2, station: 1 }
              }
            ]
          },
          {
            prompt: "상대가 나를 어떻게 기억하면 가장 좋을까요?",
            options: [
              {
                label: "함께 있으면 분위기가 살아나는 사람",
                scores: { engine: 2 }
              },
              {
                label: "편안하고 믿음직해서 오래 생각나는 사람",
                scores: { station: 2, guide: 1 }
              }
            ]
          }
        ],
        results: {
          engine: {
            title: "직진 기관사형",
            summary: "설렘이 생기면 관계의 엔진을 직접 켜는 타입",
            description: "당신은 감정이 움직일 때 망설이기보다 먼저 분위기를 만드는 편입니다. 마음이 생기면 표현도 빠르고, 데이트의 흐름도 내가 이끌어가는 쪽이 더 편합니다. 관계에 생기와 재미를 불어넣는 힘이 크지만, 때로는 내 속도가 상대에게 빠르게 느껴질 수 있으니 템포를 맞춰보는 감각이 함께 가면 더 매력적입니다.",
            strengths: [
              "분위기를 주도하고 설렘을 키우는 힘",
              "좋아하는 감정을 표현하는 솔직함",
              "새로운 추억과 이벤트를 잘 만드는 편"
            ],
            tip: "내가 앞에서 끌어줄 때도, 상대가 숨 고를 여백을 함께 만들어주면 관계가 더 오래 갑니다.",
            moodTitle: "추천 데이트 무드",
            moodItems: ["야간 드라이브", "즉흥 산책", "새로 생긴 팝업 구경"],
            matchTitle: "찰떡 궁합",
            matchLabel: "다정 안내원형",
            matchDescription: "당신의 추진력 위에 상대의 배려가 얹히면 속도감 있으면서도 안정적인 관계가 됩니다.",
            heroEmoji: "🚂"
          },
          station: {
            title: "안정 역장형",
            summary: "관계의 흐름을 편안하고 오래가게 정리하는 타입",
            description: "당신은 연애에서도 순간의 감정보다 꾸준히 쌓이는 안정감을 중요하게 생각합니다. 상대의 생활 리듬을 존중하고, 무리 없는 동선을 설계하는 데 강점이 있습니다. 편안함과 신뢰를 주는 사람으로 기억되기 쉽고 오래 갈 수 있는 기반을 잘 만듭니다. 다만 너무 차분하게만 보이지 않도록, 가끔은 감정을 먼저 표현해주는 것이 큰 힘이 됩니다.",
            strengths: [
              "신뢰를 천천히 단단하게 쌓는 편",
              "갈등 상황에서도 균형을 잡는 힘",
              "편안한 관계 리듬을 만드는 안정감"
            ],
            tip: "안정감이 당신의 무기라면, 표현은 당신의 숨은 매력입니다. 좋을 때 더 좋다고 말해보세요.",
            moodTitle: "추천 데이트 무드",
            moodItems: ["조용한 카페", "동네 산책", "같이 장보기"],
            matchTitle: "찰떡 궁합",
            matchLabel: "직진 기관사형",
            matchDescription: "당신의 안정감은 상대의 열정이 너무 흔들리지 않게 잡아주는 좋은 균형점이 됩니다.",
            heroEmoji: "🏡"
          },
          guide: {
            title: "다정 안내원형",
            summary: "상대 기분을 잘 살피며 관계의 공기를 부드럽게 만드는 타입",
            description: "당신은 사람의 감정 결을 잘 읽고, 상대가 편안해질 수 있는 말을 건네는 데 강점이 있습니다. 배려가 자연스럽고, 함께 있을 때 ‘마음이 놓인다’는 인상을 주기 쉽습니다. 관계를 부드럽게 이어가는 힘이 좋지만, 때로는 내 마음보다 상대를 먼저 살피느라 지칠 수도 있습니다. 배려만큼 내 감정도 돌보면 더 건강한 관계가 됩니다.",
            strengths: [
              "상대 기분을 섬세하게 읽는 공감력",
              "대화 분위기를 부드럽게 만드는 감각",
              "상대가 편안함을 느끼게 하는 다정함"
            ],
            tip: "상대의 감정만큼 내 감정도 중요한 정보예요. 배려와 표현을 함께 가져가 보세요.",
            moodTitle: "추천 데이트 무드",
            moodItems: ["전시회 데이트", "포토부스 찍기", "편지 주고받기"],
            matchTitle: "찰떡 궁합",
            matchLabel: "관찰 신호등형",
            matchDescription: "당신의 따뜻함과 상대의 섬세함이 만나면 깊고 조용한 호흡이 만들어집니다.",
            heroEmoji: "💁"
          },
          signal: {
            title: "관찰 신호등형",
            summary: "상황과 타이밍을 읽으며 깊이 있게 관계를 살피는 타입",
            description: "당신은 눈에 보이는 말보다 분위기, 맥락, 타이밍 같은 보이지 않는 흐름을 잘 읽는 편입니다. 성급히 결론 내리기보다 한 번 더 관찰하고 생각한 뒤 움직이는 경향이 있고, 그만큼 관계를 깊게 이해하려는 힘이 있습니다. 다만 마음속 정리가 길어지면 표현 타이밍을 놓칠 수 있으니, 완벽하게 정리되기 전에도 조금씩 꺼내는 연습이 도움이 됩니다.",
            strengths: [
              "상황을 읽고 타이밍을 잡는 감각",
              "감정과 맥락을 깊게 해석하는 시선",
              "가볍지 않은 관계를 만들어가는 진중함"
            ],
            tip: "모든 생각이 끝난 뒤에 말하려 하지 않아도 괜찮아요. 중간 생각도 충분히 대화가 됩니다.",
            moodTitle: "추천 데이트 무드",
            moodItems: ["야경 보기", "긴 산책", "조용한 바에서 대화"],
            matchTitle: "찰떡 궁합",
            matchLabel: "다정 안내원형",
            matchDescription: "상대의 다정한 표현이 당신의 깊은 생각을 편안하게 꺼내게 도와줍니다.",
            heroEmoji: "🚦"
          }
        },
        resultPreview: [
          "직진 기관사형",
          "안정 역장형",
          "다정 안내원형",
          "관찰 신호등형"
        ],
        relatedIntro: "테스트를 마쳤다면 비슷한 무드의 카드도 이어서 둘러보세요.",
        relatedIds: ["test-002", "test-005", "test-006"],
        callout: "결과를 친구에게 보내고 서로의 운행 타입을 비교해보면 더 재밌어요.",
        operationNotes: [
          "한 화면에 한 질문만 보여주면 모바일에서 엄지손가락 하나로 답변하기가 훨씬 편합니다.",
          "질문은 모두 2지선다로 맞춰야 진행 리듬이 일정하고 이탈이 적습니다.",
          "로딩 화면은 1~2초 정도만 보여주고, 결과 화면에서는 다시하기와 다른 테스트 버튼을 크게 두는 편이 좋습니다."
        ],
        startButtonLabel: "테스트 시작하기",
        resetButtonLabel: "다시 해보기",
        otherTestLabel: "다른 테스트 해보기"
      }
    }
  };
})();
