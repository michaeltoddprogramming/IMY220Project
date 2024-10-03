// tailwind.config.js
module.exports = {
  content: [
    '.src/**/*.{js,jsx,ts,tsx}',
    '.public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Passero One', 'sans-serif'],
      },
      colors: {
        primary: '#008584',
        secondary: '#006666',
      },
    },
  },
  plugins: [],
}