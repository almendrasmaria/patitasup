import { z } from "zod";

import { getAdoptionFieldsForStep, type AdoptionFieldKey } from "./adoptionFormConfig";
import type { AdoptionFormData, AdoptionFormStep } from "./adoptionFormTypes";

const emailSchema = z.string().trim().email("Ingresá un correo válido.");

export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+\s()-]/g, "");
}

function getEmailError(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = emailSchema.safeParse(trimmed);
  return parsed.success ? undefined : parsed.error.issues[0]?.message;
}

function getPhoneError(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8) return "Ingresá un teléfono válido (mínimo 8 dígitos).";
  if (digits.length > 15) return "El teléfono es demasiado largo.";
  return undefined;
}

function getFormatError(
  key: AdoptionFieldKey,
  value: AdoptionFormData[AdoptionFieldKey],
): string | undefined {
  if (key === "email") return getEmailError(String(value));
  if (key === "phone") return getPhoneError(String(value));
  return undefined;
}

export function getAdoptionStepErrors(
  step: AdoptionFormStep,
  form: AdoptionFormData,
): Partial<Record<AdoptionFieldKey, string>> {
  const errors: Partial<Record<AdoptionFieldKey, string>> = {};

  for (const field of getAdoptionFieldsForStep(step)) {
    const formatError = getFormatError(field.key, form[field.key]);
    if (formatError) errors[field.key] = formatError;
  }

  return errors;
}

export function getEmptyRequiredFields(
  step: AdoptionFormStep,
  form: AdoptionFormData,
): Partial<Record<AdoptionFieldKey, true>> {
  const empty: Partial<Record<AdoptionFieldKey, true>> = {};

  for (const field of getAdoptionFieldsForStep(step)) {
    if (field.required && !String(form[field.key]).trim()) {
      empty[field.key] = true;
    }
  }

  return empty;
}

export function isAdoptionStepComplete(step: AdoptionFormStep, form: AdoptionFormData) {
  return getAdoptionFieldsForStep(step).every((field) => {
    const trimmed = String(form[field.key]).trim();
    if (field.required && !trimmed) return false;
    if (getFormatError(field.key, form[field.key])) return false;
    return true;
  });
}

export function isAdoptionFormComplete(form: AdoptionFormData) {
  return ([1, 2, 3] as AdoptionFormStep[]).every((step) => isAdoptionStepComplete(step, form));
}
