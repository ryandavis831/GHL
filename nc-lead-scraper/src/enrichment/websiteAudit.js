import { newContext } from '../scrapers/browser.js';
import { createLogger } from '../utils/logger.js';
import { extractDomain, extractEmail, normalizePhone } from '../utils/text.js';

const log = createLogger('audit');

/**
 * Light audit of a lead's website. We only care about signals that drive lead
 * scoring: SSL, mobile viewport tag, copyright year, and surface-level contact
 * info (email/phone) we can scrape from a single page load.
 */
export async function auditWebsite(url) {
  if (!url) {
    return {
      hasWebsite: false,
      hasSSL: false,
      mobileFriendly: false,
      copyrightYear: null,
      pageEmail: null,
      pagePhone: null,
      weakSignals: ['no-website'],
    };
  }

  const context = await newContext();
  const page = await context.newPage();
  const weakSignals = [];
  try {
    const target = url.startsWith('http') ? url : `http://${url}`;
    const response = await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 20_000 }).catch(() => null);

    const finalUrl = page.url();
    const hasSSL = finalUrl.startsWith('https://');
    if (!hasSSL) weakSignals.push('no-ssl');

    if (!response || !response.ok()) {
      weakSignals.push('broken-or-slow');
      return {
        hasWebsite: true,
        hasSSL,
        mobileFriendly: false,
        copyrightYear: null,
        pageEmail: null,
        pagePhone: null,
        weakSignals,
      };
    }

    const info = await page.evaluate(() => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const text = document.body ? document.body.innerText : '';
      const yearMatch = text.match(/(?:©|copyright)\s*(\d{4})/i);
      return {
        hasViewport: !!viewport,
        viewportContent: viewport ? viewport.getAttribute('content') : '',
        bodyText: text.slice(0, 4000),
        year: yearMatch ? parseInt(yearMatch[1], 10) : null,
      };
    });

    const mobileFriendly = info.hasViewport && /width\s*=\s*device-width/.test(info.viewportContent || '');
    if (!mobileFriendly) weakSignals.push('no-mobile-viewport');

    const currentYear = new Date().getFullYear();
    if (info.year && currentYear - info.year >= 2) weakSignals.push('stale-copyright');

    const pageEmail = extractEmail(info.bodyText);
    const phoneMatch = info.bodyText.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
    const pagePhone = phoneMatch ? normalizePhone(phoneMatch[0]) : null;

    return {
      hasWebsite: true,
      hasSSL,
      mobileFriendly,
      copyrightYear: info.year,
      pageEmail,
      pagePhone,
      weakSignals,
      domain: extractDomain(finalUrl),
    };
  } catch (err) {
    log.debug(`audit failed for ${url}: ${err.message}`);
    return {
      hasWebsite: true,
      hasSSL: false,
      mobileFriendly: false,
      copyrightYear: null,
      pageEmail: null,
      pagePhone: null,
      weakSignals: ['audit-failed'],
    };
  } finally {
    await context.close();
  }
}
