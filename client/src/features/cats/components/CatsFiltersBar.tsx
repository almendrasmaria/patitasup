import { FiChevronDown, FiSearch } from "react-icons/fi";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

const CatsFiltersBar = ({ query, onQueryChange }: Props) => {
  return (
    <div className="w-full rounded-2xl bg-white shadow-lg ring-1 ring-black/5 px-4 py-4 sm:px-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr_1fr] md:items-center md:gap-4">
        <div className="flex h-12 items-center gap-2 rounded-xl bg-[#F6F7F9] px-4 ring-1 ring-black/5 focus-within:ring-[#5170ff]/30 sm:px-5">
          <FiSearch className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar refugio..."
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex h-12 w-full select-none items-center justify-between rounded-xl bg-[#F6F7F9] px-4 text-sm text-slate-600 ring-1 ring-black/5 sm:px-5">
          <span>Cualquier edad</span>
          <FiChevronDown className="opacity-70" />
        </div>

        <div className="flex h-12 w-full select-none items-center justify-between rounded-xl bg-[#F6F7F9] px-4 text-sm text-slate-600 ring-1 ring-black/5 sm:px-5">
          <span>Ubicación</span>
          <FiChevronDown className="opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default CatsFiltersBar;