import Navbar from "../../../shared/ui/Navbar";
import Hero from "../../../shared/ui/Hero";
import ContactFormCard from "../components/ContactFormCard";
import ContactInfoCard from "../components/ContactInfoCard";
import Footer from "../../../shared/ui/Footer";
import PawsSection from "../../../shared/ui/PawsSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navbar />

      <main>

        <PawsSection className="h-[472px] rounded-b-[72px]">
          <div className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
            <Hero
              badgeText="Contacto"
              variant="page"
              title="Contáctanos"
              subtitle="Estamos aquí para ayudarte a conectar con tu futuro mejor amigo y responder cualquier duda que tengas sobre el proceso."
            />
          </div>
        </PawsSection>

        <section className="relative z-20 -mt-[130px] pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <ContactFormCard />
              <ContactInfoCard />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;