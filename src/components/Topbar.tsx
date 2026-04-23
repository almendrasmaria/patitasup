"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
            PF
          </div>

          <div className="text-left leading-tight">
            <p className="text-sm font-semibold text-[#1B1B1F]">Patitas Felices</p>
          </div>

          <FiChevronDown className="text-gray-400" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100">
            <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
              <FiUser />
              Mi perfil
            </button>

            <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-gray-50">
              <FiLogOut />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
