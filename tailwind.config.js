/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', "serif"],
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FDFCF9",
      },
    },
  },
  plugins: [],
};
