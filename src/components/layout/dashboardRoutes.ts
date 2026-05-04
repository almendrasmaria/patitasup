export const DASHBOARD_NAV_ITEMS = [
  { label: "Mi perfil", href: "/profile" },
  { label: "Mis publicaciones", href: "/my-listings" },
  { label: "Solicitudes", href: "/requests" },
] as const;

export const DASHBOARD_PATHS = DASHBOARD_NAV_ITEMS.map((item) => item.href);

export const DASHBOARD_HOME_HREF = DASHBOARD_NAV_ITEMS[0].href;

export function isDashboardRoute(pathname: string): boolean {
  return DASHBOARD_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
