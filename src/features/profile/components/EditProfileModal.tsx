"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiEdit2, FiX } from "react-icons/fi";

type EditProfileModalProps = {
  location?: string | null;
  description?: string | null;
};

const transition = { duration: 0.18, ease: "easeOut" } as const;

export default function EditProfileModal({ location, description }: EditProfileModalProps) {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const initial = {
    location: location ?? "",
    description: description ?? "",
  };
  const [values, setValues] = useState(initial);

  useEffect(() => {
    if (!open) {
      return;
    }

    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = originalOverflow;
    };
  }, [open]);

  function handleOpen() {
    setValues(initial);
    setOpen(true);
  }

  function handleSave() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="mb-1 inline-flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground-table)] transition hover:bg-[var(--surface-profile-tint)]"
      >
        <FiEdit2 className="h-4 w-4" aria-hidden />
        Editar
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <>
                  <motion.div
                    key="backdrop"
                    className="fixed inset-0 z-[100] bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={transition}
                    onClick={() => setOpen(false)}
                    aria-hidden
                  />

                  <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
                    <motion.div
                      ref={panelRef}
                      role="dialog"
                      aria-modal="true"
                      aria-label="Editar perfil"
                      className="w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/10"
                      initial={{ opacity: 0, scale: 0.96, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: 8 }}
                      transition={transition}
                    >
                      <header className="flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] px-6 py-4">
                        <h2 className="text-lg font-semibold text-[var(--foreground-table)]">Editar perfil</h2>
                        <button
                          type="button"
                          aria-label="Cerrar"
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center justify-center rounded-full p-1.5 text-[var(--neutral-500)] transition hover:bg-[var(--surface-profile-tint)] hover:text-[var(--foreground-table)]"
                        >
                          <FiX className="h-5 w-5" aria-hidden />
                        </button>
                      </header>

                      <div className="space-y-4 px-6 py-5">
                        <label className="block">
                          <span className="mb-1.5 block text-[13px] font-semibold text-[var(--neutral-500)]">
                            Ubicación
                          </span>
                          <input
                            type="text"
                            value={values.location}
                            placeholder="Ej: Buenos Aires y alrededores"
                            onChange={(event) =>
                              setValues((prev) => ({ ...prev, location: event.target.value }))
                            }
                            className="w-full rounded-lg border border-[var(--border-input)] bg-white px-3.5 py-2.5 text-sm text-[var(--foreground-table)] outline-none transition focus:border-[var(--warm-orange)] focus:ring-2 focus:ring-[var(--accent-overlay-20)]"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-1.5 block text-[13px] font-semibold text-[var(--neutral-500)]">
                            Sobre el refugio
                          </span>
                          <textarea
                            value={values.description}
                            placeholder="Contá la historia de tu refugio, desde cuándo rescatan y cómo trabajan."
                            rows={5}
                            onChange={(event) =>
                              setValues((prev) => ({ ...prev, description: event.target.value }))
                            }
                            className="w-full resize-y rounded-lg border border-[var(--border-input)] bg-white px-3.5 py-2.5 text-sm leading-relaxed text-[var(--foreground-table)] outline-none transition focus:border-[var(--warm-orange)] focus:ring-2 focus:ring-[var(--accent-overlay-20)]"
                          />
                        </label>
                      </div>

                      <footer className="flex items-center justify-end gap-3 border-t border-[var(--border-hairline)] px-6 py-4">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="rounded-lg border border-[var(--border-hairline)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground-table)] transition hover:bg-[var(--surface-profile-tint)]"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          className="rounded-lg bg-[var(--warm-orange)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
                        >
                          Guardar
                        </button>
                      </footer>
                    </motion.div>
                  </div>
                </>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
