import PetsDiscoverView from "@/features/pets/components/PetsDiscoverView";
import { mockPets } from "@/features/pets/data/mockPets";
import { listPublishedListingPets } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const listingPets = await listPublishedListingPets();
  const pets = [...listingPets, ...mockPets];

  return <PetsDiscoverView pets={pets} />;
}
