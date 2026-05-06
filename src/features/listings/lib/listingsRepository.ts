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

import type {
  Publication,
  PublicationFormAgeUnit,
  PublicationFormSex,
  PublicationFormStatus,
  PublicationFormValues,
  PublicationStatus,
} from "../types";
import type {
  CreateListingInput,
  SaveListingStatusesInput,
  UpdateListingInput,
} from "./listingValidation";

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

const prismaAgeUnitByInput: Record<PublicationFormAgeUnit, PrismaAgeUnit> = {
  days: PrismaAgeUnit.DAYS,
  months: PrismaAgeUnit.MONTHS,
  years: PrismaAgeUnit.YEARS,
};

const inputAgeUnitByPrismaAgeUnit: Record<PrismaAgeUnit, PublicationFormAgeUnit> = {
  [PrismaAgeUnit.DAYS]: "days",
  [PrismaAgeUnit.MONTHS]: "months",
  [PrismaAgeUnit.YEARS]: "years",
};

const prismaSexByInput: Record<PublicationFormSex, PrismaSex> = {
  male: PrismaSex.MALE,
  female: PrismaSex.FEMALE,
};

const inputSexByPrismaSex: Record<PrismaSex, PublicationFormSex> = {
  [PrismaSex.MALE]: "male",
  [PrismaSex.FEMALE]: "female",
};

const prismaStatusByInput: Record<PublicationFormStatus, PrismaStatus> = {
  active: PrismaStatus.ACTIVE,
  adopted: PrismaStatus.ADOPTED,
  draft: PrismaStatus.DRAFT,
};

const inputStatusByPrismaStatus: Record<PrismaStatus, PublicationFormStatus> = {
  [PrismaStatus.ACTIVE]: "active",
  [PrismaStatus.ADOPTED]: "adopted",
  [PrismaStatus.DRAFT]: "draft",
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

function getPublishedAtForStatus(status: PrismaStatus, currentPublishedAt: Date | null) {
  if (status === PrismaStatus.DRAFT) {
    return null;
  }

  return currentPublishedAt ?? new Date();
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

export function mapListingRowToFormValues(row: PrismaPublication): PublicationFormValues {
  return {
    petName: row.petName,
    ageValue: row.ageValue,
    ageUnit: inputAgeUnitByPrismaAgeUnit[row.ageUnit],
    sex: inputSexByPrismaSex[row.sex],
    location: row.location,
    rescueInstagram: row.rescueInstagram ?? "",
    imageUrl: row.imageUrl ?? "",
    description: row.description,
    status: inputStatusByPrismaStatus[row.status],
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
      publishedAt: getPublishedAtForStatus(status, null),
    },
  });

  return mapListingRow(row);
}

export async function findListingForProfile(profileId: string, listingId: string) {
  const row = await prisma.publication.findFirst({
    where: {
      id: listingId,
      authorProfileId: profileId,
    },
  });

  return row ? mapListingRowToFormValues(row) : null;
}

export async function updateListingForProfile(
  profileId: string,
  listingId: string,
  input: UpdateListingInput,
) {
  const existingRow = await prisma.publication.findFirst({
    where: {
      id: listingId,
      authorProfileId: profileId,
    },
    select: {
      id: true,
      publishedAt: true,
    },
  });

  if (!existingRow) {
    return null;
  }

  const status = prismaStatusByInput[input.status];

  const row = await prisma.publication.update({
    where: {
      id: existingRow.id,
    },
    data: {
      petName: input.petName,
      ageValue: input.ageValue,
      ageUnit: prismaAgeUnitByInput[input.ageUnit],
      sex: prismaSexByInput[input.sex],
      location: input.location,
      description: input.description,
      rescueInstagram: normalizeInstagram(input.rescueInstagram),
      imageUrl: input.imageUrl ?? null,
      status,
      publishedAt: getPublishedAtForStatus(status, existingRow.publishedAt),
    },
  });

  return mapListingRow(row);
}

export async function deleteListingForProfile(profileId: string, listingId: string) {
  const result = await prisma.publication.deleteMany({
    where: {
      id: listingId,
      authorProfileId: profileId,
    },
  });

  return result.count > 0;
}

export async function updateListingStatusesForProfile(
  profileId: string,
  updates: SaveListingStatusesInput["updates"],
) {
  const uniqueUpdates = Array.from(
    new Map(updates.map((update) => [update.id, update.status])).entries(),
  ).map(([id, status]) => ({ id, status }));

  const rows = await prisma.publication.findMany({
    where: {
      authorProfileId: profileId,
      id: {
        in: uniqueUpdates.map((update) => update.id),
      },
    },
    select: {
      id: true,
      publishedAt: true,
    },
  });

  if (rows.length !== uniqueUpdates.length) {
    return null;
  }

  const publishedAtById = new Map(rows.map((row) => [row.id, row.publishedAt]));

  await prisma.$transaction(
    uniqueUpdates.map((update) => {
      const status = prismaStatusByInput[update.status];

      return prisma.publication.update({
        where: {
          id: update.id,
        },
        data: {
          status,
          publishedAt: getPublishedAtForStatus(status, publishedAtById.get(update.id) ?? null),
        },
      });
    }),
  );

  return true;
}