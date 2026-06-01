export type PetSpecies = "dog" | "cat";

export type Pet = {
  id: string;
  slug: string;
  name: string;
  image: string;
  sex: "male" | "female";
  species?: PetSpecies;
  ageLabel: string;
  locationLabel: string;
  characteristics: string[];
  description: string;
  rescueInstagram: string;
};
