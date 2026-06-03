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
] as const;

export const HOUSING_TYPE_OPTIONS = [
  { label: "Departamento", value: "departamento" },
  { label: "Casa", value: "casa" },
  { label: "PH", value: "ph" },
] as const;

export const PROTECTION_OPTIONS = [
  { label: "Sí, ya las tengo", value: "si" },
  { label: "No, pero puedo colocarlas", value: "puedo" },
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
