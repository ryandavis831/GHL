/* Takia's Cleaning Services — main.js
   Vanilla JS (no dependencies). Handles:
   - Nav scroll state + mobile menu
   - Reveal-on-scroll
   - Before/After sliders (mouse, touch, keyboard)
   - Gallery filter + lightbox
   - Reviews carousel
   - Quote form (client-side validation + success state)
   - Sticky mobile CTA visibility
   - Footer year
*/
(function () {
  'use strict';

  /* ---------- helpers ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  /* =========================================================
     Footer year
     ========================================================= */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     Nav: scroll state + mobile toggle + smooth anchor close
     ========================================================= */
  const nav = $('#nav');
  const navToggle = $('#navToggle');
  const navMobile = $('#navMobile');

  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      if (open) navMobile.setAttribute('hidden', '');
      else navMobile.removeAttribute('hidden');
    });
    $$('a', navMobile).forEach(a => {
      a.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.setAttribute('hidden', '');
      });
    });
  }

  /* =========================================================
     Reveal on scroll (IntersectionObserver)
     ========================================================= */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  /* =========================================================
     BEFORE / AFTER SLIDERS
     - data-before, data-after, data-aspect (h/w ratio)
     - injects two <img> elements + handle + labels
     - handles mouse, touch, click anywhere on track, and keyboard
     ========================================================= */
  function buildSlider(el) {
    const beforeSrc = el.dataset.before;
    const afterSrc  = el.dataset.after;
    const aspect    = parseFloat(el.dataset.aspect || '1');

    // Apply aspect ratio via style (height / width)
    el.style.aspectRatio = `1 / ${aspect}`;

    // The AFTER image is the base layer (so it's visible by default on the right).
    // The BEFORE image sits on top, clipped from the right — so dragging the handle
    // right reveals more BEFORE on the left side.
    el.innerHTML = `
      <img class="ba__img ba__after" src="${afterSrc}" alt="After cleaning" loading="lazy" />
      <div class="ba__clip" aria-hidden="false">
        <img class="ba__img ba__before" src="${beforeSrc}" alt="Before cleaning" loading="lazy" />
      </div>
      <span class="ba__label ba__label--before">Before</span>
      <span class="ba__label ba__label--after">After</span>
      <div class="ba__handle" role="slider" tabindex="0" aria-label="Drag to compare before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
        <div class="ba__handle-grip" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/><polyline points="9 18 15 12 9 6" transform="translate(6 0)"/></svg>
        </div>
      </div>
    `;

    const clip   = $('.ba__clip', el);
    const handle = $('.ba__handle', el);

    let pct = 50;
    let dragging = false;

    const setPct = (p) => {
      pct = clamp(p, 0, 100);
      // BEFORE image (top layer) is clipped so it shows from x=0 to x=pct%.
      // AFTER image (base) shows on the right of the handle.
      clip.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = `${pct}%`;
      handle.setAttribute('aria-valuenow', String(Math.round(pct)));
    };
    setPct(50);

    const pctFromEvent = (clientX) => {
      const rect = el.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    };

    const onDown = (e) => {
      dragging = true;
      el.style.cursor = 'grabbing';
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPct(pctFromEvent(x));
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPct(pctFromEvent(x));
    };
    const onUp = () => { dragging = false; el.style.cursor = 'ew-resize'; };

    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    el.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    handle.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { setPct(pct - 3); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPct(pct + 3); e.preventDefault(); }
      if (e.key === 'Home')       { setPct(0); }
      if (e.key === 'End')        { setPct(100); }
    });
  }
  $$('.ba').forEach(buildSlider);

  /* =========================================================
     GALLERY: filter + lightbox
     ========================================================= */
  const chips = $$('.gallery__filter .chip');
  const items = $$('.m-item');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const filter = chip.dataset.filter;
      items.forEach(it => {
        const cats = (it.dataset.cat || '').split(/\s+/);
        const show = filter === 'all' || cats.includes(filter);
        it.classList.toggle('is-hidden', !show);
      });
    });
  });

  // Lightbox
  const lb = $('#lightbox');
  const lbImg = $('#lightboxImg');
  const lbClose = $('.lightbox__close', lb);
  const lbPrev = $('.lightbox__nav--prev', lb);
  const lbNext = $('.lightbox__nav--next', lb);

  let lbList = [];
  let lbIndex = 0;

  function openLB(idx) {
    lbList = items.filter(it => !it.classList.contains('is-hidden'));
    lbIndex = Math.max(0, lbList.indexOf(items[idx]));
    if (lbIndex < 0) lbIndex = 0;
    showLB();
    lb.removeAttribute('hidden');
    requestAnimationFrame(() => lb.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  }
  function showLB() {
    const it = lbList[lbIndex];
    if (!it) return;
    const img = it.querySelector('img');
    lbImg.src = it.getAttribute('href');
    lbImg.alt = img ? img.alt : '';
  }
  function closeLB() {
    lb.classList.remove('is-open');
    setTimeout(() => { lb.setAttribute('hidden', ''); lbImg.src = ''; }, 250);
    document.body.style.overflow = '';
  }
  function lbStep(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLB(); }

  items.forEach((it, i) => {
    it.addEventListener('click', (e) => { e.preventDefault(); openLB(i); });
  });
  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', () => lbStep(-1));
  lbNext.addEventListener('click', () => lbStep(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') lbStep(-1);
    if (e.key === 'ArrowRight') lbStep(1);
  });

  /* =========================================================
     REVIEWS carousel: scroll-snap + dots + nav buttons
     ========================================================= */
  const rTrack = $('#reviews-track');
  const rPrev = $('.reviews__nav--prev');
  const rNext = $('.reviews__nav--next');
  const rDots = $('#reviews-dots');

  if (rTrack) {
    const cards = $$('.review', rTrack);

    // Build dots based on visible page count
    function rebuildDots() {
      const perView = Math.max(1, Math.round(rTrack.clientWidth / cards[0].clientWidth));
      const pages = Math.max(1, cards.length - perView + 1);
      rDots.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to review ${i + 1}`);
        b.addEventListener('click', () => scrollToCard(i));
        rDots.appendChild(b);
      }
      syncDots();
    }
    function scrollToCard(i) {
      const target = cards[i];
      if (!target) return;
      rTrack.scrollTo({ left: target.offsetLeft - rTrack.offsetLeft, behavior: 'smooth' });
    }
    function syncDots() {
      const dots = $$('button', rDots);
      if (!dots.length) return;
      const idx = Math.round(rTrack.scrollLeft / cards[0].clientWidth);
      dots.forEach((d, i) => d.classList.toggle('is-active', i === clamp(idx, 0, dots.length - 1)));
    }

    rPrev && rPrev.addEventListener('click', () => rTrack.scrollBy({ left: -cards[0].clientWidth - 22, behavior: 'smooth' }));
    rNext && rNext.addEventListener('click', () => rTrack.scrollBy({ left:  cards[0].clientWidth + 22, behavior: 'smooth' }));
    rTrack.addEventListener('scroll', syncDots, { passive: true });

    rebuildDots();
    window.addEventListener('resize', rebuildDots);

    // Auto-advance (pause on hover)
    let auto = setInterval(() => {
      const nearEnd = rTrack.scrollLeft + rTrack.clientWidth >= rTrack.scrollWidth - 10;
      if (nearEnd) rTrack.scrollTo({ left: 0, behavior: 'smooth' });
      else rTrack.scrollBy({ left: cards[0].clientWidth + 22, behavior: 'smooth' });
    }, 6500);
    rTrack.addEventListener('mouseenter', () => clearInterval(auto));
  }

  /* =========================================================
     QUOTE FORM (client-side)
     ========================================================= */
  const form = $('#quoteForm');
  const success = $('#quoteSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#qf-name').value.trim();
      const phone = $('#qf-phone').value.trim();
      const email = $('#qf-email').value.trim();
      if (!name || !phone || !email) {
        // soft prompt
        [['#qf-name', name], ['#qf-phone', phone], ['#qf-email', email]].forEach(([sel, val]) => {
          const f = $(sel);
          if (!val) { f.style.borderColor = '#ef4444'; f.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.15)'; }
          else { f.style.borderColor = ''; f.style.boxShadow = ''; }
        });
        return;
      }
      success.removeAttribute('hidden');
      form.querySelector('button[type="submit"]').setAttribute('disabled', 'true');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // In production: POST to backend / GHL webhook here.
    });
  }

  /* =========================================================
     STICKY MOBILE CTA visibility (show after scrolling past hero)
     ========================================================= */
  const stickyCTA = $('.sticky-cta');
  if (stickyCTA) {
    const hero = $('.hero');
    const handle = () => {
      if (!hero) return;
      const passed = (hero.getBoundingClientRect().bottom < 80);
      stickyCTA.classList.toggle('is-visible', passed && window.scrollY < (document.documentElement.scrollHeight - window.innerHeight - 600));
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
  }

})();
