import fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { createLogger } from '../utils/logger.js';
import { safeText, normalizePhone, extractEmail, extractDomain } from '../utils/text.js';
import { inferNiche } from './nicheMap.js';

const log = createLogger('outscraper');

/**
 * Resolve a value from a row trying multiple possible column names. Outscraper
 * has changed column names across versions and across its different scrapers
 * (places/maps/serp), so we try the most common variants.
 */
function pick(row, ...keys) {
  for (const key of keys) {
    if (row[key] != null && String(row[key]).trim() !== '') return String(row[key]).trim();
    const lower = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase());
    if (lower && row[lower] != null && String(row[lower]).trim() !== '') {
      return String(row[lower]).trim();
    }
  }
  return null;
}

function collect(row, ...keys) {
  const out = [];
  for (const k of keys) {
    const v = pick(row, k);
    if (v) out.push(v);
  }
  return out;
}

const CLOSED_STATUSES = new Set([
  'CLOSED_PERMANENTLY',
  'CLOSED_TEMPORARILY',
  'PERMANENTLY_CLOSED',
  'TEMPORARILY_CLOSED',
]);

function isClosed(row) {
  const status = (pick(row, 'business_status', 'status') || '').toUpperCase();
  if (CLOSED_STATUSES.has(status)) return true;
  const perm = (pick(row, 'permanently_closed', 'closed') || '').toLowerCase();
  if (perm === 'true' || perm === 'yes' || perm === '1') return true;
  return false;
}

/**
 * Map a single Outscraper row into our internal lead shape. Returns `null` for
 * rows that are obviously not a business (missing name, etc.).
 */
export function normalizeOutscraperRow(row) {
  const name = pick(row, 'name', 'business_name', 'title', 'query');
  if (!name) return null;

  const website = pick(row, 'site', 'website', 'url', 'domain');
  const status = pick(row, 'business_status', 'status') || (isClosed(row) ? 'CLOSED' : 'OPERATIONAL');

  const phones = collect(row, 'phone', 'phone_1', 'phone_2', 'phone_3').map(normalizePhone).filter(Boolean);
  const primaryPhone = phones[0] || null;
  const additionalPhones = phones.slice(1);

  const emails = collect(row, 'email_1', 'email_2', 'email_3', 'email')
    .map((e) => extractEmail(e) || e.toLowerCase())
    .filter(Boolean);
  const primaryEmail = emails[0] || null;

  const category = pick(row, 'category', 'type', 'subtypes', 'main_category');
  const niche = inferNiche(category, name);

  const fullAddress = pick(row, 'full_address', 'address');
  const street = pick(row, 'street');
  const city = pick(row, 'city', 'borough') || '';
  const state = pick(row, 'us_state', 'state') || 'NC';
  const postal = pick(row, 'postal_code', 'zip');

  return {
    businessName: safeText(name),
    entityType: null,
    filingDate: null,
    niche,
    category: safeText(category),
    city: safeText(city),
    state: safeText(state),
    address: safeText(fullAddress || [street, city, state, postal].filter(Boolean).join(', ')),
    postalCode: postal,
    phone: primaryPhone,
    additionalPhones,
    email: primaryEmail,
    additionalEmails: emails.slice(1),
    website: website || null,
    websiteDomain: extractDomain(website),
    googleMapsUrl: pick(row, 'location_link', 'place_link', 'maps_url', 'url'),
    placeId: pick(row, 'place_id', 'google_id', 'cid'),
    googleRating: parseFloat(pick(row, 'rating', 'google_rating')) || null,
    reviewCount: parseInt(pick(row, 'reviews', 'review_count', 'reviews_count'), 10) || null,
    facebookUrl: pick(row, 'facebook', 'facebook_url'),
    instagramUrl: pick(row, 'instagram', 'instagram_url'),
    twitterUrl: pick(row, 'twitter', 'twitter_url'),
    linkedinUrl: pick(row, 'linkedin', 'linkedin_url'),
    youtubeUrl: pick(row, 'youtube', 'youtube_url'),
    verified: (pick(row, 'verified') || '').toLowerCase() === 'true',
    status,
    closed: isClosed(row),
    source: 'outscraper',
    sources: ['outscraper'],
    raw: undefined,
  };
}

export function loadOutscraperCSV(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const rows = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
    bom: true,
  });
  log.info(`Loaded ${rows.length} rows from ${filePath}`);
  return rows;
}

function dedupKey(lead) {
  if (lead.placeId) return `place:${lead.placeId}`;
  if (lead.phone) return `phone:${lead.phone.replace(/\D/g, '')}`;
  const n = (lead.businessName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const a = (lead.address || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 32);
  return `name:${n}|${a}`;
}

export function dedupe(leads) {
  const seen = new Map();
  for (const lead of leads) {
    const k = dedupKey(lead);
    const existing = seen.get(k);
    if (!existing) {
      seen.set(k, lead);
      continue;
    }
    // Merge: prefer non-empty values from the new row; combine arrays.
    for (const [field, value] of Object.entries(lead)) {
      if (value == null || value === '') continue;
      if (Array.isArray(value)) {
        const merged = new Set([...(existing[field] || []), ...value]);
        existing[field] = Array.from(merged);
      } else if (existing[field] == null || existing[field] === '') {
        existing[field] = value;
      }
    }
  }
  return Array.from(seen.values());
}

/**
 * Apply Outscraper-specific filters. Each filter is independently toggleable.
 */
export function applyFilters(leads, {
  removeClosed = true,
  removeWithWebsite = false,
  requirePhone = false,
  requireCity = false,
} = {}) {
  let out = leads;
  const before = out.length;

  if (removeClosed) {
    out = out.filter((l) => !l.closed);
    log.info(`Filter "removeClosed": ${before} -> ${out.length}`);
  }
  if (removeWithWebsite) {
    const n = out.length;
    out = out.filter((l) => !l.website);
    log.info(`Filter "removeWithWebsite": ${n} -> ${out.length}`);
  }
  if (requirePhone) {
    const n = out.length;
    out = out.filter((l) => !!l.phone);
    log.info(`Filter "requirePhone": ${n} -> ${out.length}`);
  }
  if (requireCity) {
    const n = out.length;
    out = out.filter((l) => !!l.city);
    log.info(`Filter "requireCity": ${n} -> ${out.length}`);
  }
  return out;
}

export function processOutscraperCSV(filePath, filterOpts = {}) {
  const rows = loadOutscraperCSV(filePath);
  const normalized = rows.map(normalizeOutscraperRow).filter(Boolean);
  log.info(`Normalized ${normalized.length} business rows`);
  const filtered = applyFilters(normalized, filterOpts);
  const deduped = dedupe(filtered);
  log.success(`After dedupe: ${deduped.length} unique leads`);
  return deduped;
}
