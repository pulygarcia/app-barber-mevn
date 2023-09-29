/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./src/**/*.{js,vue,jsx,ts.tsx}"
  ],
  theme: {
    extend: {
      backgroundImage : {
        "home" : "url(/app-start-bg.jpg)"
      }
    },
  },
  plugins: [],
}

