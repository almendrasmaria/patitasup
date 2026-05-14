"use client";

import type { HomeProcessAudience } from "../types";

type Props = {
  value: HomeProcessAudience;
  onChange: (value: HomeProcessAudience) => void;
};

const options: { value: HomeProcessAudience; label: string }[] = [
  { value: "adopters", label: "Para adoptantes" },
  { value: "rescuers", label: "Para rescatistas" },
];

export default function HomeProcessTabs({ value, onChange }: Props) {
  return (
    <div className="inline-flex rounded-full bg-[var(--warm-sand)] p-1.5 shadow-[0_10px_28px_rgba(45,45,45,0.05)] ring-1 ring-[var(--warm-beige-dark)]/45">
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={[
              "rounded-full px-6 py-3 text-sm font-medium transition-all duration-200",
              active
                ? "bg-white text-[var(--primary)] shadow-[0_8px_20px_rgba(45,45,45,0.06)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--primary)]",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
