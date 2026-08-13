window.SITE_CONFIG = {
  siteName: "쿠쿠",
  siteUrl: "https://coocooing.kro.kr/",
  releaseVersion: "community-v1",
  communityApiUrl: "https://coocoo-api.reviewmoa.workers.dev",
  gaMeasurementId: "G-GE282CZLL6",
  kakaoJavaScriptKey: "f45989bb71514aece0519d2a250e0e7b",
  adsenseClient: "ca-pub-7367164333546101",
  adsenseSlot: "4548135151"
};

(function initializeAnalytics() {
  const config = window.SITE_CONFIG || {};
  const measurementId = config.gaMeasurementId;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.COOCOO_ANALYTICS = {
    track(eventName, parameters = {}) {
      window.gtag("event", eventName, Object.assign({
        release_version: config.releaseVersion || "unknown"
      }, parameters));
    }
  };

  if (!measurementId) {
    return;
  }

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  if (!window.__COOCOO_GA_INITIALIZED__) {
    window.gtag("js", new Date());
    window.gtag("config", measurementId);
    window.__COOCOO_GA_INITIALIZED__ = true;
  }
})();
