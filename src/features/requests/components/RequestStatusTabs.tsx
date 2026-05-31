"use client";

import FilterTabs, { type FilterTabItem } from "@/components/FilterTabs";

import type { AdoptionRequestFilter } from "../types";
import { REQUEST_STATUS_META, REQUEST_STATUS_ORDER } from "../lib/requestStatus";

type RequestStatusTabsProps = {
  value: AdoptionRequestFilter;
  onChange: (next: AdoptionRequestFilter) => void;
};

export default function RequestStatusTabs({ value, onChange }: RequestStatusTabsProps) {
  const items: FilterTabItem<AdoptionRequestFilter>[] = [
    { id: "todas", label: "Todas" },
    ...REQUEST_STATUS_ORDER.map((status) => ({
      id: status,
      label: REQUEST_STATUS_META[status].label,
      dotColor: REQUEST_STATUS_META[status].tabDotColor,
    })),
  ];

  return (
    <FilterTabs<AdoptionRequestFilter>
      items={items}
      value={value}
      onChange={onChange}
      ariaLabel="Filtrar solicitudes por estado"
      idPrefix="request-filter"
    />
  );
}
