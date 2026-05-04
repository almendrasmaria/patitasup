"use client";

import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import type { Publication, PublicationFilter } from "../types";
import { MOCK_PUBLICATIONS } from "../data/mockPublications";
import { primaryCtaClass } from "../lib/publicationStyles";
import PaginationControls from "./PaginationControls";
import PublicationsTable from "./PublicationsTable";
import SectionTitle from "./SectionTitle";
import StatusTabs from "./StatusTabs";

const PAGE_SIZE = 10;

type MyListingsClientProps = {
  publications?: Publication[];
};

export default function MyListingsClient({
  publications = MOCK_PUBLICATIONS,
}: MyListingsClientProps) {
  const [filter, setFilter] = useState<PublicationFilter>("todas");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (filter === "todas") return publications;
    return publications.filter((p) => p.status === filter);
  }, [publications, filter]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleFilterChange = (next: PublicationFilter) => {
    setFilter(next);
    setPage(1);
  };

  const handleEdit = (_row: Publication) => {};

  const handleDelete = (_row: Publication) => {};

  const showingCount = pageRows.length;

  return (
    <div className="mx-auto w-full max-w-6xl xl:max-w-[85rem] 2xl:max-w-[94rem]">
      <div className="space-y-5">
        <SectionTitle
          title="Mis publicaciones"
          action={
            <button
              type="button"
              className={`${primaryCtaClass} w-full justify-center sm:w-auto`}
            >
              <span>Nueva publicación</span>
              <FiPlus className="h-5 w-5 shrink-0" aria-hidden />
            </button>
          }
        />

        <StatusTabs value={filter} onChange={handleFilterChange} />

        <PublicationsTable
          rows={pageRows}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="mt-8 flex flex-col gap-3 border-t border-[#ececf2] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6b7280]">
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
    </div>
  );
}
