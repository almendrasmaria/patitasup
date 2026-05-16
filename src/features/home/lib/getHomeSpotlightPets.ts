import { listPublishedListingPets } from "@/features/listings/lib/listingsRepository";
import { mockPets } from "@/features/pets/data/mockPets";
import type { Pet } from "@/features/pets/types";

const SPOTLIGHT_COUNT = 4;

export async function getHomeSpotlightPets(): Promise<Pet[]> {
  const listingPets = await listPublishedListingPets();
  const combined = [...listingPets, ...mockPets];
  return combined.slice(0, SPOTLIGHT_COUNT);
}