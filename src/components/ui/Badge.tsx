type Props = {
  text: string;
};

const Badge = ({ text }: Props) => {
  return (
    <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-[#fff0e8] px-4 py-2 text-xs font-semibold leading-snug text-[var(--warm-orange)] ring-1 ring-[var(--warm-orange)]/20 sm:text-[13px]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--warm-orange)]" aria-hidden />
      <span>{text}</span>
    </span>
  );
};

export default Badge;
