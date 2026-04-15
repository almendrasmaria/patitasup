"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const closeMenu = () => setShowMobileMenu(false);

  const linkBase = "font-medium text-white/80 hover:text-white transition";
  const linkActive = "text-white";

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <div className="w-full px-6 py-5 lg:px-16">
        <div className="relative flex w-full items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src="/logo.png" alt="PatitasUp" width={160} height={44} className="h-10 w-auto md:h-11" priority />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[15px] md:flex">
            <li>
              <Link href="/" className={`${linkBase} ${isActive("/") ? linkActive : ""}`}>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/how-it-works"
                className={`${linkBase} ${isActive("/how-it-works") ? linkActive : ""}`}
              >
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link href="/contact" className={`${linkBase} ${isActive("/contact") ? linkActive : ""}`}>
                Contacto
              </Link>
            </li>
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-[15px] font-medium text-white transition hover:bg-slate-100 hover:text-slate-900"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-[#292B2D] px-4 py-2 text-[15px] font-semibold text-white transition shadow-sm hover:opacity-90"
            >
              Crear cuenta
            </Link>
          </div>

          <button
            className="text-3xl text-white md:hidden"
            onClick={() => setShowMobileMenu(true)}
          >
            <FiMenu />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-9999 bg-[#7061F0] transition-transform duration-300 md:hidden ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-6 text-white">
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="PatitasUp" width={140} height={36} className="h-9 w-auto" priority />
            <button onClick={closeMenu} className="text-3xl">
              <FiX />
            </button>
          </div>

          <ul className="mt-12 space-y-8 text-xl font-semibold">
            <li>
              <Link href="/" onClick={closeMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" onClick={closeMenu}>
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeMenu}>
                Contacto
              </Link>
            </li>
          </ul>

          <div className="mt-auto space-y-3">
            <Link
              href="/login"
              onClick={closeMenu}
              className="block w-full rounded-full border border-white py-2 text-center font-medium"
            >
              Ingresar
            </Link>
            <Link
              href="/register"
              onClick={closeMenu}
              className="block w-full rounded-full bg-white py-2 text-center font-semibold text-[#7061F0]"
            >
              Publicar gato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;