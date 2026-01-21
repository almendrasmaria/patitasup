import Navbar from "../../../shared/ui/Navbar";
import HeroHome from "../components/HeroHome";
import CatsGrid from "../../cats/components/CatsGrid";
import { mockCats } from "../../cats/data/mockCats";
import { useCatSearch } from "../../cats/hooks/useCatFilters"; 
import Footer from "../../../shared/ui/Footer";

const HomePage = () => {
  const { query, setQuery, filteredCats } = useCatSearch(mockCats);

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />

      <main>
        <HeroHome query={query} onQueryChange={setQuery} />

        <section className="py-12">
          <div className="w-full px-4 md:px-[50px]">
            <div className="mt-6">
              <CatsGrid cats={filteredCats} />
            </div>
          </div>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default HomePage;