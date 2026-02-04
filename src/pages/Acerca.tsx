import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Grid12Background } from "../components/Background";
import pitiImage from "../assets/piti.png";

// Certificados
import certFundamentos from "../assets/certifications/fundamentos.png";
import certPrototipado from "../assets/certifications/prototipado.png";
import certUxAdvanced from "../assets/certifications/ux-advanced.png";
import certDisenio from "../assets/certifications/disenio.png";
import certArquitectura from "../assets/certifications/unlp.png";

// Logos de empresas
import xConsLogo from "../assets/companys/xcons.png";
import contextoLogo from "../assets/companys/contexto.png";
import sciLogo from "../assets/companys/sci.png";

// Evolución en XCONS
const xConsEvolution = {
  company: "XCONS",
  current: true,
  logo: xConsLogo,
  roles: [
    {
      year: "Dic 2025 - Actualidad",
      role: "Product Owner",
      description: [
        "Construcción y seguimiento del roadmap, alineando negocio, diseño y desarrollo para ordenar prioridades y minimizar cambios.",
        "Priorización del backlog y definición de milestones y releases, logrando entregas predecibles y alineadas con clientes.",
        "Creación y gestión de tickets funcionales con criterios de aceptación claros, reduciendo bugs y correcciones repetitivas.",
        "Toma de decisiones de producto de forma transversal con el equipo de desarrollo, compartiendo la complejidad del producto y considerando impacto y viabilidad técnica.",
        "Diseño de interfaces del e-commerce y del administrador, asegurando coherencia end-to-end.",
        "Validación de casos de uso, soporte a QA y seguimiento de releases, reduciendo tiempos de implementación y llegando a demos con margen para optimizaciones.",
      ],
      skills: [
        "Product Strategy",
        "Backlog Management",
        "Stakeholder Management",
      ],
    },
    {
      year: "Dic 2024 - Nov 2025",
      role: "Product Designer",
      description: [
        "Diseño end-to-end del panel administrador de XCONS, desarrollado desde cero como alternativa al backoffice estándar de Magento, mejorando la experiencia operativa y reduciendo fricción.",
        "Diseño de flujos, wireframes y prototipos de alta fidelidad en Figma, simplificando flujos complejos para usuarios no técnicos.",
        "Definición de una arquitectura de interfaz escalable basada en Ant Design, asegurando consistencia visual y funcional entre módulos.",
        "Diseño y evolución de módulos clave (presupuestos, pedidos, entregas, contactos, catálogo, pagos y envíos) junto con integraciones, automatizaciones y templates, logrando una mejoría en la eficiencia operativa y menor dependencia del soporte.",
        "Documentación funcional y clara (casos de uso, estados y validaciones) para reducir ambigüedades y acelerar la implementación.",
        "Seguimiento a la implementación y QA visual y funcional, para asegurar la coherencia diseño–producto y una salida a producción estable.",
      ],
      skills: ["Figma", "Ant Design", "Prototyping", "Documentation"],
    },
  ],
};

// Timeline data - otras experiencias
const experiencias = [
  {
    year: "2024",
    role: "UX/UI Designer",
    company: "Contexto - BBVA México",
    logo: contextoLogo,
    description: [
      "Diseño de herramientas digitales para productos educativos de finanzas personales, enfocadas en simplificar conceptos complejos mediante interfaces claras y accesibles.",
      "Diseño de simuladores de inversión, calculadoras interactivas y revistas digitales, adaptando flujos, reglas de negocio y jerarquía de información a distintos perfiles de usuario (niños, adolescentes, adultos y adultos mayores).",
      "Trabajo colaborativo con equipos de contenido, diseño gráfico y desarrollo, facilitando una implementación consistente y eficiente.",
      "Implementación de la nueva identidad visual de la marca en todos los recursos digitales, mejorando la coherencia, accesibilidad y percepción de calidad del producto.",
    ],
    skills: ["Fintech UX", "Design Systems", "Accessibility"],
  },
  {
    year: "2024",
    role: "UX/UI Designer",
    logo: sciLogo,
    company: "SCI - Supply Chain Institute",
    description: [
      "Diseño de herramientas digitales para productos educativos de finanzas personales, enfocadas en simplificar conceptos complejos mediante interfaces claras y accesibles.",
      "Diseño de simuladores de inversión, calculadoras interactivas y revistas digitales, adaptando flujos, reglas de negocio y jerarquía de información a distintos perfiles de usuario (niños, adolescentes, adultos y adultos mayores).",
      "Trabajo colaborativo con equipos de contenido, diseño gráfico y desarrollo, facilitando una implementación consistente y eficiente.",
      "Implementación de la nueva identidad visual de la marca en todos los recursos digitales, mejorando la coherencia, accesibilidad y percepción de calidad del producto.",
    ],
    skills: ["Enterprise UX", "Dashboard Design", "Data Visualization"],
  },
];

