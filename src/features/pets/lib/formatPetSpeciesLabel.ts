import type { PublicationFormSpecies } from "@/features/listings/types";

import type { PetSpecies } from "../types";

export function formatPetSpeciesLabel(
  species: PetSpecies | PublicationFormSpecies | undefined,
): string {
  return species === "dog" ? "Perro" : "Gato";
}
