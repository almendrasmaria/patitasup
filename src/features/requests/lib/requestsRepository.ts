import "server-only";

import {
  AdoptionRequestStatus as PrismaStatus,
  PublicationAgeUnit as PrismaAgeUnit,
  PublicationSpecies as PrismaSpecies,
  PublicationStatus as PrismaPublicationStatus,
  type AdoptionRequest as PrismaAdoptionRequest,
  type Publication as PrismaPublication,
} from "@prisma/client";

import {
  ALONE_HOURS_OPTIONS,
  HOUSING_TYPE_OPTIONS,
  PROTECTION_OPTIONS,
} from "@/features/pets/components/adoption/adoptionFormConfig";
import { formatPetSpeciesLabel } from "@/features/pets/lib/formatPetSpeciesLabel";
import { formatDashboardDate } from "@/lib/formatDashboardDate";
import { prisma } from "@/lib/prisma";

import type { CreateAdoptionRequestInput } from "./adoptionRequestValidation";
import type { AdoptionRequestRow, AdoptionRequestStatus } from "../types";

const statusByPrismaStatus: Record<PrismaStatus, AdoptionRequestStatus> = {
  [PrismaStatus.PENDING]: "pendiente",
  [PrismaStatus.SCHEDULED]: "agendada",
  [PrismaStatus.APPROVED]: "aprobada",
  [PrismaStatus.REJECTED]: "rechazada",
};

const prismaStatusByStatus: Record<AdoptionRequestStatus, PrismaStatus> = {
  pendiente: PrismaStatus.PENDING,
  agendada: PrismaStatus.SCHEDULED,
  aprobada: PrismaStatus.APPROVED,
  rechazada: PrismaStatus.REJECTED,
};

const speciesLabelByPrismaSpecies: Record<PrismaSpecies, string> = {
  [PrismaSpecies.CAT]: formatPetSpeciesLabel("cat"),
  [PrismaSpecies.DOG]: formatPetSpeciesLabel("dog"),
};

function buildLabelLookup(options: ReadonlyArray<{ label: string; value: string }>) {
  const lookup = new Map(options.map((option) => [option.value, option.label]));
  return (value: string) => lookup.get(value) ?? value;
}

const housingTypeLabel = buildLabelLookup(HOUSING_TYPE_OPTIONS);
const protectionLabel = buildLabelLookup(PROTECTION_OPTIONS);
const aloneHoursLabel = buildLabelLookup(ALONE_HOURS_OPTIONS);

function formatAge(value: number, unit: PrismaAgeUnit) {
  const labels: Record<PrismaAgeUnit, string> = {
    [PrismaAgeUnit.DAYS]: value === 1 ? "día" : "días",
    [PrismaAgeUnit.MONTHS]: value === 1 ? "mes" : "meses",
    [PrismaAgeUnit.YEARS]: value === 1 ? "año" : "años",
  };

  return `${value} ${labels[unit]}`;
}

type RequestWithPublication = PrismaAdoptionRequest & {
  publication: Pick<PrismaPublication, "petName" | "species" | "ageValue" | "ageUnit">;
};

function mapRequestRow(row: RequestWithPublication): AdoptionRequestRow {
  const adoptanteLocation = [row.barrio, row.domicilio].filter(Boolean).join(" · ");

  return {
    id: row.id,
    petName: row.publication.petName,
    petSpecies: speciesLabelByPrismaSpecies[row.publication.species],
    petAgeLabel: formatAge(row.publication.ageValue, row.publication.ageUnit),
    adoptanteName: `${row.firstName} ${row.lastName}`.trim(),
    adoptanteLocation: adoptanteLocation || undefined,
    adoptanteEmail: row.email,
    adoptantePhone: row.phone,
    status: statusByPrismaStatus[row.status],
    dateLabel: formatDashboardDate(row.createdAt),
    visitScheduledAt: row.visitScheduledAt
      ? row.visitScheduledAt.toISOString().slice(0, 10)
      : undefined,
    details: {
      preferredContact: row.preferredContact,
      housingType: housingTypeLabel(row.housingType),
      protection: protectionLabel(row.protection),
      otherPets: row.otherPets?.trim() || undefined,
      reason: row.reason,
      aloneHoursPerDay: aloneHoursLabel(row.aloneHoursPerDay),
    },
  };
}

const publicationSelect = {
  petName: true,
  species: true,
  ageValue: true,
  ageUnit: true,
} as const;

export async function listAdoptionRequestsForProfile(
  profileId: string | null,
): Promise<AdoptionRequestRow[]> {
  if (!profileId) {
    return [];
  }

  const rows = await prisma.adoptionRequest.findMany({
    where: { ownerProfileId: profileId },
    include: { publication: { select: publicationSelect } },
    orderBy: [{ createdAt: "desc" }],
  });

  return rows.map(mapRequestRow);
}

export async function createAdoptionRequest(
  input: CreateAdoptionRequestInput,
): Promise<AdoptionRequestRow | null> {
  const publication = await prisma.publication.findFirst({
    where: {
      slug: input.publicationSlug,
      status: PrismaPublicationStatus.ACTIVE,
    },
    select: { id: true, authorProfileId: true },
  });

  if (!publication) {
    return null;
  }

  const row = await prisma.adoptionRequest.create({
    data: {
      publicationId: publication.id,
      ownerProfileId: publication.authorProfileId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      domicilio: input.domicilio,
      barrio: input.barrio,
      preferredContact: input.preferredContact,
      housingType: input.housingType,
      protection: input.protection,
      otherPets: input.otherPets ?? null,
      reason: input.reason,
      aloneHoursPerDay: input.aloneHoursPerDay,
    },
    include: { publication: { select: publicationSelect } },
  });

  return mapRequestRow(row);
}

export async function updateAdoptionRequestStatusForProfile(
  profileId: string,
  requestId: string,
  status: AdoptionRequestStatus,
  visitScheduledAt?: string | null,
): Promise<AdoptionRequestRow | null> {
  const data: { status: PrismaStatus; visitScheduledAt?: Date | null } = {
    status: prismaStatusByStatus[status],
  };

  // Only touch the visit date when the caller sends it. A yyyy-mm-dd string is
  // stored as UTC midnight so it round-trips back to the same calendar day.
  if (visitScheduledAt !== undefined) {
    data.visitScheduledAt = visitScheduledAt
      ? new Date(`${visitScheduledAt}T00:00:00.000Z`)
      : null;
  }

  const result = await prisma.adoptionRequest.updateMany({
    where: { id: requestId, ownerProfileId: profileId },
    data,
  });

  if (result.count === 0) {
    return null;
  }

  const row = await prisma.adoptionRequest.findFirst({
    where: { id: requestId, ownerProfileId: profileId },
    include: { publication: { select: publicationSelect } },
  });

  return row ? mapRequestRow(row) : null;
}
