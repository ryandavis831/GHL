import fs from 'node:fs';
import path from 'node:path';
import { stringify } from 'csv-stringify/sync';
import { buildOutreachRows, OUTREACH_HEADERS, COLUMN_KEYS } from './outreach.js';

// Full archival columns — useful when you want every field we know about.
const FULL_COLUMNS = [
  'businessName',
  'entityType',
  'filingDate',
  'niche',
  'category',
  'city',
  'state',
  'address',
  'postalCode',
  'phone',
  'phoneType',
  'phoneCarrier',
  'additionalPhones',
  'email',
  'additionalEmails',
  'website',
  'websiteDomain',
  'hasSSL',
  'mobileFriendly',
  'copyrightYear',
  'googleMapsUrl',
  'placeId',
  'googleRating',
  'reviewCount',
  'facebookUrl',
  'instagramUrl',
  'twitterUrl',
  'linkedinUrl',
  'youtubeUrl',
  'yelpUrl',
  'yelpRating',
  'yelpReviews',
  'verified',
  'status',
  'closed',
  'facebookOnly',
  'leadScore',
  'highValue',
  'scoreReasons',
  'sources',
];

function buildFullRow(lead) {
  const row = {};
  for (const col of FULL_COLUMNS) {
    let v = lead[col];
    if (Array.isArray(v)) v = v.join('|');
    if (v == null) v = '';
    if (typeof v === 'boolean') v = v ? 'true' : 'false';
    row[col] = v;
  }
  return row;
}

export function exportCSV(leads, outPath) {
  const rows = leads.map(buildFullRow);
  const csv = stringify(rows, { header: true, columns: FULL_COLUMNS, bom: true });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, csv, 'utf8');
  return outPath;
}

/**
 * Outreach CSV — exact column order, polished labels, sorted by score desc,
 * UTF-8 with BOM (so Excel opens it without mojibake).
 */
export function exportOutreachCSV(leads, outPath) {
  const rows = buildOutreachRows(leads);
  // Map internal keys → display headers in the requested order.
  const displayRows = rows.map((r) => {
    const out = {};
    for (let i = 0; i < OUTREACH_HEADERS.length; i += 1) {
      out[OUTREACH_HEADERS[i]] = r[COLUMN_KEYS[i]];
    }
    return out;
  });
  const csv = stringify(displayRows, { header: true, columns: OUTREACH_HEADERS, bom: true });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, csv, 'utf8');
  return outPath;
}
