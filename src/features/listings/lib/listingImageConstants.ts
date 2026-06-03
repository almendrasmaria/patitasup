export const LISTING_IMAGE_BUCKET = "publication-images";

/** Upper bound for the original upload before compression (server rejects bigger). */
export const LISTING_IMAGE_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const LISTING_IMAGE_UPLOAD_MAX_REQUEST_BYTES = LISTING_IMAGE_MAX_BYTES + 256 * 1024;

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

function getSupabaseStorageHostname() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!rawUrl) {
    return null;
  }

  try {
    return new URL(rawUrl).hostname;
  } catch {
    return null;
  }
}

function getSafeListingImagePath(url: string): string | null {
  const parsed = new URL(url);
  const supabaseHostname = getSupabaseStorageHostname();

  if (parsed.protocol !== "https:") {
    return null;
  }

  if (supabaseHostname && parsed.hostname !== supabaseHostname) {
    return null;
  }

  if (!parsed.pathname.startsWith(publicUrlMarker)) {
    return null;
  }

  const encodedPath = parsed.pathname.slice(publicUrlMarker.length);

  if (!encodedPath) {
    return null;
  }

  let path: string;

  try {
    path = decodeURIComponent(encodedPath);
  } catch {
    return null;
  }

  const segments = path.split("/");

  if (
    segments.length < 2 ||
    segments.some((segment) => !segment || segment === "." || segment === "..") ||
    path.includes("\\")
  ) {
    return null;
  }

  return path;
}

export function isListingImagePublicUrl(url: string): boolean {
  try {
    return getSafeListingImagePath(url) !== null;
  } catch {
    return false;
  }
}

/** Returns the storage path when the URL points to our bucket, otherwise null. */
export function getListingImagePathFromUrl(url: string): string | null {
  try {
    return getSafeListingImagePath(url);
  } catch {
    return null;
  }
}
