/* =====================================================================
   ALVEX CREATIVE — Interaction layer
   Vanilla JS, no dependencies. Progressive enhancement only.
   ===================================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Mobile menu ---------------- */
  const toggle = document.querySelector('.nav__toggle');
  const body = document.body;

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
    body.style.overflow = open ? 'hidden' : '';
  }

  if (toggle) {
    toggle.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  }
  // Close on link click or Escape
  document.querySelectorAll('.mobile-menu a').forEach((a) =>
    a.addEventListener('click', () => setMenu(false))
  );
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });

  /* ---------------- Sticky nav: shadow + hide on scroll-down ---------------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 8);
      if (!body.classList.contains('menu-open')) {
        if (y > lastY && y > 320) nav.classList.add('is-hidden');
        else nav.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq__item').forEach((item) => {
    const btn = item.querySelector('.faq__q');
    const ans = item.querySelector('.faq__a');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Close siblings within same FAQ group for a clean accordion feel
      const group = item.closest('.faq');
      if (group) {
        group.querySelectorAll('.faq__item.is-open').forEach((other) => {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
            other.querySelector('.faq__a').style.maxHeight = null;
          }
        });
      }
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      ans.style.maxHeight = !isOpen ? ans.scrollHeight + 'px' : null;
    });
  });
  // Recompute open answer heights on resize
  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq__item.is-open .faq__a').forEach((ans) => {
      ans.style.maxHeight = ans.scrollHeight + 'px';
    });
  });

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Contact form (Formspree, AJAX) ---------------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    const defaultLabel = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', async (e) => {
      // If the form action still holds the placeholder, let it fall back gracefully
      const action = form.getAttribute('action') || '';
      const usingPlaceholder = action.includes('your-form-id') || action.trim() === '';

      e.preventDefault();
      if (status) { status.textContent = ''; status.className = 'form-status'; }

      if (usingPlaceholder) {
        if (status) {
          status.textContent = 'Form not yet connected — add your Formspree endpoint to go live. (See README.)';
          status.classList.add('is-error');
        }
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          form.reset();
          if (status) {
            status.textContent = "Thank you — your request is in. We'll be in touch within one business day.";
            status.classList.add('is-success');
          }
        } else {
          const data = await res.json().catch(() => ({}));
          const msg = data.errors ? data.errors.map((x) => x.message).join(', ')
                                  : 'Something went wrong. Please email us directly at enquiries@alvexcreative.com.';
          if (status) { status.textContent = msg; status.classList.add('is-error'); }
        }
      } catch (err) {
        if (status) {
          status.textContent = 'Network error — please try again, or email enquiries@alvexcreative.com.';
          status.classList.add('is-error');
        }
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = defaultLabel; }
      }
    });
  }
})();
