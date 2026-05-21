/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'ocean-deep': '#0f172a',
        'ocean-blue': '#0369a1',
        'ocean-light': '#38bdf8',
        coral: '#f97316',
        sand: '#fef3c7',
      },
    },
  },
  plugins: [],
};
