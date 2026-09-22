import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  company: string;
  year?: string;
  image: string;
  homeImage?: string;
  cardImagePosition?: string;
  externalUrl?: string;
}

interface ProjectsGridProps {
  projects: Project[];
  showComingSoon?: boolean;
}

const COMING_SOON: Project = {
  id: "__coming_soon__",
  title: "Educación financiera",
  company: "BBVA México",
  year: "En progreso",
  image: "",
};

function ComingSoonPill({ isActive, onClick, isMobile, collapsedSize }: { isActive: boolean; onClick: () => void; isMobile: boolean; collapsedSize: number }) {
  return (
    <motion.div
      layout
      className="relative rounded-[20px] md:rounded-[28px] overflow-hidden cursor-pointer border border-dashed border-[#D0CBC6] bg-[#F5F0EB]"
      style={{ flexGrow: isActive ? 1 : 0, flexBasis: isActive ? 0 : collapsedSize, flexShrink: 0 }}
      transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
      onClick={onClick}
    >
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center px-3"
          >
            {isMobile ? (
              <span className="text-[#9A9A9A] text-xs font-medium truncate select-none w-full">
                Próximamente
              </span>
            ) : (
              <span
                className="text-[#9A9A9A] text-xs font-medium whitespace-nowrap select-none"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Próximamente
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-2 border-[rgb(201,188,63)]/40 rotate-45"
            />
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9A9A9A] mb-3 block">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(201,188,63)] animate-pulse inline-block" />
                Próximamente
              </span>
              <h3 className="type-h3 font-light text-[#2D2D2D]">Proyecto de educación financiera</h3>
              <p className="type-body-s text-[#9A9A9A] mt-1">BBVA México · En progreso</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectsGrid({ projects, showComingSoon = true }: ProjectsGridProps) {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const items = showComingSoon ? projects.slice(0, 3) : projects;
  const allItems = showComingSoon ? [...items, COMING_SOON] : items;

  const collapsedSize = isMobile ? 44 : 72;
  const containerClass = isMobile
    ? "flex flex-col gap-2 h-[52vh]"
    : "flex flex-row gap-3 h-[58vh]";

  return (
    <section className="w-full" aria-labelledby="featured-projects-title">
      <h2 id="featured-projects-title" className="sr-only">Proyectos destacados</h2>

      <div className={containerClass}>
        {allItems.map((project, i) => {
          const isActive = active === i;
          const isComingSoon = project.id === "__coming_soon__";

          if (isComingSoon) {
            return <ComingSoonPill key={project.id} isActive={isActive} onClick={() => setActive(i)} isMobile={isMobile} collapsedSize={collapsedSize} />;
          }

          return (
            <motion.div
              key={project.id}
              layout
              className="relative rounded-[20px] md:rounded-[28px] overflow-hidden cursor-pointer"
              style={{ flexGrow: isActive ? 1 : 0, flexBasis: isActive ? 0 : collapsedSize, flexShrink: 0 }}
              transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
              onClick={() => setActive(i)}
            >
              {/* Background image */}
              <img
                src={project.homeImage || project.image}
                alt={isActive ? project.title : ""}
                aria-hidden={!isActive}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{
                  objectPosition: project.cardImagePosition ?? "center",
                  transform: isActive ? "scale(1)" : "scale(1.08)",
                }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)"
                    : "rgba(0,0,0,0.62)",
                }}
              />


              {/* PILL mode — vertical text (desktop) / horizontal text (mobile) */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center px-3"
                  >
                    {isMobile ? (
                      <span className="text-white/80 text-xs font-semibold truncate select-none w-full">
                        {project.title}
                      </span>
                    ) : (
                      <span
                        className="text-white/80 text-base font-semibold whitespace-nowrap select-none"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {project.title}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CARD mode — full content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.28 }}
                    className="absolute inset-0 flex flex-col justify-between p-7 sm:p-8"
                  >
                    {/* Top row */}
                    <div className="flex items-center justify-between">
                      <span className="type-overline text-white/50">
                        Proyecto 0{i + 1}
                      </span>
                      {project.year && (
                        <span className="type-caption text-white/40 tabular-nums">{project.year}</span>
                      )}
                    </div>

                    {/* Bottom content */}
                    <div>
                      <p className="type-body-s text-white/55 mb-1.5">{project.company}</p>
                      <h3 className="type-h2 text-white font-bold mb-6">
                        {project.title}
                      </h3>
                      {project.externalUrl ? (
                        <a
                          href={project.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-sm font-medium rounded-full transition-colors duration-200"
                        >
                          Ver en Behance
                          <ArrowIcon />
                        </a>
                      ) : (
                        <Link
                          to={`/project/${project.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-sm font-medium rounded-full transition-colors duration-200"
                        >
                          Ver proyecto
                          <ArrowIcon />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default ProjectsGrid;
