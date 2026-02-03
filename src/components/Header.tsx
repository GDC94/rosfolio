import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hoisted SVG icons - prevents recreation on each render
const HomeIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </svg>
);

const AboutIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="8" cy="5" r="3" />
    <path d="M3 14c0-2.5 2.5-4 5-4s5 1.5 5 4" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  >
    <path
      d="M3 11L11 3M11 3H5M11 3V9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Inicio",
      path: "/",
      icon: HomeIcon
    },
    {
      label: "Acerca de mí",
      path: "/acerca",
      icon: AboutIcon
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto">
        {/* Main header container with glass effect */}
        <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/30 shadow-lg shadow-black/5 px-3 py-1.5">
          <div className="flex items-center justify-between">
            {/* Left side - Logo/Name */}
            <Link to="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
              <div className="w-7 h-7 rounded-full bg-[rgb(201,188,63)] flex items-center justify-center text-white text-xs font-semibold">
                R
              </div>
              <span className="text-[#2D2D2D] font-medium text-xs tracking-tight group-hover:text-[#6B6B6B] transition-colors duration-200">
                Rosario Alzueta
              </span>
            </Link>

            {/* Center - Navigation pill */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center bg-[#F5F0EB]/80 rounded-lg border border-[#E0DBD6] p-0.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-all duration-200 rounded-md ${
                        isActive
                          ? "text-[#2D2D2D] bg-white shadow-sm"
                          : "text-[#6B6B6B] hover:text-[#2D2D2D]"
                      }`}
                    >
                      <span className={isActive ? "text-[#2D2D2D]" : "text-[#9A9A9A]"}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right side - CTA */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Cerrar menu de navegacion" : "Abrir menu de navegacion"}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden px-4 py-2 text-sm font-medium text-[#2D2D2D] hover:text-[rgb(201,188,63)] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-2 rounded-lg"
              >
                {isMobileMenuOpen ? "Cerrar" : "Menu"}
              </button>

              {/* Contact button */}
              <a
                href="mailto:rosarioalzueta@gmail.com"
                className="group hidden md:flex items-center gap-2 px-5 py-2.5 bg-[rgb(201,188,63)] hover:bg-[rgb(161,148,23)] text-[#2D2D2D] text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(201,188,63)]/25 ring-1 ring-transparent hover:ring-[rgb(201,188,63)] ring-offset-[4px] ring-offset-white focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-2"
              >
                Contactar
                {ArrowIcon}
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <>
              {/* Backdrop with blur */}
              <motion.div
                className="fixed inset-0 bg-[#F5F0EB]/95 backdrop-blur-md md:hidden"
                style={{ zIndex: 60 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={closeMobileMenu}
              />
              
              {/* Menu Container */}
              <motion.div
                className="fixed inset-0 md:hidden flex flex-col"
                style={{ zIndex: 70 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close button - Top right */}
                <motion.button
                  onClick={closeMobileMenu}
                  aria-label="Cerrar menu"
                  className="absolute top-6 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-[#E0DBD6]/30 group hover:bg-white/80 transition-colors duration-200 z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#6B6B6B] group-hover:text-[#2D2D2D] transition-colors">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>

                {/* Header with Logo and Name */}
                <motion.div
                  className="pt-8 px-6 pb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[rgb(201,188,63)] flex items-center justify-center text-white text-lg font-semibold">
                      R
                    </div>
                    <div className="text-center">
                      <h2 className="text-lg font-medium text-[#2D2D2D] tracking-tight">Rosario Alzueta</h2>
                      <p className="text-xs text-[#9A9A9A] mt-0.5">Diseñadora de Producto</p>
                    </div>
                  </div>
                </motion.div>

                {/* Menu Content - Right after name */}
                <div className="px-6">
                  <nav className="w-full max-w-xs mx-auto space-y-1.5">
                    {navItems.map((item, index) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ 
                            delay: 0.1 + index * 0.05,
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                        >
                          <Link
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "text-[#2D2D2D] bg-[rgb(201,188,63)]/10"
                                : "text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-white/50"
                            }`}
                          >
                            <span
                              className={`flex-shrink-0 transition-colors duration-200 ${
                                isActive ? "text-[rgb(201,188,63)]" : "text-[#9A9A9A] group-hover:text-[rgb(201,188,63)]"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className={`text-sm font-medium flex-1 ${isActive ? "text-[#2D2D2D]" : ""}`}>
                              {item.label}
                            </span>
                            {isActive && (
                              <motion.div
                                className="w-1.5 h-1.5 rounded-full bg-[rgb(201,188,63)]"
                                layoutId="mobileActiveIndicator"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                    
                    {/* Contact CTA - Same style as header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ 
                        delay: 0.1 + navItems.length * 0.05,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="pt-3"
                    >
                      <a
                        href="mailto:rosarioalzueta@gmail.com"
                        onClick={closeMobileMenu}
                        className="group flex items-center gap-2 px-5 py-2.5 bg-[rgb(201,188,63)] hover:bg-[rgb(161,148,23)] text-[#2D2D2D] text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(201,188,63)]/25 ring-1 ring-transparent hover:ring-[rgb(201,188,63)] ring-offset-[4px] ring-offset-white focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-2"
                      >
                        Contactar
                        {ArrowIcon}
                      </a>
                    </motion.div>
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
