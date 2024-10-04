/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        lightning: ['Lightning', 'sans-serif'],
        liberation: ['Liberation', 'serif'],
        sans: ['Passero One', 'sans-serif']
      },
      colors: {
        primary: '#006666',
        secondary: '#008584',
      },
    },
  },
  plugins: [],
}

