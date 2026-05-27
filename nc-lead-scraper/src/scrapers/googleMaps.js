import { newContext } from './browser.js';
import { acquire } from '../utils/rateLimiter.js';
import { randomDelay } from '../utils/delay.js';
import { retry } from '../utils/retry.js';
import { createLogger } from '../utils/logger.js';
import { safeText, normalizePhone } from '../utils/text.js';

const log = createLogger('google-maps');

const SOURCE = 'google-maps';

function buildSearchUrl(niche, city) {
  const q = encodeURIComponent(`${niche} in ${city}, NC`);
  return `https://www.google.com/maps/search/${q}/`;
}

async function dismissConsent(page) {
  const candidates = [
    'button:has-text("Accept all")',
    'button:has-text("I agree")',
    'button:has-text("Reject all")',
    'form[action*="consent"] button',
  ];
  for (const sel of candidates) {
    const btn = page.locator(sel).first();
    if (await btn.count().catch(() => 0)) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(800);
      break;
    }
  }
}

async function scrollResults(page, maxResults) {
  const feedSel = 'div[role="feed"]';
  const feed = page.locator(feedSel);
  if (!(await feed.count().catch(() => 0))) return;

  let lastCount = 0;
  let stable = 0;
  for (let i = 0; i < 25; i += 1) {
    const cards = await page.locator(`${feedSel} a[href*="/maps/place/"]`).count();
    if (cards >= maxResults) break;
    if (cards === lastCount) {
      stable += 1;
      if (stable >= 3) break;
    } else {
      stable = 0;
    }
    lastCount = cards;
    await feed.evaluate((el) => el.scrollBy(0, el.scrollHeight));
    await page.waitForTimeout(900 + Math.random() * 600);
  }
}

async function extractCards(page, max) {
  return page.evaluate((max) => {
    const out = [];
    const cards = document.querySelectorAll('div[role="feed"] > div > div[jsaction]');
    for (const card of cards) {
      const link = card.querySelector('a[href*="/maps/place/"]');
      if (!link) continue;

      const nameEl = card.querySelector('a[href*="/maps/place/"] [aria-label], .qBF1Pd, .fontHeadlineSmall');
      const name = (link.getAttribute('aria-label') || (nameEl && nameEl.textContent) || '').trim();

      // Aggregate text blob for fuzzy field extraction.
      const text = card.innerText || '';

      const ratingMatch = text.match(/(\d\.\d)\s*(?:\(([\d,]+)\))?/);
      const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
      const reviewCount = ratingMatch && ratingMatch[2]
        ? parseInt(ratingMatch[2].replace(/,/g, ''), 10)
        : null;

      // Website link in the card (if any).
      const websiteEl = card.querySelector('a[data-value="Website"], a[aria-label^="Website"], a[href^="http"]:not([href*="google."])');
      const website = websiteEl ? websiteEl.href : null;

      // Phone — Google often surfaces it directly in card text.
      const phoneMatch = text.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
      const phone = phoneMatch ? phoneMatch[0] : null;

      // Address heuristic: line that contains a number and a comma.
      const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
      const addressLine = lines.find((l) => /\d/.test(l) && /,/.test(l) && !/\d\.\d/.test(l));

      out.push({
        name,
        mapsUrl: link.href,
        rating,
        reviewCount,
        website,
        phone,
        address: addressLine || null,
        rawText: text,
      });

      if (out.length >= max) break;
    }
    return out;
  }, max);
}

export async function scrapeGoogleMaps({ niche, city, max = 20 }) {
  return retry(async () => {
    await acquire(SOURCE, 20);
    const context = await newContext();
    const page = await context.newPage();
    try {
      const url = buildSearchUrl(niche, city);
      log.info(`Searching: ${niche} in ${city}`, { url });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
      await dismissConsent(page);
      await page.waitForSelector('div[role="feed"]', { timeout: 20_000 }).catch(() => {});
      await scrollResults(page, max);
      const raw = await extractCards(page, max);
      const results = raw
        .filter((r) => r.name)
        .map((r) => ({
          businessName: safeText(r.name),
          phone: normalizePhone(r.phone),
          address: safeText(r.address),
          website: r.website || null,
          googleMapsUrl: r.mapsUrl,
          googleRating: r.rating,
          reviewCount: r.reviewCount,
          city,
          state: 'NC',
          niche,
          source: 'google-maps',
        }));
      log.success(`Found ${results.length} results for ${niche} / ${city}`);
      await randomDelay();
      return results;
    } finally {
      await context.close();
    }
  }, { scope: `gmaps:${niche}/${city}` });
}
