"use client";

import { FaPaw } from "react-icons/fa";

type Props = {
  petName: string;
};

export default function AdoptionFormCardIntro({ petName }: Props) {
  return (
    <header className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--accent-border-20)] bg-[var(--accent-bg-chip)] text-[var(--accent)]">
        <FaPaw size={20} aria-hidden />
      </div>

      <h1 className="mt-4 text-[22px] font-bold tracking-tight text-[var(--foreground-heading)] sm:text-2xl">
        Solicitud de Adopción
      </h1>

      <p className="mt-2 text-[14px] leading-relaxed text-[var(--muted-foreground)]">
        Estás a un paso de darle un hogar a{" "}
        <span className="font-semibold text-[var(--accent)]">{petName}</span>.
      </p>
    </header>
  );
}
