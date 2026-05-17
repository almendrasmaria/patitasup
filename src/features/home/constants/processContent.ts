import { FiCheckCircle, FiFileText, FiHome, FiSearch } from "react-icons/fi";

import type { HomeAdoptionStep } from "../types";

export const HOME_ADOPTION_STEPS: HomeAdoptionStep[] = [
  {
    number: "01",
    title: "Encontrá tu mascota",
    description:
      "Explorá las publicaciones disponibles y filtrá por tipo, sexo, ubicación o refugio para encontrar tu match.",
    icon: FiSearch,
  },
  {
    number: "02",
    title: "Enviá tu solicitud",
    description:
      "Completá el formulario de pre-adopción para que el refugio o rescatista pueda conocerte mejor.",
    icon: FiFileText,
  },
  {
    number: "03",
    title: "Revisamos tu perfil",
    description:
      "El refugio analiza tu solicitud y se comunica con vos para continuar el proceso de adopción.",
    icon: FiCheckCircle,
  },
  {
    number: "04",
    title: "Dale un nuevo hogar",
    description: "Si todo está aprobado, coordinan la entrega y comienza una nueva vida juntos.",
    icon: FiHome,
  },
];
