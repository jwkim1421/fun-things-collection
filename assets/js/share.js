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

function getShareImage() {
  const bodyShareImage = document.body && document.body.dataset ? document.body.dataset.shareImage : "";
  if (bodyShareImage) {
    return bodyShareImage;
  }

  const meta = document.querySelector('meta[property="og:image"]');
  return meta && meta.content ? meta.content : "";
}

const kakaoImageCache = new Map();

function parseThemeStops(theme) {
  const fallback = ["#fff1bf", "#e7e7ff"];
  if (!theme) {
    return fallback;
  }

  const matches = String(theme).match(/#(?:[0-9a-fA-F]{3,8})/g);
  if (!matches || matches.length < 2) {
    return fallback;
  }

  return [matches[0], matches[1]];
}

function wrapCanvasText(ctx, text, maxWidth, maxLines) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [];
  }

  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const truncated = lines.slice(0, maxLines);
  let lastLine = truncated[maxLines - 1];
  while (lastLine.length > 1 && ctx.measureText(`${lastLine}...`).width > maxWidth) {
    lastLine = lastLine.slice(0, -1);
  }
  truncated[maxLines - 1] = `${lastLine}...`;
  return truncated;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function loadShareImageAsset(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function getDynamicSharePayload() {
  const bodyData = document.body && document.body.dataset ? document.body.dataset : null;
  if (!bodyData || bodyData.shareContext !== "result") {
    return null;
  }

  return {
    siteName: (window.SITE_CONFIG && window.SITE_CONFIG.siteName) || "쿠쿠",
    testTitle: bodyData.shareTestTitle || document.title,
    resultTitle: bodyData.shareResultTitle || "",
    resultSummary: bodyData.shareResultSummary || "",
    resultDescription: bodyData.shareResultDescription || "",
    resultIcon: bodyData.shareResultIcon || "✨",
    theme: bodyData.shareTheme || "linear-gradient(135deg, #fff1bf, #e7e7ff)",
    mascotUrl: bodyData.shareMascot || `${window.location.origin}/assets/images/coocoo.png`
  };
}

async function buildDynamicShareCanvas() {
  const payload = getDynamicSharePayload();
  if (!payload) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const [themeStart, themeEnd] = parseThemeStops(payload.theme);
  const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGradient.addColorStop(0, themeStart);
  bgGradient.addColorStop(1, themeEnd);
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const frameGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  frameGradient.addColorStop(0, "rgba(255,255,255,0.88)");
  frameGradient.addColorStop(1, "rgba(255,255,255,0.72)");
  ctx.fillStyle = frameGradient;
  drawRoundedRect(ctx, 54, 46, 1092, 538, 34);
  ctx.fill();

  ctx.strokeStyle = "rgba(91, 71, 86, 0.22)";
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, 54, 46, 1092, 538, 34);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  drawRoundedRect(ctx, 88, 92, 250, 410, 28);
  ctx.fill();

  const leftGradient = ctx.createLinearGradient(88, 92, 338, 502);
  leftGradient.addColorStop(0, "rgba(255, 240, 151, 0.94)");
  leftGradient.addColorStop(1, "rgba(255, 250, 217, 0.94)");
  ctx.fillStyle = leftGradient;
  drawRoundedRect(ctx, 88, 92, 250, 410, 28);
  ctx.fill();

  ctx.fillStyle = "#2f2435";
  ctx.font = "700 30px Arial";
  ctx.fillText(payload.testTitle, 382, 126);

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  drawRoundedRect(ctx, 382, 160, 692, 72, 24);
  ctx.fill();

  ctx.fillStyle = "#2f2435";
  ctx.font = "800 48px Arial";
  const resultTitleLines = wrapCanvasText(ctx, payload.resultTitle, 644, 2);
  resultTitleLines.forEach((line, index) => {
    ctx.fillText(line, 420, 212 + (index * 56));
  });

  ctx.fillStyle = "rgba(255, 250, 205, 0.92)";
  drawRoundedRect(ctx, 382, 260, 692, 208, 26);
  ctx.fill();

  ctx.fillStyle = "#3f3326";
  ctx.font = "700 24px Arial";
  const summaryLines = wrapCanvasText(ctx, payload.resultSummary, 628, 2);
  summaryLines.forEach((line, index) => {
    ctx.fillText(line, 420, 312 + (index * 34));
  });

  ctx.font = "500 22px Arial";
  const descriptionLines = wrapCanvasText(ctx, payload.resultDescription, 628, 5);
  descriptionLines.forEach((line, index) => {
    ctx.fillText(line, 420, 382 + (index * 34));
  });

  ctx.fillStyle = "rgba(255,255,255,0.82)";
  drawRoundedRect(ctx, 382, 500, 470, 46, 22);
  ctx.fill();
  ctx.fillStyle = "#6f5375";
  ctx.font = "700 22px Arial";
  ctx.fillText("쿠쿠에서 결과 확인하기", 420, 532);

  ctx.font = "110px Arial";
  ctx.fillStyle = "#2f2435";
  ctx.textAlign = "center";
  ctx.fillText(payload.resultIcon, 213, 264);

  ctx.textAlign = "center";
  ctx.font = "800 42px Arial";
  const sideTitleLines = wrapCanvasText(ctx, payload.resultTitle, 190, 3);
  sideTitleLines.forEach((line, index) => {
    ctx.fillText(line, 213, 372 + (index * 46));
  });
  ctx.textAlign = "left";

  try {
    const mascot = await loadShareImageAsset(payload.mascotUrl);
    ctx.save();
    ctx.globalAlpha = 0.96;
    ctx.drawImage(mascot, 900, 384, 160, 160);
    ctx.restore();
  } catch (error) {
    console.warn("Failed to load mascot image for share card.", error);
  }

  return canvas;
}

