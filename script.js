/* ════════════════════════════════════════════════════
   DANIEL VOSTEFRID — Therapy Website Scripts
   - Scroll-triggered animations (IntersectionObserver)
   - Navbar behavior on scroll
   - Mobile menu toggle
   - Smooth anchor scroll with offset
════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM References ─────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = navMenu ? navMenu.querySelectorAll('a') : [];

  /* ════════════════════════════════════════════════
     1. NAVBAR — scroll behavior
  ════════════════════════════════════════════════ */
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  /* ════════════════════════════════════════════════
     2. MOBILE MENU — toggle
  ════════════════════════════════════════════════ */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      // Prevent background scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('is-open') &&
          !navMenu.contains(e.target) &&
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ════════════════════════════════════════════════
     3. SMOOTH SCROLL with navbar offset
  ════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();

      const navH = navbar ? navbar.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ════════════════════════════════════════════════
     4. SCROLL ANIMATIONS — IntersectionObserver
  ════════════════════════════════════════════════ */
  const animateEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window && animateEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve after animation fires (one-shot)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animateEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animateEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ════════════════════════════════════════════════
     5. HERO ENTRANCE — staggered on load
  ════════════════════════════════════════════════ */
  window.addEventListener('load', () => {
    // Trigger hero elements immediately with slight delay
    const heroEls = document.querySelectorAll('.hero [data-animate]');
    heroEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('is-visible');
      }, 150 + i * 200);
    });
  });

  /* ════════════════════════════════════════════════
     6. ACTIVE NAV LINK on scroll (highlight)
  ════════════════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.navbar__links a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.navbar__links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          allNavLinks.forEach(l => l.removeAttribute('style'));
          link.style.background = 'var(--blue-pale)';
          link.style.color = 'var(--blue-deep)';
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ════════════════════════════════════════════════
     7. LEAD MAGNET FORM
  ════════════════════════════════════════════════ */
  const leadForm = document.getElementById('leadMagnetForm');
  const leadSuccess = document.getElementById('leadMagnetSuccess');

  if (leadForm && leadSuccess) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('leadEmail').value.trim();
      const msg = 'שלום, אני מעוניין/ת לקבל את המדריך "שלום פנימי". כתובת האימייל שלי: ' + email;
      window.open('https://wa.me/972509591974?text=' + encodeURIComponent(msg), '_blank');
      leadForm.hidden = true;
      leadSuccess.hidden = false;
    });
  }

  /* ════════════════════════════════════════════════
     8. CONTACT FORM
  ════════════════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactFormSuccess');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name  = document.getElementById('contactName').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const areaEl = document.getElementById('contactArea');
      const areaMap = { personal: 'טיפול אישי', soldier: 'חייל/מילואימניק', workshop: 'סדנה קבוצתית' };
      const areaLabel = areaMap[areaEl.value] || 'כללי';
      const msg = 'שלום, שמי ' + name + '. מספר טלפון: ' + phone + '. תחום עניין: ' + areaLabel + '.';
      window.open('https://wa.me/972509591974?text=' + encodeURIComponent(msg), '_blank');
      contactForm.hidden = true;
      contactSuccess.hidden = false;
    });
  }

})();
