import { CONFIG } from '../config/index.js';
import { sleep } from './delay.js';

// Token-bucket-ish limiter keyed per source. We keep the API simple: each
// source allows N requests per minute, and acquire() resolves when allowed.
const buckets = new Map();

export function getRateLimiter(source, perMinute = CONFIG.requestsPerMinute) {
  if (!buckets.has(source)) {
    buckets.set(source, {
      perMinute,
      windowStart: Date.now(),
      count: 0,
    });
  }
  return buckets.get(source);
}

export async function acquire(source, perMinute) {
  const b = getRateLimiter(source, perMinute);
  const now = Date.now();
  const elapsed = now - b.windowStart;

  if (elapsed >= 60_000) {
    b.windowStart = now;
    b.count = 0;
  }

  if (b.count >= b.perMinute) {
    const waitMs = 60_000 - elapsed + 50;
    await sleep(waitMs);
    b.windowStart = Date.now();
    b.count = 0;
  }

  b.count += 1;
}
