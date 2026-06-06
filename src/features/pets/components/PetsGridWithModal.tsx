"use client";

import { useState } from "react";

import type { Pet } from "@/features/pets/types";

import PetDetailModal from "./PetDetailModal";
import PetsGrid from "./PetsGrid";

type Props = {
  pets: Pet[];
};

export default function PetsGridWithModal({ pets }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  return (
    <>
      <PetsGrid pets={pets} onOpenDetail={setSelectedPet} />
      <PetDetailModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
    </>
  );
}
