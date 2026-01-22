import CatsGrid from "./CatsGrid";
import type { Cat } from "../model";

type Props = {
  cats: Cat[];
  total?: number;
};

const CatsSection = ({ cats, total }: Props) => {
  return (
    <section className="pb-12 pt-[92px]">
      <div className="w-full px-4 md:px-[50px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-semibold text-slate-700">{cats.length}</span>
            {typeof total === "number" ? (
              <>
                {" "}
                de <span className="font-semibold text-slate-700">{total}</span> gatos
              </>
            ) : null}
          </p>
        </div>

        <div className="mt-6">
          <CatsGrid cats={cats} />
        </div>

      </div>
    </section>
  );
};

export default CatsSection;