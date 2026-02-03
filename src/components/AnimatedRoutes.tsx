import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import PageTransition from "./PageTransition";

// Lazy load heavy pages for better initial bundle size
const Project = lazy(() => import("../pages/Project"));
const Acerca = lazy(() => import("../pages/Acerca"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F5F0EB]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-[rgb(201,188,63)] border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-[#6B6B6B]">Cargando...</span>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <Suspense fallback={<PageLoader />}>
              <PageTransition>
                <Project />
              </PageTransition>
            </Suspense>
          }
        />
        <Route
          path="/acerca"
          element={
            <Suspense fallback={<PageLoader />}>
              <PageTransition>
                <Acerca />
              </PageTransition>
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
