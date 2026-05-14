import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HomeFinalCtaSection() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[28px] bg-[var(--warm-orange)] px-6 py-14 text-center shadow-[0_24px_60px_rgba(255,136,86,0.35)] sm:rounded-3xl sm:px-10 sm:py-16 lg:py-20">
          <h2 className="text-balance text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.35rem]">
            ¿Listo para cambiar una vida?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/95 sm:text-base">
            Miles de patitas esperan una familia como la tuya. Empezá hoy mismo.
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