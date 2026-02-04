import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  PanInfo,
} from "framer-motion";
import { Grid12Background } from "./Background";

import dishappImg from "../assets/portadas/dishapp.png";
import easybankImg from "../assets/portadas/easybank.png";
import fluenceImg from "../assets/portadas/fluence.png";
import serviyaImg from "../assets/portadas/serviya.png";
import smilesImg from "../assets/portadas/smiles.png";
import puertaPuertaImg from "../assets/portadas/puerta-puerta.png";
import activaImg from "../assets/portadas/activa.png";

const ArrowIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="text-white"
  >
    <path
      d="M4 12L12 4M12 4H6M12 4V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const behanceProjects = [
  {
    id: "behance-1",
    title: "Fluence",
    company: "App Educativa",
    year: "2022",
    image: fluenceImg,
    behanceUrl: "https://www.behance.net/gallery/189850797/Fluence-App",
  },
  {
    id: "behance-2",
    title: "Dishapp",
    company: "App de Recetas",
    year: "2022",
    image: dishappImg,
    behanceUrl: "https://www.behance.net/gallery/212011445/DishApp",
  },
  {
    id: "behance-3",
    title: "Puerta a Puerta",
    company: "App de Delivery",
    year: "2024",
    image: puertaPuertaImg,
    behanceUrl: "https://www.behance.net/gallery/209849457/PuertaAPuerta",
  },
  {
    id: "behance-4",
    title: "Smiles",
    company: "Web Design",
    year: "2023",
    image: smilesImg,
    behanceUrl: "https://www.behance.net/gallery/186791569/Case-Study-Smiles",
  },
  {
    id: "behance-5",
    title: "Activa",
    company: "Plataforma Fitness",
    year: "2024",
    image: activaImg,
    behanceUrl: "https://www.behance.net/gallery/181445803/App-ACTIVA",
  },
  {
    id: "behance-6",
    title: "Educación Financiera",
    company: "Plataforma para Niños",
    year: "2022",
    image: easybankImg,
    behanceUrl:
      "https://www.behance.net/gallery/206378525/Plataforma-educacion-financiera-para-ninos",
  },
  {
    id: "behance-7",
    title: "Servi YA",
    company: "Plataforma de Servicios",
    year: "2024",
    image: serviyaImg,
    behanceUrl:
      "https://www.behance.net/gallery/193444433/Servi-YA-Plataforma-de-servicios",
  },
];

function ProjectCard({ project }: { project: (typeof behanceProjects)[0] }) {
  return (
    <a
      href={project.behanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-4 rounded-2xl"
      aria-label={`${project.title} - ${project.company}, ${project.year}. Se abre en Behance.`}
    >
      <article className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] md:h-[320px] transition-all duration-300 group-hover:ring-2 group-hover:ring-[rgb(218,207,103)] group-hover:ring-offset-4 group-hover:ring-offset-[#F5F0EB]">
        <img
          src={project.image}
          alt=""
          width={400}
          height={320}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[rgb(201,188,63)]/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-white mb-1 leading-tight">
                {project.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">{project.company}</span>
                {project.year && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-sm text-white/50">
                      {project.year}
                    </span>
                  </>
                )}
              </div>
            </div>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[rgb(201,188,63)] transition-transform duration-300 group-hover:scale-110">
              {ArrowIcon}
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}

function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerPage(1);
      } else if (width < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  return cardsPerPage;
}

function ProjectsList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const cardsPerPage = useCardsPerPage();
  const gap = 24;
  const totalProjects = behanceProjects.length;
  const maxIndex = Math.max(0, totalProjects - cardsPerPage);

  // Motion values for smooth dragging
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, { stiffness: 400, damping: 40 });

  // Calculate dimensions
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const cardWidth =
    containerWidth > 0
      ? (containerWidth - gap * (cardsPerPage - 1)) / cardsPerPage
      : 300;

  const getTranslateX = () => {
    return -(currentIndex * (cardWidth + gap));
  };

  const x = useTransform(dragXSpring, (latest) => getTranslateX() + latest);

  const progress = maxIndex > 0 ? currentIndex / maxIndex : 0;

  const goToIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);
      dragX.set(0);
    },
    [maxIndex, dragX],
  );

  const nextSlide = useCallback(() => {
    if (currentIndex >= maxIndex) {
      goToIndex(0); // Loop al principio
    } else {
      goToIndex(currentIndex + 1);
    }
  }, [currentIndex, maxIndex, goToIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex <= 0) {
      goToIndex(maxIndex); // Loop al final
    } else {
      goToIndex(currentIndex - 1);
    }
  }, [currentIndex, maxIndex, goToIndex]);

  // Handle drag end
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = cardWidth / 3;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      nextSlide();
    } else if (offset > threshold || velocity > 500) {
      prevSlide();
    } else {
      dragX.set(0);
    }
  };

  // Auto-play
  useEffect(() => {
    if (isHovering || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering, maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Calculate visible dots for pagination
  const totalDots = maxIndex + 1;

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24">
      <Grid12Background />

      <div
        className="relative z-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10 md:mb-14">
          <div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2D2D2D] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Otros proyectos
            </motion.h2>
            <motion.p
              className="mt-2 sm:mt-3 text-[#6B6B6B] text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Explorá más trabajos en Behance
            </motion.p>
          </div>

          {/* Desktop Navigation */}
          {maxIndex > 0 && (
            <motion.div
              className="hidden sm:flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Page indicator */}
              <div className="flex items-center gap-3 mr-2">
                <span className="text-sm font-medium text-[rgb(201,188,63)] tabular-nums">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <div className="w-12 h-[2px] bg-[#E0DBD6] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[rgb(201,188,63)] origin-left"
                    animate={{ scaleX: progress }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="text-sm text-[#9A9A9A] tabular-nums">
                  {String(totalDots).padStart(2, "0")}
                </span>
              </div>

              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] transition-all duration-300 hover:border-[rgb(201,188,63)] hover:text-[rgb(201,188,63)] hover:bg-[rgb(201,188,63)]/5"
                  aria-label="Anterior"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] transition-all duration-300 hover:border-[rgb(201,188,63)] hover:text-[rgb(201,188,63)] hover:bg-[rgb(201,188,63)]/5"
                  aria-label="Siguiente"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Carousel */}
        <div className="relative -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-hidden">
          <div ref={containerRef}>
            <motion.div
              className="flex py-5 cursor-grab active:cursor-grabbing"
              style={{ x, gap, touchAction: "none" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDrag={(_, info) => dragX.set(info.offset.x)}
              onDragEnd={handleDragEnd}
              onDragStart={() => dragX.set(0)}
            >
              {behanceProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="flex-shrink-0"
                  style={{ width: cardWidth }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index * 0.1, 0.3),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile pagination dots */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-3 mt-8 sm:hidden">
            <button
              onClick={prevSlide}
              className="w-9 h-9 rounded-full border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] transition-all duration-300 hover:border-[rgb(201,188,63)] hover:text-[rgb(201,188,63)]"
              aria-label="Anterior"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalDots }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 h-2 bg-[rgb(201,188,63)]"
                      : "w-2 h-2 bg-[#D0CBC6]"
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-9 h-9 rounded-full border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] transition-all duration-300 hover:border-[rgb(201,188,63)] hover:text-[rgb(201,188,63)]"
              aria-label="Siguiente"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsList;
