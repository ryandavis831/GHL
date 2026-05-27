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
# 3. Clean and tier it:
node index.js --import=./input/outscraper-charlotte-roofing.csv
```

By default the pipeline keeps **every operational, de-duplicated row** and assigns each one a tier. Use `--tier=` / `--minScore=` to narrow down without throwing data away.

You get four files in `./output/`:

- **`outreach.csv`** — polished, outreach-ready CSV (UTF-8 with BOM so Excel opens it cleanly)
- **`outreach.xlsx`** — formatted Excel workbook (freeze pane, auto-filter, conditional formatting, clickable URLs)
- `nc-leads-<timestamp>.csv` — full archival schema with every field
- `nc-leads-<timestamp>.json` — same data in JSON

The `outreach.*` filenames are stable (no timestamp) so downstream tools and CRM imports can always find the latest. The archival files keep the timestamp.

---

## Outscraper import mode

This is the recommended workflow. Outscraper is faster, more reliable, and cheaper to operate than live Playwright scraping for any volume above a few hundred leads.

### What the importer does

1. **Parse** the CSV with flexible column matching (handles Outscraper's many column-name variants).
2. **Drop closed businesses** — `business_status = CLOSED_PERMANENTLY/CLOSED_TEMPORARILY` or `permanently_closed = true`. Override with `--keepClosed`.
3. **Dedupe** by `place_id` first, then phone, then normalized name + address. Duplicate rows are merged field-by-field (non-empty wins).
4. **Classify each phone** as `toll-free`, `premium`, `invalid`, `mobile`, `landline`, `voip`, or `unknown` (see honest limitations below).
5. **Infer the niche** from Outscraper's `category` / `type` / `subtypes` (e.g. `Roofing contractor` → `roofing`).
6. **Flag Facebook-only** businesses (no website but has a Facebook URL).
7. **Optionally audit** any remaining websites for SSL / mobile-viewport / stale-copyright (use `--auditSites` — needed for accurate Tier 2 detection).
8. **Score** each lead 1–10 and **assign a tier** (1/2/3).
9. **Optional filters** (none on by default except closed-business removal):
   - `--tier=1,2` keep only specific tiers
   - `--minScore=5` drop leads below a score threshold
   - `--requirePhone` drop leads without a phone
   - `--noWebsiteOnly` legacy flag — drop any lead that has a website (use the tier system instead)
10. **Sort** by Tier ascending, then Score descending.
11. **Export** outreach CSV + XLSX + archival CSV + JSON.

### Tiers

Every lead is assigned exactly one tier:

| Tier | Criteria | Typical pitch |
| --- | --- | --- |
| **T1** | No website at all (with or without Facebook / phone) | "You need a website" |
| **T2** | Has a website but it's weak — no SSL, not mobile-friendly, stale copyright, broken/slow, or audit-flagged | "Your site is hurting you" |
| **T3** | Has a working website that looks OK; possible upsell only | "Add a booking funnel / improve SEO / get more reviews" |

T2 detection requires `--auditSites` (or trust Outscraper's data, which doesn't include SSL/mobile/copyright). Without an audit, a "has-website" lead defaults to T3.

### Import flags

| Flag | Default | Description |
| --- | --- | --- |
| `--import=<csv>` | — | Path to Outscraper CSV (required for import mode) |
| `--tier=<set>` | `all` | Keep only these tiers. `all`, `1`, `1,2`, `2,3`, etc. |
| `--minScore=<n>` | `1` | Drop leads scoring below `n` (1–10). Try `--minScore=5` for "real" leads only. |
| `--requirePhone` | off | Drop leads with no phone number |
| `--keepClosed` | off | Keep closed/inactive businesses (default: drop) |
| `--noWebsiteOnly` | off | Legacy filter — drop any lead with a website. Prefer `--tier=1` instead. |
| `--auditSites` | off | Audit websites for SSL/mobile/copyright (needed for accurate T2 detection) |
| `--twilio` | off | Use Twilio Lookup for mobile-vs-landline (requires creds) |
| `--xlsx` | on | Write `outreach.xlsx` in addition to `outreach.csv` |
| `--noXlsx` | off | Skip XLSX export (CSV only) |
| `--out=<basename>` | timestamp | Archival output basename. `outreach.*` files always land in `./output/` with stable names. |

### Examples

```bash
# Default — every operational, deduped lead, all tiers, sorted by tier then score
node index.js --import=./input/outscraper.csv

# Only Tier 1 (no-website leads)
node index.js --import=./input/outscraper.csv --tier=1

# Tiers 1+2 with a usable score floor (this is the common "outreach list" recipe)
node index.js --import=./input/outscraper.csv --tier=1,2 --minScore=5 --requirePhone

# Audit websites so weak sites get correctly bucketed as Tier 2 instead of Tier 3
node index.js --import=./input/outscraper.csv --auditSites --tier=1,2

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

## Outreach output

Both `outreach.csv` and `outreach.xlsx` share the same 25 columns in this exact order:

1. Business Name
2. Owner/Contact Name
3. Phone
4. Phone Type
5. Email
6. Website
7. Facebook URL
8. Google Maps URL
9. Address
10. City
11. State
12. Category/Niche
13. Rating
14. Review Count
15. Business Status
16. Has Website
17. Facebook Only
18. Lead Score
19. **Tier** (1 / 2 / 3 — see Tier table above)
20. Lead Quality (`High` ≥8, `Medium` 5–7, `Low` ≤4)
21. Why This Lead (human-readable narrative)
22. Suggested Offer
23. Tags
24. Source
25. Last Checked

