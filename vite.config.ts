import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Use esbuild for minification (default, no extra dependency needed)
    minify: "esbuild",
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["framer-motion"],
          "scroll-vendor": ["@studio-freight/lenis", "@studio-freight/react-lenis"],
        },
      },
    },
    // Disable source maps in production
    sourcemap: false,
    // Asset handling - inline assets smaller than 4kb
    assetsInlineLimit: 4096,
  },
  // Pre-bundle dependencies for faster dev server
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
  },
  // Improve CSS handling
  css: {
    devSourcemap: false,
  },
});
