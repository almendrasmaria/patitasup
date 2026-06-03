import type { IconType } from "react-icons";
import {
  FiAward,
  FiCheckCircle,
  FiCpu,
  FiHeart,
  FiHome,
  FiMoon,
  FiShield,
  FiSmile,
  FiStar,
  FiTag,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { FaCat, FaDog, FaPaw } from "react-icons/fa";

import { genderizeCharacteristic, type PetSex } from "./characteristicsOptions";

export type CharacteristicCategory = "personalidad" | "estilo" | "salud" | "otras";

export const CATEGORY_ORDER: CharacteristicCategory[] = [
  "personalidad",
  "estilo",
  "salud",
  "otras",
];

export const CATEGORY_LABELS: Record<CharacteristicCategory, string> = {
  personalidad: "Personalidad",
  estilo: "Estilo de vida",
  salud: "Salud",
  otras: "Otras",
};

const CATEGORY_CHIP_CLASS: Record<CharacteristicCategory, string> = {
  personalidad: "bg-amber-50 text-amber-700",
  estilo: "bg-sky-50 text-sky-700",
  salud: "bg-emerald-50 text-emerald-700",
  otras: "bg-slate-100 text-slate-600",
};

type CharacteristicMeta = { category: CharacteristicCategory; icon: IconType };

const META: Record<string, CharacteristicMeta> = {
  Sociable: { category: "personalidad", icon: FiSmile },
  "Cariñoso/a": { category: "personalidad", icon: FiHeart },
  "Juguetón/a": { category: "personalidad", icon: FaPaw },
  "Tranquilo/a": { category: "personalidad", icon: FiMoon },
  "Energético/a": { category: "personalidad", icon: FiZap },
  Inteligente: { category: "personalidad", icon: FiStar },
  "Bueno/a con niños": { category: "estilo", icon: FiUsers },
  "Bueno/a con perros": { category: "estilo", icon: FaDog },
  "Bueno/a con gatos": { category: "estilo", icon: FaCat },
  "Apto departamento": { category: "estilo", icon: FiHome },
  "Entrenado/a": { category: "estilo", icon: FiAward },
  "Castrado/a": { category: "salud", icon: FiCheckCircle },
  "Vacunado/a": { category: "salud", icon: FiShield },
  "Desparasitado/a": { category: "salud", icon: FiCheckCircle },
  Microchip: { category: "salud", icon: FiCpu },
};

const FALLBACK: CharacteristicMeta = { category: "otras", icon: FiTag };

export function getCharacteristicMeta(label: string): CharacteristicMeta {
  return META[label] ?? FALLBACK;
}

export type CharacteristicGroup = {
  category: CharacteristicCategory;
  label: string;
  items: string[];
};

/** Groups characteristics by category, in CATEGORY_ORDER, skipping empty groups. */
export function groupCharacteristics(values: string[]): CharacteristicGroup[] {
  const byCategory = new Map<CharacteristicCategory, string[]>();

  for (const value of values) {
    const { category } = getCharacteristicMeta(value);
    const list = byCategory.get(category);
    if (list) {
      list.push(value);
    } else {
      byCategory.set(category, [value]);
    }
  }

  return CATEGORY_ORDER.filter((category) => byCategory.has(category)).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: byCategory.get(category)!,
  }));
}

export function CharacteristicChip({ label, sex }: { label: string; sex?: PetSex }) {
  const { category, icon: Icon } = getCharacteristicMeta(label);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${CATEGORY_CHIP_CLASS[category]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {genderizeCharacteristic(label, sex)}
    </span>
  );
}
