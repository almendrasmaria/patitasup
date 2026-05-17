"use client";

import * as Select from "@radix-ui/react-select";
import type { ReactNode } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export type MinimalSelectOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly MinimalSelectOption<T>[];
  ariaLabel: string;
  label?: string;
  leadingIcon?: ReactNode;
  className?: string;
};

export default function MinimalSelect<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  label,
  leadingIcon,
  className = "",
}: Props<T>) {
  const triggerLabel = options.find((o) => o.value === value)?.label ?? "";

  const control = (
    <Select.Root value={value} onValueChange={(v) => onChange(v as T)}>
      <Select.Trigger
        aria-label={ariaLabel}
        className={[
          "group flex h-12 w-full items-center justify-between gap-3 rounded-2xl px-4 text-[15px] font-normal text-[var(--primary)] outline-none",
          "border border-[var(--border-input)] bg-[var(--background)]",
          "transition-[background-color,border-color,box-shadow] duration-200 ease-out",
          "hover:border-[var(--border-neutral-strong)] hover:bg-[var(--warm-sand)]",
          "focus-visible:border-[var(--warm-orange)]/70 focus-visible:ring-1 focus-visible:ring-[var(--warm-orange)]/25",
          "data-[state=open]:border-[var(--warm-orange)]/85 data-[state=open]:bg-[var(--background)] data-[state=open]:shadow-[var(--shadow-select-trigger)]",
          className,
        ].join(" ")}
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          {leadingIcon ? (
            <span className="shrink-0 text-[var(--soft-gray)] opacity-90 [&_svg]:h-[18px] [&_svg]:w-[18px] [&_svg]:stroke-[1.5]">
              {leadingIcon}
            </span>
          ) : null}
          <Select.Value>{triggerLabel}</Select.Value>
        </span>

        <Select.Icon className="shrink-0 text-[var(--soft-gray)] opacity-80">
          <FiChevronDown className="h-4 w-4 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className={[
            "z-[1100] min-w-(--radix-select-trigger-width) overflow-hidden rounded-2xl border border-[var(--border-input)] bg-[var(--background)] p-2",
            "shadow-[var(--shadow-card-elevated)]",
          ].join(" ")}
        >
          <Select.Viewport className="max-h-[min(360px,70vh)] overflow-y-auto p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className={[
                  "relative flex cursor-pointer select-none items-center rounded-xl px-4 py-3.5 text-[15px] font-normal outline-none transition-colors duration-150 ease-out",
                  "text-[var(--primary)]",
                  "data-highlighted:bg-[var(--warm-sand)]/80 data-highlighted:text-[var(--primary)]",
                  "data-[state=checked]:bg-[var(--warm-sand)] data-[state=checked]:text-[var(--warm-orange)]",
                ].join(" ")}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-4 inline-flex items-center text-[var(--warm-orange)] opacity-90">
                  <FiCheck className="h-4 w-4" strokeWidth={2} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );

  if (!label) {
    return control;
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
        {label}
      </span>
      {control}
    </div>
  );
}
