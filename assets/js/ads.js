function hasAdsenseConfig() {
  const config = window.SITE_CONFIG || {};
  return Boolean(
    config.adsenseClient &&
    config.adsenseClient !== "YOUR_ADSENSE_CLIENT" &&
    config.adsenseSlot &&
    config.adsenseSlot !== "YOUR_ADSENSE_SLOT"
  );
}

function loadAdsenseScript(client) {
  const existing = document.querySelector('script[data-adsense-loader="true"]');
  if (existing) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.adsenseLoader = "true";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.appendChild(script);
}

function initAdsenseSlots() {
  if (!hasAdsenseConfig()) {
    return;
  }

  const config = window.SITE_CONFIG;
  const slots = document.querySelectorAll(".adsbygoogle");

  if (!slots.length) {
    return;
  }

  loadAdsenseScript(config.adsenseClient);

  slots.forEach((slot) => {
    slot.dataset.adClient = config.adsenseClient;
    slot.dataset.adSlot = config.adsenseSlot;

    if (slot.dataset.adsInitialized === "true") {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      slot.dataset.adsInitialized = "true";
    } catch (error) {
      console.warn("AdSense initialization is pending.", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", initAdsenseSlots);
