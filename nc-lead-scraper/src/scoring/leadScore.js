import { nicheQualityScore } from '../config/index.js';

/**
 * Lead scoring on a 1–10 scale. The score is the sum of weighted signals,
 * clamped to [1, 10]. Higher = more attractive for website/SEO outreach.
 *
 * Weights:
 *   No website .......... +4
 *   Facebook-only ....... +3
 *   No SSL .............. +2
 *   Not mobile-friendly . +1
 *   Stale copyright ..... +1
 *   Low reviews (<15) ... +1
 *   Niche quality ....... +1..3
 *   Recent LLC (<180d) .. +1
 *   Rating 3.5–4.5 ...... +1   (active but improvable)
 *   Audit broken ........ +1
 */
export function scoreLead(lead) {
  let score = 0;
  const reasons = [];

  // Closed businesses are never worth scoring — return floor.
  if (lead.closed) {
    return { leadScore: 1, highValue: false, scoreReasons: ['closed'], facebookOnly: false };
  }

  const hasWebsite = !!lead.website;
  const fbOnly = !hasWebsite && !!lead.facebookUrl;

  if (!hasWebsite) {
    score += 4;
    reasons.push('no-website');
  }
  if (fbOnly) {
    score += 3;
    reasons.push('facebook-only');
  }
  if (lead.hasWebsite && lead.hasSSL === false) {
    score += 2;
    reasons.push('no-ssl');
  }
  if (lead.hasWebsite && lead.mobileFriendly === false) {
    score += 1;
    reasons.push('not-mobile-friendly');
  }
  if (lead.copyrightYear && new Date().getFullYear() - lead.copyrightYear >= 2) {
    score += 1;
    reasons.push('stale-copyright');
  }
  if (typeof lead.reviewCount === 'number' && lead.reviewCount > 0 && lead.reviewCount < 15) {
    score += 1;
    reasons.push('low-reviews');
  }
  if (typeof lead.googleRating === 'number' && lead.googleRating >= 3.5 && lead.googleRating <= 4.5) {
    score += 1;
    reasons.push('improvable-rating');
  }

  // Recent LLC filing bonus.
  if (lead.filingDate) {
    const d = new Date(lead.filingDate);
    if (!Number.isNaN(d.getTime())) {
      const ageDays = (Date.now() - d.getTime()) / 86_400_000;
      if (ageDays <= 180) {
        score += 1;
        reasons.push('recent-llc');
      }
    }
  }

  score += nicheQualityScore(lead.niche);
  reasons.push(`niche:${lead.niche || 'unknown'}`);

  if (Array.isArray(lead.weakSignals) && lead.weakSignals.includes('broken-or-slow')) {
    score += 1;
    reasons.push('broken-site');
  }

  const clamped = Math.max(1, Math.min(10, score));
  const highValue = clamped >= 7;
  return { leadScore: clamped, highValue, scoreReasons: reasons, facebookOnly: fbOnly };
}
