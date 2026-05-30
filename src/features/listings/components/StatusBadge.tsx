import type { PublicationStatus } from "../types";
import { STATUS_DOT_COLORS, STATUS_LABELS } from "../lib/statusMeta";

type StatusBadgeProps = {
  status: PublicationStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/95 px-2.5 py-1 text-xs font-semibold text-[var(--neutral-700)] shadow-sm backdrop-blur">
      <span
        aria-hidden
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: STATUS_DOT_COLORS[status] }}
      />
      {STATUS_LABELS[status]}
    </span>
  );
}
