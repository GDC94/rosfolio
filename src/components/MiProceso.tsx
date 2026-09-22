import { motion } from "framer-motion";
import { Grid12Background } from "./Background";

const steps = [
  {
    num: "01",
    title: "Entender",
    sub: "Discovery",
    desc: "Investigo el contexto, el negocio y las necesidades reales del usuario antes de abrir Figma.",
  },
  {
    num: "02",
    title: "Definir",
    sub: "Análisis",
    desc: "Sintetizo los hallazgos, defino el problema y establezco los criterios de éxito del proyecto.",
  },
  {
    num: "03",
    title: "Idear",
    sub: "Concepto",
    desc: "Exploro soluciones con wireframes, flujos y arquitectura de información antes de comprometer el diseño.",
  },
  {
    num: "04",
    title: "Diseñar",
    sub: "UI / Sistema",
    desc: "Construyo la interfaz en alta fidelidad con componentes reutilizables y un design system documentado.",
  },
  {
    num: "05",
    title: "Validar",
    sub: "Testing",
    desc: "Prototipo, testeo con usuarios reales e itero hasta que la solución funciona de verdad.",
  },
  {
    num: "06",
    title: "Entregar",
    sub: "Handoff",
    desc: "Documento cada decisión y entrego assets organizados para que desarrollo construya sin ambigüedades.",
  },
];

const lineAnim = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

const stepAnim = (i: number) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function MiProceso() {
  return (
    <section
      className="relative h-full flex flex-col justify-center overflow-hidden"
      aria-labelledby="proceso-title"
    >
      <Grid12Background />

      <div className="relative z-10 flex flex-col gap-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="type-overline text-[rgb(201,188,63)] mb-3">Cómo trabajo</p>
          <h2 id="proceso-title" className="type-h1 text-[#1A1A1A]">
            Mi proceso<span className="text-[rgb(201,188,63)]">.</span>
          </h2>
        </motion.div>

        {/* Connecting line */}
        <motion.div
          className="h-px bg-[#D0CBC6] origin-left"
          variants={lineAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Steps */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-px bg-[#D0CBC6]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={stepAnim(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-inherit flex flex-col gap-3 p-5 bg-[#F5F0EB] group hover:bg-white transition-colors duration-300"
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="font-bold text-[rgb(201,188,63)] leading-none"
                  style={{ fontSize: "clamp(28px, 3vw, 48px)" }}
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <span className="type-overline text-[#C8C4BC]">{step.sub}</span>
              </div>

              <h3 className="type-h3 text-[#1A1A1A]">{step.title}</h3>

              <p className="type-body-s text-[#6B6B6B] leading-relaxed">{step.desc}</p>

              {/* Accent bottom line on hover */}
              <motion.div
                className="h-0.5 bg-[rgb(201,188,63)] origin-left mt-auto"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
