import heroImg from "../../../assets/hero.jpg";
import CatsFiltersBar from "../../cats/components/CatsFiltersBar";

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
        <h1 className="text-[54px] font-semibold leading-[1] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)] sm:text-[80px]">
          PatitasUp
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[14px] text-white/90 sm:text-base md:text-lg">
          Conectamos gatitos rescatados con familias listas para brindar amor.
          <br />
          ¿Listo para encontrar a tu compañero perfecto?
        </p>

        <div className="mt-10 w-full">
          <CatsFiltersBar query={query} onQueryChange={onQueryChange} />
        </div>
      </div>
    </section>
  );
};

export default HeroHome;