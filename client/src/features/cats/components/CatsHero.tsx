import Hero from "../../../shared/ui/Hero";
import PawsSection from "../../../shared/ui/PawsSection";

const CatsHero = () => {
  return (
    <PawsSection>
      
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-32 pb-24 text-center sm:px-6 sm:pt-36 sm:pb-28 lg:px-8">
        <Hero
          badgeText="Bienvenido a PatitasUp"
          variant="home"
          title="Un nuevo comienzo para cada bigote"
          subtitle={`Conectamos gatitos rescatados con familias listas para brindar amor.\n¿Listo para encontrar a tu compañero perfecto?`}
        />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              document
                .getElementById("cats-filters")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="rounded-lg bg-white px-6 py-3 text-[14px] font-semibold text-[#7061F0] shadow-md shadow-black/15 transition hover:bg-white/95 active:translate-y-[1px]"
          >
            Adoptar Gato
          </button>

          <button className="rounded-lg bg-transparent px-6 py-3 text-[14px] font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10 active:translate-y-[1px]">
            Publicar Ahora
          </button>
        </div>
      </div>
    </PawsSection>
  );
};

export default CatsHero;