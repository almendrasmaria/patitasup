"use client";

import type { PublicationFilter } from "../types";

const FILTERS: { id: PublicationFilter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "activo", label: "Activo" },
  { id: "adoptado", label: "Adoptado" },
  { id: "borrador", label: "Borrador" },
];

type StatusTabsProps = {
  value: PublicationFilter;
  onChange: (next: PublicationFilter) => void;
};

export default function StatusTabs({ value, onChange }: StatusTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar publicaciones por estado"
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
            id={`pub-filter-${id}`}
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
