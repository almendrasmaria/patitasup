"use client";

import type { Cat } from "../types";
import { usePetSearch } from "@/features/pets/hooks/usePetSearch";

export function useCatSearch(cats: Cat[]) {
  const { query, setQuery, filteredPets } = usePetSearch(cats);

  return { query, setQuery, filteredCats: filteredPets };
}
