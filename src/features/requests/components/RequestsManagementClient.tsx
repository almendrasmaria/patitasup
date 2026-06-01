"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { AdoptionRequestFilter, AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import { REQUEST_STATUS_ORDER } from "../lib/requestStatus";
import PaginationControls from "@/features/listings/components/PaginationControls";
import RequestsList from "./RequestsList";
import RequestsStats from "./RequestsStats";
import RequestStatusTabs from "./RequestStatusTabs";
import ViewFormModal from "./ViewFormModal";

const PAGE_SIZE = 10;
const ERROR_DISMISS_MS = 5000;

type RequestsManagementClientProps = {
  requests?: AdoptionRequestRow[];
};

export default function RequestsManagementClient({
  requests = [],
}: RequestsManagementClientProps) {
  const [filter, setFilter] = useState<AdoptionRequestFilter>("todas");
  const [page, setPage] = useState(1);
  // Confirmed/optimistic status per row. Persists after a successful PATCH so the
  // UI keeps showing the new status even though the server `requests` prop is stale.
  const [statusOverrides, setStatusOverrides] = useState<Partial<Record<string, AdoptionRequestStatus>>>({});
  // Rows with an in-flight PATCH — drives the "saving" ring, cleared once settled.
  const [pendingIds, setPendingIds] = useState<Set<string>>(() => new Set());
  const [detailId, setDetailId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inflightRef = useRef<Map<string, AbortController>>(new Map());

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

  const handleStatusChange = async (row: AdoptionRequestRow, status: AdoptionRequestStatus) => {
    if (row.status === status) return;

    const prev = inflightRef.current.get(row.id);
    if (prev) prev.abort();

    const controller = new AbortController();
    inflightRef.current.set(row.id, controller);

    let rollbackStatus: AdoptionRequestStatus | undefined;

    setStatusOverrides((cur) => {
      rollbackStatus = cur[row.id];
      return { ...cur, [row.id]: status };
    });
    setPendingIds((cur) => {
      const next = new Set(cur);
      next.add(row.id);
      return next;
    });

    try {
      const response = await fetch(`/api/adoption-requests/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Request failed");

      // Success: keep the optimistic status as the confirmed value (the server
      // `requests` prop is stale and never refetched here) and just clear the
      // in-flight marker so the row stops showing the "saving" state.
      setPendingIds((cur) => {
        if (!cur.has(row.id)) return cur;
        const next = new Set(cur);
        next.delete(row.id);
        return next;
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      setStatusOverrides((cur) => {
        const next = { ...cur };
        if (rollbackStatus) {
          next[row.id] = rollbackStatus;
        } else {
          delete next[row.id];
        }
        return next;
      });
      setPendingIds((cur) => {
        if (!cur.has(row.id)) return cur;
        const next = new Set(cur);
        next.delete(row.id);
        return next;
      });

      setErrorMessage("No se pudo actualizar el estado. Intentá de nuevo.");
    } finally {
      if (inflightRef.current.get(row.id) === controller) {
        inflightRef.current.delete(row.id);
      }
    }
  };

  const dismissError = useCallback(() => setErrorMessage(null), []);

  useEffect(() => {
    if (!errorMessage) return;
    const timer = window.setTimeout(dismissError, ERROR_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [errorMessage, dismissError]);

  const showingCount = pageRows.length;

  const dirtyStatusIds = pendingIds;

  const detailRow = useMemo(
    () => (detailId ? hydrated.find((r) => r.id === detailId) ?? null : null),
    [detailId, hydrated],
  );

  return (
    <div className="w-full">
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-[26px] font-semibold tracking-tight text-(--foreground-inverse) md:text-[28px]">
            Solicitudes de adopción
          </h1>
          <p className="text-sm text-neutral-500">
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

        {errorMessage ? (
          <div
            role="alert"
            className="flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          >
            <p>{errorMessage}</p>
            <button
              type="button"
              onClick={dismissError}
              className="shrink-0 font-semibold underline underline-offset-2 transition hover:text-rose-900"
            >
              Cerrar
            </button>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 border-t border-(--border-hairline) pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
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
