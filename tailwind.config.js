/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './admin.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': 'var(--color-deep-blue)',
        'ocean-teal': 'var(--color-ocean-teal)',
        'light-blue': 'var(--color-light-blue)',
        'amber': 'var(--color-amber)',
        'tuna-red': 'var(--color-accent)',
        'gold': 'var(--color-gold)',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'body': ['"Yu Gothic Medium"', '"YuGothic"', '"Inter"', 'sans-serif'],
      },
      screens: {
        'xs': '320px',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bubble': 'bubble 15s ease-in infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bubble: {
          '0%': { bottom: '-10%', opacity: '0' },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.3' },
          '100%': { bottom: '110%', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
