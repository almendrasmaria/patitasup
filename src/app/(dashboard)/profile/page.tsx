import { redirect } from "next/navigation";

import SignOutButton from "@/features/auth/components/SignOutButton";
import { getSessionProfile } from "@/features/auth/lib/getSessionProfile";

function InfoCard({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--surface-profile-tint)] p-4">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--neutral-500)]">{label}</p>
      <p className={`mt-3 text-[15px] text-[var(--foreground-table)] ${mono ? "font-mono text-[13px]" : ""}`}>{value}</p>
    </div>
  );
}

export default async function Page() {
  const session = await getSessionProfile();

  if (!session) {
    redirect("/login");
  }

  const { user, profile, profileName } = session;

  const accountCreatedAt = profile?.createdAt
    ? new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(profile.createdAt)
    : "Recién creada";
  const emailStatus = user.email_confirmed_at ? "Confirmado" : "Pendiente de confirmación";

  return (
    <div className="min-h-screen bg-[var(--surface-dashboard)]">
      <section className="mx-auto max-w-[1400px] p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <span className="inline-flex rounded-full bg-[var(--accent-overlay-10)] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--warm-orange)]">
              Cuenta activa
            </span>

            <h1 className="mt-4 text-[30px] font-semibold text-[var(--foreground-table)]">Hola, {profileName}</h1>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--neutral-500)]">
              Este espacio ya está autenticado con Supabase SSR y sincronizado con Prisma. Desde acá podés seguir
              evolucionando el panel de rescatistas sobre una sesión persistente y segura para Vercel.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <InfoCard label="Correo" value={user.email ?? "Sin correo"} />
              <InfoCard label="Estado del correo" value={emailStatus} />
              <InfoCard label="Miembro desde" value={accountCreatedAt} />
              <InfoCard label="ID de Supabase" value={user.id} mono />
            </div>
          </article>

          <aside className="rounded-3xl bg-[var(--surface-navy)] p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/60">Sincronización Prisma</p>

            <div className="mt-5 space-y-4 text-sm text-white/80">
              <p>Perfil persistido: {profile ? "Sí" : "No"}</p>
              <p>Nombre guardado: {profile?.displayName ?? profileName}</p>
              <p>Email guardado: {profile?.email ?? user.email ?? "Sin correo"}</p>
            </div>

            <SignOutButton className="mt-8 w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              Cerrar sesión
            </SignOutButton>
          </aside>
        </div>
      </section>
    </div>
  );
}
