import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import Header from "../components/Header";
import LoopVideo from "../components/project/LoopVideo";
import { getLabById, getNextLab, type LabClip, type LabShot, type ShotFrame } from "../data/labs";
import { ArrowIcon, LabCard } from "../components/lab/LabCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const inView = { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-60px" } } as const;


// ── Building blocks ──────────────────────────────────────────────

/** Section with a title, same style as the case-study pages. */
function LabBlock({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="py-14 md:py-24 border-t border-[#2D2D2D]/10">
      <motion.h2 className="type-h1 text-[#1A1A1A] mb-5 md:mb-14" variants={fadeIn} {...inView}>
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

/** Wraps media in its frame: browser window, phone, or plain rounded. */
function Frame({ frame, children }: { frame: ShotFrame; children: ReactNode }) {
  if (frame === "browser") {
    return (
      <div className="rounded-xl md:rounded-2xl overflow-hidden bg-[#1F1D1D] ring-1 ring-black/10 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.35)]">
        <div className="h-6 md:h-7 flex items-center gap-1.5 px-3" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        {children}
      </div>
    );
  }
  if (frame === "phone") {
    return (
      <div className="mx-auto max-w-[240px] rounded-[30px] p-1.5 bg-[#1A1A1A] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)]">
        <div className="rounded-[24px] overflow-hidden">{children}</div>
      </div>
    );
  }
  return <div className="rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-black/5">{children}</div>;
}

function Shot({ shot, className = "" }: { shot: LabShot; className?: string }) {
  return (
    <figure className={className}>
      <Frame frame={shot.frame}>
        <img src={shot.src} alt={shot.alt} loading="lazy" className="block w-full h-auto" />
      </Frame>
    </figure>
  );
}

/** Recorded animation, looping like a GIF. */
function Clip({ clip, className = "" }: { clip: LabClip; className?: string }) {
  return (
    <motion.figure className={className} variants={fadeIn} {...inView}>
      <Frame frame={clip.frame}>
        <LoopVideo src={clip.mp4} webm={clip.webm} poster={clip.poster} label={`Animación: ${clip.title}`} />
      </Frame>
      <figcaption className="mt-3 type-h4 text-[#1A1A1A]">{clip.title}</figcaption>
    </motion.figure>
  );
}

const BackIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" />
  </svg>
);

// ── Page ─────────────────────────────────────────────────────────

export default function LabExperiment() {
  const { labId } = useParams<{ labId: string }>();
  const navigate = useNavigate();
  const lab = getLabById(labId ?? "");

  if (!lab) return <Navigate to="/" state={{ scrollTo: "laboratorio" }} replace />;

  const { cover } = lab;
  const next = getNextLab(lab.id);
  const backToLab = () => navigate("/", { state: { scrollTo: "laboratorio" } });

  const phoneClips = lab.clips.filter((c) => c.frame === "phone");
  const wideClips = lab.clips.filter((c) => c.frame !== "phone");
  const wideShots = lab.screens.filter((s) => s.frame !== "phone");
  const phoneShots = lab.screens.filter((s) => s.frame === "phone");

  return (
    <div className="min-h-screen text-[#2D2D2D]">
      <Header />

      <main className="px-4 md:px-0 pt-4 md:pt-14 pb-20 md:pb-28">
        <button
          onClick={backToLab}
          className="inline-flex items-center gap-2 type-body-s text-[#9A9A9A] hover:text-[#2D2D2D] transition-colors mb-4 md:mb-6"
        >
          {BackIcon}
          Laboratorio
        </button>

        {/* ── Portada ── */}
        <motion.section
          className="relative rounded-[20px] md:rounded-[28px] overflow-hidden mb-10 md:mb-16"
          style={{ background: cover.bg, color: cover.fg }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {cover.photo && (
            <>
              <img src={cover.photo} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${cover.bg} 15%, ${cover.bg}99 55%, ${cover.bg}4D 100%)` }}
              />
            </>
          )}

          <div className="relative flex flex-col justify-between gap-12 p-5 sm:p-8 md:p-10 min-h-[68svh] md:min-h-[62vh]">
            <img src={cover.logo} alt={`Logo ${lab.title}`} className="w-9 h-9 md:w-11 md:h-11 object-contain" />

            <div>
              <h1 className="font-medium tracking-[-0.04em] leading-[0.92] mb-5" style={{ fontSize: "clamp(56px, 9vw, 136px)" }}>
                {lab.title}
              </h1>
              <p className="type-body-l opacity-75 max-w-[42ch] mb-6 md:mb-8">{lab.tagline}</p>
              {lab.liveUrl && (
                <a
                  href={lab.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-85"
                  style={{ background: cover.fg, color: cover.bg }}
                >
                  Ver web en vivo
                  <ArrowIcon />
                </a>
              )}
            </div>
          </div>
        </motion.section>

        {/* ── Manual de marca ── */}
        {lab.manual && lab.manual.length > 0 && (
        <LabBlock id="lab-manual" title="Manual de marca">
          <div className="flex flex-col gap-14 md:gap-20">
            {lab.manual.map((ch) => (
              <motion.article
                key={ch.title}
                className="md:grid md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10"
                variants={fadeIn}
                {...inView}
              >
                <div className="mb-5 md:mb-0">
                  <h3 className="type-subtitle text-[#1A1A1A] mb-3">{ch.title}</h3>
                  <p className="type-body text-[#6B6B6B] max-w-[40ch]">{ch.text}</p>
                </div>
                <div className="rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-black/5">
                  <img src={ch.src} alt={`Manual ${lab.title} — ${ch.title}`} loading="lazy" className="block w-full h-auto" />
                </div>
              </motion.article>
            ))}
          </div>
        </LabBlock>
        )}

        {/* ── UI Kit, one component at a time ── */}
        <LabBlock id="lab-uikit" title="UI Kit">
          <div className="flex flex-col gap-10 md:gap-16">
            {lab.components.map((c) => (
              <motion.div key={c.name} variants={fadeIn} {...inView}>
                <h3 className="type-subtitle text-[#1A1A1A] mb-4 md:mb-6">{c.name}</h3>
                {c.maxWidth ? (
                  // Small component: shown at its real size on the site's own background
                  <div className="rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-black/5 flex justify-center" style={{ background: cover.bg }}>
                    <img src={c.src} alt={`Componente ${c.name} de ${lab.title}`} loading="lazy" className="block w-full h-auto" style={{ maxWidth: c.maxWidth }} />
                  </div>
                ) : (
                  <div className="rounded-xl md:rounded-2xl overflow-hidden ring-1 ring-black/5">
                    <img src={c.src} alt={`Componente ${c.name} de ${lab.title}`} loading="lazy" className="block w-full h-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </LabBlock>

        {/* ── Animaciones (recorded from the live site) ── */}
        <LabBlock id="lab-animaciones" title="Animaciones de la web">
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-10 md:gap-y-14">
            {wideClips.map((c, i) => (
              <Clip
                key={c.title}
                clip={c}
                // First clip spans the row; the last one too if it would be left alone
                className={i === 0 || (i === wideClips.length - 1 && wideClips.length % 2 === 0) ? "md:col-span-2" : ""}
              />
            ))}
          </div>
          {phoneClips.length > 0 && (
            <div className="mt-10 md:mt-14 rounded-[20px] md:rounded-[28px] bg-[#EEE9E4] px-4 py-8 md:p-12 flex justify-center gap-4 md:gap-10">
              {phoneClips.map((c) => (
                <Clip key={c.title} clip={c} className="w-full max-w-[260px]" />
              ))}
            </div>
          )}
        </LabBlock>

        {/* ── Pantallas ── */}
        <LabBlock id="lab-pantallas" title="Pantallas">
          {/* Mobile: swipeable strip · Desktop: grid */}
          <div
            className="-mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-8 md:overflow-visible"
            style={{ touchAction: "pan-x pan-y" }}
          >
            {wideShots.map((s, i) => (
              <Shot
                key={s.src}
                shot={s}
                // First shot spans the row; the last one too if it would be left alone
                className={`snap-center flex-shrink-0 w-[86%] md:w-auto ${
                  i === 0 || (i === wideShots.length - 1 && wideShots.length % 2 === 0) ? "md:col-span-2" : ""
                }`}
              />
            ))}
          </div>

          {phoneShots.length > 0 && (
            <div className="mt-10 md:mt-14 rounded-[20px] md:rounded-[28px] bg-[#EEE9E4] px-4 py-8 md:p-12 flex justify-center gap-4 md:gap-10">
              {phoneShots.map((s) => (
                <Shot key={s.src} shot={s} className="w-1/2 max-w-[240px]" />
              ))}
            </div>
          )}
        </LabBlock>

        {/* ── Siguiente experimento ── */}
        <section className="pt-14 md:pt-20 border-t border-[#2D2D2D]/10">
          <span className="block type-overline uppercase text-[#9A9A9A] mb-4">Siguiente experimento</span>
          {next && (
            <div className="h-[60vh] min-h-[380px] md:h-[52vh] md:max-w-[560px]">
              <LabCard lab={next} />
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={backToLab}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-sm font-medium rounded-full transition-colors"
            >
              {BackIcon}
              Volver al laboratorio
            </button>
            <Link
              to="/"
              state={{ scrollTo: "proyectos" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#2D2D2D]/15 hover:border-[#2D2D2D]/40 text-[#2D2D2D] text-sm font-medium rounded-full transition-colors"
            >
              Ver proyectos
              <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
