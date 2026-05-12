import CatsGrid from "./CatsGrid";
import Pagination from "./Pagination";
import type { Cat } from "../types";

type Props = {
  cats: Cat[];
  total?: number;

  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Label for the listing count, e.g. "gatos" or "mascotas". */
  entityLabel?: string;
  catFavorite?: (cat: Cat) => { active: boolean; onToggle: () => void } | undefined;
  /** When true, horizontal padding is omitted (parent already applies max-w-7xl + px). */
  contained?: boolean;
};

const CatsSection = ({
  cats,
  total,
  page,
  totalPages,
  onPageChange,
  entityLabel = "gatos",
  catFavorite,
  contained = false,
}: Props) => {
  return (
    <section
      id="cats-section"
      className={`scroll-mt-24 pb-12 ${contained ? "pt-0" : "pt-[40px]"}`}
    >
      <div className={contained ? "w-full" : "w-full px-6 lg:px-16"}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-semibold text-slate-700">{cats.length}</span>
            {typeof total === "number" ? (
              <>
                {" "}
                de <span className="font-semibold text-slate-700">{total}</span> {entityLabel}
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-6">
          <CatsGrid cats={cats} catFavorite={catFavorite} />
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onChange={onPageChange} />
      </div>
    </section>
  );
};

export default CatsSection;
