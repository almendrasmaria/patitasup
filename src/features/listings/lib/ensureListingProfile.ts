import "server-only";

import type { Profile } from "@prisma/client";

import { getDisplayName } from "@/features/auth/lib/displayName";
import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";
import { syncAuthProfile } from "@/features/auth/lib/syncAuthProfile";

export async function getCurrentListingProfile(): Promise<Profile | null> {
  const session = await getSessionProfile();

  if (!session) {
    return null;
  }

  if (session.profile) {
    return session.profile;
  }

  const email = session.user.email?.trim().toLowerCase();

  if (!email) {
    return null;
  }

  return syncAuthProfile({
    userId: session.user.id,
    email,
    displayName: getDisplayName(session.user.user_metadata?.display_name, email),
  });
}