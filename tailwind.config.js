/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#f8f3ea",
        cotton: "#fffdf8",
        ink: "#2d2a26",
        olive: "#7b8a67",
        sage: "#dfe7dc",
        clay: "#b96850",
        denim: "#637d8b",
        mustard: "#cda45e",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(45, 42, 38, 0.12)",
      },
      fontFamily: {
        sans: [
          "Inter",
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
