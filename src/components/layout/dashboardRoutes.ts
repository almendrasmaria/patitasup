export const DASHBOARD_PROFILE_HREF = "/profile";
export const DASHBOARD_MY_LISTINGS_HREF = "/my-listings";
export const DASHBOARD_REQUESTS_HREF = "/requests";

export const DASHBOARD_NAV_ITEMS = [
  { label: "Mis publicaciones", href: DASHBOARD_MY_LISTINGS_HREF },
  { label: "Solicitudes", href: DASHBOARD_REQUESTS_HREF },
] as const;

export const DASHBOARD_PATHS = [
  DASHBOARD_PROFILE_HREF,
  DASHBOARD_MY_LISTINGS_HREF,
  DASHBOARD_REQUESTS_HREF,
] as const;

export const DASHBOARD_HOME_HREF = DASHBOARD_PROFILE_HREF;

export function isDashboardRoute(pathname: string): boolean {
  return DASHBOARD_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
