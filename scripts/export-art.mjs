import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { createHash } from "node:crypto";
import { root } from "./content.mjs";

// Original illustrations stay outside the public package. Export without cropping.
const manifestFile = process.argv[2] || "docs/art-production/20261020/production.json";
const manifest = JSON.parse(fs.readFileSync(path.join(root, manifestFile), "utf8"));
let exported = 0;
let retained = 0;
for (const item of manifest.assets) {
  if (!item.original || !fs.existsSync(path.resolve(root, item.original))) {
    if (item.file && fs.existsSync(path.join(root, item.file))) { retained++; continue; }
    throw new Error(`Original and exported illustration are missing: ${item.id}/${item.key || "cover"}`);
  }
  const output = path.join(root, `assets/images/covers/${item.id}${item.key ? `-${item.key}` : ""}.webp`);
  const info = await sharp(path.resolve(root, item.original)).resize(1080, 720, { fit: "inside", withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(output);
  const buffer = fs.readFileSync(output);
  item.file = path.relative(root, output).replaceAll("\\", "/");
  item.sha256 = createHash("sha256").update(buffer).digest("hex");
  item.bytes = buffer.length;
  item.width = info.width;
  item.height = info.height;
  exported++;
}
fs.writeFileSync(path.join(root, manifestFile), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Exported ${exported} illustrations; retained ${retained} exports whose originals are outside this checkout`);
