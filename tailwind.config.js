/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08070a',
          900: '#0c0a10',
          800: '#131018',
          700: '#1b1722',
          600: '#2a2330',
        },
        ivory: {
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#ebe5d6',
          300: '#ddd4c0',
        },
        champagne: {
          400: '#e8d5a8',
          500: '#d4b97e',
          600: '#c4a565',
          700: '#a88a4f',
        },
        burgundy: {
          500: '#8b3a4a',
          600: '#7a2f3f',
          700: '#6b2838',
          900: '#3d161f',
        },
        lavender: {
          300: '#c8b8d4',
          400: '#b8a6c8',
          500: '#a695b8',
        },
        gold: {
          400: '#e6c668',
          500: '#d4af37',
          600: '#b8941f',
        },
        silver: {
          400: '#c0c0c8',
          500: '#a0a0aa',
          600: '#808088',
        },
        blush: {
          200: '#f7dfe0',
          300: '#f0c4c9',
          400: '#e3a0ab',
          500: '#d17e8f',
          600: '#b85f74',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', 'ui-monospace', 'monospace'],
        script: ['"Caveat"', '"Segoe Script"', 'cursive'],
      },
      letterSpacing: {
        'ultra-wide': '0.35em',
        'ultra-wider': '0.5em',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'grain': 'grain 8s steps(10) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '20%': { transform: 'translate(-10%,5%)' },
          '30%': { transform: 'translate(5%,-10%)' },
          '40%': { transform: 'translate(-5%,10%)' },
          '50%': { transform: 'translate(-10%,5%)' },
          '60%': { transform: 'translate(10%,0%)' },
          '70%': { transform: 'translate(0%,10%)' },
          '80%': { transform: 'translate(-15%,0%)' },
          '90%': { transform: 'translate(10%,5%)' },
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
