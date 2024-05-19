/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '256': '64rem',
      },
      height: {
        '128': '32rem',
        '256': '64rem',
      },
      brightness: {
        25: '.25',
      },
      fontFamily: {
        impact: 'Genshin Impact Font',
      },
    },
  },
  plugins: [],
}

