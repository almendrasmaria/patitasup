"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { FiCalendar, FiSearch, FiUsers } from "react-icons/fi";

import MinimalSelect, { type MinimalSelectOption } from "@/components/ui/MinimalSelect";
import type { AgeFilter } from "@/features/cats/components/AgeSelect";
import CatsSection from "@/features/cats/components/CatsSection";
import { matchesAgeFilter } from "@/features/cats/lib/matchAge";
import { usePetSearch } from "@/features/pets/hooks/usePetSearch";
import type { Pet, PetSpecies } from "@/features/pets/types";

const PAGE_SIZE = 6;

type SpeciesFilter = "any" | PetSpecies;
type SexFilter = "any" | "male" | "female";
/** Subset of AgeFilter without senior for this screen */
type AdoptAgeFilter = Extract<AgeFilter, "any" | "kitten" | "young" | "adult">;

const SPECIES_OPTIONS = [
  { value: "any" as const, label: "Todos" },
  { value: "dog" as const, label: "Perro" },
  { value: "cat" as const, label: "Gato" },
] satisfies MinimalSelectOption<SpeciesFilter>[];

const AGE_OPTIONS = [
  { value: "any" as const, label: "Todas las edades" },
  { value: "kitten" as const, label: "Cachorro" },
  { value: "young" as const, label: "Joven" },
  { value: "adult" as const, label: "Adulto" },
] satisfies MinimalSelectOption<AdoptAgeFilter>[];

const SEX_OPTIONS = [
  { value: "any" as const, label: "Ambos sexos" },
  { value: "male" as const, label: "Macho" },
  { value: "female" as const, label: "Hembra" },
] satisfies MinimalSelectOption<SexFilter>[];

function speciesOf(pet: Pet): PetSpecies {
  return pet.species ?? "cat";
}

function matchesSpecies(pet: Pet, filter: SpeciesFilter): boolean {
  if (filter === "any") return true;
  return speciesOf(pet) === filter;
}

function matchesSex(pet: Pet, filter: SexFilter): boolean {
  if (filter === "any") return true;
  return pet.sex === filter;
}

type Props = {
  pets: Pet[];
};

export default function AdoptDiscoverView({ pets }: Props) {
  const { query, setQuery, filteredPets } = usePetSearch(pets);

  const headerRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(1);
  const [species, setSpecies] = useState<SpeciesFilter>("any");
  const [age, setAge] = useState<AdoptAgeFilter>("any");
  const [sex, setSex] = useState<SexFilter>("any");
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderMeasurements = () => {
      setHeaderHeight(header.getBoundingClientRect().height);
    };

    updateHeaderMeasurements();

    const resizeObserver = new ResizeObserver(updateHeaderMeasurements);
    resizeObserver.observe(header);
    window.addEventListener("resize", updateHeaderMeasurements);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderMeasurements);
    };
  }, []);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleSpeciesChange = (value: SpeciesFilter) => {
    setSpecies(value);
    setPage(1);
  };

  const handleAgeChange = (value: AdoptAgeFilter) => {
    setAge(value);
    setPage(1);
  };

  const handleSexChange = (value: SexFilter) => {
    setSex(value);
    setPage(1);
  };

  const petsAfterFilters = useMemo(() => {
    return filteredPets
      .filter((pet) => matchesSpecies(pet, species))
      .filter((pet) => matchesAgeFilter(pet.ageLabel, age as AgeFilter))
      .filter((pet) => matchesSex(pet, sex));
  }, [filteredPets, species, age, sex]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(petsAfterFilters.length / PAGE_SIZE)),
    [petsAfterFilters.length],
  );

  const pagePets = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return petsAfterFilters.slice(start, start + PAGE_SIZE);
  }, [petsAfterFilters, page]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    document.getElementById("adopt-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header
        ref={headerRef}
        className="sticky top-0 z-[950] border-b border-[var(--border)] bg-white/90 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="mb-1 text-3xl font-medium tracking-tight text-[var(--primary)]">Mascotas en adopción</h1>

            <p className="text-sm font-normal text-[var(--muted-foreground)]">Filtrá y encontrá compañeros compatibles con vos.</p>
          </div>

          <div className="relative mb-6">
            <FiSearch
              className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]/40"
              aria-hidden
              strokeWidth={1.5}
            />

            <input
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Buscar por nombre, ubicación o características..."
              className="
                w-full
                rounded-2xl
                border border-transparent
                bg-[var(--warm-sand)]
                py-4 pr-4 pl-12
                text-[15px] font-normal text-[var(--primary)]
                placeholder:font-light placeholder:text-[var(--soft-gray)]/75
                shadow-none
                transition-colors duration-200 ease-out
                hover:bg-[var(--warm-beige)]
                focus:border-[var(--warm-orange)]/85 focus:bg-[var(--warm-sand)] focus:shadow-none focus:outline-none
                focus-visible:border-[var(--warm-orange)]/85
              "
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <MinimalSelect
              ariaLabel="Tipo de mascota"
              label="Tipo de mascota"
              value={species}
              onChange={handleSpeciesChange}
              options={SPECIES_OPTIONS}
              leadingIcon={<FaPaw />}
            />
            <MinimalSelect
              ariaLabel="Edad"
              label="Edad"
              value={age}
              onChange={handleAgeChange}
              options={AGE_OPTIONS}
              leadingIcon={<FiCalendar />}
            />
            <MinimalSelect
              ariaLabel="Sexo"
              label="Sexo"
              value={sex}
              onChange={handleSexChange}
              options={SEX_OPTIONS}
              leadingIcon={<FiUsers />}
            />
          </div>
        </div>
      </header>

      <main
        id="adopt-results"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        style={{
          scrollMarginTop: headerHeight > 0 ? headerHeight + 24 : 96,
        }}
      >
        {petsAfterFilters.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-lg font-normal text-[var(--primary)]">No encontramos mascotas con esos criterios.</p>
            <p className="mt-2 text-sm font-normal text-[var(--muted-foreground)]">
              Probá ampliar la búsqueda o cambiar los filtros.
            </p>
          </div>
        ) : (
          <CatsSection
            cats={pagePets}
            total={petsAfterFilters.length}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            entityLabel="mascotas"
            contained
          />
        )}
      </main>
    </div>
  );
}
