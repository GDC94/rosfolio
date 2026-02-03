import { motion } from "framer-motion";
import claraImage from "../assets/hr/CLARA.svg";
import santiagoImage from "../assets/hr/SANTIAGO.svg";

interface PersonaData {
  name: string;
  quote: string;
  image: string;
  color: string;
  accentLight: string;
  details: {
    edad: string;
    educacion: string;
    rol: string;
    ubicacion: string;
    dispositivos: string[];
  };
  contexto: string;
  motivaciones: string[];
  frustraciones: string[];
}

const personas: PersonaData[] = [
  {
    name: "Clara Gutiérrez",
    quote:
      "Prefiero que me guíen paso a paso. No quiero cometer errores que afecten a todo el equipo.",
    image: claraImage,
    color: "rgb(201,188,63)",
    accentLight: "rgba(201,188,63,0.08)",
    details: {
      edad: "54 años",
      educacion: "Universitario",
      rol: "Jefa de RRHH",
      ubicacion: "Córdoba, Arg.",
      dispositivos: ["Windows", "Android"],
    },
    contexto:
      "Clara lleva 20 años en el área de Recursos Humanos. Comenzó su carrera con procesos manuales y ha visto la evolución hacia lo digital. Aunque reconoce los beneficios de la tecnología, le cuesta adaptarse a nuevas herramientas.",
    motivaciones: [
      "Busca herramientas que sean fáciles de aprender sin necesidad de capacitación extensa.",
      "Valora interfaces claras con instrucciones paso a paso que minimicen el riesgo de errores.",
      "Quiere sentirse segura y en control cuando gestiona datos sensibles del personal.",
    ],
    frustraciones: [
      "Se siente abrumada por interfaces con demasiadas opciones o terminología técnica.",
      "Le frustra no encontrar ayuda contextual cuando se queda trabada en un proceso.",
      "Teme que un error suyo pueda afectar los datos de los empleados o generar problemas legales.",
    ],
  },
  {
    name: "Santiago López",
    quote:
      "Siempre busco maneras de hacer las cosas de forma más ágil y eficiente, porque el tiempo es clave para mí.",
    image: santiagoImage,
    color: "rgb(111,141,181)",
    accentLight: "rgba(111,141,181,0.08)",
    details: {
      edad: "28 años",
      educacion: "Terciario",
      rol: "Analista RRHH",
      ubicacion: "CABA, Arg.",
      dispositivos: ["Macbook", "iOS"],
    },
    contexto:
      "Santiago es analista en una startup tecnológica. Su ambiente de trabajo es ágil y dinámico, lo que lo hace un usuario experimentado de plataformas digitales, donde gestiona procesos de onboarding y monitorea datos de rendimiento.",
    motivaciones: [
      "Busca plataformas ágiles, visuales y personalizables que se adapten a sus tareas y flujos de trabajo rápidos.",
      "Quiere herramientas que le permitan optimizar su tiempo y colaborar fácilmente con otros equipos.",
      "Valora las integraciones con otras apps y la automatización de tareas repetitivas.",
    ],
    frustraciones: [
      "Le molesta el uso de herramientas rígidas o poco flexibles que limitan su capacidad para agilizar procesos.",
      "Se siente frustrado cuando las interfaces no son lo suficientemente dinámicas o modernas.",
      "No tolera sistemas que no permiten integrar otros servicios que ya usa en su día a día.",
    ],
  },
];

