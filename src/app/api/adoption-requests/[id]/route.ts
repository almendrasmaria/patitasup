import { NextResponse } from "next/server";

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { updateAdoptionRequestStatusSchema } from "@/features/requests/lib/adoptionRequestValidation";
import {
  PublicationUnavailableError,
  updateAdoptionRequestStatusForProfile,
} from "@/features/requests/lib/requestsRepository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Context) {
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

  const parsed = updateAdoptionRequestStatusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Revisá los campos marcados.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    const { id } = await params;
    const adoptionRequest = await updateAdoptionRequestStatusForProfile(
      profile.id,
      id,
      parsed.data.status,
      parsed.data.visitScheduledAt,
    );

    if (!adoptionRequest) {
      return NextResponse.json({ message: "No encontramos la solicitud." }, { status: 404 });
    }

    return NextResponse.json({ adoptionRequest });
  } catch (error) {
    if (error instanceof PublicationUnavailableError) {
      return NextResponse.json(
        { message: "Esta mascota ya fue adoptada o no está disponible." },
        { status: 409 },
      );
    }

    console.error("Failed to update adoption request status", error);

    return NextResponse.json(
      { message: "No pudimos actualizar la solicitud. Intentá nuevamente." },
      { status: 500 },
    );
  }
}
