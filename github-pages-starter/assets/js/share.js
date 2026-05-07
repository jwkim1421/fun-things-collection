function getSiteUrl() {
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

document.addEventListener("DOMContentLoaded", () => {
  const btnCopy = document.getElementById("btnCopyLink");
  const btnKakao = document.getElementById("btnKakaoShare");
  const btnSms = document.getElementById("btnSmsShare");

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      copyLink().catch(() => alert("복사에 실패했어요."));
    });
  }

  if (btnKakao) {
    btnKakao.addEventListener("click", shareWithKakao);
  }

  if (btnSms) {
    btnSms.addEventListener("click", shareBySms);
  }

  window.shareBySms = shareBySms;
});
