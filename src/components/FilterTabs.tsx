"use client";

export type FilterTabItem<T extends string = string> = {
  id: T;
  label: string;
  count?: number;
  dotColor?: string;
};

type FilterTabsProps<T extends string> = {
  items: readonly FilterTabItem<T>[];
  value: T;
  onChange: (next: T) => void;
  ariaLabel: string;
  idPrefix: string;
};

const baseClass =
  "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const selectedClass = `${baseClass} bg-[var(--accent)] text-white shadow-sm hover:bg-[var(--accent-hover)]`;

const unselectedClass = `${baseClass} border border-[var(--accent-border-35)] bg-white text-[var(--accent)] hover:border-[var(--accent-border-55)] hover:bg-[var(--accent-overlay-5)]`;

export default function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  idPrefix,
}: FilterTabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {items.map(({ id, label, count, dotColor }) => {
        const selected = value === id;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            id={`${idPrefix}-${id}`}
            onClick={() => onChange(id)}
            className={selected ? selectedClass : unselectedClass}
          >
            {dotColor ? (
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: dotColor }}
              />
            ) : null}
            <span>{label}</span>
            {typeof count === "number" ? (
              <span
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  selected ? "bg-white/25 text-white" : "bg-[var(--accent-overlay-12)] text-[var(--accent)]"
                }`}
              >
                {count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
