import { labs } from "../../data/labs";
import { LabCard } from "./LabCard";

/** Home "Laboratorio" section: one card per experiment. */
export default function LabSection() {
  // Desktop: cards share the row (max 3 columns)
  const desktopCols = labs.length >= 3 ? "md:grid-cols-3" : labs.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <div className="h-full flex flex-col px-4 md:pl-[440px] md:pr-[60px] md:justify-center pb-6 md:pb-0">
      <span className="md:hidden type-overline text-[#9A9A9A] pt-3 pb-2">Laboratorio</span>

      <div className="flex flex-col flex-1 min-h-0 md:flex-none">
        <div className={`flex flex-col gap-2 flex-1 min-h-0 md:grid ${desktopCols} md:gap-3 md:flex-none md:h-[58vh]`}>
          {labs.map((lab) => (
            <div key={lab.id} className="flex-1 min-h-0 md:h-full">
              <LabCard lab={lab} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
