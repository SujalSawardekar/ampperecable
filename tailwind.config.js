/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#15283a', // rgb(21, 40, 58)
        'icon-color': '#ae1b19',   // rgb(174, 27, 25)
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'open-sans': ['"Open Sans"', 'sans-serif'],
        'coolvetica': ['Coolvetica', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
        'gradient-animation': 'gradient 5s ease infinite',
        'borderRun': 'borderColorChange 2s linear',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate(0)' },
          '100%': { transform: 'translate(-50%)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        borderColorChange: {
          '0%': { 'border-color': '#00f' },
          '100%': { 'border-color': '#ae1b1b' },
        }
      }
    },
  },
  plugins: [],
}

