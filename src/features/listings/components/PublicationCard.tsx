"use client";

import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

import type { Publication } from "../types";
import ActionIconButton from "./ActionIconButton";
import StatusBadge from "./StatusBadge";
import TypeBadge from "./TypeBadge";

type PublicationCardProps = {
  publication: Publication;
  onEdit: () => void;
  onDelete: () => void;
  busy?: boolean;
};

export default function PublicationCard({
  publication,
  onEdit,
  onDelete,
  busy = false,
}: PublicationCardProps) {
  const isRemoteImage = /^https?:\/\//.test(publication.imageUrl);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--warm-sand)]">
        <Image
          src={publication.imageUrl}
          alt={publication.petName}
          fill
          unoptimized={isRemoteImage}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3">
          <TypeBadge species={publication.species} />
        </div>

        <div className="absolute top-3 right-3">
          <StatusBadge status={publication.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="min-w-0 truncate text-lg font-semibold text-[var(--foreground-inverse)]"
            title={publication.petName}
          >
            {publication.petName}
          </h3>
          <span className="shrink-0 text-sm text-[var(--neutral-500)]">{publication.age}</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-[var(--neutral-600)]">
          <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-[var(--neutral-400)]" aria-hidden />
          <span className="min-w-0 truncate" title={publication.location}>
            {publication.location}
          </span>
          <span aria-hidden className="text-[var(--neutral-400)]">
            ·
          </span>
          <span className="shrink-0">{publication.sex}</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-3">
          <span className="text-xs text-[var(--neutral-500)]">{publication.date}</span>

          <div className="flex items-center gap-1.5">
            <ActionIconButton
              label={`Editar publicación de ${publication.petName}`}
              onClick={onEdit}
              disabled={busy}
              className="hover:border-[var(--accent-border-20)] hover:bg-[var(--accent-overlay-8)] hover:text-[var(--accent-contrast)]"
            >
              <FiEdit2 className="h-4.5 w-4.5" />
            </ActionIconButton>
            <ActionIconButton
              label={`Eliminar publicación de ${publication.petName}`}
              onClick={onDelete}
              disabled={busy}
              className="hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <FiTrash2 className="h-4.5 w-4.5" />
            </ActionIconButton>
          </div>
        </div>
      </div>
    </article>
  );
}
