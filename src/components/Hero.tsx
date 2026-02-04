import { motion } from "framer-motion";
import pitiImage from "../assets/piti.png";
import { Grid12Background } from "./Background";

// Hoisted SVG icons
const LocationIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const ScrollArrow = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const ContactArrowIcon = (
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

function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-28 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <Grid12Background />

      {/* Decorative floating elements - hidden on mobile */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-20 h-20 border border-[rgb(201,188,63)]/20 rounded-full hidden sm:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[25%] right-[15%] w-3 h-3 bg-[rgb(201,188,63)]/30 rounded-full hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[30%] left-[8%] w-12 h-12 border border-[#D0CBC6]/40 rotate-45 hidden md:block"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 45 }}
        transition={{ duration: 1, delay: 1.4 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[20%] right-[12%] w-6 h-6 bg-[rgb(201,188,63)]/10 rounded-full hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        aria-hidden="true"
      />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Photo with enhanced treatment */}
          <motion.div
            className="relative mb-6 sm:mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated rings around photo - simplified on mobile */}
            <motion.div
              className="absolute -inset-3 sm:-inset-4 border border-[rgb(201,188,63)]/20 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -inset-6 sm:-inset-8 border border-[#D0CBC6]/30 rounded-full hidden sm:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              aria-hidden="true"
            />

            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[rgb(201,188,63)]/20 to-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
              <img
                src={pitiImage}
                alt="Foto de perfil de Rosario Alzueta, Diseñadora de Producto"
                width={144}
                height={144}
                loading="eager"
                className="relative w-full h-full object-cover object-top rounded-full grayscale-[20%] border-2 sm:border-3 border-white shadow-xl"
              />
            </div>
          </motion.div>

          {/* Main title with creative layout */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="overflow-hidden">
              <motion.h1
                id="hero-title"
                className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-light text-[#2D2D2D] tracking-tight leading-[1.05]"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Product
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-1 pb-1">
              <motion.span
                className="block text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-light text-[#2D2D2D] leading-[1.05]"
                aria-hidden="true"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Designer
                <motion.span
                  className="text-[rgb(201,188,63)] inline-block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1, ease: "backOut" }}
                >
                  .
                </motion.span>
              </motion.span>
              <span className="sr-only">Product Designer</span>
            </div>
          </div>

          {/* Animated divider */}
          <motion.div
            className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[rgb(201,188,63)] to-transparent mb-5 sm:mb-6 md:mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            aria-hidden="true"
          />

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#6B6B6B] font-light leading-[1.6] sm:leading-relaxed max-w-[280px] sm:max-w-lg md:max-w-2xl mb-8 sm:mb-10 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <span className="block sm:inline">Diseño experiencias digitales</span>
            {" "}
            <span className="block sm:inline">
              que{" "}
              <span className="text-[rgb(201,188,63)] font-normal relative inline-block group/conectan cursor-default">
                conectan
                <span
                  className="absolute left-0 bottom-0 w-0 h-0.5 bg-[rgb(201,188,63)] transition-all duration-500 ease-out group-hover/conectan:w-full"
                  aria-hidden="true"
                />
              </span>
              {" "}con las personas.
            </span>
          </motion.p>

          {/* Location & Availability */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            role="contentinfo"
            aria-label="Información de ubicación y disponibilidad"
          >
            <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              {LocationIcon}
              <span>Tandil, Argentina</span>
            </div>

            <span className="hidden sm:inline text-[#D0CBC6]" aria-hidden="true">·</span>

            <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                <span className="sr-only">Estado: </span>
                Disponible para proyectos
              </span>
            </div>
          </motion.div>

          {/* Mobile Contact Button */}
          <motion.a
            href="mailto:rosarioalzueta@gmail.com"
            className="group mt-10 sm:hidden flex items-center gap-2 px-5 py-2.5 bg-[rgb(201,188,63)] hover:bg-[rgb(161,148,23)] text-[#2D2D2D] text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(201,188,63)]/25 ring-1 ring-transparent hover:ring-[rgb(201,188,63)] ring-offset-[4px] ring-offset-[#F5F0EB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Contactar
            {ContactArrowIcon}
          </motion.a>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#9A9A9A] hidden sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {ScrollArrow}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
