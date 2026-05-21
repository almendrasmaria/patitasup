"use client";

import { useMemo, useState } from "react";
import { FaPaw } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

import type { Pet } from "@/features/pets/types";

import AdoptionFormCardIntro from "./AdoptionFormCardIntro";
import AdoptionFormStepper from "./AdoptionFormStepper";
import AdoptionFormTrustFooter from "./AdoptionFormTrustFooter";
import { isAdoptionFormComplete, isAdoptionStepComplete } from "./adoptionFormConfig";
import {
  INITIAL_ADOPTION_FORM,
  type AdoptionFormData,
  type AdoptionFormStep,
} from "./adoptionFormTypes";
import HomeStep from "./steps/HomeStep";
import PersonalDataStep from "./steps/PersonalDataStep";
import PetStep from "./steps/PetStep";

type Props = {
  pet: Pet;
};

const AdoptionForm = ({ pet }: Props) => {
  const [form, setForm] = useState<AdoptionFormData>(INITIAL_ADOPTION_FORM);
  const [step, setStep] = useState<AdoptionFormStep>(1);

  const stepComplete = useMemo(() => isAdoptionStepComplete(step, form), [step, form]);
  const formComplete = useMemo(() => isAdoptionFormComplete(form), [form]);

  const handleChange =
    (field: keyof AdoptionFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleField = <K extends keyof AdoptionFormData>(
    field: K,
    value: AdoptionFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (!stepComplete || step >= 3) return;
    setStep((prev) => (prev + 1) as AdoptionFormStep);
  };

  const goBack = () => {
    if (step <= 1) return;
    setStep((prev) => (prev - 1) as AdoptionFormStep);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formComplete) return;

    const fullName = `${form.firstName} ${form.lastName}`.trim();
    console.log("Solicitud enviada:", { petId: pet.id, petSlug: pet.slug, fullName, ...form });
  };

  return (
    <>
      <article className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card-soft)] ring-1 ring-black/[0.06]">
        <div className="h-2.5 bg-[var(--accent)]" aria-hidden />

        <div className="p-6 sm:p-8">
          <AdoptionFormCardIntro petName={pet.name} />
          <AdoptionFormStepper currentStep={step} petName={pet.name} />

          <form className="mt-6" onSubmit={handleSubmit} noValidate>
            <div className="w-full">
              {step === 1 ? (
                <PersonalDataStep form={form} onChange={handleChange} onField={handleField} />
              ) : null}
              {step === 2 ? (
                <HomeStep form={form} onChange={handleChange} onField={handleField} />
              ) : null}
              {step === 3 ? (
                <PetStep
                  petName={pet.name}
                  form={form}
                  onChange={handleChange}
                  onField={handleField}
                />
              ) : null}
            </div>

            <footer
              className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${
                step > 1 ? "sm:justify-between" : "sm:justify-end"
              }`}
            >
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-[var(--border-input-soft)] bg-white px-5 text-[14px] font-medium text-[var(--foreground-body)] transition hover:bg-[var(--surface-select)]"
                >
                  Paso anterior
                </button>
              ) : null}

              {step < 3 ? (
                <button
                  type="button"
                  disabled={!stepComplete}
                  onClick={goNext}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-[14px] font-semibold text-white transition sm:ml-auto ${
                    stepComplete
                      ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                      : "cursor-not-allowed bg-[var(--accent-disabled)]"
                  }`}
                >
                  Siguiente paso
                  <HiArrowRight size={18} aria-hidden />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formComplete}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-[14px] font-semibold text-white transition sm:ml-auto ${
                    formComplete
                      ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
                      : "cursor-not-allowed bg-[var(--accent-disabled)]"
                  }`}
                >
                  Enviar solicitud para {pet.name}
                  <FaPaw aria-hidden />
                </button>
              )}
            </footer>
          </form>
        </div>
      </article>

      <AdoptionFormTrustFooter />
    </>
  );
};

export default AdoptionForm;
