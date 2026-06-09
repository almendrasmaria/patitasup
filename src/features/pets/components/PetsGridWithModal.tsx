"use client";

import { useState } from "react";

import type { Pet } from "@/features/pets/types";

import PetDetailModal from "./PetDetailModal";
import PetsGrid from "./PetsGrid";

type Props = {
  pets: Pet[];
  initialPetSlug?: string;
};

export default function PetsGridWithModal({ pets, initialPetSlug }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(
    () => (initialPetSlug ? pets.find((pet) => pet.slug === initialPetSlug) ?? null : null),
  );

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

  const buildShareUrl = (pet: Pet) =>
    `${window.location.origin}${window.location.pathname}?pet=${pet.slug}`;

  return (
    <>
      <PetsGrid pets={pets} onOpenDetail={handleOpenDetail} />
      <PetDetailModal pet={selectedPet} onClose={handleCloseDetail} buildShareUrl={buildShareUrl} />
    </>
  );
}
