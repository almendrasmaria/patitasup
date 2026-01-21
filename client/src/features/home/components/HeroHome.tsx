import heroImg from "../../../assets/hero.jpg";
import CatsFiltersBar from "../../cats/components/CatsFiltersBar";
import Hero from "../../../shared/ui/Hero";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
};

const HeroHome = ({ query, onQueryChange }: Props) => {
  return (
    <section
      className="relative h-[680px] w-full overflow-hidden rounded-b-[55px] text-white"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">

        <Hero
          variant="home"
          title="PatitasUp"
          subtitle={`Conectamos gatitos rescatados con familias listas para brindar amor.\n¿Listo para encontrar a tu compañero perfecto?`}
        />

        <div className="mt-10 w-full">
          <CatsFiltersBar query={query} onQueryChange={onQueryChange} />
        </div>
      </div>
    </section>
  );
};

export default HeroHome;