import "server-only";

import { generateUniqueProfileSlug } from "@/features/profile/lib/profileSlug";
import { prisma } from "@/lib/prisma";

type SyncAuthProfileInput = {
  userId: string;
  email: string;
  displayName: string;
};

export async function syncAuthProfile({ userId, email, displayName }: SyncAuthProfileInput) {
  const normalizedEmail = email.trim().toLowerCase();

  return prisma.$transaction(async (tx) => {
    const matchingProfiles = await tx.profile.findMany({
      where: {
        OR: [{ supabaseUserId: userId }, { email: normalizedEmail }],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (matchingProfiles.length === 0) {
      return tx.profile.create({
        data: {
          supabaseUserId: userId,
          email: normalizedEmail,
          displayName,
          slug: await generateUniqueProfileSlug(tx.profile, displayName),
        },
      });
    }

    const profileByUserId = matchingProfiles.find((profile) => profile.supabaseUserId === userId);
    const profileByEmail = matchingProfiles.find((profile) => profile.email === normalizedEmail);
    const canonicalProfile = profileByUserId ?? profileByEmail ?? matchingProfiles[0];
    const duplicateProfiles = matchingProfiles.filter((profile) => profile.id !== canonicalProfile.id);

    if (duplicateProfiles.length > 0) {
      await Promise.all(
        duplicateProfiles.map((profile) =>
          tx.publication.updateMany({
            where: {
              authorProfileId: profile.id,
            },
            data: {
              authorProfileId: canonicalProfile.id,
            },
          }),
        ),
      );

      await tx.profile.deleteMany({
        where: {
          id: {
            in: duplicateProfiles.map((profile) => profile.id),
          },
        },
      });
    }

    const slug =
      canonicalProfile.slug ??
      (await generateUniqueProfileSlug(tx.profile, displayName, canonicalProfile.id));

    return tx.profile.update({
      where: {
        id: canonicalProfile.id,
      },
      data: {
        supabaseUserId: userId,
        email: normalizedEmail,
        displayName,
        slug,
      },
    });
  });
}