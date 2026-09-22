import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Grid12Background } from "../components/Background";

const titleMap: Record<string, string> = {
  "/proyectos": "Proyectos",
  "/casos-de-estudio": "Casos de estudio",
  "/laboratorio": "Laboratorio",
};

function UnderConstruction() {
  const { pathname } = useLocation();
  const title = titleMap[pathname] ?? "Próximamente";

  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="fixed inset-0 pointer-events-none select-none z-0">
        <Grid12Background />
      </div>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgb(201,188,63)]/15 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(201,188,63)] animate-pulse" />
            <span className="text-xs font-medium text-[rgb(161,148,23)] tracking-widest uppercase">
              En construcción
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[#2D2D2D] tracking-tight leading-none mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
            <span className="text-[rgb(201,188,63)]">.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-[#6B6B6B] font-light max-w-sm mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Esta sección está siendo construida. Pronto vas a poder verla.
          </motion.p>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default UnderConstruction;
