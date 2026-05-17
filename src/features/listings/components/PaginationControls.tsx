"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationControlsProps) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={!canPrev}
        onClick={onPrev}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--slate-pagination)] text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[var(--slate-pagination)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--warm-orange)]"
      >
        <FiChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      <button
        type="button"
        aria-label="Página siguiente"
        disabled={!canNext}
        onClick={onNext}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-neutral)] bg-white text-[var(--placeholder)] shadow-sm transition hover:border-[var(--border-neutral-strong)] hover:text-[var(--neutral-500)] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--warm-orange)]"
      >
        <FiChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
