# 티스토리 관리자에게 전달할 변경 사항

대상 글: https://hvyair.tistory.com/391

그림 카드가 적용된 것은 확인했습니다. 쿠쿠 담당이 카드용 작은 표지와 유입 구분 링크를 **2026-11-06 운영 사이트에 배포했고 공개 응답을 확인했습니다. 아래 주소로 바로 변경할 수 있습니다.** 본문의 기존 카드 디자인은 그대로 사용하면 됩니다. [배포 성공 기록](https://github.com/jwkim1421/fun-things-collection/actions/runs/42152012972)

## 1. 그림 주소 교체

| 카드 | 새 `src` | 이미지 크기·파일 크기 |
|---|---|---|
| 소비 타입 | `https://coocooing.kro.kr/assets/images/card-thumbs/test-010.webp` | 600×400 · 48,238바이트 |
| 방 취향 | `https://coocooing.kro.kr/assets/images/card-thumbs/test-015.webp` | 600×400 · 23,952바이트 |

두 장 합계는 원본 321,058바이트에서 72,190바이트로 약 78% 줄었습니다. `width="600" height="400"`으로 바꾸고 현재의 `width:100%; height:auto`를 유지해주세요. `loading="lazy"`가 없어도 작은 파일을 받도록 준비했습니다.

## 2. 클릭 링크 교체

소비 타입 카드의 `href`:

```text
https://coocooing.kro.kr/tests/test-010.html?utm_source=tistory&utm_medium=referral&utm_campaign=blog_cards_202611&utm_content=hvyair_391_test010
```

방 취향 카드의 `href`:

```text
https://coocooing.kro.kr/tests/test-015.html?utm_source=tistory&utm_medium=referral&utm_campaign=blog_cards_202611&utm_content=hvyair_391_test015
```

HTML 속성에 직접 넣을 때는 `&`를 `&amp;`로 적습니다. [전체 교체용 HTML](tistory-test-cards-illustrated.html)에는 이 처리가 되어 있습니다. 발행 링크에는 `qa=1`을 넣지 않습니다.

## 3. 저장 후 확인

공개 글의 두 이미지가 `card-thumbs`에서 열리는지, 각 카드를 눌렀을 때 주소에 해당 `utm_content`가 남는지 확인해주세요. 글 번호 391과 카드 번호가 서로 바뀌지 않아야 합니다. 다른 글에 재사용할 때는 `utm_content`의 글 번호를 해당 글 번호로 바꿉니다.

쿠쿠는 이미 `content_start`·`content_complete` 이벤트를 전송합니다. 블로그 본문에는 별도 분석 스크립트를 추가할 필요가 없습니다. GA4 계정의 실제 수신 확인은 쿠쿠 담당·운영자 확인 항목으로 별도 관리합니다.

다른 테스트·놀이의 작은 표지도 `https://coocooing.kro.kr/assets/images/card-thumbs/콘텐츠ID.webp` 형식입니다. 공개 콘텐츠 34개를 모두 준비했으며, 전체 목록은 [표지 제작 기록](card-thumbnails.json)에 있습니다.
