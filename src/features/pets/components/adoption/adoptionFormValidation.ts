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
  if (trimmed.length > 160) return "El correo es demasiado largo (máximo 160 caracteres).";
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

type TextLengthRule = { min?: number; max?: number; minMsg?: string; maxMsg?: string };

const TEXT_LENGTH_RULES: Partial<Record<AdoptionFieldKey, TextLengthRule>> = {
  firstName: { min: 2, max: 80, minMsg: "Debe tener al menos 2 caracteres.", maxMsg: "Máximo 80 caracteres." },
  lastName: { min: 2, max: 80, minMsg: "Debe tener al menos 2 caracteres.", maxMsg: "Máximo 80 caracteres." },
  domicilio: { min: 2, max: 160, minMsg: "Debe tener al menos 2 caracteres.", maxMsg: "Máximo 160 caracteres." },
  barrio: { min: 2, max: 120, minMsg: "Debe tener al menos 2 caracteres.", maxMsg: "Máximo 120 caracteres." },
  reason: { max: 1200, maxMsg: "Máximo 1200 caracteres." },
  otherPets: { max: 600, maxMsg: "Máximo 600 caracteres." },
};

function getTextLengthError(key: AdoptionFieldKey, value: string): string | undefined {
  const rule = TEXT_LENGTH_RULES[key];
  if (!rule) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (rule.min && trimmed.length < rule.min) return rule.minMsg;
  if (rule.max && trimmed.length > rule.max) return rule.maxMsg;
  return undefined;
}

function getFormatError(
  key: AdoptionFieldKey,
  value: AdoptionFormData[AdoptionFieldKey],
): string | undefined {
  if (key === "email") return getEmailError(String(value));
  if (key === "phone") return getPhoneError(String(value));
  return getTextLengthError(key, String(value));
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
