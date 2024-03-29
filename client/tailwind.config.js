/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#233169",
        secondary: "#5C6BEC",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      spacing: {
        maxwidth: "1100px",
      },
    },
  },
  plugins: [],
};
