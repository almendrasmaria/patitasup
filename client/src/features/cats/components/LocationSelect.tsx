import * as Select from "@radix-ui/react-select";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiCheck, FiMapPin } from "react-icons/fi";
import { getLocalidadesCaba, type GeorefLocalidad } from "../hooks/georefClient";

export type LocationFilter = "any" | string;

type Item = { value: string; label: string };

type Props = {
  value: LocationFilter;
  onChange: (v: LocationFilter) => void;
};

export default function LocationSelect({ value, onChange }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const caba: GeorefLocalidad[] = await getLocalidadesCaba();
        if (!alive) return;

        setItems(
          caba.map((l) => ({
            value: l.nombre, 
            label: l.nombre,
          }))
        );
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Error desconocido");
        setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, []);

  const triggerLabel = useMemo(() => {
    if (loading) return "Cargando ubicación…";
    if (value === "any") return "Cualquier ubicación";
    return items.find((i) => i.value === value)?.label ?? "Cualquier ubicación";
  }, [loading, value, items]);

  return (
    <Select.Root value={value} onValueChange={(v) => onChange(v as LocationFilter)}>
      <Select.Trigger
        className="flex h-12 w-full items-center justify-between rounded-xl bg-[#F6F7F9] px-4 text-sm text-slate-600 ring-1 ring-black/5 outline-none focus:ring-[#5170ff]/30 data-[state=open]:ring-[#5170ff]/30"
      >
        <span className="inline-flex items-center gap-2">
          <FiMapPin className="text-slate-400" />
          <span>{triggerLabel}</span>
        </span>

        <Select.Icon className="text-slate-400">
          <FiChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          className="z-[9999] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10"
        >
          <Select.Viewport className="max-h-[360px] overflow-y-auto p-2">
            <Select.Item
              value="any"
              className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm text-slate-700 outline-none data-[highlighted]:bg-[#F6F7F9] data-[state=checked]:bg-[#EEF2FF]"
            >
              <Select.ItemText>Cualquier ubicación</Select.ItemText>
              <Select.ItemIndicator className="absolute right-3 inline-flex items-center text-slate-600">
                <FiCheck />
              </Select.ItemIndicator>
            </Select.Item>

            {loading && (
              <div className="px-3 py-2 text-sm text-slate-500">Cargando…</div>
            )}

            {!loading && error && (
              <div className="px-3 py-2 text-sm text-red-500">
                No pude cargar ubicaciones: {error}
              </div>
            )}

            {!loading &&
              !error &&
              items.map((it) => (
                <Select.Item
                  key={it.value}
                  value={it.value}
                  className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm text-slate-700 outline-none data-[highlighted]:bg-[#F6F7F9] data-[state=checked]:bg-[#EEF2FF]"
                >
                  <Select.ItemText>{it.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-3 inline-flex items-center text-slate-600">
                    <FiCheck />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}