import heroImg from "../../../assets/hero.png";
import CatsFiltersBar from "../../cats/components/CatsFiltersBar";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
};

const HeroHome = ({ query, onQueryChange }: Props) => {
  return (
    <section
      className="relative w-full text-white rounded-b-[48px] overflow-hidden"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-12 text-center">
        <h1 className="text-[48px] sm:text-[80px] leading-[1] font-semibold drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
          PatitasUp
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-[14px] sm:text-base md:text-lg text-white/90">
          Conectamos gatitos rescatados con familias listas para brindar amor.
          <br />
          ¿Listo para encontrar a tu compañero perfecto?
        </p>

        <div className="mt-10">
          <CatsFiltersBar
            query={query}
            onQueryChange={onQueryChange}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroHome;