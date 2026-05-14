"use client";

import { useMemo, useState } from "react";

import type { AdoptionRequestFilter, AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import PaginationControls from "@/features/listings/components/PaginationControls";
import SectionTitle from "@/features/listings/components/SectionTitle";
import RequestsTable from "./RequestsTable";
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
  const [modalRow, setModalRow] = useState<AdoptionRequestRow | null>(null);

  const hydrated = useMemo(
    () =>
      requests.map((r) =>
        statusOverrides[r.id] ? { ...r, status: statusOverrides[r.id]! } : r,
      ),
    [requests, statusOverrides],
  );

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

  return (
    <div className="mx-auto w-full max-w-6xl xl:max-w-340 2xl:max-w-376">
      <div className="space-y-5">
        <SectionTitle title="Gestión de Solicitudes" />

        <RequestStatusTabs value={filter} onChange={handleFilterChange} />

        <RequestsTable
          rows={pageRows}
          dirtyStatusIds={dirtyStatusIds}
          onViewForm={setModalRow}
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

      <ViewFormModal row={modalRow} onClose={() => setModalRow(null)} />
    </div>
  );
}
