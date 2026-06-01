"use client";

import { useMemo, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { FiSearch, FiUsers } from "react-icons/fi";

import MinimalSelect, { type MinimalSelectOption } from "@/components/ui/MinimalSelect";
import { petMatchesAgeFilter, type AgeFilter } from "@/features/pets/lib/petAgeFilter";
import PetAgeRangeFilter from "./PetAgeRangeFilter";
import PetDetailModal from "./PetDetailModal";
import PetsSection from "./PetsSection";
import { usePetSearch } from "@/features/pets/hooks/usePetSearch";
import type { Pet, PetSpecies } from "@/features/pets/types";

const PAGE_SIZE = 6;

type SpeciesFilter = "any" | PetSpecies;
type SexFilter = "any" | "male" | "female";

const SPECIES_OPTIONS = [
  { value: "any" as const, label: "Todos" },
  { value: "dog" as const, label: "Perro" },
  { value: "cat" as const, label: "Gato" },
] satisfies MinimalSelectOption<SpeciesFilter>[];

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

export default function PetsDiscoverView({ pets }: Props) {
  const { query, setQuery, filteredPets } = usePetSearch(pets);

  const [page, setPage] = useState(1);
  const [species, setSpecies] = useState<SpeciesFilter>("any");
  const [sex, setSex] = useState<SexFilter>("any");
  const [ageFilter, setAgeFilter] = useState<AgeFilter>("any");

  // Open the detail modal directly from a shared link (/pets?pet=<slug>).
  // Read during init (client only) so there's no setState-in-effect; the modal
  // itself is mount-gated, so this can't cause a hydration mismatch.
  const [selectedPet, setSelectedPet] = useState<Pet | null>(() => {
    if (typeof window === "undefined") return null;
    const slug = new URLSearchParams(window.location.search).get("pet");
    return slug ? pets.find((pet) => pet.slug === slug) ?? null : null;
  });

  const syncPetParam = (slug: string | null) => {
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set("pet", slug);
    } else {
      url.searchParams.delete("pet");
    }
    window.history.replaceState(null, "", url);
  };

  const handleOpenDetail = (pet: Pet) => {
    setSelectedPet(pet);
    syncPetParam(pet.slug);
  };

  const handleCloseDetail = () => {
    setSelectedPet(null);
    syncPetParam(null);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleSpeciesChange = (value: SpeciesFilter) => {
    setSpecies(value);
    setPage(1);
  };

  const handleSexChange = (value: SexFilter) => {
    setSex(value);
    setPage(1);
  };

  const handleAgeFilterChange = (next: AgeFilter) => {
    setAgeFilter(next);
    setPage(1);
  };

  const petsAfterFilters = useMemo(() => {
    return filteredPets
      .filter((pet) => matchesSpecies(pet, species))
      .filter((pet) => matchesSex(pet, sex))
      .filter((pet) => petMatchesAgeFilter(pet.ageLabel, ageFilter));
  }, [filteredPets, species, sex, ageFilter]);

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
    document.getElementById("pets-results")?.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)]">
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
              placeholder="Buscar por refugio, rescatista o ubicación..."
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
              ariaLabel="Sexo"
              label="Sexo"
              value={sex}
              onChange={handleSexChange}
              options={SEX_OPTIONS}
              leadingIcon={<FiUsers />}
            />
            <PetAgeRangeFilter value={ageFilter} onChange={handleAgeFilterChange} />
          </div>
        </div>
      </header>

      <div id="pets-results" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {petsAfterFilters.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-lg font-normal text-[var(--primary)]">No encontramos mascotas con esos criterios.</p>
            <p className="mt-2 text-sm font-normal text-[var(--muted-foreground)]">
              Probá ampliar la búsqueda o cambiar los filtros.
            </p>
          </div>
        ) : (
          <PetsSection
            pets={pagePets}
            total={petsAfterFilters.length}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            entityLabel="mascotas"
            onOpenDetail={handleOpenDetail}
            contained
          />
        )}
      </div>

      <PetDetailModal pet={selectedPet} onClose={handleCloseDetail} />
    </div>
  );
}
