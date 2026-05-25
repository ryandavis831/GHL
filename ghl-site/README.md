# Carolina Commercial Cleaning Services Inc — GoHighLevel Static Build

Pure HTML + CSS + vanilla JavaScript. No build step required to deploy.
Everything in this folder is ready to paste into GoHighLevel Website Builder.

---

## What's here

```
ghl-site/
├── styles.css                                  ← Paste into GHL "Custom CSS"
├── scripts.js                                  ← Paste into GHL "Custom JS" / footer
├── assets/
│   ├── clients/   (Wendy's, Dunkin', Tractor Supply logos)
│   └── team/      (team-photo.jpg + team-photo.webp)
├── index.html                                  ← Home page body
├── about.html                                  ← About page
├── services.html                               ← Services index
├── service-areas.html                          ← Service Areas index
├── clients.html                                ← Clients page
├── contact.html                                ← Contact / Book page
│
├── SERVICE LANDING PAGES (one per service)
├── commercial-cleaning-richlands-nc.html
├── janitorial-services-richlands-nc.html
├── post-construction-cleaning-richlands-nc.html
├── residential-cleaning-richlands-nc.html
├── deep-cleaning-richlands-nc.html
│
├── SERVICE AREA LANDING PAGES (one per city/area)
├── cleaning-services-richlands-nc.html
├── cleaning-services-jacksonville-nc.html
├── cleaning-services-onslow-county-nc.html
├── cleaning-services-sneads-ferry-nc.html
│
├── sitemap.xml
├── robots.txt
└── _build.mjs  (optional regenerator — not needed to deploy)
```

Every page is fully self-contained — open any `.html` in a browser
locally and it will render the complete site. The shared `styles.css`
and `scripts.js` are referenced via relative paths.

---

## How to install in GoHighLevel

### Option A — Easiest (recommended): one page = one Custom HTML widget

1. **Sites → Funnels & Websites → New Website**.
2. In **Settings → Header Tracking Code**, paste the contents of
   `styles.css` inside `<style>…</style>` tags. (Or use the dedicated
   "Custom CSS" field if your subaccount has it.)
3. In **Settings → Body / Footer Tracking Code**, paste the contents of
   `scripts.js` inside `<script>…</script>` tags right before `</body>`.
4. For each page (Home, About, etc.) in the GHL builder:
    - Add a **single-column row**.
    - Drop in a **Custom HTML** element.
    - Paste **only the `<body>` contents** of the matching `.html`
      file (everything between `<body>` and `</body>`).
    - **Don't** paste the `<head>` — instead, set the page's SEO
      title and meta description via GHL's page-settings panel using
      the same values from the file's `<title>` and
      `<meta name="description">`.
5. Upload the `assets/clients/*` and `assets/team/*` files via
   **Media Library** and update the `./assets/...` paths in the pasted
   HTML to the URLs GHL assigns.

### Option B — Full HTML embed per page

Some GHL templates let you publish a page as a raw HTML embed. In that
case you can paste the entire `.html` file as-is.

### Option C — Host the static folder externally

These files are also a complete website. You can drop the whole
`ghl-site/` folder onto Netlify, Vercel static, Cloudflare Pages,
S3+CloudFront, or any plain static host — no build step needed.

---

## Page slugs to use in GoHighLevel

Match the file name (without `.html`) to the GHL page slug so all
internal links continue to resolve:

| Page                        | GHL slug                                       |
|-----------------------------|------------------------------------------------|
| Home                        | `/`                                            |
| About                       | `/about`                                       |
| Services index              | `/services`                                    |
| Service Areas index         | `/service-areas`                               |
| Clients                     | `/clients`                                     |
| Contact / Book              | `/contact`                                     |
| Commercial Cleaning         | `/commercial-cleaning-richlands-nc`            |
| Janitorial Services         | `/janitorial-services-richlands-nc`            |
| Post-Construction Cleaning  | `/post-construction-cleaning-richlands-nc`    |
| Residential Cleaning        | `/residential-cleaning-richlands-nc`           |
| Deep Cleaning               | `/deep-cleaning-richlands-nc`                  |
| Richlands, NC               | `/cleaning-services-richlands-nc`              |
| Jacksonville, NC            | `/cleaning-services-jacksonville-nc`           |
| Onslow County, NC           | `/cleaning-services-onslow-county-nc`          |
| Sneads Ferry, NC            | `/cleaning-services-sneads-ferry-nc`           |

The internal `<a href="./about.html">` links will become
`/about` style links once GHL serves the page — adjust the hrefs to
remove `.html` once you've configured the slugs.

---

## Hooking the quote form to GoHighLevel

The quote form currently shows a placeholder success message
(`scripts.js` → section 5). To send submissions to GHL:

1. In GHL, create a Form (e.g. "Cleaning Quote") with the same fields
   used in the modal: name, phone, email, address, service, property
   type, timing, message.
2. Either:
    - Replace the entire `<form data-quote-form>` block in the
      pasted HTML with the GHL Form embed snippet, OR
    - Edit `scripts.js` section 5 (`form.addEventListener('submit', …)`)
      to `fetch(POST)` to your GHL webhook URL with the form data.

The chat widget is similarly a polished placeholder — wire it to
GoHighLevel Live Chat / Tawk.to / Intercom by replacing the
`sendChat()` body in `scripts.js` section 6.

---

## Updating content

Two ways:

**(a) Edit HTML directly.** Each page file is plain HTML — open in any
editor and change copy.

**(b) Regenerate from the data file.** Edit `_build.mjs` (data near the
top: `SITE`, `services`, `areas`) and run:

```
node ghl-site/_build.mjs
```

This rewrites every `.html` file so all copy stays consistent.

---

## Browser support

Modern evergreen browsers. Uses standard CSS Grid, Flexbox, CSS custom
properties, `<picture>`, and ES5-safe JavaScript. No polyfills needed.
