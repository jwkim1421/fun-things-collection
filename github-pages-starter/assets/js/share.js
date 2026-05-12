function getSiteUrl() {
  const bodyShareUrl = document.body && document.body.dataset ? document.body.dataset.shareUrl : "";
  if (bodyShareUrl) {
    return bodyShareUrl;
  }

  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return window.location.href;
  }

  return (window.SITE_CONFIG && window.SITE_CONFIG.siteUrl && window.SITE_CONFIG.siteUrl !== "YOUR_SITE_URL")
    ? window.SITE_CONFIG.siteUrl
    : window.location.href;
}

function getShareDescription() {
  const bodyShareDescription = document.body && document.body.dataset ? document.body.dataset.shareDescription : "";
  if (bodyShareDescription) {
    return bodyShareDescription;
  }

  const meta = document.querySelector('meta[name="description"]');
  return meta && meta.content
    ? meta.content
    : "쿠쿠에서 테스트를 확인해보세요.";
}

function getShareTitle() {
  const bodyShareTitle = document.body && document.body.dataset ? document.body.dataset.shareTitle : "";
  if (bodyShareTitle) {
    return bodyShareTitle;
  }

  return document.title;
}

function initKakao() {
  const key = window.SITE_CONFIG && window.SITE_CONFIG.kakaoJavaScriptKey;
  if (!key || key === "YOUR_KAKAO_JAVASCRIPT_KEY" || typeof Kakao === "undefined") {
    return false;
  }

  try {
    if (!Kakao.isInitialized()) {
      Kakao.init(key);
    }
  } catch (error) {
    console.warn("Kakao SDK initialization failed.", error);
    return false;
  }

  return true;
}

async function copyLink(options = {}) {
  const { silent = false } = options;
  const url = getSiteUrl();
  await navigator.clipboard.writeText(url);
  if (!silent) {
    alert("링크를 복사했어요.");
  }
}

async function shareWithKakao() {
  const url = getSiteUrl();
  const description = getShareDescription();
  const title = getShareTitle();
  const buttonTitle = document.body && document.body.dataset && document.body.dataset.shareButtonTitle
    ? document.body.dataset.shareButtonTitle
    : "테스트 열기";

  if (!initKakao()) {
    await copyLink({ silent: true }).catch(() => null);
    alert("카카오 공유를 열지 못해 링크를 복사했어요. 카카오 개발자 설정에 현재 도메인이 등록되어 있는지도 확인해 주세요.");
    return;
  }

  try {
    const shareApi =
      Kakao.Share && typeof Kakao.Share.sendDefault === "function"
        ? Kakao.Share
        : Kakao.Link && typeof Kakao.Link.sendDefault === "function"
          ? Kakao.Link
          : null;

    if (!shareApi) {
      throw new Error("No Kakao share API is available.");
    }

    shareApi.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        link: {
          webUrl: url,
          mobileWebUrl: url
        }
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            webUrl: url,
            mobileWebUrl: url
          }
        }
      ]
    });
  } catch (error) {
    console.warn("Kakao sharing failed.", error);
    await copyLink({ silent: true }).catch(() => null);
    alert("카카오 공유를 열지 못해 링크를 복사했어요. 카카오 개발자 설정에 https://coocooing.kro.kr 도메인이 등록되어 있는지 확인해 주세요.");
  }
}

function shareBySms() {
  const url = getSiteUrl();
  window.location.href = `sms:?&body=${encodeURIComponent(url)}`;
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof HTMLElement ? event.target.closest("button") : null;
  if (!target || !target.id) {
    return;
  }

  if (target.id === "btnCopyLink") {
    copyLink().catch(() => alert("복사에 실패했어요."));
    return;
  }

  if (target.id === "btnKakaoShare") {
    shareWithKakao().catch(() => alert("카카오 공유를 열지 못했어요."));
    return;
  }

  if (target.id === "btnSmsShare") {
    shareBySms();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  window.shareBySms = shareBySms;
});
