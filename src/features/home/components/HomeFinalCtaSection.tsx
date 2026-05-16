import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HomeFinalCtaSection() {
  return (
    <section className="bg-[var(--warm-sand)] px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[28px] bg-[var(--warm-orange)] px-6 py-14 text-center shadow-[0_24px_60px_rgba(255,136,86,0.35)] sm:rounded-3xl sm:px-10 sm:py-16 lg:py-20">
          <h3
            className="relative tracking-tight text-white"
            style={{
              fontFamily: "Poppins",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.05,
              fontWeight: 500,
            }}
          >
            ¿Listo para cambiar
            <br />
            una vida hoy?
          </h3>
          <p className="relative mx-auto mt-5 max-w-xl text-white/90">
            Da el primer paso. Tu próximo mejor amigo te está esperando en uno de nuestros refugios aliados.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/pets"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-bold text-[var(--warm-orange)] shadow-sm transition hover:bg-neutral-50"
            >
              Conocer Mascotas
              <FiArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
