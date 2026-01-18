import type { Cat } from "../model";

export const mockCats: Cat[] = [
  {
    id: "1",
    name: "Copito",
    image: "/cats/copito.jpg",
    sex: "male",
    ageLabel: "60 días",
    locationLabel: "Villa Lugano",
    description:
      "Muy dulce y curioso. Le encanta explorar su entorno, jugar con pelotitas y dormir cerca de las personas. Ideal para un hogar tranquilo, con paciencia y mucho cariño.",
    rescueInstagram: "@animalitos",
  },
  {
    id: "2",
    name: "Milo",
    image: "/cats/milo.jpg",
    sex: "male",
    ageLabel: "4 meses",
    locationLabel: "Villa Devoto",
    description:
      "Juguetón, activo y muy compañero. Siempre está buscando atención y nuevos desafíos. Le encanta explorar, trepar y luego dormir largas siestas al sol.",
    rescueInstagram: "@patitas",
  },
  {
    id: "3",
    name: "Nina",
    image: "/cats/nina.jpg",
    sex: "female",
    ageLabel: "2 años",
    locationLabel: "Palermo",
    description:
      "Tranquila, amorosa y muy compañera. Se adapta fácilmente a los hogares y disfruta mucho de la compañía humana. Ideal para alguien que busca una compañera fiel.",
    rescueInstagram: "@huellitas",
  },
];