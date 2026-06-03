"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { FiArrowUpCircle } from "react-icons/fi";

type PublishConfirmDialogProps = {
  open: boolean;
  petName?: string;
  loading?: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
  onCancel: () => void;
};

export default function PublishConfirmDialog({
  open,
  petName,
  loading = false,
  onPublish,
  onSaveDraft,
  onCancel,
}: PublishConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const publishRef = useRef<HTMLButtonElement | null>(null);
  const mounted = useSyncExternalStore(() => () => { }, () => true, () => false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => publishRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, loading, onCancel]);

  if (!mounted) return null;

  const name = petName?.trim();

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-1200 flex items-center justify-center p-4"
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
            onClick={() => {
              if (!loading) onCancel();
            }}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-(--shadow-card-elevated) ring-1 ring-black/5"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex gap-4 p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--accent-overlay-12) text-accent">
                <FiArrowUpCircle className="h-5 w-5" aria-hidden />
              </span>

              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-base font-semibold text-(--foreground-inverse)">
                  {name ? `¿Publicar a ${name}?` : "¿Publicar esta mascota?"}
                </h2>
                <p id={descriptionId} className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                  Va a aparecer en el listado público de adopción. Si todavía la estás
                  preparando, guardala como borrador.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-(--border-hairline) bg-(--warm-sand)/40 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onSaveDraft}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl border border-(--border-input) bg-background px-4 py-2.5 text-sm font-semibold text-(--foreground-inverse) transition hover:bg-warm-sand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Guardar borrador
              </button>

              <button
                ref={publishRef}
                type="button"
                onClick={onPublish}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : null}
                Publicar
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
