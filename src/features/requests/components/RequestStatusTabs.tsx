"use client";

import FilterTabs from "@/components/FilterTabs";

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
    <FilterTabs<AdoptionRequestFilter>
      items={FILTERS}
      value={value}
      onChange={onChange}
      ariaLabel="Filtrar solicitudes por estado"
      idPrefix="request-filter"
    />
  );
}
