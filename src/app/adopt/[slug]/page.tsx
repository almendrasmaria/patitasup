import Hero from "@/components/Hero";
import PawsSection from "@/components/PawsSection";
import AdoptionForm from "@/features/cats/components/AdoptionForm";
import { mockCats } from "@/features/cats/data/mockCats";
import { findPublishedListingCatBySlug } from "@/features/listings/lib/listingsRepository";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const listingCat = await findPublishedListingCatBySlug(slug);
  const cat = listingCat ?? mockCats.find((item) => item.slug === slug);

  if (!cat) {
    return <div>Gatito no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection className="h-135 sm:h-140 md:h-125 lg:h-115">
          <div className="mx-auto max-w-5xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
            <Hero
              badgeText="Solicitud de adopción"
              variant="page"
              title={`Estás a un paso de adoptar a ${cat.name}`}
              subtitle="Completa el formulario a continuación para que podamos conocerte mejor y encontrar el hogar perfecto para él."
            />
          </div>
        </PawsSection>

        <section className="relative z-10 mx-auto -mt-24 max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <AdoptionForm cat={cat} />
        </section>
      </main>
    </div>
  );
}