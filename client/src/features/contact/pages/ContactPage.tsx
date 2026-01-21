import Navbar from "../../../shared/ui/Navbar";
import PageHero from "../../../shared/ui/PageHero";
import ContactFormCard from "../components/ContactFormCard";
import ContactInfoCard from "../components/ContactInfoCard";
import Footer from "../../../shared/ui/Footer";

const ContactPage = () => {
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

          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 lg:px-8">
            <PageHero
              title="Contáctanos"
              subtitle="Estamos aquí para ayudarte a conectar con tu futuro mejor amigo y responder cualquier duda que tengas sobre el proceso."
            />
          </div>
        </section>

        <section className="relative z-20 -mt-[170px] pb-16">
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