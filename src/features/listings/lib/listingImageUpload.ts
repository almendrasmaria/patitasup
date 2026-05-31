import { createClient } from "@/lib/supabase/client";

import {
  LISTING_IMAGE_BUCKET,
  getListingImagePathFromUrl,
} from "./listingImageConstants";

export * from "./listingImageConstants";

/** Best-effort deletion of a previously uploaded bucket image. */
export async function deleteListingImageByUrl(url: string): Promise<void> {
  const path = getListingImagePathFromUrl(url);

  if (!path) {
    return;
  }

  const supabase = createClient();
  await supabase.storage.from(LISTING_IMAGE_BUCKET).remove([path]);
}
