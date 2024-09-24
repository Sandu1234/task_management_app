/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Add this line to ensure Tailwind scans your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
