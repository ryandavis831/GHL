import fs from 'node:fs';
import path from 'node:path';
import ExcelJS from 'exceljs';
import { buildOutreachRows, OUTREACH_HEADERS, COLUMN_KEYS } from './outreach.js';

// Column position 1-based for the requested header order.
function colLetter(index1) {
  let n = index1;
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

// Indices for columns we style specially. 1-based to match exceljs.
const COL = OUTREACH_HEADERS.reduce((acc, h, i) => {
  acc[h] = i + 1;
  return acc;
}, {});

// Pre-computed widths tuned for outreach use; long-text columns are wider.
const COLUMN_WIDTHS = {
  'Business Name': 32,
  'Owner/Contact Name': 22,
  'Phone': 16,
  'Phone Type': 10,
  'Email': 30,
  'Website': 32,
  'Facebook URL': 32,
  'Google Maps URL': 36,
  'Address': 40,
  'City': 14,
  'State': 6,
  'Category/Niche': 20,
  'Rating': 8,
  'Review Count': 10,
  'Business Status': 12,
  'Has Website': 11,
  'Facebook Only': 13,
  'Lead Score': 11,
  'Lead Quality': 12,
  'Why This Lead': 40,
  'Suggested Offer': 36,
  'Tags': 40,
  'Source': 16,
  'Last Checked': 12,
};

const HYPERLINK_COLS = ['Website', 'Facebook URL', 'Google Maps URL'];

const STYLE = {
  header: {
    font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3A5F' } },
    alignment: { vertical: 'middle', horizontal: 'left', wrapText: false },
    border: {
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
    },
  },
  base: {
    font: { size: 10 },
    alignment: { vertical: 'top', wrapText: true },
  },
  link: {
    font: { size: 10, color: { argb: 'FF1155CC' }, underline: true },
  },
  weakBranding: {
    // Light amber tint for cells we want the user to notice.
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF2CC' } },
  },
  noWebsite: {
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFCE4D6' } },
    font: { size: 10, bold: true, color: { argb: 'FF833C0B' } },
  },
  facebookOnly: {
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEEBF7' } },
    font: { size: 10, bold: true, color: { argb: 'FF1F4E79' } },
  },
};

function maybeUrl(value) {
  if (!value) return null;
  const s = String(value).trim();
  if (!/^https?:\/\//i.test(s)) {
    if (s.includes('.') && !s.includes(' ')) return `https://${s}`;
    return null;
  }
  return s;
}

export async function exportOutreachXLSX(leads, outPath) {
  const rows = buildOutreachRows(leads);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'nc-lead-scraper';
  workbook.created = new Date();
  const ws = workbook.addWorksheet('Outreach Leads', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  // Header.
  ws.columns = OUTREACH_HEADERS.map((h) => ({
    header: h,
    key: h,
    width: COLUMN_WIDTHS[h] || 18,
  }));
  const headerRow = ws.getRow(1);
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.font = STYLE.header.font;
    cell.fill = STYLE.header.fill;
    cell.alignment = STYLE.header.alignment;
    cell.border = STYLE.header.border;
  });

  // Data rows.
  rows.forEach((r, i) => {
    const excelRow = ws.addRow(OUTREACH_HEADERS.map((h, j) => r[COLUMN_KEYS[j]]));
    excelRow.alignment = STYLE.base.alignment;
    excelRow.font = STYLE.base.font;

    // Hyperlinks for URL columns and email.
    for (const colName of HYPERLINK_COLS) {
      const url = maybeUrl(r[COLUMN_KEYS[OUTREACH_HEADERS.indexOf(colName)]]);
      if (!url) continue;
      const cell = excelRow.getCell(COL[colName]);
      cell.value = { text: url, hyperlink: url };
      cell.font = STYLE.link.font;
    }
    if (r.email) {
      const cell = excelRow.getCell(COL['Email']);
      cell.value = { text: r.email, hyperlink: `mailto:${r.email}` };
      cell.font = STYLE.link.font;
    }

    // Cell-level highlights: no-website, facebook-only, weak branding.
    if (r.hasWebsite === 'No') {
      const cell = excelRow.getCell(COL['Has Website']);
      cell.fill = STYLE.noWebsite.fill;
      cell.font = STYLE.noWebsite.font;
    }
    if (r.facebookOnly === 'Yes') {
      const cell = excelRow.getCell(COL['Facebook Only']);
      cell.fill = STYLE.facebookOnly.fill;
      cell.font = STYLE.facebookOnly.font;
    }
    // "High review count with weak branding" — flag the Rating cell.
    const weakBranding =
      (Number(r.reviewCount) >= 20 && Number(r.rating) >= 4.0) &&
      (r.hasWebsite === 'No' || /Weak mobile|No SSL|Outdated|poor branding/i.test(r.whyThisLead));
    if (weakBranding) {
      excelRow.getCell(COL['Rating']).fill = STYLE.weakBranding.fill;
      excelRow.getCell(COL['Review Count']).fill = STYLE.weakBranding.fill;
    }
  });

  // Auto-filter across the whole table.
  const lastCol = colLetter(OUTREACH_HEADERS.length);
  const lastRow = rows.length + 1;
  ws.autoFilter = { from: 'A1', to: `${lastCol}${lastRow}` };

  // Conditional formatting on Lead Score column (1-10 scale).
  const scoreCol = colLetter(COL['Lead Score']);
  const scoreRange = `${scoreCol}2:${scoreCol}${lastRow}`;
  ws.addConditionalFormatting({
    ref: scoreRange,
    rules: [
      {
        type: 'cellIs',
        operator: 'between',
        priority: 1,
        formulae: [8, 10],
        style: {
          fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFC6EFCE' } },
          font: { color: { argb: 'FF006100' }, bold: true },
        },
      },
      {
        type: 'cellIs',
        operator: 'between',
        priority: 2,
        formulae: [5, 7],
        style: {
          fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFEB9C' } },
          font: { color: { argb: 'FF9C5700' }, bold: true },
        },
      },
      {
        type: 'cellIs',
        operator: 'between',
        priority: 3,
        formulae: [1, 4],
        style: {
          fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: 'FFFFC7CE' } },
          font: { color: { argb: 'FF9C0006' }, bold: true },
        },
      },
    ],
  });

  // Light row-banding for readability.
  for (let r = 2; r <= lastRow; r += 1) {
    if (r % 2 === 0) {
      ws.getRow(r).eachCell({ includeEmpty: true }, (cell) => {
        if (!cell.fill || cell.fill.type !== 'pattern') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7F9FC' } };
        }
      });
    }
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await workbook.xlsx.writeFile(outPath);
  return outPath;
}
