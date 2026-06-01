export type AdoptionRequestStatus =
  | "pendiente"
  | "agendada"
  | "aprobada"
  | "rechazada";

export type AdoptionRequestFilter = "todas" | AdoptionRequestStatus;

export type AdoptionRequestDetails = {
  preferredContact: string;
  housingType: string;
  protection: string;
  otherPets?: string;
  reason: string;
  aloneHoursPerDay: string;
};

export type AdoptionRequestRow = {
  id: string;
  petName: string;
  petSpecies: string;
  petAgeLabel?: string;
  adoptanteName: string;
  adoptanteLocation?: string;
  adoptanteEmail?: string;
  adoptantePhone?: string;
  status: AdoptionRequestStatus;
  dateLabel: string;
  /** ISO date (yyyy-mm-dd) of the scheduled visit, when status is "agendada". */
  visitScheduledAt?: string;
  details?: AdoptionRequestDetails;
};
