import { motion } from "framer-motion";
import { useState } from "react";
import peopleforceLogo from "../assets/hr/peopleforce.svg";
import hibobLogo from "../assets/hr/hibob.svg";

interface CompetitorData {
  name: string;
  logo: string;
  color: string;
  accentLight: string;
  data: Record<string, string>;
}

const competitors: CompetitorData[] = [
  {
    name: "PeopleForce",
    logo: peopleforceLogo,
    color: "#7C3AED",
    accentLight: "rgba(124, 58, 237, 0.08)",
    data: {
      usabilidad:
        "Interfaz bien organizada, pero la curva de aprendizaje puede ser pronunciada para nuevos usuarios.",
      flujos:
        "Ofrece herramientas avanzadas como gestión de asistencias, evaluaciones de desempeño y encuestas. Algunos procesos requieren varios pasos.",
      espacio:
        "Diseño con paneles compactos, pero la visualización de varias opciones a la vez puede resultar densa.",
      vocabulario:
        "Lenguaje técnico, más adecuado para usuarios con experiencia previa en sistemas de gestión.",
      flexibilidad:
        "Ofrece una buena cantidad de opciones para personalizar la gestión de datos de los empleados.",
      fortalezas:
        "Gestión centralizada y escalable para grandes volúmenes de información. Control avanzado de permisos basado en roles jerárquicos.",
      debilidades:
        "Curva de aprendizaje pronunciada que dificulta la adopción inicial. Flexibilidad visual restringida en la interfaz.",
    },
  },
  {
    name: "Bob",
    logo: hibobLogo,
    color: "#E8385A",
    accentLight: "rgba(232, 56, 90, 0.08)",
    data: {
      usabilidad:
        "Interfaz intuitiva, accesible para usuarios sin experiencia previa en sistemas digitales.",
      flujos:
        "Flujos simplificados que optimizan los procesos. Bien enfocada a la eficiencia en la gestión diaria.",
      espacio:
        "Diseño limpio y organizado con espacios bien aprovechados que facilitan la navegación.",
      vocabulario:
        "Tono amigable y accesible, fácil de entender para diversos niveles de experiencia.",
      flexibilidad:
        "Flexibilidad en la gestión de permisos y roles, permitiendo personalizar la estructura organizacional.",
      fortalezas:
        "Interfaz intuitiva que facilita la adopción. Proceso rápido y fácil para asignar roles y gestionar accesos.",
      debilidades:
        "Algunas funciones pueden no ser suficientes para organizaciones con necesidades complejas. Gestión básica de roles para escenarios con múltiples niveles de jerarquía.",
    },
  },
];

const criteria = [
  { key: "usabilidad", label: "Usabilidad" },
  { key: "flujos", label: "Flujos y Funciones" },
  { key: "espacio", label: "Gestión del Espacio" },
  { key: "vocabulario", label: "Vocabulario y Tono" },
  { key: "flexibilidad", label: "Flexibilidad" },
  { key: "fortalezas", label: "Fortalezas", isHighlight: "strength" },
  { key: "debilidades", label: "Debilidades", isHighlight: "weakness" },
];

