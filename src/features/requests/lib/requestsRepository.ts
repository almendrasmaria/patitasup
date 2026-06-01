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

/**
 * Thrown when an operation can't proceed because the linked publication is no
 * longer ACTIVE (already adopted, draft, etc.). Used to roll back a transaction
 * and let callers map it to the right HTTP status.
 */
export class PublicationUnavailableError extends Error {
  constructor() {
    super("La publicación ya no está disponible.");
    this.name = "PublicationUnavailableError";
  }
}

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
  // Look up + insert atomically and re-confirm the pet is still ACTIVE before
  // committing, so a publication that gets adopted mid-flight can't receive a
  // brand-new request (TOCTOU between the lookup and the insert).
  try {
    return await prisma.$transaction(async (tx) => {
      const publication = await tx.publication.findFirst({
        where: {
          slug: input.publicationSlug,
          status: PrismaPublicationStatus.ACTIVE,
        },
        select: { id: true, authorProfileId: true },
      });

      if (!publication) {
        throw new PublicationUnavailableError();
      }

      const row = await tx.adoptionRequest.create({
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

      const stillActive = await tx.publication.count({
        where: { id: publication.id, status: PrismaPublicationStatus.ACTIVE },
      });

      if (stillActive === 0) {
        throw new PublicationUnavailableError();
      }

      return mapRequestRow(row);
    });
  } catch (error) {
    if (error instanceof PublicationUnavailableError) {
      return null;
    }
    throw error;
  }
}

export async function updateAdoptionRequestStatusForProfile(
  profileId: string,
  requestId: string,
  status: AdoptionRequestStatus,
  visitScheduledAt?: string | null,
): Promise<AdoptionRequestRow | null> {
  const nextStatus = prismaStatusByStatus[status];

  const data: { status: PrismaStatus; visitScheduledAt?: Date | null } = {
    status: nextStatus,
  };

  // Only touch the visit date when the caller sends it. A yyyy-mm-dd string is
  // stored as UTC midnight so it round-trips back to the same calendar day.
  if (visitScheduledAt !== undefined) {
    data.visitScheduledAt = visitScheduledAt
      ? new Date(`${visitScheduledAt}T00:00:00.000Z`)
      : null;
  }

  // Keep the request and its linked publication in sync atomically: approving a
  // request (= "Adoptada") must retire the pet from the public flow, and undoing
  // an approval must bring it back. Done in one transaction so they never diverge.
  return prisma.$transaction(async (tx) => {
    const existing = await tx.adoptionRequest.findFirst({
      where: { id: requestId, ownerProfileId: profileId },
      select: { id: true, status: true, publicationId: true },
    });

    if (!existing) {
      return null;
    }

    await tx.adoptionRequest.update({ where: { id: existing.id }, data });

    const becomesApproved =
      nextStatus === PrismaStatus.APPROVED && existing.status !== PrismaStatus.APPROVED;
    const leavesApproved =
      existing.status === PrismaStatus.APPROVED && nextStatus !== PrismaStatus.APPROVED;

    if (becomesApproved) {
      // Retire the publication from the public listing / detail page and block
      // new requests. Guarded by status: ACTIVE so we never resurrect a draft.
      // If nothing flips, the pet wasn't available (already adopted, draft, …),
      // so this approval isn't allowed — roll back and signal a conflict. This
      // is also what prevents two approved requests for the same publication.
      const flipped = await tx.publication.updateMany({
        where: {
          id: existing.publicationId,
          authorProfileId: profileId,
          status: PrismaPublicationStatus.ACTIVE,
        },
        data: { status: PrismaPublicationStatus.ADOPTED },
      });

      if (flipped.count === 0) {
        throw new PublicationUnavailableError();
      }
    } else if (leavesApproved) {
      // Undoing the approval reactivates the pet, but only if no other approved
      // request remains and only if it is still marked ADOPTED.
      const stillApproved = await tx.adoptionRequest.count({
        where: {
          publicationId: existing.publicationId,
          status: PrismaStatus.APPROVED,
          id: { not: existing.id },
        },
      });

      if (stillApproved === 0) {
        await tx.publication.updateMany({
          where: {
            id: existing.publicationId,
            authorProfileId: profileId,
            status: PrismaPublicationStatus.ADOPTED,
          },
          data: { status: PrismaPublicationStatus.ACTIVE },
        });
      }
    }

    const row = await tx.adoptionRequest.findFirst({
      where: { id: existing.id },
      include: { publication: { select: publicationSelect } },
    });

    return row ? mapRequestRow(row) : null;
  });
}
