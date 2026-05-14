import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import type { Pet } from "@/features/pets/types";

import CatInfoChip from "./CatInfoChip";

type Props = {
  pet: Pet;
  favorite?: {
    active: boolean;
    onToggle: () => void;
  };
};

const CatCard = ({ pet, favorite }: Props) => {
  const isRemoteImage = /^https?:\/\//.test(pet.image);
  const rescueName = pet.rescueInstagram || "Refugio";
  const rescueInitial = rescueName.replace(/^@/, "").charAt(0).toUpperCase() || "A";

  return (
    <article className="w-full overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-black/5">
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          unoptimized={isRemoteImage}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {favorite ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              favorite.onToggle();
            }}
            aria-label={favorite.active ? "Quitar de favoritos" : "Agregar a favoritos"}
            aria-pressed={favorite.active}
            className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[var(--warm-orange)] shadow-md backdrop-blur-sm transition hover:bg-white"
          >
            <FiHeart className={`h-5 w-5 ${favorite.active ? "fill-current" : ""}`} />
          </button>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/30 to-transparent px-5 py-4">
          <div className="text-3xl font-semibold text-white">{pet.name}</div>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <HiOutlineLocationMarker className="h-4 w-4 shrink-0" />
            <span>{pet.locationLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 pt-5 pb-6">
        <div className="grid grid-cols-2 gap-4">
          <CatInfoChip label="Edad" value={pet.ageLabel} />
          <CatInfoChip label="Sexo" value={pet.sex === "male" ? "Macho" : "Hembra"} />
        </div>

        <p className="text-sm leading-relaxed text-slate-600">{pet.description}</p>

        <div className="h-px w-full bg-slate-200" />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-bg-chip)] text-[var(--accent)] text-lg font-semibold">
              {rescueInitial}
            </div>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                Rescatado por
              </div>
              <div className="text-sm font-semibold text-slate-800">
                {rescueName}
              </div>
            </div>
          </div>

          <Link
            href={`/pets/adoption/${pet.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="rounded-full bg-[var(--slate-button)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Adoptar
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CatCard;
