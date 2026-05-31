"use client";

import { FaPaw } from "react-icons/fa";
import { FiCheck, FiChevronRight, FiX } from "react-icons/fi";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";

import type { AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import ActionIconButton from "@/features/listings/components/ActionIconButton";
import RequestStatusBadge from "./RequestStatusBadge";

type RequestCardProps = {
  row: AdoptionRequestRow;
  dirty?: boolean;
  onViewDetail: (row: AdoptionRequestRow) => void;
  onStatusChange: (row: AdoptionRequestRow, status: AdoptionRequestStatus) => void;
  busy?: boolean;
};

export default function RequestCard({
  row,
  dirty = false,
  onViewDetail,
  onStatusChange,
  busy = false,
}: RequestCardProps) {
  const petLine = [row.petSpecies, row.petAgeLabel].filter(Boolean).join(" · ");
  const isApproved = row.status === "aprobada";
  const isRejected = row.status === "rechazada";

  return (
    <article className="group rounded-2xl border border-[var(--border-hairline)] bg-white p-4 shadow-sm transition duration-150 hover:border-[var(--accent-border-20)] hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-[var(--foreground-inverse)]" title={row.adoptanteName}>
            {row.adoptanteName}
          </h3>
          {row.adoptanteLocation ? (
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-[var(--neutral-500)]">
              <HiOutlineLocationMarker className="h-3.5 w-3.5 shrink-0 text-[var(--neutral-400)]" aria-hidden />
              <span className="truncate">{row.adoptanteLocation}</span>
            </p>
          ) : null}
        </div>

        <RequestStatusBadge
          status={row.status}
          className={`shrink-0 ${dirty ? "ring-2 ring-[var(--accent-ring-25)] ring-offset-1" : ""}`}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 rounded-xl bg-[var(--surface-card-elevated)] px-3 py-2 text-[13px]">
        <FaPaw className="mr-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden />
        <span className="text-[var(--neutral-500)]">Quiere adoptar a</span>
        <span className="font-semibold text-[var(--foreground-inverse)]">{row.petName}</span>
        {petLine ? (
          <>
            <span className="text-[var(--neutral-400)]" aria-hidden>
              ·
            </span>
            <span className="text-[var(--neutral-600)]">{petLine}</span>
          </>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-1.5 text-[12px] text-[var(--neutral-400)]">
          <HiOutlineClock className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">{row.dateLabel}</span>
        </p>

        <div className="flex shrink-0 items-center gap-1.5">
          <ActionIconButton
            label={isApproved ? "Solicitud ya aprobada" : `Aprobar solicitud de ${row.adoptanteName}`}
            onClick={() => onStatusChange(row, "aprobada")}
            disabled={busy || isApproved}
            className="hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <FiCheck className="h-4 w-4" aria-hidden />
          </ActionIconButton>

          <ActionIconButton
            label={isRejected ? "Solicitud ya rechazada" : `Rechazar solicitud de ${row.adoptanteName}`}
            onClick={() => onStatusChange(row, "rechazada")}
            disabled={busy || isRejected}
            className="hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <FiX className="h-4 w-4" aria-hidden />
          </ActionIconButton>

          <ActionIconButton
            label={`Ver detalle de la solicitud de ${row.adoptanteName}`}
            onClick={() => onViewDetail(row)}
            disabled={busy}
            className="hover:border-[var(--accent-border-20)] hover:bg-[var(--accent-overlay-8)] hover:text-[var(--accent-contrast)]"
          >
            <FiChevronRight className="h-5 w-5" aria-hidden />
          </ActionIconButton>
        </div>
      </div>
    </article>
  );
}
