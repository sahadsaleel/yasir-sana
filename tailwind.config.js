/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        cursive: ['Great Vibes', 'cursive'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        kraft: '#B5813A',
        ivory: '#F5F0E8',
        bronze: '#8B5E2A',
        gold: '#C49A4A',
        espresso: '#3D2610',
        taupe: '#A08060',
        beige: '#D4C4A8',
        cream: '#FAF6EE',
      },
    },
  },
  plugins: [],
};
