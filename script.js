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

  // Animated calls counter
  const counterEl = document.getElementById('callsCounter');
  if (counterEl) {
    const target = 89000;
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      counterEl.textContent = value.toLocaleString('es-AR') + (value >= target ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Live "active calls" ticker
  const activeCallsEl = document.getElementById('activeCalls');
  if (activeCallsEl) {
    setInterval(() => {
      activeCallsEl.textContent = String(24 + Math.floor(Math.random() * 9));
    }, 2200);
  }

  // KPI accordion
  document.querySelectorAll('.kpi-card').forEach((card) => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');
      document.querySelectorAll('.kpi-card').forEach((c) => c.classList.remove('is-open'));
      if (!isOpen) card.classList.add('is-open');
    });
  });

  // Services accordion
  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');
      document.querySelectorAll('.service-card').forEach((c) => c.classList.remove('is-open'));
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
