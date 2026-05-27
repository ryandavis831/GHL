/**
 * Build an outreach-ready row from a scored lead. This is the single source of
 * truth for the polished output schema — both CSV and XLSX exporters consume
 * the rows this module emits.
 */

export const OUTREACH_HEADERS = [
  'Business Name',
  'Owner/Contact Name',
  'Phone',
  'Phone Type',
  'Email',
  'Website',
  'Facebook URL',
  'Google Maps URL',
  'Address',
  'City',
  'State',
  'Category/Niche',
  'Rating',
  'Review Count',
  'Business Status',
  'Has Website',
  'Facebook Only',
  'Lead Score',
  'Lead Quality',
  'Why This Lead',
  'Suggested Offer',
  'Tags',
  'Source',
  'Last Checked',
];

export const COLUMN_KEYS = [
  'businessName',
  'ownerName',
  'phone',
  'phoneType',
  'email',
  'website',
  'facebookUrl',
  'googleMapsUrl',
  'address',
  'city',
  'state',
  'niche',
  'rating',
  'reviewCount',
  'businessStatus',
  'hasWebsite',
  'facebookOnly',
  'leadScore',
  'leadQuality',
  'whyThisLead',
  'suggestedOffer',
  'tags',
  'source',
  'lastChecked',
];

function leadQuality(score) {
  if (score >= 8) return 'High';
  if (score >= 5) return 'Medium';
  return 'Low';
}

function whyThisLead(lead) {
  const reasons = new Set(lead.scoreReasons || []);
  const reviewCount = lead.reviewCount || 0;
  const rating = lead.googleRating || 0;
  const hasWebsite = !!lead.website;
  const strongReviews = reviewCount >= 20 && rating >= 4.0;

  // Ordered most-specific first; first match wins.
  if (lead.closed) return 'Business marked closed';
  if (!hasWebsite && reasons.has('facebook-only')) return 'Facebook-only business';
  if (!hasWebsite && strongReviews) return 'No website, strong reviews';
  if (!hasWebsite) return 'No web presence';
  if (reasons.has('no-ssl')) return 'No SSL on website';
  if (reasons.has('not-mobile-friendly')) return 'Weak mobile site';
  if (reasons.has('stale-copyright')) return 'Outdated website';
  if (reasons.has('broken-site')) return 'Website broken or slow';
  if (reasons.has('recent-llc')) return 'Recently formed LLC';
  if (strongReviews && (reasons.has('no-ssl') || reasons.has('not-mobile-friendly') || reasons.has('stale-copyright'))) {
    return 'Good reviews but poor branding';
  }
  if (reasons.has('improvable-rating')) return 'Active business, room to grow reviews';
  if (reasons.has('low-reviews')) return 'Low review count for active business';
  return 'Local service business — outreach candidate';
}

function suggestedOffer(lead) {
  const reasons = new Set(lead.scoreReasons || []);
  const hasWebsite = !!lead.website;
  const reviewCount = lead.reviewCount || 0;

  if (lead.closed) return '—';

  if (!hasWebsite && lead.facebookUrl) return 'Lead-capture website + booking funnel';
  if (!hasWebsite) return 'Website redesign + Google Business setup';

  if (reasons.has('broken-site')) return 'Website redesign';
  if (reasons.has('not-mobile-friendly') || reasons.has('no-ssl')) return 'Website redesign';
  if (reasons.has('stale-copyright')) return 'Website refresh + SEO';
  if (reasons.has('recent-llc')) return 'Website redesign + Google Business setup';
  if (reviewCount > 0 && reviewCount < 15) return 'SEO + reviews';
  if (reasons.has('improvable-rating')) return 'Google optimization';
  if (!lead.phone || lead.phoneType === 'invalid') return 'Missed-call text back';
  return 'Google optimization';
}

function ownerName(lead) {
  // Outscraper may surface this; otherwise leave blank for manual research.
  return lead.ownerName || lead.owner || lead.ownerTitle || '';
}

function buildTags(lead) {
  const tags = ['website-lead'];
  if (!lead.website) tags.push('no-website');
  if (lead.facebookOnly) tags.push('facebook-only');
  if (lead.niche && lead.niche !== 'unknown') tags.push(lead.niche.replace(/\s+/g, '-'));
  if (lead.city) tags.push(lead.city.replace(/\s+/g, '-'));
  if (lead.scoreReasons?.includes('recent-llc')) tags.push('new-business');
  if (lead.reviewCount >= 20 && lead.googleRating >= 4.0) tags.push('strong-reviews');
  return tags;
}

function sourceLabel(lead) {
  if (Array.isArray(lead.sources) && lead.sources.length) return lead.sources.join(' + ');
  return lead.source || 'unknown';
}

export function buildOutreachRow(lead) {
  const hasWebsite = !!lead.website;
  return {
    businessName: lead.businessName || '',
    ownerName: ownerName(lead),
    phone: lead.phone || '',
    phoneType: lead.phoneType || 'unknown',
    email: lead.email || '',
    website: lead.website || '',
    facebookUrl: lead.facebookUrl || '',
    googleMapsUrl: lead.googleMapsUrl || '',
    address: lead.address || '',
    city: lead.city || '',
    state: lead.state || '',
    niche: lead.niche || lead.category || '',
    rating: lead.googleRating ?? '',
    reviewCount: lead.reviewCount ?? '',
    businessStatus: lead.closed ? 'Closed' : (lead.status || 'Active'),
    hasWebsite: hasWebsite ? 'Yes' : 'No',
    facebookOnly: lead.facebookOnly ? 'Yes' : 'No',
    leadScore: lead.leadScore || 0,
    leadQuality: leadQuality(lead.leadScore || 0),
    whyThisLead: whyThisLead(lead),
    suggestedOffer: suggestedOffer(lead),
    tags: buildTags(lead).join(', '),
    source: sourceLabel(lead),
    lastChecked: new Date().toISOString().slice(0, 10),
  };
}

export function buildOutreachRows(leads) {
  const sorted = [...leads].sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));
  return sorted.map(buildOutreachRow);
}
