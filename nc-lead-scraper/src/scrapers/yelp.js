import { newContext } from './browser.js';
import { acquire } from '../utils/rateLimiter.js';
import { randomDelay } from '../utils/delay.js';
import { retry } from '../utils/retry.js';
import { createLogger } from '../utils/logger.js';
import { safeText, normalizePhone } from '../utils/text.js';

const log = createLogger('yelp');
const SOURCE = 'yelp';

export async function enrichWithYelp({ businessName, city }) {
  return retry(async () => {
    await acquire(SOURCE, 10);
    const context = await newContext();
    const page = await context.newPage();
    try {
      const q = encodeURIComponent(businessName);
      const loc = encodeURIComponent(`${city}, NC`);
      const url = `https://www.yelp.com/search?find_desc=${q}&find_loc=${loc}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      await page.waitForTimeout(1500);

      const data = await page.evaluate(() => {
        const first = document.querySelector('[data-testid="serp-ia-card"], li.css-1qn0b6x');
        if (!first) return null;
        const text = first.innerText || '';
        const ratingMatch = text.match(/(\d\.\d)\s+star/);
        const reviewsMatch = text.match(/(\d[\d,]*)\s+review/);
        const phoneMatch = text.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
        const link = first.querySelector('a[href*="/biz/"]');
        return {
          rating: ratingMatch ? parseFloat(ratingMatch[1]) : null,
          reviews: reviewsMatch ? parseInt(reviewsMatch[1].replace(/,/g, ''), 10) : null,
          phone: phoneMatch ? phoneMatch[0] : null,
          yelpUrl: link ? new URL(link.getAttribute('href'), location.origin).href : null,
        };
      });

      await randomDelay();
      if (data) {
        return {
          yelpRating: data.rating,
          yelpReviews: data.reviews,
          yelpUrl: data.yelpUrl,
          phone: data.phone ? normalizePhone(data.phone) : null,
        };
      }
      return null;
    } catch (err) {
      log.warn(`yelp enrich failed for ${businessName}: ${err.message}`);
      return null;
    } finally {
      await context.close();
    }
  }, { scope: `yelp:${businessName}`, retries: 1 });
}
