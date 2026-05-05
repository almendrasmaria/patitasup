import "server-only";

import { randomUUID } from "node:crypto";
import {
  PublicationAgeUnit as PrismaAgeUnit,
  PublicationSex as PrismaSex,
  PublicationStatus as PrismaStatus,
  type Profile,
  type Publication as PrismaPublication,
} from "@prisma/client";

import type { Cat } from "@/features/cats/types";
import { prisma } from "@/lib/prisma";

import type { Publication, PublicationStatus } from "../types";
import type { CreateListingInput } from "./listingValidation";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const statusByPrismaStatus: Record<PrismaStatus, PublicationStatus> = {
  [PrismaStatus.ACTIVE]: "activo",
  [PrismaStatus.ADOPTED]: "adoptado",
  [PrismaStatus.DRAFT]: "borrador",
};

const sexByPrismaSex: Record<PrismaSex, string> = {
  [PrismaSex.MALE]: "Macho",
  [PrismaSex.FEMALE]: "Hembra",
};

const catSexByPrismaSex: Record<PrismaSex, Cat["sex"]> = {
  [PrismaSex.MALE]: "male",
  [PrismaSex.FEMALE]: "female",
};

const prismaAgeUnitByInput: Record<CreateListingInput["ageUnit"], PrismaAgeUnit> = {
  days: PrismaAgeUnit.DAYS,
  months: PrismaAgeUnit.MONTHS,
  years: PrismaAgeUnit.YEARS,
};

const prismaSexByInput: Record<CreateListingInput["sex"], PrismaSex> = {
  male: PrismaSex.MALE,
  female: PrismaSex.FEMALE,
};

const prismaStatusByInput: Record<CreateListingInput["status"], PrismaStatus> = {
  active: PrismaStatus.ACTIVE,
  draft: PrismaStatus.DRAFT,
};

function formatAge(value: number, unit: PrismaAgeUnit) {
  const labels = {
    [PrismaAgeUnit.DAYS]: value === 1 ? "día" : "días",
    [PrismaAgeUnit.MONTHS]: value === 1 ? "mes" : "meses",
    [PrismaAgeUnit.YEARS]: value === 1 ? "año" : "años",
  } satisfies Record<PrismaAgeUnit, string>;

  return `${value} ${labels[unit]}`;
}

function slugify(value: string) {
  const slug = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "listing";
}

function buildListingSlug(petName: string) {
  return `${slugify(petName)}-${randomUUID().replace(/-/g, "").slice(0, 8)}`;
}

function normalizeInstagram(value: string | undefined) {
  if (!value) return null;

  return value.startsWith("@") ? value : `@${value}`;
}

function getFallbackImage(rowId: string) {
  const imageNumber =
    (Array.from(rowId).reduce((total, char) => total + char.charCodeAt(0), 0) % 3) + 1;

  return `/cats/cat${imageNumber}.jpg`;
}

type ListingWithAuthor = PrismaPublication & {
  authorProfile: Pick<Profile, "displayName">;
};

export function mapListingRow(row: PrismaPublication): Publication {
  return {
    id: row.id,
    petName: row.petName,
    age: formatAge(row.ageValue, row.ageUnit),
    sex: sexByPrismaSex[row.sex],
    status: statusByPrismaStatus[row.status],
    date: dateFormatter.format(row.publishedAt ?? row.createdAt),
  };
}

export function mapListingRowToCat(row: ListingWithAuthor): Cat {
  return {
    id: row.id,
    slug: row.slug,
    name: row.petName,
    image: row.imageUrl ?? getFallbackImage(row.id),
    sex: catSexByPrismaSex[row.sex],
    ageLabel: formatAge(row.ageValue, row.ageUnit),
    locationLabel: row.location,
    description: row.description,
    rescueInstagram: row.rescueInstagram ?? row.authorProfile.displayName,
  };
}

export async function listListingsForProfile(profileId: string) {
  const rows = await prisma.publication.findMany({
    where: {
      authorProfileId: profileId,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  return rows.map(mapListingRow);
}

export async function listPublishedListingCats() {
  const rows = await prisma.publication.findMany({
    where: {
      status: PrismaStatus.ACTIVE,
    },
    include: {
      authorProfile: {
        select: {
          displayName: true,
        },
      },
    },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return rows.map(mapListingRowToCat);
}

export async function findPublishedListingCatBySlug(slug: string) {
  const row = await prisma.publication.findFirst({
    where: {
      slug,
      status: PrismaStatus.ACTIVE,
    },
    include: {
      authorProfile: {
        select: {
          displayName: true,
        },
      },
    },
  });

  return row ? mapListingRowToCat(row) : null;
}

export async function createListingForProfile(
  profileId: string,
  input: CreateListingInput,
) {
  const status = prismaStatusByInput[input.status];

  const row = await prisma.publication.create({
    data: {
      authorProfileId: profileId,
      slug: buildListingSlug(input.petName),
      petName: input.petName,
      ageValue: input.ageValue,
      ageUnit: prismaAgeUnitByInput[input.ageUnit],
      sex: prismaSexByInput[input.sex],
      location: input.location,
      description: input.description,
      rescueInstagram: normalizeInstagram(input.rescueInstagram),
      imageUrl: input.imageUrl ?? null,
      status,
      publishedAt: status === PrismaStatus.ACTIVE ? new Date() : null,
    },
  });

  return mapListingRow(row);
}