import { NextResponse } from "next/server";

import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import {
  LISTING_IMAGE_ALLOWED_TYPES,
  LISTING_IMAGE_MAX_BYTES,
} from "@/features/listings/lib/listingImageConstants";
import { compressAndUploadListingImage } from "@/features/listings/lib/server/listingImageServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const profile = await getCurrentListingProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "La solicitud no es válida." }, { status: 400 });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No recibimos ninguna imagen." }, { status: 400 });
  }

  if (!LISTING_IMAGE_ALLOWED_TYPES.includes(file.type as (typeof LISTING_IMAGE_ALLOWED_TYPES)[number])) {
    return NextResponse.json(
      { message: "Formato no permitido. Usá JPG, PNG o WEBP." },
      { status: 415 },
    );
  }

  if (file.size > LISTING_IMAGE_MAX_BYTES) {
    return NextResponse.json(
      { message: "La imagen es demasiado grande." },
      { status: 413 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await compressAndUploadListingImage(buffer, profile.supabaseUserId);

    return NextResponse.json(uploaded, { status: 201 });
  } catch (error) {
    console.error("Failed to process listing image", error);

    return NextResponse.json(
      { message: "No pudimos procesar la imagen. Intentá nuevamente." },
      { status: 500 },
    );
  }
}
