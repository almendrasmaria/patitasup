import MyListingsClient from "@/features/listings/components/MyListingsClient";
import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { listListingsForProfile } from "@/features/listings/lib/listingsRepository";

export default async function Page() {
  const profile = await getCurrentListingProfile();
  const listings = profile ? await listListingsForProfile(profile.id) : [];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <MyListingsClient listings={listings} />
      </section>
    </div>
  );
}
