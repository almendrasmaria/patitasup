import "server-only";

import type { AdoptionRequestRow } from "../types";

export async function listAdoptionRequestsForProfile(
  profileId: string | null,
): Promise<AdoptionRequestRow[]> {
  if (!profileId) {
    return [];
  }

  void profileId;
  return [];
}
