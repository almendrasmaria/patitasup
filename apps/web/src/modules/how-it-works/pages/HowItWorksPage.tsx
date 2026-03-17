import Hero from "@/shared/components/Hero";
import PawsSection from "@/shared/components/PawsSection";
import HowItWorksColumns from "../components/HowItWorksColumns";
import { howItWorksCards } from "../data/howItWorksData";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection className="h-[472px]">
          <div className="mx-auto flex h-full max-w-6xl items-start justify-center px-4 pt-18 sm:pt-22 lg:pt-26 lg:px-8 lg:pt-16">
            <Hero
              badgeText="Cómo funciona"
              variant="page"
              title="¿Cómo funciona PatitasUp?"
              subtitle="Nuestra misión es conectar gatos rescatados con familias responsables. El proceso es simple, transparente y seguro para todos."
            />
          </div>
        </PawsSection>

        <section className="relative z-10 mx-auto -mt-16 pb-24 sm:-mt-20 lg:-mt-24">
          <HowItWorksColumns cards={howItWorksCards} />
        </section>
      </main>
    </div>
  );
};

export default HowItWorksPage;