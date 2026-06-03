export function getSafeRedirectPath(candidate: string | null | undefined, fallback = "/profile") {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  if (/[/\\](?:%2f|%5c)/i.test(candidate) || /[\\\u0000-\u001F\u007F]/.test(candidate)) {
    return fallback;
  }

  try {
    const url = new URL(candidate, "https://patitasup.local");

    if (url.origin !== "https://patitasup.local") {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}