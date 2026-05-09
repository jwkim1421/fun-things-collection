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

function initKakao() {
  const key = window.SITE_CONFIG && window.SITE_CONFIG.kakaoJavaScriptKey;
  if (!key || key === "YOUR_KAKAO_JAVASCRIPT_KEY" || typeof Kakao === "undefined") {
    return false;
  }

  if (!Kakao.isInitialized()) {
    Kakao.init(key);
  }

  return true;
}

async function copyLink() {
  const url = getSiteUrl();
  await navigator.clipboard.writeText(url);
  alert("링크를 복사했어요.");
}

function shareWithKakao() {
  const url = getSiteUrl();
  if (!initKakao()) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: document.title,
      description: "A static site starter for GitHub Pages.",
      link: {
        webUrl: url,
        mobileWebUrl: url
      }
    },
    buttons: [
      {
        title: "Open",
        link: {
          webUrl: url,
          mobileWebUrl: url
        }
      }
    ]
  });
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
    shareWithKakao();
    return;
  }

  if (target.id === "btnSmsShare") {
    shareBySms();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  window.shareBySms = shareBySms;
});
