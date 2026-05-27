function key(lead) {
  const name = (lead.businessName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const city = (lead.city || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${name}|${city}`;
}

/**
 * Merge leads from multiple sources, preferring non-null values. The output
 * preserves all distinct businesses; duplicates by normalized name+city are
 * collapsed into one row with combined fields.
 */
export function mergeLeads(...lists) {
  const map = new Map();
  for (const list of lists) {
    if (!Array.isArray(list)) continue;
    for (const lead of list) {
      if (!lead || !lead.businessName) continue;
      const k = key(lead);
      const existing = map.get(k);
      if (!existing) {
        map.set(k, { ...lead, sources: [lead.source].filter(Boolean) });
        continue;
      }
      for (const [field, value] of Object.entries(lead)) {
        if (value == null || value === '') continue;
        if (existing[field] == null || existing[field] === '') {
          existing[field] = value;
        }
      }
      if (lead.source && !existing.sources.includes(lead.source)) {
        existing.sources.push(lead.source);
      }
    }
  }
  return Array.from(map.values());
}
