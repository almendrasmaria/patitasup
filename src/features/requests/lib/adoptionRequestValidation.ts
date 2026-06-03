import { z } from "zod";

import type { AdoptionRequestStatus } from "../types";

const optionalText = z.preprocess((value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().trim().max(600).optional());

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Ingresá un teléfono.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  }, "Ingresá un teléfono válido (entre 8 y 15 dígitos).");

export const createAdoptionRequestSchema = z.object({
  publicationSlug: z.string().trim().min(1),
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.string().trim().email("Ingresá un correo válido.").max(160),
  phone: phoneSchema,
  domicilio: z.string().trim().min(2).max(160),
  barrio: z.string().trim().min(2).max(120),
  preferredContact: z.enum(["whatsapp", "email"]),
  housingType: z.enum(["departamento", "casa", "ph"]),
  protection: z.enum(["si", "puedo"]),
  otherPets: optionalText,
  reason: z.string().trim().min(1).max(1200),
  aloneHoursPerDay: z.enum(["poco", "menos-4", "4-8", "mas-8"]),
});

export type CreateAdoptionRequestInput = z.infer<typeof createAdoptionRequestSchema>;

export type AdoptionRequestFieldErrors = Partial<
  Record<keyof CreateAdoptionRequestInput, string[]>
>;

export function parseCreateAdoptionRequest(value: unknown) {
  const parsed = createAdoptionRequestSchema.safeParse(value);

  if (!parsed.success) {
    return {
      success: false as const,
      fieldErrors: parsed.error.flatten().fieldErrors as AdoptionRequestFieldErrors,
    };
  }

  return {
    success: true as const,
    data: parsed.data,
  };
}

export const updateAdoptionRequestStatusSchema = z.object({
  status: z.enum(["pendiente", "agendada", "aprobada", "rechazada"] satisfies [
    AdoptionRequestStatus,
    ...AdoptionRequestStatus[],
  ]),
});

export type UpdateAdoptionRequestStatusInput = z.infer<
  typeof updateAdoptionRequestStatusSchema
>;
