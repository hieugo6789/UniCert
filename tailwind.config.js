
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        },
        float: {
          "100%": { transform: "translateY(20px)" },
        },
      },
      animation: {

        'gradient': 'gradient 8s linear infinite',
        float: "float 1s infinite ease-in-out alternate",
      },
      zIndex: {
        100: "100",
        90: "90",
      },
    },
  },
  plugins: [],
};