// Mobile: Card-based layout per competitor
function MobileView() {
  const [activeCompetitor, setActiveCompetitor] = useState(0);

  return (
    <div className="md:hidden">
      {/* Competitor Tabs */}
      <div className="flex gap-2 mb-4">
        {competitors.map((competitor, idx) => (
          <button
            key={competitor.name}
            onClick={() => setActiveCompetitor(idx)}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 ${
              activeCompetitor === idx
                ? "border-current bg-white shadow-md"
                : "border-[#E0DBD6] bg-white/50"
            }`}
            style={{
              borderColor: activeCompetitor === idx ? competitor.color : undefined,
            }}
          >
            <img
              src={competitor.logo}
              alt={competitor.name}
              className="h-5 w-auto object-contain mx-auto"
            />
          </button>
        ))}
      </div>

      {/* Active Competitor Content */}
      <motion.div
        key={activeCompetitor}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        {criteria.map((criterion) => (
          <div
            key={criterion.key}
            className={`p-4 rounded-lg border ${
              criterion.isHighlight === "strength"
                ? "bg-emerald-50/50 border-emerald-200"
                : criterion.isHighlight === "weakness"
                ? "bg-amber-50/50 border-amber-200"
                : "bg-white border-[#E0DBD6]"
            }`}
          >
            <h4
              className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
                criterion.isHighlight === "strength"
                  ? "text-emerald-600"
                  : criterion.isHighlight === "weakness"
                  ? "text-amber-600"
                  : "text-[#6B6B6B]"
              }`}
            >
              {criterion.label}
            </h4>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              {competitors[activeCompetitor].data[criterion.key]}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Desktop: Table layout
function DesktopView() {
  return (
    <div className="hidden md:block">
      {/* Header con logos de competidores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="grid grid-cols-[140px_1fr_1fr] gap-3 mb-4"
      >
        <div className="flex items-center">
          <span className="text-xs uppercase tracking-[0.12em] text-[#9A9A9A] font-medium">
            Criterios
          </span>
        </div>

        {competitors.map((competitor, idx) => (
          <motion.div
            key={competitor.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg px-4 py-2 text-center border border-[#E0DBD6]/50 bg-white/80">
              <img
                src={competitor.logo}
                alt={competitor.name}
                className="h-5 w-auto object-contain mx-auto"
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
            <div
              className={`flex items-center px-3 py-2 rounded-lg border border-[#E0DBD6]/50 ${
                criterion.isHighlight === "strength"
                  ? "bg-emerald-50/50 border-l-2 border-l-emerald-400"
                  : criterion.isHighlight === "weakness"
                  ? "bg-amber-50/50 border-l-2 border-l-amber-400"
                  : "bg-white/80"
              }`}
            >
              <span className="text-xs font-medium text-[#2D2D2D] leading-tight">
                {criterion.label}
              </span>
            </div>

            {competitors.map((competitor, compIdx) => (
              <div
                key={`${criterion.key}-${competitor.name}`}
                className={`px-3 py-2 rounded-lg border ${
                  criterion.isHighlight === "strength"
                    ? "bg-emerald-50/30 border-emerald-100"
                    : criterion.isHighlight === "weakness"
                    ? "bg-amber-50/30 border-amber-100"
                    : "bg-white/80 border-[#E0DBD6]/50"
                }`}
                style={{
                  borderLeftWidth: 2,
                  borderLeftColor: `${competitor.color}50`,
                }}
              >
                <p className="text-xs text-[#4A4A4A] leading-relaxed">
                  {competitor.data[criterion.key]}
                </p>

                {criterion.isHighlight && (
                  <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-dashed border-[#E0DBD6]/40">
                    <div className="flex gap-0.5">
                      {[
                        ...Array(
                          criterion.isHighlight === "strength"
                            ? compIdx === 0
                              ? 4
                              : 3
                            : compIdx === 0
                            ? 3
                            : 2
                        ),
                      ].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            criterion.isHighlight === "strength"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#9A9A9A]">
                      {criterion.isHighlight === "strength"
                        ? compIdx === 0
                          ? "Muy fuerte"
                          : "Fuerte"
                        : compIdx === 0
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
    </div>
  );
}

export function BenchmarkTable() {
  return (
    <div className="w-full">
      <MobileView />
      <DesktopView />

      {/* Footer con insight */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-6 pt-4 border-t border-[#E0DBD6]/50"
      >
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rotate-45 mt-1.5 flex-shrink-0" />
          <p className="text-sm text-[#5A5A5A] leading-relaxed">
            <span className="text-[rgb(201,188,63)] font-medium">Insight:</span>{" "}
            Las herramientas <span className="text-[#2D2D2D] font-medium">potentes</span> suelen
            tener curvas de aprendizaje altas, mientras que las{" "}
            <span className="text-[#2D2D2D] font-medium">fáciles de usar</span>{" "}
            carecen de funciones avanzadas.{" "}
            <span className="text-[rgb(201,188,63)] font-medium">HacheR</span>{" "}
            busca equilibrar ambos mundos.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default BenchmarkTable;
