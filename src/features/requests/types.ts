export type AdoptionRequestStatus = "pendiente" | "aprobada" | "rechazada";

export type AdoptionRequestFilter = "todas" | AdoptionRequestStatus;

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
};
