"use client";

import { FiChevronDown } from "react-icons/fi";

import type { PublicationStatus } from "../types";

const LABEL: Record<PublicationStatus, string> = {
  activo: "Activo",
  adoptado: "Adoptado",
  borrador: "Borrador",
};

const STYLES: Record<PublicationStatus, string> = {
  activo: "bg-[var(--accent-overlay-12)] text-[var(--accent-contrast)]",
  adoptado: "bg-[var(--status-info-bg)] text-[var(--status-info-fg)]",
  borrador: "bg-[var(--border-neutral)] text-[var(--neutral-600)]",
};

type StatusBadgeProps = {
  status: PublicationStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <button
      type="button"
      className={`inline-flex min-w-[7.5rem] items-center justify-between gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition hover:brightness-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${STYLES[status]}`}
      aria-label={`Estado: ${LABEL[status]}`}
    >
      <span>{LABEL[status]}</span>
      <FiChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
    </button>
  );
}
