type TypeBadgeProps = {
  species: string;
};

export default function TypeBadge({ species }: TypeBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/5 bg-white/95 px-2.5 py-1 text-xs font-semibold text-[var(--neutral-700)] shadow-sm backdrop-blur">
      {species}
    </span>
  );
}
