"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { prisma } from "@/lib/prisma";

const updateProfileSchema = z.object({
  location: z.string().trim().max(120, "La ubicación es demasiado larga.").optional(),
  description: z.string().trim().max(2000, "La descripción es demasiado larga.").optional(),
  phone: z.string().trim().max(40, "El teléfono es demasiado largo.").optional(),
  instagram: z.string().trim().max(200, "El enlace es demasiado largo.").optional(),
  facebook: z.string().trim().max(200, "El enlace es demasiado largo.").optional(),
});

export type UpdateProfileInput = z.input<typeof updateProfileSchema>;

export type UpdateProfileResult = { ok: true } | { ok: false; error: string };

function toNullable(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function updateProfileInfo(input: UpdateProfileInput): Promise<UpdateProfileResult> {
  const profile = await getCurrentListingProfile();

  if (!profile) {
    return { ok: false, error: "No encontramos tu perfil. Iniciá sesión nuevamente." };
  }

  const parsed = updateProfileSchema.safeParse(input);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Revisá los datos ingresados.";
    return { ok: false, error: firstError };
  }

  const data: Record<string, string | null> = {};
  for (const key of Object.keys(parsed.data) as (keyof typeof parsed.data)[]) {
    if (input[key] !== undefined) {
      data[key] = toNullable(parsed.data[key]);
    }
  }

  if (Object.keys(data).length === 0) {
    return { ok: true };
  }

  try {
    await prisma.profile.update({ where: { id: profile.id }, data });
  } catch (error) {
    console.error("updateProfileInfo failed", error);
    return { ok: false, error: "No pudimos guardar los cambios. Intentá nuevamente." };
  }

  revalidatePath("/profile");
  return { ok: true };
}
