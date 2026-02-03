import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid12Background } from "./Background";

// Hoisted SVG icon - prevents recreation on each render
const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-white">
    <path
      d="M4 12L12 4M12 4H6M12 4V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Project {
  id: string;
  title: string;
  company: string;
  year?: string;
  image: string;
  homeImage?: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

// Scroll animation for the number
const ScrollNumber = ({ number, isHovered }: { number: number; isHovered: boolean }) => {
  return (
    <span className="inline-flex h-[1em] overflow-hidden relative align-baseline">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={isHovered ? "hover" : "idle"}
          initial={{ y: isHovered ? "100%" : "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block leading-none"
        >
          0{number}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Only show first 3 actual projects
  const activeProjects = projects.slice(0, 3);

  return (
    <section
      className="relative w-full py-12 sm:py-14 md:py-16"
      aria-labelledby="featured-projects-title"
    >
      {/* Visually hidden title for screen readers */}
      <h2 id="featured-projects-title" className="sr-only">
        Proyectos destacados
      </h2>

      <Grid12Background />

      <div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        role="list"
        aria-label="Lista de proyectos destacados"
      >
        {activeProjects.map((project, index) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-4 rounded-2xl"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
            role="listitem"
            aria-label={`${project.title} - ${project.company}${project.year ? `, ${project.year}` : ""}`}
          >
            {/* Project label */}
            <motion.div
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="text-sm font-medium text-[#6B6B6B] tracking-wide transition-all duration-300 group-hover:text-[#2D2D2D] group-focus-visible:text-[#2D2D2D] flex items-center gap-1.5">
                <span className="inline-block transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90" aria-hidden="true">+</span>
                <span aria-hidden="true">Proyecto </span>
                <ScrollNumber number={index + 1} isHovered={hoveredIndex === index} />
              </span>
              <div
                className="flex-1 h-[4px] bg-[repeating-linear-gradient(90deg,#D0CBC6_0px,#D0CBC6_1px,transparent_1px,transparent_4px)]"
                aria-hidden="true"
              />
            </motion.div>
            <article className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px] transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 group-hover:ring-2 group-hover:ring-[rgb(218,207,103)] group-hover:ring-offset-4 group-hover:ring-offset-[#F5F0EB]">
              {/* Full image background */}
              <img
                src={project.homeImage || project.image}
                alt=""
                width={600}
                height={480}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-focus-visible:scale-105"
                aria-hidden="true"
              />

              {/* Brand color overlay - visible by default, fades on hover */}
              <div className="absolute inset-0 bg-[rgb(201,188,63)]/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0" aria-hidden="true" />

              {/* Hover overlay with content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" aria-hidden="true" />

              {/* Content - visible on hover/focus */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-sm text-white/70">
                        {project.company}
                      </span>
                      {project.year && (
                        <>
                          <span className="text-white/30" aria-hidden="true">·</span>
                          <span className="text-sm text-white/50">
                            <span className="sr-only">Año: </span>
                            {project.year}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(201,188,63)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110"
                  >
                    {ArrowIcon}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}

        {/* Placeholder Card - Coming Soon */}
        <motion.article
          className="block"
          role="listitem"
          aria-label="Próximamente: Proyecto de educación financiera - BBVA México, 2023 - En progreso"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px] mt-[calc(1.25rem+12px)] border border-dashed border-[#D0CBC6] bg-transparent group hover:border-[rgb(201,188,63)]/40 transition-colors duration-500">

            {/* Animated grid pattern background */}
            <div className="absolute inset-0 opacity-[0.4]" aria-hidden="true">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="#D0CBC6" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-8 right-8 w-16 h-16 border border-[rgb(201,188,63)]/20 rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-12 left-8 w-8 h-8 bg-[rgb(201,188,63)]/10 rotate-45"
              animate={{ rotate: [45, 90, 45], scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-[rgb(201,188,63)]/30 rounded-full"
              animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-3 h-3 border border-[#D0CBC6] rounded-full"
              animate={{ y: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              aria-hidden="true"
            />

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              {/* Animated diamond icon */}
              <motion.div
                className="relative mb-6"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-12 h-12 border-2 border-[rgb(201,188,63)]/40 rotate-45 group-hover:border-[rgb(201,188,63)]/60 transition-colors duration-500" />
                <motion.div
                  className="absolute inset-2 bg-[rgb(201,188,63)]/10 rotate-45 group-hover:bg-[rgb(201,188,63)]/20 transition-colors duration-500"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Text */}
              <motion.span
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#9A9A9A] font-medium mb-3 px-3 py-1.5 rounded-full border border-[#D0CBC6]/60 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(201,188,63)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(201,188,63)]"></span>
                </span>
                Próximamente
              </motion.span>
              <motion.h3
                className="text-lg sm:text-xl md:text-2xl font-light text-[#2D2D2D] text-center leading-tight mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Proyecto de educación financiera
              </motion.h3>
              <motion.div
                className="flex items-center justify-center gap-2 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-[#6B6B6B]">BBVA México</span>
                <span className="text-[#D0CBC6]" aria-hidden="true">·</span>
                <span className="text-[#9A9A9A]">2023 - En progreso</span>
              </motion.div>

              {/* Animated line */}
              <motion.div
                className="mt-6 h-px bg-gradient-to-r from-transparent via-[rgb(201,188,63)]/40 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, delay: 1, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#D0CBC6]/40 group-hover:border-[rgb(201,188,63)]/40 transition-colors duration-500" aria-hidden="true" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#D0CBC6]/40 group-hover:border-[rgb(201,188,63)]/40 transition-colors duration-500" aria-hidden="true" />
          </div>
        </motion.article>
      </div>
    </section>
  );
}

export default ProjectsGrid;
