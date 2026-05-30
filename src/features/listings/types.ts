export type PublicationStatus = "activo" | "adoptado" | "borrador";

export type PublicationFormAgeUnit = "days" | "months" | "years";

export type PublicationFormSex = "male" | "female";

export type PublicationFormSpecies = "cat" | "dog";

export type PublicationFormStatus = "active" | "adopted" | "draft";

export type Publication = {
  id: string;
  petName: string;
  age: string;
  sex: string;
  species: string;
  location: string;
  imageUrl: string;
  status: PublicationStatus;
  date: string;
};

export type PublicationFormValues = {
  petName: string;
  ageValue: number;
  ageUnit: PublicationFormAgeUnit;
  sex: PublicationFormSex;
  species: PublicationFormSpecies;
  location: string;
  rescueInstagram: string;
  imageUrl: string;
  description: string;
  status: PublicationFormStatus;
};

export type PublicationFilter = "todas" | PublicationStatus;
