/**
 * Interpreta `ageLabel` en el mismo formato que `formatAge` del listado
 * (`"${n} día|días|mes|meses|año|años}"`). Si no coincide, devuelve `undefined`.
 */
function approxDaysFromAgeLabel(ageLabel: string): number | undefined {
  const s = ageLabel.trim().toLowerCase();
  const m = /^(\d+)\s+(día|días|mes|meses|año|años)$/.exec(s);
  if (!m) return undefined;

  const value = Number(m[1]);
  if (!Number.isFinite(value) || value < 1) return undefined;

  const unit = m[2];
  if (unit === "día" || unit === "días") return Math.round(value);
  if (unit === "mes" || unit === "meses") return Math.round(value * (365 / 12));
  if (unit === "año" || unit === "años") return Math.round(value * 365);
  return undefined;
}

/** Cachorro: hasta ~6 meses (inclusive). */
const AGE_KITTEN_MAX_DAYS = 183;

/** Joven: hasta ~2 años (inclusive). */
const AGE_YOUNG_MAX_DAYS = 730;

/** Adulto: hasta 7 años (inclusive), en días aproximados. */
const AGE_ADULT_MAX_DAYS = Math.round(7 * 365);

export type AgeFilter = "any" | "kitten" | "young" | "adult" | "senior";

export function petMatchesAgeFilter(ageLabel: string, filter: AgeFilter): boolean {
  if (filter === "any") return true;

  const approxDays = approxDaysFromAgeLabel(ageLabel);
  if (approxDays == null || !Number.isFinite(approxDays)) return false;

  if (filter === "kitten") {
    return approxDays <= AGE_KITTEN_MAX_DAYS;
  }
  if (filter === "young") {
    return approxDays > AGE_KITTEN_MAX_DAYS && approxDays <= AGE_YOUNG_MAX_DAYS;
  }
  if (filter === "adult") {
    return approxDays > AGE_YOUNG_MAX_DAYS && approxDays <= AGE_ADULT_MAX_DAYS;
  }
  return approxDays > AGE_ADULT_MAX_DAYS;
}
