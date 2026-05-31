import type { AdoptionRequestStatus } from "../types";
import { REQUEST_STATUS_META, REQUEST_STATUS_ORDER } from "../lib/requestStatus";

type RequestsStatsProps = {
  total: number;
  counts: Partial<Record<AdoptionRequestStatus, number>>;
};

const STAT_LABEL: Record<AdoptionRequestStatus, string> = {
  pendiente: "Pendientes",
  aprobada: "Aprobadas",
  rechazada: "Rechazadas",
};

const TOTAL_CIRCLE = "border-[var(--border-hairline)] bg-[var(--surface-row)] text-[var(--foreground-inverse)]";

export default function RequestsStats({ total, counts }: RequestsStatsProps) {
  const cards = [
    { key: "total", label: "Total", value: total, circleClass: TOTAL_CIRCLE },
    ...REQUEST_STATUS_ORDER.map((status) => ({
      key: status,
      label: STAT_LABEL[status],
      value: counts[status] ?? 0,
      circleClass: REQUEST_STATUS_META[status].badgeClass,
    })),
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.key} className="rounded-2xl border border-[var(--border-hairline)] bg-white px-4 py-3.5">
          <span
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${card.circleClass}`}
          >
            {card.value}
          </span>
          <p className="mt-2 text-[13px] font-medium text-[var(--neutral-500)]">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
