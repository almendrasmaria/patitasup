import CatsGrid from "./CatsGrid";
import Pagination from "./Pagination";
import type { Cat } from "../model";

type Props = {
  cats: Cat[];
  total?: number;

  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const CatsSection = ({ cats, total, page, totalPages, onPageChange }: Props) => {
  return (
    <section id="cats-section" className="pb-12 pt-[40px] scroll-mt-24">
      <div className="w-full px-6 lg:px-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Mostrando{" "}
            <span className="font-semibold text-slate-700">{cats.length}</span>
            {typeof total === "number" ? (
              <>
                {" "}
                de <span className="font-semibold text-slate-700">{total}</span>{" "}
                gatos
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-6">
          <CatsGrid cats={cats} />
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onChange={onPageChange} />
      </div>
    </section>
  );
};

export default CatsSection;