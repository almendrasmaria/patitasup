"use client";

import { FiCheck } from "react-icons/fi";

type ToggleOption<T extends string> = {
  value: T;
  label: string;
  selectedClassName?: string;
};

type OptionToggleGroupProps<T extends string> = {
  ariaLabel: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  showCheck?: boolean;
};

const selectedBaseClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition";

const defaultSelectedColor = "bg-[var(--accent)] hover:bg-[var(--accent-hover)]";

const unselectedClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-input)] bg-white px-4 py-3 text-sm font-semibold text-[var(--neutral-700)] transition hover:border-[var(--accent-border-55)] hover:bg-[var(--accent-overlay-5)]";

export default function OptionToggleGroup<T extends string>({
  ariaLabel,
  options,
  value,
  onChange,
  className,
  showCheck = false,
}: OptionToggleGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={className ?? "grid grid-cols-2 gap-3"}>
      {options.map((option) => {
        const selected = value === option.value;
        const selectedClass = `${selectedBaseClass} ${option.selectedClassName ?? defaultSelectedColor}`;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`${selected ? selectedClass : unselectedClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
          >
            {selected && showCheck ? <FiCheck className="h-4 w-4 shrink-0" aria-hidden /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
