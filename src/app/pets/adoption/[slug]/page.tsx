import { notFound } from "next/navigation";

import AdoptionForm from "@/features/cats/components/AdoptionForm";
import { mockCats } from "@/features/cats/data/mockCats";
import type { Cat } from "@/features/cats/types";
import { findPublishedListingCatBySlug } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

async function loadCat(slug: string): Promise<Cat | null> {
  const fromDb = await findPublishedListingCatBySlug(slug);
  if (fromDb) return fromDb;
  return mockCats.find((c) => c.slug === slug) ?? null;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cat = await loadCat(slug);
  if (!cat) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <AdoptionForm cat={cat} />
      </div>
    </div>
  );
}
