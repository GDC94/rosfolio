import { motion, PresenceContext } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {/* AnimatePresence's initial={false} (no fade on first load) would otherwise
          reach every motion component in the page and skip their `initial`
          states, so entry animations would render already finished. */}
      <PresenceContext.Provider value={null}>{children}</PresenceContext.Provider>
    </motion.div>
  );
}

export default PageTransition;
