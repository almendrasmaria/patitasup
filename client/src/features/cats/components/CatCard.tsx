import { HiOutlineLocationMarker } from "react-icons/hi";
import CatInfoChip from "./CatInfoChip";
import type { Cat } from "../model";

type Props = {
  cat: Cat;
};

const CatCard = ({ cat }: Props) => {
  return (
    <article className="w-full overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-black/5">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={cat.image}
          alt={cat.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
          <div className="text-3xl font-semibold text-white">
            {cat.name}
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <HiOutlineLocationMarker className="h-4 w-4 shrink-0" />
            <span>{cat.locationLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 pt-5 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <CatInfoChip label="Edad" value={cat.ageLabel} />
          <CatInfoChip
            label="Sexo"
            value={cat.sex === "male" ? "Macho" : "Hembra"}
          />
        </div>

        <p className="text-sm leading-relaxed text-slate-600">
          {cat.description}
        </p>

        <div className="h-px w-full bg-slate-200" />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE9FE] text-[#7061F0] text-lg font-semibold">
              {cat.rescueInstagram?.[1]?.toUpperCase() ?? "A"}
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Rescatado por
              </div>
              <div className="text-sm font-semibold text-slate-800">
                {cat.rescueInstagram || "Refugio"}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="rounded-full bg-[#0F172A] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Adoptar
          </button>
        </div>
      </div>
    </article>
  );
};

export default CatCard;