import type { IconType } from "react-icons";

export type HomeProcessAudience = "adopters" | "rescuers";

export type HomeProcessCardData = {
  number: string;
  title: string;
  description: string;
  icon: IconType;
};
