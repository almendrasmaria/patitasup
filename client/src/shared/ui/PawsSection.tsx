import type { ReactNode } from "react";
import { FaPaw } from "react-icons/fa";

type Props = {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  pawsCount?: number;
};

const PawsSection = ({
  children,
  className,
  bgColor = "#7061F0",
  pawsCount = 60,
}: Props) => {
  return (
    <section
      className={["relative w-full overflow-hidden text-white", className]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: bgColor }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="grid h-full w-full grid-cols-6 gap-12 opacity-20 sm:grid-cols-8 lg:grid-cols-10">
          {Array.from({ length: pawsCount }).map((_, i) => (
            <FaPaw
              key={i}
              size={18}
              className="mx-auto text-white/55"
              style={{ transform: `rotate(${(i % 4) * 20 - 20}deg)` }}
            />
          ))}
        </div>
      </div>

      <div className="relative">{children}</div>
    </section>
  );
};

export default PawsSection;