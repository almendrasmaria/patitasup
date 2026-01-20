import CatsFiltersBar from "../../cats/components/CatsFiltersBar";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
};

const HeroHome = ({ query, onQueryChange }: Props) => {
  return (
    <section className="relative w-full overflow-hidden rounded-b-[55px] bg-gradient-to-b from-[#5A7BFF] to-[#4E67FF] text-white">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12px 12px, rgba(255,255,255,0.5) 2px, transparent 2.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-18 text-center sm:px-6 lg:px-8">
        <h1 className="text-[54px] font-semibold leading-[1] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)] sm:text-[80px]">PatitasUp</h1>

        <p className="mx-auto mt-4 max-w-2xl text-[14px] text-white sm:text-base md:text-lg">
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