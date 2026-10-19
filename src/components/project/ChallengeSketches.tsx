import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Arrow, Box, Line, Pen, Pill, Ring, SketchFillContext, SketchFrame } from "./sketchKit";

/**
 * HR "Desafíos": each question gets a croquis in the marker style of the HacheR
 * low-fi wireframes (see sketchKit), and its number is circled in gold like an
 * annotation on a wireframe.
 */

const GOLD = "rgb(201,188,63)";

// 01 — two people of different profiles in front of the same simple screen
const PeopleSketch = (
  <>
    <Ring cx={30} cy={46} r={9} />
    <Pen d="M14 100 Q15 70 30 64 Q45 70 46 100" />
    <Ring cx={60} cy={58} r={7} />
    <Pen d="M48 100 Q49 78 60 74 Q71 78 72 100" />
    <Box x={86} y={14} w={96} h={64} />
    <Box x={86} y={14} w={96} h={10} fill hatch />
    <Line x1={96} y1={36} x2={136} y2={36} />
    <Line x1={96} y1={46} x2={160} y2={46} light />
    <Line x1={96} y1={54} x2={148} y2={54} light />
    <Pill x={136} y={62} w={36} h={10} fill hatch />
    <Line x1={134} y1={79} x2={134} y2={94} />
    <Line x1={118} y1={96} x2={150} y2={96} />
  </>
);

// 02 — a balance: lots of features on one side, one simple button on the other
const BalanceSketch = (
  <>
    <Ring cx={100} cy={20} r={4} width={2} />
    <Line x1={100} y1={24} x2={100} y2={100} />
    <Line x1={76} y1={102} x2={124} y2={102} />
    <Line x1={40} y1={32} x2={160} y2={32} />
    <Line x1={48} y1={32} x2={32} y2={68} light />
    <Line x1={48} y1={32} x2={64} y2={68} light />
    <Line x1={152} y1={32} x2={136} y2={68} light />
    <Line x1={152} y1={32} x2={168} y2={68} light />
    <Pen d="M26 68 Q48 80 70 68" />
    <Pen d="M130 68 Q152 80 174 68" />
    <Box x={36} y={56} w={11} h={11} fill />
    <Box x={50} y={56} w={11} h={11} fill hatch />
    <Box x={43} y={44} w={11} h={11} fill />
    <Pill x={138} y={56} w={28} h={10} fill hatch />
  </>
);

// 03 — a sheet of paper turning into a screen with a table
const PaperToScreenSketch = (
  <>
    <Box x={30} y={20} w={40} h={68} light />
    <Box x={22} y={26} w={40} h={68} />
    <Line x1={30} y1={42} x2={54} y2={42} />
    <Line x1={30} y1={52} x2={50} y2={52} light />
    <Line x1={30} y1={62} x2={54} y2={62} light />
    <Line x1={30} y1={72} x2={46} y2={72} light />
    <Arrow d="M74 62 Q94 44 116 58" x2={116} y2={58} angle={30} />
    <Box x={122} y={24} w={62} h={50} />
    <Box x={130} y={34} w={46} h={8} fill hatch />
    <Box x={130} y={42} w={46} h={24} fill rows={2} cols={2} />
    <Line x1={153} y1={75} x2={153} y2={88} />
    <Line x1={140} y1={90} x2={166} y2={90} />
  </>
);

export const HR_CHALLENGE_SKETCHES: ReactNode[] = [PeopleSketch, BalanceSketch, PaperToScreenSketch];

// Loose pen loop drawn around the number
const CIRCLE_PATH = "M66 7 C38 -1 3 10 5 33 C7 55 42 63 72 56 C97 50 106 31 95 17 C86 6 64 1 34 11";

interface ChallengeSketchesProps {
  challenges: { number: string; question: string }[];
  /** One croquis per challenge, in order. */
  sketches?: ReactNode[];
  /** Colour of the pen circle around each number. */
  circleColor?: string;
  /** Fill colour for the croquis (defaults to the HacheR lavender). */
  fill?: string;
}

export default function ChallengeSketches({
  challenges, sketches = HR_CHALLENGE_SKETCHES, circleColor = GOLD, fill,
}: ChallengeSketchesProps) {
  const list = (
    <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
      {challenges.map((challenge, i) => {
        const delay = i * 0.15;
        return (
          <motion.li
            key={challenge.number}
            className="flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {sketches[i] && <SketchFrame className="max-w-[220px] mb-6 md:mb-8">{sketches[i]}</SketchFrame>}

            <div className="flex items-start gap-4">
              <span className="relative flex-shrink-0 px-3 py-1">
                <span className="relative z-10 text-[40px] md:text-[44px] font-bold leading-none text-ink">
                  {challenge.number}
                </span>
                <svg
                  viewBox="0 0 102 62"
                  fill="none"
                  className="absolute -left-1 -top-2 w-[calc(100%+8px)] h-[calc(100%+16px)] overflow-visible"
                  aria-hidden="true"
                >
                  <motion.path
                    d={CIRCLE_PATH}
                    stroke={circleColor}
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: delay + 0.35, ease: [0.65, 0, 0.35, 1] }}
                  />
                </svg>
              </span>
              <p className="type-body-l font-medium text-ink pt-2">{challenge.question}</p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
  return fill ? <SketchFillContext.Provider value={fill}>{list}</SketchFillContext.Provider> : list;
}
