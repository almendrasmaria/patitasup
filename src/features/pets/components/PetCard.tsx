import Image from "next/image";
import Link from "next/link";
import { FaMars, FaVenus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import type { Pet } from "@/features/pets/types";
import { CharacteristicChip } from "@/features/listings/lib/characteristicsMeta";

type Props = {
  pet: Pet;
  favorite?: {
    active: boolean;
    onToggle: () => void;
  };
  onOpenDetail?: (pet: Pet) => void;
};

export default function PetCard({ pet, favorite, onOpenDetail }: Props) {
  const isRemoteImage = /^https?:\/\//.test(pet.image);
  const rescueName = pet.rescueInstagram || "Refugio";
  const isMale = pet.sex === "male";
  const SexIcon = isMale ? FaMars : FaVenus;

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5">
      <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--warm-sand)]">
        <Image
          src={pet.image}
          alt={pet.name}
          fill
          unoptimized={isRemoteImage}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
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
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="min-w-0 truncate text-xl font-semibold text-slate-900"
            title={pet.name}
          >
            {pet.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1.5 text-sm text-slate-500">
            <SexIcon
              className={`h-4 w-4 ${isMale ? "text-sky-500" : "text-pink-500"}`}
              aria-hidden
            />
            {pet.ageLabel}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-slate-500">
          <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          <span className="truncate">{pet.locationLabel}</span>
        </p>

        {pet.characteristics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {pet.characteristics.slice(0, 3).map((characteristic) => (
              <CharacteristicChip key={characteristic} label={characteristic} sex={pet.sex} />
            ))}
            {pet.characteristics.length > 3 ? (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                +{pet.characteristics.length - 3} más
              </span>
            ) : null}
          </div>
        ) : (
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{pet.description}</p>
        )}

        <div className="mt-auto flex flex-col gap-4 pt-1">
          <div className="h-px w-full bg-slate-200" />

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Rescatista
              </div>
              <div className="truncate text-sm font-medium text-slate-800">{rescueName}</div>
            </div>

            {onOpenDetail ? (
              <button
                type="button"
                onClick={() => onOpenDetail(pet)}
                className="shrink-0 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Ver más
              </button>
            ) : (
              <Link
                href={`/pets/adoption/${pet.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="shrink-0 rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
              >
                Ver más
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
