"use client";

import { FiInbox } from "react-icons/fi";

import type { AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import RequestCard from "./RequestCard";

type RequestsListProps = {
  rows: AdoptionRequestRow[];
  dirtyStatusIds: Set<string>;
  onViewDetail: (row: AdoptionRequestRow) => void;
  onStatusChange: (row: AdoptionRequestRow, status: AdoptionRequestStatus) => void;
};

export default function RequestsList({
  rows,
  dirtyStatusIds,
  onViewDetail,
  onStatusChange,
}: RequestsListProps) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--border-input)] bg-white/60 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-overlay-10)] text-[var(--accent)]">
          <FiInbox className="h-6 w-6" aria-hidden />
        </span>
        <p className="text-sm font-medium text-[var(--neutral-600)]">No hay solicitudes para este filtro.</p>
        <p className="text-[13px] text-[var(--neutral-400)]">
          Las solicitudes aparecerán aquí cuando alguien complete el formulario de adopción.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {rows.map((row) => (
        <RequestCard
          key={row.id}
          row={row}
          dirty={dirtyStatusIds.has(row.id)}
          onViewDetail={onViewDetail}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
