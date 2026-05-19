/* ===========================================================
   Sonora Tax & Bookkeeping — Interactions & i18n (v2)
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

  /* ---------------- i18n ----------------
     Strings that appear bilingually on the page (e.g. "Tax · Impuestos")
     stay the same in both languages — they are intentionally always shown.
     The lang toggle switches the order/emphasis and the longer body copy.
  ----------------------------------------- */
  const I18N = {
    en: {
      'topbar.habla': 'Se Habla Español',
      'topbar.bilingual': 'Bilingual Service · English & Español',

      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.about': 'About',
      'nav.reviews': 'Reviews',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.cta': 'Free Consultation · Consulta Gratis',

      'hero.eyebrowEn': 'Trusted bilingual financial partner',
      'hero.eyebrowEs': 'Su socio bilingüe de confianza',
      'hero.title1': 'Tax & Bookkeeping,',
      'hero.title2': 'done with confidence.',
      'hero.title3': 'Impuestos y contabilidad, con confianza.',
      'hero.sub': 'Sonora is a boutique bilingual firm serving Spanish-speaking families and small businesses with personalized tax preparation and year-round bookkeeping — in English and Español.',
      'hero.cta1': 'Schedule Consultation · Agendar Consulta',
      'hero.cta2': 'Call · Llamar',
      'hero.trust': 'Trusted by Spanish-speaking families & small businesses · La confianza de familias y pequeñas empresas hispanohablantes',
      'hero.s1en': 'Returns Filed', 'hero.s1es': 'Declaraciones',
      'hero.s2en': 'Bilingual',     'hero.s2es': 'Bilingüe',
      'hero.s3en': 'Year-Round Support', 'hero.s3es': 'Apoyo Todo el Año',
      'hero.namecardEn': 'Founder & Tax Professional',
      'hero.namecardEs': 'Fundadora · Profesional de Impuestos',

      'strip.s1': 'IRS-Compliant Filing',
      'strip.s2': 'Personalized · Personalizado',
      'strip.s3': 'Year-Round Bookkeeping',
      'strip.s4': 'English & Español',

      'about.eyebrow': 'About · Acerca',
      'about.title1': 'Meet Astrid Bollain',
      'about.title2': 'Your bilingual partner in taxes and bookkeeping.',
      'about.badgeTitle': 'Bilingual · Bilingüe',
      'about.badgeSub': 'Spanish first language · Español lengua materna',
      'about.leadEn': 'Astrid founded Sonora to bring clarity, confidence, and care to the families and small businesses she serves. Spanish is her first language, and she built Sonora to feel like home for every client — with personal attention, deep bookkeeping expertise, and long-term relationships you can rely on.',
      'about.leadEs': 'Astrid fundó Sonora para ofrecer claridad, confianza y cuidado a las familias y pequeñas empresas de su comunidad. El español es su lengua materna, y Sonora se siente como en casa — con atención personal, profunda experiencia en contabilidad y relaciones duraderas en las que puede confiar.',
      'about.li1t': 'Spanish-first communication',
      'about.li1s': 'Comunicación clara en español — desde la primera llamada.',
      'about.li2t': 'Bookkeeping expertise',
      'about.li2s': 'Libros mensuales claros para su pequeño negocio.',
      'about.li3t': 'Year-round tax planning',
      'about.li3s': 'Planificación fiscal durante todo el año — sin sorpresas.',
      'about.li4t': 'Family & community values',
      'about.li4s': 'Valores familiares · Confianza local · Servicio personal.',
      'about.cta': 'Book a Free Consultation · Consulta Gratis',

      'services.eyebrow': 'Our Services · Nuestros Servicios',
      'services.title1': 'Premium bilingual support for',
      'services.title2': 'every step of your finances.',
      'services.lead': 'From personal tax returns to full-service bookkeeping for small businesses — handled with care, in English and Español.',
      'svc.tax': 'Tax Preparation',
      'svc.taxEs': 'Preparación de Impuestos',
      'svc.taxD': 'Personal & business returns prepared with precision and maximum legal savings.',
      'svc.book': 'Bookkeeping',
      'svc.bookEs': 'Contabilidad',
      'svc.bookD': 'Clean monthly books, reconciliations, and reports — so your business stays clear all year.',
      'svc.bookChip': 'Core Service · Servicio Principal',
      'svc.sb': 'Small Business Services',
      'svc.sbEs': 'Servicios para Pequeños Negocios',
      'svc.sbD': 'From LLC formation guidance to quarterly filings — built for local entrepreneurs.',
      'svc.plan': 'Tax Planning',
      'svc.planEs': 'Planificación Fiscal',
      'svc.planD': 'Proactive strategy throughout the year to minimize liability and prevent surprises.',
      'svc.pay': 'Payroll Assistance',
      'svc.payEs': 'Asistencia de Nómina',
      'svc.payD': 'Reliable payroll setup, processing, and compliance for growing teams.',
      'svc.org': 'Financial Organization',
      'svc.orgEs': 'Organización Financiera',
      'svc.orgD': 'Clean records and systems — so tax time becomes a calm, simple process.',

      'why.eyebrow': 'Why Sonora · Por qué Sonora',
      'why.title1': 'A boutique firm',
      'why.title2': 'Una firma boutique de confianza.',
      'why.lead': "Built on bilingual clarity, long-term relationships, and the kind of personal attention that's hard to find anywhere else.",
      'why.c1t': 'Bilingual English & Spanish',
      'why.c1d': 'Cada detalle explicado claramente — en el idioma que prefiera.',
      'why.c2t': 'Personal Attention',
      'why.c2d': 'Trabaja directamente con Astrid — no con un call center.',
      'why.c3t': 'Accurate & Timely',
      'why.c3d': 'Precisión y puntualidad en cada declaración y reporte.',
      'why.c4t': 'Bookkeeping Expertise',
      'why.c4d': 'Libros claros todo el año — no solo en abril.',
      'why.c5t': 'Local Community Trust',
      'why.c5d': 'Arraigados en la comunidad — vecinos ayudando a vecinos.',
      'why.c6t': 'Year-Round Support',
      'why.c6d': 'Asesoría los 12 meses, no solo en temporada de impuestos.',

      'rev.eyebrow': 'Client Stories · Testimonios',
      'rev.title1': 'La confianza de nuestras familias',
      'rev.title2': '— and the small businesses we serve.',
      'rev.q1': '"Profesional, clara y siempre disponible. Astrid nos atendió en español desde el primer día. Recomiendo Sonora a toda mi familia."',
      'rev.r1': 'Cliente familiar · Family client',
      'rev.q2': '"Por fin entiendo mis impuestos. Astrid me explica todo paso a paso, con paciencia y profesionalismo. Confianza total."',
      'rev.r2': 'Cliente bilingüe',
      'rev.q3': '"Our bookkeeping is finally organized. Sonora handles everything in both languages so our whole team understands the numbers."',
      'rev.r3': 'Small business owner',
      'rev.q4': '"Llevamos años con Sonora. Astrid trata a nuestro negocio como si fuera el suyo. La contabilidad mensual es impecable."',
      'rev.r4': 'Dueños de pequeño negocio · Small business owners',

      'cta.eyebrow': 'Consulta Gratis · Free Consultation',
      'cta.title1': 'Ready for a smarter tax season?',
      'cta.title2': '¿Listo para una temporada de impuestos más tranquila?',
      'cta.sub': 'Book your free, no-obligation consultation with Astrid. Bilingual support — every step of the way.',
      'cta.btn1': 'Schedule Free Consultation · Agendar Consulta',

      'faq.eyebrow': 'FAQ · Preguntas Frecuentes',
      'faq.title1': 'Common questions',
      'faq.title2': '— answered in both languages.',
      'faq.q1en': 'Do you offer fully bilingual service?',
      'faq.q1es': '¿Ofrecen servicio totalmente bilingüe?',
      'faq.a1en': "Yes — every conversation, document, and explanation is available in English or Español. Astrid's first language is Spanish, and bilingual service is the heart of Sonora.",
      'faq.a1es': 'Sí — cada conversación, documento y explicación está disponible en inglés o español. El español es la lengua materna de Astrid, y el servicio bilingüe es el corazón de Sonora.',
      'faq.q2en': 'Do you work with small businesses?',
      'faq.q2es': '¿Trabajan con pequeños negocios?',
      'faq.a2en': 'Absolutely. We support local small businesses with bookkeeping, payroll, quarterly filings, and proactive tax planning.',
      'faq.a2es': 'Por supuesto. Apoyamos a pequeños negocios locales con contabilidad, nómina, declaraciones trimestrales y planificación fiscal proactiva.',
      'faq.q3en': 'Is the initial consultation free?',
      'faq.q3es': '¿La consulta inicial es gratis?',
      'faq.a3en': 'Yes. Your first consultation is free and confidential — designed to understand your needs and outline a clear plan forward.',
      'faq.a3es': 'Sí. Su primera consulta es gratis y confidencial — diseñada para entender sus necesidades y trazar un plan claro.',
      'faq.q4en': 'Do you provide bookkeeping year-round?',
      'faq.q4es': '¿Ofrecen contabilidad todo el año?',
      'faq.a4en': 'Yes — bookkeeping is a core service. We keep your books clean every month so your business stays organized and tax-ready.',
      'faq.a4es': 'Sí — la contabilidad es un servicio principal. Mantenemos sus libros claros cada mes para que su negocio esté listo en cualquier momento.',
      'faq.q5en': 'How do I get started?',
      'faq.q5es': '¿Cómo empiezo?',
      'faq.a5en': 'Click "Free Consultation" anywhere on this page or call us directly. We\'ll find a time that works for you.',
      'faq.a5es': 'Haga clic en "Consulta Gratis" en cualquier parte de la página o llámenos directamente. Encontraremos un horario que le funcione.',

      'footer.msg': 'Boutique bilingual tax & bookkeeping. Servicio bilingüe, claro y de confianza.',
      'footer.flags': 'Bilingüe · Bilingual',
      'footer.h1': 'Quick Links · Enlaces',
      'footer.h2': 'Contact · Contacto',
      'footer.h3': 'Office Hours · Horario',
      'footer.h3a': 'Mon–Fri · Lun–Vie · 9:00 – 18:00',
      'footer.h3b': 'Sat · Sáb · By appointment',
      'footer.h3c': 'Sun · Dom · Closed',
      'footer.rights': 'All rights reserved · Todos los derechos reservados.',
      'footer.tagline': 'Confianza · Claridad · Resultados',

      'modal.eyebrow': 'Consulta Gratis · Free Consultation',
      'modal.title1': "Let's talk",
      'modal.title2': 'Conversemos.',
      'modal.sub': 'Tell us about your needs · Cuéntenos sus necesidades. Bilingual support — English or Español.',
      'modal.name': 'Full Name · Nombre Completo',
      'modal.phone': 'Phone · Teléfono',
      'modal.email': 'Email · Correo',
      'modal.service': 'Service Needed · Servicio Necesario',
      'modal.method': 'Contact Method · Método',
      'modal.message': 'Message · Mensaje',
      'modal.svc0': 'Select a service · Seleccione',
      'modal.svc1': 'Tax Preparation · Impuestos',
      'modal.svc2': 'Bookkeeping · Contabilidad',
      'modal.svc3': 'Small Business · Pequeño Negocio',
      'modal.svc4': 'Payroll · Nómina',
      'modal.svc5': 'Other · Otro',
      'modal.m0': 'Select · Seleccione',
      'modal.m1': 'Phone · Llamada',
      'modal.m2': 'Email · Correo',
      'modal.m3': 'Text · Mensaje',
      'modal.submit': 'Send Request · Enviar Solicitud',
      'modal.note': 'We respect your privacy · Su información es confidencial.',
      'modal.okTitle': '¡Gracias! · Thank you!',
      'modal.okSub': 'Recibimos su solicitud. Astrid se comunicará pronto para agendar su consulta gratis. We received your request and will reach out shortly.',
      'modal.okClose': 'Close · Cerrar',
    },

    es: {
      'topbar.habla': 'Se Habla Español',
      'topbar.bilingual': 'Servicio Bilingüe · Español & English',

      'nav.home': 'Inicio',
      'nav.services': 'Servicios',
      'nav.about': 'Acerca',
      'nav.reviews': 'Testimonios',
      'nav.faq': 'Preguntas',
      'nav.contact': 'Contacto',
      'nav.cta': 'Consulta Gratis · Free Consultation',

      'hero.eyebrowEn': 'Trusted bilingual financial partner',
      'hero.eyebrowEs': 'Su socio bilingüe de confianza',
      'hero.title1': 'Impuestos y Contabilidad,',
      'hero.title2': 'con confianza.',
      'hero.title3': 'Tax & Bookkeeping, done with confidence.',
      'hero.sub': 'Sonora es una firma boutique bilingüe que sirve a familias y pequeños negocios hispanohablantes con preparación de impuestos personalizada y contabilidad durante todo el año — en español e inglés.',
      'hero.cta1': 'Agendar Consulta · Schedule Consultation',
      'hero.cta2': 'Llamar · Call',
      'hero.trust': 'La confianza de familias y pequeñas empresas hispanohablantes · Trusted by Spanish-speaking families & small businesses',
      'hero.s1en': 'Declaraciones', 'hero.s1es': 'Returns Filed',
      'hero.s2en': 'Bilingüe',      'hero.s2es': 'Bilingual',
      'hero.s3en': 'Apoyo Todo el Año', 'hero.s3es': 'Year-Round Support',
      'hero.namecardEn': 'Fundadora · Profesional de Impuestos',
      'hero.namecardEs': 'Founder · Tax Professional',

      'strip.s1': 'Cumplimiento IRS',
      'strip.s2': 'Personalizado · Personalized',
      'strip.s3': 'Contabilidad Todo el Año',
      'strip.s4': 'Español & English',

      'about.eyebrow': 'Acerca · About',
      'about.title1': 'Conozca a Astrid Bollain',
      'about.title2': 'Su socia bilingüe en impuestos y contabilidad.',
      'about.badgeTitle': 'Bilingüe · Bilingual',
      'about.badgeSub': 'Español lengua materna · Spanish first language',
      'about.leadEn': 'Astrid fundó Sonora para ofrecer claridad, confianza y cuidado a las familias y pequeñas empresas de su comunidad. El español es su lengua materna, y Sonora se siente como en casa — con atención personal, profunda experiencia en contabilidad y relaciones duraderas.',
      'about.leadEs': 'Astrid founded Sonora to bring clarity, confidence, and care to the families and small businesses she serves. Spanish is her first language — and Sonora was built to feel like home for every client.',
      'about.li1t': 'Comunicación en español',
      'about.li1s': 'Spanish-first communication — desde la primera llamada.',
      'about.li2t': 'Experiencia en contabilidad',
      'about.li2s': 'Libros mensuales claros para su pequeño negocio.',
      'about.li3t': 'Planificación fiscal todo el año',
      'about.li3s': 'Year-round tax planning — sin sorpresas.',
      'about.li4t': 'Valores familiares y comunitarios',
      'about.li4s': 'Family values · Confianza local · Servicio personal.',
      'about.cta': 'Agendar Consulta Gratis · Free Consultation',

      'services.eyebrow': 'Nuestros Servicios · Our Services',
      'services.title1': 'Apoyo bilingüe premium para',
      'services.title2': 'cada paso de sus finanzas.',
      'services.lead': 'Desde declaraciones personales hasta contabilidad completa para pequeñas empresas — atendido con cuidado, en español e inglés.',
      'svc.tax': 'Preparación de Impuestos',
      'svc.taxEs': 'Tax Preparation',
      'svc.taxD': 'Declaraciones personales y de negocio preparadas con precisión y el máximo ahorro legal.',
      'svc.book': 'Contabilidad',
      'svc.bookEs': 'Bookkeeping',
      'svc.bookD': 'Libros mensuales claros, conciliaciones e informes — para que su negocio se mantenga organizado todo el año.',
      'svc.bookChip': 'Servicio Principal · Core Service',
      'svc.sb': 'Servicios para Pequeños Negocios',
      'svc.sbEs': 'Small Business Services',
      'svc.sbD': 'Desde la formación de LLC hasta declaraciones trimestrales — para emprendedores locales.',
      'svc.plan': 'Planificación Fiscal',
      'svc.planEs': 'Tax Planning',
      'svc.planD': 'Estrategia proactiva durante todo el año para minimizar la carga fiscal y evitar sorpresas.',
      'svc.pay': 'Asistencia de Nómina',
      'svc.payEs': 'Payroll Assistance',
      'svc.payD': 'Configuración, procesamiento y cumplimiento de nómina confiable.',
      'svc.org': 'Organización Financiera',
      'svc.orgEs': 'Financial Organization',
      'svc.orgD': 'Registros y sistemas claros — para que la temporada de impuestos sea un proceso simple.',

      'why.eyebrow': 'Por qué Sonora · Why Sonora',
      'why.title1': 'Una firma boutique',
      'why.title2': 'A boutique firm built on trust.',
      'why.lead': 'Construida sobre claridad bilingüe, relaciones duraderas y el tipo de atención personal difícil de encontrar.',
      'why.c1t': 'Bilingüe Español & Inglés',
      'why.c1d': 'Every detail explained clearly — in the language you prefer.',
      'why.c2t': 'Atención Personal',
      'why.c2d': 'Trabaje directamente con Astrid — no con un call center.',
      'why.c3t': 'Preciso y Puntual',
      'why.c3d': 'Precision and punctuality on every return and report.',
      'why.c4t': 'Experiencia en Contabilidad',
      'why.c4d': 'Libros claros todo el año — no solo en abril.',
      'why.c5t': 'Confianza Local',
      'why.c5d': 'Arraigados en la comunidad — vecinos ayudando a vecinos.',
      'why.c6t': 'Apoyo Todo el Año',
      'why.c6d': 'Asesoría los 12 meses, no solo en temporada de impuestos.',

      'rev.eyebrow': 'Testimonios · Client Stories',
      'rev.title1': 'La confianza de nuestras familias',
      'rev.title2': '— y los pequeños negocios que servimos.',
      'rev.q1': '"Profesional, clara y siempre disponible. Astrid nos atendió en español desde el primer día. Recomiendo Sonora a toda mi familia."',
      'rev.r1': 'Cliente familiar · Family client',
      'rev.q2': '"Por fin entiendo mis impuestos. Astrid me explica todo paso a paso, con paciencia y profesionalismo. Confianza total."',
      'rev.r2': 'Cliente bilingüe',
      'rev.q3': '"Nuestra contabilidad por fin está organizada. Sonora atiende todo en ambos idiomas para que todo el equipo entienda los números."',
      'rev.r3': 'Dueño de pequeño negocio',
      'rev.q4': '"Llevamos años con Sonora. Astrid trata a nuestro negocio como si fuera el suyo. La contabilidad mensual es impecable."',
      'rev.r4': 'Dueños de pequeño negocio · Small business owners',

      'cta.eyebrow': 'Consulta Gratis · Free Consultation',
      'cta.title1': '¿Listo para una temporada de impuestos más tranquila?',
      'cta.title2': 'Ready for a smarter tax season?',
      'cta.sub': 'Agende su consulta gratis y sin compromiso con Astrid. Apoyo bilingüe — en cada paso del camino.',
      'cta.btn1': 'Agendar Consulta Gratis · Free Consultation',

      'faq.eyebrow': 'Preguntas Frecuentes · FAQ',
      'faq.title1': 'Preguntas frecuentes',
      'faq.title2': '— respondidas en ambos idiomas.',
      'faq.q1en': '¿Ofrecen servicio totalmente bilingüe?',
      'faq.q1es': 'Do you offer fully bilingual service?',
      'faq.a1en': 'Sí — cada conversación, documento y explicación está disponible en español o inglés. El español es la lengua materna de Astrid, y el servicio bilingüe es el corazón de Sonora.',
      'faq.a1es': "Yes — every conversation, document, and explanation is available in Spanish or English. Astrid's first language is Spanish.",
      'faq.q2en': '¿Trabajan con pequeños negocios?',
      'faq.q2es': 'Do you work with small businesses?',
      'faq.a2en': 'Por supuesto. Apoyamos a pequeños negocios locales con contabilidad, nómina, declaraciones trimestrales y planificación fiscal proactiva.',
      'faq.a2es': 'Absolutely. We support local small businesses with bookkeeping, payroll, quarterly filings, and proactive tax planning.',
      'faq.q3en': '¿La consulta inicial es gratis?',
      'faq.q3es': 'Is the initial consultation free?',
      'faq.a3en': 'Sí. Su primera consulta es gratis y confidencial — diseñada para entender sus necesidades y trazar un plan claro.',
      'faq.a3es': 'Yes. Your first consultation is free and confidential.',
      'faq.q4en': '¿Ofrecen contabilidad todo el año?',
      'faq.q4es': 'Do you provide bookkeeping year-round?',
      'faq.a4en': 'Sí — la contabilidad es un servicio principal. Mantenemos sus libros claros cada mes para que su negocio esté listo en cualquier momento.',
      'faq.a4es': 'Yes — bookkeeping is a core service. We keep your books clean every month.',
      'faq.q5en': '¿Cómo empiezo?',
      'faq.q5es': 'How do I get started?',
      'faq.a5en': 'Haga clic en "Consulta Gratis" en cualquier parte de la página o llámenos directamente. Encontraremos un horario que le funcione.',
      'faq.a5es': 'Click "Free Consultation" anywhere on this page or call us directly.',

      'footer.msg': 'Boutique bilingüe de impuestos y contabilidad. Servicio claro, profesional y de confianza.',
      'footer.flags': 'Bilingüe · Bilingual',
      'footer.h1': 'Enlaces · Quick Links',
      'footer.h2': 'Contacto · Contact',
      'footer.h3': 'Horario · Office Hours',
      'footer.h3a': 'Lun–Vie · Mon–Fri · 9:00 – 18:00',
      'footer.h3b': 'Sáb · Sat · Con cita',
      'footer.h3c': 'Dom · Sun · Cerrado',
      'footer.rights': 'Todos los derechos reservados · All rights reserved.',
      'footer.tagline': 'Confianza · Claridad · Resultados',

      'modal.eyebrow': 'Consulta Gratis · Free Consultation',
      'modal.title1': 'Conversemos',
      'modal.title2': "Let's talk.",
      'modal.sub': 'Cuéntenos sus necesidades · Tell us about your needs. Apoyo bilingüe — español o inglés.',
      'modal.name': 'Nombre Completo · Full Name',
      'modal.phone': 'Teléfono · Phone',
      'modal.email': 'Correo · Email',
      'modal.service': 'Servicio Necesario · Service Needed',
      'modal.method': 'Método de Contacto · Contact Method',
      'modal.message': 'Mensaje · Message',
      'modal.svc0': 'Seleccione · Select',
      'modal.svc1': 'Impuestos · Tax Preparation',
      'modal.svc2': 'Contabilidad · Bookkeeping',
      'modal.svc3': 'Pequeño Negocio · Small Business',
      'modal.svc4': 'Nómina · Payroll',
      'modal.svc5': 'Otro · Other',
      'modal.m0': 'Seleccione · Select',
      'modal.m1': 'Llamada · Phone',
      'modal.m2': 'Correo · Email',
      'modal.m3': 'Mensaje · Text',
      'modal.submit': 'Enviar Solicitud · Send Request',
      'modal.note': 'Su información es confidencial · We respect your privacy.',
      'modal.okTitle': '¡Gracias! · Thank you!',
      'modal.okSub': 'Recibimos su solicitud. Astrid se comunicará pronto para agendar su consulta gratis.',
      'modal.okClose': 'Cerrar · Close',
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

    document.querySelectorAll('.service-card, .why-card, .review-card, .stat, .faq-item, .about__list li').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .55s ease, transform .55s ease';
      io.observe(el);
    });
  }
})();
