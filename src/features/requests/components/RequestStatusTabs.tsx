"use client";

import type { AdoptionRequestFilter } from "../types";

const FILTERS: { id: AdoptionRequestFilter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "pendiente", label: "Pendientes" },
  { id: "en_revision", label: "En Revisión" },
  { id: "aprobada", label: "Aprobadas" },
];

type RequestStatusTabsProps = {
  value: AdoptionRequestFilter;
  onChange: (next: AdoptionRequestFilter) => void;
};

export default function RequestStatusTabs({ value, onChange }: RequestStatusTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar solicitudes por estado"
      className="flex flex-wrap gap-2"
    >
      {FILTERS.map(({ id, label }) => {
        const selected = value === id;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            id={`request-filter-${id}`}
            onClick={() => onChange(id)}
            className={
              selected
                ? "rounded-full bg-[#7061F0] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f51d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]"
                : "rounded-full border border-[#7061F0]/35 bg-white px-5 py-2 text-sm font-semibold text-[#7061F0] transition hover:border-[#7061F0]/55 hover:bg-[#7061F0]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
