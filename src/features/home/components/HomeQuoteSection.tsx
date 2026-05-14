import { FiHeart } from "react-icons/fi";

export default function HomeQuoteSection() {
  return (
    <section className="bg-[var(--background)] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[30px] border border-[var(--warm-beige-dark)]/55 bg-[#fcf6ef] px-8 py-10 shadow-[0_18px_46px_rgba(45,45,45,0.03)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[var(--warm-orange)]/8 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-white/70 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--warm-beige-dark)]/55 bg-white/70 text-[var(--warm-orange)] shadow-[0_10px_20px_rgba(45,45,45,0.03)]">
              <FiHeart className="h-4.5 w-4.5" />
            </span>

            <blockquote className="mt-7 max-w-5xl font-serif text-[1.9rem] leading-[1.35] tracking-tight text-[var(--primary)] sm:text-[2.4rem] lg:text-[3rem]">
              "Cada adopción en PatitasUp es guiada, verificada y acompañada. Porque adoptar un
              animal no termina el día que se va a casa: es el comienzo."
            </blockquote>

            <p className="mt-8 text-sm font-medium text-[var(--muted-foreground)]">
              - El equipo de PatitasUp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
