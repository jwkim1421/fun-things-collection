// Paths are shared by cards, introductions, results and share images.
function contentArtwork(id, key = "") {
  return `assets/images/covers/${id}${key ? `-${key}` : ""}.webp`;
}

function playArtworkKey(type, resultKey) {
  if (type === "bingo") {
    const count = Number(resultKey.split("-")[1]);
    return count <= 4 ? "count-low" : count <= 9 ? "count-mid" : "count-high";
  }
  if (type === "battery") {
    const score = Math.max(0, 100 - Math.abs(100 - Number(resultKey.split("-")[1])));
    return score >= 98 ? "perfect" : score >= 90 ? "close" : "wild";
  }
  if (type === "daily") return "mission-shared";
  if (type === "ranking") return resultKey.replace(/^rank-/, "");
  if (type === "allocation") return resultKey.split("-")[1];
  if (type === "story") return resultKey.replace(/^story-/, "");
  if (type === "roulette") return "roulette-shared";
  return resultKey;
}
