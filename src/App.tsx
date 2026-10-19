import { BrowserRouter, useLocation } from "react-router-dom";
import { ReactLenis } from "@studio-freight/react-lenis";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { BGGrid } from "./components/Background";
import Preloader from "./components/Preloader";
import AnimatedRoutes from "./components/AnimatedRoutes";
import TopBar from "./components/TopBar";
import SideNav from "./components/SideNav";
import ProjectSideNav from "./components/ProjectSideNav";

function NavSwitch() {
  const { pathname } = useLocation();
  return pathname.startsWith("/project/") ? <ProjectSideNav /> : <SideNav />;
}

// Grid background everywhere except case studies (their sections have solid backgrounds)
function GridBackground() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/project/")) return null;
  return (
    <div className="fixed inset-0 z-0">
      <BGGrid />
    </div>
  );
}

// Applies sidebar padding only on pages that are not the main scroll page.
// Project pages handle it per section so backgrounds can go edge to edge.
function ContentWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";
  const isProjectPage = pathname.startsWith("/project/");
  // Right padding mirrors the side nav only on wide screens; below that it would
  // squeeze the content column (e.g. 144px wide at 1024px).
  const paddingClass = isMainPage || isProjectPage ? "" : " md:pl-[440px] md:pr-[60px] xl:pr-[440px]";
  return (
    <div style={{ overflowX: "clip" }} className={`pt-10${paddingClass}`}>
      {children}
    </div>
  );
}

function App() {
  const skipPreloader = new URLSearchParams(window.location.search).has('skip-preloader');
  const [isLoading, setIsLoading] = useState(!skipPreloader);

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
            <GridBackground />
            <div className="relative z-10">
              <TopBar />
              <NavSwitch />
              <ContentWrapper>
                <ScrollToTop />
                <AnimatedRoutes />
              </ContentWrapper>
            </div>
          </div>
        </BrowserRouter>
      </ReactLenis>
    </>
  );
}

export default App;
