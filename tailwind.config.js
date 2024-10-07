/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "100%": { transform: "translateY(20px)" },
        },
      },
      animation: {
        float: "float 1s infinite ease-in-out alternate",
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [],
};
