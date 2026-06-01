import "server-only";

import { randomUUID } from "node:crypto";
import {
  PublicationAgeUnit as PrismaAgeUnit,
  PublicationSex as PrismaSex,
  PublicationSpecies as PrismaSpecies,
  PublicationStatus as PrismaStatus,
  type Profile,
  type Publication as PrismaPublication,
} from "@prisma/client";

import { formatPetSpeciesLabel } from "@/features/pets/lib/formatPetSpeciesLabel";
import type { Pet } from "@/features/pets/types";
import { formatDashboardDate } from "@/lib/formatDashboardDate";
import { prisma } from "@/lib/prisma";

import { deleteListingImageByUrl } from "./server/listingImageServer";
import type {
  Publication,
  PublicationFormAgeUnit,
  PublicationFormSex,
  PublicationFormSpecies,
  PublicationFormStatus,
  PublicationFormValues,
  PublicationStatus,
} from "../types";
import type {
  CreateListingInput,
  SaveListingStatusesInput,
  UpdateListingInput,
} from "./listingValidation";

const statusByPrismaStatus: Record<PrismaStatus, PublicationStatus> = {
  [PrismaStatus.ACTIVE]: "activo",
  [PrismaStatus.ADOPTED]: "adoptado",
  [PrismaStatus.DRAFT]: "borrador",
};

const sexByPrismaSex: Record<PrismaSex, string> = {
  [PrismaSex.MALE]: "Macho",
  [PrismaSex.FEMALE]: "Hembra",
};

const speciesByPrismaSpecies: Record<PrismaSpecies, string> = {
  [PrismaSpecies.CAT]: formatPetSpeciesLabel("cat"),
  [PrismaSpecies.DOG]: formatPetSpeciesLabel("dog"),
};

const petSexByPrismaSex: Record<PrismaSex, Pet["sex"]> = {
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

const petSpeciesByPrismaSpecies: Record<PrismaSpecies, Pet["species"]> = {
  [PrismaSpecies.CAT]: "cat",
  [PrismaSpecies.DOG]: "dog",
};

const prismaSpeciesByInput: Record<PublicationFormSpecies, PrismaSpecies> = {
  cat: PrismaSpecies.CAT,
  dog: PrismaSpecies.DOG,
};

const inputSpeciesByPrismaSpecies: Record<PrismaSpecies, PublicationFormSpecies> = {
  [PrismaSpecies.CAT]: "cat",
  [PrismaSpecies.DOG]: "dog",
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

function getFallbackImage(rowId: string, species: PrismaSpecies) {
  const hash = Array.from(rowId).reduce((total, char) => total + char.charCodeAt(0), 0);

  if (species === PrismaSpecies.DOG) {
    const imageNumber = (hash % 4) + 1;
    return `/dogs/dog${imageNumber}.webp`;
  }

  const imageNumber = (hash % 5) + 1;
  return `/cats/cat${imageNumber}.webp`;
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
    species: speciesByPrismaSpecies[row.species],
    location: row.location,
    imageUrl: row.imageUrl ?? getFallbackImage(row.id, row.species),
    status: statusByPrismaStatus[row.status],
    date: formatDashboardDate(row.publishedAt ?? row.createdAt),
  };
}

export function mapListingRowToFormValues(row: PrismaPublication): PublicationFormValues {
  return {
    petName: row.petName,
    ageValue: row.ageValue,
    ageUnit: inputAgeUnitByPrismaAgeUnit[row.ageUnit],
    sex: inputSexByPrismaSex[row.sex],
    species: inputSpeciesByPrismaSpecies[row.species],
    location: row.location,
    rescueInstagram: row.rescueInstagram ?? "",
    imageUrl: row.imageUrl ?? "",
    characteristics: row.characteristics,
    description: row.description,
    status: inputStatusByPrismaStatus[row.status],
  };
}

export function mapListingRowToPet(row: ListingWithAuthor): Pet {
  return {
    id: row.id,
    slug: row.slug,
    name: row.petName,
    image: row.imageUrl ?? getFallbackImage(row.id, row.species),
    sex: petSexByPrismaSex[row.sex],
    species: petSpeciesByPrismaSpecies[row.species],
    ageLabel: formatAge(row.ageValue, row.ageUnit),
    locationLabel: row.location,
    characteristics: row.characteristics,
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

export async function listPublishedListingPets() {
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

  return rows.map(mapListingRowToPet);
}

export async function findPublishedListingPetBySlug(slug: string) {
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

  return row ? mapListingRowToPet(row) : null;
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
      species: prismaSpeciesByInput[input.species],
      location: input.location,
      characteristics: input.characteristics,
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
      imageUrl: true,
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
      species: prismaSpeciesByInput[input.species],
      location: input.location,
      characteristics: input.characteristics,
      description: input.description,
      rescueInstagram: normalizeInstagram(input.rescueInstagram),
      imageUrl: input.imageUrl ?? null,
      status,
      publishedAt: getPublishedAtForStatus(status, existingRow.publishedAt),
    },
  });

  // Drop the previous bucket image when it was replaced by a different one.
  if (existingRow.imageUrl && existingRow.imageUrl !== row.imageUrl) {
    await deleteListingImageByUrl(existingRow.imageUrl);
  }

  return mapListingRow(row);
}

export async function deleteListingForProfile(profileId: string, listingId: string) {
  const existingRow = await prisma.publication.findFirst({
    where: {
      id: listingId,
      authorProfileId: profileId,
    },
    select: {
      imageUrl: true,
    },
  });

  const result = await prisma.publication.deleteMany({
    where: {
      id: listingId,
      authorProfileId: profileId,
    },
  });

  if (result.count > 0) {
    await deleteListingImageByUrl(existingRow?.imageUrl);
  }

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

  await prisma.$transaction(async (tx) => {
    const results = await Promise.all(
      uniqueUpdates.map((update) => {
        const status = prismaStatusByInput[update.status];

        return tx.publication.updateMany({
          where: {
            id: update.id,
            authorProfileId: profileId,
          },
          data: {
            status,
            publishedAt: getPublishedAtForStatus(status, publishedAtById.get(update.id) ?? null),
          },
        });
      }),
    );

    if (results.some((result) => result.count !== 1)) {
      throw new Error("Bulk status update failed due to ownership mismatch.");
    }
  });

  return true;
}