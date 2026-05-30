"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";

import type { Publication, PublicationFilter } from "../types";
import PaginationControls from "./PaginationControls";
import PublicationsGrid from "./PublicationsGrid";
import StatusTabs from "./StatusTabs";

const PAGE_SIZE = 10;

type MyListingsClientProps = {
  listings?: Publication[];
};

export default function MyListingsClient({
  listings = [],
}: MyListingsClientProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<PublicationFilter>("todas");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [deletedIds, setDeletedIds] = useState<Partial<Record<string, true>>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Publication | null>(null);

  const hydratedListings = useMemo(
    () => listings.filter((listing) => !deletedIds[listing.id]),
    [deletedIds, listings],
  );

  const searched = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return hydratedListings;

    return hydratedListings.filter((listing) =>
      [listing.petName, listing.species, listing.location, listing.sex].some((field) =>
        field.toLowerCase().includes(query),
      ),
    );
  }, [hydratedListings, search]);

  const counts = useMemo<Record<PublicationFilter, number>>(
    () => ({
      todas: searched.length,
      activo: searched.filter((listing) => listing.status === "activo").length,
      adoptado: searched.filter((listing) => listing.status === "adoptado").length,
      borrador: searched.filter((listing) => listing.status === "borrador").length,
    }),
    [searched],
  );

  const filtered = useMemo(() => {
    if (filter === "todas") return searched;
    return searched.filter((listing) => listing.status === filter);
  }, [searched, filter]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleFilterChange = (next: PublicationFilter) => {
    setFilter(next);
    setPage(1);
  };

  const handleSearchChange = (next: string) => {
    setSearch(next);
    setPage(1);
  };

  const handleEdit = (listing: Publication) => {
    router.push(`/my-listings/${listing.id}/edit`);
  };

  const handleDelete = (listing: Publication) => {
    setPendingDelete(listing);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;

    const listing = pendingDelete;
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
      setPendingDelete(null);
      return;
    }

    setDeletedIds((currentDeletedIds) => ({
      ...currentDeletedIds,
      [listing.id]: true,
    }));
    setDeletingId(null);
    setPendingDelete(null);
    router.refresh();
  };

  const showingCount = pageRows.length;
  const statusActivityMessage = deletingId ? "Eliminando publicación..." : null;

  return (
    <div className="w-full">
      <div className="space-y-6">
        {feedback ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {feedback}
          </div>
        ) : null}

        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground-inverse)] sm:text-3xl">
              Mis publicaciones
            </h1>
          </div>

          <Link
            href="/my-listings/new"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto"
          >
            <FiPlus className="h-5 w-5 shrink-0" aria-hidden />
            <span>Nueva publicación</span>
          </Link>
        </header>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre, tipo..."
            ariaLabel="Buscar publicaciones"
            className="lg:max-w-sm"
          />

          <StatusTabs value={filter} onChange={handleFilterChange} counts={counts} />
        </div>

        <PublicationsGrid
          rows={pageRows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          busyRowId={deletingId}
        />

        <div className="mt-2 flex flex-col gap-3 border-t border-[var(--border-hairline)] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--neutral-500)]">
            Mostrando {showingCount} de {totalResults} resultados
          </p>

          <PaginationControls
            currentPage={safePage}
            totalPages={totalPages}
            onPrev={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            onNext={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
          />
        </div>

        {statusActivityMessage ? <p className="text-right text-sm text-[var(--neutral-500)]">{statusActivityMessage}</p> : null}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Eliminar publicación"
        description={
          pendingDelete
            ? `¿Querés eliminar la publicación de ${pendingDelete.petName}? Esta acción no se puede deshacer.`
            : undefined
        }
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        loading={deletingId !== null}
        tone="danger"
        onConfirm={confirmDelete}
        onCancel={() => {
          if (deletingId === null) setPendingDelete(null);
        }}
      />
    </div>
  );
}
