"use client";

import { FaPaw } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";

import AdoptionFormField from "../AdoptionFormField";
import AdoptionFormTextarea from "../AdoptionFormTextarea";
import AdoptionSelectField from "../AdoptionSelectField";
import { HOUSING_TYPE_OPTIONS, PROTECTION_OPTIONS } from "../adoptionFormConfig";
import type { AdoptionFieldKey } from "../adoptionFormConfig";
import type { AdoptionFormData } from "../adoptionFormTypes";
import { adoptionRadioCardClass, adoptionStepStackClassName } from "../adoptionFormStyles";

type Props = {
  form: AdoptionFormData;
  fieldErrors?: Partial<Record<AdoptionFieldKey, string>>;
  emptyRequired?: Partial<Record<AdoptionFieldKey, true>>;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

export default function HomeStep({
  form,
  fieldErrors = {},
  emptyRequired = {},
  onChange,
  onField,
}: Props) {
  return (
    <section className={adoptionStepStackClassName} aria-label="Tu hogar">
      <AdoptionSelectField
        label="Tipo de vivienda"
        required
        icon={HiOutlineHome}
        placeholder="Seleccioná una opción"
        value={form.housingType}
        onValueChange={(value) => onField("housingType", value)}
        options={[...HOUSING_TYPE_OPTIONS]}
        error={fieldErrors.housingType}
        invalid={emptyRequired.housingType}
      />

      <AdoptionFormField
        label="¿Tenés redes o protección en balcones y ventanas?"
        required
        className={
          emptyRequired.protection
            ? "rounded-xl ring-1 ring-[var(--destructive)] ring-offset-2"
            : undefined
        }
      >
        <fieldset>
          <legend className="sr-only">Protección en balcones y ventanas</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROTECTION_OPTIONS.map((option) => (
              <label key={option.value} className={adoptionRadioCardClass(form.protection === option.value)}>
                <input
                  type="radio"
                  name="protection"
                  value={option.value}
                  checked={form.protection === option.value}
                  onChange={(e) => onField("protection", e.target.value)}
                  className="h-4 w-4 shrink-0 accent-[var(--accent)]"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </AdoptionFormField>

      <AdoptionFormField label="¿Tenés otras mascotas en casa?" htmlFor="otherPets">
        <AdoptionFormTextarea
          id="otherPets"
          name="otherPets"
          icon={FaPaw}
          rows={3}
          value={form.otherPets}
          onChange={onChange("otherPets")}
          placeholder="Opcional — contanos si tenés otras mascotas"
        />
      </AdoptionFormField>
    </section>
  );
}
