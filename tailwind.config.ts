import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#2d1b4e',
          900: '#4a2373',
          800: '#6b3aa0',
          700: '#7c3aed',
          600: '#9333ea',
          500: '#a855f7',
          400: '#c084fc',
          300: '#d8b4fe',
          200: '#e9d5ff',
          100: '#f3e8ff',
        },
        indigo: {
          950: '#312e81',
          900: '#3730a3',
        },
        blue: {
          900: '#1e3a8a',
          600: '#2563eb',
          300: '#93c5fd',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease both',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'float-cloud': 'float-cloud linear infinite',
        'gentle-float': 'gentle-float 6s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(8px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'float-cloud': {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(calc(100vw + 100%))',
          },
        },
        'gentle-float': {
    '0%': { transform: 'translateY(0px)' },
    '100%': { transform: 'translateY(-10px)' },
  },
      },
    },
  },
  plugins: [],
  };
export default config;