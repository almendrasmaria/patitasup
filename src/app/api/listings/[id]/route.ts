import { NextResponse } from "next/server";

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { saveListingSchema } from "@/features/listings/lib/listingValidation";
import {
  deleteListingForProfile,
  findListingForProfile,
  updateListingForProfile,
} from "@/features/listings/lib/listingsRepository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

async function getAuthorizedProfile() {
  const profile = await getCurrentListingProfile();

  if (!profile) {
    return null;
  }

  return profile;
}

export async function GET(_request: Request, { params }: Context) {
  const profile = await getAuthorizedProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  const { id } = await params;
  const listing = await findListingForProfile(profile.id, id);

  if (!listing) {
    return NextResponse.json({ message: "No encontramos la publicación." }, { status: 404 });
  }

  return NextResponse.json({ listing });
}

export async function PATCH(request: Request, { params }: Context) {
  const profile = await getAuthorizedProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "El cuerpo de la solicitud no es válido." }, { status: 400 });
  }

  const parsed = saveListingSchema.safeParse(body);

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
    const listing = await updateListingForProfile(profile.id, id, parsed.data);

    if (!listing) {
      return NextResponse.json({ message: "No encontramos la publicación." }, { status: 404 });
    }

    return NextResponse.json({ listing });
  } catch (error) {
    console.error("Failed to update listing", error);

    return NextResponse.json(
      { message: "No pudimos actualizar la publicación. Intentá nuevamente." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const profile = await getAuthorizedProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await deleteListingForProfile(profile.id, id);

    if (!deleted) {
      return NextResponse.json({ message: "No encontramos la publicación." }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete listing", error);

    return NextResponse.json(
      { message: "No pudimos eliminar la publicación. Intentá nuevamente." },
      { status: 500 },
    );
  }
}