import type { Publication } from "../types";

export const MOCK_LISTINGS: Publication[] = [
  {
    id: "1",
    petName: "Enrique",
    age: "2 años",
    sex: "Macho",
    species: "Perro",
    location: "Palermo, CABA",
    imageUrl: "/dogs/dog1.webp",
    status: "activo",
    date: "02/05/2026",
  },
  {
    id: "2",
    petName: "Luna",
    age: "1 año",
    sex: "Hembra",
    species: "Gato",
    location: "San Telmo, CABA",
    imageUrl: "/cats/cat1.webp",
    status: "adoptado",
    date: "02/02/2025",
  },
  {
    id: "3",
    petName: "Michi",
    age: "8 meses",
    sex: "Macho",
    species: "Gato",
    location: "Caballito, CABA",
    imageUrl: "/cats/cat2.webp",
    status: "borrador",
    date: "03/03/2026",
  },
];
