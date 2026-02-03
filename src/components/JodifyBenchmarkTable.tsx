import { motion } from "framer-motion";
import { jodifyImages } from "../data/projects";

interface CompetitorData {
  name: string;
  logo: string;
  color: string;
  accentLight: string;
  data: Record<string, string>;
}

const competitors: CompetitorData[] = [
  {
    name: "Ticketek",
    logo: jodifyImages.logoTicketek,
    color: "#7C16F5",
    accentLight: "rgba(124, 22, 245, 0.08)",
    data: {
      ocupacion:
        "Enfoque más visual con una ocupación de espacio moderada. La interfaz presenta elementos visuales claros.",
      personalizacion:
        "Personalización visual limitada para el usuario. El diseño es estándar sin muchas opciones de customización.",
      navegacion:
        "Menús de navegación claramente definidos. La estructura es predecible y familiar.",
      consistencia:
        "Cohesión visual en toda la plataforma. Los elementos mantienen un estilo uniforme.",
      accesibilidad:
        "Enfoque en accesibilidad, pero puede mejorar en contraste y tamaño de textos.",
      fortalezas:
        "Marca reconocida con amplia cobertura de eventos. Buena cohesión visual y estructura de navegación clara.",
      debilidades:
        "Personalización limitada y accesibilidad mejorable. Algunos flujos requieren demasiados pasos.",
    },
  },
  {
    name: "Passline",
    logo: jodifyImages.logoPassline,
    color: "#1B1C20",
    accentLight: "rgba(27, 28, 32, 0.08)",
    data: {
      ocupacion:
        "Interfaz minimalista con eficiente ocupación de espacio. El diseño limpio facilita la navegación.",
      personalizacion:
        "Interfaz limpia con opciones de personalización visual. Permite ajustar algunas preferencias.",
      navegacion:
        "Estructura de navegación eficiente y directa. Menos clics necesarios para completar tareas.",
      consistencia:
        "Consistencia visual en elementos y diseño. El sistema de diseño se mantiene coherente.",
      accesibilidad:
        "Diseño accesible con oportunidades de mejora. Buenos contrastes en general.",
      fortalezas:
        "Diseño minimalista y navegación eficiente. Fuerte consistencia en vocabulario y feedback claro al usuario.",
      debilidades:
        "Menor reconocimiento de marca. Algunas funciones avanzadas pueden estar ocultas en la interfaz.",
    },
  },
];

const criteria = [
  {
    key: "ocupacion",
    label: "Ocupación del Espacio",
  },
  {
    key: "personalizacion",
    label: "Personalización Visual",
  },
  {
    key: "navegacion",
    label: "Navegación",
  },
  {
    key: "consistencia",
    label: "Consistencia Visual",
  },
  {
    key: "accesibilidad",
    label: "Accesibilidad",
  },
  {
    key: "fortalezas",
    label: "Fortalezas",
    isHighlight: "strength" as const,
  },
  {
    key: "debilidades",
    label: "Debilidades",
    isHighlight: "weakness" as const,
  },
];

export function JodifyBenchmarkTable() {
  return (
    <div className="w-full">
      {/* Header con logos de competidores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="grid grid-cols-[140px_1fr_1fr] gap-3 mb-4"
      >
        {/* Header de criterios */}
        <div className="flex items-center">
          <span className="text-xs uppercase tracking-[0.12em] text-[#1B1C20] font-medium">
            Criterios
          </span>
        </div>

        {/* Headers de competidores */}
        {competitors.map((competitor, idx) => (
          <motion.div
            key={competitor.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg px-4 py-3 text-center bg-[#0C0C0C]">
              <img
                src={competitor.logo}
                alt={competitor.name}
                className="h-5 w-auto object-contain mx-auto brightness-0 invert"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filas de criterios */}
      <div className="space-y-2">
        {criteria.map((criterion, rowIdx) => (
          <motion.div
            key={criterion.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: rowIdx * 0.04,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, margin: "-30px" }}
            className="grid grid-cols-[140px_1fr_1fr] gap-3"
          >
            {/* Nombre del criterio - compact */}
            <div
              className={`flex items-center px-3 py-2 rounded-lg border ${
                criterion.isHighlight === "strength"
                  ? "bg-[#7C16F5]/10 border-[#7C16F5]/20 border-l-2 border-l-[#7C16F5]"
                  : criterion.isHighlight === "weakness"
                  ? "bg-[#1B1C20]/10 border-[#1B1C20]/20 border-l-2 border-l-[#1B1C20]"
                  : "bg-white border-[#1B1C20]/10"
              }`}
            >
              <span className="text-xs font-medium text-[#0C0C0C] leading-tight">
                {criterion.label}
              </span>
            </div>

            {/* Datos de cada competidor */}
            {competitors.map((competitor) => (
              <div
                key={`${criterion.key}-${competitor.name}`}
                className={`px-3 py-2 rounded-lg border ${
                  criterion.isHighlight === "strength"
                    ? "bg-[#7C16F5]/5 border-[#7C16F5]/10"
                    : criterion.isHighlight === "weakness"
                    ? "bg-[#1B1C20]/5 border-[#1B1C20]/10"
                    : "bg-white border-[#1B1C20]/10"
                }`}
                style={{
                  borderLeftWidth: 2,
                  borderLeftColor: `${competitor.color}80`,
                }}
              >
                <p className="text-xs text-[#1B1C20] leading-relaxed">
                  {competitor.data[criterion.key]}
                </p>

                {/* Visual indicator for strengths/weaknesses */}
                {criterion.isHighlight && (
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-dashed border-[#1B1C20]/10">
                    <div className="flex gap-0.5">
                      {[
                        ...Array(
                          criterion.isHighlight === "strength"
                            ? competitor.name === "Ticketek"
                              ? 3
                              : 4
                            : competitor.name === "Ticketek"
                            ? 3
                            : 2
                        ),
                      ].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            criterion.isHighlight === "strength"
                              ? "bg-[#7C16F5]"
                              : "bg-[#1B1C20]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#1B1C20]">
                      {criterion.isHighlight === "strength"
                        ? competitor.name === "Ticketek"
                          ? "Fuerte"
                          : "Muy fuerte"
                        : competitor.name === "Ticketek"
                        ? "Moderado"
                        : "Leve"}
                    </span>
                  </div>
                )}
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
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-[#7C16F5] rotate-45 mt-1.5 flex-shrink-0" />
          <p className="text-sm text-[#1B1C20] leading-relaxed">
            <span className="text-[#7C16F5] font-medium">Insight:</span>{" "}
            <span className="text-[#0C0C0C] font-medium">Ticketek</span> ofrece
            mayor reconocimiento de marca y cohesión visual, mientras que{" "}
            <span className="text-[#0C0C0C] font-medium">Passline</span>{" "}
            destaca por su diseño minimalista y navegación eficiente.{" "}
            <span className="text-[#7C16F5] font-medium">Jodify</span>{" "}
            busca combinar lo mejor de ambos mundos.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default JodifyBenchmarkTable;
