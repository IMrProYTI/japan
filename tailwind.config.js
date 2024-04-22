/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        aspectRatio: {
          'vk-logo': '128/22.25',
          '4/3': '4/3'
        }
      }
    },
  },
  plugins: [],
}

