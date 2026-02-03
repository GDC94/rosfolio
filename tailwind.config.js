/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "PP Neue Montreal",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        background: "rgb(20, 20, 20)",
        "gray-custom": "#929292",
        "surface": "#141414",
        "surface-light": "#e8e8e8",
      },
    },
  },
  plugins: [],
};

