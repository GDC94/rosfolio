import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 7000; // 5 seconds total
    const interval = 30; // Update every 30ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1200);
          }, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const name = "Rosario Alzueta";
  const role = "Diseñadora de Producto";

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAFAF8] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(45, 45, 45, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(45, 45, 45, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[rgb(201,188,63)]/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-[rgb(111,141,181)]/5 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Main content */}
          <div className="relative flex flex-col items-center">
            {/* Logo mark */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <div className="relative">
                {/* Outer ring */}
                <motion.div
                  className="w-20 h-20 rounded-full border-2 border-[rgb(201,188,63)]/20"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                {/* Inner circle with initial */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-[rgb(201,188,63)] flex items-center justify-center shadow-lg shadow-[rgb(201,188,63)]/25"
                    animate={{
                      boxShadow: [
                        "0 10px 40px rgba(201,188,63,0.25)",
                        "0 10px 60px rgba(201,188,63,0.35)",
                        "0 10px 40px rgba(201,188,63,0.25)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-white text-xl font-semibold">R</span>
                  </motion.div>
                </div>
                {/* Decorative diamond */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[rgb(201,188,63)] rotate-45"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Name animation */}
            <motion.div
              className="overflow-hidden mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1
                className="text-3xl md:text-4xl font-light text-[#2D2D2D] tracking-tight"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.6,
                }}
              >
                {name.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className={char === " " ? "inline" : "inline-block"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + index * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Role */}
            <motion.p
              className="text-sm text-[#9A9A9A] tracking-wide mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {role}
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="relative w-48 h-0.5 bg-[#E0DBD6] rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[rgb(201,188,63)] to-[rgb(161,148,23)] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Progress percentage */}
            <motion.span
              className="mt-4 text-xs text-[#9A9A9A] font-medium tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#E0DBD6]/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-[#E0DBD6]/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-[#E0DBD6]/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#E0DBD6]/50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
