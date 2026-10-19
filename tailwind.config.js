/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // `md` is where the desktop layout (fixed 440px side nav) starts. It sits at
    // 1024px so tablets and landscape phones keep the mobile layout, which fits them.
    screens: {
      sm: "640px",
      md: "1024px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1536px",
    },
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
        // Project section theme tokens (values live in index.css .pj-theme-*)
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
        "ink-subtle": "rgb(var(--ink-subtle) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

