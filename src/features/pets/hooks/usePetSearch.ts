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

  const rescueHandle = normalizeRescueHandle(pet.rescueInstagram ?? "");
  const location = pet.locationLabel.trim().toLowerCase();
  const haystack = `${rescueHandle} ${location}`.trim();

  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  return tokens.every((token) => {
    const t = token.startsWith("@") ? token.slice(1) : token;
    if (!t) return true;
    return haystack.includes(t);
  });
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
