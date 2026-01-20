import type { IconType } from "react-icons";

export type HowItWorksStep = {
  title: string;
  description: string;
  icon: IconType;
};

export type HowItWorksCardData = {
  tag: {
    label: string;
    icon: IconType;
  };
  title: string;
  highlight: string; 
  subtitle: string;
  steps: HowItWorksStep[];
  cta: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
  tone: "blue" | "orange"; 
};