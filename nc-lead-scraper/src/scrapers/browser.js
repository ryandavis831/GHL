import { chromium } from 'playwright';
import { CONFIG } from '../config/index.js';
import { randomUserAgent } from '../utils/userAgents.js';

let _browser = null;

export async function getBrowser() {
  if (_browser) return _browser;
  _browser = await chromium.launch({
    headless: CONFIG.headless,
    slowMo: CONFIG.slowMoMs,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  return _browser;
}

export async function newContext(overrides = {}) {
  const browser = await getBrowser();
  const context = await browser.newContext({
    userAgent: randomUserAgent(),
    viewport: { width: 1366, height: 820 },
    locale: 'en-US',
    timezoneId: 'America/New_York',
    ...overrides,
  });
  // Light fingerprint hardening — remove obvious automation tells.
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });
  return context;
}

export async function closeBrowser() {
  if (_browser) {
    await _browser.close();
    _browser = null;
  }
}
