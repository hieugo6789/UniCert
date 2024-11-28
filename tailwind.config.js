const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(calendar|date-picker|button|ripple|spinner|date-input|popover).js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        gradient: {
          to: { "background-position": "200% center" },
        },
        float: {
          "100%": { transform: "translateY(20px)" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        float: "float 1s infinite ease-in-out alternate",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      zIndex: {
        100: "100",
        90: "90",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), nextui()],
};
