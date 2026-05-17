"use client";

import { FaBirthdayCake } from "react-icons/fa";

import MinimalSelect, { type MinimalSelectOption } from "@/components/ui/MinimalSelect";
import type { AgeFilter } from "@/features/pets/lib/petAgeFilter";

const OPTIONS = [
  { value: "any" as const, label: "Cualquier edad" },
  { value: "kitten" as const, label: "Cachorro (0–6 meses)" },
  { value: "young" as const, label: "Joven (6 meses–2 años)" },
  { value: "adult" as const, label: "Adulto (2–7 años)" },
  { value: "senior" as const, label: "Senior (7+ años)" },
] satisfies readonly MinimalSelectOption<AgeFilter>[];

type Props = {
  value: AgeFilter;
  onChange: (next: AgeFilter) => void;
};

export default function PetAgeRangeFilter({ value, onChange }: Props) {
  return (
    <MinimalSelect<AgeFilter>
      ariaLabel="Filtro de edad"
      label="Edad"
      value={value}
      onChange={onChange}
      options={OPTIONS}
      leadingIcon={<FaBirthdayCake className="opacity-90" aria-hidden />}
    />
  );
}
