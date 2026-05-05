import MyListingsClient from "@/features/listings/components/MyListingsClient";
import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { listListingsForProfile } from "@/features/listings/lib/listingsRepository";

export default async function Page() {
  const profile = await getCurrentListingProfile();
  const listings = profile ? await listListingsForProfile(profile.id) : [];

  return (
    <main className="min-h-screen bg-[#F5F6FB]">
      <section className="mx-auto max-w-350 px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:py-10 2xl:py-12">
        <div className="min-w-0 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 md:p-8">
          <MyListingsClient listings={listings} />
        </div>
      </section>
    </main>
  );
}
