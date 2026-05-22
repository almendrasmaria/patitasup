"use client";

import { motion } from "motion/react";
import type { IconType } from "react-icons";
import { HiCheck, HiOutlineHeart, HiOutlineHome, HiOutlineUser } from "react-icons/hi";

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

export default function AdoptionFormStepper({ currentStep, petName }: Props) {
  return (
    <nav aria-label="Progreso del formulario" className="mb-8 mt-6 w-full">
      <ol className="flex items-center justify-center gap-0">
        {STEPS.map((step, index) => {
          const done = currentStep > step.id;
          const active = currentStep === step.id;
          const Icon = step.icon;

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    backgroundColor: done || active ? "var(--accent)" : "#f3f3f5",
                    boxShadow: active ? "0 0 0 4px var(--accent-ring-15)" : "none",
                    scale: active ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    border: done || active ? "none" : "2px solid var(--border-neutral)",
                  }}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? (
                    <HiCheck size={18} className="text-white" aria-hidden />
                  ) : (
                    <Icon size={16} className={active ? "text-white" : "text-[var(--neutral-400)]"} aria-hidden />
                  )}
                </motion.div>

                <span
                  className="whitespace-nowrap text-xs"
                  style={{
                    color: active ? "var(--accent)" : "var(--neutral-400)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {step.label(petName)}
                </span>
              </div>

              {index < STEPS.length - 1 ? (
                <div className="relative mx-1 mb-5 w-12 sm:w-16">
                  <div className="h-0.5 w-full rounded-full bg-[var(--divider)]" aria-hidden />
                  <motion.div
                    className="absolute left-0 top-0 h-0.5 rounded-full bg-[var(--accent)]"
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
