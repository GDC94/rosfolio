import { BrowserRouter } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { BGGrid } from "./components/Background";
import Preloader from "./components/Preloader";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[rgb(201,188,63)] focus:text-white focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <ReactLenis root>
        <BrowserRouter>
          <div className="relative min-h-screen">
            <div className="fixed inset-0 z-0">
              <BGGrid />
            </div>
            <div className="relative z-10">
              <ScrollToTop />
              <AnimatedRoutes />
            </div>
          </div>
        </BrowserRouter>
      </ReactLenis>
    </>
  );
}

export default App;
