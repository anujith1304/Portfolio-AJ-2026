/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        // Recoleta is the display face. It is commercial, so no files ship
        // here — see the note in src/css/input.css.
        //
        // "Ltt Recoleta" is first on purpose: it is the Latinotype release,
        // whose typographic family exposes a real weight-500 Medium. The
        // plain "Recoleta" family only resolves to a 400 and a 600 locally,
        // so asking it for 500 snaps back to the 400 Regular.
        serif: ['"Ltt Recoleta"', '"Recoleta"', '"Instrument Serif"', "serif"],
        sans: ["Satoshi", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FDFCF9",
      },
    },
  },
  plugins: [],
};
