"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiFileText, FiHome, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";

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

const LOGO_DARK_SRC = "/logo-dark.png";
const LOGO_LIGHT_SRC = "/logo-light.png";

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

function isActivePublicHref(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Props = {
  navUser: NavUser | null;
};

function NavbarBrand({
  onNavigate,
  imagePriority = false,
  mode = "full",
  tone = "dark",
}: {
  onNavigate?: () => void;
  imagePriority?: boolean;
  mode?: "full" | "compact";
  tone?: "dark" | "light";
}) {
  const src = tone === "light" ? LOGO_LIGHT_SRC : LOGO_DARK_SRC;
  const aspectClass = mode === "compact" ? NAV_LOGO_COMPACT_ASPECT_CLASS : NAV_LOGO_ASPECT_CLASS;
  const sizeClass =
    mode === "compact"
      ? "h-9 w-auto max-h-9 max-w-[180px] object-contain object-left sm:h-10 sm:max-h-10 sm:max-w-[200px]"
      : "h-11 w-auto max-h-11 max-w-[200px] object-contain object-left sm:h-12 sm:max-h-12 sm:max-w-[240px] md:max-w-[280px]";

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="inline-flex shrink-0 items-center"
      aria-label="PatitasUp, ir al inicio"
    >
      <Image
        src={src}
        alt="PatitasUp Logo"
        width={mode === "compact" ? 280 : 320}
        height={mode === "compact" ? 74 : 84}
        sizes={mode === "compact" ? "200px" : "(max-width: 640px) 200px, (max-width: 1024px) 260px, 300px"}
        className={`${aspectClass} ${sizeClass}`}
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
  const showMisPublicacionesInMenu = loggedIn && !inDashboard;
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
  const dashboardLinkInactive = "font-medium text-[var(--neutral-600)] transition hover:text-[var(--accent)]";

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
                            className={isActivePublicHref(pathname, href) ? publicLinkActive : publicLinkInactive}
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
                              isActiveDash(href) ? "bg-[var(--accent-overlay-12)] text-[var(--accent)]" : dashboardLinkInactive
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
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--border-hairline)] bg-white shadow-sm transition hover:border-[var(--accent-border-30)] hover:shadow-md"
                        aria-expanded={dropdownOpen}
                        aria-haspopup="menu"
                        aria-label="Abrir menú de usuario"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white">
                          {initials}
                        </span>
                      </button>

                      {dropdownOpen && (
                        <div
                          role="menu"
                          className="absolute right-0 mt-2 min-w-50 overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-white py-1 shadow-lg"
                        >
                          {showMiPerfilInMenu && (
                            <Link
                              href={DASHBOARD_PROFILE_HREF}
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[var(--neutral-700)] transition hover:bg-[var(--surface-dashboard)]"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <FiUser className="text-[var(--accent)]" aria-hidden />
                              Mi perfil
                            </Link>
                          )}
                          {showMisPublicacionesInMenu && (
                            <Link
                              href={DASHBOARD_MY_LISTINGS_HREF}
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[var(--neutral-700)] transition hover:bg-[var(--surface-dashboard)]"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <FiFileText className="text-[var(--accent)]" aria-hidden />
                              Mis publicaciones
                            </Link>
                          )}
                          {showVolverInicio && (
                            <Link
                              href="/"
                              role="menuitem"
                              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[var(--neutral-700)] transition hover:bg-[var(--surface-dashboard)]"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <FiHome className="text-[var(--accent)]" aria-hidden />
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
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-hairline)] text-2xl text-[var(--neutral-700)] md:hidden"
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
                        className="px-1 py-2 text-sm font-medium text-[var(--brand-teal)] transition-colors hover:text-[var(--brand-teal-subtle)]"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        href="/register"
                        className="rounded-lg bg-[var(--brand-teal)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--brand-teal-hover)]"
                      >
                        Crear cuenta
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-hairline)] text-2xl text-[var(--neutral-700)] md:hidden"
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
className={`fixed inset-0 z-9999 min-h-screen overflow-y-auto bg-[var(--brand-teal)] transition-transform duration-300 ease-out md:hidden ${
        mobileOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
      }`}
    >
      <div className="flex min-h-screen flex-col px-6 pb-8 pt-6 text-white">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <NavbarBrand onNavigate={closeMobile} mode="compact" tone="light" />
          </div>
          <button type="button" onClick={closeMobile} className="shrink-0 text-3xl text-white" aria-label="Cerrar menú">
            <FiX />
          </button>
        </div>

        <ul className="mt-12 flex flex-col gap-8 text-xl font-semibold">
          {mobilePrimaryLinks.map(({ label, href, variant }) => {
            const active =
              variant === "public"
                ? isActivePublicHref(pathname, href)
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
                className="block w-full rounded-lg bg-white py-2 text-center font-semibold text-[var(--brand-teal)]"
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
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white py-2 text-center font-medium text-white"
              >
                <FiHome className="text-lg" aria-hidden />
                Volver a inicio
              </Link>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-center font-semibold text-[var(--brand-teal)]"
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-center font-semibold text-[var(--brand-teal)]"
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
