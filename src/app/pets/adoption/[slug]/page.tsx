import { notFound } from "next/navigation";

import AdoptionForm from "@/features/pets/components/adoption/AdoptionForm";
import { mockPets } from "@/features/pets/data/mockPets";
import type { Pet } from "@/features/pets/types";
import { findPublishedListingPetBySlug } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

async function loadPet(slug: string): Promise<Pet | null> {
  const fromDb = await findPublishedListingPetBySlug(slug);
  if (fromDb) return fromDb;
  return mockPets.find((p) => p.slug === slug) ?? null;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const pet = await loadPet(slug);
  if (!pet) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <AdoptionForm pet={pet} />
      </div>
    </div>
  );
}
