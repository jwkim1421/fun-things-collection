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

function buildSharedLink(method) {
  const current = new URL(getSiteUrl());
  const url = new URL(current.pathname, current.origin);
  ["result", "date"].forEach((key) => {
    if (current.searchParams.has(key)) url.searchParams.set(key, current.searchParams.get(key));
  });
  url.searchParams.set("shared", "1");
  url.searchParams.set("utm_source", method);
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", "content_share");
  return url.toString();
}

function trackShareOutcome(eventName, method) {
  if (!(window.COOCOO_ANALYTICS && typeof window.COOCOO_ANALYTICS.track === "function")) {
    return;
  }

  const bodyData = document.body && document.body.dataset ? document.body.dataset : {};
  window.COOCOO_ANALYTICS.track(eventName, {
    content_id: bodyData.testId || bodyData.playId || "home",
    content_title: bodyData.shareTestTitle || document.title,
    result_key: new URLSearchParams(window.location.search).get("result") || bodyData.initialResult || "",
    share_method: method
  });
}

const kakaoImageCache = new Map();
function trackShareClick(method) {
  trackShareOutcome("share_click", method);
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

    if (ctx.measureText(word).width <= maxWidth) {
      currentLine = word;
      return;
    }

    let fragment = "";
    Array.from(word).forEach((character) => {
      const nextFragment = `${fragment}${character}`;
      if (fragment && ctx.measureText(nextFragment).width > maxWidth) {
        lines.push(fragment);
        fragment = character;
      } else {
        fragment = nextFragment;
      }
    });
    currentLine = fragment;
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
    mascotUrl: bodyData.shareMascot || `${window.location.origin}/assets/images/kuku-mascot-full.png`,
    artworkUrl: bodyData.shareArtwork || ""
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
  if (payload.artworkUrl) {
    // The copied PNG and crawler preview use the same type-specific asset.
    const preview = await loadShareImageAsset(getShareImage());
    ctx.drawImage(preview, 0, 0, 1200, 630);
    return canvas;
  }

  ctx.fillStyle = "#f4f0e8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fffdf8";
  drawRoundedRect(ctx, 54, 46, 1092, 538, 34);
  ctx.fill();

  ctx.strokeStyle = "#28231f";
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, 54, 46, 1092, 538, 34);
  ctx.stroke();

  ctx.fillStyle = "#f2d27f";
  drawRoundedRect(ctx, 88, 92, 250, 410, 28);
  ctx.fill();

  ctx.fillStyle = "#2f2435";
  ctx.font = "700 28px Arial";
  wrapCanvasText(ctx, payload.testTitle, 680, 2).forEach((line, index) => ctx.fillText(line, 382, 112 + index * 34));

  ctx.fillStyle = "#f2d27f";
  drawRoundedRect(ctx, 382, 166, 692, 128, 24);
  ctx.fill();

  ctx.fillStyle = "#2f2435";
  ctx.font = "800 42px Arial";
  const resultTitleLines = wrapCanvasText(ctx, payload.resultTitle, 644, 2);
  resultTitleLines.forEach((line, index) => {
    ctx.fillText(line, 406, 218 + (index * 52));
  });

  ctx.fillStyle = "#fff4b9";
  drawRoundedRect(ctx, 382, 312, 692, 140, 26);
  ctx.fill();

  ctx.fillStyle = "#3f3326";
  ctx.font = "700 24px Arial";
  const summaryLines = wrapCanvasText(ctx, payload.resultSummary || payload.resultDescription, 628, 2);
  summaryLines.forEach((line, index) => {
    ctx.fillText(line, 406, 360 + (index * 36));
  });

  ctx.fillStyle = "#b8d3df";
  drawRoundedRect(ctx, 382, 478, 692, 54, 18);
  ctx.fill();
  ctx.fillStyle = "#6f5375";
  ctx.font = "700 22px Arial";
  ctx.fillText("친구랑 비교하기 · 나도 직접 해보기", 406, 513);
  ctx.font = "700 25px Arial";
  ctx.fillText(new URL(getSiteUrl()).hostname, 406, 567);

  ctx.font = "90px Arial";
  ctx.fillStyle = "#2f2435";
  ctx.textAlign = "center";
  ctx.fillText(payload.resultIcon, 213, 350);

  ctx.textAlign = "center";
  ctx.font = "800 34px Arial";
  const sideTitleLines = wrapCanvasText(ctx, payload.siteName, 190, 2);
  sideTitleLines.forEach((line, index) => {
    ctx.fillText(line, 213, 432 + (index * 40));
  });
  ctx.textAlign = "left";

  try {
    const mascot = await loadShareImageAsset(payload.mascotUrl);
    ctx.save();
    ctx.globalAlpha = 0.94;
    ctx.drawImage(mascot, 143, 110, 140, 140);
    ctx.restore();
  } catch (error) {
    console.warn("Failed to load mascot image for share card.", error);
  }

  return canvas;
}

async function getResultImageBlob() {
  const canvas = await buildDynamicShareCanvas();
  if (!canvas) throw new Error("No result image is available");
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Result image could not be created.");
  return blob;
}

