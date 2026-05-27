import 'dotenv/config';

export const NC_CITIES = [
  'Charlotte',
  'Raleigh',
  'Durham',
  'Greensboro',
  'Winston-Salem',
  'Asheville',
  'Wilmington',
  'Boone',
  'Chapel Hill',
  'Cary',
];

export const NICHES = [
  'landscaping',
  'roofing',
  'HVAC',
  'plumbing',
  'tree service',
  'cleaning',
  'pressure washing',
  'remodeling',
  'concrete',
  'junk removal',
  'car detailing',
  'construction',
  'painting',
  'flooring',
];

// Niches with strongest local search demand & website upsell potential
const HIGH_VALUE_NICHES = new Set([
  'roofing',
  'HVAC',
  'plumbing',
  'remodeling',
  'tree service',
  'concrete',
]);

export function nicheQualityScore(niche) {
  if (!niche) return 1;
  return HIGH_VALUE_NICHES.has(niche.toLowerCase()) ? 3 : 2;
}

function bool(v, fallback) {
  if (v === undefined) return fallback;
  return String(v).toLowerCase() === 'true';
}

function int(v, fallback) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

export const CONFIG = {
  headless: bool(process.env.HEADLESS, true),
  slowMoMs: int(process.env.SLOW_MO_MS, 0),

  defaultCity: process.env.DEFAULT_CITY || 'Charlotte',
  defaultNiche: process.env.DEFAULT_NICHE || 'landscaping',
  defaultResultsPerNiche: int(process.env.DEFAULT_RESULTS_PER_NICHE, 20),
  noWebsiteOnly: bool(process.env.NO_WEBSITE_ONLY, false),

  minDelayMs: int(process.env.MIN_DELAY_MS, 1500),
  maxDelayMs: int(process.env.MAX_DELAY_MS, 4500),
  requestsPerMinute: int(process.env.REQUESTS_PER_MINUTE, 20),

  maxRetries: int(process.env.MAX_RETRIES, 3),
  retryBaseMs: int(process.env.RETRY_BASE_MS, 2000),

  sosDaysBackMin: int(process.env.SOS_DAYS_BACK_MIN, 30),
  sosDaysBackMax: int(process.env.SOS_DAYS_BACK_MAX, 180),

  enableSos: bool(process.env.ENABLE_SOS, true),
  enableGoogleMaps: bool(process.env.ENABLE_GOOGLE_MAPS, true),
  enableFacebook: bool(process.env.ENABLE_FACEBOOK, true),
  enableYelp: bool(process.env.ENABLE_YELP, false),

  outputDir: process.env.OUTPUT_DIR || './output',
};
