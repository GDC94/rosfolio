import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getFeaturedProjects, getProjectById } from "../../data/projects";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** "Siguiente proyecto" — same look as the expanded project cards on the home page. */
export default function NextProjectCard({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);
  if (!project) return null;

  const featuredIdx = getFeaturedProjects(4).findIndex((p) => p.id === projectId);
  const number = String(featuredIdx >= 0 ? featuredIdx + 1 : Number(projectId)).padStart(2, "0");

  return (
    <motion.div
      // Same footprint as the open card on the home grid: there the row also holds
      // four 72px pills (+12px gaps), and on mobile four 36px pills in a 68vh column.
      className="mt-20 md:mt-28 md:w-[calc(100%-336px)] mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="block type-overline uppercase text-ink-subtle mb-4">Siguiente proyecto</span>

      <Link
        to={`/project/${projectId}`}
        className="group relative block h-[calc(68vh-168px)] min-h-[300px] md:h-[58vh] rounded-[20px] md:rounded-[28px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-4"
        aria-label={`Ver proyecto: ${project.title}`}
      >
        <img
          src={project.homeImage || project.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: project.cardImagePosition ?? "center" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)" }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="hidden sm:inline type-overline text-white/50">Proyecto {number}</span>
            <span className="sm:hidden type-caption text-white/40 tracking-wide">{number}</span>
            {project.year && <span className="type-caption text-white/40 tabular-nums">{project.year}</span>}
          </div>

          <div>
            <p className="type-body-s text-white/55 mb-1.5">{project.company}</p>
            <h3 className="type-h2 text-white font-bold mb-3 sm:mb-5 leading-tight line-clamp-2">{project.title}</h3>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] group-hover:bg-[#333] text-white text-sm font-medium rounded-full transition-colors duration-200">
              Ver proyecto
              <ArrowIcon />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
