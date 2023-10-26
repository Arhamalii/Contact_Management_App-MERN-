/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#384152",
        hoverSecondary: "#284152",
      },
      boxShadow: {
        "3xl": " 0px 1px 15px 1px rgba(102, 102, 102, 0.42)",
      },
    },
  },
  plugins: [],
};
