import PetsDiscoverView from "@/features/pets/components/PetsDiscoverView";
import { mockCats } from "@/features/cats/data/mockCats";
import { listPublishedListingCats } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const listingCats = await listPublishedListingCats();
  const pets = [...listingCats, ...mockCats];

  return <PetsDiscoverView pets={pets} />;
}
