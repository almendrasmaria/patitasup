import { NextResponse } from "next/server";

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { saveListingStatusesSchema } from "@/features/listings/lib/listingValidation";
import { updateListingStatusesForProfile } from "@/features/listings/lib/listingsRepository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  const profile = await getCurrentListingProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "El cuerpo de la solicitud no es válido." }, { status: 400 });
  }

  const parsed = saveListingStatusesSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Revisá los cambios de estado antes de guardar.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    const updated = await updateListingStatusesForProfile(profile.id, parsed.data.updates);

    if (!updated) {
      return NextResponse.json(
        { message: "No encontramos una o más publicaciones para actualizar." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update listing statuses", error);

    return NextResponse.json(
      { message: "No pudimos actualizar los estados. Intentá nuevamente." },
      { status: 500 },
    );
  }
}