import { redirect } from "next/navigation";

import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";
import ContactInfoModal from "@/features/profile/components/ContactInfoModal";
import EditProfileModal from "@/features/profile/components/EditProfileModal";
import ShelterProfileView from "@/features/profile/components/ShelterProfileView";

export default async function Page() {
  const session = await getSessionProfile();

  if (!session) {
    redirect("/login");
  }

  const { user, profile, profileName } = session;

  const contactEmail = profile?.email ?? user.email ?? null;

  const location = profile?.location ?? null;
  const description = profile?.description ?? null;
  const phone = profile?.phone ?? null;
  const instagram = profile?.instagram ?? null;
  const facebook = profile?.facebook ?? null;

  return (
    <ShelterProfileView
      profileName={profileName}
      location={location}
      description={description}
      showPublications={false}
      locationPlaceholder="Completá tu ubicación"
      aboutPlaceholder="Todavía no agregaste una descripción. Contá la historia de tu refugio, desde cuándo rescatan y cómo trabajan para que las familias te conozcan."
      headerAction={<EditProfileModal location={location} description={description} />}
      contact={
        <ContactInfoModal email={contactEmail} phone={phone} instagram={instagram} facebook={facebook} />
      }
    />
  );
}
