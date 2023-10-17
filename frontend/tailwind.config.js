/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,vue,jsx,ts.tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      backgroundImage : {
        "home" : "url(/app-start-bg.jpg)"
      },
      colors: {
        "vtd-primary": colors.blue, //TDP colors
      }
    },
  },
  plugins: [],
}

