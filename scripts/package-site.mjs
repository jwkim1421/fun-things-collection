import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { root } from "./content.mjs";

// Only public website files are copied. Reports, plans, tooling and Worker config stay out.
export function packageSite() {
  const artifactRoot = path.join(root, ".artifacts");
  fs.mkdirSync(artifactRoot, { recursive: true });
  const destination = fs.mkdtempSync(path.join(artifactRoot, "site-"));
  const copy = (relative) => {
    fs.mkdirSync(path.dirname(path.join(destination, relative)), { recursive: true });
    fs.copyFileSync(path.join(root, relative), path.join(destination, relative));
  };
  function walk(relative, accept) {
    for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
      const file = path.posix.join(relative, entry.name);
      if (entry.isDirectory()) walk(file, accept);
      else if (entry.isFile() && accept(file)) copy(file);
    }
  }
  for (const name of ["index.html", "search.html", "privacy.html", "contact.html", "404.html", "robots.txt", "sitemap.xml", "ads.txt", "CNAME", ".nojekyll"]) copy(name);
  walk("assets", (file) => /\.(?:js|css|png|svg|webp|woff2?)$/.test(file));
  walk("tests", (file) => /^tests\/(?:tests\/)?test-\d{3}\.html$/.test(file));
  walk("play", (file) => /^play\/[a-z-]+\.html$/.test(file));
  walk("results", (file) => /^results\/test-\d{3}-[a-z]+\.html$/.test(file));
  walk("github-pages-starter", (file) => /^(?:github-pages-starter\/(?:index|contact|privacy|404)\.html|github-pages-starter\/tests\/test-\d{3}\.html)$/.test(file));
  return destination;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) console.log(packageSite());
