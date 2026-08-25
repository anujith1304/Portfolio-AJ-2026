/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        // Recoleta is the display face. It is a commercial font, so it is not
        // loaded from a CDN — drop the woff2 files into src/fonts/ and the
        // @font-face in input.css picks them up.
        serif: ['"Recoleta"', '"Instrument Serif"', "serif"],
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FDFCF9",
      },
    },
  },
  plugins: [],
};
