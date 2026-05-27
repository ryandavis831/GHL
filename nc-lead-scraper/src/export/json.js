import fs from 'node:fs';
import path from 'node:path';

export function exportJSON(leads, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(leads, null, 2), 'utf8');
  return outPath;
}
