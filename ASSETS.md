# Sonora Tax & Bookkeeping — Asset Manifest

## Brand assets (assets/brand/)

| Filename | Purpose | Used in |
|---|---|---|
| **sonora-st-gradient-logo.png** | Primary brand logo (cyan→purple gradient ST mark) | `index.html` favicon (line 13), nav brand box `.nav__logo` (line 54), footer brand box `.footer__logo` (line 748) |
| **astrid-portrait.png** | Founder portrait | Hero section `.hero__portrait img` (line 176) |
| **astrid-card-cropped.png** | About section card image (cropped variant) | About section `.feature__media-frame img` (line 246) |
| **astrid-office.png** | Office / bookkeeping feature visual | Bookkeeping feature section `.feature__media-frame img` (line 360) |
| `astrid-card.png` | *Legacy* — original (uncropped) About card. Superseded by `astrid-card-cropped.png`. Kept for reference, no live references in code. |
| `logo-black.png` | *Legacy* — old monochrome ST logo. Superseded by `sonora-st-gradient-logo.png`. No live references. |
| `logo-gradient.png` | *Legacy* — old gradient logo variant. Superseded by `sonora-st-gradient-logo.png`. No live references. |
| `sonora-st-logo.png` | *Legacy* — interim plain ST logo. Superseded by `sonora-st-gradient-logo.png`. No live references. |

## Site files

| File | Contains |
|---|---|
| `index.html` | Markup — topbar, nav, hero, trust strip, about, bookkeeping feature, services, why, leave-a-review, CTA banner, FAQ, map, footer, modal |
| `styles.css` | All styles — base, components, responsive breakpoints (1180 / 1100 / 820 / 540 / 480), final About image block, mobile audit fixes, mobile navbar tightening (<540) |
| `script.js` | Sticky nav, mobile menu, modal open/close, multi-select services, year, form submit, i18n EN ↔ ES dictionary, language toggle |

## Contact details (used across HTML and i18n)

| Type | Value | Locations |
|---|---|---|
| Phone (display) | **(919) 923-0394** | Topbar phone link, hero "Call Now" button, FAQ answer, footer contact column, map contact card |
| Phone (`tel:`) | **+19199230394** | All `tel:` links (topbar, hero, CTA banner, map, footer) |
| Email | **astrid@sonorataxbook.com** | Footer contact column, map contact card |
| Address | 212 W Main St, Suite A2, Carrboro, NC 27510 | Topbar pill, map section, footer, FAQ answer |
| LinkedIn | https://www.linkedin.com/in/astrid-bollain-6491b0b2/ | Nav brand box link, footer LinkedIn pill |

## Mobile fixes summary (active in this build)

- **<1100px** — About image stacks above text; hero stacks; services grid → 2 columns; why grid → 2 columns; review card stacks; map stacks; topbar center pill hides.
- **<820px** — Container padding tightens to 22px; nav links and hamburger nav active (above 540 only); hero stats stack; service/why/reviews grids → 1 column; modal padding tightens.
- **<540px** — Sonora wordmark hidden; CTA label swaps to "Book" / "Agendar"; lang toggle compact (10px 14px padding, 15px font); nav logo 48px; nav padding 10/14; hamburger hidden, lang toggle + CTA cluster shown in one row; hero CTAs full-width stacked; portrait chips contained; topbar centered wrap; modal input `font-size: 16px` to prevent iOS zoom; footer single column.
- **<480px** — Hero title 30px; button sizing tightened; FAQ summary tightened.
