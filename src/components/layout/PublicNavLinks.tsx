"use client";

import Link from "next/link";
import { motion } from "motion/react";

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  links: ReadonlyArray<NavLink>;
  pathname: string;
};

const ACTIVE_UNDERLINE_LAYOUT_ID = "navbar-active-underline";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PublicNavLinks({ links, pathname }: Props) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-8">
      {links.map(({ label, href }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href} className="relative">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative inline-block py-1 text-sm font-medium transition-colors ${
                active
                  ? "text-[var(--warm-orange)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--warm-orange)]"
              }`}
            >
              {label}
              {active ? (
                <motion.span
                  layoutId={ACTIVE_UNDERLINE_LAYOUT_ID}
                  className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-[var(--warm-orange)]"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
