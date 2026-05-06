"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FiPlus, FiSave } from "react-icons/fi";

import type { Publication, PublicationFilter, PublicationStatus } from "../types";
import { primaryCtaClass, secondaryCtaClass } from "../lib/listingStyles";
import PaginationControls from "./PaginationControls";
import ListingsTable from "./ListingsTable";
import SectionTitle from "./SectionTitle";
import StatusTabs from "./StatusTabs";

const PAGE_SIZE = 10;

type MyListingsClientProps = {
  listings?: Publication[];
};

const apiStatusByStatus: Record<PublicationStatus, "active" | "adopted" | "draft"> = {
  activo: "active",
  adoptado: "adopted",
  borrador: "draft",
};

export default function MyListingsClient({
  listings = [],
}: MyListingsClientProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<PublicationFilter>("todas");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [savedStatuses, setSavedStatuses] = useState<Partial<Record<string, PublicationStatus>>>({});
  const [pendingStatuses, setPendingStatuses] = useState<Partial<Record<string, PublicationStatus>>>({});
  const [deletedIds, setDeletedIds] = useState<Partial<Record<string, true>>>({});
  const [savingStatuses, setSavingStatuses] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const hydratedListings = useMemo(
    () =>
      listings
        .filter((listing) => !deletedIds[listing.id])
        .map((listing) =>
          savedStatuses[listing.id]
            ? {
                ...listing,
                status: savedStatuses[listing.id],
              }
            : listing,
        ),
    [deletedIds, listings, savedStatuses],
  );

  const filtered = useMemo(() => {
    if (filter === "todas") return hydratedListings;
    return hydratedListings.filter((listing) => listing.status === filter);
  }, [hydratedListings, filter]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleFilterChange = (next: PublicationFilter) => {
    setFilter(next);
    setPage(1);
  };

  const handleEdit = (listing: Publication) => {
    router.push(`/my-listings/${listing.id}/edit`);
  };

  const handleStatusChange = (listing: Publication, status: PublicationStatus) => {
    setFeedback(null);
    setPendingStatuses((currentStatuses) => {
      if (status === listing.status) {
        const nextStatuses = { ...currentStatuses };
        delete nextStatuses[listing.id];
        return nextStatuses;
      }

      return {
        ...currentStatuses,
        [listing.id]: status,
      };
    });
  };

  const handleSaveStatuses = async () => {
    if (savingStatuses || Object.keys(pendingStatuses).length === 0) {
      return;
    }

    setSavingStatuses(true);
    setFeedback(null);

    const snapshot = pendingStatuses;
    const response = await fetch("/api/listings/statuses", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updates: Object.entries(snapshot).map(([id, status]) => ({
          id,
          status: apiStatusByStatus[status],
        })),
      }),
    });

    if (!response.ok) {
      try {
        const payload = (await response.json()) as { message?: string };
        setFeedback(payload.message ?? "No pudimos guardar los cambios de estado.");
      } catch {
        setFeedback("No pudimos guardar los cambios de estado.");
      }

      setSavingStatuses(false);
      return;
    }

    setSavedStatuses((currentStatuses) => ({
      ...currentStatuses,
      ...snapshot,
    }));
    setPendingStatuses({});
    setSavingStatuses(false);
    router.refresh();
  };

  const handleDelete = async (listing: Publication) => {
    const confirmed = window.confirm(`¿Querés eliminar la publicación de ${listing.petName}?`);

    if (!confirmed) {
      return;
    }

    setDeletingId(listing.id);
    setFeedback(null);

    const response = await fetch(`/api/listings/${listing.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      try {
        const payload = (await response.json()) as { message?: string };
        setFeedback(payload.message ?? "No pudimos eliminar la publicación.");
      } catch {
        setFeedback("No pudimos eliminar la publicación.");
      }

      setDeletingId(null);
      return;
    }

    setDeletedIds((currentDeletedIds) => ({
      ...currentDeletedIds,
      [listing.id]: true,
    }));
    setSavedStatuses((currentStatuses) => {
      const nextStatuses = { ...currentStatuses };
      delete nextStatuses[listing.id];
      return nextStatuses;
    });
    setPendingStatuses((currentStatuses) => {
      const nextStatuses = { ...currentStatuses };
      delete nextStatuses[listing.id];
      return nextStatuses;
    });
    setDeletingId(null);
    router.refresh();
  };

  const showingCount = pageRows.length;
  const pendingChangesCount = Object.keys(pendingStatuses).length;
  const saveButtonDisabled = pendingChangesCount === 0 || savingStatuses || deletingId !== null;
  const statusActivityMessage = savingStatuses
    ? "Guardando cambios de estado..."
    : deletingId
      ? "Eliminando publicación..."
      : null;

  return (
    <div className="mx-auto w-full max-w-6xl xl:max-w-340 2xl:max-w-376">
      <div className="space-y-5">
        {feedback ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {feedback}
          </div>
        ) : null}

        <SectionTitle
          title="Mis publicaciones"
          action={
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={handleSaveStatuses}
                disabled={saveButtonDisabled}
                className={saveButtonDisabled
                  ? "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d9dbe8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm sm:w-auto"
                  : `${primaryCtaClass} w-full justify-center sm:w-auto`}
              >
                <FiSave className="h-5 w-5 shrink-0" aria-hidden />
                <span>
                  {savingStatuses
                    ? "Guardando..."
                    : pendingChangesCount > 0
                      ? `Guardar cambios (${pendingChangesCount})`
                      : "Guardar cambios"}
                </span>
              </button>

              <Link
                href="/my-listings/new"
                className={`${secondaryCtaClass} w-full justify-center sm:w-auto`}
              >
                <span>Nueva publicación</span>
                <FiPlus className="h-5 w-5 shrink-0" aria-hidden />
              </Link>
            </div>
          }
        />

        <StatusTabs value={filter} onChange={handleFilterChange} />

        <ListingsTable
          rows={pageRows}
          pendingStatuses={pendingStatuses}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          busyRowId={deletingId}
          savingStatuses={savingStatuses}
        />

        <div className="mt-8 flex flex-col gap-3 border-t border-[#ececf2] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6b7280]">
            Mostrando {showingCount} de {totalResults} resultados
          </p>

          <PaginationControls
            currentPage={safePage}
            totalPages={totalPages}
            onPrev={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            onNext={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
          />
        </div>

        {statusActivityMessage ? <p className="text-right text-sm text-[#6b7280]">{statusActivityMessage}</p> : null}
      </div>
    </div>
  );
}
