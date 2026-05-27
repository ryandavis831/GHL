import { CONFIG } from '../config/index.js';
import { sleep, jitter } from './delay.js';
import { logger } from './logger.js';

export async function retry(fn, {
  retries = CONFIG.maxRetries,
  baseMs = CONFIG.retryBaseMs,
  scope = 'retry',
} = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn(attempt);
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      const wait = jitter(baseMs * 2 ** attempt);
      logger.warn(`${scope} attempt ${attempt + 1} failed, retrying in ${Math.round(wait)}ms`, {
        error: err.message,
      });
      await sleep(wait);
    }
  }
  throw lastErr;
}
