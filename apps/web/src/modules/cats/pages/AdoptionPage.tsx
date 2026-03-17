import Hero from "@/shared/components/Hero";
import PawsSection from "@/shared/components/PawsSection";
import AdoptionForm from "../components/AdoptionForm";
import { mockCats } from "../data/mockCats";

type Props = {
  slug: string;
};

const AdoptionPage = ({ slug }: Props) => {
  const cat = mockCats.find((item) => item.slug === slug);

  if (!cat) {
    return <div>Gatito no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection className="h-[540px] sm:h-[560px] md:h-[500px] lg:h-[460px]">
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
};

export default AdoptionPage;