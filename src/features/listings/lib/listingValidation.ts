import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== "string") return value;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const createListingSchema = z
  .object({
    petName: z.string().trim().min(2).max(80),
    ageValue: z.coerce.number().int().min(1).max(3650),
    ageUnit: z.enum(["days", "months", "years"]),
    sex: z.enum(["male", "female"]),
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
    imageUrl: z.preprocess(
      emptyToUndefined,
      z.string().trim().url("Ingresá una URL válida.").max(500).optional(),
    ),
    status: z.enum(["active", "draft"]).default("active"),
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

export type CreateListingInput = z.infer<typeof createListingSchema>;