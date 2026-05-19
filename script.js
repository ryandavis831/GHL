/* ===========================================================
   Sonora Tax & Bookkeeping — Interactions & i18n
   =========================================================== */

(function () {
  'use strict';

  // ---------- Sticky nav scroll state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
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

  // ---------- Year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Modal ----------
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

  // ---------- Form submit ----------
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = formEl.querySelectorAll('[required]');
    let ok = true;
    required.forEach(input => {
      if (!input.value || (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value))) {
        ok = false;
        input.style.borderColor = '#ff6b6b';
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

  // ---------- i18n ----------
  const I18N = {
    en: {
      'topbar.habla': 'Se Habla Español',
      'topbar.bilingual': 'Bilingual Support · English & Español',
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.reviews': 'Reviews',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.cta': 'Free Consultation / Consulta Gratis',

      'hero.eyebrow': 'Trusted bilingual financial partner',
      'hero.title1': 'Professional Tax &',
      'hero.title2': 'Bookkeeping Services',
      'hero.title3': 'You Can Trust',
      'hero.sub': 'Personalized tax preparation and year-round bookkeeping for individuals, families, and small businesses — delivered with clarity, confidence, and bilingual support in English & Español.',
      'hero.cta1': 'Schedule Consultation',
      'hero.cta2': 'Call Now',
      'hero.b1': 'Returns Filed',
      'hero.b2': 'Bilingual Support',
      'hero.b3': 'Small Business Friendly',
      'hero.b4': 'Year-Round Guidance',
      'hero.namecard': 'Founder & Tax Professional',
      'hero.float1': 'Compliant filing',
      'hero.float2a': '5-Star Rated',
      'hero.float2b': 'Local clients',

      'about.eyebrow': 'About Sonora',
      'about.title1': 'Meet Astrid Bollain —',
      'about.title2': 'your trusted bilingual tax & bookkeeping partner.',
      'about.lead': 'Astrid founded Sonora Tax & Bookkeeping to bring clarity, confidence, and care to the families and small businesses in our community. With deep expertise in both tax preparation and bookkeeping, she delivers personalized service in English and Español — every step of the way.',
      'about.li1': 'Personalized service for every client',
      'about.li2': 'Bookkeeping expertise built for small business',
      'about.li3': 'Year-round tax planning & guidance',
      'about.li4': 'Clear bilingual communication — Inglés & Español',
      'about.li5': 'Local, community-rooted trust',
      'about.cta': 'Book a Free Consultation',
      'about.sigRole': 'Founder',
      'about.badgeTitle': 'Bilingual Service',

      'services.eyebrow': 'Our Services',
      'services.title1': 'Everything you need for',
      'services.title2': 'taxes & bookkeeping',
      'services.lead': 'From personal returns to full-service bookkeeping, we provide premium bilingual support to individuals, families, and small businesses.',
      'svc.tax': 'Tax Preparation',
      'svc.taxD': 'Accurate, on-time personal and business returns with maximum legal savings.',
      'svc.book': 'Bookkeeping',
      'svc.bookD': 'Clean monthly books, reconciliations, and reports that keep your business clear.',
      'svc.bookChip': 'Year-round',
      'svc.sb': 'Small Business Services',
      'svc.sbD': 'From LLC formation guidance to quarterly filings — built for local entrepreneurs.',
      'svc.plan': 'Tax Planning',
      'svc.planD': 'Proactive, year-round strategy to minimize your liability and avoid surprises.',
      'svc.pay': 'Payroll Assistance',
      'svc.payD': 'Reliable payroll setup, processing, and compliance for growing teams.',
      'svc.org': 'Financial Organization',
      'svc.orgD': 'Clean records and systems — so tax time becomes a calm, simple process.',
      'svc.bil': 'Bilingual Client Support',
      'svc.bilD': 'Every conversation, document, and question — handled clearly in English or Español.',

      'why.eyebrow': 'Why Sonora',
      'why.title1': 'A premium experience —',
      'why.title2': 'built on trust',
      'why.c1t': 'Bilingual English & Spanish',
      'why.c1d': 'Every detail explained clearly in the language you prefer.',
      'why.c2t': 'Personalized Attention',
      'why.c2d': 'You work directly with Astrid — not a call center.',
      'why.c3t': 'Accurate & Timely Filing',
      'why.c3d': 'Precision-first preparation with strict deadline discipline.',
      'why.c4t': 'Bookkeeping Expertise',
      'why.c4d': 'Books that stay clean all year — not just in April.',
      'why.c5t': 'Local Community Trust',
      'why.c5d': 'Rooted in the community we serve — neighbors helping neighbors.',
      'why.c6t': 'Year-Round Support',
      'why.c6d': 'Guidance and answers 12 months a year, not just tax season.',

      'rev.eyebrow': 'Client Stories',
      'rev.title1': 'Trusted by families',
      'rev.title2': '& small businesses',
      'rev.q1': '"Astrid took the time to explain everything in Spanish for my parents and in English for me. We finally feel like our taxes are in expert hands."',
      'rev.r1': 'Family client',
      'rev.q2': '"Our bookkeeping is finally organized. Sonora streamlined everything and saved us hours every month."',
      'rev.r2': 'Small business owner',
      'rev.q3': '"Profesional, clara y siempre disponible. Recomiendo Sonora a toda mi familia y amigos."',
      'rev.r3': 'Cliente local',

      'cta.title1': 'Ready for a smarter tax season?',
      'cta.title2': '¿Listo para una temporada de impuestos más inteligente?',
      'cta.sub': 'Book your free, no-obligation consultation with Astrid today. Bilingual support — every step of the way.',
      'cta.btn1': 'Schedule Free Consultation',

      'faq.eyebrow': 'FAQ',
      'faq.title1': 'Common',
      'faq.title2': 'questions',
      'faq.q1': 'Do you offer fully bilingual service?',
      'faq.a1': 'Yes — every conversation, document review, and explanation is available in English or Español. Bilingual service is at the heart of Sonora.',
      'faq.q2': 'Do you work with small businesses?',
      'faq.a2': 'Absolutely. We support local small businesses with bookkeeping, payroll assistance, quarterly filings, and proactive tax planning.',
      'faq.q3': 'Is the initial consultation free?',
      'faq.a3': 'Yes. Your first consultation is free and confidential — designed to understand your needs and outline a clear plan forward.',
      'faq.q4': 'Do you provide bookkeeping year-round?',
      'faq.a4': 'Yes — bookkeeping is a core service. We keep your books clean every month so your business stays organized and tax-ready.',
      'faq.q5': 'How do I get started?',
      'faq.a5': 'Click "Free Consultation" anywhere on this page or call us directly. We\'ll find a time that works for you.',

      'footer.msg': 'Bilingual tax & bookkeeping built on trust. Servicio bilingüe — clear, careful, community-rooted.',
      'footer.h1': 'Quick Links',
      'footer.h2': 'Contact',
      'footer.h3': 'Office Hours',
      'footer.h3a': 'Mon–Fri · 9:00 AM – 6:00 PM',
      'footer.h3b': 'Sat · By appointment',
      'footer.h3c': 'Sun · Closed',
      'footer.chip': 'Se Habla Español',
      'footer.rights': 'All rights reserved.',
      'footer.tagline': 'Confianza · Claridad · Resultados',

      'modal.eyebrow': 'Free Consultation',
      'modal.title1': "Let's talk —",
      'modal.title2': 'Conversemos',
      'modal.sub': "Tell us about your needs and we'll be in touch shortly. Bilingual support — English or Español.",
      'modal.name': 'Full Name / Nombre Completo',
      'modal.phone': 'Phone / Teléfono',
      'modal.email': 'Email / Correo',
      'modal.service': 'Service Needed / Servicio Necesario',
      'modal.method': 'Contact Method / Método',
      'modal.message': 'Message / Mensaje',
      'modal.svc0': 'Select a service',
      'modal.svc1': 'Tax Preparation',
      'modal.svc2': 'Bookkeeping',
      'modal.svc3': 'Small Business Services',
      'modal.svc4': 'Payroll',
      'modal.svc5': 'Other',
      'modal.m0': 'Select preference',
      'modal.m1': 'Phone Call / Llamada',
      'modal.m2': 'Email / Correo',
      'modal.m3': 'Text / Mensaje',
      'modal.submit': 'Send Request / Enviar Solicitud',
      'modal.note': 'We respect your privacy. Your information is confidential.',
      'modal.okTitle': 'Thank you! / ¡Gracias!',
      'modal.okSub': 'We received your request. Astrid will reach out shortly to schedule your free consultation.',
      'modal.okClose': 'Close',
    },

    es: {
      'topbar.habla': 'Se Habla Español',
      'topbar.bilingual': 'Soporte bilingüe · Inglés & Español',
      'nav.home': 'Inicio',
      'nav.services': 'Servicios',
      'nav.about': 'Acerca',
      'nav.reviews': 'Reseñas',
      'nav.faq': 'Preguntas',
      'nav.contact': 'Contacto',
      'nav.cta': 'Consulta Gratis / Free Consultation',

      'hero.eyebrow': 'Su socio financiero bilingüe de confianza',
      'hero.title1': 'Servicios Profesionales de',
      'hero.title2': 'Impuestos y Contabilidad',
      'hero.title3': 'en los que Puede Confiar',
      'hero.sub': 'Preparación de impuestos personalizada y contabilidad durante todo el año para personas, familias y pequeñas empresas — con claridad, confianza y soporte bilingüe en Inglés y Español.',
      'hero.cta1': 'Agendar Consulta',
      'hero.cta2': 'Llamar Ahora',
      'hero.b1': 'Declaraciones',
      'hero.b2': 'Servicio Bilingüe',
      'hero.b3': 'Pequeñas Empresas',
      'hero.b4': 'Apoyo Todo el Año',
      'hero.namecard': 'Fundadora y Profesional de Impuestos',
      'hero.float1': 'Cumplimiento IRS',
      'hero.float2a': '5 Estrellas',
      'hero.float2b': 'Clientes locales',

      'about.eyebrow': 'Acerca de Sonora',
      'about.title1': 'Conozca a Astrid Bollain —',
      'about.title2': 'su socia bilingüe de confianza en impuestos y contabilidad.',
      'about.lead': 'Astrid fundó Sonora Tax & Bookkeeping para brindar claridad, confianza y atención a las familias y pequeñas empresas de nuestra comunidad. Con profunda experiencia en impuestos y contabilidad, ofrece un servicio personalizado en inglés y español — en cada paso.',
      'about.li1': 'Servicio personalizado para cada cliente',
      'about.li2': 'Experiencia en contabilidad para pequeñas empresas',
      'about.li3': 'Planificación fiscal y asesoría todo el año',
      'about.li4': 'Comunicación bilingüe clara — Inglés & Español',
      'about.li5': 'Confianza local arraigada en la comunidad',
      'about.cta': 'Agendar Consulta Gratis',
      'about.sigRole': 'Fundadora',
      'about.badgeTitle': 'Servicio Bilingüe',

      'services.eyebrow': 'Nuestros Servicios',
      'services.title1': 'Todo lo que necesita para',
      'services.title2': 'impuestos y contabilidad',
      'services.lead': 'Desde declaraciones personales hasta contabilidad completa, ofrecemos soporte bilingüe premium a personas, familias y pequeñas empresas.',
      'svc.tax': 'Preparación de Impuestos',
      'svc.taxD': 'Declaraciones personales y de negocio precisas, a tiempo y con el máximo ahorro legal.',
      'svc.book': 'Contabilidad',
      'svc.bookD': 'Libros mensuales claros, conciliaciones e informes que mantienen su negocio organizado.',
      'svc.bookChip': 'Todo el año',
      'svc.sb': 'Servicios para Pequeñas Empresas',
      'svc.sbD': 'Desde la formación de LLC hasta declaraciones trimestrales — para emprendedores locales.',
      'svc.plan': 'Planificación Fiscal',
      'svc.planD': 'Estrategia proactiva durante todo el año para minimizar su carga fiscal.',
      'svc.pay': 'Asistencia de Nómina',
      'svc.payD': 'Configuración, procesamiento y cumplimiento de nómina confiable.',
      'svc.org': 'Organización Financiera',
      'svc.orgD': 'Registros y sistemas claros — para que la temporada de impuestos sea simple.',
      'svc.bil': 'Atención Bilingüe al Cliente',
      'svc.bilD': 'Cada conversación, documento y pregunta — atendida con claridad en inglés o español.',

      'why.eyebrow': 'Por qué Sonora',
      'why.title1': 'Una experiencia premium —',
      'why.title2': 'basada en la confianza',
      'why.c1t': 'Bilingüe Inglés & Español',
      'why.c1d': 'Cada detalle explicado claramente en el idioma que prefiera.',
      'why.c2t': 'Atención Personalizada',
      'why.c2d': 'Trabaja directamente con Astrid — no con un call center.',
      'why.c3t': 'Declaración Precisa y Puntual',
      'why.c3d': 'Preparación de máxima precisión con disciplina de plazos.',
      'why.c4t': 'Experiencia en Contabilidad',
      'why.c4d': 'Libros que se mantienen claros todo el año — no solo en abril.',
      'why.c5t': 'Confianza Local',
      'why.c5d': 'Arraigados en la comunidad — vecinos ayudando a vecinos.',
      'why.c6t': 'Apoyo Todo el Año',
      'why.c6d': 'Asesoría y respuestas los 12 meses, no solo en temporada de impuestos.',

      'rev.eyebrow': 'Historias de Clientes',
      'rev.title1': 'La confianza de familias',
      'rev.title2': 'y pequeñas empresas',
      'rev.q1': '"Astrid se tomó el tiempo de explicar todo en español para mis padres y en inglés para mí. Por fin sentimos que nuestros impuestos están en manos expertas."',
      'rev.r1': 'Cliente familiar',
      'rev.q2': '"Nuestra contabilidad por fin está organizada. Sonora simplificó todo y nos ahorra horas cada mes."',
      'rev.r2': 'Dueño de pequeña empresa',
      'rev.q3': '"Profesional, clara y siempre disponible. Recomiendo Sonora a toda mi familia y amigos."',
      'rev.r3': 'Cliente local',

      'cta.title1': '¿Listo para una temporada de impuestos más inteligente?',
      'cta.title2': 'Ready for a smarter tax season?',
      'cta.sub': 'Agende hoy su consulta gratis y sin compromiso con Astrid. Soporte bilingüe — en cada paso.',
      'cta.btn1': 'Agendar Consulta Gratis',

      'faq.eyebrow': 'Preguntas',
      'faq.title1': 'Preguntas',
      'faq.title2': 'frecuentes',
      'faq.q1': '¿Ofrecen servicio totalmente bilingüe?',
      'faq.a1': 'Sí — cada conversación, revisión de documentos y explicación está disponible en inglés o español. El servicio bilingüe es el corazón de Sonora.',
      'faq.q2': '¿Trabajan con pequeñas empresas?',
      'faq.a2': 'Por supuesto. Apoyamos a pequeñas empresas locales con contabilidad, nómina, declaraciones trimestrales y planificación fiscal proactiva.',
      'faq.q3': '¿La consulta inicial es gratis?',
      'faq.a3': 'Sí. Su primera consulta es gratis y confidencial — diseñada para entender sus necesidades y trazar un plan claro.',
      'faq.q4': '¿Ofrecen contabilidad todo el año?',
      'faq.a4': 'Sí — la contabilidad es un servicio principal. Mantenemos sus libros claros cada mes para que su negocio esté listo en cualquier momento.',
      'faq.q5': '¿Cómo empiezo?',
      'faq.a5': 'Haga clic en "Consulta Gratis" en cualquier parte de la página o llámenos directamente. Encontraremos un horario que le funcione.',

      'footer.msg': 'Impuestos y contabilidad bilingües basados en la confianza. Servicio claro, cuidadoso y comunitario.',
      'footer.h1': 'Enlaces',
      'footer.h2': 'Contacto',
      'footer.h3': 'Horario',
      'footer.h3a': 'Lun–Vie · 9:00 AM – 6:00 PM',
      'footer.h3b': 'Sáb · Con cita',
      'footer.h3c': 'Dom · Cerrado',
      'footer.chip': 'Se Habla Español',
      'footer.rights': 'Todos los derechos reservados.',
      'footer.tagline': 'Confianza · Claridad · Resultados',

      'modal.eyebrow': 'Consulta Gratis',
      'modal.title1': 'Conversemos —',
      'modal.title2': "Let's talk",
      'modal.sub': 'Cuéntenos sus necesidades y nos pondremos en contacto pronto. Soporte bilingüe — Inglés o Español.',
      'modal.name': 'Nombre Completo / Full Name',
      'modal.phone': 'Teléfono / Phone',
      'modal.email': 'Correo / Email',
      'modal.service': 'Servicio Necesario / Service Needed',
      'modal.method': 'Método de Contacto / Contact Method',
      'modal.message': 'Mensaje / Message',
      'modal.svc0': 'Seleccione un servicio',
      'modal.svc1': 'Preparación de Impuestos',
      'modal.svc2': 'Contabilidad',
      'modal.svc3': 'Servicios para Pequeñas Empresas',
      'modal.svc4': 'Nómina',
      'modal.svc5': 'Otro',
      'modal.m0': 'Seleccione preferencia',
      'modal.m1': 'Llamada / Phone Call',
      'modal.m2': 'Correo / Email',
      'modal.m3': 'Mensaje / Text',
      'modal.submit': 'Enviar Solicitud / Send Request',
      'modal.note': 'Respetamos su privacidad. Su información es confidencial.',
      'modal.okTitle': '¡Gracias! / Thank you!',
      'modal.okSub': 'Recibimos su solicitud. Astrid se comunicará pronto para agendar su consulta gratis.',
      'modal.okClose': 'Cerrar',
    },
  };

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    const dict = I18N[lang] || I18N.en;
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

  let initial = 'en';
  try {
    const stored = localStorage.getItem('sonora-lang');
    if (stored === 'en' || stored === 'es') initial = stored;
    else if ((navigator.language || '').toLowerCase().startsWith('es')) initial = 'es';
  } catch (_) {}
  applyLang(initial);

  // ---------- Reveal on scroll ----------
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

    document.querySelectorAll('.service-card, .why-card, .review-card, .badge-card, .faq-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      io.observe(el);
    });
  }
})();
