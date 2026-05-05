"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

type TopbarProps = {
  profileName: string;
  email: string;
};

function getInitials(profileName: string) {
  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");

  return initials || "PU";
}

export default function Topbar({ profileName, email }: TopbarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = getInitials(profileName);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center justify-end bg-white px-6 shadow-sm">
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 transition hover:bg-gray-100"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6C5CE7] text-sm font-semibold text-white">
            {initials}
          </div>

          <div className="text-left leading-tight">
            <p className="text-sm font-semibold text-[#1B1B1F]">{profileName}</p>
            <p className="text-xs text-[#6b7280]">{email}</p>
          </div>

          <FiChevronDown className="text-gray-400" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100">
            <Link
              href="/perfil"
              className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <FiUser />
              Mi perfil
            </Link>

            <form action="/auth/signout" method="post">
              <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-gray-50">
                <FiLogOut />
                Cerrar sesión
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
