import { FiSearch } from "react-icons/fi";
import AgeSelect, { type AgeFilter } from "./AgeSelect";
import LocationSelect, { type LocationFilter } from "./LocationSelect";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;

  age: AgeFilter;
  onAgeChange: (value: AgeFilter) => void;

  location: LocationFilter;
  onLocationChange: (value: LocationFilter) => void;
};

const CatsFiltersBar = ({
  query,
  onQueryChange,
  age,
  onAgeChange,
  location,
  onLocationChange,
}: Props) => {
  return (
    <div className="w-full bg-white">
      <div className="border-y border-black/5">
        <div className="mx-auto w-full px-6 py-6 lg:px-16">
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

            <AgeSelect value={age} onChange={onAgeChange} />

            <LocationSelect value={location} onChange={onLocationChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatsFiltersBar;