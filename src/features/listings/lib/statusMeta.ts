import type { PublicationFilter, PublicationStatus } from "../types";

export const STATUS_LABELS: Record<PublicationStatus, string> = {
  activo: "Activo",
  adoptado: "Adoptado",
  borrador: "Borrador",
};

export const STATUS_DOT_COLORS: Record<PublicationStatus, string> = {
  activo: "var(--accent)",
  adoptado: "var(--success-border)",
  borrador: "var(--amber-500)",
};

export const STATUS_OPTIONS: PublicationStatus[] = ["activo", "adoptado", "borrador"];

export const STATUS_FILTERS: { id: PublicationFilter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "activo", label: "Activo" },
  { id: "adoptado", label: "Adoptado" },
  { id: "borrador", label: "Borrador" },
];

export function getFilterDotColor(filter: PublicationFilter): string | undefined {
  return filter === "todas" ? undefined : STATUS_DOT_COLORS[filter];
}
