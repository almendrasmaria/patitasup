import { z } from "zod";

import { findLocalidadCabaByName } from "@/features/geo/lib/georefClient";

import type { PublicationFormStatus } from "../types";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const publicationStatusSchema = z.enum(["active", "adopted", "draft"] satisfies [PublicationFormStatus, ...PublicationFormStatus[]]);

export const saveListingSchema = z
  .object({
    petName: z.string().trim().min(2).max(80),
    ageValue: z.coerce.number().int().min(1).max(3650),
    ageUnit: z.enum(["days", "months", "years"]),
    sex: z.enum(["male", "female"]),
    species: z.enum(["cat", "dog"]),
    location: z.string().trim().min(2).max(120),
    description: z.string().trim().min(30).max(1200),
    rescueInstagram: z.preprocess(
      emptyToUndefined,
      z
        .string()
        .trim()
        .max(50)
        .optional()
        .refine(
          (value) => !value || /^@?[A-Za-z0-9._]{2,30}$/.test(value),
          "Ingresá un Instagram válido.",
        ),
    ),
    imageUrl: z.string().trim().min(1, "La imagen es obligatoria.").url("Ingresá una URL válida.").max(500),
    status: publicationStatusSchema.default("active"),
  })
  .superRefine((value, ctx) => {
    const maxAgeByUnit = {
      days: 3650,
      months: 240,
      years: 30,
    } as const;

    if (value.ageValue > maxAgeByUnit[value.ageUnit]) {
      ctx.addIssue({
        code: "custom",
        path: ["ageValue"],
        message: "Revisá la edad ingresada.",
      });
    }
  });

export const createListingSchema = saveListingSchema;

export type CreateListingInput = z.infer<typeof saveListingSchema>;
export type UpdateListingInput = CreateListingInput;

export type ListingFieldErrors = Partial<Record<keyof CreateListingInput, string[]>>;

export async function parseListingInput(value: unknown) {
  const parsed = saveListingSchema.safeParse(value);

  if (!parsed.success) {
    return {
      success: false as const,
      fieldErrors: parsed.error.flatten().fieldErrors as ListingFieldErrors,
    };
  }

  const matchedLocation = await findLocalidadCabaByName(parsed.data.location);

  if (!matchedLocation) {
    return {
      success: false as const,
      fieldErrors: {
        location: ["Seleccioná una ubicación válida de CABA."],
      } satisfies ListingFieldErrors,
    };
  }

  return {
    success: true as const,
    data: {
      ...parsed.data,
      location: matchedLocation.nombre,
    },
  };
}

export const saveListingStatusesSchema = z.object({
  updates: z
    .array(
      z.object({
        id: z.string().trim().min(1),
        status: publicationStatusSchema,
      }),
    )
    .min(1),
});

export type SaveListingStatusesInput = z.infer<typeof saveListingStatusesSchema>;