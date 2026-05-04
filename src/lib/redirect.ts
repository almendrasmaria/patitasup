export function getSafeRedirectPath(candidate: string | null | undefined, fallback = "/profile") {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  return candidate;
}