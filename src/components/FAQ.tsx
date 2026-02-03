import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid12Background } from "./Background";

// Chevron icon component
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    width="14"
    height="14"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "¿Qué tipo de proyectos me interesan?",
    answer: "Me interesan proyectos full time, part time o por proyecto. Puedo sumarme a equipos o trabajar de forma independiente según las necesidades del proyecto.",
  },
  {
    question: "¿Cómo es tu proceso de trabajo?",
    answer: "Mi proceso se adapta a cada proyecto, pero generalmente incluye: Entendimiento del problema y objetivos, investigación rápida y análisis de contexto utilizando inteligencia artificial, definición de flujos y wireframes, prototipado inicial con Figma Make para validar ideas de forma ágil, diseño visual en alta fidelidad en Figma, prototipo navegable, y handoff a desarrollo con documentación clara. Este enfoque me permite acelerar las primeras etapas del proyecto sin perder calidad en las decisiones de diseño.",
  },
  {
    question: "¿Trabajás sola o tenés un equipo?",
    answer: "Trabajo de forma individual o junto a un desarrollador fullstack según el proyecto. Esto permite ofrecer soluciones completas: desde el diseño hasta la implementación final del sitio o producto.",
  },
  {
    question: "¿Qué entregables recibe el cliente?",
    answer: "Dependiendo del proyecto, entrego: Diseño en Figma (organizado por componentes y pantallas), prototipo interactivo, design system básico (colores, tipografías, botones, estados), assets exportables y documentación para desarrollo. Todo preparado para que el equipo técnico pueda construir sin ambigüedades.",
  },
  {
    question: "¿Cómo se definen los presupuestos y tiempos?",
    answer: "El presupuesto y los tiempos se definen según: alcance del proyecto, cantidad de pantallas, nivel de complejidad, si mi rol es solo de diseño de interfaces o si incluye definición y análisis de producto (flujos, casos de uso y decisiones funcionales), y si el proyecto contempla solo diseño o diseño + desarrollo. Antes de comenzar, se acuerda una propuesta clara con etapas, entregables y plazos.",
  },
  {
    question: "¿Qué modalidades de pago ofrecés para trabajos freelance?",
    answer: "Trabajo con tres modalidades de pago según el tipo de proyecto:\n\n• Por hora: Ideal cuando el alcance no está completamente definido o requiere exploración inicial y ajustes frecuentes.\n\n• Por proyecto: Cuando los requerimientos están claros desde el comienzo, con alcance y entregables bien definidos.\n\n• Pago mensual fijo (retainer): Recomendado para proyectos que necesitan trabajo continuo, muchas iteraciones y evolución progresiva.\n\nCada modalidad se define en función de la complejidad, duración y nivel de involucramiento requerido.",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const contentVariants = {
  collapsed: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.2 },
    },
  },
  expanded: { 
    height: "auto", 
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24"
      aria-labelledby="faq-title"
    >
      <Grid12Background />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 
            id="faq-title" 
            className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2D2D2D] tracking-tight"
          >
            Preguntas frecuentes
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div 
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          aria-label="Lista de preguntas frecuentes"
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                role="listitem"
              >
                <motion.div
                  className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
                    isOpen
                      ? "border-[rgb(201,188,63)]/40 bg-white"
                      : "border-[#E0DBD6] bg-white/80 hover:border-[rgb(201,188,63)]/30 hover:bg-white"
                  }`}
                  animate={{
                    boxShadow: isOpen 
                      ? "0 10px 40px -10px rgba(201, 188, 63, 0.15), 0 4px 20px -5px rgba(0, 0, 0, 0.05)" 
                      : "0 0 0 0 transparent",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    id={buttonId}
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-5 sm:px-6 py-5 sm:py-6 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-inset rounded-xl"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <motion.span
                      className="text-sm sm:text-base font-medium pr-4"
                      animate={{
                        color: isOpen ? "rgb(161, 148, 23)" : "#2D2D2D",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.question}
                    </motion.span>
                    
                    <motion.span
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      animate={{
                        backgroundColor: isOpen ? "rgb(201, 188, 63)" : "#F5F0EB",
                        color: isOpen ? "#ffffff" : "#6B6B6B",
                      }}
                      whileHover={{
                        backgroundColor: isOpen ? "rgb(181, 168, 43)" : "rgba(201, 188, 63, 0.15)",
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    >
                      <ChevronIcon isOpen={isOpen} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                          {/* Decorative line */}
                          <motion.div 
                            className="h-px bg-gradient-to-r from-[rgb(201,188,63)]/30 via-[rgb(201,188,63)]/15 to-transparent mb-4"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            aria-hidden="true" 
                          />
                          <motion.p 
                            className="text-[#6B6B6B] leading-relaxed text-sm sm:text-base whitespace-pre-line"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                          >
                            {item.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
