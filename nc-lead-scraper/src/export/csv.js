import fs from 'node:fs';
import path from 'node:path';
import { stringify } from 'csv-stringify/sync';

const COLUMNS = [
  'businessName',
  'entityType',
  'filingDate',
  'niche',
  'city',
  'state',
  'phone',
  'email',
  'address',
  'website',
  'hasSSL',
  'mobileFriendly',
  'copyrightYear',
  'googleMapsUrl',
  'googleRating',
  'reviewCount',
  'facebookUrl',
  'yelpUrl',
  'yelpRating',
  'yelpReviews',
  'leadScore',
  'highValue',
  'scoreReasons',
  'sources',
];

export function exportCSV(leads, outPath) {
  const rows = leads.map((l) => {
    const row = {};
    for (const col of COLUMNS) {
      let v = l[col];
      if (Array.isArray(v)) v = v.join('|');
      if (v == null) v = '';
      row[col] = v;
    }
    return row;
  });
  const csv = stringify(rows, { header: true, columns: COLUMNS });
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, csv, 'utf8');
  return outPath;
}
