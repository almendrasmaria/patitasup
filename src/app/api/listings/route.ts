import { NextResponse } from "next/server";

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { createListingSchema } from "@/features/listings/lib/listingValidation";
import {
  createListingForProfile,
  listListingsForProfile,
} from "@/features/listings/lib/listingsRepository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getCurrentListingProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  const listings = await listListingsForProfile(profile.id);

  return NextResponse.json({ listings });
}

export async function POST(request: Request) {
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

  const parsed = createListingSchema.safeParse(body);

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
    const listing = await createListingForProfile(profile.id, parsed.data);

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error("Failed to create listing", error);

    return NextResponse.json(
      { message: "No pudimos guardar la publicación. Intentá nuevamente." },
      { status: 500 },
    );
  }
}