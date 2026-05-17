"use client";

import FilterTabs from "@/components/FilterTabs";

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
    <FilterTabs<PublicationFilter>
      items={FILTERS}
      value={value}
      onChange={onChange}
      ariaLabel="Filtrar publicaciones por estado"
      idPrefix="pub-filter"
    />
  );
}
