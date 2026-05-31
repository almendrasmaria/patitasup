"use client";

import { useMemo, useState } from "react";

import type { AdoptionRequestFilter, AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import { REQUEST_STATUS_ORDER } from "../lib/requestStatus";
import PaginationControls from "@/features/listings/components/PaginationControls";
import RequestsList from "./RequestsList";
import RequestsStats from "./RequestsStats";
import RequestStatusTabs from "./RequestStatusTabs";
import ViewFormModal from "./ViewFormModal";

const PAGE_SIZE = 10;

type RequestsManagementClientProps = {
  requests?: AdoptionRequestRow[];
};

export default function RequestsManagementClient({
  requests = [],
}: RequestsManagementClientProps) {
  const [filter, setFilter] = useState<AdoptionRequestFilter>("todas");
  const [page, setPage] = useState(1);
  const [statusOverrides, setStatusOverrides] = useState<Partial<Record<string, AdoptionRequestStatus>>>({});
  const [detailId, setDetailId] = useState<string | null>(null);

  const hydrated = useMemo(
    () =>
      requests.map((r) =>
        statusOverrides[r.id] ? { ...r, status: statusOverrides[r.id]! } : r,
      ),
    [requests, statusOverrides],
  );

  const counts = useMemo<Partial<Record<AdoptionRequestFilter, number>>>(() => {
    const next: Partial<Record<AdoptionRequestFilter, number>> = { todas: hydrated.length };
    for (const status of REQUEST_STATUS_ORDER) {
      next[status] = hydrated.filter((r) => r.status === status).length;
    }
    return next;
  }, [hydrated]);

  const filtered = useMemo(() => {
    if (filter === "todas") return hydrated;
    return hydrated.filter((r) => r.status === filter);
  }, [filter, hydrated]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleFilterChange = (next: AdoptionRequestFilter) => {
    setFilter(next);
    setPage(1);
  };

  const handleStatusChange = (row: AdoptionRequestRow, status: AdoptionRequestStatus) => {
    const original = requests.find((r) => r.id === row.id)?.status;
    if (original === status) {
      setStatusOverrides((prev) => {
        const next = { ...prev };
        delete next[row.id];
        return next;
      });
      return;
    }
    setStatusOverrides((prev) => ({ ...prev, [row.id]: status }));
  };

  const showingCount = pageRows.length;

  const dirtyStatusIds = useMemo(() => new Set(Object.keys(statusOverrides)), [statusOverrides]);

  const detailRow = useMemo(
    () => (detailId ? hydrated.find((r) => r.id === detailId) ?? null : null),
    [detailId, hydrated],
  );

  return (
    <div className="w-full">
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-[26px] font-semibold tracking-tight text-[var(--foreground-inverse)] md:text-[28px]">
            Solicitudes de adopción
          </h1>
          <p className="text-sm text-[var(--neutral-500)]">
            Revisá y gestioná las solicitudes de adoptantes interesados.
          </p>
        </header>

        <RequestsStats total={hydrated.length} counts={counts} />

        <RequestStatusTabs value={filter} onChange={handleFilterChange} />

        <RequestsList
          rows={pageRows}
          dirtyStatusIds={dirtyStatusIds}
          onViewDetail={(row) => setDetailId(row.id)}
          onStatusChange={handleStatusChange}
        />

        <div className="mt-8 flex flex-col gap-3 border-t border-[var(--border-hairline)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--neutral-500)]">
            Mostrando {showingCount} de {totalResults} resultados
          </p>

          <PaginationControls
            currentPage={safePage}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>

      <ViewFormModal
        row={detailRow}
        onClose={() => setDetailId(null)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
