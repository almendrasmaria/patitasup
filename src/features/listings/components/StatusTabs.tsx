"use client";

import FilterTabs, { type FilterTabItem } from "@/components/FilterTabs";

import type { PublicationFilter } from "../types";
import { STATUS_FILTERS, getFilterDotColor } from "../lib/statusMeta";

type StatusTabsProps = {
  value: PublicationFilter;
  onChange: (next: PublicationFilter) => void;
  counts?: Record<PublicationFilter, number>;
};

export default function StatusTabs({ value, onChange, counts }: StatusTabsProps) {
  const items: FilterTabItem<PublicationFilter>[] = STATUS_FILTERS.map(({ id, label }) => ({
    id,
    label,
    count: counts?.[id],
    dotColor: getFilterDotColor(id),
  }));

  return (
    <FilterTabs<PublicationFilter>
      items={items}
      value={value}
      onChange={onChange}
      ariaLabel="Filtrar publicaciones por estado"
      idPrefix="pub-filter"
    />
  );
}
