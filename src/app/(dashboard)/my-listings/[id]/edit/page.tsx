import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import NewListingForm from "@/features/listings/components/NewListingForm";
import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { findListingForProfile } from "@/features/listings/lib/listingsRepository";
import SectionTitle from "@/features/listings/components/SectionTitle";
import { secondaryCtaClass } from "@/features/listings/lib/listingStyles";

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
    <main className="min-h-screen bg-[var(--surface-dashboard)]">
      <section className="mx-auto max-w-350 px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:py-10 2xl:py-12">
        <div className="min-w-0 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 md:p-8">
          <div className="mx-auto w-full max-w-6xl xl:max-w-340 2xl:max-w-376">
            <div className="space-y-7">
              <SectionTitle
                title="Editar publicación"
                action={
                  <Link href="/my-listings" className={`${secondaryCtaClass} w-full justify-center sm:w-auto`}>
                    <FiArrowLeft className="h-5 w-5" aria-hidden />
                    <span>Volver</span>
                  </Link>
                }
              />

              <NewListingForm mode="edit" listingId={id} initialValues={listing} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
