import { redirect } from "next/navigation";
import { FiMapPin } from "react-icons/fi";

import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";
import ContactInfoModal from "@/features/profile/components/ContactInfoModal";
import EditProfileModal from "@/features/profile/components/EditProfileModal";

function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((chunk) => chunk[0]?.toUpperCase())
      .join("") || "PU"
  );
}

export default async function Page() {
  const session = await getSessionProfile();

  if (!session) {
    redirect("/login");
  }

  const { user, profile, profileName } = session;

  const initials = getInitials(profileName);

  const contactEmail = profile?.email ?? user.email ?? null;

  const location: string | null = null;
  const description: string | null = null;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <article className="rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <div className="relative h-36 rounded-t-xl bg-gradient-to-r from-[var(--warm-orange)] via-[#ff9d73] to-[var(--brand-teal)] sm:h-44">
            <div className="absolute right-5 top-4 text-right text-white drop-shadow-sm">
              {location ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">{location}</p>
              ) : null}
              <p className="text-sm font-semibold">{profileName}</p>
            </div>
          </div>

          <div className="px-5 pb-6 sm:px-8">
            <div className="flex items-end justify-between">
              <div className="relative z-10 -mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-2xl font-bold text-[var(--warm-orange)] shadow-sm ring-1 ring-black/5 sm:-mt-14 sm:h-28 sm:w-28">
                {initials}
              </div>

              <EditProfileModal location={location} description={description} />
            </div>

            <h1 className="mt-4 text-[26px] font-semibold text-[var(--foreground-table)]">{profileName}</h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-1.5 text-sm text-[var(--neutral-500)]">
              <FiMapPin className="h-4 w-4 shrink-0" aria-hidden />
              <span>{location ?? "Completá tu ubicación"}</span>
              <span aria-hidden>·</span>
              <ContactInfoModal email={contactEmail} />
            </p>

            <div className="mt-5 border-t border-[var(--border-hairline)] pt-5">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">
                Sobre el refugio
              </h2>
              {description ? (
                <p className="mt-3 text-[15px] leading-7 text-[var(--foreground-table)]">{description}</p>
              ) : (
                <p className="mt-3 text-[15px] leading-7 text-[var(--neutral-500)]">
                  Todavía no agregaste una descripción. Contá la historia de tu refugio, desde cuándo rescatan y cómo
                  trabajan para que las familias te conozcan.
                </p>
              )}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
