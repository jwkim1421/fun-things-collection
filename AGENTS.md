# Project maintenance

- Read [COOCOO_GROWTH_PLAN.md](COOCOO_GROWTH_PLAN.md) before related site work. Update its goals, verified problems, solutions, status and verification when relevant work changes them. Write for a nontechnical reader.
- Keep [COOCOO_SITE_UPDATE_PLAN.md](COOCOO_SITE_UPDATE_PLAN.md) as historical design context. Current status belongs in the growth plan.
- Separate implementation, local verification, deployment and external account approval. Never report a local change as live.
- Never include analytics exports, account screenshots, maintenance documents or Worker configuration in public website artifacts. Use `npm run package:site` and inspect the artifact before deployment.
- Source data is in `assets/js/content-data.js`, `extra-content-data.js`, `catalog.js` and `playground.js`. Run `npm run build` after changing it; do not maintain conflicting page metadata by hand.
- Run `npm test` after behavior changes. Browser/device checks remain separate from Node tests.
- AdSense stays disabled until the owner verifies approval for this site and the publisher ID. Do not submit account requests or publish without task authorization.
