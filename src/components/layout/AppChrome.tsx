"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "@/components/Footer";

import AppNavbar, { type NavUser } from "./AppNavbar";
import { isDashboardRoute } from "./dashboardRoutes";

const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

type Props = {
  children: ReactNode;
  navUser: NavUser | null;
};

export default function AppChrome({ children, navUser }: Props) {
  const pathname = usePathname();

  const hideChrome = AUTH_PATHS.includes(pathname);
  const onDashboard = isDashboardRoute(pathname);
  const showFooter = !hideChrome && !onDashboard;

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <AppNavbar navUser={navUser} />
      <main className="min-h-0">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
