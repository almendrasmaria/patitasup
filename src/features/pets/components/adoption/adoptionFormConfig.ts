import type { AdoptionFormData, AdoptionFormStep } from "./adoptionFormTypes";

export type AdoptionFieldKey = keyof AdoptionFormData;

export type AdoptionFieldConfig = {
  key: AdoptionFieldKey;
  step: AdoptionFormStep;
  required: boolean;
};

export const ADOPTION_FORM_FIELDS: AdoptionFieldConfig[] = [
  { key: "firstName", step: 1, required: true },
  { key: "lastName", step: 1, required: true },
  { key: "email", step: 1, required: true },
  { key: "phone", step: 1, required: true },
  { key: "domicilio", step: 1, required: true },
  { key: "barrio", step: 1, required: true },
  { key: "preferredContact", step: 1, required: true },
  { key: "housingType", step: 2, required: true },
  { key: "protection", step: 2, required: true },
  { key: "otherPets", step: 2, required: false },
  { key: "reason", step: 3, required: true },
  { key: "aloneHoursPerDay", step: 3, required: true },
];

export const PREFERRED_CONTACT_OPTIONS = [
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Correo electrónico", value: "email" },
  { label: "Llamada telefónica", value: "telefono" },
] as const;

export const ALONE_HOURS_OPTIONS = [
  { label: "Casi no / siempre hay alguien en casa", value: "poco" },
  { label: "Menos de 4 horas", value: "menos-4" },
  { label: "Entre 4 y 8 horas", value: "4-8" },
  { label: "Más de 8 horas", value: "mas-8" },
] as const;

export function getAdoptionFieldsForStep(step: AdoptionFormStep) {
  return ADOPTION_FORM_FIELDS.filter((field) => field.step === step);
}

export function isAdoptionStepComplete(step: AdoptionFormStep, form: AdoptionFormData) {
  return getAdoptionFieldsForStep(step)
    .filter((field) => field.required)
    .every((field) => String(form[field.key]).trim() !== "");
}

export function isAdoptionFormComplete(form: AdoptionFormData) {
  return ([1, 2, 3] as AdoptionFormStep[]).every((step) => isAdoptionStepComplete(step, form));
}
