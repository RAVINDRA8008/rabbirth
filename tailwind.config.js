/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FFFFFF',
          DEFAULT: '#FFFDF9',
          warm: '#FBF7F0',
          dark: '#F5EFE6',
        },
        blush: {
          light: '#FFF0F3',
          DEFAULT: '#FDE2E4',
          dark: '#FAD2E1',
          rose: '#F7CAD0',
        },
        rose: {
          gold: '#E8A598',
          vibrant: '#EE6055',
          deep: '#C9184A',
          berry: '#9A1750',
        },
        gold: {
          light: '#FDF6E2',
          DEFAULT: '#D4AF37',
          warm: '#C5A028',
          shimmer: '#F5D77F',
        },
        espresso: {
          DEFAULT: '#2D2424',
          soft: '#4A3B32',
          muted: '#7A6B63',
          light: '#A3968F',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'dreamy': '0 20px 45px -10px rgba(238, 96, 85, 0.15), 0 0 1px 1px rgba(212, 175, 55, 0.2)',
        'soft-float': '0 15px 35px -5px rgba(212, 175, 55, 0.18)',
        'cake-glow': '0 0 60px 10px rgba(253, 215, 127, 0.45)',
      }
    },
  },
  plugins: [],
}
