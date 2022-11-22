/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
  theme: {
    screens: { md: { max: "1200px" } },
  },
};
