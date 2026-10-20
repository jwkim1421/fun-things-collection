import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function loadContent() {
  const context = vm.createContext({
    window: { location: { search: "" } },
    document: { addEventListener() {}, querySelector() { return {}; } },
    URLSearchParams,
    console
  });
  for (const name of ["site-config", "artwork", "content-data", "extra-content-data", "catalog", "playground"]) {
    vm.runInContext(fs.readFileSync(path.join(root, `assets/js/${name}.js`), "utf8"), context, { filename: name });
  }
  return {
    context,
    config: context.window.SITE_CONFIG,
    ...context.window.SITE_CONTENT,
    catalog: context.window.COOCOO_CATALOG,
    play: vm.runInContext("PLAY_CONTENT", context)
  };
}

export function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
