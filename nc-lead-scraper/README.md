# NC Local Business Lead Scraper

Find newly formed or weak-online-presence North Carolina businesses that are good candidates for website / SEO outreach.

## What it does

1. **Google Maps** — searches `<niche> in <city>, NC`, extracts name, phone, address, website, rating, review count.
2. **NC Secretary of State** — searches business filings, keeps results matching a niche keyword inside the configured filing-date window.
3. **Facebook lookup** — for leads with no website, finds the business' Facebook page via a `site:facebook.com` Google query.
4. **Website audit** — loads the site and checks SSL, mobile viewport, copyright year, and surfaces any visible email / phone.
5. **Yelp enrichment** — optional, off by default.
6. **Scoring** — every lead gets a 1–10 score; `highValue` flag is set when score ≥ 7.
7. **Export** — writes CSV + JSON to `./output/`.

## Folder structure

```
nc-lead-scraper/
├── index.js                       # CLI entry
├── package.json
├── .env.example
├── src/
│   ├── config/index.js            # niches, cities, env-driven config
│   ├── scrapers/
│   │   ├── browser.js             # shared Playwright factory
│   │   ├── googleMaps.js
│   │   ├── secretaryOfState.js
│   │   ├── facebook.js
│   │   └── yelp.js
│   ├── enrichment/
│   │   ├── websiteAudit.js
│   │   └── merge.js
│   ├── scoring/leadScore.js
│   ├── export/{csv.js,json.js}
│   └── utils/
│       ├── logger.js
│       ├── delay.js
│       ├── rateLimiter.js
│       ├── retry.js
│       ├── text.js
│       └── userAgents.js
└── output/                        # CSV + JSON written here
```

## Install

```bash
cd nc-lead-scraper
npm install
# postinstall already runs `playwright install chromium` — if it didn't:
npx playwright install chromium
cp .env.example .env
```

Edit `.env` to override defaults (rate limits, default city/niche, etc.).

## Run

```bash
# Single city / niche
npm run scrape -- --city=Charlotte --niche=roofing

# All NC cities, one niche
node index.js --allCities --niche=HVAC --max=30

# One city, all niches, no-website-only
node index.js --city=Raleigh --allNiches --noWebsiteOnly

# Date range on SoS filings (newly formed LLCs)
node index.js --city=Durham --niche=landscaping --from=2026-01-01 --to=2026-05-27

# Custom output basename
node index.js --city=Cary --niche=plumbing --out=output/cary-plumbing
```

Helpful shortcuts in `package.json`:

```bash
npm run scrape:charlotte
npm run scrape:no-website
```

## CLI flags

| Flag | Description |
| --- | --- |
| `--city=Charlotte` | Single city |
| `--cities=Charlotte,Raleigh` | Comma-separated cities |
| `--allCities` | All 10 built-in NC cities |
| `--niche=roofing` | Single niche |
| `--niches=roofing,plumbing` | Comma-separated niches |
| `--allNiches` | All 14 built-in niches |
| `--max=20` | Max results per (niche, city) pair |
| `--from=YYYY-MM-DD` | Filter SoS filings on/after this date |
| `--to=YYYY-MM-DD` | Filter SoS filings on/before this date |
| `--noWebsiteOnly` | Only output leads with no website |
| `--out=output/leads` | Output basename (no extension) |
| `--help` | Show help |

## Built-in cities

Charlotte, Raleigh, Durham, Greensboro, Winston-Salem, Asheville, Wilmington, Boone, Chapel Hill, Cary.

## Built-in niches

landscaping, roofing, HVAC, plumbing, tree service, cleaning, pressure washing, remodeling, concrete, junk removal, car detailing, construction, painting, flooring.

## Sample CSV output

```csv
businessName,entityType,filingDate,niche,city,state,phone,email,address,website,hasSSL,mobileFriendly,copyrightYear,googleMapsUrl,googleRating,reviewCount,facebookUrl,yelpUrl,yelpRating,yelpReviews,leadScore,highValue,scoreReasons,sources
"Carolina Cuts Landscaping LLC",LLC,2026-04-02,landscaping,Charlotte,NC,"(704) 555-0142",,"1234 Tryon St, Charlotte, NC",,,,,"https://www.google.com/maps/place/...",4.6,8,"https://facebook.com/carolinacuts",,,,9,true,"no-website|facebook-only|low-reviews|improvable-rating|recent-llc|niche:landscaping","google-maps|nc-sos"
"Triangle Roof Pros",,,roofing,Raleigh,NC,"(919) 555-0188","info@triangleroofpros.com","5678 Wake Forest Rd, Raleigh, NC","http://triangleroofpros.com",false,false,2019,"https://www.google.com/maps/place/...",4.2,22,,,,,7,true,"no-ssl|not-mobile-friendly|stale-copyright|improvable-rating|niche:roofing","google-maps"
"Queen City HVAC Co",LLC,2026-03-15,HVAC,Charlotte,NC,"(704) 555-0199",,,,,,,"https://www.google.com/maps/place/...",4.8,4,"https://facebook.com/queencityhvac",,,,10,true,"no-website|facebook-only|low-reviews|recent-llc|niche:HVAC","google-maps|nc-sos"
```

JSON output mirrors the same fields with arrays preserved.

## Scoring

Lead score is the sum of weighted signals, clamped to 1–10. `highValue` is set when score ≥ 7.

| Signal | Weight |
| --- | --- |
| No website | +4 |
| Facebook-only (no website but has FB) | +3 |
| Has website but no SSL | +2 |
| Has website but not mobile-friendly | +1 |
| Stale copyright (≥2 years old) | +1 |
| Low review count (1–14) | +1 |
| Rating in 3.5–4.5 (active but improvable) | +1 |
| Recent LLC (filed in last 180 days) | +1 |
| Broken / slow site | +1 |
| Niche quality | +1 to +3 |

## Etiquette / safety

- Defaults are conservative: 20 req/min per source, 1.5–4.5s random delays, 3 retries with exponential backoff.
- Browser ships with a randomized user-agent per context and `navigator.webdriver` is masked.
- The scraper does **not** log into Google, Facebook, or Yelp.
- The NC SoS scraper degrades gracefully if the public site layout changes — it returns `[]` instead of throwing.
- If you push rate limits up in `.env`, you're on your own.

## Known limitations (MVP)

- Google Maps and Yelp use DOM scraping — selectors will drift. If results drop to zero, open the search page manually and update the selectors in `src/scrapers/googleMaps.js` / `yelp.js`.
- NC SoS public search has historically changed URL structure and field names; this scraper uses fuzzy selectors and degrades gracefully. For high-volume use you should consider their bulk data feed.
- Facebook discovery uses a Google `site:facebook.com` query — it works well for clearly-named businesses but can miss heavily branded names.
- Website audit is a single-page load; it won't catch deep SEO issues (only signals that matter for triaging leads).
