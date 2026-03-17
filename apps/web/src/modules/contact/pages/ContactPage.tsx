import Hero from "@/shared/components/Hero";
import PawsSection from "@/shared/components/PawsSection";
import ContactFormCard from "../components/ContactFormCard";
import ContactInfoCard from "../components/ContactInfoCard";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <main>
        <PawsSection className="h-[472px]">
          <div className="mx-auto flex h-full max-w-6xl items-start justify-center px-4 pt-18 sm:pt-22 lg:pt-26 lg:px-8 lg:pt-12">
            <Hero
              badgeText="Contacto"
              variant="page"
              title="Contáctanos"
              subtitle="Estamos aquí para ayudarte a conectar con tu futuro mejor amigo y responder cualquier duda que tengas sobre el proceso."
            />
          </div>
        </PawsSection>

        <section className="relative z-10 mx-auto -mt-12 pb-24 sm:-mt-16 lg:-mt-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ContactFormCard />
              <ContactInfoCard />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;