import Hero from "@/components/Hero";
import PawsSection from "@/components/PawsSection";
import ContactFormCard from "@/features/contact/components/ContactFormCard";
import ContactInfoCard from "@/features/contact/components/ContactInfoCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--surface-shell)] flex flex-col">
      <main className="flex-1 flex flex-col">
        <PawsSection className="py-12 md:py-20 lg:py-28">
          <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-4 lg:px-8">
            <Hero
              badgeText="Contacto"
              variant="page"
              title="Contáctanos"
              subtitle="Estamos aquí para ayudarte a conectar con tu futuro mejor amigo y responder cualquier duda que tengas sobre el proceso."
            />
          </div>
        </PawsSection>

        <section className="relative z-10 mx-auto w-full max-w-6xl -mt-10 md:-mt-14 lg:-mt-20 pb-12 md:pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ContactFormCard />
            <ContactInfoCard />
          </div>
        </section>
      </main>
    </div>
  );
}