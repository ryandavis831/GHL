#!/usr/bin/env node
import 'dotenv/config';
import minimist from 'minimist';
import path from 'node:path';
import pLimit from 'p-limit';

import { CONFIG, NC_CITIES, NICHES } from './src/config/index.js';
import { logger } from './src/utils/logger.js';
import { scrapeGoogleMaps } from './src/scrapers/googleMaps.js';
import { scrapeNCSecretaryOfState } from './src/scrapers/secretaryOfState.js';
import { findFacebookPage } from './src/scrapers/facebook.js';
import { enrichWithYelp } from './src/scrapers/yelp.js';
import { auditWebsite } from './src/enrichment/websiteAudit.js';
import { mergeLeads } from './src/enrichment/merge.js';
import { classifyPhone } from './src/enrichment/phoneType.js';
import { scoreLead } from './src/scoring/leadScore.js';
import { assignTier } from './src/export/outreach.js';
import { exportCSV, exportOutreachCSV } from './src/export/csv.js';
import { exportOutreachXLSX } from './src/export/xlsx.js';
import { exportJSON } from './src/export/json.js';
import { closeBrowser } from './src/scrapers/browser.js';
import { processOutscraperCSV } from './src/import/outscraper.js';

function parseArgs() {
  const argv = minimist(process.argv.slice(2), {
    string: ['city', 'niche', 'cities', 'niches', 'from', 'to', 'out', 'import', 'tier'],
    boolean: [
      'noWebsiteOnly', 'allCities', 'allNiches', 'help',
      'auditSites', 'twilio', 'keepClosed', 'requirePhone', 'xlsx', 'noXlsx',
    ],
    default: {
      city: CONFIG.defaultCity,
      niche: CONFIG.defaultNiche,
      max: CONFIG.defaultResultsPerNiche,
      noWebsiteOnly: false,            // opt-in only — tier system handles website triage now
      auditSites: false,
      twilio: false,
      keepClosed: false,
      requirePhone: false,
      xlsx: true,
      noXlsx: false,
      tier: 'all',
      minScore: 1,                     // permissive default — use --minScore=5 to tighten
    },
  });

  if (argv.help) {
    printHelp();
    process.exit(0);
  }

  let cities;
  if (argv.allCities) cities = NC_CITIES;
  else if (argv.cities) cities = argv.cities.split(',').map((s) => s.trim());
  else cities = [argv.city];

  let niches;
  if (argv.allNiches) niches = NICHES;
  else if (argv.niches) niches = argv.niches.split(',').map((s) => s.trim());
  else niches = [argv.niche];

  return {
    importPath: argv.import || null,
    cities,
    niches,
    max: parseInt(argv.max, 10) || CONFIG.defaultResultsPerNiche,
    from: argv.from || null,
    to: argv.to || null,
    noWebsiteOnly: !!argv.noWebsiteOnly,
    keepClosed: !!argv.keepClosed,
    requirePhone: !!argv.requirePhone,
    auditSites: !!argv.auditSites,
    useTwilio: !!argv.twilio,
    xlsx: !argv.noXlsx,
    tiers: parseTiers(argv.tier),
    minScore: Number.isFinite(parseInt(argv.minScore, 10)) ? parseInt(argv.minScore, 10) : 1,
    out: argv.out || null,
  };
}

function parseTiers(raw) {
  if (!raw || raw === 'all') return new Set([1, 2, 3]);
  const tiers = String(raw)
    .split(',')
    .map((t) => parseInt(t.trim(), 10))
    .filter((n) => n >= 1 && n <= 3);
  if (tiers.length === 0) return new Set([1, 2, 3]);
  return new Set(tiers);
}

