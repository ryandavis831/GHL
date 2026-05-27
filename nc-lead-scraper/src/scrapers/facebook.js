import { newContext } from './browser.js';
import { acquire } from '../utils/rateLimiter.js';
import { randomDelay } from '../utils/delay.js';
import { retry } from '../utils/retry.js';
import { createLogger } from '../utils/logger.js';

const log = createLogger('facebook');
const SOURCE = 'facebook';

/**
 * Facebook page discovery via Google "site:facebook.com" search. We deliberately
 * avoid logging into Facebook — that violates ToS and triggers detection. A
 * lightweight Google query is enough for MVP enrichment.
 */
export async function findFacebookPage({ businessName, city }) {
  return retry(async () => {
    await acquire(SOURCE, 15);
    const context = await newContext();
    const page = await context.newPage();
    try {
      const q = encodeURIComponent(`site:facebook.com "${businessName}" ${city} NC`);
      const url = `https://www.google.com/search?q=${q}`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });

      // Google consent page handler.
      const consent = page.locator('button:has-text("Accept all"), button:has-text("I agree")').first();
      if (await consent.count().catch(() => 0)) {
        await consent.click().catch(() => {});
        await page.waitForTimeout(500);
      }

      const fbUrl = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        for (const a of links) {
          const href = a.href || '';
          if (/^https?:\/\/(www\.)?facebook\.com\/[^/?#]+/.test(href) && !href.includes('/policies') && !href.includes('/login')) {
            return href.split('?')[0];
          }
        }
        return null;
      });

      await randomDelay();
      if (fbUrl) log.debug(`FB page for ${businessName}: ${fbUrl}`);
      return fbUrl;
    } catch (err) {
      log.warn(`facebook lookup failed for ${businessName}: ${err.message}`);
      return null;
    } finally {
      await context.close();
    }
  }, { scope: `fb:${businessName}`, retries: 1 });
}
