import AdoptDiscoverView from "@/features/adopt/components/AdoptDiscoverView";
import { mockCats } from "@/features/cats/data/mockCats";
import { listPublishedListingCats } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const listingCats = await listPublishedListingCats();
  const pets = [...listingCats, ...mockCats];

  return <AdoptDiscoverView pets={pets} />;
}
