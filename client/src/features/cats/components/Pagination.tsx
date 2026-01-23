type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const getPages = (current: number, total: number) => {
  const pages: (number | "dots")[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 4) {
    pages.push("dots");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 3) {
    pages.push("dots");
  }

  pages.push(total);

  return pages;
};

const Pagination = ({ currentPage, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages);

  const go = (p: number) => onChange(Math.min(Math.max(p, 1), totalPages));

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-black/5 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
      >
        ‹
      </button>

      <div className="flex items-center gap-3">
        {pages.map((p, idx) =>
          p === "dots" ? (
            <span key={`dots-${idx}`} className="px-1 text-slate-400">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              className={
                p === currentPage
                  ? "inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#5170ff] text-white shadow-[0_10px_22px_rgba(81,112,255,0.35)]"
                  : "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-black/5 hover:bg-slate-50"
              }
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-black/5 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;