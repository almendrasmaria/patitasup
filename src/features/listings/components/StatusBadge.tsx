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
  activo: "border-[#7061F0]/20 bg-[#7061F0]/12 text-[#5b4eb8] hover:bg-[#7061F0]/18",
  adoptado: "border-sky-200 bg-sky-100 text-sky-800 hover:bg-sky-200/80",
  borrador: "border-[#d1d5db] bg-[#e5e7eb] text-[#4b5563] hover:bg-[#dfe3e8]",
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
        className={`inline-flex min-w-[8.75rem] items-center justify-between gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold shadow-sm transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0] data-[state=open]:translate-y-0 data-[state=open]:shadow-md ${dirty ? "ring-2 ring-[#7061F0]/25" : "ring-0"} ${disabled ? "cursor-not-allowed opacity-60 hover:shadow-sm" : "cursor-pointer hover:-translate-y-px hover:shadow-md"} ${STYLES[status]}`}
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
                className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-700 outline-none transition data-highlighted:bg-[#f6f7f9] data-[state=checked]:bg-[#eef2ff]"
              >
                <Select.ItemText>{LABEL[option]}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3 inline-flex items-center text-[#5b4eb8]">
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
