import { redirect } from "next/navigation";

import LoginCard from "@/features/auth/components/LoginCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/profile");
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#f3f4f6]">
      <LoginCard />
    </main>
  );
}