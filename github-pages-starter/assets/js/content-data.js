(function attachSiteContent() {
  window.SITE_CONTENT = {
    cards: [
      {
        id: "test-001",
        title: "연애 성향 밸런스 테스트",
        description: "질문 몇 개로 확인하는 가벼운 연애 밸런스 타입 테스트 예시 페이지입니다.",
        href: "./tests/test-001.html",
        badge: "추천",
        category: "연애 테스트",
        duration: "1분",
        thumb: "linear-gradient(135deg, #ffd8e6, #fff6fb)"
      },
      {
        id: "test-002",
        title: "직장인 회복력 체크",
        description: "번아웃 신호를 카드형 콘텐츠로 풀어내는 샘플 페이지 슬롯입니다.",
        href: "./tests/test-002.html",
        badge: "신규",
        category: "심리 체크",
        duration: "2분",
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
        thumb: "linear-gradient(135deg, #e2ebff, #ffe1ef)"
      }
    ],
    pages: {
      "test-001": {
        title: "연애 성향 밸런스 테스트",
        summary: "질문에 빠르게 답하고, 나의 연애 반응 패턴이 감정형인지 안정형인지 가볍게 확인해보는 예시 페이지입니다.",
        intro: "이 페이지는 실제 서비스에서 가장 먼저 복제해 쓸 수 있도록, 테스트 소개 문구와 광고 슬롯, 공유 버튼, CTA, 관련 카드 유도 영역까지 한 번에 담아 둔 샘플입니다.",
        questions: [
          "답장이 늦어지면 먼저 이유를 상상하는 편인가요?",
          "좋아하는 사람에게 서운한 점이 생기면 바로 표현하나요?",
          "상대가 바쁘다고 하면 스스로 거리를 두는 편인가요?",
          "연애에서 중요한 것은 설렘보다 안정감이라고 느끼나요?"
        ],
        resultPreview: [
          "감정 반응이 빠른 몰입형",
          "상황을 해석하는 신중형",
          "균형을 중시하는 안정형"
        ],
        relatedIds: ["test-002", "test-005", "test-006"]
      }
    }
  };
})();
