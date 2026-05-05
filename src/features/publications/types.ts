export type PublicationStatus = "activo" | "adoptado" | "borrador";

export type Publication = {
  id: number;
  petName: string;
  age: string;
  sex: string;
  status: PublicationStatus;
  date: string;
};

export type PublicationFilter = "todas" | PublicationStatus;
