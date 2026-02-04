import { motion } from "framer-motion";
import peopleforceLogo from "../assets/hr/peopleforce.svg";
import hibobLogo from "../assets/hr/hibob.svg";

interface CompetitorData {
  name: string;
  logo: string;
  color: string;
  data: Record<string, string>;
}

const competitors: CompetitorData[] = [
  {
    name: "PeopleForce",
    logo: peopleforceLogo,
    color: "#7C3AED",
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
    color: "#E8385A",
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

const criteria = [
  { key: "usabilidad", label: "Usabilidad" },
  { key: "flujos", label: "Flujos y Funciones" },
  { key: "espacio", label: "Gestión del Espacio" },
  { key: "vocabulario", label: "Vocabulario y Tono" },
  { key: "flexibilidad", label: "Flexibilidad" },
  { key: "fortalezas", label: "Fortalezas", isHighlight: "strength" },
  { key: "debilidades", label: "Debilidades", isHighlight: "weakness" },
];

export function BenchmarkTable() {
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
                    ? "text-emerald-600"
                    : criterion.isHighlight === "weakness"
                    ? "text-amber-600"
                    : "text-[#9A9A9A]"
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
                    ? "bg-emerald-50/50"
                    : criterion.isHighlight === "weakness"
                    ? "bg-amber-50/50"
                    : "bg-[#FAFAF8]"
                }`}
              >
                <p className="text-[10px] sm:text-xs text-[#4A4A4A] leading-relaxed">
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
        className="mt-6 pt-4 border-t border-[#E0DBD6]"
      >
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 bg-[rgb(201,188,63)] rotate-45 mt-1.5 flex-shrink-0" />
          <p className="text-xs text-[#5A5A5A] leading-relaxed">
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
