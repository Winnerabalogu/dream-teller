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
        // Soft browns mapped to purple for compatibility
        purple: {
          950: '#3d2817', // Deep warm brown
          900: '#4d3621', // Dark brown
          800: '#6b4e3d', // Medium-dark brown
          700: '#8b6f47', // Warm brown
          600: '#a68a5c', // Medium brown
          500: '#b89968', // Soft brown
          400: '#c9b086', // Light brown
          300: '#ddc9a3', // Cream-brown
          200: '#ede4d3', // Light cream
          100: '#f5f0e8', // Very light cream
        },
        // Cream/beige tones mapped to indigo
        indigo: {
          950: '#3d3426', // Deep warm neutral
          900: '#4d4232', // Dark neutral brown
          800: '#6b5d4a', // Medium brown-gray
          700: '#8b7d6a', // Warm taupe
          600: '#a69887', // Light taupe
          500: '#bfb5a4', // Soft taupe
          400: '#d4cdc0', // Light cream-taupe
          300: '#e6e2d9', // Warm cream
          200: '#f0ede6', // Light warm cream
          100: '#f8f6f2', // Off-white cream
        },
        // Soft warm accents mapped to blue
        blue: {
          900: '#5a4a3a', // Deep warm accent
          800: '#6b5b4a', // Dark warm accent
          700: '#8b7b6a', // Medium warm accent
          600: '#a69b88', // Soft warm accent
          500: '#b8ae9d', // Light warm accent
          400: '#cdc5b8', // Very light warm accent
          300: '#e0dcd3', // Cream accent
          200: '#ede9e3', // Light cream accent
          100: '#f5f3ef', // Very light cream
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'warm-gradient': 'linear-gradient(135deg, #f5f0e8 0%, #ede4d3 50%, #ddc9a3 100%)',
        'soft-brown': 'linear-gradient(135deg, #b89968 0%, #8b6f47 100%)',
      },
    },
  },
  plugins: [],
};

export default config;