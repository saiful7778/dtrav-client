/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#F97150",
        secondry: "#E85E34",
        third: "#FFA11A",
      },
      width: {
        90: "90%",
      },
    },
  },
  plugins: [],
};
