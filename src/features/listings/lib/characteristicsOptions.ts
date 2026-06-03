export const CHARACTERISTIC_SUGGESTIONS = [
  "Sociable",
  "Cariñoso/a",
  "Juguetón/a",
  "Tranquilo/a",
  "Energético/a",
  "Inteligente",
  "Bueno/a con niños",
  "Bueno/a con perros",
  "Bueno/a con gatos",
  "Apto departamento",
  "Entrenado/a",
  "Castrado/a",
  "Vacunado/a",
  "Desparasitado/a",
  "Microchip",
] as const;

export const MAX_CHARACTERISTICS = 8;
export const MAX_CHARACTERISTIC_LENGTH = 30;

export type PetSex = "male" | "female";

// Stored value is always the canonical "/a" label; the displayed text is derived
// from the pet's sex. Entries are explicit (no fragile string parsing); labels
// not listed here are invariable (Sociable, Inteligente, Microchip) or custom.
const GENDERED_FORMS: Record<string, { male: string; female: string }> = {
  "Cariñoso/a": { male: "Cariñoso", female: "Cariñosa" },
  "Juguetón/a": { male: "Juguetón", female: "Juguetona" },
  "Tranquilo/a": { male: "Tranquilo", female: "Tranquila" },
  "Energético/a": { male: "Energético", female: "Energética" },
  "Bueno/a con niños": { male: "Bueno con niños", female: "Buena con niños" },
  "Bueno/a con perros": { male: "Bueno con perros", female: "Buena con perros" },
  "Bueno/a con gatos": { male: "Bueno con gatos", female: "Buena con gatos" },
  "Apto departamento": { male: "Apto departamento", female: "Apta departamento" },
  "Entrenado/a": { male: "Entrenado", female: "Entrenada" },
  "Castrado/a": { male: "Castrado", female: "Castrada" },
  "Vacunado/a": { male: "Vacunado", female: "Vacunada" },
  "Desparasitado/a": { male: "Desparasitado", female: "Desparasitada" },
};

/** Returns the characteristic label in the pet's gender (falls back to the stored label). */
export function genderizeCharacteristic(label: string, sex: PetSex = "male"): string {
  return GENDERED_FORMS[label]?.[sex] ?? label;
}

/** Trims, drops empties, dedupes (case-insensitive) and caps the list. */
export function normalizeCharacteristics(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;

    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(trimmed);

    if (result.length >= MAX_CHARACTERISTICS) break;
  }

  return result;
}
