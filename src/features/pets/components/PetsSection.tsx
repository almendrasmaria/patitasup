import type { Pet } from "@/features/pets/types";

import PetsGrid from "./PetsGrid";
import PetsPagination from "./PetsPagination";

type Props = {
  pets: Pet[];
  total?: number;

  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  entityLabel?: string;
  petFavorite?: (pet: Pet) => { active: boolean; onToggle: () => void } | undefined;
  contained?: boolean;
};

export default function PetsSection({
  pets,
  total,
  page,
  totalPages,
  onPageChange,
  entityLabel = "mascotas",
  petFavorite,
  contained = false,
}: Props) {
  return (
    <section id="pets-section" className={`scroll-mt-24 pb-12 ${contained ? "pt-0" : "pt-[40px]"}`}>
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
          <PetsGrid pets={pets} petFavorite={petFavorite} />
        </div>

        <PetsPagination currentPage={page} totalPages={totalPages} onChange={onPageChange} />
      </div>
    </section>
  );
}
