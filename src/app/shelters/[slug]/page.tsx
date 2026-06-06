import { notFound } from "next/navigation";

import { listPublishedListingPetsForProfile } from "@/features/listings/lib/listingsRepository";
import PublicContactInfo from "@/features/profile/components/PublicContactInfo";
import ShelterProfileView from "@/features/profile/components/ShelterProfileView";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const profile = await prisma.profile.findUnique({ where: { slug } });

  if (!profile) {
    notFound();
  }

  const pets = await listPublishedListingPetsForProfile(profile.id);

  return (
    <ShelterProfileView
      profileName={profile.displayName}
      location={profile.location}
      description={profile.description}
      pets={pets}
      contact={
        <PublicContactInfo
          email={profile.email}
          phone={profile.phone}
          instagram={profile.instagram}
          facebook={profile.facebook}
        />
      }
      emptyPublicationsText="Este refugio todavía no tiene publicaciones activas."
    />
  );
}
