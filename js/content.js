'use strict';

function initFooterClock() {
  const el = document.getElementById('footer-time');
  if (!el) return;

  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `last_active: ${h}:${m}:${s}`;
  }

  update();
  setInterval(update, 1000);
}

function initCardMouseTracking() {
  const cards = document.querySelectorAll('.contact-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

function initTerminalCTA() {
  const el = document.querySelector('.typing-cta');
  if (!el) return;

  const text = el.textContent;
  el.textContent = '';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let i = 0;
        const interval = setInterval(() => {
          el.textContent = text.substring(0, i + 1);
          i++;
          if (i >= text.length) clearInterval(interval);
        }, 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(el);
}
