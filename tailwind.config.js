/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx}"],
  important:"#root",
  theme: {
    extend: {
      zIndex: {
        '30': '30',
      },
      colors: {
        primary: '#FEE715', // Yellow
        secondary: '#101820', // Black
        accent: '#808080', // Gray
        background: '#FFFFFF', // White
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.mix-blend-subtract': {
          'mix-blend-mode': 'subtract',
        },
      });
    },
  ],
}