function printHelp() {
  console.log(`
NC Local Business Lead Scraper

PRIMARY WORKFLOW — Outscraper CSV import:
  node index.js --import=path/to/outscraper.csv [flags]

LIVE SCRAPING WORKFLOW (fallback):
  node index.js --city=Charlotte --niche=roofing

Outscraper flags:
  --import=<csv>            Path to Outscraper Google Maps CSV export
  --tier=all                Keep all tiers (default). Or: --tier=1, --tier=1,2, --tier=2,3
  --minScore=1              Drop leads scoring below N (default: 1 = no filter; try 5)
  --noWebsiteOnly           OPT-IN: drop leads that have a website (legacy filter)
  --keepClosed              Keep closed/inactive businesses (default: drop)
  --requirePhone            Drop leads with no phone number
  --auditSites              Audit each website for SSL/mobile/copyright (improves tiering)
  --twilio                  Use Twilio Lookup for mobile-vs-landline (needs env creds)
  --xlsx                    Write outreach.xlsx in addition to outreach.csv (default: on)
  --noXlsx                  Skip XLSX export

Tiers (assigned automatically, never used to drop unless you pass --tier):
  Tier 1: no website at all (easiest pitch: "you need a website")
  Tier 2: weak/outdated/non-mobile/no-SSL/broken website
  Tier 3: has a working website; upsell only (low reviews, ratings, SEO)

Live-scrape flags:
  --city=Charlotte          Single city
  --cities=Charlotte,Raleigh
  --allCities               All built-in NC cities
  --niche=roofing
  --niches=roofing,plumbing
  --allNiches               All built-in niches
  --max=20                  Max results per niche/city
  --from=YYYY-MM-DD         Filter SoS filings from date
  --to=YYYY-MM-DD           Filter SoS filings to date

Common:
  --out=output/leads        Output basename (no extension)
  --help

Examples:
  # Clean an Outscraper export into outreach-ready CSV
  node index.js --import=./input/outscraper-charlotte-roofing.csv --noWebsiteOnly

  # Same, but also audit any remaining websites for weak-site signals
  node index.js --import=./input/outscraper.csv --auditSites

  # Live scrape (no CSV)
  node index.js --city=Raleigh --niche=HVAC --max=30
`);
}

function inDateRange(filingDate, from, to) {
  if (!from && !to) return true;
  if (!filingDate) return false;
  const d = new Date(filingDate);
  if (Number.isNaN(d.getTime())) return false;
  if (from && d < new Date(from)) return false;
  if (to && d > new Date(to)) return false;
  return true;
}

async function classifyPhones(leads, { useTwilio }) {
  const limit = pLimit(useTwilio ? 4 : 32);
  return Promise.all(leads.map((lead) => limit(async () => {
    if (!lead.phone) return { ...lead, phoneType: 'invalid' };
    const cls = await classifyPhone(lead.phone, { useTwilio });
    return {
      ...lead,
      phoneType: cls.phoneType,
      phoneCarrier: cls.carrier || null,
    };
  })));
}

async function auditWebsites(leads) {
  const limit = pLimit(3);
  return Promise.all(leads.map((lead) => limit(async () => {
    if (!lead.website) return lead;
    const audit = await auditWebsite(lead.website).catch(() => null);
    if (!audit) return lead;
    return { ...lead, ...audit };
  })));
}

async function writeOutputs(leads, args) {
  // Sort highest score first so every export reflects priority order.
  const sorted = [...leads].sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));

  const stamp = new Date().toISOString().replace(/[:T.]/g, '-').slice(0, 19);
  const base = args.out || path.join(CONFIG.outputDir, `nc-leads-${stamp}`);

  // Polished outreach files use stable filenames so downstream tools can find
  // them without timestamp guessing. The archival files keep the timestamp.
  const outreachCsv = exportOutreachCSV(sorted, path.join(CONFIG.outputDir, 'outreach.csv'));
  const archivalCsv = exportCSV(sorted, `${base}.csv`);
  const archivalJson = exportJSON(sorted, `${base}.json`);

  const written = { 'outreach.csv': outreachCsv, full: archivalCsv, json: archivalJson };

  if (args.xlsx) {
    const outreachXlsx = await exportOutreachXLSX(sorted, path.join(CONFIG.outputDir, 'outreach.xlsx'));
    written['outreach.xlsx'] = outreachXlsx;
  }

  logger.success(`Wrote ${sorted.length} leads`, written);

  const t1 = sorted.filter((l) => l.tier === 1).length;
  const t2 = sorted.filter((l) => l.tier === 2).length;
  const t3 = sorted.filter((l) => l.tier === 3).length;
  const high = sorted.filter((l) => l.highValue).length;
  const fbOnly = sorted.filter((l) => l.facebookOnly).length;
  logger.info(`Summary: T1=${t1} T2=${t2} T3=${t3} | ${high} high-value (>=7) | ${fbOnly} facebook-only`);
}

async function runImport(args) {
  logger.info('Outscraper CSV import mode', { file: args.importPath });
  const leads = processOutscraperCSV(args.importPath, {
    removeClosed: !args.keepClosed,
    removeWithWebsite: args.noWebsiteOnly,
    requirePhone: args.requirePhone,
  });

  let withPhone = await classifyPhones(leads, { useTwilio: args.useTwilio });

  if (args.auditSites) {
    logger.info(`Auditing ${withPhone.filter((l) => l.website).length} websites`);
    withPhone = await auditWebsites(withPhone);
  }

  let scored = withPhone.map((l) => {
    const withScore = { ...l, ...scoreLead(l) };
    return { ...withScore, tier: assignTier(withScore) };
  });

  scored = applyTierAndScoreFilters(scored, args);
  scored.sort((a, b) => {
    // Tier first (1 best), then score desc.
    if ((a.tier || 99) !== (b.tier || 99)) return (a.tier || 99) - (b.tier || 99);
    return (b.leadScore || 0) - (a.leadScore || 0);
  });

  await writeOutputs(scored, args);
  await closeBrowser();
}

