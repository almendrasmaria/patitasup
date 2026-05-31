"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiMail, FiX } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { SiWhatsapp } from "react-icons/si";

import type { AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import RequestStatusBadge from "./RequestStatusBadge";

type ViewFormModalProps = {
  row: AdoptionRequestRow | null;
  onClose: () => void;
  onStatusChange: (row: AdoptionRequestRow, status: AdoptionRequestStatus) => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const slideTransition = { duration: 0.42, ease: "easeInOut" } as const;

function whatsappDigits(phone?: string) {
  if (!phone?.trim()) return "";
  return phone.replace(/\D/g, "");
}

export default function ViewFormModal({ row, onClose, onStatusChange }: ViewFormModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // onClose llega inline desde el padre (nueva identidad por render), así que lo
  // guardamos en un ref para que el efecto dependa solo de `row` y no se re-arme
  // (lo que robaría el foco) en cada render del padre.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Reimplementamos lo que daba <dialog> nativo: bloqueo de scroll, Escape,
  // foco inicial + restauración y focus-trap con Tab. Solo mientras hay solicitud.
  useEffect(() => {
    if (!row) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Foco inicial dentro del panel.
    const focusTimer = window.setTimeout(() => {
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      focusables?.[0]?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = originalOverflow;
      previouslyFocused?.focus?.();
    };
  }, [row]);

  // En el servidor no renderizamos el overlay (row siempre es null en SSR).
  if (typeof document === "undefined") return null;

  const wa = whatsappDigits(row?.adoptantePhone);
  const canWhatsapp = wa.length > 0;
  const email = row?.adoptanteEmail?.trim();
  const canEmail = Boolean(email);
  const subject = row ? encodeURIComponent(`Solicitud de adopción — ${row.petName}`) : "";
  const petLine = row ? [row.petSpecies, row.petAgeLabel].filter(Boolean).join(" · ") : "";

  return createPortal(
    <AnimatePresence>
      {row ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={slideTransition}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Solicitud de adopción"
            className="fixed inset-y-0 right-0 z-[101] flex h-full w-[min(100vw,26rem)] max-w-full flex-col bg-white shadow-2xl ring-1 ring-black/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={slideTransition}
          >
            <header className="flex items-center justify-between gap-3 border-b border-[var(--border-hairline)] px-5 py-4">
              <h2 className="text-lg font-semibold text-[var(--foreground-inverse)]">Solicitud de adopción</h2>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full p-1.5 text-[var(--neutral-500)] transition hover:bg-[var(--surface-row)] hover:text-[var(--neutral-700)]"
              >
                <FiX className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <section className="space-y-2">
                <h3 className="text-base font-semibold text-[var(--foreground-inverse)]">{row.adoptanteName}</h3>
                {row.adoptanteLocation ? (
                  <p className="flex items-center gap-1.5 text-sm text-[var(--neutral-500)]">
                    <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-[var(--neutral-400)]" aria-hidden />
                    {row.adoptanteLocation}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-2">
                  <RequestStatusBadge status={row.status} />
                  <span className="flex items-center gap-1 text-xs text-[var(--neutral-400)]">
                    <HiOutlineClock className="h-3.5 w-3.5" aria-hidden />
                    {row.dateLabel}
                  </span>
                </div>
              </section>

              <section>
                <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--neutral-500)]">
                  <FaPaw className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
                  Mascota solicitada
                </p>
                <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card-elevated)] px-4 py-3">
                  <p className="font-semibold text-[var(--foreground-inverse)]">{row.petName}</p>
                  {petLine ? <p className="mt-0.5 text-sm text-[var(--neutral-500)]">{petLine}</p> : null}
                </div>
              </section>

              <section>
                <p className="mb-2 text-[13px] font-semibold text-[var(--neutral-500)]">Contacto</p>
                <div className="space-y-2">
                  <a
                    href={canWhatsapp ? `https://wa.me/${wa}` : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!canWhatsapp}
                    className={`flex items-center gap-3 rounded-xl border border-[var(--border-hairline)] px-4 py-3 text-sm transition ${
                      canWhatsapp
                        ? "text-[var(--neutral-700)] hover:border-[var(--whatsapp-border-hover)] hover:bg-[var(--whatsapp-bg-hover)]"
                        : "pointer-events-none opacity-50"
                    }`}
                  >
                    <SiWhatsapp className="h-5 w-5 shrink-0 text-[var(--whatsapp)]" aria-hidden />
                    <span className="truncate">{row.adoptantePhone?.trim() || "Sin número de teléfono"}</span>
                  </a>

                  <a
                    href={canEmail ? `mailto:${email}?subject=${subject}` : undefined}
                    aria-disabled={!canEmail}
                    className={`flex items-center gap-3 rounded-xl border border-[var(--border-hairline)] px-4 py-3 text-sm transition ${
                      canEmail
                        ? "text-[var(--neutral-700)] hover:border-[var(--accent-border-20)] hover:bg-[var(--accent-overlay-8)]"
                        : "pointer-events-none opacity-50"
                    }`}
                  >
                    <FiMail className="h-5 w-5 shrink-0 text-[var(--accent-contrast)]" aria-hidden />
                    <span className="truncate">{email || "Sin correo electrónico"}</span>
                  </a>
                </div>
              </section>

              {row.details ? (
                <section>
                  <p className="mb-2 text-[13px] font-semibold text-[var(--neutral-500)]">Formulario de pre-adopción</p>
                  <dl className="space-y-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card-elevated)] px-4 py-3 text-sm">
                    <div>
                      <dt className="text-xs font-medium text-[var(--neutral-400)]">Medio de contacto preferido</dt>
                      <dd className="text-[var(--neutral-700)]">{row.details.preferredContact}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[var(--neutral-400)]">Tipo de vivienda</dt>
                      <dd className="text-[var(--neutral-700)]">{row.details.housingType}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[var(--neutral-400)]">
                        Protección en balcones y ventanas
                      </dt>
                      <dd className="text-[var(--neutral-700)]">{row.details.protection}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-[var(--neutral-400)]">
                        Horas por día que estaría solo/a
                      </dt>
                      <dd className="text-[var(--neutral-700)]">{row.details.aloneHoursPerDay}</dd>
                    </div>
                    {row.details.otherPets ? (
                      <div>
                        <dt className="text-xs font-medium text-[var(--neutral-400)]">Otras mascotas en casa</dt>
                        <dd className="whitespace-pre-line text-[var(--neutral-700)]">{row.details.otherPets}</dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="text-xs font-medium text-[var(--neutral-400)]">Motivación para adoptar</dt>
                      <dd className="whitespace-pre-line text-[var(--neutral-700)]">{row.details.reason}</dd>
                    </div>
                  </dl>
                </section>
              ) : null}
            </div>

            <footer className="grid grid-cols-2 gap-3 border-t border-[var(--border-hairline)] px-5 py-4">
              <button
                type="button"
                onClick={() => onStatusChange(row, "rechazada")}
                disabled={row.status === "rechazada"}
                className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(row, "aprobada")}
                disabled={row.status === "aprobada"}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Aprobar solicitud
              </button>
            </footer>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
