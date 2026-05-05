"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import type { Publication, PublicationFilter } from "../types";
import { primaryCtaClass } from "../lib/listingStyles";
import PaginationControls from "./PaginationControls";
import ListingsTable from "./ListingsTable";
import SectionTitle from "./SectionTitle";
import StatusTabs from "./StatusTabs";

const PAGE_SIZE = 10;

type MyListingsClientProps = {
  listings?: Publication[];
};

export default function MyListingsClient({
  listings = [],
}: MyListingsClientProps) {
  const [filter, setFilter] = useState<PublicationFilter>("todas");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (filter === "todas") return listings;
    return listings.filter((listing) => listing.status === filter);
  }, [listings, filter]);

  const totalResults = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));

  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const handleFilterChange = (next: PublicationFilter) => {
    setFilter(next);
    setPage(1);
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

  const showingCount = pageRows.length;

  return (
    <div className="mx-auto w-full max-w-6xl xl:max-w-340 2xl:max-w-376">
      <div className="space-y-5">
        <SectionTitle
          title="Mis publicaciones"
          action={
            <Link
              href="/my-listings/new"
              className={`${primaryCtaClass} w-full justify-center sm:w-auto`}
            >
              <span>Nueva publicación</span>
              <FiPlus className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
          }
        />

        <StatusTabs value={filter} onChange={handleFilterChange} />

        <ListingsTable
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
            onPrev={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            onNext={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
          />
        </div>
      </div>
    </div>
  );
}
