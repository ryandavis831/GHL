# NC Local Business Lead Scraper

Find North Carolina businesses that are good candidates for website / SEO outreach.

**Primary workflow: import an Outscraper Google Maps CSV, clean it, score it, and write an outreach-ready CSV.** Live scraping is also supported as a fallback.

---

## TL;DR

```bash
cd nc-lead-scraper
npm install                              # also runs `playwright install chromium`
cp .env.example .env

# 1. Export a Google Maps search from https://app.outscraper.com/ as CSV
# 2. Drop it into ./input/  (or anywhere)
# 3. Clean it:
node index.js --import=./input/outscraper-charlotte-roofing.csv --noWebsiteOnly --requirePhone
```

You get two CSVs and a JSON file in `./output/`:

- `nc-leads-<timestamp>.csv` — full schema with every field
- `nc-leads-<timestamp>-outreach.csv` — trimmed for paste-into-CRM use
- `nc-leads-<timestamp>.json` — same data in JSON

---

## Outscraper import mode

This is the recommended workflow. Outscraper is faster, more reliable, and cheaper to operate than live Playwright scraping for any volume above a few hundred leads.

### What the importer does

1. **Parse** the CSV with flexible column matching (handles Outscraper's many column-name variants).
2. **Drop closed businesses** — anything with `business_status = CLOSED_PERMANENTLY/CLOSED_TEMPORARILY` or `permanently_closed = true`.
3. **Dedupe** by `place_id` first, then phone, then normalized name + address. Duplicate rows are merged field-by-field (non-empty wins).
4. **Filter** (all toggleable):
   - `--noWebsiteOnly` drops anything with a website
   - `--requirePhone` drops anything without a phone
   - `--keepClosed` keeps closed businesses (off by default)
5. **Classify each phone** as `toll-free`, `premium`, `invalid`, `mobile`, `landline`, `voip`, or `unknown` (see honest limitations below).
6. **Infer the niche** from Outscraper's `category` / `type` / `subtypes` fields (e.g. `Roofing contractor` → `roofing`).
7. **Flag Facebook-only** businesses (no website but has a Facebook URL).
8. **Optionally audit** any remaining websites for SSL / mobile-viewport / stale-copyright (use `--auditSites`).
9. **Score** each lead 1–10.
10. **Export** full CSV, outreach CSV, and JSON.

### Import flags

| Flag | Description |
| --- | --- |
| `--import=<csv>` | Path to Outscraper CSV (required for import mode) |
| `--noWebsiteOnly` | Drop leads that already have a website |
| `--keepClosed` | Keep closed/inactive businesses (default: drop) |
| `--requirePhone` | Drop leads with no phone number |
| `--auditSites` | Audit any remaining websites for SSL/mobile/copyright |
| `--twilio` | Use Twilio Lookup for mobile-vs-landline (requires creds) |
| `--out=<basename>` | Output basename, no extension |

### Examples

```bash
# Clean an Outscraper export, no-website only, with phone required
node index.js --import=./input/outscraper.csv --noWebsiteOnly --requirePhone

# Same, plus audit any remaining websites for weak-site signals
node index.js --import=./input/outscraper.csv --auditSites

# Definitive mobile/landline classification via Twilio Lookup
TWILIO_ACCOUNT_SID=... TWILIO_AUTH_TOKEN=... \
  node index.js --import=./input/outscraper.csv --twilio --requirePhone

# Keep closed businesses (useful for niche research)
node index.js --import=./input/outscraper.csv --keepClosed
```

### Supported Outscraper columns

The importer is tolerant of column-name variations. It looks at:

| Field | Tried column names |
| --- | --- |
| Business name | `name`, `business_name`, `title`, `query` |
| Website | `site`, `website`, `url`, `domain` |
| Phone (primary) | `phone`, `phone_1` |
| Additional phones | `phone_2`, `phone_3` |
| Emails | `email_1`, `email_2`, `email_3`, `email` |
| Address | `full_address`, `address` |
| City | `city`, `borough` |
| State | `us_state`, `state` |
| Postal | `postal_code`, `zip` |
| Rating | `rating`, `google_rating` |
| Reviews | `reviews`, `review_count`, `reviews_count` |
| Category | `category`, `type`, `subtypes`, `main_category` |
| Status | `business_status`, `status`, `permanently_closed` |
| Maps URL | `location_link`, `place_link`, `maps_url`, `url` |
| Place ID | `place_id`, `google_id`, `cid` |
| Facebook | `facebook`, `facebook_url` |
| Instagram | `instagram`, `instagram_url` |

Missing columns are tolerated — they just produce empty fields, not errors.

### Phone type classification — honest limitations

In the US, **mobile vs landline cannot be determined from the phone number alone.** Years of full number portability mean a number originally allocated to a wireless block can now be a VoIP line, and vice versa. Anything claiming otherwise without an API call is guessing from a stale NPA-NXX table.

What this tool actually does:

- **Free, deterministic:** detects `toll-free` (800/833/844/855/866/877/888), `premium` (900), and `invalid` (wrong digit count).
- **Optional, definitive:** if you set `TWILIO_ACCOUNT_SID` + `TWILIO_AUTH_TOKEN` and pass `--twilio`, every remaining "unknown" number is looked up via Twilio Line Type Intelligence (~$0.005/lookup) and tagged `mobile` / `landline` / `voip` with carrier name.
- **Otherwise:** the number is tagged `unknown` rather than guessed.

This is the right tradeoff for outreach: a wrong `mobile` label sends an SMS to a landline answering machine. `unknown` is honest.

---

## Outreach CSV format

```csv
businessName,niche,category,city,state,phone,phoneType,email,address,googleMapsUrl,googleRating,reviewCount,facebookUrl,instagramUrl,facebookOnly,leadScore,highValue,scoreReasons,notes
"Carolina Cuts Landscaping LLC",landscaping,Landscaper,Charlotte,NC,"(704) 555-0142",unknown,,"1234 Tryon St, Charlotte, NC 28202",https://www.google.com/maps/place/?cid=1,4.6,8,https://facebook.com/carolinacuts,,true,10,true,"no-website|facebook-only|low-reviews|niche:landscaping","Facebook only — no website; 8 reviews; 4.6★"
"Queen City HVAC Co",HVAC,HVAC contractor,Charlotte,NC,"(704) 555-0199",toll-free,,"9012 South Blvd, Charlotte, NC 28209",https://www.google.com/maps/place/?cid=3,4.8,4,https://facebook.com/queencityhvac,,true,10,true,"no-website|facebook-only|low-reviews|niche:HVAC","Facebook only — no website; 4 reviews; 4.8★"
"Asheville Tree Pros","tree service",Tree service,Asheville,NC,"(828) 555-0166",unknown,,"50 Pine St, Asheville, NC 28801",https://www.google.com/maps/place/?cid=5,4.9,3,,,false,8,true,"no-website|low-reviews|niche:tree service","No web presence; 3 reviews; 4.9★"
```

The `notes` column is a human-readable summary built from the score reasons — good for a "First Line" field in cold outreach.

---

## Live scraping mode (fallback)

When you don't have an Outscraper export, the tool can scrape directly. This is slower and brittle — use Outscraper for any real volume.

```bash
node index.js --city=Charlotte --niche=roofing
node index.js --allCities --niche=HVAC --max=30
node index.js --city=Raleigh --allNiches --noWebsiteOnly
node index.js --city=Durham --niche=landscaping --from=2026-01-01 --to=2026-05-27
```

### Live-scrape flags

| Flag | Description |
| --- | --- |
| `--city=Charlotte` | Single city |
| `--cities=Charlotte,Raleigh` | Comma-separated cities |
| `--allCities` | All 10 built-in NC cities |
| `--niche=roofing` | Single niche |
| `--niches=roofing,plumbing` | Comma-separated niches |
| `--allNiches` | All 14 built-in niches |
| `--max=20` | Max results per (niche, city) pair |
| `--from=YYYY-MM-DD` | Filter NC SoS filings on/after this date |
| `--to=YYYY-MM-DD` | Filter NC SoS filings on/before this date |

### Sources

- **Google Maps** — DOM scrape of `<niche> in <city>, NC` search.
- **NC Secretary of State** — business filings, keyword-filtered by niche, optionally date-windowed.
- **Facebook** — `site:facebook.com` Google query for leads with no website.
- **Yelp** — optional enrichment, off by default.

---

## Folder structure

```
nc-lead-scraper/
├── index.js                       # CLI entry
├── package.json
├── .env.example
├── src/
│   ├── config/index.js            # niches, cities, env-driven config
│   ├── import/
│   │   ├── outscraper.js          # CSV parse + dedupe + filter
│   │   └── nicheMap.js            # category → niche inference
│   ├── scrapers/
│   │   ├── browser.js
│   │   ├── googleMaps.js
│   │   ├── secretaryOfState.js
│   │   ├── facebook.js
│   │   └── yelp.js
│   ├── enrichment/
│   │   ├── websiteAudit.js        # SSL, mobile, copyright
│   │   ├── phoneType.js           # toll-free / Twilio Lookup
│   │   └── merge.js
│   ├── scoring/leadScore.js
│   ├── export/{csv.js,json.js}
│   └── utils/                     # logger, delay, rateLimiter, retry, text, userAgents
└── output/                        # CSV + JSON written here
```

---

## Scoring

Lead score is the sum of weighted signals, clamped to 1–10. `highValue = true` when score ≥ 7. Closed businesses always score 1.

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

---

## Install

```bash
cd nc-lead-scraper
npm install                        # postinstall: playwright install chromium
cp .env.example .env
```

Required env vars are all optional (defaults work). The interesting ones:

```bash
TWILIO_ACCOUNT_SID=                # for --twilio phone classification
TWILIO_AUTH_TOKEN=
MIN_DELAY_MS=1500                  # random delay floor (live scrape only)
MAX_DELAY_MS=4500                  # random delay ceiling
REQUESTS_PER_MINUTE=20             # per-source rate cap
ENABLE_YELP=false                  # enable Yelp enrichment in live mode
```

## Run

```bash
# Import mode (primary)
npm run import -- --import=./input/outscraper.csv --noWebsiteOnly --requirePhone
# or:
node index.js --import=./input/outscraper.csv --noWebsiteOnly --requirePhone

# Live scrape (fallback)
node index.js --city=Charlotte --niche=roofing
```

## Etiquette / safety

- Live scraping uses 20 req/min/source, 1.5–4.5s random delays, 3 retries with exponential backoff, randomized user-agent per browser context, and masks `navigator.webdriver`.
- The scraper does **not** log into Google, Facebook, or Yelp.
- Outscraper import does no network requests unless you pass `--auditSites` or `--twilio`.

## Known limitations

- US mobile vs landline is "unknown" without Twilio Lookup — see above.
- Google Maps and Yelp live scrapers depend on DOM selectors that drift; if results go to zero, update selectors in `src/scrapers/`.
- NC SoS public search layout changes occasionally; the scraper returns `[]` rather than throwing on layout mismatches.
- `--auditSites` does a single-page audit; it won't catch deep SEO issues, only triage signals.
