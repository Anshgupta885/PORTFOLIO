'use strict';

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSkillBars();
    initActiveNav();
    initSmoothScroll();
    initBackToTop();
    initFooterClock();
    initCardMouseTracking();
    initTerminalCTA();
    initCardTilt();
    initStatCounters();

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      new ParticleSystem('particle-canvas');
      initCursorGlow();
    } else {
      const canvas = document.getElementById('particle-canvas');
      if (canvas) canvas.style.display = 'none';
    }

    new TypeWriter('typing-text', [
      'Full Stack Developer',
      'Problem Solver',
      'ML Enthusiast',
      'DSA Practitioner',
      'Building Cool Stuff 🚀',
    ], {
      typeSpeed: 65,
      deleteSpeed: 40,
      pauseTime: 1800,
    });

    console.log('%c👋 Hey developer!', 'color: #00ff9d; font-size: 18px; font-family: monospace; font-weight: bold;');
    console.log('%cThanks for peeking at the source. Want to collaborate? Reach out!', 'color: #00e5ff; font-family: monospace;');
    console.log('%c📧 youremail@gmail.com', 'color: #aaa; font-family: monospace;');
  });
}
