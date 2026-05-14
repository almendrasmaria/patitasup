import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShield } from "react-icons/fi";

import Badge from "@/components/ui/Badge";

const HERO_IMAGES = [
  { src: "/hero/1.jpg", alt: "Mascota esperando hogar", shift: "xl:translate-y-3 2xl:translate-y-4" },
  { src: "/hero/2.jpg", alt: "Gato en adopción", shift: "xl:-translate-y-2 2xl:-translate-y-3" },
  { src: "/hero/3.jpg", alt: "Perro rescatado", shift: "xl:translate-y-2 2xl:translate-y-3" },
  { src: "/hero/4.jpg", alt: "Mascota feliz", shift: "xl:-translate-y-1 2xl:-translate-y-2" },
] as const;

export default function HomeHero() {
  return (
    <section
      id="inicio"
      className="overflow-x-clip bg-white pt-8 pb-12 sm:pt-12 sm:pb-16 md:flex md:min-h-[calc(100svh-4rem)] md:items-center md:py-6 lg:py-8 xl:py-10 2xl:py-14 [@media(min-width:768px)_and_(max-height:860px)]:py-5"
    >
      <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-start justify-items-stretch gap-8 px-4 sm:gap-10 sm:px-6 md:grid-cols-2 md:items-center md:gap-7 lg:gap-9 lg:px-8 xl:gap-12 2xl:gap-14 [@media(min-width:768px)_and_(max-height:860px)]:gap-6">
        <div className="w-full min-w-0 max-w-full text-center md:text-left md:max-w-none lg:max-w-[min(100%,34rem)]">
          <div className="mx-auto w-fit max-w-full md:mx-0">
            <Badge text="Adopción responsable" />
          </div>

          <h1 className="mt-5 text-center text-[2.125rem] font-bold leading-[1.06] tracking-tight sm:mt-6 sm:text-[2.375rem] md:text-left md:text-[2.625rem] md:leading-[1.05] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[3.875rem] 2xl:leading-[1.03] max-md:whitespace-nowrap max-md:text-[clamp(1.5rem,5.2vw+0.65rem,2.375rem)]">
            <span className="text-balance text-[var(--foreground)] md:block">Encontrá a tu </span>
            <span className="text-balance text-[var(--warm-orange)] md:mt-1 md:block">mejor amigo</span>
          </h1>

          <p className="mt-4 max-w-full text-center text-pretty text-[15px] leading-relaxed text-[var(--muted-foreground)] sm:mt-5 sm:text-base md:text-left">
            Conectamos refugios y rescatistas con familias responsables. Elegí a tu compañero ideal
            y viví la adopción con transparencia y acompañamiento.
          </p>

          <div className="mt-6 flex min-w-0 flex-col gap-3 text-center sm:mt-8 sm:flex-row sm:items-stretch md:text-left">
            <Link
              href="/pets"
              className="flex min-h-12 w-full min-w-0 flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg bg-[var(--warm-orange)] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--warm-orange-hover)] active:brightness-95 sm:min-h-[3rem] sm:px-6"
            >
              <FiHeart className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} aria-hidden />
              Quiero adoptar
            </Link>

            <Link
              href="/register"
              className="group flex min-h-12 w-full min-w-0 flex-1 touch-manipulation items-center justify-center gap-2 rounded-lg border border-[var(--foreground)]/15 bg-white px-4 py-3.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand-teal)] hover:bg-[var(--brand-teal)] hover:text-white active:brightness-95 sm:min-h-[3rem] sm:px-6"
            >
              <FiShield className="h-[18px] w-[18px] shrink-0 text-[var(--warm-orange)] transition group-hover:text-white" strokeWidth={2.25} aria-hidden />
              Soy refugio
            </Link>
          </div>
        </div>

        <div className="w-full min-w-0 self-start md:self-center md:min-h-0 md:justify-self-end">
          <div
            className="relative w-full md:mx-0 md:ml-0 md:mr-auto md:max-w-[23rem] lg:max-w-[24.5rem] xl:ml-auto xl:mr-0 xl:max-w-[26rem] 2xl:max-w-[28rem] [@media(min-width:768px)_and_(max-height:860px)]:md:max-w-[21.5rem]"
          >
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {HERO_IMAGES.map(({ src, alt, shift }, i) => (
                <div
                  key={src}
                  className={`relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04] sm:aspect-[4/5] sm:rounded-[22px] md:aspect-square md:rounded-[22px] md:shadow-[0_18px_44px_rgba(0,0,0,0.075)] lg:aspect-[9/10] lg:rounded-[26px] lg:shadow-[0_20px_50px_rgba(0,0,0,0.08)] ${shift}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={i < 2}
                    className="object-cover"
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 42vw, (max-width: 1280px) 200px, 280px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
