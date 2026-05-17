type Props = {
  label: string;
  value: string;
};

export default function PetInfoChip({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-[var(--accent-bg-chip)] px-4 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)]">{label}</div>
      <div className="mt-1 text-base font-semibold text-slate-800">{value}</div>
    </div>
  );
}
