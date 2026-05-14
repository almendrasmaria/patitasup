import {
  FiCheckCircle,
  FiFileText,
  FiHome,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiUserPlus,
} from "react-icons/fi";

import type { HomeProcessAudience, HomeProcessCardData } from "../types";

export const HOME_PROCESS_CONTENT: Record<HomeProcessAudience, HomeProcessCardData[]> = {
  adopters: [
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
      description:
        "Si todo está aprobado, coordinan la entrega y comienza una nueva vida juntos.",
      icon: FiHome,
    },
  ],
  rescuers: [
    {
      number: "01",
      title: "Creá tu espacio",
      description:
        "Mostrá quién sos, cómo rescatás y qué tipo de acompañamiento ofrecés a cada adopción.",
      icon: FiUserPlus,
    },
    {
      number: "02",
      title: "Publicá con claridad",
      description:
        "Subí fotos, historia, carácter y cuidados especiales para recibir postulaciones más alineadas.",
      icon: FiFileText,
    },
    {
      number: "03",
      title: "Filtrá con confianza",
      description:
        "Centralizá las solicitudes y revisá cada perfil con contexto para tomar mejores decisiones.",
      icon: FiShield,
    },
    {
      number: "04",
      title: "Acompañá el match",
      description:
        "Mantené una comunicación simple con adoptantes y hacé seguimiento para una transición cuidada.",
      icon: FiMessageCircle,
    },
  ],
};
