import { FiChevronDown, FiSearch, FiMap } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

const CatsFiltersBar = ({ query, onQueryChange }: Props) => {
  return (
    <div className="w-full bg-white">
      <div className="border-y border-black/5">
        <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.6fr_1fr_1fr] md:items-center">
            <div className="flex h-12 items-center gap-2 rounded-xl bg-[#F6F7F9] px-4 ring-1 ring-black/5 focus-within:ring-[#5170ff]/30 sm:px-5">
              <FiSearch className="text-slate-400" />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Buscar refugio..."
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex h-12 w-full select-none items-center justify-between rounded-xl bg-[#F6F7F9] px-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <FaBirthdayCake className="text-slate-400" />
                Cualquier edad
              </span>
              <FiChevronDown className="text-slate-400" />
            </div>

            <div className="flex h-12 w-full select-none items-center justify-between rounded-xl bg-[#F6F7F9] px-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <FiMap className="text-slate-400" />
                Ubicación
              </span>
              <FiChevronDown className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatsFiltersBar;