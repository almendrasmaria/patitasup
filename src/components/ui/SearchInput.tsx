"use client";

import { FiSearch } from "react-icons/fi";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  ariaLabel,
  className,
}: SearchInputProps) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <FiSearch
        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--placeholder)]"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="h-10 w-full rounded-xl border border-[var(--border-input)] bg-white pr-4 pl-10 text-sm text-[var(--foreground-inverse)] outline-none transition placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring-15)]"
      />
    </div>
  );
}
