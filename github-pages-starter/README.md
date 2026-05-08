# GitHub Pages Starter

This starter is for a static, ad-supported site that can be published with GitHub Pages.

## Files

- `index.html`: Home page layout
- `tests/`: Sample content pages
- `assets/css/style.css`: Shared styling
- `assets/js/site-config.js`: Public site settings such as site name, URL, and share/ad keys
- `assets/js/content-data.js`: Home card data and sample page metadata
- `assets/js/ads.js`: Reads AdSense values from `site-config.js` and initializes ad slots
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

## 1. Change Your Site Name and Public Values

Edit `assets/js/site-config.js` first.

```js
window.SITE_CONFIG = {
  siteName: "YOUR_SITE_NAME",
  siteUrl: "YOUR_SITE_URL",
  kakaoJavaScriptKey: "YOUR_KAKAO_JAVASCRIPT_KEY",
  adsenseClient: "YOUR_ADSENSE_CLIENT",
  adsenseSlot: "YOUR_ADSENSE_SLOT"
};
```

- `siteName`: your service name shown in the header
- `siteUrl`: your final public URL, for example `https://yourname.github.io/repo-name/`
- `kakaoJavaScriptKey`: Kakao JavaScript key
- `adsenseClient`: AdSense client id like `ca-pub-xxxxxxxx`
- `adsenseSlot`: ad slot id for the main ad block

After saving, refresh `http://localhost:3000`.

## 2. Customize the First Test Page

Start with `tests/test-001.html`.

Recommended edit order:

1. Change the page title and intro text.
2. Replace the sample questions under the `Question Preview` section.
3. Replace the result preview labels with your real result names.
4. Update the related cards at the bottom right.
5. If you add a real ad snippet, place it in the `inline-ad` area or the main home ad slot.

If you want the home card to match the page, also update `assets/js/content-data.js`.

Fields you will usually edit there:

- `title`
- `description`
- `href`
- `badge`
- `category`
- `duration`

## 3. Preview Locally While Editing

Run a local server:

```powershell
cd "C:\Users\river.kim\Documents\New project\github-pages-starter"
npx serve .
```

Then open:

- `http://localhost:3000`

Keep the terminal open while previewing. After any edit, save the file and refresh the browser.

## 4. Publish with GitHub Pages

Basic flow:

1. Create a GitHub repository and upload this folder.
2. Push your files to the main branch.
3. In GitHub, open `Settings > Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/ (root)` folder.
6. Save and wait for GitHub Pages to publish.

Your site URL will usually look like:

- `https://YOUR_GITHUB_USERNAME.github.io/REPOSITORY_NAME/`

If you later connect a custom domain:

1. Create a `CNAME` file in the project root.
2. Put your domain in that file, for example `test-it.co.kr`.
3. Set the same domain in GitHub Pages settings.
4. Update DNS at your domain provider.

## 5. Before Real Launch

Check these before going public:

1. Replace all placeholder values in `assets/js/site-config.js`.
2. Update `ads.txt` with your real AdSense publisher line.
3. Verify every card link in `assets/js/content-data.js`.
4. Confirm share buttons use the correct production URL.
5. Test both the home page and at least one `tests/` page on mobile width.
