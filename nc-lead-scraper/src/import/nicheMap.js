/**
 * Map a Google Maps category string back to one of our defined niches.
 * Outscraper rows expose values like "Roofing contractor", "Plumber",
 * "Landscaper", sometimes pipe-delimited.
 */
const RULES = [
  [/roof/i, 'roofing'],
  [/plumb/i, 'plumbing'],
  [/hvac|heating|cooling|air condition|furnace/i, 'HVAC'],
  [/tree (service|surgeon|trimm|removal)|arborist/i, 'tree service'],
  [/landscap|lawn|yard work|garden/i, 'landscaping'],
  [/pressure wash|power wash|soft wash/i, 'pressure washing'],
  [/cleaning|janitor|maid|housekeep/i, 'cleaning'],
  [/junk removal|hauling|junk haul/i, 'junk removal'],
  [/car detail|auto detail|car wash/i, 'car detailing'],
  [/concrete|masonry|paver|driveway/i, 'concrete'],
  [/floor/i, 'flooring'],
  [/painter|painting/i, 'painting'],
  [/remodel|renovation|home improvement|kitchen|bath remodel/i, 'remodeling'],
  [/construction|general contractor|builder/i, 'construction'],
];

export function inferNiche(category, name = '') {
  const haystack = `${category || ''} ${name || ''}`;
  for (const [re, niche] of RULES) {
    if (re.test(haystack)) return niche;
  }
  return category ? category.split('|')[0].trim().toLowerCase() : 'unknown';
}
