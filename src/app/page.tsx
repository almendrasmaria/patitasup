import CatsView from "@/features/cats/components/CatsView";
import { mockCats } from "@/features/cats/data/mockCats";
import { listPublishedListingCats } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const listingCats = await listPublishedListingCats();
  const cats = [...listingCats, ...mockCats];

  return <CatsView cats={cats} />;
}
