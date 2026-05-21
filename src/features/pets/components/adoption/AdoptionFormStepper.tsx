"use client";

import type { IconType } from "react-icons";
import { HiOutlineHeart, HiOutlineHome, HiOutlineUser } from "react-icons/hi";

import type { AdoptionFormStep } from "./adoptionFormTypes";

type Props = {
  currentStep: AdoptionFormStep;
  petName: string;
};

const STEPS: {
  id: AdoptionFormStep;
  label: (petName: string) => string;
  icon: IconType;
}[] = [
  { id: 1, label: () => "Tus Datos", icon: HiOutlineUser },
  { id: 2, label: () => "Tu Hogar", icon: HiOutlineHome },
  { id: 3, label: (petName) => `Sobre ${petName}`, icon: HiOutlineHeart },
];

function circleClass(isActive: boolean, isCompleted: boolean) {
  if (isActive || isCompleted) {
    return "bg-[var(--accent)] text-white";
  }
  return "border-2 border-[var(--border-input-soft)] bg-white text-[var(--text-disabled)]";
}

function labelClass(isActive: boolean, isCompleted: boolean) {
  if (isActive || isCompleted) return "text-[var(--accent)]";
  return "text-[var(--text-disabled)]";
}

export default function AdoptionFormStepper({ currentStep, petName }: Props) {
  return (
    <nav aria-label="Progreso del formulario" className="mt-6 w-full">
      <ol className="flex w-full items-start">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const Icon = step.icon;

          return (
            <li
              key={step.id}
              className={`flex items-start ${index < STEPS.length - 1 ? "min-w-0 flex-1" : "shrink-0"}`}
            >
              <div className="flex w-[5rem] shrink-0 flex-col items-center text-center sm:w-[6.25rem] md:w-[7rem]">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${circleClass(isActive, isCompleted)}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <Icon size={20} aria-hidden />
                </div>
                <span
                  className={`mt-2 text-[11px] font-medium leading-tight sm:text-xs ${labelClass(isActive, isCompleted)}`}
                >
                  {step.label(petName)}
                </span>
              </div>

              {index < STEPS.length - 1 ? (
                <div
                  className={`mx-1 mt-[22px] h-px min-w-[1rem] flex-1 self-start sm:mx-2 ${
                    isCompleted ? "bg-[var(--accent)]" : "bg-[var(--divider)]"
                  }`}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
