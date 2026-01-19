import { FiChevronDown } from "react-icons/fi";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch?: () => void;
};

const CatsFiltersBar = ({ query, onQueryChange, onSearch }: Props) => {
  return (
    <div className="w-full rounded-xl bg-white shadow-sm ring-1 ring-black/5 px-5 py-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
        
        <div className="flex h-12 items-center rounded-xl bg-slate-50 px-5 ring-1 ring-slate-200 focus-within:ring-[#5170ff]/40">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar refugio..."
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex h-12 w-full items-center justify-between rounded-xl bg-slate-50 px-5 text-sm text-slate-400 ring-1 ring-slate-200 cursor-not-allowed">
          <span>Cualquier edad</span>
          <FiChevronDown />
        </div>

        <div className="flex h-12 w-full items-center justify-between rounded-xl bg-slate-50 px-5 text-sm text-slate-400 ring-1 ring-slate-200 cursor-not-allowed">
          <span>Todas las zonas</span>
          <FiChevronDown />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-12 w-full md:w-auto rounded-xl bg-[#5170ff] px-8 text-sm font-semibold text-white hover:bg-[#405de6]"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default CatsFiltersBar;