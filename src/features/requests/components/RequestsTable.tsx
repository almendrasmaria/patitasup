import { FiMail } from "react-icons/fi";
import { SiWhatsapp } from "react-icons/si";

import type { AdoptionRequestRow, AdoptionRequestStatus } from "../types";
import { primaryCtaClass, tableCellClass, tableHeaderClass } from "@/features/listings/lib/listingStyles";
import ActionIconButton from "@/features/listings/components/ActionIconButton";
import RequestStatusSelect from "./RequestStatusSelect";

type RequestsTableProps = {
  rows: AdoptionRequestRow[];
  dirtyStatusIds: Set<string>;
  onViewForm: (row: AdoptionRequestRow) => void;
  onStatusChange: (row: AdoptionRequestRow, status: AdoptionRequestStatus) => void;
  busy?: boolean;
};

function whatsappDigits(phone?: string) {
  if (!phone?.trim()) return "";
  return phone.replace(/\D/g, "");
}

const tdBase = `${tableCellClass} align-middle text-center`;

const colgroup = (
  <colgroup>
    <col style={{ width: "17%" }} />
    <col style={{ width: "19%" }} />
    <col style={{ width: "17%" }} />
    <col style={{ width: "12%" }} />
    <col style={{ width: "19%" }} />
    <col style={{ width: "16%" }} />
  </colgroup>
);

export default function RequestsTable({
  rows,
  dirtyStatusIds,
  onViewForm,
  onStatusChange,
  busy = false,
}: RequestsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[64rem] table-fixed border-collapse md:min-w-[72rem]">
        {colgroup}
        <thead>
          <tr className="border-b border-[#ececf2]">
            <th scope="col" className={`${tableHeaderClass} align-middle`}>
              Mascota
            </th>
            <th scope="col" className={`${tableHeaderClass} align-middle`}>
              Adoptante
            </th>
            <th scope="col" className={`${tableHeaderClass} align-middle`}>
              Estado
            </th>
            <th scope="col" className={`${tableHeaderClass} align-middle whitespace-nowrap`}>
              Fecha
            </th>
            <th scope="col" className={`${tableHeaderClass} align-middle`}>
              Formulario
            </th>
            <th scope="col" className={`${tableHeaderClass} align-middle`}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-14 text-center text-sm text-[#6b7280]">
                No hay solicitudes para este filtro.
              </td>
            </tr>
          ) : null}
          {rows.map((row) => {
            const wa = whatsappDigits(row.adoptantePhone);
            const canWhatsapp = wa.length > 0;
            const canEmail = Boolean(row.adoptanteEmail?.trim());
            const subject = encodeURIComponent(`Solicitud de adopción — ${row.petName}`);
            const mailHref = canEmail
              ? `mailto:${row.adoptanteEmail?.trim()}?subject=${subject}`
              : undefined;
            const waHref = canWhatsapp ? `https://wa.me/${wa}` : undefined;
            const rowBusy = busy;

            return (
              <tr
                key={row.id}
                className="border-b border-[#f3f4f6] transition hover:bg-[#fbfbfe] last:border-0"
              >
                <td className={`${tdBase} max-w-0 font-medium`}>
                  <span className="block truncate" title={row.petName}>
                    {row.petName}
                  </span>
                </td>
                <td className={`${tdBase} max-w-0 text-[#4b5563]`}>
                  <span className="block truncate" title={row.adoptanteName}>
                    {row.adoptanteName}
                  </span>
                </td>
                <td className={tdBase}>
                  <div className="flex justify-center py-0.5">
                    <RequestStatusSelect
                      status={row.status}
                      onChange={(status) => onStatusChange(row, status)}
                      disabled={rowBusy}
                      dirty={dirtyStatusIds.has(row.id)}
                    />
                  </div>
                </td>
                <td className={`${tdBase} text-[#4b5563] whitespace-nowrap`}>{row.dateLabel}</td>
                <td className={`${tdBase} px-2`}>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => onViewForm(row)}
                      disabled={rowBusy}
                      className={
                        rowBusy
                          ? "inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#d9dbe8] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                          : `${primaryCtaClass} !py-2 !text-[13px]`
                      }
                    >
                      Ver Formulario
                    </button>
                  </div>
                </td>
                <td className={`${tdBase} px-2`}>
                  <div className="inline-flex items-center justify-center gap-1.5">
                    <ActionIconButton
                      label={
                        canWhatsapp
                          ? `Abrir WhatsApp con ${row.adoptanteName}`
                          : "Sin número de WhatsApp"
                      }
                      onClick={() => {
                        if (waHref) window.open(waHref, "_blank", "noopener,noreferrer");
                      }}
                      disabled={!canWhatsapp || rowBusy}
                      className={
                        canWhatsapp
                          ? "text-[#25D366] hover:border-[#25D366]/25 hover:bg-[#25D366]/8 hover:text-[#128C7E]"
                          : ""
                      }
                    >
                      <SiWhatsapp className="h-5 w-5" aria-hidden />
                    </ActionIconButton>
                    <ActionIconButton
                      label={canEmail ? `Enviar email a ${row.adoptanteName}` : "Sin email"}
                      onClick={() => {
                        if (mailHref) window.location.href = mailHref;
                      }}
                      disabled={!canEmail || rowBusy}
                      className="hover:border-[#7061F0]/20 hover:bg-[#7061F0]/8 hover:text-[#5b4eb8]"
                    >
                      <FiMail className="h-5 w-5" aria-hidden />
                    </ActionIconButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
