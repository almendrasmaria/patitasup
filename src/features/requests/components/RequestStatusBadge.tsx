import type { AdoptionRequestStatus } from "../types";
import { REQUEST_STATUS_META } from "../lib/requestStatus";

type RequestStatusBadgeProps = {
  status: AdoptionRequestStatus;
  className?: string;
};

export default function RequestStatusBadge({ status, className }: RequestStatusBadgeProps) {
  const meta = REQUEST_STATUS_META[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${meta.badgeClass} ${className ?? ""}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dotClass}`} />
      {meta.label}
    </span>
  );
}
