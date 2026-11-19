import { useEffect, useRef, useState } from "react";

/**
 * Animation recorded from a live site as a short GIF-like loop. It plays while on screen
 * and pauses off screen; the button lets anyone stop the motion.
 */
export default function LoopVideo({ src, webm, poster, label, className = "" }: { src: string; webm: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || userPaused) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { setUserPaused(false); v.play().catch(() => {}); }
    else { setUserPaused(true); v.pause(); }
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={ref}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block w-full h-auto"
      >
        {/* H.264 for Safari/iOS, VP9 for browsers without it */}
        <source src={src} type="video/mp4" />
        <source src={webm} type="video/webm" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar animación" : "Reproducir animación"}
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/55 hover:bg-black/75 text-white flex items-center justify-center transition-colors duration-200"
      >
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><rect x="0" y="0" width="3" height="12" rx="1" /><rect x="7" y="0" width="3" height="12" rx="1" /></svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true"><path d="M0 0.8v10.4c0 .6.7 1 1.2.7l8.3-5.2c.5-.3.5-1.1 0-1.4L1.2.1C.7-.2 0 .2 0 .8z" /></svg>
        )}
      </button>
    </div>
  );
}
