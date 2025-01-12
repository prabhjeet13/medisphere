/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens : {
      "middle" : "932px",
      "navbar" : "828px",
      "doctor-div" : "1147px",
      "sidebar" : "790px",
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

