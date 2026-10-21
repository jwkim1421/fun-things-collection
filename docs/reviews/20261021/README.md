# 2026-10-21 판정 검토 자료

이 폴더는 당시 검토의 고정 스냅샷입니다. 현재 서비스 문항의 원본은 assets/js/content-data.js와 extra-content-data.js입니다. 이 JSON을 런타임에서 중복 로드하지 않습니다. 배포 포장에서는 폴더 전체를 제외합니다.

- distribution.json: 수정 전 실제 함수 계산, 542,689조합.
- distribution-after.json: 수정 후 실제 함수 계산, 632,289조합. 선택지 독립·동일 확률이라는 가정이며 실제 방문자 비율이 아닙니다.
- scoring-spec.json: 유형 의미·문항·점수·동점 순서 명세.
- pilot-brief.json / semantic-pilot.json: 점수 없이 전달한 대표 5개 자료와 독립 60사례.
- remaining-brief.json / semantic-remaining.json: 나머지 20개 자료와 79사례. 옛 018 두 사례는 현재 회귀 검사에 쓰지 않으며 문제 발견 이력으로 보존합니다.
- season-brief.json / semantic-season.json: 018의 사색·비움 구분 수정 자료와 재검토한 12사례.

현재 회귀 검사는 대표 60 + 나머지 77 + 새 계절 12 =149사례입니다. 원본 전달 경로는 .artifacts였고 동일한 자료를 위 brief 파일에 보존했습니다. 전달 후 001 1번·020 1번의 모호한 표현을 다듬었으며 별도 검토자는 기대 사례와 충돌하지 않음을 확인했습니다. 답변 배열은 0부터, 설명의 문항 번호는 1부터 셉니다.

독립이란 점수·코드를 보지 않고 문항과 유형 설명에서 기대값을 작성했다는 뜻입니다. 같은 계열 AI의 검토이며 실제 이용자 연구·심리측정 타당성·모집단 분포 검증이 아닙니다. 질문을 고친 작성자의 분류 관점은 남아 있으므로 혼합 사례의 유일한 정답을 주장하지 않습니다.

배포와 운영 확인 결과는 [deployment-verification.json](deployment-verification.json)에 있습니다. local-verification.json의 배포 대기 표시는 로컬 검증 당시 상태이며 현재 배포 상태는 루트 운영 문서에서 확인합니다.
