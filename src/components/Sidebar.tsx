"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiFileText, FiUser } from "react-icons/fi";

const items = [
  { label: "Mis publicaciones", href: "/mis-publicaciones", icon: FiGrid },
  { label: "Solicitudes", href: "/solicitudes", icon: FiFileText },
  { label: "Perfil", href: "/perfil", icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-[280px] bg-[#0B1120] text-white">
      <div className="flex h-full flex-col px-5 py-7">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7061F0]">
            <Image src="/logo.png" alt="PatitasUp" width={24} height={24} className="h-6 w-6" />
          </div>
          <span className="text-[18px] font-semibold text-white">PatitasUp</span>
        </div>

        <nav className="flex flex-col gap-2">
          {items.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#7061F0] text-white"
                    : "text-[#C9CFD9] hover:bg-[#141C2F] hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition ${active ? "text-white" : "text-[#AAB2C5]"}`}
                />

                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
