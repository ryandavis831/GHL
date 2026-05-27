import { createLogger } from '../utils/logger.js';

const log = createLogger('phone-type');

const TOLL_FREE_NPA = new Set(['800', '833', '844', '855', '866', '877', '888']);
const PREMIUM_NPA = new Set(['900']);

/**
 * Best-effort classification from the number itself. In the US, after years
 * of full number portability, the line type cannot be derived from the digits
 * alone — a mobile number can land on a VoIP carrier, etc. We return what's
 * verifiable for free and defer to Twilio Lookup for the rest.
 *
 * Returns one of: 'toll-free' | 'premium' | 'invalid' | 'unknown'
 */
export function classifyPhoneOffline(phone) {
  if (!phone) return { phoneType: 'invalid', reason: 'empty' };
  const digits = String(phone).replace(/\D/g, '');
  const normalized = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (normalized.length !== 10) return { phoneType: 'invalid', reason: 'not-10-digits' };

  const npa = normalized.slice(0, 3);
  if (TOLL_FREE_NPA.has(npa)) return { phoneType: 'toll-free', reason: `npa-${npa}` };
  if (PREMIUM_NPA.has(npa)) return { phoneType: 'premium', reason: `npa-${npa}` };

  // For everything else we genuinely cannot say without an API call.
  return { phoneType: 'unknown', reason: 'us-portability' };
}

/**
 * Optional: definitive classification via Twilio Lookup. Requires
 * TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN env vars and pulls in `node:https`
 * only when invoked. Costs ~$0.005 per lookup.
 *
 * Returns one of: 'mobile' | 'landline' | 'voip' | 'unknown'
 */
export async function classifyPhoneTwilio(phone) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;

  const digits = String(phone).replace(/\D/g, '');
  const e164 = digits.length === 10 ? `+1${digits}` : `+${digits}`;
  const url = `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(e164)}?Fields=line_type_intelligence`;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');

  try {
    const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
    if (!res.ok) {
      log.warn(`twilio lookup ${res.status} for ${phone}`);
      return null;
    }
    const body = await res.json();
    const lti = body.line_type_intelligence || {};
    const t = (lti.type || '').toLowerCase();
    if (t.includes('mobile')) return { phoneType: 'mobile', carrier: lti.carrier_name || null };
    if (t.includes('landline')) return { phoneType: 'landline', carrier: lti.carrier_name || null };
    if (t.includes('voip') || t.includes('nonFixedVoip') || t.includes('fixedVoip')) {
      return { phoneType: 'voip', carrier: lti.carrier_name || null };
    }
    return { phoneType: 'unknown', carrier: lti.carrier_name || null };
  } catch (err) {
    log.warn(`twilio lookup failed: ${err.message}`);
    return null;
  }
}

export async function classifyPhone(phone, { useTwilio = false } = {}) {
  const offline = classifyPhoneOffline(phone);
  if (offline.phoneType !== 'unknown') return offline;
  if (!useTwilio) return offline;
  const twilio = await classifyPhoneTwilio(phone);
  return twilio || offline;
}
