export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F6FB]">
      <section className="mx-auto max-w-[1400px] p-4 sm:p-6 md:p-8">
        <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <span className="inline-flex rounded-full bg-[#7061F0]/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#7061F0]">
            Próximamente
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-[#1f2937] md:text-[28px]">Solicitudes de adopción</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#6b7280]">
            Acá vas a poder revisar y gestionar las solicitudes que recibas por tus publicaciones. Estamos armando
            esta sección para que quede integrada con tu flujo de trabajo en PatitasUp.
          </p>
        </article>
      </section>
    </main>
  );
}
