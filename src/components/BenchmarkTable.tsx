import { motion } from "framer-motion";
import peopleforceLogo from "../assets/hr/peopleforce.svg";
import hibobLogo from "../assets/hr/hibob.svg";

interface CompetitorData {
  name: string;
  logo: string;
  data: Record<string, string>;
}

const competitors: CompetitorData[] = [
  {
    name: "PeopleForce",
    logo: peopleforceLogo,
    data: {
      usabilidad:
        "Interfaz bien organizada, pero la curva de aprendizaje puede ser pronunciada para nuevos usuarios.",
      flujos:
        "Ofrece herramientas avanzadas como gestión de asistencias, evaluaciones de desempeño y encuestas.",
      espacio:
        "Diseño con paneles compactos, pero la visualización de varias opciones a la vez puede resultar densa.",
      vocabulario:
        "Lenguaje técnico, más adecuado para usuarios con experiencia previa en sistemas de gestión.",
      flexibilidad:
        "Ofrece una buena cantidad de opciones para personalizar la gestión de datos de los empleados.",
      fortalezas:
        "Gestión centralizada y escalable. Control avanzado de permisos basado en roles jerárquicos.",
      debilidades:
        "Curva de aprendizaje pronunciada. Flexibilidad visual restringida en la interfaz.",
    },
  },
  {
    name: "Bob",
    logo: hibobLogo,
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
        "Interfaz intuitiva que facilita la adopción. Proceso rápido para asignar roles y gestionar accesos.",
      debilidades:
        "Funciones limitadas para organizaciones complejas. Gestión básica de roles multinivel.",
    },
  },
];

type Highlight = "strength" | "weakness";

const criteria: { key: string; label: string; highlight?: Highlight }[] = [
  { key: "usabilidad", label: "Usabilidad" },
  { key: "flujos", label: "Flujos y Funciones" },
  { key: "espacio", label: "Gestión del Espacio" },
  { key: "vocabulario", label: "Vocabulario y Tono" },
  { key: "flexibilidad", label: "Flexibilidad" },
  { key: "fortalezas", label: "Fortalezas", highlight: "strength" },
  { key: "debilidades", label: "Debilidades", highlight: "weakness" },
];

const LABEL_COLOR: Record<Highlight, string> = {
  strength: "text-emerald-400",
  weakness: "text-amber-400",
};

const BOX_BORDER: Record<Highlight, string> = {
  strength: "border-emerald-400/70",
  weakness: "border-amber-400/70",
};

const ROW_GRID = "grid grid-cols-2 sm:grid-cols-[160px_1fr_1fr]";

export function BenchmarkTable() {
  return (
    <div className="w-full">
      <div className="rounded-2xl border border-line overflow-hidden">
        {/* Header con logos */}
        <div className={`${ROW_GRID} bg-card`}>
          <div className="hidden sm:flex items-center px-4 py-4">
            <span className="type-overline uppercase text-ink-muted">Criterio</span>
          </div>
          {competitors.map((competitor, i) => (
            <div
              key={competitor.name}
              className={`flex justify-center items-center px-3 py-4 ${i > 0 ? "border-l" : "sm:border-l"} border-line`}
            >
              {/* White pill keeps the logos legible on any section background */}
              <span className="inline-flex items-center bg-white rounded-md px-3 py-1.5">
                <img src={competitor.logo} alt={competitor.name} className="h-4 sm:h-5 w-auto object-contain" />
              </span>
            </div>
          ))}
        </div>

        {/* Criterios */}
        {criteria.map((criterion, rowIdx) => (
          <motion.div
            key={criterion.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: rowIdx * 0.03, duration: 0.4 }}
            viewport={{ once: true, margin: "-30px" }}
            className={`${ROW_GRID} border-t border-line`}
          >
            <div className="col-span-2 sm:col-span-1 px-4 pt-4 pb-1 sm:py-4">
              <span
                className={`type-overline uppercase ${
                  criterion.highlight ? LABEL_COLOR[criterion.highlight] : "text-ink-muted"
                }`}
              >
                {criterion.label}
              </span>
            </div>

            {competitors.map((competitor, i) => (
              <div
                key={`${criterion.key}-${competitor.name}`}
                className={`p-3 sm:p-4 ${i > 0 ? "border-l" : "sm:border-l"} border-line`}
              >
                {criterion.highlight ? (
                  <p className={`type-body-s text-ink h-full p-3 rounded-lg border bg-[var(--pj-bg)] ${BOX_BORDER[criterion.highlight]}`}>
                    {competitor.data[criterion.key]}
                  </p>
                ) : (
                  <p className="type-body-s text-ink">{competitor.data[criterion.key]}</p>
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
        className="mt-8"
      >
        <p className="type-body text-ink-muted">
          <span className="text-[rgb(201,188,63)] font-medium">Insight:</span>{" "}
          Las herramientas <span className="text-ink font-medium">potentes</span> suelen
          tener curvas de aprendizaje altas, mientras que las{" "}
          <span className="text-ink font-medium">fáciles de usar</span>{" "}
          carecen de funciones avanzadas.{" "}
          <span className="text-[rgb(201,188,63)] font-medium">HacheR</span>{" "}
          busca equilibrar ambos mundos.
        </p>
      </motion.div>
    </div>
  );
}

export default BenchmarkTable;
