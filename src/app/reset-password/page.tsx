import { redirect } from "next/navigation";

import ResetPasswordCard from "@/features/auth/components/ResetPasswordCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password?error=session");
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-(--surface-auth)">
      <ResetPasswordCard />
    </main>
  );
}