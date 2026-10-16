/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#f4f1ef",
        cotton: "#fffdfb",
        ink: "#353a3c",
        brand: "#3dbdd1",
        olive: "#3ba8b9",
        sage: "#e5f5f7",
        clay: "#d3937a",
        denim: "#657e87",
        mustard: "#e1b99f",
      },
      boxShadow: {
        soft: "0 24px 65px rgba(53, 58, 60, 0.16)",
        card: "0 12px 34px rgba(53, 58, 60, 0.08)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Nunito Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
