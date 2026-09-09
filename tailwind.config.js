/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF9F2',
          100: '#FFF0DE',
          200: '#FFE1BD',
          300: '#FFCB91',
          400: '#FFAF60',
          500: '#F38B2B',
          600: '#D96F14',
          700: '#B05307',
          800: '#873D05',
          900: '#5C2802',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FFF9C4',
          200: '#FFF385',
          300: '#FFE847',
          400: '#FFDC19',
          500: '#E5BF00',
          600: '#B89900',
        },
        sage: {
          50: '#F3F8F5',
          100: '#E2EFE9',
          200: '#C2DEC6',
          300: '#94C39E',
          400: '#62A271',
          500: '#2D5A4C',
          600: '#22463B',
          700: '#17312A',
        },
        maroon: {
          100: '#FBE8EC',
          300: '#E59FB0',
          500: '#800020',
          700: '#5A0017',
          900: '#36000E',
        },
        cream: {
          50: '#FAF6F0',
          100: '#F4ECE1',
          200: '#EADBCA',
          300: '#DFCDB8',
          400: '#CFBA9F',
        }
      },
      fontFamily: {
        serif: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        cursive: ['"Alex Brush"', 'cursive'],
        handwritten: ['Caveat', '"Dancing Script"', 'cursive'],
      },
      backgroundImage: {
        'festive-gradient': 'linear-gradient(135deg, #FFF9F2 0%, #FFF0DE 50%, #F4ECE1 100%)',
        'saffron-gold-gradient': 'linear-gradient(135deg, #F38B2B 0%, #E5BF00 100%)',
        'dark-festive-gradient': 'linear-gradient(135deg, #1A1612 0%, #251E17 50%, #15110E 100%)',
      },
      animation: {
        'flame-flicker': 'flicker 3s infinite ease-in-out',
        'float-gentle': 'float 6s infinite ease-in-out',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95' },
          '50%': { transform: 'scale(1.08) rotate(1deg)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
