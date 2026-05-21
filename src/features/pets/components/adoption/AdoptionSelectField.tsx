"use client";

import type { IconType } from "react-icons";
import * as Select from "@radix-ui/react-select";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import AdoptionFormField from "./AdoptionFormField";
import {
  adoptionInputIconClassName,
  adoptionSelectTriggerClassName,
} from "./adoptionFormStyles";

type Props = {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  icon?: IconType;
};

export default function AdoptionSelectField({
  label,
  required,
  placeholder,
  value,
  onValueChange,
  options,
  icon: Icon,
}: Props) {
  return (
    <AdoptionFormField label={label} required={required}>
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger className={adoptionSelectTriggerClassName}>
          {Icon ? <Icon className={adoptionInputIconClassName} size={18} aria-hidden /> : null}
          <span className="min-w-0 flex-1 text-left">
            <Select.Value placeholder={placeholder} />
          </span>
          <Select.Icon className="shrink-0 text-[var(--caption-icon)]">
            <HiChevronDown size={18} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className="z-50 overflow-hidden rounded-lg border border-[var(--border-hairline-alt)] bg-white shadow-[var(--shadow-dropdown)]"
          >
            <Select.Viewport className="p-1.5">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex h-10 cursor-pointer items-center rounded-md px-8 pr-3 text-[14px] text-[var(--foreground-body)] outline-none data-highlighted:bg-[var(--accent-bg-subtle)]"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex text-[var(--accent)]">
                    <HiCheck size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </AdoptionFormField>
  );
}
