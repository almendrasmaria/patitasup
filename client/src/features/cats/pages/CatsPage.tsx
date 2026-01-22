import Navbar from "../../../shared/ui/Navbar";
import Footer from "../../../shared/ui/Footer";
import CatsHero from "../components/CatsHero";
import CatsSection from "../components/CatsSection";


import { mockCats } from "../data/mockCats";
import { useCatSearch } from "../hooks/useCatFilters";

const CatsPage = () => {
  const { query, setQuery, filteredCats } = useCatSearch(mockCats);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />
      <main>
        <CatsHero query={query} onQueryChange={setQuery} />
        <CatsSection cats={filteredCats} total={mockCats.length} />
      </main>
      <Footer />
    </div>
  );
};

export default CatsPage;