async function uploadDynamicShareImage() {
  if (!(window.Kakao && Kakao.Share && typeof Kakao.Share.uploadImage === "function")) {
    return "";
  }

  const canvas = await buildDynamicShareCanvas();
  if (!canvas) {
    return "";
  }

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) {
        resolve(result);
        return;
      }
      reject(new Error("Failed to render share card image."));
    }, "image/png");
  }).catch((error) => {
    console.warn("Dynamic share canvas export failed.", error);
    return null;
  });

  if (!blob) {
    return "";
  }

  try {
    const file = new File([blob], "kuku-share-card.png", { type: "image/png" });
    const response = await Kakao.Share.uploadImage({ file: [file] });
    const uploadedUrl =
      response?.infos?.[0]?.original?.url ||
      response?.infos?.[0]?.url ||
      response?.infos?.original?.url ||
      response?.original?.url ||
      "";

    return uploadedUrl;
  } catch (error) {
    console.warn("Kakao dynamic image upload failed.", error);
    return "";
  }
}

async function resolveKakaoImageUrl(imageUrl) {
  if (!imageUrl) {
    return "";
  }

  if (kakaoImageCache.has(imageUrl)) {
    return kakaoImageCache.get(imageUrl);
  }

  if (!(window.Kakao && Kakao.Share && typeof Kakao.Share.scrapImage === "function")) {
    return imageUrl;
  }

  try {
    const response = await Kakao.Share.scrapImage({ imageUrl });
    const resolvedUrl =
      response?.infos?.original?.url ||
      response?.infos?.thumbnail?.url ||
      imageUrl;

    kakaoImageCache.set(imageUrl, resolvedUrl);
    return resolvedUrl;
  } catch (error) {
    console.warn("Kakao share image scrap failed.", error);
    return imageUrl;
  }
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
  const imageUrl = getShareImage();
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

    const uploadedDynamicImageUrl = await uploadDynamicShareImage();
    const resolvedImageUrl = uploadedDynamicImageUrl || await resolveKakaoImageUrl(imageUrl);
    const content = {
      title,
      description,
      link: {
        webUrl: url,
        mobileWebUrl: url
      }
    };

    if (resolvedImageUrl) {
      content.imageUrl = resolvedImageUrl;
      content.imageWidth = 1200;
      content.imageHeight = 630;
    }

    shareApi.sendDefault({
      objectType: "feed",
      content,
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
