import type { AgeFilter } from "../components/AgeSelect";
import { ageLabelToMonths } from "./ageUtils";

export const matchesAgeFilter = (
  ageLabel: string,
  filter: AgeFilter
): boolean => {
  if (filter === "any") return true;

  const months = ageLabelToMonths(ageLabel);

  if (filter === "kitten") return months < 6;
  if (filter === "young") return months >= 6 && months < 24;
  if (filter === "adult") return months >= 24 && months < 84;

  return months >= 84; // senior
};