import { HOME_PROCESS_CONTENT } from "../constants/processContent";

const STEPS = HOME_PROCESS_CONTENT.adopters.map(({ number, title, description, icon }) => ({
  step: number,
  title,
  description,
  Icon: icon,
}));
export default function HomeProcessSection() {
  return (
    <section id="como-funciona" className="bg-white py-16 sm:py-20 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-14 md:mb-16">
          <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-[#1a1a1a] md:mb-4 md:text-4xl">
            ¿Cómo funciona la adopción?
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-[var(--muted-foreground)] md:text-lg">
            Adoptar es fácil y seguro. Seguimos un proceso responsable para garantizar el bienestar de nuestras
            mascotas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ step, title, description, Icon }) => (
            <article
              key={step}
              className="relative h-full rounded-2xl bg-[#f4f4f5] p-6 pt-3 pl-3 text-left shadow-sm transition-shadow hover:shadow-lg sm:p-7 sm:pt-4 sm:pl-4"
            >
              <div
                className="absolute -left-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--warm-orange)] text-sm font-bold text-white shadow-md sm:-left-2 sm:-top-2"
                aria-hidden
              >
                {step}
              </div>

              <div className="mb-4 mt-2 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#efece9]">
                <Icon className="h-8 w-8 text-[var(--warm-orange)]" strokeWidth={1.75} aria-hidden />
              </div>

              <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#1a1a1a]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[15px]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
