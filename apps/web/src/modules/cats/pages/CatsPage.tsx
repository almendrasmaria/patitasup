"use client";

import { useMemo, useState } from "react";
import Hero from "@/shared/components/Hero";
import PawsSection from "@/shared/components/PawsSection";
import CatsSection from "../components/CatsSection";
import CatsFiltersBar from "../components/CatsFiltersBar";
import { mockCats } from "../data/mockCats";
import { useCatSearch } from "../hooks/useCatSearch";
import type { AgeFilter } from "../components/AgeSelect";
import type { LocationFilter } from "../components/LocationSelect";
import { matchesAgeFilter } from "../hooks/matchAge";

const PAGE_SIZE = 6;

const CatsPage = () => {
  const { query, setQuery, filteredCats } = useCatSearch(mockCats);

  const [page, setPage] = useState(1);
  const [age, setAge] = useState<AgeFilter>("any");
  const [location, setLocation] = useState<LocationFilter>("any");

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleAgeChange = (value: AgeFilter) => {
    setAge(value);
    setPage(1);
  };

  const handleLocationChange = (value: LocationFilter) => {
    setLocation(value);
    setPage(1);
  };

  const catsAfterFilters = useMemo(() => {
    return filteredCats
      .filter((cat) => matchesAgeFilter(cat.ageLabel, age))
      .filter((cat) => {
        if (location === "any") return true;
        return cat.locationLabel === location;
      });
  }, [filteredCats, age, location]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(catsAfterFilters.length / PAGE_SIZE)),
    [catsAfterFilters.length],
  );

  const pageCats = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return catsAfterFilters.slice(start, start + PAGE_SIZE);
  }, [catsAfterFilters, page]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    const catsSection = document.getElementById("cats-section");
    catsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection>
          <Hero
            badgeText="Bienvenido a PatitasUp"
            variant="home"
            title="Encontrá a tu próximo compañero felino"
            subtitle={`Conectamos gatitos rescatados con familias listas para brindar amor.\n¿Listo para encontrar a tu compañero perfecto?`}
            primaryButton={{
              label: "Adoptar Gato",
              onClick: () => {
                document
                  .getElementById("cats-filters")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              },
            }}
            secondaryButton={{
              label: "Publicar Ahora",
            }}
          />
        </PawsSection>

        <div id="cats-filters" className="relative z-30 w-full">
          <CatsFiltersBar
            query={query}
            onQueryChange={handleQueryChange}
            age={age}
            onAgeChange={handleAgeChange}
            location={location}
            onLocationChange={handleLocationChange}
          />
        </div>

        <CatsSection
          cats={pageCats}
          total={catsAfterFilters.length}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default CatsPage;
