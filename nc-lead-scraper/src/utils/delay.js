import { CONFIG } from '../config/index.js';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomDelay(min = CONFIG.minDelayMs, max = CONFIG.maxDelayMs) {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const ms = Math.floor(lo + Math.random() * (hi - lo));
  return sleep(ms);
}

export function jitter(ms, ratio = 0.3) {
  const delta = ms * ratio;
  return ms + (Math.random() * 2 - 1) * delta;
}
