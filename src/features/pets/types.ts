export type PetSpecies = "dog" | "cat";

export type Pet = {
  id: string;
  slug: string;
  name: string;
  image: string;
  sex: "male" | "female";
  /** Defaults to cat when omitted (listings and legacy mocks). */
  species?: PetSpecies;
  ageLabel: string;
  locationLabel: string;
  description: string;
  rescueInstagram: string;
};
