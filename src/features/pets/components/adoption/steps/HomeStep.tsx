"use client";

import { FaPaw } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";

import AdoptionFormField from "../AdoptionFormField";
import AdoptionFormTextarea from "../AdoptionFormTextarea";
import AdoptionSelectField from "../AdoptionSelectField";
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
        options={[
          { label: "Departamento", value: "departamento" },
          { label: "Casa", value: "casa" },
          { label: "PH", value: "ph" },
        ]}
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
            <label className={adoptionRadioCardClass(form.protection === "si")}>
              <input
                type="radio"
                name="protection"
                value="si"
                checked={form.protection === "si"}
                onChange={(e) => onField("protection", e.target.value)}
                className="h-4 w-4 shrink-0 accent-[var(--accent)]"
              />
              <span>Sí, ya las tengo</span>
            </label>

            <label className={adoptionRadioCardClass(form.protection === "puedo")}>
              <input
                type="radio"
                name="protection"
                value="puedo"
                checked={form.protection === "puedo"}
                onChange={(e) => onField("protection", e.target.value)}
                className="h-4 w-4 shrink-0 accent-[var(--accent)]"
              />
              <span>No, pero puedo colocarlas</span>
            </label>
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
