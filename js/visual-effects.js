'use strict';

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -9999, y: -9999 };
    this.particleCount = this.getParticleCount();
    this.init();
  }

  getParticleCount() {
    return window.innerWidth < 768 ? 40 : 80;
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.7 ? '#00ff9d' : Math.random() > 0.5 ? '#00e5ff' : '#bf00ff',
      pulse: Math.random() * Math.PI * 2,
    };
  }

  bindEvents() {
    window.addEventListener('resize', throttle(() => {
      this.resize();
      this.particleCount = this.getParticleCount();
      this.createParticles();
    }, 200));

    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.12;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 255, 157, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = ((100 - dist) / 100) * 0.6;
        p.vx += (dx / dist) * force * 0.05;
        p.vy += (dy / dist) * force * 0.05;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawConnections();

    this.particles.forEach((p) => {
      const pulsed = p.opacity + Math.sin(p.pulse) * 0.15;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color.replace(')', `, ${Math.max(0, pulsed)})`).replace('rgb', 'rgba');
      this.ctx.globalAlpha = Math.max(0, pulsed);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

class TypeWriter {
  constructor(elementId, phrases, options = {}) {
    this.el = document.getElementById(elementId);
    if (!this.el) return;
    this.phrases = phrases;
    this.typeSpeed = options.typeSpeed || 60;
    this.deleteSpeed = options.deleteSpeed || 35;
    this.pauseTime = options.pauseTime || 1800;
    this.currentPhrase = 0;
    this.currentChar = 0;
    this.isDeleting = false;
    this.loop();
  }

  loop() {
    const full = this.phrases[this.currentPhrase];
    const displayed = this.isDeleting
      ? full.substring(0, this.currentChar - 1)
      : full.substring(0, this.currentChar + 1);

    this.el.textContent = displayed;

    if (!this.isDeleting && displayed === full) {
      setTimeout(() => {
        this.isDeleting = true;
        this.currentChar--;
        this.loop();
      }, this.pauseTime);
      return;
    }

    if (this.isDeleting && displayed === '') {
      this.isDeleting = false;
      this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
      this.currentChar = 0;
      setTimeout(() => this.loop(), 400);
      return;
    }

    this.currentChar = this.isDeleting ? this.currentChar - 1 : this.currentChar + 1;
    setTimeout(() => this.loop(), this.isDeleting ? this.deleteSpeed : this.typeSpeed);
  }
}

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  function updateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(updateGlow);
  }

  updateGlow();
}

function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = y * -6;
      const rotY = x * 6;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
    });
  });
}

function initStatCounters() {
  const stats = document.querySelectorAll('.stat-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.text-2xl');
        if (!numEl) return;
        const target = parseInt(numEl.textContent, 10);
        if (Number.isNaN(target)) return;

        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          numEl.textContent = current + (numEl.textContent.includes('+') ? '+' : '');
          if (current >= target) clearInterval(interval);
        }, 30);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach((s) => observer.observe(s));
}
