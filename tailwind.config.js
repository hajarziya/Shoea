/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#212529",
        "light-gray": "#FAFAFA",
        "dark-gray": "#757475",
        "bg-gray": "#ECECEC;",
        "bg-product": "#F3F3F3",
        "dark-green-opacity": "#1D5A5Acc",
      },
      width: {
        128: "428px",
      },
      height: {
        128: "926px",
      },
      fontSize: {
        "4xl": "40px",
        "6xl": "72px",
      },
    },
  },
  plugins: [],
};
