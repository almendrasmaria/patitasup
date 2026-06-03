"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiCopy, FiMail, FiSend, FiX } from "react-icons/fi";
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
  shelterName?: string | null;
  onClose: () => void;
  onStatusChange: (row: AdoptionRequestRow, status: AdoptionRequestStatus) => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const slideTransition = { duration: 0.42, ease: "easeInOut" } as const;

const AVAILABILITY_PLACEHOLDER =
  "(escribí acá tu disponibilidad: días, horarios o un enlace para coordinar)";

const COPIED_RESET_MS = 2000;

function whatsappDigits(phone?: string) {
  if (!phone?.trim()) return "";
  return phone.replace(/\D/g, "");
}

function firstNameOf(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

function buildSuggestedMessage(firstName: string, petName: string, shelterName: string) {
  return [
    `Hola ${firstName}! 👋`,
    "",
    `Te escribimos desde *${shelterName}* en relación a tu solicitud para adoptar a *${petName}*.`,
    "",
    "Nos encantaría que se conozcan. Nuestra disponibilidad es la siguiente:",
    "",
    AVAILABILITY_PLACEHOLDER,
    "",
    "¡Muchas gracias por querer darle un hogar! 🐾",
  ].join("\n");
}

export default function ViewFormModal({
  row,
  shelterName,
  onClose,
  onStatusChange,
}: ViewFormModalProps) {
  const mounted = useSyncExternalStore(() => () => { }, () => true, () => false);
  const panelRef = useRef<HTMLDivElement>(null);

  const onCloseRef = useRef(onClose);

  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const rowId = row?.id;

  const defaultMessage = row
    ? buildSuggestedMessage(
        firstNameOf(row.adoptanteName),
        row.petName,
        shelterName?.trim() || "PatitasUp",
      )
    : "";

  const [trackedRowId, setTrackedRowId] = useState(rowId);
  if (rowId !== trackedRowId) {
    setTrackedRowId(rowId);
    setCopied(false);
    setMessage(defaultMessage);
  }

  useEffect(
    () => () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!rowId) return;

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
  }, [rowId]);

  if (!mounted) return null;

  const wa = whatsappDigits(row?.adoptantePhone);
  const canWhatsapp = wa.length > 0;
  const email = row?.adoptanteEmail?.trim();
  const canEmail = Boolean(email);
  const isWhatsappPreferred = row?.details?.preferredContact === "whatsapp";
  const isEmailPreferred = row?.details?.preferredContact === "email";
  const petLine = row ? [row.petSpecies, row.petAgeLabel].filter(Boolean).join(" · ") : "";

  const status = row?.status;
  const isPending = status === "pendiente";
  const isScheduled = status === "agendada";
  const isResolved = status === "aprobada" || status === "rechazada";

  const encodedMessage = encodeURIComponent(message);
  const messageEdited = message !== defaultMessage;
  const visitSubject = row
    ? encodeURIComponent(`Coordinemos la adopción de ${row.petName} 🐾`)
    : "";
  const contactSubject = row
    ? encodeURIComponent(`Solicitud de adopción — ${row.petName}`)
    : "";

  const handleCopy = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    } catch {
      // noop
    }
  };

  return createPortal(
    <AnimatePresence>
      {row ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-100 bg-black/40"
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
            className="fixed inset-y-0 right-0 z-101 flex h-full w-[min(100vw,26rem)] max-w-full flex-col bg-white shadow-2xl ring-1 ring-black/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={slideTransition}
          >
            <header className="flex items-center justify-between gap-3 border-b border-(--border-hairline) px-5 py-4">
              <h2 className="text-lg font-semibold text-(--foreground-inverse)">Solicitud de adopción</h2>
              <button
                type="button"
                aria-label="Cerrar"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full p-1.5 text-neutral-500 transition hover:bg-(--surface-row) hover:text-neutral-700"
              >
                <FiX className="h-5 w-5" aria-hidden />
              </button>
            </header>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <section className="space-y-2">
                <h3 className="text-base font-semibold text-(--foreground-inverse)">{row.adoptanteName}</h3>
                {row.adoptanteLocation ? (
                  <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                    <HiOutlineLocationMarker className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                    {row.adoptanteLocation}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-2">
                  <RequestStatusBadge status={row.status} />
                  <span className="flex items-center gap-1 text-xs text-neutral-400">
                    <HiOutlineClock className="h-3.5 w-3.5" aria-hidden />
                    {row.dateLabel}
                  </span>
                </div>
              </section>

              <section>
                <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">
                  <FaPaw className="h-3.5 w-3.5 text-accent" aria-hidden />
                  Mascota solicitada
                </p>
                <div className="rounded-2xl border border-(--border-hairline) bg-(--surface-card-elevated) px-4 py-3">
                  <p className="font-semibold text-(--foreground-inverse)">{row.petName}</p>
                  {petLine ? <p className="mt-0.5 text-sm text-neutral-500">{petLine}</p> : null}
                </div>
              </section>

              {row.details ? (
                <>
                  <section>
                    <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">
                      <HiOutlineChatAlt2 className="h-4 w-4 text-accent" aria-hidden />
                      Mensaje
                    </p>
                    <p className="rounded-2xl border border-(--border-hairline) bg-(--surface-card-elevated) px-4 py-3 text-sm italic leading-relaxed text-neutral-700">
                      “{row.details.reason}”
                    </p>
                  </section>

                  <section>
                    <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">
                      <HiOutlineHome className="h-4 w-4 text-accent" aria-hidden />
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
                          className="flex items-start gap-3 rounded-xl bg-(--surface-card-elevated) px-4 py-3"
                        >
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
                          <div className="min-w-0">
                            <dt className="text-xs font-medium text-neutral-400">{label}</dt>
                            <dd className="whitespace-pre-line text-sm text-neutral-700">{value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </section>
                </>
              ) : null}

              {isPending ? (
                <section className="space-y-3">
                  <p className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-500">
                    <FiSend className="h-4 w-4 text-accent" aria-hidden />
                    Contactar para agendar
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-(--border-hairline) bg-(--surface-card-elevated)">
                    <div className="flex items-center justify-between gap-2 border-b border-(--border-hairline) px-4 py-2">
                      <span className="text-xs font-medium text-neutral-400">Mensaje sugerido (editable)</span>
                      <div className="flex items-center gap-1">
                        {messageEdited ? (
                          <button
                            type="button"
                            onClick={() => setMessage(defaultMessage)}
                            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-neutral-500 transition hover:bg-white hover:text-neutral-700"
                          >
                            Restablecer
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-neutral-500 transition hover:bg-white hover:text-neutral-700"
                        >
                          {copied ? (
                            <>
                              <FiCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
                              Copiado
                            </>
                          ) : (
                            <>
                              <FiCopy className="h-3.5 w-3.5" aria-hidden />
                              Copiar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      rows={9}
                      aria-label="Mensaje sugerido"
                      className="block w-full resize-y bg-transparent px-4 py-3 text-[13px] leading-relaxed text-neutral-700 outline-none focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={canWhatsapp ? `https://wa.me/${wa}?text=${encodedMessage}` : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!canWhatsapp}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition ${canWhatsapp
                        ? "bg-(--whatsapp) hover:brightness-95"
                        : "pointer-events-none bg-neutral-300"
                        }`}
                    >
                      <SiWhatsapp className="h-4 w-4 shrink-0" aria-hidden />
                      WhatsApp
                    </a>

                    <a
                      href={canEmail ? `mailto:${email}?subject=${visitSubject}&body=${encodedMessage}` : undefined}
                      aria-disabled={!canEmail}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${canEmail
                        ? "border-(--border-input) text-neutral-700 hover:border-(--accent-border-20) hover:bg-(--accent-overlay-8)"
                        : "pointer-events-none border-(--border-hairline) text-neutral-300"
                        }`}
                    >
                      <FiMail className="h-4 w-4 shrink-0" aria-hidden />
                      Email
                    </a>
                  </div>

                  {isWhatsappPreferred || isEmailPreferred ? (
                    <p className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <FaStar className="h-3 w-3 shrink-0 text-amber-400" aria-hidden />
                      Contactar por {isWhatsappPreferred ? "WhatsApp" : "email"}
                    </p>
                  ) : null}
                </section>
              ) : (
                <section>
                  <p className="mb-2 text-[13px] font-semibold text-neutral-500">Contacto</p>
                  <div className="space-y-2">
                    <a
                      href={canWhatsapp ? `https://wa.me/${wa}` : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!canWhatsapp}
                      className={`flex items-center gap-3 rounded-xl border border-(--border-hairline) px-4 py-3 text-sm transition ${canWhatsapp
                        ? "text-neutral-700 hover:border-(--whatsapp-border-hover) hover:bg-(--whatsapp-bg-hover)"
                        : "pointer-events-none opacity-50"
                        }`}
                    >
                      <SiWhatsapp className="h-5 w-5 shrink-0 text-(--whatsapp)" aria-hidden />
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
                      href={canEmail ? `mailto:${email}?subject=${contactSubject}` : undefined}
                      aria-disabled={!canEmail}
                      className={`flex items-center gap-3 rounded-xl border border-(--border-hairline) px-4 py-3 text-sm transition ${canEmail
                        ? "text-neutral-700 hover:border-(--accent-border-20) hover:bg-(--accent-overlay-8)"
                        : "pointer-events-none opacity-50"
                        }`}
                    >
                      <FiMail className="h-5 w-5 shrink-0 text-accent-contrast" aria-hidden />
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
              )}

            </div>

            {isPending ? (
              <footer className="space-y-2.5 border-t border-(--border-hairline) px-5 py-4">
                <p className="text-[13px] text-neutral-500">
                  Coordiná la visita con el mensaje de arriba. Cuando esté coordinada, agendala.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onStatusChange(row, "rechazada")}
                    className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    Rechazar
                  </button>
                  <button
                    type="button"
                    onClick={() => onStatusChange(row, "agendada")}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Agendar visita
                  </button>
                </div>
              </footer>
            ) : isScheduled ? (
              <footer className="space-y-2.5 border-t border-(--border-hairline) px-5 py-4">
                <p className="text-[13px] font-semibold text-neutral-500">¿Cómo resultó la visita?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onStatusChange(row, "rechazada")}
                    className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    No fue bien
                  </button>
                  <button
                    type="button"
                    onClick={() => onStatusChange(row, "aprobada")}
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Adoptada
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onStatusChange(row, "pendiente")}
                  className="w-full text-center text-xs font-medium text-neutral-400 underline underline-offset-2 transition hover:text-neutral-600"
                >
                  Volver a pendiente
                </button>
              </footer>
            ) : isResolved ? (
              <footer className="space-y-3 border-t border-(--border-hairline) px-5 py-4">
                {row.statusChangeCount > 0 ? (
                  <p className="text-xs text-neutral-400">
                    Esta decisión se cambió {row.statusChangeCount}{" "}
                    {row.statusChangeCount === 1 ? "vez" : "veces"}.
                  </p>
                ) : null}
                <div className="grid grid-cols-2 gap-3">
                  {status === "aprobada" ? (
                    <button
                      type="button"
                      onClick={() => onStatusChange(row, "rechazada")}
                      className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      Rechazar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onStatusChange(row, "aprobada")}
                      className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
                    >
                      Adoptada
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-xl border border-(--border-input) bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-(--surface-row)"
                  >
                    Cerrar
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onStatusChange(row, "pendiente")}
                  className="w-full text-center text-xs font-medium text-neutral-400 underline underline-offset-2 transition hover:text-neutral-600"
                >
                  Reabrir solicitud
                </button>
              </footer>
            ) : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