function showShareFeedback(message, instagram = false, download = false) {
  document.getElementById("shareFeedback")?.remove();
  const panel = document.createElement("div");
  panel.id = "shareFeedback";
  panel.className = "share-feedback";
  panel.setAttribute("role", "status");
  const text = document.createElement("p");
  text.textContent = message;
  panel.appendChild(text);
  if (instagram) {
    const link = document.createElement("a");
    link.href = "https://www.instagram.com/";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "인스타그램 열기";
    panel.appendChild(link);
  }
  if (download) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "이미지 내려받기";
    button.addEventListener("click", () => downloadResultImage().catch(() => showShareFeedback("이미지를 만들지 못했어요. 다시 시도해주세요.")));
    panel.appendChild(button);
  }
  document.querySelector(".result-share-row, .play-share-actions")?.after(panel);
}

async function copyResultImage(method = "copy_image") {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") throw new Error("Image clipboard is unavailable");
  // Call write during the click; Safari accepts the asynchronously rendered PNG as a promise.
  const item = new ClipboardItem({ "image/png": getResultImageBlob() });
  await navigator.clipboard.write([item]);
  trackShareOutcome("share_copy_success", method);
}

async function downloadResultImage() {
  const url = URL.createObjectURL(await getResultImageBlob());
  const link = document.createElement("a");
  link.href = url;
  link.download = "coocoo-result.png";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

async function shareToInstagram() {
  let copied = false;
  try { await copyResultImage("instagram"); copied = true; } catch (error) { trackShareOutcome("share_error", "instagram"); }
  showShareFeedback(copied
    ? "이미지를 복사했어요. 붙여넣기를 지원하는 인스타그램 화면에서 사용하거나, 이미지를 내려받아 새 게시물·스토리에 올려주세요."
    : "이 브라우저에서는 이미지 복사가 제한돼요. 이미지를 내려받은 뒤 인스타그램 새 게시물·스토리에서 선택해주세요.", true, true);
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
  const url = buildSharedLink("copy_link");
  await navigator.clipboard.writeText(url);
  trackShareOutcome("share_copy_success", "copy_link");
  if (!silent) {
    showShareFeedback("링크를 복사했어요. 친구에게 붙여넣어 보내주세요!");
  }
}

async function shareWithKakao() {
  const url = buildSharedLink("kakao");
  const description = getShareDescription();
  const title = getShareTitle();
  const imageUrl = getShareImage();
  const buttonTitle = document.body && document.body.dataset && document.body.dataset.shareButtonTitle
    ? document.body.dataset.shareButtonTitle
    : "테스트 열기";

  if (!initKakao()) {
    trackShareOutcome("share_error", "kakao");
    try {
      await copyLink({ silent: true });
      showShareFeedback("카카오톡을 열지 못해 링크를 복사했어요. 채팅창에 붙여넣어 보내주세요.");
    } catch (error) {
      showShareFeedback("카카오톡과 링크 복사를 사용할 수 없어요. 브라우저 주소를 복사해 보내주세요.");
    }
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

    const uploadedDynamicImageUrl = document.body.dataset.shareArtwork ? "" : await uploadDynamicShareImage();
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

    await shareApi.sendDefault({
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
    // SDK handoff is observable; recipient selection and message delivery are not.
    trackShareOutcome("share_handoff", "kakao");
  } catch (error) {
    trackShareOutcome("share_error", "kakao");
    console.warn("Kakao sharing failed.", error);
    try {
      await copyLink({ silent: true });
      showShareFeedback("카카오톡을 열지 못해 링크를 복사했어요. 채팅창에 붙여넣어 보내주세요.");
    } catch (copyError) {
      showShareFeedback("공유를 열지 못했어요. 브라우저 주소를 복사해 보내주세요.");
    }
  }
}

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target.closest("button") : null;
  if (!target || !target.id) {
    return;
  }

  if (target.id === "btnCopyLink") {
    trackShareClick("copy_link");
    copyLink().catch(() => { trackShareOutcome("share_error", "copy_link"); showShareFeedback("링크 복사가 제한됐어요. 브라우저 주소를 복사해주세요."); });
    return;
  }

  if (target.id === "btnCopyResultImage") {
    trackShareClick("copy_image");
    copyResultImage().then(() => showShareFeedback("이미지를 복사했어요. 채팅창이나 편집기에 붙여넣어보세요!"))
      .catch(() => { trackShareOutcome("share_error", "copy_image"); showShareFeedback("이 브라우저에서는 이미지 복사가 제한돼요. Chrome·Safari 같은 브라우저에서 열거나 이미지를 내려받아주세요.", false, true); });
    return;
  }

  if (target.id === "btnKakaoShare") {
    trackShareClick("kakao");
    shareWithKakao().catch(() => showShareFeedback("카카오톡 공유를 열지 못했어요. 잠시 후 다시 시도해주세요."));
    return;
  }

  if (target.id === "btnInstagramShare") {
    trackShareClick("instagram");
    shareToInstagram();
  }
});
