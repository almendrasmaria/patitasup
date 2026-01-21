import Navbar from "../../../shared/ui/Navbar";
import Hero from "../../../shared/ui/Hero";
import HowItWorksColumns from "../components/HowItWorksColumns";
import { howItWorksCards } from "../data/howItWorksData";
import Footer from "../../../shared/ui/Footer";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />

      <main>
        <section className="relative h-[472px] overflow-hidden rounded-b-[72px] bg-gradient-to-b from-[#5A7BFF] to-[#4E67FF]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12px 12px, rgba(255,255,255,0.5) 2px, transparent 2.5px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-14 text-center sm:px-6 lg:px-8">
            <Hero
              title="¿Cómo funciona PatitasUp?"
              subtitle="Nuestra misión es conectar gatos rescatados con familias responsables. El proceso es simple, transparente y seguro para todos."
            />
          </div>
        </section>

        <section className="relative z-20 -mt-[170px] pb-16">
          <HowItWorksColumns cards={howItWorksCards} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;