"use client";

import * as Select from "@radix-ui/react-select";
import { FiCheck, FiChevronDown } from "react-icons/fi";

import type { PublicationStatus } from "../types";

const LABEL: Record<PublicationStatus, string> = {
  activo: "Activo",
  adoptado: "Adoptado",
  borrador: "Borrador",
};

const STYLES: Record<PublicationStatus, string> = {
  activo:
    "border-[var(--accent-border-20)] bg-[var(--accent-overlay-12)] text-[var(--accent-contrast)] hover:bg-[var(--accent-overlay-18)]",
  adoptado:
    "border-[var(--status-info-border)] bg-[var(--status-info-bg)] text-[var(--status-info-fg)] hover:bg-[var(--warm-beige)]",
  borrador:
    "border-[var(--border-neutral-strong)] bg-[var(--border-neutral)] text-[var(--neutral-600)] hover:bg-[var(--neutral-hover)]",
};

type StatusBadgeProps = {
  status: PublicationStatus;
  onChange?: (status: PublicationStatus) => void;
  disabled?: boolean;
  dirty?: boolean;
};

const STATUS_OPTIONS: PublicationStatus[] = ["activo", "adoptado", "borrador"];

export default function StatusBadge({
  status,
  onChange,
  disabled = false,
  dirty = false,
}: StatusBadgeProps) {
  return (
    <Select.Root value={status} onValueChange={(value) => onChange?.(value as PublicationStatus)} disabled={disabled}>
      <Select.Trigger
        className={`inline-flex min-w-[8.75rem] items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] data-[state=open]:translate-y-0 data-[state=open]:shadow-md ${dirty ? "ring-2 ring-[var(--accent-ring-25)]" : "ring-0"} ${disabled ? "cursor-not-allowed opacity-60 hover:shadow-sm" : "cursor-pointer hover:-translate-y-px hover:shadow-md"} ${STYLES[status]}`}
        aria-label={`Estado: ${LABEL[status]}`}
      >
        <Select.Value>{LABEL[status]}</Select.Value>
        <Select.Icon>
          <FiChevronDown className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-9999 min-w-(--radix-select-trigger-width) overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/10"
        >
          <Select.Viewport className="p-2">
            {STATUS_OPTIONS.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-700 outline-none transition data-highlighted:bg-[var(--surface-highlight)] data-[state=checked]:bg-[var(--accent-select)]"
              >
                <Select.ItemText>{LABEL[option]}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3 inline-flex items-center text-[var(--accent-contrast)]">
                  <FiCheck className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