export function UserPersonas() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {personas.map((persona, idx) => (
          <motion.div
            key={persona.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.15,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-3xl shadow-sm border border-[#E0DBD6]/50 overflow-hidden"
          >
            {/* Header con foto y quote */}
            <div
              className="p-6 relative"
              style={{ backgroundColor: persona.accentLight }}
            >
              {/* Decorative elements */}
              <div
                className="absolute top-4 right-4 w-2 h-2 rotate-45"
                style={{ backgroundColor: persona.color }}
              />
              <div
                className="absolute bottom-4 right-8 w-1.5 h-1.5 rounded-full opacity-40"
                style={{ backgroundColor: persona.color }}
              />

              <div className="flex gap-5">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md"
                    style={{ borderColor: `${persona.color}40` }}
                  >
                    <img
                      src={persona.image}
                      alt={persona.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status dot */}
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ backgroundColor: persona.color }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-3 h-3 text-white"
                    >
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                {/* Name and quote */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: persona.color }}
                  >
                    {persona.name}
                  </h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed italic">
                    "{persona.quote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="px-6 py-4 border-b border-[#E0DBD6]/50">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { label: "Edad", value: persona.details.edad },
                  { label: "Educación", value: persona.details.educacion },
                  { label: "Rol", value: persona.details.rol },
                  { label: "Ubicación", value: persona.details.ubicacion },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-[#9A9A9A] font-medium">
                      {item.label}:
                    </span>
                    <span className="text-sm text-[#2D2D2D] font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Devices */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dashed border-[#E0DBD6]/60">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-[#9A9A9A]"
                >
                  <path
                    d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"
                    fill="currentColor"
                  />
                </svg>
                <div className="flex gap-2">
                  {persona.details.dispositivos.map((device) => (
                    <span
                      key={device}
                      className="text-xs px-2 py-1 rounded-full bg-[#F5F0EB] text-[#6B6B6B] font-medium"
                    >
                      {device}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contexto */}
            <div className="px-6 py-4 border-b border-[#E0DBD6]/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full bg-[rgb(201,188,63)]" />
                <h4 className="text-xs uppercase tracking-[0.1em] text-[rgb(201,188,63)] font-semibold">
                  Contexto
                </h4>
              </div>
              <p className="text-[15px] text-[#4A4A4A] leading-relaxed">
                {persona.contexto}
              </p>
            </div>

            {/* Motivaciones */}
            <div className="px-6 py-4 border-b border-[#E0DBD6]/50 bg-emerald-50/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-emerald-100">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-emerald-600"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h4 className="text-xs uppercase tracking-[0.1em] text-emerald-700 font-semibold">
                  Motivaciones
                </h4>
              </div>
              <ul className="space-y-2">
                {persona.motivaciones.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-[#4A4A4A] leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Frustraciones */}
            <div className="px-6 py-4 bg-amber-50/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-amber-100">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-amber-600"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h4 className="text-xs uppercase tracking-[0.1em] text-amber-700 font-semibold">
                  Frustraciones
                </h4>
              </div>
              <ul className="space-y-2">
                {persona.frustraciones.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-[#4A4A4A] leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insight footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-10 p-8 bg-white rounded-2xl shadow-sm border border-[#E0DBD6]/50 relative overflow-hidden"
      >
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(201,188,63)]/5 via-transparent to-[rgb(111,141,181)]/5" />

        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 border-[rgb(201,188,63)]/40" />
        <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-[rgb(201,188,63)]/40" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-2.5 h-2.5 bg-[rgb(201,188,63)] rotate-45"
              animate={{ rotate: [45, 90, 45] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-xs uppercase tracking-[0.15em] text-[rgb(201,188,63)] font-semibold">
              Insight de las Personas
            </span>
          </div>
          <p className="text-[#4A4A4A] text-base leading-[1.8]">
            El contraste entre{" "}
            <span className="font-semibold" style={{ color: "rgb(201,188,63)" }}>
              Clara
            </span>{" "}
            y{" "}
            <span className="font-semibold" style={{ color: "rgb(111,141,181)" }}>
              Santiago
            </span>{" "}
            representa el desafío central de{" "}
            <span className="text-[rgb(201,188,63)] font-semibold">HacheR</span>
            : crear una herramienta que sea{" "}
            <span className="text-[#2D2D2D] font-semibold">
              suficientemente simple
            </span>{" "}
            para usuarios con poca experiencia tecnológica, pero{" "}
            <span className="text-[#2D2D2D] font-semibold">
              suficientemente potente
            </span>{" "}
            para profesionales que buscan agilidad y personalización.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default UserPersonas;