// Timeline data - educación
const educacion = [
  {
    year: "2025",
    title: "Fundamentos del diseño gráfico",
    institution: "Coderhouse",
    period: "Mar 2025 - May 2025",
    certificate: certFundamentos,
  },
  {
    year: "2024",
    title: "Prototipado en Figma",
    institution: "Coderhouse",
    period: "Jul 2024 - Sep 2024",
    certificate: certPrototipado,
  },
  {
    year: "2023",
    title: "Diseño UX/UI Avanzado",
    institution: "Coderhouse",
    period: "Sep 2023 - Dic 2023",
    certificate: certUxAdvanced,
  },
  {
    year: "2023",
    title: "Diseño UX/UI Inicial",
    institution: "Coderhouse",
    period: "Jul 2023 - Sep 2023",
    certificate: certDisenio,
  },
  {
    year: "2019",
    title: "Arquitectura",
    institution: "Universidad Nacional de La Plata",
    period: "Abr 2010 - Dic 2019",
    certificate: certArquitectura,
  },
];

function Acerca() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const [certificateModal, setCertificateModal] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: "",
    title: "",
  });

  return (
    <div className="min-h-screen relative">
      <Header />
      {/* Grid12Background positioned to cover from top, including under header */}
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <Grid12Background />
      </div>

      <main className="pt-20 sm:pt-24 md:pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Hero Section - Presentación Rediseñada */}
        <motion.section
          ref={heroRef}
          className="mb-16 sm:mb-20 md:mb-24 relative"
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative floating elements */}
          <motion.div
            className="absolute top-10 right-[10%] w-3 h-3 bg-[rgb(201,188,63)]/20 rotate-45"
            animate={{ rotate: [45, 90, 45], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-32 left-[5%] w-2 h-2 bg-[rgb(111,141,181)]/30 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main Hero Content */}
          <div className="relative">
            {/* Profile Section - Layout asimétrico */}
            <div className="relative py-8">
              {/* Content - Grid asimétrico */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-center">
                {/* Left - Photo */}
                <motion.div
                  className="lg:col-span-5 flex justify-center lg:justify-end"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative">
                    {/* Vertical accent line */}
                    <motion.div
                      className="absolute -left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgb(201,188,63)] to-transparent hidden lg:block"
                      initial={{ scaleY: 0 }}
                      animate={isHeroInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 1.2, delay: 0.6 }}
                    />

                    {/* Photo container */}
                    <div className="relative w-64 h-80 md:w-72 md:h-96">
                      {/* Shadow background */}
                      <div className="absolute inset-0 bg-[rgb(201,188,63)]/10 translate-x-4 translate-y-4 rounded-sm" />

                      {/* Decorative dots pattern */}
                      <motion.div
                        className="absolute -top-4 -right-4 grid grid-cols-3 gap-1.5"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1 }}
                      >
                        {[...Array(9)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-[rgb(201,188,63)]/40"
                          />
                        ))}
                      </motion.div>

                      {/* Main image with border */}
                      <div className="relative w-full h-full overflow-hidden border-2 border-white/80 shadow-xl">
                        <img
                          src={pitiImage}
                          alt="Rosario Alzueta"
                          loading="eager"
                          className="w-full h-full object-cover object-[50%_15%] grayscale-[15%]"
                        />

                        {/* Subtle overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                      </div>

                      {/* Corner accents - Top left */}
                      <motion.div
                        className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-[rgb(201,188,63)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      />

                      {/* Corner accents - Bottom right */}
                      <motion.div
                        className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-[rgb(111,141,181)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      />

                      {/* Decorative line bottom left */}
                      <motion.div
                        className="absolute -bottom-6 -left-2 w-12 h-[2px] bg-gradient-to-r from-[rgb(201,188,63)] to-transparent"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={isHeroInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.1 }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Right - Content */}
                <div className="lg:col-span-7">
                  {/* Label */}
                  <motion.div
                    className="flex items-center justify-center lg:justify-start gap-4 mb-6"
                    initial={{ opacity: 0 }}
                    animate={isHeroInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <motion.div
                      className="hidden lg:block h-[1px] w-12 bg-[rgb(201,188,63)] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={isHeroInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />
                    <span className="text-sm tracking-[0.2em] uppercase text-[#9A9A9A] font-medium">
                      Acerca de mí
                    </span>
                  </motion.div>

                  {/* Name */}
                  <div className="mb-6 text-center lg:text-left overflow-hidden pb-2">
                    <motion.h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2D2D2D] tracking-tight whitespace-nowrap"
                      initial={{ y: 80 }}
                      animate={isHeroInView ? { y: 0 } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Rosario Alzueta<span className="text-[rgb(201,188,63)]">.</span>
                    </motion.h1>
                  </div>

                  {/* About text */}
                  <motion.div
                    className="space-y-4 mb-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <p className="text-base md:text-lg text-[#4A4A4A] leading-relaxed">
                      Product Designer orientada a productos digitales y
                      sistemas complejos. Diseño experiencias claras para
                      <span className="text-[#2D2D2D] font-medium">
                        {" "}
                        usuarios{" "}
                      </span>{" "}
                      y
                      <span className="text-[#2D2D2D] font-medium">
                        {" "}
                        equipos <br />
                      </span>
                      combinando UX/UI, definición funcional y gestión para
                      llevar los productos de la idea a producción.
                    </p>
                  </motion.div>

                  {/* Location & Availability */}
                  <motion.div
                    className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-8"
                    initial={{ opacity: 0 }}
                    animate={isHeroInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <div className="flex items-center gap-2 text-sm text-[#9A9A9A]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span>Tandil, Argentina</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Disponible para proyectos</span>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    className="flex flex-wrap gap-4 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    {/* Download CV */}
                    <a
                      href="/cv-rosario-alzueta.pdf"
                      download
                      className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[rgb(201,188,63)] hover:bg-[rgb(161,148,23)] text-[#2D2D2D] text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[rgb(201,188,63)]/25 ring-1 ring-transparent hover:ring-[rgb(201,188,63)] ring-offset-[4px] ring-offset-white focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-2"
                    >
                      Descargar CV
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                      >
                        <path
                          d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    {/* Social Links */}
                    <div className="flex gap-2">
                      <a
                        href="mailto:rosario.alzueta@gmail.com"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#E0DBD6] text-[#6B6B6B] hover:text-white hover:bg-[rgb(111,141,181)] hover:border-[rgb(111,141,181)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        title="Email"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 7l-10 7L2 7" />
                        </svg>
                      </a>
                      <a
                        href="https://linkedin.com/in/rosarioalzueta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#E0DBD6] text-[#6B6B6B] hover:text-white hover:bg-[rgb(111,141,181)] hover:border-[rgb(111,141,181)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        title="LinkedIn"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="https://behance.net/rosarioalzueta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-[#E0DBD6] text-[#6B6B6B] hover:text-white hover:bg-[rgb(111,141,181)] hover:border-[rgb(111,141,181)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        title="Behance"
                      >
                        <svg
                          width="20"
                          height="12"
                          viewBox="0 0 22 14"
                          fill="currentColor"
                        >
                          <path d="M6.5 0C8.98 0 10 1.54 10 3.38c0 1.31-.62 2.4-1.78 2.94 1.58.47 2.33 1.85 2.33 3.38 0 2.2-1.6 4.05-4.55 4.05H0V0h6.5zM2.5 5.5h3.18c1.18 0 1.82-.56 1.82-1.56 0-1.06-.64-1.44-1.82-1.44H2.5v3zm0 6h3.68c1.35 0 2.02-.67 2.02-1.75 0-1.17-.8-1.75-2.14-1.75H2.5v3.5zM14.5 1h6v1.5h-6V1zm3 12c-2.95 0-4.75-2.02-4.75-5.25 0-3.19 1.87-5.25 4.75-5.25 3.06 0 4.5 2.19 4.5 5v.75h-6.75c.1 1.83.9 2.75 2.38 2.75 1.05 0 1.72-.5 1.98-1.35h2.39c-.52 1.94-2.13 3.35-4.5 3.35zm2.12-6.25c-.08-1.3-.73-2.1-2.12-2.1-1.32 0-2.1.73-2.38 2.1h4.5z" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stats Section - Minimalista y centrado */}
            <motion.div
              className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-[#E0DBD6]/50"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-3xl mx-auto text-center">
                <StatItem
                  number={3}
                  suffix="+"
                  label="Años de experiencia"
                  delay={1.2}
                  isInView={isHeroInView}
                />
                <StatItem
                  number={4}
                  suffix="+"
                  label="Empresas"
                  delay={1.3}
                  isInView={isHeroInView}
                />
                <StatItem
                  number={5}
                  suffix="+"
                  label="Certificaciones"
                  delay={1.4}
                  isInView={isHeroInView}
                />
                <StatItem
                  number={15}
                  suffix="+"
                  label="Clientes"
                  delay={1.5}
                  isInView={isHeroInView}
                  highlight
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <section className="mb-12 sm:mb-16 md:mb-24">
          <motion.h2
            className="text-xs sm:text-sm font-medium text-[rgb(111,141,181)] tracking-wide uppercase mb-6 sm:mb-8 text-center lg:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Mi recorrido
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 md:left-24 -translate-x-1/2 md:translate-x-0 top-0 bottom-0 w-px bg-gradient-to-b from-[rgb(201,188,63)] via-[#E0DBD6] to-transparent opacity-40 z-0" />

            {/* Timeline items */}
            <div className="space-y-4 sm:space-y-8 md:space-y-12">
              {/* XCONS Evolution Card */}
              <EvolutionCard data={xConsEvolution} />

              {/* Otras experiencias */}
              {experiencias.map((exp, index) => (
                <TimelineItem key={index} {...exp} index={index + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12 sm:mb-16 md:mb-24">
          <motion.h2
            className="text-xs sm:text-sm font-medium text-[rgb(111,141,181)] tracking-wide uppercase mb-6 sm:mb-8 text-center lg:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Formación
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            {educacion.map((edu, index) => (
              <motion.div
                key={index}
                className="relative bg-white/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-[#E0DBD6]/50 hover:border-[rgb(111,141,181)]/30 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="text-sm sm:text-base font-medium text-[#2D2D2D]">
                    {edu.title}
                  </h3>
                  <span className="text-xs text-[#9A9A9A] whitespace-nowrap flex-shrink-0">
                    {edu.year}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[rgb(111,141,181)] mb-1">
                  {edu.institution}
                </p>
                <p className="text-xs text-[#9A9A9A]">
                  {edu.period}
                </p>

                {/* Icons for certificates */}
                {edu.certificate && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    {/* Trophy icon - only for UX/UI courses */}
                    {(edu.title === "Diseño UX/UI Inicial" ||
                      edu.title === "Diseño UX/UI Avanzado") && (
                      <div
                        className="p-1.5 bg-[rgb(201,188,63)]/15 text-[rgb(161,148,23)] rounded-md"
                        title="Curso destacado"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7" />
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7" />
                          <path d="M4 22h16" />
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                        </svg>
                      </div>
                    )}
                    {/* Eye icon - to view certificate */}
                    <button
                      onClick={() =>
                        setCertificateModal({
                          isOpen: true,
                          url: edu.certificate!,
                          title: edu.title,
                        })
                      }
                      className="p-1.5 bg-[rgb(111,141,181)]/15 text-[rgb(111,141,181)] hover:bg-[rgb(111,141,181)]/25 rounded-md transition-all duration-200 group"
                      title="Ver certificado"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:scale-110"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <motion.section
          className="mb-12 sm:mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-xs sm:text-sm font-medium text-[rgb(111,141,181)] tracking-wide uppercase mb-6 sm:mb-8 text-center lg:text-left">
            Idiomas
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-[#E0DBD6]/50">
              <span className="text-sm sm:text-base text-[#2D2D2D] font-medium">
                Español
              </span>
              <span className="text-xs sm:text-sm text-[#9A9A9A] ml-2">
                Nativo
              </span>
            </div>
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-[#E0DBD6]/50">
              <span className="text-sm sm:text-base text-[#2D2D2D] font-medium">
                Inglés
              </span>
              <span className="text-xs sm:text-sm text-[#9A9A9A] ml-2">
                A2 (en formación)
              </span>
            </div>
          </div>
        </motion.section>

        {/* Skills cloud */}
        <motion.section
          className="mb-12 sm:mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-xs sm:text-sm font-medium text-[rgb(111,141,181)] tracking-wide uppercase mb-6 sm:mb-8 text-center lg:text-left">
            Herramientas & Skills
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
            {[
              "Figma",
              "Figma Make",
              "Canva",
              "Sketchup",
              "Marvel",
              "Trello",
              "Jira",
              "Odoo",
              "Notion",
              "Slack",
              "Maze",
              "Optimal Workshop",
              "Deep Research",
              "Design Systems",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F5F0EB] text-[#4A4A4A] text-xs sm:text-sm font-medium rounded-full border border-[#E0DBD6] hover:border-[rgb(201,188,63)] hover:bg-[rgb(201,188,63)]/10 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />

      {/* Certificate Modal */}
      <AnimatePresence>
        {certificateModal.isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setCertificateModal({ isOpen: false, url: "", title: "" })
              }
            />

            {/* Modal content */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0DBD6]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[rgb(201,188,63)]/15 rounded-lg">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgb(201,188,63)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#2D2D2D]">
                      Certificado
                    </h3>
                    <p className="text-sm text-[#6B6B6B]">
                      {certificateModal.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setCertificateModal({ isOpen: false, url: "", title: "" })
                  }
                  className="p-2 text-[#6B6B6B] hover:text-[#2D2D2D] hover:bg-[#F5F0EB] rounded-lg transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15 5L5 15M5 5l10 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Certificate Image */}
              <div className="p-6 bg-[#F5F0EB] max-h-[70vh] overflow-auto">
                <img
                  src={certificateModal.url}
                  alt={`Certificado - ${certificateModal.title}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Item Component - Minimalista
const StatItem = ({
  number,
  suffix = "",
  label,
  delay = 0,
  highlight = false,
  isInView,
}: {
  number: number;
  suffix?: string;
  label: string;
  delay?: number;
  highlight?: boolean;
  isInView: boolean;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, number, {
        duration: 2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, number, delay, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  return (
    <div className="text-center">
      <div
        className={`text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-1 sm:mb-2 ${
          highlight ? "text-[rgb(201,188,63)]" : "text-[#2D2D2D]"
        }`}
      >
        <span className="text-[rgb(201,188,63)]">{suffix}</span>
        {displayValue}
      </div>
      <div className="text-xs sm:text-sm text-[#9A9A9A]">{label}</div>
    </div>
  );
};

// Timeline Item Component
const TimelineItem = ({
  year,
  role,
  company,
  logo,
  description,
  skills,
  current = false,
  index,
}: {
  year: string;
  role: string;
  company: string;
  logo?: string;
  description: string | string[];
  skills: string[];
  current?: boolean;
  index: number;
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      className="relative pl-0 md:pl-40 flex flex-col items-center lg:items-start"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Year badge - positioned on the line */}
      <div className="absolute left-1/2 md:left-24 -translate-x-1/2 top-6 md:top-0 flex items-center justify-center z-10">
        <div
          className={`w-4 h-4 rounded-full border-2 ${current ? "bg-[rgb(201,188,63)] border-[rgb(201,188,63)]" : "bg-white border-[#E0DBD6]"}`}
        >
          {current && (
            <div className="absolute inset-0 rounded-full bg-[rgb(201,188,63)] animate-ping opacity-50" />
          )}
        </div>
      </div>

      {/* Year label - Desktop */}
      <div className="absolute left-0 md:left-0 top-0 md:w-20 text-right hidden md:block">
        <span
          className={`text-sm font-medium ${current ? "text-[rgb(201,188,63)]" : "text-[#9A9A9A]"}`}
        >
          {year}
        </span>
        {current && (
          <span className="block text-xs text-[rgb(111,141,181)]">
            Presente
          </span>
        )}
      </div>

      {/* Mobile year - with proper spacing below the badge */}
      <div className="md:hidden mb-3 text-center w-full pt-12">
        <span
          className={`text-sm font-medium ${current ? "text-[rgb(201,188,63)]" : "text-[#9A9A9A]"}`}
        >
          {year}{" "}
          {current && (
            <span className="text-[rgb(111,141,181)]">· Presente</span>
          )}
        </span>
      </div>

      {/* Content card - Same format as EvolutionCard */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-[#E0DBD6]/50 hover:border-[rgb(201,188,63)]/30 overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-300 w-full sm:w-fit mx-auto lg:mx-0">
        {/* Header with company name and logo */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[rgb(201,188,63)]/10 to-transparent border-b border-[rgb(201,188,63)]/20 flex items-center">
          {logo && (
            <div className="p-1.5 bg-[rgb(201,188,63)]/15 rounded-md mr-3">
              <img
                src={logo}
                alt={company}
                className="w-4 h-4 object-contain opacity-70"
                loading="lazy"
              />
            </div>
          )}
          <h3 className="text-base sm:text-lg font-medium text-[#2D2D2D]">{company}</h3>
        </div>

        {/* Role content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm sm:text-base font-medium text-[#2D2D2D]">
              {role}
            </span>
            <span className="text-xs text-[#9A9A9A]">{year}</span>
          </div>

          {Array.isArray(description) ? (
            <ul className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-3 sm:mb-4 space-y-1.5">
              {description.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-[rgb(201,188,63)] mt-1 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-3 sm:mb-4">
              {description}
            </p>
          )}

          {/* Skills tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[rgb(201,188,63)]/15 text-[rgb(161,148,23)] text-xs font-medium rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Evolution Card Component - Para mostrar crecimiento dentro de una empresa
const EvolutionCard = ({
  data,
}: {
  data: {
    company: string;
    current: boolean;
    logo?: string;
    roles: {
      year: string;
      role: string;
      description: string | string[];
      skills: string[];
    }[];
  };
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      className="relative pl-0 md:pl-40 flex flex-col items-center lg:items-start"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Dot on the line with ping */}
      <div className="absolute left-1/2 md:left-24 -translate-x-1/2 top-6 md:top-0 flex items-center justify-center z-10">
        <div className="w-4 h-4 rounded-full border-2 bg-[rgb(201,188,63)] border-[rgb(201,188,63)]">
          <div className="absolute inset-0 rounded-full bg-[rgb(201,188,63)] animate-ping opacity-50" />
        </div>
      </div>

      {/* Year range label - Desktop */}
      <div className="absolute left-0 md:left-0 top-0 md:w-24 text-right hidden md:block">
        <span className="text-xs font-medium text-[rgb(201,188,63)]">
          Dic 2024
        </span>
        <span className="block text-xs text-[rgb(111,141,181)]">Actualidad</span>
      </div>

      {/* Mobile year - with proper spacing below the badge */}
      <div className="md:hidden mb-3 text-center w-full pt-12">
        <span className="text-sm font-medium text-[rgb(201,188,63)]">
          Dic 2024 - Actualidad
        </span>
      </div>

      {/* Evolution Card */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-[rgb(201,188,63)]/30 overflow-hidden hover:shadow-lg hover:shadow-[rgb(201,188,63)]/10 transition-all duration-300 w-full sm:w-fit mx-auto lg:mx-0">
        {/* Header with company name and logo */}
        <div className="px-6 py-4 bg-gradient-to-r from-[rgb(201,188,63)]/10 to-transparent border-b border-[rgb(201,188,63)]/20 flex items-center">
          {data.logo && (
            <div className="p-1.5 bg-[rgb(201,188,63)]/15 rounded-md mr-3">
              <img
                src={data.logo}
                alt={data.company}
                className="w-4 h-4 object-contain opacity-70"
              />
            </div>
          )}
          <h3 className="text-lg font-medium text-[#2D2D2D]">{data.company}</h3>
        </div>

        {/* Roles evolution */}
        <div className="p-6">
          <div className="relative">
            {/* Internal progress line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-[rgb(201,188,63)] to-[#E0DBD6] opacity-40 z-0" />

            <div className="space-y-6">
              {data.roles.map((roleData, index) => {
                const isFirst = index === 0;
                return (
                  <motion.div
                    key={index}
                    className="relative pl-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  >
                    {/* Step indicator */}
                    <div
                      className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 ${
                        isFirst
                          ? "bg-[rgb(201,188,63)] border-[rgb(201,188,63)]"
                          : "bg-white border-[#E0DBD6]"
                      }`}
                    />

                    {/* Role content */}
                    <div className={`${isFirst ? "" : "opacity-75"}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <span
                          className={`text-base font-medium ${isFirst ? "text-[#2D2D2D]" : "text-[#6B6B6B]"}`}
                        >
                          {roleData.role}
                        </span>
                        <span className="text-xs text-[#9A9A9A]">
                          {roleData.year}
                        </span>
                      </div>
                      {Array.isArray(roleData.description) ? (
                        <ul className="text-[#6B6B6B] text-sm leading-relaxed mb-3 space-y-1.5">
                          {roleData.description.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-[rgb(201,188,63)] mt-1.5 flex-shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
                          {roleData.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {roleData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 text-xs font-medium rounded-md bg-[rgb(201,188,63)]/15 text-[rgb(161,148,23)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Acerca;
