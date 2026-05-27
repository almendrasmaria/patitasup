"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

import BrandLogo from "./BrandLogo";

type FooterLink = {
  label: string;
  href: string;
};

const SITE_LINKS: ReadonlyArray<FooterLink> = [
  { label: "Inicio", href: "/" },
  { label: "Mascotas", href: "/pets" },
  { label: "Contacto", href: "/contact" },
];

const ACCOUNT_LINKS: ReadonlyArray<FooterLink> = [
  { label: "Crear cuenta", href: "/register" },
  { label: "Iniciar sesión", href: "/login" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/patitasup.ar/",
    Icon: FaInstagram,
  },
  {
    label: "GitHub",
    href: "https://github.com/almendrasmaria/patitasup",
    Icon: FaGithub,
  },
] as const;

const Footer = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = useCallback(
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
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,360px)_1fr] md:items-start md:gap-x-16">
          <FooterBrandCard />

          <div className="flex flex-wrap items-start justify-center gap-x-14 gap-y-8 sm:gap-x-16 md:justify-end">
            <FooterLinksColumn
              title="Sitio"
              links={SITE_LINKS}
              onNavigate={navigateTo}
            />

            <FooterLinksColumn title="Cuenta" links={ACCOUNT_LINKS} />
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <p className="py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} PatitasUp · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

const FooterBrandCard = () => {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <BrandLogo tone="light" size="md" />

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
        Conectamos mascotas rescatadas con familias responsables, promoviendo la
        adopción responsable.
      </p>

      <ul className="mt-5 flex items-center gap-3">
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
            >
              <Icon className="text-lg" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

type FooterLinksColumnProps = {
  title: string;
  links: ReadonlyArray<FooterLink>;
  onNavigate?: (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const FooterLinksColumn = ({ title, links, onNavigate }: FooterLinksColumnProps) => {
  return (
    <nav
      aria-label={title}
      className="flex flex-col items-center text-center md:items-start md:text-left"
    >
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
        {title}
      </h3>

      <ul className="flex flex-col gap-3 text-sm font-medium text-white/75">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate?.(href)}
              className="transition hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Footer;
