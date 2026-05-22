"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaPaw } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

import type { Pet } from "@/features/pets/types";

import AdoptionFormCardIntro from "./AdoptionFormCardIntro";
import AdoptionFormStepper from "./AdoptionFormStepper";
import AdoptionFormSuccess from "./AdoptionFormSuccess";
import AdoptionFormTrustFooter from "./AdoptionFormTrustFooter";
import { isAdoptionFormComplete } from "./adoptionFormConfig";
import {
  getAdoptionStepErrors,
  getEmptyRequiredFields,
  isAdoptionStepComplete,
  sanitizePhoneInput,
} from "./adoptionFormValidation";
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

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 30 : -30 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -30 : 30 }),
};

const AdoptionForm = ({ pet }: Props) => {
  const [form, setForm] = useState<AdoptionFormData>(INITIAL_ADOPTION_FORM);
  const [step, setStep] = useState<AdoptionFormStep>(1);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [validationStep, setValidationStep] = useState<AdoptionFormStep | null>(null);

  const showErrors = validationStep === step;
  const formComplete = useMemo(() => isAdoptionFormComplete(form), [form]);
  const stepErrors = useMemo(() => getAdoptionStepErrors(step, form), [step, form]);
  const emptyRequired = useMemo(
    () => (showErrors ? getEmptyRequiredFields(step, form) : {}),
    [showErrors, step, form],
  );
  const visibleErrors = showErrors ? stepErrors : {};

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

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      phone: sanitizePhoneInput(event.target.value),
    }));
  };

  const goNext = () => {
    if (step >= 3) return;

    setValidationStep(step);
    if (!isAdoptionStepComplete(step, form)) return;

    setValidationStep(null);
    setDirection(1);
    setStep((prev) => (prev + 1) as AdoptionFormStep);
  };

  const goBack = () => {
    if (step <= 1) return;
    setValidationStep(null);
    setDirection(-1);
    setStep((prev) => (prev - 1) as AdoptionFormStep);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationStep(3);
    if (!isAdoptionStepComplete(3, form) || !formComplete) return;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <article className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card-soft)] ring-1 ring-black/[0.06]">
          <div className="h-2.5 bg-[var(--accent)]" aria-hidden />
          <div className="p-6 sm:p-8">
            <AdoptionFormSuccess petName={pet.name} />
          </div>
        </article>
        <AdoptionFormTrustFooter />
      </>
    );
  }

  return (
    <>
      <article className="overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card-soft)] ring-1 ring-black/[0.06]">
        <div className="h-2.5 bg-[var(--accent)]" aria-hidden />

        <div className="p-6 sm:p-8">
          <AdoptionFormCardIntro petName={pet.name} />
          <AdoptionFormStepper currentStep={step} petName={pet.name} />

          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {step === 1 ? (
                  <PersonalDataStep
                    form={form}
                    fieldErrors={visibleErrors}
                    emptyRequired={emptyRequired}
                    onChange={handleChange}
                    onPhoneChange={handlePhoneChange}
                    onField={handleField}
                  />
                ) : null}
                {step === 2 ? (
                  <HomeStep
                    form={form}
                    fieldErrors={visibleErrors}
                    emptyRequired={emptyRequired}
                    onChange={handleChange}
                    onField={handleField}
                  />
                ) : null}
                {step === 3 ? (
                  <PetStep
                    petName={pet.name}
                    form={form}
                    fieldErrors={visibleErrors}
                    emptyRequired={emptyRequired}
                    onChange={handleChange}
                    onField={handleField}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            <footer className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-xl border-[1.5px] border-[var(--border-neutral)] bg-[#f3f4f6] px-5 py-2.5 text-sm font-medium text-[var(--neutral-500)] transition-colors duration-200 hover:bg-[var(--divider)]"
                >
                  <HiArrowLeft size={16} aria-hidden />
                  Volver
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={goNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, var(--warm-orange-light) 0%, var(--accent) 100%)",
                    boxShadow: "0 4px 15px color-mix(in srgb, var(--accent) 35%, transparent)",
                  }}
                >
                  Siguiente paso
                  <HiArrowRight size={16} aria-hidden />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, var(--warm-orange-light) 0%, var(--accent) 100%)",
                    boxShadow: "0 4px 15px color-mix(in srgb, var(--accent) 35%, transparent)",
                  }}
                >
                  Enviar solicitud
                  <FaPaw size={16} aria-hidden />
                </motion.button>
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
