import type React from "react";
import { motion, useAnimation } from "framer-motion";
import { useRef, useCallback } from "react";
import rosarioImage from "../assets/rosario.png";
import { Grid12Background } from "./Background";

const BASE_RADIUS = 180;
const DIM   = [ 26,  26,  26] as const; // black — dim state
const LIT   = [201, 188,  63] as const; // gold — lit state

const FONT: React.CSSProperties = {
  fontFamily: '"PP Neue Montreal", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  fontWeight: 700,
};

const charVariant = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

type RegisterChar = (key: string, el: HTMLSpanElement | null) => void;

function AnimChars({
  text,
  delay,
  lineKey,
  registerChar,
  className,
  style,
}: {
  text: string;
  delay: number;
  lineKey: string;
  registerChar: RegisterChar;
  className?: string;
  style?: React.CSSProperties;
}) {
  // Split into word/space parts keeping original char indices for registerChar
  const parts = text.split(/( )/);
  let charIdx = 0;

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
    >
      {parts.map((part, pi) => {
        if (part === " ") {
          charIdx++;
          // Regular space — gives the browser a line-break opportunity
          return <span key={`sp-${pi}`} aria-hidden="true">{" "}</span>;
        }
        return (
          <span key={`w-${pi}`} className="inline-block whitespace-nowrap">
            {part.split("").map((char, ci) => {
              const key = `${lineKey}-${charIdx++}`;
              return (
                <span
                  key={ci}
                  className="inline-block overflow-hidden"
                  style={{ verticalAlign: "top" }}
                >
                  <motion.span className="inline-block" variants={charVariant}>
                    <span
                      ref={(el) => registerChar(key, el)}
                      style={{ display: "inline-block", transition: "color 0.12s ease, text-shadow 0.12s ease" }}
                    >
                      {char}
                    </span>
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </motion.div>
  );
}

export default function Hero() {
  const imgControls = useAnimation();

  const handleImageHover = useCallback(() => {
    imgControls.start({
      rotateX: [0, 360],
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    });
  }, [imgControls]);

  // All char inner-spans registered by key
  const charEls = useRef<Map<string, HTMLSpanElement>>(new Map());
  // Random irregular radius offsets per char, computed once
  const charOffsets = useRef<Map<string, number>>(new Map());

  const registerChar: RegisterChar = useCallback((key, el) => {
    if (el) {
      charEls.current.set(key, el);
      if (!charOffsets.current.has(key)) {
        charOffsets.current.set(key, (Math.random() - 0.5) * 70);
      }
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const mx = e.clientX;
    const my = e.clientY;
    charEls.current.forEach((el, key) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(mx - cx, my - cy);
      const radius = BASE_RADIUS + (charOffsets.current.get(key) ?? 0);

      // Smoothstep falloff — 0 at edge, 1 at center
      const raw = Math.max(0, 1 - dist / radius);
      const t = raw * raw * (3 - 2 * raw);

      const r = Math.round(DIM[0] + (LIT[0] - DIM[0]) * t);
      const g = Math.round(DIM[1] + (LIT[1] - DIM[1]) * t);
      const b = Math.round(DIM[2] + (LIT[2] - DIM[2]) * t);

      el.style.color = `rgb(${r},${g},${b})`;
      el.style.textShadow = t > 0.05
        ? `0 0 ${Math.round(50 * t)}px rgba(201,188,63,${(t * 0.35).toFixed(2)})`
        : "";
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    charEls.current.forEach((el) => {
      el.style.color = "";
      el.style.textShadow = "";
    });
  }, []);

  return (
    <section
      className="h-full flex flex-col overflow-hidden px-4 md:pl-[440px] md:pr-[60px] relative"
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Grid12Background />

      <div className="flex-1 flex flex-col justify-center gap-0 text-right">

        <AnimChars
          text="HOLA,"
          delay={0.05}
          lineKey="l1"
          registerChar={registerChar}
          className="hero-fs uppercase text-[#1A1A1A] leading-none tracking-tight cursor-default md:whitespace-nowrap"
          style={FONT}
        />

        <AnimChars
          text="SOY ROSARIO"
          delay={0.2}
          lineKey="l2"
          registerChar={registerChar}
          className="hero-fs uppercase text-[#1A1A1A] leading-none tracking-tight cursor-default md:whitespace-nowrap"
          style={FONT}
        />

        {/* Line 3 — ALZUETA [foto] Y SOY */}
        <div
          className="hero-fs flex flex-wrap md:flex-nowrap items-center leading-none justify-end"
          style={{ gap: "0.3em" }}
          aria-hidden="true"
        >
          <AnimChars
            text="ALZUETA"
            delay={0.35}
            lineKey="l3a"
            registerChar={registerChar}
            className="uppercase text-[#1A1A1A] tracking-tight cursor-default md:whitespace-nowrap"
            style={FONT}
          />

          {/* Outer: rotation on hover. Inner: entry animation */}
          <motion.div
            className="flex-shrink-0 rounded-sm cursor-pointer"
            style={{ height: "1.1em", width: "1.6em", transformPerspective: 400 }}
            animate={imgControls}
            onHoverStart={handleImageHover}
          >
            <motion.div
              className="w-full h-full overflow-hidden rounded-sm"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={rosarioImage}
                alt="Rosario Alzueta"
                className="w-full h-full object-cover object-[50%_15%]"
              />
            </motion.div>
          </motion.div>

          <AnimChars
            text="Y SOY"
            delay={0.45}
            lineKey="l3b"
            registerChar={registerChar}
            className="uppercase text-[#1A1A1A] tracking-tight cursor-default md:whitespace-nowrap"
            style={FONT}
          />
        </div>

        <AnimChars
          text="PRODUCT DESIGNER"
          delay={0.55}
          lineKey="l4"
          registerChar={registerChar}
          className="hero-fs uppercase text-[#1A1A1A] leading-none tracking-tight cursor-default md:whitespace-nowrap"
          style={FONT}
        />

        <span className="sr-only">Hola, soy Rosario Alzueta y soy Product Designer</span>
      </div>
    </section>
  );
}
