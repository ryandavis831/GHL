import { newContext } from './browser.js';
import { acquire } from '../utils/rateLimiter.js';
import { randomDelay } from '../utils/delay.js';
import { retry } from '../utils/retry.js';
import { createLogger } from '../utils/logger.js';
import { CONFIG, NICHES } from '../config/index.js';
import { safeText } from '../utils/text.js';

const log = createLogger('nc-sos');

const SOURCE = 'nc-sos';
const SEARCH_URL = 'https://www.sosnc.gov/online_services/search/by_title/_Business_Registration';

// Niche keywords used to filter SoS results by name. NC SoS does not let you
// filter by SIC/NAICS via the public search, so we do client-side filtering.
const NICHE_KEYWORDS = {
  landscaping: ['landscap', 'lawn', 'yard'],
  roofing: ['roof'],
  HVAC: ['hvac', 'heating', 'cooling', 'air condition'],
  plumbing: ['plumb'],
  'tree service': ['tree'],
  cleaning: ['clean', 'janitor', 'maid'],
  'pressure washing': ['pressure wash', 'power wash', 'soft wash'],
  remodeling: ['remodel', 'renovation'],
  concrete: ['concrete', 'masonry'],
  'junk removal': ['junk', 'haul'],
  'car detailing': ['detail', 'auto spa'],
  construction: ['construction', 'builder', 'contractor'],
  painting: ['paint'],
  flooring: ['floor'],
};

function matchesNiche(name, niches) {
  const lower = name.toLowerCase();
  return niches.some((n) => (NICHE_KEYWORDS[n] || [n.toLowerCase()]).some((kw) => lower.includes(kw)));
}

function withinDateRange(dateStr, minDaysBack, maxDaysBack) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return false;
  const now = Date.now();
  const ageDays = (now - d.getTime()) / 86_400_000;
  return ageDays >= minDaysBack && ageDays <= maxDaysBack;
}

/**
 * NC SoS public search is rendered via ASP.NET postbacks and changes layout
 * occasionally. We submit a broad query, parse the rendered table, then
 * filter client-side by niche keywords and creation date.
 *
 * This is best-effort: if the public site layout changes, this scraper will
 * gracefully return [] rather than throw.
 */
export async function scrapeNCSecretaryOfState({ city, niches, max = 50 }) {
  return retry(async () => {
    await acquire(SOURCE, 10);
    const context = await newContext();
    const page = await context.newPage();
    try {
      log.info(`Searching NC SoS for ${niches.join(', ')} in ${city}`);
      await page.goto(SEARCH_URL, { waitUntil: 'domcontentloaded', timeout: 45_000 });

      // The current NC SoS search UI uses an input named "txtSearch" or similar.
      // Layout can shift; we try a few common selectors.
      const inputSelectors = [
        'input[name*="Search"]',
        'input[type="search"]',
        'input[name*="txtCorpName" i]',
        '#txtSearch',
      ];
      let input = null;
      for (const sel of inputSelectors) {
        const cand = page.locator(sel).first();
        if (await cand.count().catch(() => 0)) {
          input = cand;
          break;
        }
      }
      if (!input) {
        log.warn('NC SoS search input not found — page layout may have changed');
        return [];
      }

      // Pick the broadest keyword for the first niche to seed the search.
      const seed = (NICHE_KEYWORDS[niches[0]] || [niches[0]])[0];
      await input.fill(seed);
      await page.keyboard.press('Enter');
      await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
      await randomDelay();

      const rows = await page.evaluate(() => {
        const out = [];
        const tableRows = document.querySelectorAll('table tr');
        for (const tr of tableRows) {
          const cells = Array.from(tr.querySelectorAll('td')).map((c) => c.innerText.trim());
          if (cells.length < 2) continue;
          out.push(cells);
        }
        return out;
      });

      const results = [];
      for (const cells of rows) {
        const name = cells.find((c) => /llc|inc|company|corp|services|solutions/i.test(c)) || cells[0];
        if (!name || !matchesNiche(name, niches)) continue;

        const dateCell = cells.find((c) => /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/.test(c));
        const entityCell = cells.find((c) => /llc|inc|corp|l\.?l\.?c\.?/i.test(c)) || '';

        if (!withinDateRange(dateCell, CONFIG.sosDaysBackMin, CONFIG.sosDaysBackMax)) continue;

        results.push({
          businessName: safeText(name),
          entityType: safeText(entityCell.match(/(LLC|INC|CORP|L\.L\.C\.)/i)?.[0] || 'LLC'),
          filingDate: dateCell || null,
          city,
          state: 'NC',
          niche: niches[0],
          source: 'nc-sos',
        });
        if (results.length >= max) break;
      }

      log.success(`NC SoS yielded ${results.length} candidate rows`);
      return results;
    } catch (err) {
      log.warn(`NC SoS scrape failed softly: ${err.message}`);
      return [];
    } finally {
      await context.close();
    }
  }, { scope: `sos:${city}` });
}

export { NICHES };
