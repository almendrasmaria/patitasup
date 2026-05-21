"use client";

import AdoptionFormField from "../AdoptionFormField";
import AdoptionSelectField from "../AdoptionSelectField";
import type { AdoptionFormData } from "../adoptionFormTypes";
import { adoptionRadioCardClass, adoptionTextareaClassName } from "../adoptionFormStyles";

type Props = {
  form: AdoptionFormData;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

export default function HomeStep({ form, onChange, onField }: Props) {
  return (
    <section className="space-y-5" aria-label="Tu hogar">
      <AdoptionSelectField
        label="Tipo de vivienda"
        required
        placeholder="Seleccioná una opción"
        value={form.housingType}
        onValueChange={(value) => onField("housingType", value)}
        options={[
          { label: "Departamento", value: "departamento" },
          { label: "Casa", value: "casa" },
          { label: "PH", value: "ph" },
        ]}
      />

      <AdoptionFormField label="¿Tenés redes o protección en balcones y ventanas?" required>
        <fieldset>
          <legend className="sr-only">Protección en balcones y ventanas</legend>
          <div className="grid gap-3 sm:grid-cols-2">
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
        <textarea
          id="otherPets"
          name="otherPets"
          rows={4}
          value={form.otherPets}
          onChange={onChange("otherPets")}
          placeholder="Opcional"
          className={adoptionTextareaClassName}
        />
      </AdoptionFormField>
    </section>
  );
}
