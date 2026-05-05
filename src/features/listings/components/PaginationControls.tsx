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
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#111827] text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]"
      >
        <FiChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      <button
        type="button"
        aria-label="Página siguiente"
        disabled={!canNext}
        onClick={onNext}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#9ca3af] shadow-sm transition hover:border-[#d1d5db] hover:text-[#6b7280] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]"
      >
        <FiChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
