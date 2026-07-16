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

  // ===== Dashboard v2 ("Productividad") =====
  const dash2 = document.querySelector('.dash2');
  if (dash2) {
    // "Última actualización" clock
    const updatedEl = document.getElementById('dash2Updated');
    const setUpdated = () => {
      if (updatedEl) updatedEl.textContent = new Date().toLocaleString('es-AR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
    };
    setUpdated();
    setInterval(setUpdated, 30000);

    // Tabs (Por horas / Por días) — visual toggle only, same demo data
    document.querySelectorAll('.dash2-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.dash2-tab').forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      });
    });

    // Campaign radios — subtle re-trigger of the reveal animations for feedback
    document.querySelectorAll('.dash2-radio input').forEach((input) => {
      input.addEventListener('change', () => {
        document.querySelectorAll('.dash2-stat-value').forEach((el) => {
          el.dataset.animated = '';
        });
        animateDash2Stats();
      });
    });

    // Count-up stats + donut fill + line draw-in, triggered once in view
    let dash2Animated = false;
    function animateDash2Stats() {
      document.querySelectorAll('.dash2-stat-value').forEach((el) => {
        if (el.dataset.animated === '1') return;
        el.dataset.animated = '1';
        const target = parseFloat(el.getAttribute('data-count') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(target * eased);
          el.textContent = value.toLocaleString('es-AR') + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }

    const dash2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !dash2Animated) {
          dash2Animated = true;
          animateDash2Stats();
          document.querySelectorAll('.dash2-donut').forEach((d) => d.classList.add('is-visible'));
          document.querySelectorAll('.dash2-svg').forEach((s) => s.classList.add('is-visible'));
          dash2Observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    dash2Observer.observe(dash2);

    // "Live" jitter: nudge the last points of the multi-line charts every few seconds
    const jitterLines = ['dash2Multi1Y', 'dash2Multi1P', 'dash2Multi1O', 'dash2Multi1B', 'dash2Multi1R', 'dash2Multi1T',
      'dash2Multi2R', 'dash2Multi2O', 'dash2Multi2B', 'dash2Multi2T', 'dash2Multi2Y', 'dash2Multi2P'];
    const jitterDots = [
      { dot: 'dash2Multi1Dot', line: 'dash2Multi1T' },
      { dot: 'dash2Multi2Dot', line: 'dash2Multi2R' }
    ];

    function jitterOnce() {
      jitterLines.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const pts = el.getAttribute('points').trim().split(' ').map((p) => p.split(',').map(Number));
        const last = pts[pts.length - 1];
        last[1] = Math.max(10, Math.min(170, last[1] + (Math.random() * 6 - 3)));
        el.setAttribute('points', pts.map((p) => p.join(',')).join(' '));
      });
      jitterDots.forEach(({ dot, line }) => {
        const dotEl = document.getElementById(dot);
        const lineEl = document.getElementById(line);
        if (!dotEl || !lineEl) return;
        const pts = lineEl.getAttribute('points').trim().split(' ').map((p) => p.split(',').map(Number));
        const last = pts[pts.length - 1];
        dotEl.setAttribute('cy', last[1]);
      });
    }
    setInterval(jitterOnce, 2400);
  }
})();
