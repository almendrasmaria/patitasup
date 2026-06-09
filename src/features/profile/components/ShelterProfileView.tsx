import type { ReactNode } from "react";
import { FaPaw } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

import PetsGridWithModal from "@/features/pets/components/PetsGridWithModal";
import type { Pet } from "@/features/pets/types";

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0]?.toUpperCase())
      .join("") || "PU"
  );
}

type ShelterProfileViewProps = {
  profileName: string;
  location: string | null;
  description: string | null;
  contact: ReactNode;
  pets?: Pet[];
  initialPetSlug?: string;
  showPublications?: boolean;
  headerAction?: ReactNode;
  locationPlaceholder?: string;
  aboutPlaceholder?: string;
  emptyPublicationsText?: string;
};

export default function ShelterProfileView({
  profileName,
  location,
  description,
  contact,
  pets = [],
  initialPetSlug,
  showPublications = true,
  headerAction,
  locationPlaceholder,
  aboutPlaceholder,
  emptyPublicationsText = "Todavía no hay publicaciones activas.",
}: ShelterProfileViewProps) {
  const initials = getInitials(profileName);
  const locationText = location ?? locationPlaceholder ?? null;
  const aboutText = description ?? aboutPlaceholder ?? null;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <article className="rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="relative h-36 rounded-t-xl bg-gradient-to-r from-[var(--warm-orange)] via-[#ff9d73] to-[var(--brand-teal)] sm:h-44">
            <div className="absolute right-5 top-4 text-right text-white drop-shadow-sm">
              <p className="text-sm font-semibold">{profileName}</p>
            </div>
          </div>

          <div className="px-5 pb-6 sm:px-8">
            <div className="flex items-end justify-between">
              <div className="relative z-10 -mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-2xl font-bold text-[var(--warm-orange)] shadow-sm ring-1 ring-black/5 sm:-mt-14 sm:h-28 sm:w-28">
                {initials}
              </div>

              {headerAction}
            </div>

            <h1 className="mt-4 text-[26px] font-semibold text-[var(--foreground-table)]">{profileName}</h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-[var(--neutral-500)]">
              {locationText ? (
                <>
                  <FiMapPin className="h-4 w-4 shrink-0" aria-hidden />
                  <span>{locationText}</span>
                  <span aria-hidden>·</span>
                </>
              ) : null}
              {contact}
            </p>

            {aboutText ? (
              <div className="mt-5 border-t border-[var(--border-hairline)] pt-5">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
                  Sobre el refugio
                </h2>
                <p
                  className={`mt-3 text-[15px] leading-7 ${
                    description ? "text-[var(--foreground-table)]" : "text-[var(--neutral-500)]"
                  }`}
                >
                  {aboutText}
                </p>
              </div>
            ) : null}
          </div>
        </article>

        {showPublications ? (
          <div className="mt-8">
            <h2 className="flex items-center gap-2 text-[18px] font-semibold text-[var(--foreground-table)]">
              <FaPaw className="h-5 w-5 text-[var(--warm-orange)]" aria-hidden />
              Mascotas en adopción
              <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[var(--accent-overlay-10)] px-2 text-sm font-semibold text-[var(--warm-orange)]">
                {pets.length}
              </span>
            </h2>
            {pets.length > 0 ? (
              <div className="mt-5">
                <PetsGridWithModal pets={pets} initialPetSlug={initialPetSlug} />
              </div>
            ) : (
              <p className="mt-3 text-[15px] leading-7 text-[var(--neutral-500)]">{emptyPublicationsText}</p>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
