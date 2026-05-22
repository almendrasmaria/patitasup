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
import type { AdoptionFieldKey } from "../adoptionFormConfig";
import type { AdoptionFormData } from "../adoptionFormTypes";

type Props = {
  form: AdoptionFormData;
  fieldErrors?: Partial<Record<AdoptionFieldKey, string>>;
  emptyRequired?: Partial<Record<AdoptionFieldKey, true>>;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

export default function PersonalDataStep({
  form,
  fieldErrors = {},
  emptyRequired = {},
  onChange,
  onPhoneChange,
  onField,
}: Props) {
  return (
    <section className={adoptionStepStackClassName} aria-label="Tus datos de contacto">
      <div className={adoptionStepGridClassName}>
        <AdoptionFormField label="Nombre" htmlFor="firstName" required error={fieldErrors.firstName}>
          <AdoptionFormInput
            id="firstName"
            name="firstName"
            icon={HiOutlineUser}
            autoComplete="given-name"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder="Ej: María"
            error={fieldErrors.firstName}
            invalid={emptyRequired.firstName}
          />
        </AdoptionFormField>

        <AdoptionFormField label="Apellido" htmlFor="lastName" required error={fieldErrors.lastName}>
          <AdoptionFormInput
            id="lastName"
            name="lastName"
            icon={HiOutlineUser}
            autoComplete="family-name"
            value={form.lastName}
            onChange={onChange("lastName")}
            placeholder="Ej: González"
            error={fieldErrors.lastName}
            invalid={emptyRequired.lastName}
          />
        </AdoptionFormField>
      </div>

      <div className={adoptionStepGridClassName}>
        <AdoptionFormField
          label="Correo electrónico"
          htmlFor="email"
          required
          error={fieldErrors.email}
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
            placeholder="Ej: maria@email.com"
            error={fieldErrors.email}
            invalid={emptyRequired.email}
          />
        </AdoptionFormField>

        <AdoptionFormField label="Teléfono" htmlFor="phone" required error={fieldErrors.phone}>
          <AdoptionFormInput
            id="phone"
            name="phone"
            type="tel"
            icon={HiOutlinePhone}
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={onPhoneChange}
            placeholder="Ej: 11 1234 5678"
            error={fieldErrors.phone}
            invalid={emptyRequired.phone}
          />
        </AdoptionFormField>
      </div>

      <AdoptionFormField label="Domicilio" htmlFor="domicilio" required error={fieldErrors.domicilio}>
        <AdoptionFormInput
          id="domicilio"
          name="domicilio"
          icon={HiOutlineLocationMarker}
          autoComplete="street-address"
          value={form.domicilio}
          onChange={onChange("domicilio")}
          placeholder="Ej: Av. Santa Fe 1234"
          error={fieldErrors.domicilio}
          invalid={emptyRequired.domicilio}
        />
      </AdoptionFormField>

      <div className={adoptionStepGridClassName}>
        <AdoptionFormField label="Barrio" htmlFor="barrio" required error={fieldErrors.barrio}>
          <AdoptionFormInput
            id="barrio"
            name="barrio"
            icon={HiOutlineLocationMarker}
            value={form.barrio}
            onChange={onChange("barrio")}
            placeholder="Ej: Palermo"
            error={fieldErrors.barrio}
            invalid={emptyRequired.barrio}
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
          error={fieldErrors.preferredContact}
          invalid={emptyRequired.preferredContact}
        />
      </div>
    </section>
  );
}
