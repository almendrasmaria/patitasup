export const LISTING_IMAGE_BUCKET = "publication-images";

/** Upper bound for the original upload before compression (server rejects bigger). */
export const LISTING_IMAGE_MAX_BYTES = 10 * 1024 * 1024; // 10 MB

/** Compression target after sharp processing. */
export const LISTING_IMAGE_TARGET_BYTES = 55 * 1024; // ~55 KB
export const LISTING_IMAGE_MAX_DIMENSION = 1080;

export const LISTING_IMAGE_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type ListingImageValidationError = "type" | "size";

export function validateListingImageFile(file: File): ListingImageValidationError | null {
  if (!LISTING_IMAGE_ALLOWED_TYPES.includes(file.type as (typeof LISTING_IMAGE_ALLOWED_TYPES)[number])) {
    return "type";
  }

  if (file.size > LISTING_IMAGE_MAX_BYTES) {
    return "size";
  }

  return null;
}

const publicUrlMarker = `/storage/v1/object/public/${LISTING_IMAGE_BUCKET}/`;

/** Returns the storage path when the URL points to our bucket, otherwise null. */
export function getListingImagePathFromUrl(url: string): string | null {
  const markerIndex = url.indexOf(publicUrlMarker);

  if (markerIndex === -1) {
    return null;
  }

  const path = url.slice(markerIndex + publicUrlMarker.length);
  return path ? decodeURIComponent(path) : null;
}
