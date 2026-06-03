/* ===========================================================
   Sonora Tax & Bookkeeping — GHL-safe build
   - Wrapped in DOMContentLoaded so it works inside GHL Footer
     Tracking Code regardless of where GHL injects the snippet.
   - All selectors run after DOM is ready.
   - Logs "Sonora script loaded" on init.
   =========================================================== */

(function () {
  'use strict';

  function bootSonora() {
    console.log('Sonora script loaded');

  /* ===========================================================
     GHL Inbound Webhook integration
     Paste the GHL Inbound Webhook URL from the workflow:
       "Sonora Website Consultation Lead"
     =========================================================== */
  const GHL_WEBHOOK_URL = "PASTE_GHL_WEBHOOK_URL_HERE";

  /* ---------------- Sticky nav ---------------- */
  const nav = document.getElementById('nav');
  if (!nav) { console.warn('Sonora: #nav not found'); return; }
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      mobile.setAttribute('aria-hidden', String(!isOpen));
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobile.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------------- Year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Modal ---------------- */
  const modal = document.getElementById('consultModal');
  const formEl = document.getElementById('consultForm');
  const successEl = document.getElementById('modalSuccess');
  let lastFocus = null;
  let modalOpenedAt = 0;

  function openModal() {
    if (!modal || !formEl || !successEl) return;
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    formEl.hidden = false;
    successEl.hidden = true;
    const errEl = document.getElementById('consultError');
    if (errEl) errEl.hidden = true;
    modalOpenedAt = Date.now();
    setTimeout(() => {
      const first = modal.querySelector('input,select,textarea,button');
      if (first) first.focus();
    }, 80);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------------- Multi-select (Services Needed) ---------------- */
  const msPlaceholderKey = 'modal.svcPlaceholder';
  const msSummaryKey = 'modal.svcSummary';

  function initMultiselect(root) {
    const trigger = root.querySelector('.multiselect__trigger');
    const panel = root.querySelector('.multiselect__panel');
    const label = root.querySelector('[data-multiselect-label]');
    const inputs = root.querySelectorAll('input[type="checkbox"]');
    if (!trigger || !panel || !label) return;

    const updateLabel = () => {
      const checked = Array.from(inputs).filter(i => i.checked);
      if (checked.length === 0) {
        const dict = currentDict();
        label.textContent = dict[msPlaceholderKey] || 'Select one or more services';
        root.classList.remove('has-selection');
        return;
      }
      const labels = checked.map(i => {
        const span = i.parentElement.querySelector('span[data-i18n]');
        return span ? span.textContent : i.value;
      });
      if (labels.length <= 2) {
        label.textContent = labels.join(', ');
      } else {
        const dict = currentDict();
        const tmpl = dict[msSummaryKey] || '{n} services selected';
        label.textContent = tmpl.replace('{n}', String(labels.length));
      }
      root.classList.add('has-selection');
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = root.classList.toggle('is-open');
      panel.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
    });

    inputs.forEach(input => input.addEventListener('change', updateLabel));

    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) {
        root.classList.remove('is-open');
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('is-open')) {
        root.classList.remove('is-open');
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });

    root._refreshLabel = updateLabel;
  }

  const multiselects = document.querySelectorAll('[data-multiselect]');
  multiselects.forEach(initMultiselect);

  /* ---------------- Form submit (GHL Inbound Webhook) ---------------- */
  const submitBtn = document.getElementById('consultSubmit');
  const errorEl   = document.getElementById('consultError');

  const SERVICE_LABELS_EN = {
    tax:   'Tax Preparation',
    pay:   'Payroll Services',
    book:  'Bookkeeping',
    plan:  'Tax Planning',
    biz:   'Business Tax Services',
    pers:  'Personal Tax Filing',
    irs:   'IRS Assistance',
    sb:    'Small Business Accounting',
    other: 'Other',
  };

  if (formEl) formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const honeypot = formEl.querySelector('[name="company_website"]');
    if (honeypot && honeypot.value.trim() !== '') {
      formEl.hidden = true;
      successEl.hidden = false;
      return;
    }

    if (Date.now() - modalOpenedAt < 3000) {
      return;
    }

    const required = formEl.querySelectorAll('input[required], textarea[required], select[required]');
    let ok = true;
    required.forEach(input => {
      if (!input.value || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value))) {
        ok = false;
        input.style.borderColor = '#c0392b';
        input.addEventListener('input', function once() {
          input.style.borderColor = '';
          input.removeEventListener('input', once);
        });
      }
    });
    multiselects.forEach(ms => {
      const anyChecked = ms.querySelector('input[type="checkbox"]:checked');
      const trigger = ms.querySelector('.multiselect__trigger');
      if (!anyChecked) {
        ok = false;
        trigger.style.borderColor = '#c0392b';
        const clear = () => {
          trigger.style.borderColor = '';
          ms.querySelectorAll('input[type="checkbox"]').forEach(c => c.removeEventListener('change', clear));
        };
        ms.querySelectorAll('input[type="checkbox"]').forEach(c => c.addEventListener('change', clear, { once: true }));
      }
    });
    if (!ok) return;

    const selectedCodes = Array.from(formEl.querySelectorAll('input[name="services"]:checked')).map(i => i.value);
    const selectedLabels = selectedCodes.map(c => SERVICE_LABELS_EN[c] || c);

    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const tags = ['website-lead', 'sonora-website', 'consultation-request',
                  lang === 'es' ? 'spanish-lead' : 'english-lead'];

    const payload = {
      full_name:      (formEl.querySelector('#f-name')    || {}).value || '',
      phone:          (formEl.querySelector('#f-phone')   || {}).value || '',
      email:          (formEl.querySelector('#f-email')   || {}).value || '',
      services:       selectedLabels.join(', '),
      services_array: selectedLabels,
      contact_method: (formEl.querySelector('#f-contact') || {}).value || '',
      message:        (formEl.querySelector('#f-message') || {}).value || '',
      page_language:  lang,
      source:         'sonora-website',
      tags:           tags,
      submitted_at:   new Date().toISOString(),
    };

    if (errorEl) errorEl.hidden = true;
    const originalBtnLabel = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.style.cursor = 'wait';
      const sendingLabel = lang === 'es' ? 'Enviando…' : 'Sending…';
      submitBtn.innerHTML = '<span>' + sendingLabel + '</span>';
    }

    try {
      if (!GHL_WEBHOOK_URL || GHL_WEBHOOK_URL === 'PASTE_GHL_WEBHOOK_URL_HERE') {
        throw new Error('GHL_WEBHOOK_URL is not configured');
      }
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Webhook returned ' + res.status);

      formEl.hidden = true;
      successEl.hidden = false;
      formEl.reset();
      multiselects.forEach(ms => {
        ms.classList.remove('has-selection');
        if (ms._refreshLabel) ms._refreshLabel();
      });
    } catch (err) {
      if (errorEl) errorEl.hidden = false;
      console.error('Consultation submit failed:', err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        submitBtn.style.cursor = '';
        submitBtn.innerHTML = originalBtnLabel;
        applyLang(document.documentElement.getAttribute('data-lang') || 'en');
      }
    }
  });

  /* ---------------- i18n ---------------- */
  const I18N = {
    en: {
      'topbar.habla': 'Se Habla Español · Bilingual Service',
      'topbar.center': 'Locally owned in Carrboro, NC',

      'nav.tag':         'Tax & Bookkeeping · Carrboro, NC',
      'nav.home':        'Home',
      'nav.services':    'Services',
      'nav.about':       'About',
      'nav.bookkeeping': 'Bookkeeping',
      'nav.review':      'Reviews',
      'nav.faq':         'FAQ',
      'nav.contact':     'Contact',
      'nav.cta':         'Schedule Consultation',
      'nav.ctaShort':    'Book',

      'hero.eyebrow': 'Carrboro · Boutique Bilingual Firm',
      'hero.title1':  'Tax, Payroll &',
      'hero.title2':  'Bookkeeping, done right.',
      'hero.sub':     'Sonora is a locally-owned boutique firm in Carrboro, NC — providing professional tax preparation, payroll, and year-round bookkeeping for individuals, families, and small businesses. Bilingual support in English and Español.',
      'hero.cta1':    'Schedule Consultation',
      'hero.cta2':    'Call Now',
      'hero.trustT':  'Trusted tax, payroll, and bookkeeping support',
      'hero.trustS':  'For local families and small businesses across the Triangle.',
      'hero.s1':      'Returns Filed',
      'hero.s2':      'Bilingual Support',
      'hero.s3':      'Year-Round Service',
      'hero.chip1t':  'Se Habla Español',
      'hero.chip1s':  'Spanish-first service',
      'hero.chip2t':  'Locally Owned',
      'hero.chip2s':  'Carrboro, North Carolina',
      'hero.namecard':'Founder & Tax Professional',

      'strip.s1t': 'Fully Bilingual Service', 'strip.s1s': 'English & Español',
      'strip.s2t': 'Payroll Services',        'strip.s2s': 'Setup, processing & compliance',
      'strip.s3t': 'Year-Round Bookkeeping',  'strip.s3s': 'Monthly books that stay clean',
      'strip.s4t': 'IRS-Compliant Filing',    'strip.s4s': 'Accurate & timely returns',

      'about.eyebrow':        'About Sonora',
      'about.title1':         'Meet Astrid Ramos',
      'about.title2':         'Your bilingual partner in taxes, payroll, and bookkeeping.',
      'about.captionRole':    'Founder · Sonora Tax & Bookkeeping',
      'about.lead':           'Astrid founded Sonora to bring clarity, confidence, and care to local families and small businesses. Spanish is her first language, and she built Sonora to feel like home for every client — with personal attention, deep bookkeeping & payroll expertise, and long-term relationships you can rely on.',
      'about.li1t': 'Bilingual, Spanish-first communication',
      'about.li1s': 'Every conversation, document, and answer in your preferred language.',
      'about.li2t': 'Bookkeeping & payroll expertise',
      'about.li2s': 'Clean monthly books and reliable payroll for growing small businesses.',
      'about.li3t': 'Year-round tax planning',
      'about.li3s': 'Proactive guidance through every season — not just April.',
      'about.li4t': 'Local, community-rooted trust',
      'about.li4s': 'Built right here in Carrboro — neighbors helping neighbors.',
      'about.credentialsLabel': 'Credentials',
      'about.credSpanish':      'Spanish — Native Speaker',
      'about.credAlma':         'Universidad de Sonora · Alma Mater',
      'about.cta':              'Book a Free Consultation',

      'feature.eyebrow': 'Premium Bookkeeping & Payroll',
      'feature.title1':  'Clear books.',
      'feature.title2':  'Reliable payroll. Confident finances.',
      'feature.lead':    'Bookkeeping and payroll are just as important as tax preparation. We keep your books clean every month and run payroll reliably — so your small business stays organized, compliant, and tax-ready all year long.',
      'feature.li1t': 'Monthly Bookkeeping',     'feature.li1s': '— reconciliations, reports, clean records',
      'feature.li2t': 'Payroll Services',        'feature.li2s': '— setup, processing, tax filings & compliance',
      'feature.li3t': 'Financial Organization',  'feature.li3s': '— systems that simplify tax season',
      'feature.li4t': 'Quarterly Reports',       'feature.li4s': '— clear summaries you can actually use',
      'feature.li5t': 'Year-Round Partnership',  'feature.li5s': '— always available, in English or Español',
      'feature.cta':     'Talk About My Business',
      'feature.floatT':  'Year-Round Partnership',
      'feature.floatS':  'Monthly support & planning',

      'services.eyebrow':  'Our Services',
      'services.title1':   'Premium bilingual support',
      'services.title2':   'for every part of your finances.',
      'services.lead':     'From personal returns to monthly bookkeeping and payroll — handled with care, in English and Español.',
      'services.chipCore': 'Core Service',
      'svc.tax':  'Tax Preparation',
      'svc.taxD': 'Accurate personal & business returns with maximum legal savings — bilingual review every step.',
      'svc.pay':  'Payroll Services',
      'svc.payD': 'Reliable payroll setup, processing, tax filings, and compliance for small businesses and growing teams.',
      'svc.book': 'Bookkeeping',
      'svc.bookD':'Clean monthly books, reconciliations, and reports — keeping your business clear all year.',
      'svc.plan': 'Tax Planning',
      'svc.planD':'Proactive year-round strategy to minimize liability and prevent surprises.',
      'svc.biz':  'Business Tax Services',
      'svc.bizD': 'LLC, S-Corp, partnership and sole-proprietor returns prepared with precision.',
      'svc.pers': 'Personal Tax Filing',
      'svc.persD':'Individual and family returns — clear, friendly, and bilingual from start to finish.',
      'svc.irs':  'IRS Assistance',
      'svc.irsD': 'Help responding to IRS notices, audits, and back-tax issues — calmly handled.',
      'svc.sb':   'Small Business Accounting',
      'svc.sbD':  'Full-service accounting support built for local entrepreneurs and family businesses.',

      'why.eyebrow': 'Why Sonora',
      'why.title1':  'A boutique firm',
      'why.title2':  'built on trust.',
      'why.lead':    "Built on bilingual clarity, long-term relationships, and the kind of personal attention that's hard to find anywhere else.",
      'why.c1t': 'Bilingual English & Spanish', 'why.c1d': 'Every detail explained clearly in the language you prefer.',
      'why.c2t': 'Personal Attention',           'why.c2d': 'You work directly with Astrid — not a call center.',
      'why.c3t': 'Accurate & Timely',            'why.c3d': 'Precision and punctuality on every return, report, and payroll run.',
      'why.c4t': 'Bookkeeping & Payroll',        'why.c4d': 'Books and payroll handled together — for a complete picture of your business.',
      'why.c5t': 'Local in Carrboro',            'why.c5d': 'Rooted in the community we serve — neighbors helping neighbors.',
      'why.c6t': 'Year-Round Support',           'why.c6d': 'Guidance and answers 12 months a year, not just at tax time.',

      'review.support':    'Support Local',
      'review.title1':     'Help others find',
      'review.title2':     'Sonora Tax & Bookkeeping.',
      'review.lead':       "We're a small, locally-owned bilingual firm — and word of mouth means everything. If we've helped you with your taxes, payroll, or bookkeeping, please share your experience on Google. It helps neighbors find us, especially Spanish-speaking families looking for trusted, bilingual support.",
      'review.cta':        'Leave a Google Review',
      'review.hint':       'Takes less than a minute · Toma menos de un minuto',
      'review.visualNote': 'Your review helps Spanish-speaking families and local businesses find a trusted bilingual partner.',

      'cta.eyebrow': 'Free Consultation',
      'cta.title1':  'Ready for a smarter tax season?',
      'cta.sub':     'Book your free, no-obligation consultation with Astrid. Bilingual support — every step of the way.',
      'cta.btn1':    'Schedule Free Consultation',

      'faq.eyebrow': 'FAQ',
      'faq.title1':  'Common',
      'faq.title2':  'questions.',
      'faq.q1': 'Do you offer fully bilingual service?',
      'faq.a1': "Yes — every conversation, document, and explanation is available in English or Español. Astrid's first language is Spanish, and bilingual service is at the heart of Sonora.",
      'faq.q2': 'Do you handle payroll for small businesses?',
      'faq.a2': 'Yes — payroll is a core service. We set up, process, and file payroll taxes for small businesses and growing teams. All bilingual.',
      'faq.q3': 'Is the initial consultation free?',
      'faq.a3': 'Yes. Your first consultation is free and confidential — designed to understand your needs and outline a clear plan forward.',
      'faq.q4': 'Do you provide bookkeeping year-round?',
      'faq.a4': 'Yes — bookkeeping is a core service. We keep your books clean every month so your business stays organized and tax-ready.',
      'faq.q5': 'Can you help if I have an IRS notice or back taxes?',
      'faq.a5': 'Absolutely. We help individuals and small businesses respond to IRS notices, resolve back taxes, and get back on track — calmly and clearly.',
      'faq.q6': 'Where is your office located?',
      'faq.a6': "We're at 212 W Main St, Suite A2, Carrboro, NC 27510 — just minutes from Chapel Hill. Walk-ins by appointment, virtual meetings available.",

      'map.eyebrow': 'Visit Our Office',
      'map.title1':  'Right here in',
      'map.title2':  'Carrboro, NC.',
      'map.lead':    "Stop by, schedule a virtual meeting, or give us a call. We're proud to serve local families and small businesses across the Triangle — fully bilingual, always personal.",
      'map.addrT':   'Address',
      'map.hoursT':  'Office Hours',
      'map.hoursV':  'Mon–Fri · 9:00 AM – 6:00 PM<br/>Sat · By appointment<br/>Sun · Closed',
      'map.phoneT':  'Phone & Email',
      'map.cta1':    'Get Directions',
      'map.cta2':    'Schedule a Visit',

      'footer.tag':       'Tax & Bookkeeping · Carrboro, NC',
      'footer.identity':  'A boutique bilingual firm built for local families and small businesses — tax preparation, payroll, and year-round bookkeeping in English and Español.',
      'footer.flagchip':  'Bilingual · Bilingüe',
      'footer.linkedin':  'Connect on LinkedIn',
      'footer.h1':        'Services',
      'footer.h2':        'Company',
      'footer.h3':        'Visit & Contact',
      'footer.directions':'Get Directions →',
      'footer.rights':    'All rights reserved.',
      'footer.tagline':   'Confianza · Claridad · Resultados',

      'modal.eyebrow':  'Free Consultation',
      'modal.title':    "Let's talk.",
      'modal.sub':      "Tell us about your needs and we'll be in touch shortly. Bilingual support — English or Español.",
      'modal.name':     'Full Name',
      'modal.phone':    'Phone',
      'modal.email':    'Email',
      'modal.service':  'Service Needed',
      'modal.method':   'Contact Method',
      'modal.message':  'Message',
      'modal.service':       'Services Needed',
      'modal.svcPlaceholder':'Select one or more services',
      'modal.svcSummary':    '{n} services selected',
      'modal.svc0':          'Select a service',
      'modal.svcOther':      'Other',
      'modal.m0':       'Select preference',
      'modal.m1':       'Phone Call',
      'modal.m2':       'Email',
      'modal.m3':       'Text Message',
      'modal.submit':   'Send Request',
      'modal.note':     'We respect your privacy. Your information is confidential.',
      'modal.placeholder':'How can we help?',
      'modal.okTitle':  'Thank you!',
      'modal.okSub':    'We received your request. Astrid will reach out shortly to schedule your free consultation.',
      'modal.okClose':  'Close',
      'modal.error':    'Something went wrong sending your request. Please try again or call us at (919) 241-7414.',
      'map.phoneOfficeLbl': 'Office:',
      'map.phoneCellLbl':   'Cell:',
      'map.phoneFaxLbl':    'Fax:',
      'footer.phoneOfficeLbl': 'Office:',
      'footer.phoneCellLbl':   'Cell:',
      'footer.phoneFaxLbl':    'Fax:',
    },

    es: {
      'topbar.habla': 'Se Habla Español · Servicio Bilingüe',
      'topbar.center': 'Negocio local en Carrboro, NC',

      'nav.tag':         'Impuestos & Contabilidad · Carrboro, NC',
      'nav.home':        'Inicio',
      'nav.services':    'Servicios',
      'nav.about':       'Acerca',
      'nav.bookkeeping': 'Contabilidad',
      'nav.review':      'Testimonios',
      'nav.faq':         'Preguntas',
      'nav.contact':     'Contacto',
      'nav.cta':         'Agendar Consulta',
      'nav.ctaShort':    'Agendar',

      'hero.eyebrow': 'Carrboro · Firma Boutique Bilingüe',
      'hero.title1':  'Impuestos, Nómina y',
      'hero.title2':  'Contabilidad, hechos bien.',
      'hero.sub':     'Sonora es una firma boutique local en Carrboro, NC — preparación de impuestos profesional, nómina y contabilidad todo el año para personas, familias y pequeños negocios. Soporte bilingüe en español e inglés.',
      'hero.cta1':    'Agendar Consulta',
      'hero.cta2':    'Llamar Ahora',
      'hero.trustT':  'Apoyo profesional en impuestos, nómina y contabilidad',
      'hero.trustS':  'Para familias y pequeños negocios locales en todo el Triangle.',
      'hero.s1':      'Declaraciones',
      'hero.s2':      'Soporte Bilingüe',
      'hero.s3':      'Servicio Todo el Año',
      'hero.chip1t':  'Se Habla Español',
      'hero.chip1s':  'Servicio en español primero',
      'hero.chip2t':  'Negocio Local',
      'hero.chip2s':  'Carrboro, Carolina del Norte',
      'hero.namecard':'Fundadora · Profesional de Impuestos',

      'strip.s1t': 'Servicio Completamente Bilingüe', 'strip.s1s': 'Español & English',
      'strip.s2t': 'Servicios de Nómina',             'strip.s2s': 'Configuración, procesamiento y cumplimiento',
      'strip.s3t': 'Contabilidad Todo el Año',         'strip.s3s': 'Libros mensuales siempre claros',
      'strip.s4t': 'Declaraciones Conforme al IRS',    'strip.s4s': 'Precisas y a tiempo',

      'about.eyebrow':        'Acerca de Sonora',
      'about.title1':         'Conozca a Astrid Ramos',
      'about.title2':         'Su socia bilingüe en impuestos, nómina y contabilidad.',
      'about.captionRole':    'Fundadora · Sonora Tax & Bookkeeping',
      'about.lead':           'Astrid fundó Sonora para ofrecer claridad, confianza y cuidado a familias y pequeños negocios locales. El español es su lengua materna, y construyó Sonora para que cada cliente se sienta como en casa — con atención personal, profunda experiencia en contabilidad y nómina, y relaciones duraderas.',
      'about.li1t': 'Comunicación bilingüe, español primero',
      'about.li1s': 'Cada conversación, documento y respuesta en el idioma que prefiera.',
      'about.li2t': 'Experiencia en contabilidad y nómina',
      'about.li2s': 'Libros mensuales claros y nómina confiable para pequeños negocios.',
      'about.li3t': 'Planificación fiscal todo el año',
      'about.li3s': 'Asesoría proactiva en cada temporada — no solo en abril.',
      'about.li4t': 'Confianza local y comunitaria',
      'about.li4s': 'Construida aquí en Carrboro — vecinos ayudando a vecinos.',
      'about.credentialsLabel': 'Credenciales',
      'about.credSpanish':      'Español — Lengua materna',
      'about.credAlma':         'Universidad de Sonora · Alma Mater',
      'about.cta':              'Agendar Consulta Gratis',

      'feature.eyebrow': 'Contabilidad y Nómina Premium',
      'feature.title1':  'Libros claros.',
      'feature.title2':  'Nómina confiable. Finanzas con confianza.',
      'feature.lead':    'La contabilidad y la nómina son tan importantes como la preparación de impuestos. Mantenemos sus libros claros cada mes y procesamos la nómina con confianza — para que su pequeño negocio se mantenga organizado, cumplido y listo para impuestos todo el año.',
      'feature.li1t': 'Contabilidad Mensual',     'feature.li1s': '— conciliaciones, reportes, registros claros',
      'feature.li2t': 'Servicios de Nómina',      'feature.li2s': '— configuración, procesamiento, declaraciones y cumplimiento',
      'feature.li3t': 'Organización Financiera',   'feature.li3s': '— sistemas que simplifican la temporada de impuestos',
      'feature.li4t': 'Reportes Trimestrales',    'feature.li4s': '— resúmenes claros que sí puede usar',
      'feature.li5t': 'Asociación Todo el Año',   'feature.li5s': '— siempre disponibles, en español o inglés',
      'feature.cta':     'Hablar de mi negocio',
      'feature.floatT':  'Asociación Todo el Año',
      'feature.floatS':  'Apoyo y planificación mensual',

      'services.eyebrow':  'Nuestros Servicios',
      'services.title1':   'Soporte bilingüe premium',
      'services.title2':   'para cada parte de sus finanzas.',
      'services.lead':     'Desde declaraciones personales hasta contabilidad mensual y nómina — atendido con cuidado, en español e inglés.',
      'services.chipCore': 'Servicio Principal',
      'svc.tax':  'Preparación de Impuestos',
      'svc.taxD': 'Declaraciones personales y de negocio precisas, con el máximo ahorro legal — revisión bilingüe en cada paso.',
      'svc.pay':  'Servicios de Nómina',
      'svc.payD': 'Configuración, procesamiento, declaraciones e cumplimiento de nómina confiable para pequeños negocios.',
      'svc.book': 'Contabilidad',
      'svc.bookD':'Libros mensuales claros, conciliaciones e informes — para que su negocio se mantenga organizado todo el año.',
      'svc.plan': 'Planificación Fiscal',
      'svc.planD':'Estrategia proactiva todo el año para minimizar la carga fiscal y evitar sorpresas.',
      'svc.biz':  'Impuestos de Negocio',
      'svc.bizD': 'Declaraciones de LLC, S-Corp, sociedades y dueños únicos preparadas con precisión.',
      'svc.pers': 'Impuestos Personales',
      'svc.persD':'Declaraciones personales y familiares — claras, amables y bilingües de principio a fin.',
      'svc.irs':  'Asistencia con el IRS',
      'svc.irsD': 'Ayuda con avisos del IRS, auditorías e impuestos atrasados — manejado con calma.',
      'svc.sb':   'Contabilidad para Pequeños Negocios',
      'svc.sbD':  'Soporte contable completo para emprendedores locales y negocios familiares.',

      'why.eyebrow': 'Por qué Sonora',
      'why.title1':  'Una firma boutique',
      'why.title2':  'basada en la confianza.',
      'why.lead':    'Construida sobre claridad bilingüe, relaciones duraderas y atención personal difícil de encontrar.',
      'why.c1t': 'Bilingüe Español & Inglés', 'why.c1d': 'Cada detalle explicado claramente en el idioma que prefiera.',
      'why.c2t': 'Atención Personal',          'why.c2d': 'Trabaje directamente con Astrid — no con un call center.',
      'why.c3t': 'Preciso y Puntual',          'why.c3d': 'Precisión y puntualidad en cada declaración, reporte y nómina.',
      'why.c4t': 'Contabilidad y Nómina',      'why.c4d': 'Libros y nómina manejados juntos — para una visión completa de su negocio.',
      'why.c5t': 'Local en Carrboro',          'why.c5d': 'Arraigados en la comunidad — vecinos ayudando a vecinos.',
      'why.c6t': 'Apoyo Todo el Año',          'why.c6d': 'Asesoría los 12 meses, no solo en temporada de impuestos.',

      'review.support':    'Apoye lo Local',
      'review.title1':     'Ayude a otros a encontrar',
      'review.title2':     'Sonora Tax & Bookkeeping.',
      'review.lead':       'Somos una firma pequeña, local y bilingüe — y la recomendación de boca en boca lo es todo. Si le hemos ayudado con sus impuestos, nómina o contabilidad, comparta su experiencia en Google. Ayuda a sus vecinos a encontrarnos, especialmente a las familias hispanohablantes que buscan un socio bilingüe de confianza.',
      'review.cta':        'Deja una reseña en Google',
      'review.hint':       'Toma menos de un minuto · Takes less than a minute',
      'review.visualNote': 'Su reseña ayuda a familias hispanohablantes y negocios locales a encontrar un socio bilingüe de confianza.',

      'cta.eyebrow': 'Consulta Gratis',
      'cta.title1':  '¿Listo para una temporada de impuestos más tranquila?',
      'cta.sub':     'Agende su consulta gratis y sin compromiso con Astrid. Apoyo bilingüe — en cada paso.',
      'cta.btn1':    'Agendar Consulta Gratis',

      'faq.eyebrow': 'Preguntas Frecuentes',
      'faq.title1':  'Preguntas',
      'faq.title2':  'frecuentes.',
      'faq.q1': '¿Ofrecen servicio totalmente bilingüe?',
      'faq.a1': 'Sí — cada conversación, documento y explicación está disponible en español o inglés. El español es la lengua materna de Astrid, y el servicio bilingüe es el corazón de Sonora.',
      'faq.q2': '¿Manejan la nómina para pequeños negocios?',
      'faq.a2': 'Sí — la nómina es un servicio principal. Configuramos, procesamos y declaramos los impuestos de nómina para pequeños negocios. Todo bilingüe.',
      'faq.q3': '¿La consulta inicial es gratis?',
      'faq.a3': 'Sí. Su primera consulta es gratis y confidencial — diseñada para entender sus necesidades y trazar un plan claro.',
      'faq.q4': '¿Ofrecen contabilidad todo el año?',
      'faq.a4': 'Sí — la contabilidad es un servicio principal. Mantenemos sus libros claros cada mes para que su negocio esté listo en cualquier momento.',
      'faq.q5': '¿Pueden ayudarme con un aviso del IRS o impuestos atrasados?',
      'faq.a5': 'Por supuesto. Ayudamos a personas y pequeños negocios a responder avisos del IRS, resolver impuestos atrasados y volver al camino — con calma y claridad.',
      'faq.q6': '¿Dónde está su oficina?',
      'faq.a6': 'Estamos en 212 W Main St, Suite A2, Carrboro, NC 27510 — a minutos de Chapel Hill. Visitas con cita, reuniones virtuales disponibles.',

      'map.eyebrow': 'Visite Nuestra Oficina',
      'map.title1':  'Aquí mismo en',
      'map.title2':  'Carrboro, NC.',
      'map.lead':    'Pase por la oficina, agende una reunión virtual o llámenos. Servimos con orgullo a familias y pequeños negocios del Triangle — completamente bilingüe, siempre personal.',
      'map.addrT':   'Dirección',
      'map.hoursT':  'Horario de Oficina',
      'map.hoursV':  'Lun–Vie · 9:00 AM – 6:00 PM<br/>Sáb · Con cita<br/>Dom · Cerrado',
      'map.phoneT':  'Teléfono & Correo',
      'map.cta1':    'Obtener Direcciones',
      'map.cta2':    'Agendar Visita',

      'footer.tag':       'Impuestos & Contabilidad · Carrboro, NC',
      'footer.identity':  'Una firma boutique bilingüe construida para familias y pequeños negocios locales — preparación de impuestos, nómina y contabilidad todo el año en español e inglés.',
      'footer.flagchip':  'Bilingüe · Bilingual',
      'footer.linkedin':  'Conectar en LinkedIn',
      'footer.h1':        'Servicios',
      'footer.h2':        'Empresa',
      'footer.h3':        'Visita & Contacto',
      'footer.directions':'Obtener Direcciones →',
      'footer.rights':    'Todos los derechos reservados.',
      'footer.tagline':   'Confianza · Claridad · Resultados',

      'modal.eyebrow':  'Consulta Gratis',
      'modal.title':    'Conversemos.',
      'modal.sub':      'Cuéntenos sus necesidades y nos pondremos en contacto pronto. Apoyo bilingüe — español o inglés.',
      'modal.name':     'Nombre Completo',
      'modal.phone':    'Teléfono',
      'modal.email':    'Correo',
      'modal.service':  'Servicio Necesario',
      'modal.method':   'Método de Contacto',
      'modal.message':  'Mensaje',
      'modal.service':       'Servicios Necesarios',
      'modal.svcPlaceholder':'Seleccione uno o más servicios',
      'modal.svcSummary':    '{n} servicios seleccionados',
      'modal.svc0':          'Seleccione un servicio',
      'modal.svcOther':      'Otro',
      'modal.m0':       'Seleccione preferencia',
      'modal.m1':       'Llamada',
      'modal.m2':       'Correo',
      'modal.m3':       'Mensaje de Texto',
      'modal.submit':   'Enviar Solicitud',
      'modal.note':     'Respetamos su privacidad. Su información es confidencial.',
      'modal.placeholder':'¿En qué podemos ayudar?',
      'modal.okTitle':  '¡Gracias!',
      'modal.okSub':    'Recibimos su solicitud. Astrid se comunicará pronto para agendar su consulta gratis.',
      'modal.okClose':  'Cerrar',
      'modal.error':    'Algo salió mal al enviar su solicitud. Por favor intente de nuevo o llámenos al (919) 241-7414.',
      'map.phoneOfficeLbl': 'Oficina:',
      'map.phoneCellLbl':   'Celular:',
      'map.phoneFaxLbl':    'Fax:',
      'footer.phoneOfficeLbl': 'Oficina:',
      'footer.phoneCellLbl':   'Celular:',
      'footer.phoneFaxLbl':    'Fax:',
    },
  };

  // Label shown on the toggle = TARGET language (next click destination)
  const SWITCH_LABEL = {
    en: { short: 'Español', long: 'Switch to Español', aria: 'Switch language to Español' },
    es: { short: 'English',  long: 'Switch to English',  aria: 'Cambiar idioma a English' },
  };

  function currentDict() {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    return I18N[lang] || I18N.en;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    const dict = I18N[lang] || I18N.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] == null) return;
      const val = dict[key];
      if (val.indexOf('<br') !== -1) el.innerHTML = val;
      else el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
    });

    // Toggle button text = the OTHER language (where one click takes you).
    // The flag swap is handled by CSS using [data-lang] on <html>.
    const label = SWITCH_LABEL[lang];
    document.querySelectorAll('[data-lang-label]').forEach(el => {
      const isHero = el.closest('.btn--ghost');
      el.textContent = isHero ? label.long : label.short;
    });
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', label.aria);
    });

    // Refresh any open multi-select labels so placeholder/summary translate too
    document.querySelectorAll('[data-multiselect]').forEach(ms => {
      if (typeof ms._refreshLabel === 'function') ms._refreshLabel();
    });

    try { localStorage.setItem('sonora-lang', lang); } catch (_) {}
  }

  // Single-click toggle: flips between en ↔ es
  document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-lang') || 'en';
      applyLang(current === 'en' ? 'es' : 'en');
    });
  });

  // Default: ENGLISH. Persisted choice wins.
  let initial = 'en';
  try {
    const stored = localStorage.getItem('sonora-lang');
    if (stored === 'en' || stored === 'es') initial = stored;
  } catch (_) {}
  applyLang(initial);

  /* ---------------- Reveal on scroll ---------------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.service-card, .why-card, .stat, .faq-item, .about__list li, .feature__list li, .map__detail').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
      io.observe(el);
    });
  }
  } // end bootSonora

  // GHL-safe boot: defer to DOMContentLoaded if DOM isn't ready yet.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootSonora);
  } else {
    bootSonora();
  }
})();
