import { HiCheck } from "react-icons/hi";

const ITEMS = ["Adopción gratuita", "Proceso seguro", "Seguimiento post-adopción"] as const;

export default function AdoptionFormTrustFooter() {
  return (
    <ul className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 md:gap-x-8">
      {ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 text-[13px] text-[var(--muted-foreground)]"
        >
          <HiCheck className="shrink-0 text-[var(--accent)]" size={16} aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}
