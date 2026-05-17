import { HOME_ADOPTION_STEPS } from "../constants/processContent";
import type { HomeAdoptionStep } from "../types";

function StepIcon({ step }: { step: HomeAdoptionStep }) {
  const Icon = step.icon;

  return <Icon className="h-7 w-7 shrink-0" strokeWidth={1.85} aria-hidden />;
}

export default function HomeProcessSection() {
  return (
    <section
      id="como-funciona"
      className="border-t border-[var(--border-hairline)] bg-[var(--warm-sand)] px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-11 sm:mb-14">
          <div className="max-w-2xl">
            <span className="text-sm uppercase tracking-widest text-[var(--warm-orange)]">Cómo funciona</span>
            <h3
              className="mt-2 tracking-tight text-[var(--brand-teal)]"
              style={{
                fontFamily: "Poppins",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.05,
                fontWeight: 500,
              }}
            >
              Adoptar es darle hogar
              <br />
              a quien más lo necesita
            </h3>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-6 xl:gap-7">
          {HOME_ADOPTION_STEPS.map((step) => (
            <article
              key={step.number}
              className="group flex flex-col rounded-2xl border border-[var(--border-neutral)]/80 bg-white p-6 shadow-[0_2px_12px_rgba(45,45,45,0.04)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--warm-orange)]/35 hover:shadow-[0_20px_44px_rgba(48,69,67,0.1)] sm:p-7 lg:p-8"
            >
              <div className="relative mb-6 flex min-h-[4.5rem] items-start justify-between gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[var(--warm-orange)] text-white shadow-[0_4px_12px_rgba(255,136,86,0.35)] transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-105 group-hover:shadow-[0_8px_22px_rgba(255,136,86,0.45)]">
                  <StepIcon step={step} />
                </div>
                <span
                  className="pointer-events-none -mr-1 -mt-1 select-none font-bold tabular-nums leading-none text-[var(--neutral-400)]/[0.35]"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 4.25rem)" }}
                  aria-hidden
                >
                  {step.number}
                </span>
              </div>

              <h4 className="text-lg font-bold tracking-tight text-[var(--foreground-table)] sm:text-[1.125rem]">
                {step.title}
              </h4>
              <p className="mt-2.5 text-pretty text-sm leading-relaxed text-[var(--neutral-600)] sm:text-[15px] sm:leading-[1.65]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
