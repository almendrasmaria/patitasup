import Hero from "../../../shared/ui/Hero";
import CatsFiltersBar from "./CatsFiltersBar";
import heroImg from "../../../assets/hero.jpg";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
};

const CatsHero = ({ query, onQueryChange }: Props) => {
  return (
    <section
      className="relative h-[620px] w-full text-white"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom 52%",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">

        <Hero
          badgeText="Adopción responsable"
          variant="home"
          title="PatitasUp"
          subtitle={`Conectamos gatitos rescatados con familias listas para brindar amor.\n¿Listo para encontrar a tu compañero perfecto?`}
        />
      </div>

      <div className="absolute inset-x-0 -bottom-10 z-30 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <CatsFiltersBar query={query} onQueryChange={onQueryChange} />
        </div>
      </div>
    </section>
  );
};

export default CatsHero;