Rows are sorted by **Tier ascending** (T1 first) then **Lead Score descending**.

### Sample `outreach.csv` row

```csv
Business Name,Owner/Contact Name,Phone,Phone Type,Email,Website,Facebook URL,Google Maps URL,Address,City,State,Category/Niche,Rating,Review Count,Business Status,Has Website,Facebook Only,Lead Score,Lead Quality,Why This Lead,Suggested Offer,Tags,Source,Last Checked
Carolina Cuts Landscaping LLC,,(704) 555-0142,unknown,,,https://facebook.com/carolinacuts,https://www.google.com/maps/place/?cid=1,"1234 Tryon St, Charlotte, NC 28202",Charlotte,NC,landscaping,4.6,8,OPERATIONAL,No,Yes,10,High,Facebook-only business,Lead-capture website + booking funnel,"website-lead, no-website, facebook-only, landscaping, Charlotte",outscraper,2026-05-27
Queen City HVAC Co,,(704) 555-0199,unknown,,,https://facebook.com/queencityhvac,https://www.google.com/maps/place/?cid=3,"9012 South Blvd, Charlotte, NC 28209",Charlotte,NC,HVAC,4.8,4,OPERATIONAL,No,Yes,10,High,Facebook-only business,Lead-capture website + booking funnel,"website-lead, no-website, facebook-only, HVAC, Charlotte",outscraper,2026-05-27
Asheville Tree Pros,,(828) 555-0166,unknown,,,,https://www.google.com/maps/place/?cid=5,"50 Pine St, Asheville, NC 28801",Asheville,NC,tree service,4.9,3,OPERATIONAL,No,No,8,High,No web presence,Website redesign + Google Business setup,"website-lead, no-website, tree-service, Asheville",outscraper,2026-05-27
```

### What the XLSX does that the CSV doesn't

- **Freeze top row** — headers stay visible while you scroll.
- **Auto-filter** enabled across all 24 columns.
- **Auto-sized columns** tuned for outreach readability (wide for `Address`, `Why This Lead`, `Suggested Offer`; narrow for `State`, `Rating`).
- **Conditional formatting on Tier**:
  - 1 → green (`#C6EFCE`)
  - 2 → yellow (`#FFEB9C`)
  - 3 → light blue (`#DEEBF7`)
- **Conditional formatting on Lead Score**:
  - 8–10 → green (`#C6EFCE` fill, dark green bold text)
  - 5–7 → yellow (`#FFEB9C` fill, dark amber bold text)
  - 1–4 → red (`#FFC7CE` fill, dark red bold text)
- **Highlighted cells**:
  - `Has Website = No` cell tinted orange
  - `Facebook Only = Yes` cell tinted blue
  - High review count (≥20) with weak branding signals → amber tint on rating cells
- **Clickable hyperlinks** on Website, Facebook URL, Google Maps URL (and `mailto:` on Email).
- **Light row banding** for readability.

### Why This Lead — narrative logic

First match wins, ordered most-specific first:

| Condition | Output |
| --- | --- |
| Marked closed | "Business marked closed" |
| No website but has Facebook URL | "Facebook-only business" |
| No website, ≥20 reviews, ≥4.0★ | "No website, strong reviews" |
| No website | "No web presence" |
| Has site, no SSL | "No SSL on website" |
| Has site, not mobile-friendly | "Weak mobile site" |
| Has site, copyright ≥2 yrs stale | "Outdated website" |
| Has site, broken/slow | "Website broken or slow" |
| Recent LLC (≤180 days) | "Recently formed LLC" |
| Improvable rating (3.5–4.5) | "Active business, room to grow reviews" |
| Low review count | "Low review count for active business" |
| Fallback | "Local service business — outreach candidate" |

### Suggested Offer logic

| Condition | Offer |
| --- | --- |
| Closed | "—" |
| No website + has Facebook | "Lead-capture website + booking funnel" |
| No website | "Website redesign + Google Business setup" |
| Broken/slow site | "Website redesign" |
| Not mobile-friendly or no SSL | "Website redesign" |
| Stale copyright | "Website refresh + SEO" |
| Recent LLC | "Website redesign + Google Business setup" |
| Low reviews | "SEO + reviews" |
| Improvable rating | "Google optimization" |
| No / invalid phone | "Missed-call text back" |
| Fallback | "Google optimization" |

### Tags

Every row gets the `website-lead` tag plus any of:

- `no-website`
- `facebook-only`
- `<niche>` (e.g. `roofing`, `tree-service`)
- `<city>` (e.g. `Charlotte`, `Chapel-Hill`)
- `new-business` (if recent LLC)
- `strong-reviews` (if ≥20 reviews and ≥4.0★)

### Excel library note

The user asked for SheetJS / `xlsx`. **The free SheetJS community edition does not support write-time conditional formatting** (it's a SheetJS Pro feature). To deliver everything you asked for — conditional formatting bands on Lead Score, auto-filter, freeze pane, hyperlinks, column sizing — without a paid library, this project uses `exceljs` instead. Same Node-native install, open source, no licensing constraints.

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
│   ├── export/
│   │   ├── outreach.js            # row-builder for outreach schema (single source of truth)
│   │   ├── csv.js                 # archival + outreach CSV writers
│   │   ├── xlsx.js                # exceljs-based polished workbook
│   │   └── json.js
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
