import { listPublishedListingPets } from "@/features/listings/lib/listingsRepository";
import { mockPets } from "@/features/pets/data/mockPets";
import type { Pet } from "@/features/pets/types";

function shuffleInPlace<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = array[i]!;
    array[i] = array[j]!;
    array[j] = tmp;
  }
}

export async function getHomeSpotlightPets(): Promise<Pet[]> {
  const listingPets = await listPublishedListingPets();
  const combined = [...listingPets, ...mockPets];
  shuffleInPlace(combined);
  return combined.slice(0, 4);
}
