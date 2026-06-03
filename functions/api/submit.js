/**
 * Cloudflare Pages Function — POST /api/submit
 *
 * Handles consultation form submissions from the Sonora site.
 * - Validates required fields and honeypot.
 * - Sends a formatted email to astrid@sonorataxbook.com via Resend.
 * - Sets Reply-To to the submitter's email so Astrid can reply directly.
 *
 * Env vars (set in Cloudflare Pages → Settings → Environment Variables):
 *   RESEND_API_KEY   — required, from https://resend.com/api-keys
 *   RESEND_FROM      — optional, e.g. "Sonora Website <noreply@sonorataxbook.com>"
 *                      Defaults to Resend's onboarding sender if not set.
 *   NOTIFY_TO        — optional, override the recipient. Defaults to astrid@sonorataxbook.com.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json().catch(() => ({}));

    // Defense-in-depth honeypot (the client already drops these, but block anyway)
    if (data.company_website && String(data.company_website).trim() !== '') {
      return json({ ok: true }, 200);
    }

    // Minimum required fields
    const errors = [];
    if (!data.full_name)      errors.push('full_name');
    if (!data.phone)          errors.push('phone');
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) errors.push('email');
    if (!data.contact_method) errors.push('contact_method');
    if (errors.length) {
      return json({ error: 'Missing or invalid fields', fields: errors }, 400);
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) return json({ error: 'Server not configured' }, 500);

    const from   = env.RESEND_FROM || 'Sonora Website <onboarding@resend.dev>';
    const to     = (env.NOTIFY_TO || 'astrid@sonorataxbook.com').split(',').map(s => s.trim());
    const lang   = data.page_language || 'en';
    const tags   = Array.isArray(data.tags) ? data.tags : [];
    const services = Array.isArray(data.services_array)
      ? data.services_array.join(', ')
      : (data.services || '');

    const subject = `New Consultation Request — ${data.full_name}${services ? ` (${services})` : ''}`;

    const html = `
      <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1A1F3A;max-width:560px;">
        <h2 style="margin:0 0 12px;font-size:20px;">New Consultation Request</h2>
        <p style="margin:0 0 18px;color:#5B7CFA;font-weight:600;">Sonora Tax &amp; Bookkeeping · sonora-website</p>

        <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td style="font-weight:600;width:140px;border-bottom:1px solid #eee;">Name</td><td style="border-bottom:1px solid #eee;">${esc(data.full_name)}</td></tr>
          <tr><td style="font-weight:600;border-bottom:1px solid #eee;">Phone</td><td style="border-bottom:1px solid #eee;"><a href="tel:${esc(data.phone)}">${esc(data.phone)}</a></td></tr>
          <tr><td style="font-weight:600;border-bottom:1px solid #eee;">Email</td><td style="border-bottom:1px solid #eee;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
          <tr><td style="font-weight:600;border-bottom:1px solid #eee;">Services</td><td style="border-bottom:1px solid #eee;">${esc(services) || '<em>(none selected)</em>'}</td></tr>
          <tr><td style="font-weight:600;border-bottom:1px solid #eee;">Preferred Contact</td><td style="border-bottom:1px solid #eee;">${esc(data.contact_method)}</td></tr>
          <tr><td style="font-weight:600;border-bottom:1px solid #eee;vertical-align:top;">Message</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap;">${esc(data.message || '(no message)')}</td></tr>
        </table>

        <p style="margin:18px 0 4px;font-size:12px;color:#666;">
          Submitted ${esc(data.submitted_at || new Date().toISOString())} · Language: ${esc(lang)} · Tags: ${tags.map(esc).join(', ')}
        </p>
        <p style="margin:0;font-size:12px;color:#888;">
          You can reply directly to this email — it will go to ${esc(data.email)}.
        </p>
      </div>
    `;

    const text =
`New Consultation Request — Sonora Tax & Bookkeeping

Name:             ${data.full_name}
Phone:            ${data.phone}
Email:            ${data.email}
Services:         ${services || '(none selected)'}
Preferred Contact: ${data.contact_method}

Message:
${data.message || '(no message)'}

---
Submitted: ${data.submitted_at || new Date().toISOString()}
Language:  ${lang}
Tags:      ${tags.join(', ')}

Reply to this email to respond directly to ${data.email}.
`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: data.email,
        subject,
        html,
        text,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text().catch(() => '');
      console.error('Resend send failed', resendRes.status, errBody);
      return json({ error: 'Email send failed', status: resendRes.status }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error('submit handler error', err && err.message);
    return json({ error: 'Server error' }, 500);
  }
}

// Reject anything that isn't POST so the endpoint doesn't get scraped.
export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
