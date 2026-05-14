import type { HomeProcessCardData } from "../types";

type Props = {
  card: HomeProcessCardData;
};

export default function HomeProcessCard({ card }: Props) {
  const Icon = card.icon;

  return (
    <article className="relative overflow-hidden rounded-[28px] border border-[var(--warm-beige-dark)]/50 bg-white p-6 shadow-[0_18px_45px_rgba(45,45,45,0.035)]">
      <span className="pointer-events-none absolute top-4 right-5 text-[72px] font-semibold leading-none text-[var(--warm-beige)]/65 sm:text-[88px]">
        {card.number}
      </span>

      <div className="relative z-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--warm-sand)] text-[var(--warm-orange)] ring-1 ring-[var(--warm-beige-dark)]/35">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-6 max-w-[14rem] text-lg font-semibold tracking-tight text-[var(--primary)]">
          {card.title}
        </h3>

        <p className="mt-3 max-w-[17rem] text-sm leading-7 text-[var(--muted-foreground)]">
          {card.description}
        </p>
      </div>
    </article>
  );
}
