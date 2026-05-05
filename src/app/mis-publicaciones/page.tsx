import { redirect } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import MisPublicacionesClient from "@/features/publications/components/MisPublicacionesClient";
import { getDisplayName } from "@/features/auth/lib/displayName";
import { prisma } from "@/lib/prisma";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await prisma.profile.findUnique({
    where: { supabaseUserId: user.id },
  });

  const profileName = getDisplayName(
    profile?.displayName ?? user.user_metadata?.display_name,
    user.email,
  );

  return (
    <main className="min-h-screen bg-[#F5F6FB]">
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col bg-white">
          <Topbar profileName={profileName} email={user.email ?? "Sin correo"} />

          <section className="flex-1 px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:py-10 2xl:py-12">
            <MisPublicacionesClient />
          </section>
        </div>
      </div>
    </main>
  );
}
