"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiMail, FiX } from "react-icons/fi";
import { FaPaw, FaStar } from "react-icons/fa";
import {
  HiOutlineChatAlt2,
  HiOutlineClock,
  HiOutlineHome,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
} from "react-icons/hi";
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

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!row) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

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

  if (typeof document === "undefined") return null;

  const wa = whatsappDigits(row?.adoptantePhone);
  const canWhatsapp = wa.length > 0;
  const email = row?.adoptanteEmail?.trim();
  const canEmail = Boolean(email);
  const isWhatsappPreferred = row?.details?.preferredContact === "whatsapp";
  const isEmailPreferred = row?.details?.preferredContact === "email";
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

              {row.details ? (
                <>
                  <section>
                    <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--neutral-500)]">
                      <HiOutlineChatAlt2 className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                      Mensaje
                    </p>
                    <p className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card-elevated)] px-4 py-3 text-sm italic leading-relaxed text-[var(--neutral-700)]">
                      “{row.details.reason}”
                    </p>
                  </section>

                  <section>
                    <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--neutral-500)]">
                      <HiOutlineHome className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                      Información del hogar
                    </p>
                    <dl className="space-y-2">
                      {[
                        { icon: HiOutlineHome, label: "Tipo de hogar", value: row.details.housingType },
                        {
                          icon: HiOutlineShieldCheck,
                          label: "Protección en balcones y ventanas",
                          value: row.details.protection,
                        },
                        {
                          icon: HiOutlineClock,
                          label: "Horas por día que estaría solo/a",
                          value: row.details.aloneHoursPerDay,
                        },
                        {
                          icon: FaPaw,
                          label: "Tiene mascotas",
                          value: row.details.otherPets ?? "No",
                        },
                      ].map(({ icon: Icon, label, value }) => (
                        <div
                          key={label}
                          className="flex items-start gap-3 rounded-xl bg-[var(--surface-card-elevated)] px-4 py-3"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--neutral-400)]" aria-hidden />
                          <div className="min-w-0">
                            <dt className="text-xs font-medium text-[var(--neutral-400)]">{label}</dt>
                            <dd className="whitespace-pre-line text-sm text-[var(--neutral-700)]">{value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </section>
                </>
              ) : null}

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
                    <span className="min-w-0 flex-1 truncate">
                      {row.adoptantePhone?.trim() || "Sin número de teléfono"}
                    </span>
                    {isWhatsappPreferred ? (
                      <FaStar
                        className="h-4 w-4 shrink-0 text-amber-400"
                        title="Medio de contacto preferido"
                        aria-label="Medio de contacto preferido"
                      />
                    ) : null}
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
                    <span className="min-w-0 flex-1 truncate">{email || "Sin correo electrónico"}</span>
                    {isEmailPreferred ? (
                      <FaStar
                        className="h-4 w-4 shrink-0 text-amber-400"
                        title="Medio de contacto preferido"
                        aria-label="Medio de contacto preferido"
                      />
                    ) : null}
                  </a>
                </div>
              </section>
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
