import { motion } from "framer-motion";

const LocationIcon = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

function ArgFlag() {
  const cx = 14, cy = 9.5;
  return (
    <svg width="18" height="12" viewBox="0 0 28 19"
      aria-label="Argentina"
      style={{ display: "inline-block", flexShrink: 0, borderRadius: 2 }}
    >
      <rect x="0" y="0"     width="28" height="6.33"  fill="#74ACDF"/>
      <rect x="0" y="6.33"  width="28" height="6.33"  fill="#FFFFFF"/>
      <rect x="0" y="12.67" width="28" height="6.33"  fill="#74ACDF"/>
      {/* Rayos rectos */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return <line key={`s${i}`}
          x1={cx + Math.cos(r)*2.6} y1={cy + Math.sin(r)*2.6}
          x2={cx + Math.cos(r)*4.4} y2={cy + Math.sin(r)*4.4}
          stroke="#F6B40E" strokeWidth="1.2" strokeLinecap="round"/>;
      })}
      {/* Rayos ondulados */}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg, i) => {
        const r = (deg * Math.PI) / 180;
        return <line key={`w${i}`}
          x1={cx + Math.cos(r)*2.6} y1={cy + Math.sin(r)*2.6}
          x2={cx + Math.cos(r)*3.9} y2={cy + Math.sin(r)*3.9}
          stroke="#F6B40E" strokeWidth="0.75" strokeLinecap="round"/>;
      })}
      {/* Núcleo del sol */}
      <circle cx={cx} cy={cy} r="2.2" fill="#F6B40E"/>
      <circle cx={cx} cy={cy} r="1.4" fill="#F6B40E"/>
      {/* Cara */}
      <circle cx={cx - 0.65} cy={cy - 0.4} r="0.3" fill="#C8860A"/>
      <circle cx={cx + 0.65} cy={cy - 0.4} r="0.3" fill="#C8860A"/>
      <path d={`M${cx-0.65} ${cy+0.6} Q${cx} ${cy+1.1} ${cx+0.65} ${cy+0.6}`}
        stroke="#C8860A" strokeWidth="0.32" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function TopBar() {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 h-10 border-b border-[#E0DBD6]/50 bg-[#F5F0EB]/80 backdrop-blur-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#9A9A9A]">
        {LocationIcon}
        <span>Tandil, Argentina</span>
        <ArgFlag />
      </div>
      {/* Spacer on mobile so the hamburger (top-left) doesn't overlap content */}
      <div className="md:hidden w-10" />

      <a
        href="mailto:rosario.alzueta@gmail.com"
        className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-[#1A1A1A] hover:bg-[#333] text-white text-[11px] font-medium rounded-md transition-colors duration-200"
      >
        Hablemos
        <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </motion.div>
  );
}

export default TopBar;
