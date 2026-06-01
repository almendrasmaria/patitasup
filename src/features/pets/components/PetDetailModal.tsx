"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiExternalLink, FiHeart, FiShare2, FiX } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import {
  CharacteristicChip,
  groupCharacteristics,
} from "@/features/listings/lib/characteristicsMeta";
import type { Pet } from "@/features/pets/types";

type PetDetailModalProps = {
  pet: Pet | null;
  onClose: () => void;
};

const COPIED_RESET_MS = 2000;

export default function PetDetailModal({ pet, onClose }: PetDetailModalProps) {
  const mounted = useSyncExternalStore(() => () => { }, () => true, () => false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!pet) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [pet]);

  useEffect(
    () => () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    },
    [],
  );

  if (!mounted) return null;

  const isRemoteImage = pet ? /^https?:\/\//.test(pet.image) : false;
  // Flatten into a single list but keep category order so same-colored chips group together.
  const orderedCharacteristics = pet
    ? groupCharacteristics(pet.characteristics).flatMap((group) => group.items)
    : [];
  const rescueName = pet?.rescueInstagram || "Refugio";

  const handleShare = async () => {
    if (!pet) return;
    try {
      const url = `${window.location.origin}/pets?pet=${pet.slug}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // noop
    }
  };

  return createPortal(
    <AnimatePresence>
      {pet ? (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle de ${pet.name}`}
            className="relative grid max-h-[90vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 md:grid-cols-2 2xl:max-w-6xl 2xl:min-h-[40rem]"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] w-full bg-[var(--warm-sand)] md:aspect-auto md:h-full">
              <Image
                src={pet.image}
                alt={pet.name}
                fill
                unoptimized={isRemoteImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex max-h-[90vh] flex-col overflow-y-auto">
              <div className="flex items-center justify-between gap-2 px-6 pt-5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full bg-(--surface-row) px-3 py-1.5 text-sm font-semibold text-neutral-600 transition hover:bg-(--accent-overlay-8) hover:text-accent"
                >
                  {copied ? (
                    <FiCheck className="h-4 w-4 text-emerald-600" aria-hidden />
                  ) : (
                    <FiShare2 className="h-4 w-4" aria-hidden />
                  )}
                  {copied ? "Copiado" : "Compartir"}
                </button>

                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={onClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--surface-row) text-neutral-500 transition hover:text-neutral-700"
                >
                  <FiX className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-5 px-6 py-5 2xl:justify-center">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-(--foreground-inverse)">
                    {pet.name}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                    <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                    {pet.locationLabel}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-(--border-hairline) px-3 py-1 text-sm font-medium text-neutral-700">
                    {pet.sex === "male" ? "Macho" : "Hembra"}
                  </span>
                  <span className="rounded-full border border-(--border-hairline) px-3 py-1 text-sm font-medium text-neutral-700">
                    {pet.ageLabel}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-neutral-600">{pet.description}</p>

                {orderedCharacteristics.length > 0 ? (
                  <section>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                      Características
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {orderedCharacteristics.map((item) => (
                        <CharacteristicChip key={item} label={item} sex={pet.sex} />
                      ))}
                    </div>
                  </section>
                ) : null}

                <div className="flex items-center justify-between gap-3 rounded-2xl border border-(--border-hairline) bg-(--surface-card-elevated) px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--accent-bg-chip) text-accent">
                      <FiHeart className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                        Publicado por
                      </p>
                      <p className="truncate text-sm font-semibold text-neutral-700">{rescueName}</p>
                    </div>
                  </div>
                  <FiExternalLink className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                </div>
              </div>

              <div className="border-t border-(--border-hairline) px-6 py-4">
                <Link
                  href={`/pets/adoption/${pet.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
                >
                  <FiHeart className="h-4 w-4" aria-hidden />
                  Quiero conocer a {pet.name}
                </Link>
                <p className="mt-2 text-center text-xs text-neutral-400">
                  Te conectamos con el rescatista para coordinar el encuentro
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
