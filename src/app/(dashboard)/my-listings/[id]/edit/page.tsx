import { notFound, redirect } from "next/navigation";

import NewListingForm from "@/features/listings/components/NewListingForm";
import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { findListingForProfile } from "@/features/listings/lib/listingsRepository";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const profile = await getCurrentListingProfile();

  if (!profile) {
    redirect("/login");
  }

  const { id } = await params;
  const listing = await findListingForProfile(profile.id, id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--warm-sand)]">
      <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <NewListingForm mode="edit" listingId={id} initialValues={listing} />
      </section>
    </div>
  );
}
