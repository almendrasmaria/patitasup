import { useMemo, useState } from "react";
import Navbar from "../../../shared/ui/Navbar";
import Footer from "../../../shared/ui/Footer";
import CatsHero from "../components/CatsHero";
import CatsSection from "../components/CatsSection";
import CatsFiltersBar from "../components/CatsFiltersBar";
import { mockCats } from "../data/mockCats";
import { useCatSearch } from "../hooks/useCatFilters";

const PAGE_SIZE = 6;

const CatsPage = () => {
  const { query, setQuery, filteredCats } = useCatSearch(mockCats);
  const [page, setPage] = useState(1);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredCats.length / PAGE_SIZE)),
    [filteredCats.length]
  );

  const pageCats = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCats.slice(start, start + PAGE_SIZE);
  }, [filteredCats, page]);

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
        <div  id="cats-filters" className="relative z-30 w-full">
          <CatsFiltersBar query={query} onQueryChange={handleQueryChange} />
        </div>
        <CatsSection
          cats={pageCats}
          total={filteredCats.length}
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