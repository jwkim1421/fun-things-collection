# GitHub Pages Starter

This starter is for a static, ad-supported site that can be published with GitHub Pages.

## Files

- `index.html`: Home page layout
- `tests/`: Sample content pages
- `assets/css/style.css`: Shared styling
- `assets/js/content-data.js`: Home card data and sample page metadata
- `assets/js/main.js`: Card rendering and basic page behavior
- `assets/js/share.js`: Share helpers for Kakao, copy link, and SMS
- `ads.txt`: AdSense root file
- `robots.txt`: Search engine policy
- `.nojekyll`: Disables Jekyll processing on GitHub Pages

## Replace These Placeholders

- `YOUR_SITE_NAME`
- `YOUR_SITE_URL`
- `YOUR_ADSENSE_CLIENT`
- `YOUR_ADSENSE_SLOT`
- `YOUR_KAKAO_JAVASCRIPT_KEY`

## Notes

- Keep secrets out of browser code.
- AdSense and Kakao JavaScript keys are public client-side values.
- Any real secret, payment key, or server token should live in a backend or serverless function.
- Add or edit cards in `assets/js/content-data.js` first if you want to scale the home grid without touching HTML.
