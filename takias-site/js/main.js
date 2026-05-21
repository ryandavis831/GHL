/* Takia's Cleaning Services — main.js
   Vanilla JS. Handles:
   - Nav scroll state + mobile menu
   - Reveal-on-scroll
   - Before/After sliders
   - Gallery filter + lightbox
   - Reviews carousel
   - Quote MODAL (open/close, focus, Escape, backdrop, pre-select service)
   - Multi-select dropdown (services needed)
   - File upload with drag/drop and selection summary
   - Quote form submit (client-side validation + success)
   - Sticky mobile CTA visibility
   - Footer year
*/
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  /* ---------- Footer year ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav: scroll state + mobile toggle ---------- */
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
    $$('a, button', navMobile).forEach(el => {
      el.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMobile.setAttribute('hidden', '');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
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
     ========================================================= */
  function buildSlider(el) {
    const beforeSrc = el.dataset.before;
    const afterSrc  = el.dataset.after;
    const aspect    = parseFloat(el.dataset.aspect || '1');

    el.style.aspectRatio = `1 / ${aspect}`;

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
      if (e.key === 'Home') { setPct(0); }
      if (e.key === 'End')  { setPct(100); }
    });
  }
  $$('.ba').forEach(buildSlider);

  /* =========================================================
     GALLERY: filter + lightbox
     ========================================================= */
  const chips = $$('.gallery__filter .chip');
  const items = $$('.g-item');
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
    // only restore overflow if modal isn't also open
    if (!document.body.classList.contains('modal-open')) document.body.style.overflow = '';
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
     REVIEWS carousel
     ========================================================= */
  const rTrack = $('#reviews-track');
  const rPrev = $('.reviews__nav--prev');
  const rNext = $('.reviews__nav--next');
  const rDots = $('#reviews-dots');

  if (rTrack) {
    const cards = $$('.review', rTrack);

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

    let auto = setInterval(() => {
      const nearEnd = rTrack.scrollLeft + rTrack.clientWidth >= rTrack.scrollWidth - 10;
      if (nearEnd) rTrack.scrollTo({ left: 0, behavior: 'smooth' });
      else rTrack.scrollBy({ left: cards[0].clientWidth + 22, behavior: 'smooth' });
    }, 6500);
    rTrack.addEventListener('mouseenter', () => clearInterval(auto));
  }

  /* =========================================================
     QUOTE MODAL — open/close + pre-select service
     ========================================================= */
  const modal = $('#quoteModal');
  const modalDialog = $('.modal__dialog', modal);
  let lastFocused = null;

  function openModal(preSelectService) {
    lastFocused = document.activeElement;
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    // Pre-select service if provided
    if (preSelectService) {
      const cb = $$('#qfServices input[type="checkbox"]')
        .find(c => c.value === preSelectService);
      if (cb && !cb.checked) {
        cb.checked = true;
        updateMultiButton();
      }
    }

    // focus first field
    setTimeout(() => {
      const focusable = modalDialog.querySelector('input, select, textarea, button');
      if (focusable) focusable.focus({ preventScroll: true });
    }, 150);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        try { lastFocused.focus({ preventScroll: true }); } catch (e) {}
      }
    }, 280);
  }

  // Any element with data-quote-open opens the modal
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-quote-open]');
    if (opener) {
      e.preventDefault();
      openModal(opener.dataset.service || null);
      return;
    }
    const closer = e.target.closest('[data-quote-close]');
    if (closer) {
      e.preventDefault();
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  /* =========================================================
     MULTI-SELECT (services needed)
     ========================================================= */
  const multi = $('#qfServices');
  const multiBtn = multi && $('.multi__btn', multi);
  const multiPanel = multi && $('.multi__panel', multi);
  const multiBtnText = multi && $('.multi__btn-text', multi);
  const hiddenServices = $('#qf-services');

  function updateMultiButton() {
    const checked = $$('input[type="checkbox"]', multiPanel).filter(c => c.checked);
    if (checked.length === 0) {
      multiBtnText.textContent = 'Choose services…';
      multiBtnText.classList.add('is-placeholder');
    } else if (checked.length <= 2) {
      multiBtnText.textContent = checked.map(c => c.value).join(', ');
      multiBtnText.classList.remove('is-placeholder');
    } else {
      multiBtnText.textContent = `${checked.length} services selected`;
      multiBtnText.classList.remove('is-placeholder');
    }
    hiddenServices.value = checked.map(c => c.value).join(', ');
  }

  if (multi) {
    updateMultiButton();
    multiBtn.addEventListener('click', () => {
      const open = multi.classList.toggle('is-open');
      multiBtn.setAttribute('aria-expanded', String(open));
      if (open) multiPanel.removeAttribute('hidden');
      else multiPanel.setAttribute('hidden', '');
    });
    $$('input[type="checkbox"]', multiPanel).forEach(cb => {
      cb.addEventListener('change', updateMultiButton);
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!multi.contains(e.target) && multi.classList.contains('is-open')) {
        multi.classList.remove('is-open');
        multiBtn.setAttribute('aria-expanded', 'false');
        multiPanel.setAttribute('hidden', '');
      }
    });
  }

  /* =========================================================
     FILE UPLOAD UI
     ========================================================= */
  const fileInput = $('#qf-photos');
  const fileBox   = fileInput && fileInput.closest('.filebox');
  const fileHint  = $('#qfPhotosHint');

  function updateFileHint() {
    if (!fileInput.files || !fileInput.files.length) {
      fileHint.textContent = 'JPG, PNG · multiple files allowed';
      return;
    }
    const n = fileInput.files.length;
    const names = Array.from(fileInput.files).slice(0, 2).map(f => f.name).join(', ');
    fileHint.textContent = n === 1 ? `${names}` : `${n} files selected — ${names}${n > 2 ? '…' : ''}`;
  }

  if (fileInput) {
    fileInput.addEventListener('change', updateFileHint);
    ['dragenter', 'dragover'].forEach(ev => {
      fileBox.addEventListener(ev, (e) => { e.preventDefault(); fileBox.classList.add('is-drag'); });
    });
    ['dragleave', 'drop'].forEach(ev => {
      fileBox.addEventListener(ev, (e) => { e.preventDefault(); fileBox.classList.remove('is-drag'); });
    });
    fileBox.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        updateFileHint();
      }
    });
  }

  /* =========================================================
     QUOTE FORM submit
     ========================================================= */
  const form = $('#quoteForm');
  const success = $('#quoteSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#qf-name').value.trim();
      const phone = $('#qf-phone').value.trim();
      const email = $('#qf-email').value.trim();
      const services = hiddenServices ? hiddenServices.value.trim() : '';

      const required = [
        ['#qf-name', name],
        ['#qf-phone', phone],
        ['#qf-email', email],
      ];
      let ok = true;
      required.forEach(([sel, val]) => {
        const f = $(sel);
        if (!val) { f.style.borderColor = '#ef4444'; f.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.15)'; ok = false; }
        else { f.style.borderColor = ''; f.style.boxShadow = ''; }
      });

      // services required
      if (multiBtn) {
        if (!services) { multiBtn.style.borderColor = '#ef4444'; multiBtn.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.15)'; ok = false; }
        else { multiBtn.style.borderColor = ''; multiBtn.style.boxShadow = ''; }
      }
      if (!ok) return;

      success.removeAttribute('hidden');
      form.querySelector('button[type="submit"]').setAttribute('disabled', 'true');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Hook: POST FormData(form) to your GHL webhook here.
    });
  }

  /* =========================================================
     STICKY MOBILE CTA visibility
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
