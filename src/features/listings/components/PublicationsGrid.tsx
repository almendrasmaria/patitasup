"use client";

import { AnimatePresence, motion } from "motion/react";
import { FiInbox } from "react-icons/fi";

import type { Publication } from "../types";
import PublicationCard from "./PublicationCard";

type PublicationsGridProps = {
  rows: Publication[];
  onEdit: (row: Publication) => void;
  onDelete: (row: Publication) => void;
  busyRowId?: string | null;
};

export default function PublicationsGrid({
  rows,
  onEdit,
  onDelete,
  busyRowId = null,
}: PublicationsGridProps) {
  if (rows.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--border-input)] bg-white/60 px-6 py-16 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-overlay-10)] text-[var(--accent)]">
          <FiInbox className="h-6 w-6" aria-hidden />
        </span>
        <p className="text-sm font-medium text-[var(--neutral-600)]">
          No hay publicaciones para este filtro.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {rows.map((row) => (
          <motion.div
            key={row.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="h-full"
          >
            <PublicationCard
              publication={row}
              onEdit={() => onEdit(row)}
              onDelete={() => onDelete(row)}
              busy={busyRowId === row.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