function applyTierAndScoreFilters(leads, args) {
  const before = leads.length;
  let out = leads.filter((l) => args.tiers.has(l.tier));
  const afterTier = out.length;
  if (afterTier !== before) {
    logger.info(`Filter "tier ${Array.from(args.tiers).sort().join(',')}": ${before} -> ${afterTier}`);
  }
  if (args.minScore > 1) {
    out = out.filter((l) => (l.leadScore || 0) >= args.minScore);
    logger.info(`Filter "minScore >= ${args.minScore}": ${afterTier} -> ${out.length}`);
  }
  const tierCounts = out.reduce((acc, l) => {
    acc[`T${l.tier}`] = (acc[`T${l.tier}`] || 0) + 1;
    return acc;
  }, {});
  logger.info('Tier distribution', tierCounts);
  return out;
}

async function runLiveScrape(args) {
  logger.info('Live scrape mode', args);
  const allMaps = [];
  const allSos = [];

  for (const city of args.cities) {
    for (const niche of args.niches) {
      if (CONFIG.enableGoogleMaps) {
        try {
          const results = await scrapeGoogleMaps({ niche, city, max: args.max });
          allMaps.push(...results);
        } catch (err) {
          logger.error(`google maps failed for ${niche}/${city}`, { error: err.message });
        }
      }
    }

    if (CONFIG.enableSos) {
      try {
        const sos = await scrapeNCSecretaryOfState({ city, niches: args.niches, max: args.max * 2 });
        allSos.push(...sos);
      } catch (err) {
        logger.error(`SoS failed for ${city}`, { error: err.message });
      }
    }
  }

  let merged = mergeLeads(allMaps, allSos);
  logger.info(`Merged ${allMaps.length} maps + ${allSos.length} sos => ${merged.length} unique leads`);

  if (args.from || args.to) {
    merged = merged.filter((l) => !l.filingDate || inDateRange(l.filingDate, args.from, args.to));
    logger.info(`After date filter: ${merged.length} leads`);
  }

  const limit = pLimit(3);
  const audited = await Promise.all(merged.map((lead) => limit(async () => {
    const audit = await auditWebsite(lead.website).catch(() => null);
    const out = { ...lead, ...(audit || {}) };

    if (!out.website && CONFIG.enableFacebook) {
      const fb = await findFacebookPage({ businessName: lead.businessName, city: lead.city }).catch(() => null);
      if (fb) out.facebookUrl = fb;
    }

    if (CONFIG.enableYelp) {
      const yelp = await enrichWithYelp({ businessName: lead.businessName, city: lead.city }).catch(() => null);
      if (yelp) Object.assign(out, yelp);
    }

    if (!out.email && audit?.pageEmail) out.email = audit.pageEmail;
    if (!out.phone && audit?.pagePhone) out.phone = audit.pagePhone;
    return out;
  })));

  const withPhone = await classifyPhones(audited, { useTwilio: args.useTwilio });
  let scored = withPhone.map((l) => {
    const withScore = { ...l, ...scoreLead(l) };
    return { ...withScore, tier: assignTier(withScore) };
  });

  if (args.noWebsiteOnly) {
    scored = scored.filter((l) => !l.website);
    logger.info(`After noWebsiteOnly filter: ${scored.length} leads`);
  }
  if (args.requirePhone) {
    const n = scored.length;
    scored = scored.filter((l) => !!l.phone);
    logger.info(`After requirePhone filter: ${n} -> ${scored.length}`);
  }

  scored = applyTierAndScoreFilters(scored, args);
  scored.sort((a, b) => {
    if ((a.tier || 99) !== (b.tier || 99)) return (a.tier || 99) - (b.tier || 99);
    return (b.leadScore || 0) - (a.leadScore || 0);
  });

  await writeOutputs(scored, args);
  await closeBrowser();
}

async function run() {
  const args = parseArgs();
  if (args.importPath) {
    await runImport(args);
  } else {
    await runLiveScrape(args);
  }
}

run().catch(async (err) => {
  logger.error('fatal error', { error: err.message, stack: err.stack });
  await closeBrowser();
  process.exit(1);
});
