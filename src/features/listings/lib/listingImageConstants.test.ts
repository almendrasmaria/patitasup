import { afterAll, beforeEach, describe, expect, it } from "vitest";

import {
  getListingImagePathFromUrl,
  isListingImagePublicUrl,
} from "./listingImageConstants";
import { saveListingSchema } from "./listingValidation";

const originalSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const validImageUrl =
  "https://project.supabase.co/storage/v1/object/public/publication-images/user-1/photo.webp";

function validListingInput(imageUrl: string) {
  return {
    petName: "Mora",
    ageValue: 2,
    ageUnit: "years",
    sex: "female",
    species: "dog",
    location: "Palermo",
    description: "Una perrita tranquila que busca una familia amorosa en CABA.",
    rescueInstagram: "@patitasup",
    imageUrl,
    status: "active",
  };
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
});

afterAll(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = originalSupabaseUrl;
});

describe("listing image public URLs", () => {
  it("accepts images from the configured Supabase bucket", () => {
    expect(isListingImagePublicUrl(validImageUrl)).toBe(true);
    expect(getListingImagePathFromUrl(validImageUrl)).toBe("user-1/photo.webp");
  });

  it("rejects external hosts even when the path mimics the bucket", () => {
    const externalUrl =
      "https://evil.example/storage/v1/object/public/publication-images/user-1/photo.webp";

    expect(isListingImagePublicUrl(externalUrl)).toBe(false);
  });

  it("rejects traversal-like storage paths", () => {
    const traversalUrl =
      "https://project.supabase.co/storage/v1/object/public/publication-images/user-1/%2e%2e/photo.webp";

    expect(isListingImagePublicUrl(traversalUrl)).toBe(false);
  });

  it("requires listing payload images to come from storage", () => {
    expect(saveListingSchema.safeParse(validListingInput(validImageUrl)).success).toBe(true);
    expect(
      saveListingSchema.safeParse(validListingInput("https://evil.example/pet.webp")).success,
    ).toBe(false);
  });
});