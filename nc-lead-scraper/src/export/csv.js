import fs from 'node:fs';
import path from 'node:path';
import { stringify } from 'csv-stringify/sync';

// Full export — every field we know about. Useful for archival.
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

// Outreach export — the columns you actually paste into a CRM or call sheet.
const OUTREACH_COLUMNS = [
  'businessName',
  'niche',
  'category',
  'city',
  'state',
  'phone',
  'phoneType',
  'email',
  'address',
  'googleMapsUrl',
  'googleRating',
  'reviewCount',
  'facebookUrl',
  'instagramUrl',
  'facebookOnly',
  'leadScore',
  'highValue',
  'scoreReasons',
  'notes',
];

function buildNotes(lead) {
  const bits = [];
  if (lead.facebookOnly) bits.push('Facebook only — no website');
  else if (!lead.website) bits.push('No web presence');
  else if (lead.hasSSL === false) bits.push('No SSL on website');
  else if (lead.mobileFriendly === false) bits.push('Site not mobile-friendly');
  if (lead.copyrightYear && new Date().getFullYear() - lead.copyrightYear >= 2) {
    bits.push(`Site copyright ${lead.copyrightYear}`);
  }
  if (typeof lead.reviewCount === 'number' && lead.reviewCount > 0 && lead.reviewCount < 15) {
    bits.push(`${lead.reviewCount} reviews`);
  }
  if (typeof lead.googleRating === 'number') bits.push(`${lead.googleRating}★`);
  return bits.join('; ');
}

function buildRow(lead, columns) {
  const row = {};
  for (const col of columns) {
    let v;
    if (col === 'notes') v = buildNotes(lead);
    else v = lead[col];
    if (Array.isArray(v)) v = v.join('|');
    if (v == null) v = '';
    if (typeof v === 'boolean') v = v ? 'true' : 'false';
    row[col] = v;
  }
  return row;
}

function writeCSV(leads, columns, outPath) {
  const rows = leads.map((l) => buildRow(l, columns));
  const csv = stringify(rows, { header: true, columns });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, csv, 'utf8');
  return outPath;
}

export function exportCSV(leads, outPath) {
  return writeCSV(leads, FULL_COLUMNS, outPath);
}

export function exportOutreachCSV(leads, outPath) {
  return writeCSV(leads, OUTREACH_COLUMNS, outPath);
}
