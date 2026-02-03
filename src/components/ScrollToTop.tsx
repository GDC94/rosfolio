import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@studio-freight/react-lenis";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip scroll on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Delay scroll to sync with exit animation (overlay covers screen first)
    // The overlay animation takes ~0.7s, scroll happens while overlay is visible
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);

      // Also reset Lenis scroll if available
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }, 350); // Scroll happens mid-transition when overlay covers the screen

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;

