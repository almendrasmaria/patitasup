"use client";

import { HiOutlineShieldCheck } from "react-icons/hi";

import AdoptionFormField from "../AdoptionFormField";
import AdoptionSelectField from "../AdoptionSelectField";
import { ALONE_HOURS_OPTIONS } from "../adoptionFormConfig";
import type { AdoptionFormData } from "../adoptionFormTypes";
import { adoptionTextareaClassName } from "../adoptionFormStyles";

type Props = {
  petName: string;
  form: AdoptionFormData;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

export default function PetStep({ petName, form, onChange, onField }: Props) {
  return (
    <section className="space-y-5" aria-label={`Sobre ${petName}`}>
      <AdoptionFormField
        label={`¿Por qué querés adoptar a ${petName}?`}
        htmlFor="reason"
        required
      >
        <textarea
          id="reason"
          name="reason"
          rows={5}
          value={form.reason}
          onChange={onChange("reason")}
          placeholder="Contanos brevemente"
          className={adoptionTextareaClassName}
        />
      </AdoptionFormField>

      <AdoptionSelectField
        label="¿Cuántas horas por día estaría solo/a en casa?"
        required
        placeholder="Seleccioná una opción"
        value={form.aloneHoursPerDay}
        onValueChange={(value) => onField("aloneHoursPerDay", value)}
        options={[...ALONE_HOURS_OPTIONS]}
      />

      <div className="flex items-start gap-3 rounded-2xl bg-[var(--warning-bg)] px-4 py-4 text-sm leading-relaxed text-[var(--warning-fg)]">
        <HiOutlineShieldCheck size={18} className="mt-0.5 shrink-0" aria-hidden />
        <p>
          Al enviar esta solicitud te comprometés a brindar un hogar responsable, amoroso y seguro. Revisaremos la
          información y nos pondremos en contacto dentro de las próximas 48 hs.
        </p>
      </div>
    </section>
  );
}
