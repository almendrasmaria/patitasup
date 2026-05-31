import "server-only";

import { randomUUID } from "node:crypto";
import sharp from "sharp";

import { createSupabaseServerClient } from "@/lib/supabase/server";

import {
  LISTING_IMAGE_BUCKET,
  LISTING_IMAGE_MAX_DIMENSION,
  LISTING_IMAGE_TARGET_BYTES,
  getListingImagePathFromUrl,
} from "../listingImageConstants";

const MIN_QUALITY = 45;
const MAX_QUALITY = 82;

/**
 * Compresses an image with sharp, aiming for `LISTING_IMAGE_TARGET_BYTES`.
 *
 * sharp's WebP encoder keeps far more perceptual detail at small sizes than the
 * browser canvas, so we can hit ~50 KB with WhatsApp-like quality. We binary
 * search for the highest quality that still fits the budget at full resolution.
 */
export async function compressListingImage(input: Buffer): Promise<Buffer> {
  // `.rotate()` with no args applies EXIF orientation so portraits stay upright.
  const base = sharp(input, { failOn: "none" })
    .rotate()
    .resize({
      width: LISTING_IMAGE_MAX_DIMENSION,
      height: LISTING_IMAGE_MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });

  const encode = (quality: number) =>
    base.clone().webp({ quality, effort: 6, smartSubsample: true }).toBuffer();

  const topQuality = await encode(MAX_QUALITY);

  if (topQuality.length <= LISTING_IMAGE_TARGET_BYTES) {
    return topQuality;
  }

  let low = MIN_QUALITY;
  let high = MAX_QUALITY;
  let fitting: Buffer | null = null;
  let smallest = topQuality;

  for (let i = 0; i < 6; i += 1) {
    const quality = Math.round((low + high) / 2);
    const buffer = await encode(quality);

    if (buffer.length < smallest.length) {
      smallest = buffer;
    }

    if (buffer.length <= LISTING_IMAGE_TARGET_BYTES) {
      fitting = buffer;
      low = quality + 1; // push quality higher
    } else {
      high = quality - 1;
    }
  }

  return fitting ?? smallest;
}

export type UploadedListingImage = {
  url: string;
  path: string;
};

/**
 * Compresses then uploads an image to the user's folder in the storage bucket.
 * Uses the cookie-authenticated server client so the RLS policy keyed on
 * `auth.uid()` keeps each user scoped to their own folder.
 */
export async function compressAndUploadListingImage(
  input: Buffer,
  supabaseUserId: string,
): Promise<UploadedListingImage> {
  const compressed = await compressListingImage(input);

  const supabase = await createSupabaseServerClient();
  const path = `${supabaseUserId}/${randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(LISTING_IMAGE_BUCKET)
    .upload(path, compressed, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/webp",
    });

  if (uploadError) {
    throw new Error("No pudimos subir la imagen. Intentá nuevamente.");
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(LISTING_IMAGE_BUCKET).getPublicUrl(path);

  return { url: publicUrl, path };
}

/**
 * Best-effort removal of a bucket image from the server. Ignores URLs that don't
 * point to our bucket (e.g. fallback assets or external links).
 */
export async function deleteListingImageByUrl(url: string | null | undefined): Promise<void> {
  if (!url) {
    return;
  }

  const path = getListingImagePathFromUrl(url);

  if (!path) {
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.storage.from(LISTING_IMAGE_BUCKET).remove([path]);
}
