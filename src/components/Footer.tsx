"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const go = useCallback(
    (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (pathname !== to) router.push(to);

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [router, pathname],
  );

  return (
    <footer className="w-full bg-[var(--brand-teal)] pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 min-[920px]:grid-cols-2 min-[920px]:gap-12">
          <div className="flex flex-col items-center text-center min-[920px]:items-start min-[920px]:text-left">
            <Link
              href="/"
              className="inline-flex shrink-0 rounded-lg bg-white px-3 py-2 shadow-sm outline-offset-2 transition hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 sm:px-4 sm:py-2.5"
            >
              <Image
                src="/logo.png"
                alt="PatitasUp Logo"
                width={320}
                height={84}
                className="aspect-[320/84] h-9 w-auto max-h-9 max-w-[min(100%,240px)] object-contain object-left sm:h-10 sm:max-h-10 sm:max-w-[min(100%,280px)]"
              />
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              Conectamos gatitos rescatados con familias responsables, promoviendo la adopción responsable.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/patitasup.ar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="https://github.com/almendrasmaria/patitasup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>

          <nav className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-white/70 min-[920px]:justify-end">
            <Link href="/" onClick={go("/")} className="transition hover:text-white">
              Inicio
            </Link>
            <Link href="/contact" onClick={go("/contact")} className="transition hover:text-white">
              Contacto
            </Link>
            <Link href="/register" onClick={go("/register")} className="transition hover:text-white">
              Crear cuenta
            </Link>
          </nav>
        </div>

        <div className="h-px w-full bg-white/10" />

        <p className="py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} PatitasUp · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
