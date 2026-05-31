import type { AdoptionRequestStatus } from "../types";

type RequestStatusMeta = {
  /** Etiqueta visible para humanos. */
  label: string;
  /** Estilos del pill de solo lectura (RequestStatusBadge). */
  badgeClass: string;
  /** Color del punto indicador del pill. */
  dotClass: string;
  /** Estilos del trigger interactivo (RequestStatusSelect). */
  selectClass: string;
  /** Color del punto usado en los filtros (FilterTabs.dotColor). */
  tabDotColor: string;
};

/** Orden canónico de los estados a lo largo de la app. */
export const REQUEST_STATUS_ORDER: AdoptionRequestStatus[] = [
  "pendiente",
  "aprobada",
  "rechazada",
];

export const REQUEST_STATUS_META: Record<AdoptionRequestStatus, RequestStatusMeta> = {
  pendiente: {
    label: "Pendiente",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
    dotClass: "bg-amber-500",
    selectClass:
      "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100/90 data-[state=open]:bg-amber-50",
    tabDotColor: "#f59e0b",
  },
  aprobada: {
    label: "Aprobada",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500",
    selectClass:
      "border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100/90 data-[state=open]:bg-emerald-50",
    tabDotColor: "#10b981",
  },
  rechazada: {
    label: "Rechazada",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    dotClass: "bg-rose-500",
    selectClass:
      "border-rose-200 bg-rose-50 text-rose-900 hover:bg-rose-100/90 data-[state=open]:bg-rose-50",
    tabDotColor: "#f43f5e",
  },
};
