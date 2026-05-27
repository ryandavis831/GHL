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
import { scoreLead } from './src/scoring/leadScore.js';
import { exportCSV } from './src/export/csv.js';
import { exportJSON } from './src/export/json.js';
import { closeBrowser } from './src/scrapers/browser.js';

function parseArgs() {
  const argv = minimist(process.argv.slice(2), {
    string: ['city', 'niche', 'cities', 'niches', 'from', 'to', 'out'],
    boolean: ['noWebsiteOnly', 'allCities', 'allNiches', 'help'],
    default: {
      city: CONFIG.defaultCity,
      niche: CONFIG.defaultNiche,
      max: CONFIG.defaultResultsPerNiche,
      noWebsiteOnly: CONFIG.noWebsiteOnly,
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
    cities,
    niches,
    max: parseInt(argv.max, 10) || CONFIG.defaultResultsPerNiche,
    from: argv.from || null,
    to: argv.to || null,
    noWebsiteOnly: !!argv.noWebsiteOnly,
    out: argv.out || null,
  };
}

function printHelp() {
  console.log(`
NC Local Business Lead Scraper

Usage:
  node index.js [flags]

Flags:
  --city=Charlotte               Single city (default: \${DEFAULT_CITY})
  --cities=Charlotte,Raleigh     Comma-separated cities
  --allCities                    All built-in NC cities
  --niche=roofing                Single niche
  --niches=roofing,plumbing      Comma-separated niches
  --allNiches                    All built-in niches
  --max=20                       Max results per niche/city
  --from=YYYY-MM-DD              Filter SoS filings from date
  --to=YYYY-MM-DD                Filter SoS filings to date
  --noWebsiteOnly                Output only leads with no website
  --out=output/leads             Output basename (no extension)
  --help                         Show this help

Examples:
  node index.js --city=Charlotte --niche=roofing
  node index.js --allCities --niche=HVAC --max=30
  node index.js --city=Raleigh --allNiches --noWebsiteOnly
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

async function run() {
  const args = parseArgs();
  logger.info('Starting NC lead scraper', args);

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

  // Audit websites + look up Facebook for leads missing a site.
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

  let scored = audited.map((l) => ({ ...l, ...scoreLead(l) }));
  scored.sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));

  if (args.noWebsiteOnly) {
    scored = scored.filter((l) => !l.website);
    logger.info(`After noWebsiteOnly filter: ${scored.length} leads`);
  }

  const stamp = new Date().toISOString().replace(/[:T.]/g, '-').slice(0, 19);
  const base = args.out || path.join(CONFIG.outputDir, `nc-leads-${stamp}`);
  const csvPath = exportCSV(scored, `${base}.csv`);
  const jsonPath = exportJSON(scored, `${base}.json`);

  logger.success(`Wrote ${scored.length} leads`, { csv: csvPath, json: jsonPath });

  const high = scored.filter((l) => l.highValue).length;
  logger.info(`High-value leads (score >= 7): ${high}`);

  await closeBrowser();
}

run().catch(async (err) => {
  logger.error('fatal error', { error: err.message, stack: err.stack });
  await closeBrowser();
  process.exit(1);
});
