import RequestsManagementClient from "@/features/requests/components/RequestsManagementClient";
import { getCurrentListingProfile } from "@/features/listings/lib/ensureListingProfile";
import { listAdoptionRequestsForProfile } from "@/features/requests/lib/requestsRepository";

export default async function Page() {
  const profile = await getCurrentListingProfile();
  const requests = await listAdoptionRequestsForProfile(profile?.id ?? null);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--warm-sand)]">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <RequestsManagementClient requests={requests} />
      </section>
    </div>
  );
}
