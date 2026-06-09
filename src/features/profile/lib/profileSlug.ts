import "server-only";

import type { Prisma } from "@prisma/client";

export function slugifyName(name: string): string {
  const base = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || "refugio";
}

type ProfileDelegate = Prisma.TransactionClient["profile"];

export async function generateUniqueProfileSlug(
  profile: ProfileDelegate,
  name: string,
  excludeId?: string,
): Promise<string> {
  const base = slugifyName(name);
  let candidate = base;
  let counter = 2;

  while (true) {
    const existing = await profile.findUnique({ where: { slug: candidate } });

    if (!existing || existing.id === excludeId) {
      return candidate;
    }

    candidate = `${base}-${counter}`;
    counter += 1;
  }
}
