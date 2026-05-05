export type PublicationStatus = "activo" | "adoptado" | "borrador";

export type Publication = {
  id: string;
  petName: string;
  age: string;
  sex: string;
  status: PublicationStatus;
  date: string;
};

export type PublicationFilter = "todas" | PublicationStatus;
