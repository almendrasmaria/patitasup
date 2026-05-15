type Props = {
  text: string;
  variant?: "surface" | "onAccent";
};

const Badge = ({ text, variant = "surface" }: Props) => {
  if (variant === "onAccent") {
    return (
      <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold leading-snug text-white ring-1 ring-white/25 sm:text-[13px]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden />
        <span>{text}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-[var(--surface-peach)] px-4 py-2 text-xs font-semibold leading-snug text-[var(--warm-orange)] ring-1 ring-[var(--warm-orange)]/20 sm:text-[13px]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--warm-orange)]" aria-hidden />
      <span>{text}</span>
    </span>
  );
};

export default Badge;
