import * as Select from "@radix-ui/react-select";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { FaBirthdayCake } from "react-icons/fa";

export type AgeFilter = "any" | "kitten" | "young" | "adult" | "senior";

const AGE_OPTIONS: { value: AgeFilter; trigger: string; label: string }[] = [
  { value: "any", trigger: "Cualquier edad", label: "Cualquier edad" },
  { value: "kitten", trigger: "Cachorro", label: "Cachorro (0–6 meses)" },
  { value: "young", trigger: "Joven", label: "Joven (6 meses–2 años)" },
  { value: "adult", trigger: "Adulto", label: "Adulto (2–7 años)" },
  { value: "senior", trigger: "Senior", label: "Senior (7+ años)" },
];

type Props = {
  value: AgeFilter;
  onChange: (value: AgeFilter) => void;
};

const AgeSelect = ({ value, onChange }: Props) => {
  const triggerLabel =
    AGE_OPTIONS.find((o) => o.value === value)?.trigger ?? "Cualquier edad";

  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as AgeFilter)}>
      <Select.Trigger
        aria-label="Filtro de edad"
        className={[
          "flex h-12 w-full items-center justify-between rounded-xl",
          "bg-[#F6F7F9] px-4 text-sm text-slate-600",
          "ring-1 ring-black/5 outline-none",
          "focus:ring-[#5170ff]/30 data-[state=open]:ring-[#5170ff]/30",
        ].join(" ")}
      >
        <span className="inline-flex items-center gap-2">
          <FaBirthdayCake className="text-slate-400" />
          <span>{triggerLabel}</span>
        </span>

        <Select.Icon className="text-slate-400">
          <FiChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10"
        >
          <Select.Viewport className="p-2">
            {AGE_OPTIONS.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className={[
                  "relative flex cursor-pointer select-none items-center",
                  "rounded-xl px-3 py-2 text-sm text-slate-700 outline-none",
                  "data-[highlighted]:bg-[#F6F7F9]",
                  "data-[state=checked]:bg-[#EEF2FF]",
                ].join(" ")}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3 inline-flex items-center text-slate-600">
                  <FiCheck />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default AgeSelect;