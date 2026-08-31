import Hero from "@/components/Hero";
import PawsSection from "@/components/PawsSection";
import ContactFormCard from "@/features/contact/components/ContactFormCard";
import ContactInfoCard from "@/features/contact/components/ContactInfoCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--surface-shell)] flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#FF7B4D] via-[#FF8A5C] to-[#FFA178]">
          <div
            className="pointer-events-none absolute -right-24 -top-28 h-[320px] w-[320px] rounded-full bg-white/10 blur-3xl sm:h-[380px] sm:w-[380px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-20 h-[300px] w-[300px] rounded-full bg-[#FFD4B8]/25 blur-3xl sm:h-[360px] sm:w-[360px]"
            aria-hidden
          />

          <PawsSection bgColor="transparent" className="py-16 md:py-24 lg:py-32">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
              <Hero
                variant="page"
                title="Contáctanos"
                subtitle="Estamos aquí para ayudarte a conectar con tu futuro mejor amigo y resolver cualquier duda sobre el proceso de adopción."
              />
            </div>
          </PawsSection>
        </div>

        <section className="relative z-10 mx-auto w-full max-w-7xl -mt-12 md:-mt-16 lg:-mt-24 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <ContactFormCard />
            <ContactInfoCard />
          </div>
        </section>
      </div>
    </div>
  );
}