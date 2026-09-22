import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const animRef = useRef<number>(0);
  const displayRef = useRef(0);

  // Smoothly interpolates displayValue toward the target progress
  const animateTo = (target: number) => {
    cancelAnimationFrame(animRef.current);
    const from = displayRef.current;
    const start = performance.now();
    const duration = 280;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.round(from + (target - from) * eased);
      displayRef.current = val;
      setDisplayValue(val);
      if (t < 1) animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
  };

  // Jump-based progress counter
  useEffect(() => {
    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const advance = () => {
      const remaining = 100 - current;
      const maxJump = Math.min(remaining, current < 60 ? 38 : 22);
      const minJump = Math.min(remaining, current < 60 ? 18 : 8);
      const jump = Math.floor(Math.random() * (maxJump - minJump + 1)) + minJump;

      current = Math.min(current + jump, 100);
      setProgress(current);

      if (current < 100) {
        timeout = setTimeout(advance, 80 + Math.random() * 120);
      } else {
        timeout = setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 850);
        }, 300);
      }
    };

    timeout = setTimeout(advance, 80);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animRef.current);
    };
  }, [onComplete]);

  // Trigger smooth display animation on each progress jump
  useEffect(() => {
    animateTo(progress);
  }, [progress]);

  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayValue / 100) * circumference;

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] overflow-hidden"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Anillo de progreso */}
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              style={{ transform: "rotate(-90deg)" }}
            >
              {/* Track */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                fill="none"
                stroke="#F5F0EB"
                strokeOpacity={0.12}
                strokeWidth="1"
              />
              {/* Progress arc */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                fill="none"
                stroke="#F5F0EB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.28s cubic-bezier(0,0,0.2,1)" }}
              />
              {/* Dot en la punta del arco */}
              <circle
                cx={140 + radius * Math.cos((displayValue / 100) * 2 * Math.PI - Math.PI / 2)}
                cy={140 + radius * Math.sin((displayValue / 100) * 2 * Math.PI - Math.PI / 2)}
                r="3"
                fill="#F5F0EB"
                style={{ transition: "cx 0.28s cubic-bezier(0,0,0.2,1), cy 0.28s cubic-bezier(0,0,0.2,1)" }}
              />
            </svg>

            {/* Número centrado */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span
                className="tabular-nums leading-none select-none text-[#F5F0EB]"
                style={{
                  fontSize: "clamp(32px, 5vw, 56px)",
                  fontFamily: '"PP Neue Montreal"',
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                }}
              >
                {displayValue}%
              </span>
              <span
                className="select-none text-[#F5F0EB] tracking-[0.2em]"
                style={{
                  fontSize: "9px",
                  fontFamily: '"PP Neue Montreal"',
                  fontWeight: 400,
                  opacity: 0.4,
                }}
              >
                Cargando
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
