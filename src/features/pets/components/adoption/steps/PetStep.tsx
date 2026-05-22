"use client";

import { HiOutlineClock, HiOutlineHeart, HiOutlineShieldCheck } from "react-icons/hi";

import AdoptionFormField from "../AdoptionFormField";
import AdoptionFormTextarea from "../AdoptionFormTextarea";
import AdoptionSelectField from "../AdoptionSelectField";
import { ALONE_HOURS_OPTIONS } from "../adoptionFormConfig";
import type { AdoptionFieldKey } from "../adoptionFormConfig";
import type { AdoptionFormData } from "../adoptionFormTypes";
import { adoptionStepStackClassName } from "../adoptionFormStyles";

type Props = {
  petName: string;
  form: AdoptionFormData;
  fieldErrors?: Partial<Record<AdoptionFieldKey, string>>;
  emptyRequired?: Partial<Record<AdoptionFieldKey, true>>;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

export default function PetStep({
  petName,
  form,
  fieldErrors = {},
  emptyRequired = {},
  onChange,
  onField,
}: Props) {
  return (
    <section className={adoptionStepStackClassName} aria-label={`Sobre ${petName}`}>
      <AdoptionFormField
        label={`¿Por qué querés adoptar a ${petName}?`}
        htmlFor="reason"
        required
        error={fieldErrors.reason}
      >
        <AdoptionFormTextarea
          id="reason"
          name="reason"
          icon={HiOutlineHeart}
          rows={3}
          value={form.reason}
          onChange={onChange("reason")}
          placeholder={`Contanos un poco sobre vos y por qué ${petName} sería el compañero ideal...`}
          error={fieldErrors.reason}
          invalid={emptyRequired.reason}
        />
      </AdoptionFormField>

      <AdoptionSelectField
        label="¿Cuántas horas por día estaría solo/a en casa?"
        required
        icon={HiOutlineClock}
        placeholder="Seleccioná una opción"
        value={form.aloneHoursPerDay}
        onValueChange={(value) => onField("aloneHoursPerDay", value)}
        options={[...ALONE_HOURS_OPTIONS]}
        error={fieldErrors.aloneHoursPerDay}
        invalid={emptyRequired.aloneHoursPerDay}
      />

      <div className="flex items-start gap-3 rounded-xl border-[1.5px] border-[var(--accent-border-20)] bg-[var(--accent-bg-subtle)] px-4 py-3 text-sm leading-relaxed text-[var(--foreground-body)]">
        <HiOutlineShieldCheck size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden />
        <p>
          Al enviar esta solicitud te comprometés a brindar un hogar responsable, amoroso y seguro. Revisaremos la
          información y nos pondremos en contacto dentro de las próximas 48 hs.
        </p>
      </div>
    </section>
  );
}
