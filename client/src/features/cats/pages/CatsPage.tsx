import { useMemo, useState } from "react";
import Navbar from "../../../shared/ui/Navbar";
import Footer from "../../../shared/ui/Footer";
import CatsHero from "../components/CatsHero";
import CatsSection from "../components/CatsSection";
import CatsFiltersBar from "../components/CatsFiltersBar";
import { mockCats } from "../data/mockCats";
import { useCatSearch } from "../hooks/useCatFilters";
import type { AgeFilter } from "../components/AgeSelect";
import { matchesAgeFilter } from "../hooks/matchAge";

const PAGE_SIZE = 6;

const CatsPage = () => {
  const { query, setQuery, filteredCats } = useCatSearch(mockCats);

  const [page, setPage] = useState(1);
  const [age, setAge] = useState<AgeFilter>("any");

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleAgeChange = (value: AgeFilter) => {
    setAge(value);
    setPage(1);
  };

  const catsAfterAge = useMemo(
    () => filteredCats.filter((cat) => matchesAgeFilter(cat.ageLabel, age)),
    [filteredCats, age]
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(catsAfterAge.length / PAGE_SIZE)),
    [catsAfterAge.length]
  );

  const pageCats = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return catsAfterAge.slice(start, start + PAGE_SIZE);
  }, [catsAfterAge, page]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    const catsSection = document.getElementById("cats-section");
    catsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main>
        <CatsHero />

        <div id="cats-filters" className="relative z-30 w-full">
          <CatsFiltersBar
            query={query}
            onQueryChange={handleQueryChange}
            age={age}
            onAgeChange={handleAgeChange}
          />
        </div>

        <CatsSection
          cats={pageCats}
          total={catsAfterAge.length}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CatsPage;