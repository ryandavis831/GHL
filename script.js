/* ===========================================================
   Sonora Tax & Bookkeeping — Interactions & i18n (v3)
   Spanish-first bilingual site. Most copy is rendered
   bilingually in markup; the language toggle re-emphasizes
   the longer body strings keyed with data-i18n.
   =========================================================== */

(function () {
  'use strict';

  /* ---------------- Sticky nav ---------------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');
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

  /* ---------------- Year ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------- Modal ---------------- */
  const modal = document.getElementById('consultModal');
  const formEl = document.getElementById('consultForm');
  const successEl = document.getElementById('modalSuccess');
  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    formEl.hidden = false;
    successEl.hidden = true;
    setTimeout(() => {
      const first = modal.querySelector('input,select,textarea,button');
      if (first) first.focus();
    }, 80);
  }
  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }
  document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  /* ---------------- Form submit ---------------- */
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = formEl.querySelectorAll('[required]');
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
    if (!ok) return;
    formEl.hidden = true;
    successEl.hidden = false;
    formEl.reset();
  });

  /* ---------------- i18n ---------------- */
  const I18N = {
    es: {
      'hero.titleEs1': 'Impuestos y Contabilidad,',
      'hero.titleEs2': 'con confianza y claridad.',
      'hero.titleEn': 'Tax preparation & year-round bookkeeping — done with confidence.',
      'hero.subEs': 'Servicio profesional para familias hispanohablantes y pequeños negocios. Astrid Bollain habla español como lengua materna — atención completamente bilingüe en cada paso.',
      'hero.subEn': 'Professional service for Spanish-speaking families and small businesses. Astrid speaks Spanish as her first language — fully bilingual support at every step.',
      'hero.trustEs': 'La confianza de familias hispanohablantes y pequeños negocios',
      'hero.trustEn': 'Trusted by Spanish-speaking families & small businesses',
      'hero.s1es': 'Declaraciones', 'hero.s1en': 'Returns Filed',
      'hero.s2es': 'Bilingüe',      'hero.s2en': 'Bilingual',
      'hero.s3es': 'Apoyo Todo el Año', 'hero.s3en': 'Year-Round Support',

      'about.titleEs': 'Conozca a Astrid Bollain',
      'about.titleEn': 'Meet Astrid Bollain — your bilingual partner in taxes and bookkeeping.',
      'about.leadEs': 'Astrid fundó Sonora para ofrecer claridad, confianza y cuidado a las familias y pequeños negocios de habla hispana. El español es su lengua materna, y construyó Sonora para que cada cliente se sienta como en casa — con atención personal, experiencia profunda en contabilidad y relaciones duraderas.',
      'about.leadEn': 'Astrid founded Sonora to bring clarity, confidence, and care to Spanish-speaking families and small businesses. Spanish is her first language — and Sonora was built so every client feels at home, with personal attention, deep bookkeeping expertise, and long-term relationships.',
    },
    en: {
      'hero.titleEs1': 'Tax & Bookkeeping,',
      'hero.titleEs2': 'done with confidence.',
      'hero.titleEn': 'Impuestos y contabilidad — con confianza y claridad.',
      'hero.subEs': 'Boutique bilingual firm serving Spanish-speaking families and small businesses with personalized tax preparation and year-round bookkeeping. Astrid speaks Spanish as her first language.',
      'hero.subEn': 'Firma boutique bilingüe que atiende a familias hispanohablantes y pequeños negocios — preparación de impuestos personalizada y contabilidad todo el año.',
      'hero.trustEs': 'Trusted by Spanish-speaking families & small businesses',
      'hero.trustEn': 'La confianza de familias hispanohablantes y pequeños negocios',
      'hero.s1es': 'Returns Filed', 'hero.s1en': 'Declaraciones',
      'hero.s2es': 'Bilingual',     'hero.s2en': 'Bilingüe',
      'hero.s3es': 'Year-Round Support', 'hero.s3en': 'Apoyo Todo el Año',

      'about.titleEs': 'Meet Astrid Bollain',
      'about.titleEn': 'Su socia bilingüe en impuestos y contabilidad.',
      'about.leadEs': 'Astrid founded Sonora to bring clarity, confidence, and care to Spanish-speaking families and small businesses. Spanish is her first language — and Sonora was built so every client feels at home, with personal attention, deep bookkeeping expertise, and long-term relationships.',
      'about.leadEn': 'Astrid fundó Sonora para ofrecer claridad, confianza y cuidado a las familias y pequeños negocios de habla hispana. El español es su lengua materna — y Sonora fue construido para que cada cliente se sienta como en casa.',
    },
  };

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    const dict = I18N[lang] || I18N.es;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.textContent = dict[key];
    });
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === lang);
    });
    try { localStorage.setItem('sonora-lang', lang); } catch (_) {}
  }

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang-btn')));
  });

  // Default to Spanish — this is a Spanish-first site
  let initial = 'es';
  try {
    const stored = localStorage.getItem('sonora-lang');
    if (stored === 'es' || stored === 'en') initial = stored;
    else if ((navigator.language || '').toLowerCase().startsWith('en')) {
      // Even English-first browsers see Spanish lead unless they explicitly switch
      initial = 'es';
    }
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

    document.querySelectorAll('.service-card, .why-card, .review-card, .stat, .faq-item, .about__list li, .feature__list li').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
      io.observe(el);
    });
  }
})();
