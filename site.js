/* EnhanceGov — site.js */

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll state ──────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile hamburger ──────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    // Close on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll-triggered fade-up animations ───────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings inside same parent
          const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  // ── Accordion (sectors page) ───────────────────────────────
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-trigger').forEach(t => {
        t.classList.remove('open');
        t.nextElementSibling.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        trigger.classList.add('open');
        trigger.nextElementSibling.classList.add('open');
      }
    });
  });

});
