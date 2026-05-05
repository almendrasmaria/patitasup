import { FiEdit2, FiTrash2 } from "react-icons/fi";

import type { Publication } from "../types";
import { tableCellClass, tableHeaderClass } from "../lib/publicationStyles";
import ActionIconButton from "./ActionIconButton";
import StatusBadge from "./StatusBadge";

type PublicationsTableProps = {
  rows: Publication[];
  onEdit: (row: Publication) => void;
  onDelete: (row: Publication) => void;
};

const colgroup = (
  <colgroup>
    <col style={{ width: "18%" }} />
    <col style={{ width: "11%" }} />
    <col style={{ width: "11%" }} />
    <col style={{ width: "24%" }} />
    <col style={{ width: "18%" }} />
    <col style={{ width: "6.25rem" }} />
  </colgroup>
);

export default function PublicationsTable({ rows, onEdit, onDelete }: PublicationsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[52rem] table-fixed border-collapse">
        {colgroup}
        <thead>
          <tr className="border-b border-[#ececf2]">
            <th scope="col" className={`${tableHeaderClass} text-center`}>
              Mascota
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center whitespace-nowrap`}>
              Edad
            </th>
            <th scope="col" className={`${tableHeaderClass} text-center whitespace-nowrap`}>
              Sexo
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
              <td colSpan={6} className="px-4 py-14 text-center text-sm text-[#6b7280]">
                No hay publicaciones para este filtro.
              </td>
            </tr>
          ) : null}
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[#f3f4f6] last:border-0">
              <td className={`${tableCellClass} max-w-0 text-center font-medium`}>
                <span className="block truncate" title={row.petName}>
                  {row.petName}
                </span>
              </td>
              <td className={`${tableCellClass} text-center text-[#4b5563]`}>{row.age}</td>
              <td className={`${tableCellClass} text-center text-[#4b5563]`}>{row.sex}</td>
              <td className={`${tableCellClass} text-center`}>
                <div className="flex justify-center">
                  <StatusBadge status={row.status} />
                </div>
              </td>
              <td className={`${tableCellClass} text-center text-[#4b5563] whitespace-nowrap`}>
                {row.date}
              </td>
              <td className={`${tableCellClass} px-2 text-center`}>
                <div className="inline-flex items-center justify-center gap-0.5">
                  <ActionIconButton label={`Editar publicación de ${row.petName}`} onClick={() => onEdit(row)}>
                    <FiEdit2 className="h-[18px] w-[18px]" />
                  </ActionIconButton>
                  <ActionIconButton label={`Eliminar publicación de ${row.petName}`} onClick={() => onDelete(row)}>
                    <FiTrash2 className="h-[18px] w-[18px]" />
                  </ActionIconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
