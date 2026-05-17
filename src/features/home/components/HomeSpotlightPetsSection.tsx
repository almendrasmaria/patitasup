import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

import type { Pet } from "@/features/pets/types";

function speciesLine(pet: Pet): string {
  const kind = pet.species === "dog" ? "Perro" : "Gato";
  return `${kind} · ${pet.ageLabel}`;
}

type Props = {
  pets: Pet[];
};

export default function HomeSpotlightPetsSection({ pets }: Props) {
  if (pets.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div>
            <span className="text-sm uppercase tracking-widest text-[var(--warm-orange)]">Listos para adopción</span>
            <h3
              className="mt-2 tracking-tight text-[var(--brand-teal)]"
              style={{
                fontFamily: "Poppins",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                lineHeight: 1.05,
                fontWeight: 500,
              }}
            >
              Conoce a tus
              <br />
              nuevos mejores amigos
            </h3>
          </div>
          <Link
            href="/pets"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-teal)] transition-colors hover:text-[var(--warm-orange)] md:text-base"
          >
            Ver todos
            <FiArrowUpRight className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:rotate-45" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pets.map((pet) => (
            <Link
              key={pet.id}
              href={`/pets/adoption/${pet.slug}`}
              className="group relative cursor-pointer overflow-hidden rounded-[28px] shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--warm-sand)]">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  unoptimized={/^https?:\/\//.test(pet.image)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-[var(--brand-teal)]/85 via-[var(--brand-teal)]/20 to-transparent"
                  aria-hidden
                />

                <div className="absolute inset-x-4 bottom-4 text-white">
                  <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h4
                      className="truncate tracking-tight"
                      style={{ fontFamily: "Poppins", fontSize: "1.5rem", fontWeight: 600 }}
                    >
                      {pet.name}
                    </h4>
                    <p className="truncate text-sm text-white/80">{speciesLine(pet)}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-white/70">
                      <FiMapPin className="h-3 w-3 shrink-0" aria-hidden />
                      <span className="truncate">{pet.locationLabel}</span>
                    </p>
                  </div>
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--warm-orange)] text-white transition-colors group-hover:bg-white group-hover:text-[var(--warm-orange)]"
                    aria-hidden
                  >
                    <FiArrowUpRight className="h-[18px] w-[18px]" />
                  </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
