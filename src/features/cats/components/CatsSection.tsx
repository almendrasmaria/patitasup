import CatsGrid from "./CatsGrid";
import Pagination from "./Pagination";
import type { Pet } from "@/features/pets/types";

type Props = {
  pets: Pet[];
  total?: number;

  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Label for the listing count, e.g. "mascotas". */
  entityLabel?: string;
  petFavorite?: (pet: Pet) => { active: boolean; onToggle: () => void } | undefined;
  /** When true, horizontal padding is omitted (parent already applies max-w-7xl + px). */
  contained?: boolean;
};

const CatsSection = ({
  pets,
  total,
  page,
  totalPages,
  onPageChange,
  entityLabel = "mascotas",
  petFavorite,
  contained = false,
}: Props) => {
  return (
    <section
      id="pets-section"
      className={`scroll-mt-24 pb-12 ${contained ? "pt-0" : "pt-[40px]"}`}
    >
      <div className={contained ? "w-full" : "w-full px-6 lg:px-16"}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-semibold text-slate-700">{pets.length}</span>
            {typeof total === "number" ? (
              <>
                {" "}
                de <span className="font-semibold text-slate-700">{total}</span> {entityLabel}
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-6">
          <CatsGrid pets={pets} petFavorite={petFavorite} />
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onChange={onPageChange} />
      </div>
    </section>
  );
};

export default CatsSection;
