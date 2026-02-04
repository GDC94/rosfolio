import { motion } from "framer-motion";
import { jodifyImages } from "../data/projects";

interface CompetitorData {
  name: string;
  logo: string;
  color: string;
  data: Record<string, string>;
}

const competitors: CompetitorData[] = [
  {
    name: "Ticketek",
    logo: jodifyImages.logoTicketek,
    color: "#7C16F5",
    data: {
      ocupacion:
        "Enfoque más visual con una ocupación de espacio moderada. Elementos visuales claros.",
      personalizacion:
        "Personalización visual limitada. El diseño es estándar sin muchas opciones de customización.",
      navegacion:
        "Menús de navegación claramente definidos. La estructura es predecible y familiar.",
      consistencia:
        "Cohesión visual en toda la plataforma. Los elementos mantienen un estilo uniforme.",
      accesibilidad:
        "Enfoque en accesibilidad, pero puede mejorar en contraste y tamaño de textos.",
      fortalezas:
        "Marca reconocida con amplia cobertura. Buena cohesión visual y navegación clara.",
      debilidades:
        "Personalización limitada y accesibilidad mejorable. Flujos con demasiados pasos.",
    },
  },
  {
    name: "Passline",
    logo: jodifyImages.logoPassline,
    color: "#1B1C20",
    data: {
      ocupacion:
        "Interfaz minimalista con eficiente ocupación de espacio. Diseño limpio.",
      personalizacion:
        "Interfaz limpia con opciones de personalización visual. Permite ajustar preferencias.",
      navegacion:
        "Estructura de navegación eficiente y directa. Menos clics para completar tareas.",
      consistencia:
        "Consistencia visual en elementos y diseño. Sistema de diseño coherente.",
      accesibilidad:
        "Diseño accesible con oportunidades de mejora. Buenos contrastes en general.",
      fortalezas:
        "Diseño minimalista y navegación eficiente. Feedback claro al usuario.",
      debilidades:
        "Menor reconocimiento de marca. Funciones avanzadas ocultas en la interfaz.",
    },
  },
];

const criteria = [
  { key: "ocupacion", label: "Ocupación del Espacio" },
  { key: "personalizacion", label: "Personalización Visual" },
  { key: "navegacion", label: "Navegación" },
  { key: "consistencia", label: "Consistencia Visual" },
  { key: "accesibilidad", label: "Accesibilidad" },
  { key: "fortalezas", label: "Fortalezas", isHighlight: "strength" as const },
  { key: "debilidades", label: "Debilidades", isHighlight: "weakness" as const },
];

export function JodifyBenchmarkTable() {
  return (
    <div className="w-full">
      {/* Header con logos */}
      <div className="grid grid-cols-[auto_1fr_1fr] gap-2 mb-4">
        <div className="w-20 sm:w-28" /> {/* Espacio para labels */}
        {competitors.map((competitor) => (
          <div key={competitor.name} className="flex justify-center">
            <img
              src={competitor.logo}
              alt={competitor.name}
              className="h-4 sm:h-5 w-auto object-contain"
            />
          </div>
        ))}
      </div>

      {/* Criterios */}
      <div className="space-y-2">
        {criteria.map((criterion, rowIdx) => (
          <motion.div
            key={criterion.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: rowIdx * 0.03,
              duration: 0.4,
            }}
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-[auto_1fr_1fr] gap-2"
          >
            {/* Criterion Label */}
            <div className="w-20 sm:w-28 flex items-start pt-2">
              <span
                className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wide leading-tight ${
                  criterion.isHighlight === "strength"
                    ? "text-[#7C16F5]"
                    : criterion.isHighlight === "weakness"
                    ? "text-[#1B1C20]"
                    : "text-[#6B6B6B]"
                }`}
              >
                {criterion.label}
              </span>
            </div>

            {/* Competitor Responses */}
            {competitors.map((competitor) => (
              <div
                key={`${criterion.key}-${competitor.name}`}
                className={`p-2 sm:p-3 rounded-lg ${
                  criterion.isHighlight === "strength"
                    ? "bg-[#7C16F5]/5"
                    : criterion.isHighlight === "weakness"
                    ? "bg-[#1B1C20]/5"
                    : "bg-white"
                }`}
              >
                <p className="text-[10px] sm:text-xs text-[#1B1C20] leading-relaxed">
                  {competitor.data[criterion.key]}
                </p>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Footer con insight */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 pt-4 border-t border-[#1B1C20]/10"
      >
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 bg-[#7C16F5] rotate-45 mt-1.5 flex-shrink-0" />
          <p className="text-xs text-[#1B1C20] leading-relaxed">
            <span className="text-[#7C16F5] font-medium">Insight:</span>{" "}
            <span className="text-[#0C0C0C] font-medium">Ticketek</span> ofrece
            mayor reconocimiento de marca, mientras que{" "}
            <span className="text-[#0C0C0C] font-medium">Passline</span>{" "}
            destaca por su diseño minimalista.{" "}
            <span className="text-[#7C16F5] font-medium">Jodify</span>{" "}
            busca combinar lo mejor de ambos.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default JodifyBenchmarkTable;
