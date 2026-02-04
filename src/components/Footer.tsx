import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

// SVG Icons
const LinkedInIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const BehanceIcon = (
  <svg width="20" height="12" viewBox="0 0 22 14" fill="currentColor" aria-hidden="true">
    <path d="M6.5 0C8.98 0 10 1.54 10 3.38c0 1.31-.62 2.4-1.78 2.94 1.58.47 2.33 1.85 2.33 3.38 0 2.2-1.6 4.05-4.55 4.05H0V0h6.5zM2.5 5.5h3.18c1.18 0 1.82-.56 1.82-1.56 0-1.06-.64-1.44-1.82-1.44H2.5v3zm0 6h3.68c1.35 0 2.02-.67 2.02-1.75 0-1.17-.8-1.75-2.14-1.75H2.5v3.5zM14.5 1h6v1.5h-6V1zm3 12c-2.95 0-4.75-2.02-4.75-5.25 0-3.19 1.87-5.25 4.75-5.25 3.06 0 4.5 2.19 4.5 5v.75h-6.75c.1 1.83.9 2.75 2.38 2.75 1.05 0 1.72-.5 1.98-1.35h2.39c-.52 1.94-2.13 3.35-4.5 3.35zm2.12-6.25c-.08-1.3-.73-2.1-2.12-2.1-1.32 0-2.1.73-2.38 2.1h4.5z" />
  </svg>
);

const LocationIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ArrowIcon = (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowUpIcon = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Acerca de mí", href: "/acerca" },
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rosarioalzueta",
      icon: LinkedInIcon,
    },
    {
      label: "Behance",
      href: "https://www.behance.net/rosarioalzueta",
      icon: BehanceIcon,
    },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0DBD6] to-transparent" />

      {/* Main footer */}
      <div className="bg-gradient-to-b from-[#FAFAF8] to-[#F5F0EB] relative">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 max-w-7xl mx-auto">
          
          {/* CTA Section */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative element */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-[rgb(201,188,63)] rotate-45" />
                <div className="absolute -inset-2 border border-[rgb(201,188,63)]/30 rotate-45" />
              </div>
            </motion.div>

            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2D2D2D] mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              ¿Tenés un proyecto en mente?
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-[#6B6B6B] mb-10 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Me encantaría escuchar sobre tu próxima idea y cómo puedo ayudarte a hacerla realidad.
            </motion.p>

            <motion.a
              href="https://www.linkedin.com/messaging/compose/?recipient=rosarioalzueta"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[rgb(111,141,181)] hover:bg-[rgb(91,121,161)] text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(111,141,181)]/25 ring-1 ring-transparent hover:ring-[rgb(111,141,181)] ring-offset-4 ring-offset-white focus-visible:ring-2 focus-visible:ring-[rgb(111,141,181)] focus-visible:ring-offset-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Hablemos
              {ArrowIcon}
            </motion.a>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="relative mb-16"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-[#D0CBC6] to-transparent" />
          </motion.div>

          {/* Links Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Navigation */}
            <motion.div variants={itemVariants}>
              <p className="text-xs font-medium text-[rgb(201,188,63)] uppercase tracking-[0.2em] mb-6">
                Navegación
              </p>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[#6B6B6B] hover:text-[#2D2D2D] transition-all duration-300 text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[rgb(201,188,63)] group-hover:w-4 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants}>
              <p className="text-xs font-medium text-[rgb(201,188,63)] uppercase tracking-[0.2em] mb-6">
                Redes
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-11 h-11 rounded-xl bg-white border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] transition-all duration-300 hover:text-[rgb(201,188,63)] hover:border-[rgb(201,188,63)]/50 hover:bg-[rgb(201,188,63)]/5 hover:-translate-y-1 hover:shadow-lg hover:shadow-[rgb(201,188,63)]/10 focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-2"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Location & Availability */}
            <motion.div variants={itemVariants}>
              <p className="text-xs font-medium text-[rgb(201,188,63)] uppercase tracking-[0.2em] mb-6">
                Ubicación
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#9A9A9A]">
                    {LocationIcon}
                  </span>
                  <div>
                    <p className="text-sm text-[#2D2D2D] font-medium">Tandil, Argentina</p>
                    <p className="text-xs text-[#9A9A9A]">GMT-3</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-1">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-sm text-[#6B6B6B]">
                    Disponible para proyectos
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#2D2D2D]">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/60 text-xs">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rounded-full" />
              © 2026 Rosario Alzueta
            </span>
            
            <span className="hidden sm:inline text-white/40">
              Diseñado con dedicación
            </span>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] rounded px-2 py-1 -mx-2"
              aria-label="Volver al inicio"
            >
              <span>Volver arriba</span>
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                {ArrowUpIcon}
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
