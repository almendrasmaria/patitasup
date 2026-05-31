import { NextResponse } from "next/server";

import { parseCreateAdoptionRequest } from "@/features/requests/lib/adoptionRequestValidation";
import { createAdoptionRequest } from "@/features/requests/lib/requestsRepository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "El cuerpo de la solicitud no es válido." }, { status: 400 });
  }

  const parsed = parseCreateAdoptionRequest(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Revisá los campos marcados.",
        fieldErrors: parsed.fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    const adoptionRequest = await createAdoptionRequest(parsed.data);

    if (!adoptionRequest) {
      return NextResponse.json(
        { message: "No encontramos la publicación o ya no está disponible." },
        { status: 404 },
      );
    }

    return NextResponse.json({ adoptionRequest }, { status: 201 });
  } catch (error) {
    console.error("Failed to create adoption request", error);

    return NextResponse.json(
      { message: "No pudimos enviar la solicitud. Intentá nuevamente." },
      { status: 500 },
    );
  }
}
