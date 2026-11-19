import { Link } from "react-router-dom";
import type { LabExperiment } from "../../data/labs";

export const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Experiment card: just the logo and the project name.
 * The cover loops like a GIF (classes lab-gif-* in index.css):
 * ripples echoing the logo's rounded square, the logo turning in 90° steps
 * with the brand's expo easing, and a slow light sweep.
 */
export function LabCard({ lab }: { lab: LabExperiment }) {
  const { cover } = lab;
  return (
    <Link
      to={`/laboratorio/${lab.id}`}
      className="group relative flex h-full min-h-[240px] rounded-[20px] md:rounded-[28px] overflow-hidden isolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(201,188,63)] focus-visible:ring-offset-4"
      style={{ background: cover.bg, color: cover.fg }}
      aria-label={`Ver experimento: ${lab.title}`}
    >
      {/* Glow behind the logo, breathing */}
      <div
        className="lab-gif-breathe absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 46%, ${cover.fg}26 0%, transparent 50%)` }}
        aria-hidden="true"
      />

      {/* Logo + ripples */}
      <div className="absolute inset-0 flex items-center justify-center pb-[12%]" aria-hidden="true">
        <div className="relative w-[clamp(72px,24%,136px)] aspect-square">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="lab-gif-ripple absolute inset-0 rounded-[30%] border"
              style={{ borderColor: `${cover.fg}59`, animationDelay: `${i * 1.4}s` }}
            />
          ))}
          <img
            src={cover.logo}
            alt=""
            className="lab-gif-turn relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Light sweep */}
      <div
        className="lab-gif-sweep absolute inset-y-0 -left-1/2 w-1/2 pointer-events-none"
        style={{ background: `linear-gradient(100deg, transparent 0%, ${cover.fg}14 50%, transparent 100%)` }}
        aria-hidden="true"
      />

      {/* Name */}
      <h3
        className="absolute left-0 bottom-0 p-5 sm:p-7 font-medium tracking-[-0.04em] leading-none"
        style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
      >
        {lab.title}
      </h3>
    </Link>
  );
}
