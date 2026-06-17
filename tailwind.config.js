/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        neon: {
          green: '#00ff9d',
          cyan: '#00e5ff',
          purple: '#bf00ff',
          pink: '#ff0080',
        },
        dark: {
          900: '#050810',
          800: '#090d1a',
          700: '#0d1224',
          600: '#111827',
          500: '#1a2332',
          400: '#243044',
        }
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00ff9d, 0 0 10px #00ff9d' },
          '50%': { boxShadow: '0 0 20px #00ff9d, 0 0 40px #00ff9d, 0 0 60px #00ff9d' },
        },
        scanLine: {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    }
  },
  plugins: [],
}
