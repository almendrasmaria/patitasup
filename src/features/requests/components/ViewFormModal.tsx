"use client";

import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";

import type { AdoptionRequestRow } from "../types";
import { secondaryCtaClass } from "@/features/listings/lib/listingStyles";

type ViewFormModalProps = {
  row: AdoptionRequestRow | null;
  onClose: () => void;
};

export default function ViewFormModal({ row, onClose }: ViewFormModalProps) {
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

  return (
    <dialog
      ref={dialogRef}
      className="fixed left-1/2 top-1/2 z-[100] w-[min(100vw-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-0 shadow-xl ring-1 ring-black/10 backdrop:bg-black/50"
      onClose={onClose}
    >
      {row ? (
        <>
          <div className="border-b border-[#ececf2] px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Solicitud de adopción</h2>
                <p className="mt-1 text-sm text-[#6b7280]">
                  {row.petName} · {row.dateLabel}
                </p>
              </div>
              <button
                type="button"
                aria-label="Cerrar"
                className={`${secondaryCtaClass} !px-3 !py-2`}
                onClick={onClose}
              >
                <FiX className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5 text-[15px] text-[#374151]">
            <div>
              <p className="text-[13px] font-semibold text-[#6b7280]">Adoptante</p>
              <p className="mt-1 font-medium text-[#111827]">{row.adoptanteName}</p>
              {row.adoptanteEmail ? (
                <p className="mt-1 text-sm text-[#6b7280]">{row.adoptanteEmail}</p>
              ) : null}
              {row.adoptantePhone?.trim() ? (
                <p className="mt-1 text-sm text-[#6b7280]">{row.adoptantePhone.trim()}</p>
              ) : null}
            </div>

            <p className="rounded-2xl border border-[#ececf2] bg-[#f9fafb] px-4 py-3 text-sm leading-relaxed text-[#6b7280]">
              El formulario completo de pre-adopción se mostrará aquí cuando esté conectado al backend. Por ahora podés
              contactar al adoptante por los datos indicados.
            </p>
          </div>

          <div className="border-t border-[#ececf2] px-5 py-4">
            <button type="button" className={`${secondaryCtaClass} w-full justify-center`} onClick={onClose}>
              Cerrar
            </button>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
