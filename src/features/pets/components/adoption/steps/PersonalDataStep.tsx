"use client";

import {
  HiOutlineChatAlt2,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from "react-icons/hi";

import AdoptionFormField from "../AdoptionFormField";
import AdoptionFormInput from "../AdoptionFormInput";
import AdoptionSelectField from "../AdoptionSelectField";
import { PREFERRED_CONTACT_OPTIONS } from "../adoptionFormConfig";
import { adoptionStepGridClassName, adoptionStepStackClassName } from "../adoptionFormStyles";
import type { AdoptionFormData } from "../adoptionFormTypes";

type Props = {
  form: AdoptionFormData;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

export default function PersonalDataStep({ form, onChange, onField }: Props) {
  return (
    <section className={adoptionStepStackClassName} aria-label="Tus datos de contacto">
      <div className={adoptionStepGridClassName}>
        <AdoptionFormField label="Nombre" htmlFor="firstName" required>
          <AdoptionFormInput
            id="firstName"
            name="firstName"
            icon={HiOutlineUser}
            autoComplete="given-name"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder="Tu nombre"
          />
        </AdoptionFormField>

        <AdoptionFormField label="Apellido" htmlFor="lastName" required>
          <AdoptionFormInput
            id="lastName"
            name="lastName"
            icon={HiOutlineUser}
            autoComplete="family-name"
            value={form.lastName}
            onChange={onChange("lastName")}
            placeholder="Tu apellido"
          />
        </AdoptionFormField>
      </div>

      <div className={adoptionStepGridClassName}>
        <AdoptionFormField
          label="Correo electrónico"
          htmlFor="email"
          required
          footer={
            <p className="flex items-center gap-1 text-xs text-[var(--neutral-400)]">
              <HiOutlineShieldCheck size={11} className="shrink-0 text-[var(--accent)]" aria-hidden />
              No compartimos tu correo con terceros.
            </p>
          }
        >
          <AdoptionFormInput
            id="email"
            name="email"
            type="email"
            icon={HiOutlineMail}
            autoComplete="email"
            value={form.email}
            onChange={onChange("email")}
            placeholder="correo@ejemplo.com"
          />
        </AdoptionFormField>

        <AdoptionFormField label="Teléfono" htmlFor="phone" required>
          <AdoptionFormInput
            id="phone"
            name="phone"
            type="tel"
            icon={HiOutlinePhone}
            autoComplete="tel"
            value={form.phone}
            onChange={onChange("phone")}
            placeholder="+54 11 0000-0000"
          />
        </AdoptionFormField>
      </div>

      <AdoptionFormField label="Domicilio" htmlFor="domicilio" required>
        <AdoptionFormInput
          id="domicilio"
          name="domicilio"
          icon={HiOutlineLocationMarker}
          autoComplete="street-address"
          value={form.domicilio}
          onChange={onChange("domicilio")}
          placeholder="Calle y número"
        />
      </AdoptionFormField>

      <div className={adoptionStepGridClassName}>
        <AdoptionFormField label="Barrio" htmlFor="barrio" required>
          <AdoptionFormInput
            id="barrio"
            name="barrio"
            icon={HiOutlineLocationMarker}
            value={form.barrio}
            onChange={onChange("barrio")}
            placeholder="Tu barrio"
          />
        </AdoptionFormField>

        <AdoptionSelectField
          label="Medio de contacto preferido"
          required
          icon={HiOutlineChatAlt2}
          placeholder="Seleccioná una opción"
          value={form.preferredContact}
          onValueChange={(value) => onField("preferredContact", value)}
          options={[...PREFERRED_CONTACT_OPTIONS]}
        />
      </div>
    </section>
  );
}
