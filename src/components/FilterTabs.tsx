"use client";

export type FilterTabItem<T extends string = string> = {
  id: T;
  label: string;
};

type FilterTabsProps<T extends string> = {
  items: readonly FilterTabItem<T>[];
  value: T;
  onChange: (next: T) => void;
  ariaLabel: string;
  idPrefix: string;
};

const selectedClass =
  "rounded-full bg-[#7061F0] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f51d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]";

const unselectedClass =
  "rounded-full border border-[#7061F0]/35 bg-white px-5 py-2 text-sm font-semibold text-[#7061F0] transition hover:border-[#7061F0]/55 hover:bg-[#7061F0]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]";

export default function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  idPrefix,
}: FilterTabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {items.map(({ id, label }) => {
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
            {label}
          </button>
        );
      })}
    </div>
  );
}
