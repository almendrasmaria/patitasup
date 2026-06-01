"use client";

import * as Select from "@radix-ui/react-select";
import { HiCheck, HiChevronDown } from "react-icons/hi";

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
  "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

const selectedClass = `${baseClass} bg-[var(--accent)] text-white shadow-sm hover:bg-[var(--accent-hover)]`;

const unselectedClass = `${baseClass} border border-[var(--accent-border-35)] bg-white text-[var(--accent)] hover:border-[var(--accent-border-55)] hover:bg-[var(--accent-overlay-5)]`;

function CountBadge({ count, selected }: { count: number; selected?: boolean }) {
  return (
    <span
      className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
        selected ? "bg-white/25 text-white" : "bg-[var(--accent-overlay-12)] text-[var(--accent)]"
      }`}
    >
      {count}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
}

export default function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  idPrefix,
}: FilterTabsProps<T>) {
  const current = items.find((item) => item.id === value) ?? items[0];

  return (
    <>
      <div className="sm:hidden">
        <Select.Root value={value} onValueChange={(next) => onChange(next as T)}>
          <Select.Trigger
            aria-label={ariaLabel}
            className="flex w-full items-center gap-2 rounded-xl border border-[var(--accent-border-35)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {current?.dotColor ? <Dot color={current.dotColor} /> : null}
            <span className="min-w-0 flex-1 text-left">{current?.label}</span>
            {typeof current?.count === "number" ? <CountBadge count={current.count} /> : null}
            <Select.Icon className="shrink-0 text-[var(--accent)]">
              <HiChevronDown size={18} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              position="popper"
              sideOffset={6}
              className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-[var(--border-hairline-alt)] bg-white shadow-[var(--shadow-dropdown)]"
            >
              <Select.Viewport className="p-1.5">
                {items.map((item) => (
                  <Select.Item
                    key={item.id}
                    value={item.id}
                    className="relative flex h-10 cursor-pointer items-center gap-2 rounded-xl pl-3 pr-9 text-sm text-[var(--foreground-body)] outline-none data-highlighted:bg-[var(--accent-bg-subtle)]"
                  >
                    {item.dotColor ? <Dot color={item.dotColor} /> : null}
                    <Select.ItemText>{item.label}</Select.ItemText>
                    {typeof item.count === "number" ? <CountBadge count={item.count} /> : null}
                    <Select.ItemIndicator className="absolute right-3 inline-flex text-[var(--accent)]">
                      <HiCheck size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div role="tablist" aria-label={ariaLabel} className="hidden flex-wrap gap-2 sm:flex">
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
              {dotColor ? <Dot color={dotColor} /> : null}
              <span>{label}</span>
              {typeof count === "number" ? <CountBadge count={count} selected={selected} /> : null}
            </button>
          );
        })}
      </div>
    </>
  );
}
