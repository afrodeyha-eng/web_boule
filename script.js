(() => {
  // Mobile nav toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
    });
    mobileNav.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => mobileNav.classList.remove('is-open'));
    });
  }

  // Smooth scroll for data-scroll-to buttons
  document.querySelectorAll('[data-scroll-to]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = document.querySelector(el.getAttribute('data-scroll-to'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // KPI accordion
  document.querySelectorAll('.kpi-card').forEach((card) => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');
      document.querySelectorAll('.kpi-card').forEach((c) => c.classList.remove('is-open'));
      if (!isOpen) card.classList.add('is-open');
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
})();
