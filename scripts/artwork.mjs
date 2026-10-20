import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { root } from "./content.mjs";

export function playResultArtworkKeys(content) {
  if (content.results) return Object.keys(content.results);
  return { daily: ["mission-shared"], trash: ["trash-done"], roulette: ["roulette-shared"] }[content.type] || [];
}

export function validateArtwork(pages, catalog, play) {
  const expected = catalog.items.flatMap(item => [item.id, ...(pages[item.id] ? Object.keys(pages[item.id].results) : playResultArtworkKeys(play[item.id])).map(key => item.id + "-" + key)]);
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "docs/art-production/20261020/production.json"), "utf8"));
  const records = new Map(manifest.assets.map(item => [item.id + (item.key ? "-" + item.key : ""), item]));
  for (const name of expected) {
    const file = "assets/images/covers/" + name + ".webp";
    const record = records.get(name);
    if (!record || record.status === "pending" || record.file !== file || !fs.existsSync(path.join(root, file))) throw new Error("Missing production illustration: " + name);
    const bytes = fs.readFileSync(path.join(root, file));
    if (createHash("sha256").update(bytes).digest("hex") !== record.sha256) throw new Error("Illustration checksum changed: " + name);
  }
  if (records.size !== expected.length) throw new Error("Unexpected production illustration records");
}

export function previewSourceHash() {
  const hash = createHash("sha256");
  for (const file of ["scripts/artwork.mjs", "scripts/render-previews.mjs", "assets/js/artwork.js"]) hash.update(fs.readFileSync(path.join(root, file), "utf8").replace(/\r\n/g, "\n"));
  for (const file of fs.readdirSync(path.join(root, "assets/images/covers")).filter(file => file.endsWith(".webp")).sort()) {
    hash.update(file);
    hash.update(fs.readFileSync(path.join(root, "assets/images/covers", file)));
  }
  return hash.digest("hex");
}
