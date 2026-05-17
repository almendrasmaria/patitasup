import { FiEdit2, FiTrash2 } from "react-icons/fi";

import type { Publication, PublicationStatus } from "../types";
import { tableCellClass, tableHeaderClass } from "../lib/listingStyles";
import ActionIconButton from "./ActionIconButton";
import StatusBadge from "./StatusBadge";

type ListingsTableProps = {
  rows: Publication[];
  pendingStatuses: Partial<Record<string, PublicationStatus>>;
  onStatusChange: (row: Publication, status: PublicationStatus) => void;
  onEdit: (row: Publication) => void;
  onDelete: (row: Publication) => void;
  busyRowId?: string | null;
  savingStatuses?: boolean;
};

const colgroup = (
  <colgroup>
    <col style={{ width: "16%" }} />
    <col style={{ width: "10%" }} />
    <col style={{ width: "10%" }} />
    <col style={{ width: "10%" }} />
    <col style={{ width: "22%" }} />
    <col style={{ width: "16%" }} />
    <col style={{ width: "6.25rem" }} />
  </colgroup>
);

export default function ListingsTable({
  rows,
  pendingStatuses,
  onStatusChange,
  onEdit,
  onDelete,
  busyRowId = null,
  savingStatuses = false,
}: ListingsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-208 table-fixed border-collapse">
        {colgroup}
        <thead>
          <tr className="border-b border-[var(--border-hairline)]">
            <th scope="col" className={`${tableHeaderClass} text-center`}>
              Mascota
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center whitespace-nowrap`}>
              Edad
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center whitespace-nowrap`}>
              Sexo
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center whitespace-nowrap`}>
              Tipo
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center`}>
              Estado
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center whitespace-nowrap`}>
              Fecha de publicación
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center`}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-14 text-center text-sm text-[var(--neutral-500)]">
                No hay publicaciones para este filtro.
              </td>
            </tr>
          ) : null}
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--surface-row)] transition hover:bg-[var(--surface-row-hover)] last:border-0">
              {(() => {
                const currentStatus = pendingStatuses[row.id] ?? row.status;
                const rowBusy = savingStatuses || busyRowId === row.id;

                return (
                  <>
              <td className={`${tableCellClass} max-w-0 text-center font-medium`}>
                <span className="block truncate" title={row.petName}>
                  {row.petName}
                </span>
              </td>
              <td className={`${tableCellClass} text-center text-[var(--neutral-600)]`}>{row.age}</td>
              <td className={`${tableCellClass} text-center text-[var(--neutral-600)]`}>{row.sex}</td>
              <td className={`${tableCellClass} text-center text-[var(--neutral-600)]`}>{row.species}</td>
              <td className={`${tableCellClass} text-center`}>
                <div className="flex justify-center">
                  <StatusBadge
                    status={currentStatus}
                    onChange={(status) => onStatusChange(row, status)}
                    disabled={rowBusy}
                    dirty={pendingStatuses[row.id] !== undefined}
                  />
                </div>
              </td>
              <td className={`${tableCellClass} text-center text-[var(--neutral-600)] whitespace-nowrap`}>
                {row.date}
              </td>
              <td className={`${tableCellClass} px-2 text-center`}>
                <div className="inline-flex items-center justify-center gap-1.5">
                  <ActionIconButton
                    label={`Editar publicación de ${row.petName}`}
                    onClick={() => onEdit(row)}
                    disabled={rowBusy}
                    className="hover:border-[var(--accent-border-20)] hover:bg-[var(--accent-overlay-8)] hover:text-[var(--accent-contrast)]"
                  >
                    <FiEdit2 className="h-4.5 w-4.5" />
                  </ActionIconButton>
                  <ActionIconButton
                    label={`Eliminar publicación de ${row.petName}`}
                    onClick={() => onDelete(row)}
                    disabled={rowBusy}
                    className="hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <FiTrash2 className="h-4.5 w-4.5" />
                  </ActionIconButton>
                </div>
              </td>
                  </>
                );
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
