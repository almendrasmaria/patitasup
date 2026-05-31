"use client";

import { useEffect, useRef } from "react";
import { FiMail, FiX } from "react-icons/fi";
import { FaPaw } from "react-icons/fa";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { SiWhatsapp } from "react-icons/si";

import type { AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import RequestStatusBadge from "./RequestStatusBadge";
import RequestStatusSelect from "./RequestStatusSelect";

type ViewFormModalProps = {
  row: AdoptionRequestRow | null;
  dirty?: boolean;
  onClose: () => void;
  onStatusChange: (row: AdoptionRequestRow, status: AdoptionRequestStatus) => void;
};

function whatsappDigits(phone?: string) {
  if (!phone?.trim()) return "";
  return phone.replace(/\D/g, "");
}

export default function ViewFormModal({ row, dirty = false, onClose, onStatusChange }: ViewFormModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (row) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [row]);

  const wa = whatsappDigits(row?.adoptantePhone);
  const canWhatsapp = wa.length > 0;
  const email = row?.adoptanteEmail?.trim();
  const canEmail = Boolean(email);
  const subject = row ? encodeURIComponent(`Solicitud de adopción — ${row.petName}`) : "";
  const petLine = row ? [row.petSpecies, row.petAgeLabel].filter(Boolean).join(" · ") : "";

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-y-0 right-0 left-auto z-[100] m-0 h-full max-h-full w-[min(100vw,26rem)] max-w-[100vw] translate-x-0 bg-white p-0 shadow-2xl ring-1 ring-black/10 backdrop:bg-black/40"
      onClose={onClose}
    >
      {row ? (
        <div className="flex h-full flex-col">
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
              <p className="mb-2 text-[13px] font-semibold text-[var(--neutral-500)]">Estado de la solicitud</p>
              <RequestStatusSelect
                status={row.status}
                onChange={(status) => onStatusChange(row, status)}
                dirty={dirty}
              />
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

            <p className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-card-elevated)] px-4 py-3 text-sm leading-relaxed text-[var(--neutral-500)]">
              Las respuestas completas del formulario de pre-adopción (vivienda, experiencia previa y motivación) se
              mostrarán aquí cuando esté conectado al backend.
            </p>
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
        </div>
      ) : null}
    </dialog>
  );
}
