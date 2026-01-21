import { FiChevronDown } from "react-icons/fi";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch?: () => void;
};

const CatsFiltersBar = ({ query, onQueryChange, onSearch }: Props) => {
  return (
    <div className="w-full rounded-2xl bg-black/22 shadow-lg ring-1 ring-white/20 px-4 py-4 sm:px-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center md:gap-4">
        <div className="flex h-12 items-center rounded-xl bg-white/18 px-4 ring-1 ring-white/25 focus-within:ring-white/40 sm:px-5">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar refugio..."
            className="w-full bg-transparent text-sm text-white/95 placeholder:text-white/65 focus:outline-none"
          />
        </div>

        <div className="flex h-12 w-full cursor-not-allowed items-center justify-between rounded-xl bg-white/18 px-4 text-sm text-white/85 ring-1 ring-white/25 sm:px-5">
          <span>Cualquier edad</span>
          <FiChevronDown className="opacity-80" />
        </div>

        <div className="flex h-12 w-full cursor-not-allowed items-center justify-between rounded-xl bg-white/18 px-4 text-sm text-white/85 ring-1 ring-white/25 sm:px-5">
          <span>Todas las zonas</span>
          <FiChevronDown className="opacity-80" />
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="h-12 w-full rounded-xl bg-[#5170ff] px-8 text-sm font-semibold text-white hover:bg-[#405de6]"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default CatsFiltersBar;