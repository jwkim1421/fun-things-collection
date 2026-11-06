import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { loadContent, root } from "./content.mjs";

const { catalog, context } = loadContent();
const directory = "assets/images/card-thumbs";
fs.mkdirSync(path.join(root, directory), { recursive: true });
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const assets = [];
for (const item of catalog.items) {
  const source = context.contentArtwork(item.id);
  const original = fs.readFileSync(path.join(root, source));
  const { data, info } = await sharp(original)
    .resize({ width: 600, height: 400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 600, item.id);
  assert.equal(info.height, 400, item.id);
  assert.ok(data.length <= 80 * 1024, `${item.id}: card exceeds 80 KiB`);
  const file = `${directory}/${item.id}.webp`;
  fs.writeFileSync(path.join(root, file), data);
  assets.push({ id: item.id, source, sourceSha256: hash(original), sourceBytes: original.length,
    file, sha256: hash(data), bytes: data.length, width: info.width, height: info.height });
}
fs.mkdirSync(path.join(root, "docs/promotion"), { recursive: true });
fs.writeFileSync(path.join(root, "docs/promotion/card-thumbnails.json"), JSON.stringify({
  format: "webp", quality: 72, width: 600, height: 400, assets
}, null, 2) + "\n");
console.log(JSON.stringify({ count: assets.length, sourceBytes: assets.reduce((sum, a) => sum + a.sourceBytes, 0),
  thumbnailBytes: assets.reduce((sum, a) => sum + a.bytes, 0), maxBytes: Math.max(...assets.map(a => a.bytes)) }));
