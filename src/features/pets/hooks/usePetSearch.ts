"use client";

import { useMemo, useState } from "react";

import type { Pet } from "@/features/pets/types";

function normalizeRescueHandle(handle: string) {
  const normalized = handle.trim().toLowerCase();
  return normalized.startsWith("@") ? normalized.slice(1) : normalized;
}

function petMatchesSearchQuery(pet: Pet, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  const rescueQuery = query.startsWith("@") ? query.slice(1) : query;
  const rescueHandle = normalizeRescueHandle(pet.rescueInstagram ?? "");

  return rescueHandle.startsWith(rescueQuery) || rescueHandle.includes(rescueQuery);
}

export function usePetSearch(pets: Pet[]) {
  const [query, setQuery] = useState("");

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => petMatchesSearchQuery(pet, query));
  }, [pets, query]);

  return {
    query,
    setQuery,
    filteredPets,
  };
}
