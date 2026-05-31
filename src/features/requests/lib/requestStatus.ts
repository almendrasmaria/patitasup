import type { AdoptionRequestStatus } from "../types";

type RequestStatusMeta = {
  label: string;
  badgeClass: string;
  dotClass: string;
  tabDotColor: string;
};

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
    tabDotColor: "#f59e0b",
  },
  aprobada: {
    label: "Aprobada",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    dotClass: "bg-emerald-500",
    tabDotColor: "#10b981",
  },
  rechazada: {
    label: "Rechazada",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    dotClass: "bg-rose-500",
    tabDotColor: "#f43f5e",
  },
};
