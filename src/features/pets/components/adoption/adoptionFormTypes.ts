export type AdoptionFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  domicilio: string;
  barrio: string;
  preferredContact: string;
  housingType: string;
  protection: string;
  otherPets: string;
  reason: string;
  aloneHoursPerDay: string;
};

export const INITIAL_ADOPTION_FORM: AdoptionFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  domicilio: "",
  barrio: "",
  preferredContact: "",
  housingType: "",
  protection: "",
  otherPets: "",
  reason: "",
  aloneHoursPerDay: "",
};

export type AdoptionFormStep = 1 | 2 | 3;
