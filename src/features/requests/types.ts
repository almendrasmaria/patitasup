export type AdoptionRequestStatus = "pendiente" | "en_revision" | "aprobada";

export type AdoptionRequestFilter = "todas" | AdoptionRequestStatus;

export type AdoptionRequestRow = {
  id: string;
  petName: string;
  petSpecies: string;
  adoptanteName: string;
  adoptanteEmail?: string;
  adoptantePhone?: string;
  status: AdoptionRequestStatus;
  dateLabel: string;
};
