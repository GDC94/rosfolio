import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Custom easing for smooth transitions
const smoothEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];
const overlayEasing: [number, number, number, number] = [0.76, 0, 0.24, 1];

function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Page content with smooth fade and subtle slide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.5,
          ease: smoothEasing,
          // Content fades in after overlay starts revealing
          delay: 0.2,
        }}
      >
        {children}
      </motion.div>

      {/* Exit overlay - slides up to cover content */}
      <motion.div
        className="fixed inset-0 z-[60] bg-[#F5F0EB] pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.5,
          ease: overlayEasing,
        }}
        style={{ originY: 1 }}
      />

      {/* Enter overlay - slides down to reveal new content */}
      <motion.div
        className="fixed inset-0 z-[60] bg-[#F5F0EB] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.5,
          ease: overlayEasing,
          delay: 0.1,
        }}
        style={{ originY: 0 }}
      >
        {/* Decorative element during transition */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, delay: 0.2, ease: smoothEasing }}
        >
          <motion.div
            className="w-3 h-3 bg-[rgb(201,188,63)] rotate-45"
            initial={{ rotate: 45 }}
            animate={{ rotate: 135 }}
            transition={{ duration: 0.4, ease: smoothEasing }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

export default PageTransition;
