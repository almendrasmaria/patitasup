"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiFileText, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";

import { signOutFromBrowser } from "@/features/auth/lib/signOutApp";

import {
  DASHBOARD_MY_LISTINGS_HREF,
  DASHBOARD_NAV_ITEMS,
  DASHBOARD_PROFILE_HREF,
  isDashboardRoute,
} from "./dashboardRoutes";

export type NavUser = {
  email: string;
  profileName: string;
};

const publicNav = [
  { label: "Inicio", href: "/" },
  { label: "Mascotas", href: "/pets" },
  { label: "Contacto", href: "/contact" },
] as const;

/** Ratio del arte del logo (ancho / alto); el archivo puede ser cuadrado con mucho vacío — sin esto `w-auto` copia el 1:1 del canvas. */
const NAV_LOGO_ASPECT_CLASS = "aspect-[320/84]";
const NAV_LOGO_COMPACT_ASPECT_CLASS = "aspect-[280/74]";

function getInitials(profileName: string) {
  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");

  return initials || "PU";
}

function isActiveMobilePublicHref(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isActivePublicCenter(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

type Props = {
  navUser: NavUser | null;
};

function NavbarBrand({
  onNavigate,
  imagePriority = false,
  mode = "full",
}: {
  onNavigate?: () => void;
  imagePriority?: boolean;
  mode?: "full" | "compact";
}) {
  if (mode === "compact") {
    return (
      <Link
        href="/"
        onClick={onNavigate}
        className="inline-flex shrink-0 items-center rounded-lg bg-white px-2 py-1.5 shadow-sm"
        aria-label="PatitasUp, ir al inicio"
      >
        <Image
          src="/logo.png"
          alt="PatitasUp Logo"
          width={280}
          height={74}
          sizes="200px"
          className={`${NAV_LOGO_COMPACT_ASPECT_CLASS} h-9 w-auto max-h-9 max-w-[180px] object-contain object-left sm:h-10 sm:max-h-10 sm:max-w-[200px]`}
          priority={imagePriority}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="inline-flex shrink-0 items-center"
      aria-label="PatitasUp, ir al inicio"
    >
      <Image
        src="/logo.png"
        alt="PatitasUp Logo"
        width={320}
        height={84}
        sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 300px"
        className={`${NAV_LOGO_ASPECT_CLASS} h-11 w-auto max-h-11 max-w-[200px] object-contain object-left sm:h-12 sm:max-h-12 sm:max-w-[240px] md:max-w-[280px]`}
        priority={imagePriority}
      />
    </Link>
  );
}

export default function AppNavbar({ navUser }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loggedIn = Boolean(navUser);
  const inDashboard = isDashboardRoute(pathname);
  const usePublicCenterNav = !inDashboard;

  const showMiPerfilInMenu = loggedIn;
  const showMisPublicacionesInMenu = loggedIn && pathname === "/";
  const showVolverInicio = loggedIn && inDashboard;
  const showMiPerfilInMobileMenu = loggedIn;
  const showMisPublicacionesInMobileMenu = loggedIn && pathname !== DASHBOARD_MY_LISTINGS_HREF;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleLogout = useCallback(async () => {
    await signOutFromBrowser(router, () => {
      setDropdownOpen(false);
      setMobileOpen(false);
    });
  }, [router]);

  const publicLinkInactive =
    "text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--warm-orange)]";
  const publicLinkActive = "text-sm font-medium text-[var(--primary)]";
  const dashboardLinkInactive = "font-medium text-[#4b5563] transition hover:text-[#7061F0]";

  const isActiveDash = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const initials = navUser ? getInitials(navUser.profileName) : "";

  const mobilePrimaryLinks = inDashboard
    ? DASHBOARD_NAV_ITEMS.map((item) => ({ ...item, variant: "dashboard" as const }))
    : publicNav.map((item) => ({ ...item, variant: "public" as const }));

  return (
    <>
      <nav data-site-navbar className="relative z-50 border-b border-[var(--border)] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
              <div className="relative z-20 flex items-center gap-2">
                <NavbarBrand onNavigate={closeMobile} imagePriority />
              </div>

              <div className="relative hidden flex-1 items-center justify-center px-6 md:flex">
                <div aria-label={inDashboard ? "Panel principal" : "Navegación principal"} role="navigation">
                  {usePublicCenterNav ? (
                    <ul className="flex flex-wrap items-center justify-center gap-8">
                      {publicNav.map(({ label, href }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className={isActivePublicCenter(pathname, href) ? publicLinkActive : publicLinkInactive}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="flex flex-wrap items-center justify-center gap-1">
                      {DASHBOARD_NAV_ITEMS.map(({ label, href }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className={`rounded-xl px-3 py-2 text-[15px] lg:px-4 ${
                              isActiveDash(href) ? "bg-[#7061F0]/12 text-[#7061F0]" : dashboardLinkInactive
                            }`}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="relative z-20 flex shrink-0 items-center justify-end">
                {loggedIn && navUser ? (
                  <>
                    <div ref={dropdownRef} className="relative hidden md:block">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((o) => !o)}
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#ececf2] bg-white shadow-sm transition hover:border-[#7061F0]/30 hover:shadow-md"
                        aria-expanded={dropdownOpen}
                        aria-haspopup="menu"
                        aria-label="Abrir menú de usuario"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7061F0] text-sm font-semibold text-white">
                          {initials}
                        </span>
                      </button>

                      {dropdownOpen && (
                        <div
                          role="menu"
                          className="absolute right-0 mt-2 min-w-50 overflow-hidden rounded-2xl border border-[#ececf2] bg-white py-1 shadow-lg"
                        >
                          {showMiPerfilInMenu && (
                            <Link
                              href={DASHBOARD_PROFILE_HREF}
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[#374151] transition hover:bg-[#f5f6fb]"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <FiUser className="text-[#7061F0]" aria-hidden />
                              Mi perfil
                            </Link>
                          )}
                          {showMisPublicacionesInMenu && (
                            <Link
                              href={DASHBOARD_MY_LISTINGS_HREF}
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[#374151] transition hover:bg-[#f5f6fb]"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <FiFileText className="text-[#7061F0]" aria-hidden />
                              Mis publicaciones
                            </Link>
                          )}
                          {showVolverInicio && (
                            <Link
                              href="/"
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[#374151] transition hover:bg-[#f5f6fb]"
                              onClick={() => setDropdownOpen(false)}
                            >
                              Volver a inicio
                            </Link>
                          )}
                          <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
                            onClick={() => void handleLogout()}
                          >
                            <FiLogOut aria-hidden />
                            Cerrar sesión
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ececf2] text-2xl text-[#374151] md:hidden"
                      aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                      onClick={() => {
                        setDropdownOpen(false);
                        setMobileOpen(true);
                      }}
                    >
                      <FiMenu />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="hidden items-center gap-3 md:flex">
                      <Link
                        href="/login"
                        className="px-1 py-2 text-sm font-medium text-[#304543] transition-colors hover:text-[#304543]/80"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        href="/register"
                        className="rounded-lg bg-[#304543] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#243633]"
                      >
                        Crear cuenta
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ececf2] text-2xl text-[#374151] md:hidden"
                      aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                      onClick={() => setMobileOpen(true)}
                    >
                      <FiMenu />
                    </button>
                  </>
                )}
              </div>
          </div>
        </div>
      </nav>

    <div
      role="dialog"
      aria-modal={mobileOpen ? "true" : undefined}
      aria-hidden={!mobileOpen}
      id="app-navbar-mobile-menu"
      className={`fixed inset-0 z-9999 min-h-screen overflow-y-auto bg-[#304543] transition-transform duration-300 ease-out md:hidden ${
        mobileOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
      }`}
    >
      <div className="flex min-h-screen flex-col px-6 pb-8 pt-6 text-white">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <NavbarBrand onNavigate={closeMobile} mode="compact" />
          </div>
          <button type="button" onClick={closeMobile} className="shrink-0 text-3xl text-white" aria-label="Cerrar menú">
            <FiX />
          </button>
        </div>

        <ul className="mt-12 flex flex-col gap-8 text-xl font-semibold">
          {mobilePrimaryLinks.map(({ label, href, variant }) => {
            const active =
              variant === "public"
                ? isActiveMobilePublicHref(pathname, href)
                : isActiveDash(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMobile}
                  className={
                    active
                      ? "inline-block border-b-2 border-white pb-1 text-white no-underline"
                      : "text-white/90"
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex shrink-0 flex-col gap-3 pt-8">
          {!loggedIn ? (
            <>
              <Link
                href="/login"
                onClick={closeMobile}
                className="block w-full rounded-lg border border-white py-2 text-center font-medium text-white"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                onClick={closeMobile}
                className="block w-full rounded-lg bg-white py-2 text-center font-semibold text-[#304543]"
              >
                Publicar gato
              </Link>
            </>
          ) : inDashboard ? (
            <>
              {showMiPerfilInMobileMenu && (
                <Link
                  href={DASHBOARD_PROFILE_HREF}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 text-center font-medium text-white"
                >
                  <FiUser className="text-lg" aria-hidden />
                  Mi perfil
                </Link>
              )}
              {showMisPublicacionesInMobileMenu && (
                <Link
                  href={DASHBOARD_MY_LISTINGS_HREF}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 text-center font-medium text-white"
                >
                  <FiFileText className="text-lg" aria-hidden />
                  Mis publicaciones
                </Link>
              )}
              <Link
                href="/"
                onClick={closeMobile}
                className="block w-full rounded-lg border border-white py-2 text-center font-medium text-white"
              >
                Volver a inicio
              </Link>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-center font-semibold text-[#304543]"
                onClick={() => void handleLogout()}
              >
                <FiLogOut className="text-lg" aria-hidden />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              {showMiPerfilInMobileMenu && (
                <Link
                  href={DASHBOARD_PROFILE_HREF}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 text-center font-medium text-white"
                >
                  <FiUser className="text-lg" aria-hidden />
                  Mi perfil
                </Link>
              )}
              {showMisPublicacionesInMobileMenu && (
                <Link
                  href={DASHBOARD_MY_LISTINGS_HREF}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 text-center font-medium text-white"
                >
                  <FiFileText className="text-lg" aria-hidden />
                  Mis publicaciones
                </Link>
              )}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-center font-semibold text-[#304543]"
                onClick={() => void handleLogout()}
              >
                <FiLogOut className="text-lg" aria-hidden />
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
