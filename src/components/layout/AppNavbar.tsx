"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronDown, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";

import { signOutFromBrowser } from "@/features/auth/lib/signOutApp";

import { DASHBOARD_NAV_ITEMS, isDashboardRoute } from "./dashboardRoutes";

export type NavUser = {
  email: string;
  profileName: string;
};

const publicNav = [
  { label: "Inicio", href: "/" },
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "Contacto", href: "/contact" },
] as const;

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
  variant = "onLight",
  imagePriority = false,
  mode = "full",
}: {
  onNavigate?: () => void;
  variant?: "onLight" | "onViolet";
  imagePriority?: boolean;
  mode?: "full" | "iconOnly";
}) {
  const textClass = variant === "onLight" ? "text-[#7061F0]" : "text-white";

  if (mode === "iconOnly") {
    return (
      <Link
        href="/"
        onClick={onNavigate}
        className="flex shrink-0 items-center"
        aria-label="PatitasUp, ir al inicio"
      >
        <Image
          src="/logo.webp"
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 object-contain brightness-0 invert"
          sizes="32px"
          priority={imagePriority}
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex min-w-0 max-w-full items-center gap-2.5 sm:gap-3"
      aria-label="PatitasUp, ir al inicio"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7061F0] shadow-sm sm:h-10 sm:w-10">
        <Image
          src="/logo.webp"
          alt=""
          width={24}
          height={24}
          className="h-[22px] w-[22px] object-contain brightness-0 invert"
          sizes="36px"
          priority={imagePriority}
        />
      </span>
      <span className={`truncate text-base font-semibold tracking-tight sm:text-[17px] ${textClass}`}>PatitasUp</span>
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

  const showMiPerfilInMenu = loggedIn && !inDashboard;
  const showVolverInicio = loggedIn && inDashboard;

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

  const linkInactive = "font-medium text-[#4b5563] transition hover:text-[#7061F0]";
  const linkActive = "font-semibold text-[#7061F0]";

  const isActiveDash = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const initials = navUser ? getInitials(navUser.profileName) : "";

  const mobilePrimaryLinks = inDashboard
    ? DASHBOARD_NAV_ITEMS.map((item) => ({ ...item, variant: "dashboard" as const }))
    : publicNav.map((item) => ({ ...item, variant: "public" as const }));

  return (
    <>
    <header
      data-site-navbar
      className="fixed top-0 right-0 left-0 z-[1000] w-full max-w-none border-b border-gray-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto grid h-[60px] w-full max-w-[1400px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 sm:h-[64px] sm:gap-4 sm:px-6 lg:px-8">
        <div className="relative z-20 flex justify-start">
          <NavbarBrand onNavigate={closeMobile} variant="onLight" imagePriority />
        </div>

        <nav
          className="hidden min-w-0 justify-center justify-self-center md:flex"
          aria-label={inDashboard ? "Panel principal" : "Navegación principal"}
        >
          {usePublicCenterNav ? (
            <ul className="flex flex-wrap items-center justify-center gap-4 text-[15px] lg:gap-8">
              {publicNav.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isActivePublicCenter(pathname, href) ? linkActive : linkInactive}
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
                      isActiveDash(href) ? "bg-[#7061F0]/12 text-[#7061F0]" : linkInactive
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>

        <div className="relative z-20 flex shrink-0 justify-end">
          {loggedIn && navUser ? (
            <>
              <div ref={dropdownRef} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex max-w-[min(100vw-12rem,280px)] items-center gap-2 rounded-2xl border border-[#ececf2] bg-white px-2 py-1.5 shadow-sm transition hover:border-[#7061F0]/30 hover:shadow-md lg:gap-3 lg:px-3"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7061F0] text-sm font-semibold text-white">
                    {initials}
                  </span>
                  <span className="hidden min-w-0 text-left leading-tight lg:block">
                    <span className="block truncate text-sm font-semibold text-[#1B1B1F]">{navUser.profileName}</span>
                    <span className="block max-w-[180px] truncate text-xs text-[#6b7280]">{navUser.email}</span>
                  </span>
                  <FiChevronDown
                    className={`hidden shrink-0 text-[#9ca3af] transition sm:block ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 min-w-[200px] overflow-hidden rounded-2xl border border-[#ececf2] bg-white py-1 shadow-lg"
                  >
                    {showMiPerfilInMenu && (
                      <Link
                        href="/profile"
                        role="menuitem"
                        className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[#374151] transition hover:bg-[#f5f6fb]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiUser className="text-[#7061F0]" aria-hidden />
                        Mi perfil
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
                onClick={() => setMobileOpen(true)}
              >
                <FiMenu />
              </button>
            </>
          ) : (
            <>
              <div className="hidden items-center gap-3 md:flex">
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2 text-[15px] font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-[#7061F0] px-4 py-2 text-[15px] font-semibold text-white shadow-sm transition hover:bg-[#5f52d6]"
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
    </header>

    <div
      role="dialog"
      aria-modal={mobileOpen ? "true" : undefined}
      aria-hidden={!mobileOpen}
      id="app-navbar-mobile-menu"
      className={`fixed inset-0 z-[9999] min-h-screen overflow-y-auto bg-[#7061F0] transition-transform duration-300 ease-out md:hidden ${
        mobileOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
      }`}
    >
      <div className="flex min-h-screen flex-col px-6 pb-8 pt-6 text-white">
        <div className="flex shrink-0 items-center justify-between gap-4">
          <div className="min-w-0 flex-1 pr-2">
            <NavbarBrand onNavigate={closeMobile} variant="onViolet" mode="iconOnly" />
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
                    active ? "text-white underline decoration-white/80 underline-offset-4" : "text-white/90"
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
                className="block w-full rounded-full border border-white py-2 text-center font-medium text-white"
              >
                Ingresar
              </Link>
              <Link
                href="/register"
                onClick={closeMobile}
                className="block w-full rounded-full bg-white py-2 text-center font-semibold text-[#7061F0]"
              >
                Publicar gato
              </Link>
            </>
          ) : inDashboard ? (
            <>
              <Link
                href="/"
                onClick={closeMobile}
                className="block w-full rounded-full border border-white py-2 text-center font-medium text-white"
              >
                Volver a inicio
              </Link>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-center font-semibold text-[#7061F0]"
                onClick={() => void handleLogout()}
              >
                <FiLogOut className="text-lg" aria-hidden />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                onClick={closeMobile}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white py-2 text-center font-medium text-white"
              >
                <FiUser className="text-lg" aria-hidden />
                Mi perfil
              </Link>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-center font-semibold text-[#7061F0]"
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
