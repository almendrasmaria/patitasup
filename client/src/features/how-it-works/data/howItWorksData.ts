import type { HowItWorksCardData } from "../model";
import {
  FiSearch,
  FiClipboard,
  FiMessageCircle,
  FiHeart,
  FiUserPlus,
  FiCamera,
  FiFilter,
  FiMapPin,
} from "react-icons/fi";

export const howItWorksCards: HowItWorksCardData[] = [
  {
    tone: "blue",
    tag: { label: "PARA ADOPTANTES", icon: FiHeart },
    title: "Adoptá con",
    highlight: "confianza",
    subtitle: "Un proceso simple, humano y pensado para adopciones responsables.",
    steps: [
      {
        icon: FiSearch,
        title: "Elegí a tu felino",
        description:
          "Explorá el listado y filtrá por refugio, ubicación y/o edad para encontrar tu match.",
      },
      {
        icon: FiClipboard,
        title: "Postulate",
        description:
          "Completá el formulario de pre-adopción para que el refugio o tránsito pueda conocerte mejor.",
      },
      {
        icon: FiMessageCircle,
        title: "Revisión del formulario",
        description:
          "El/la transitante revisa tu solicitud y, si el perfil encaja, se contacta para contarte cómo seguir.",
      },
      {
        icon: FiHeart,
        title: "Final feliz",
        description:
          "Si todo está ok, coordinan la entrega y la firma del contrato de adopción responsable.",
      },
    ],
    cta: { label: "Ver felinos en adopción", href: "/adoptar", variant: "primary" },
  },
  {
    tone: "orange",
    tag: { label: "PARA RESCATISTAS", icon: FiMapPin },
    title: "Publicá y encontrá",
    highlight: "hogares",
    subtitle: "Gratis y fácil: organizá tus publicaciones y recibí postulaciones de forma simple.",
    steps: [
      {
        icon: FiUserPlus,
        title: "Registrate",
        description:
          "Creá tu perfil de rescatista o refugio. Es 100% gratuito y te da acceso a todas las herramientas de publicación.",
      },
      {
        icon: FiCamera,
        title: "Publicá al felino",
        description:
          "Cargá características, una breve descripción y al menos una foto para que lo conozcan.",
      },
      {
        icon: FiFilter,
        title: "Revisá solicitudes",
        description:
          "Cuando alguien se postula, recibís un mail con todos los detalles del formulario de pre-adopción.",
      },
      {
        icon: FiMessageCircle,
        title: "Coordiná",
        description:
          "Si estás de acuerdo con el perfil del adoptante, coordiná la entrega y concretá la adopción de forma segura.",
      },
    ],
    cta: {
      label: "Comenzar a publicar",
      href: "/publicar",
      variant: "secondary",
    },
  },
];