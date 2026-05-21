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
import type { AdoptionFormData } from "../adoptionFormTypes";

type Props = {
  form: AdoptionFormData;
  onChange: (field: keyof AdoptionFormData) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onField: <K extends keyof AdoptionFormData>(field: K, value: AdoptionFormData[K]) => void;
};

const twoColGrid = "grid grid-cols-1 gap-5 md:grid-cols-2";

export default function PersonalDataStep({ form, onChange, onField }: Props) {
  return (
    <section className="space-y-5" aria-label="Tus datos de contacto">
      <div className={twoColGrid}>
        <AdoptionFormField label="Nombre" htmlFor="firstName" required>
          <AdoptionFormInput
            id="firstName"
            name="firstName"
            icon={HiOutlineUser}
            autoComplete="given-name"
            value={form.firstName}
            onChange={onChange("firstName")}
            placeholder="Ej. María"
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
            placeholder="Ej. Pérez"
          />
        </AdoptionFormField>
      </div>

      <div className={twoColGrid}>
        <AdoptionFormField
          label="Correo electrónico"
          htmlFor="email"
          required
          footer={
            <p className="flex items-center gap-1.5 text-[12px] text-[var(--muted-foreground)]">
              <HiOutlineShieldCheck size={14} className="shrink-0 text-[var(--accent)]" aria-hidden />
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
            placeholder="maria@ejemplo.com"
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
            placeholder="Ej. 11 1234 5678"
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
          placeholder="Ej. Av. Santa Fe 1234"
        />
      </AdoptionFormField>

      <div className={twoColGrid}>
        <AdoptionFormField label="Barrio" htmlFor="barrio" required>
          <AdoptionFormInput
            id="barrio"
            name="barrio"
            icon={HiOutlineLocationMarker}
            value={form.barrio}
            onChange={onChange("barrio")}
            placeholder="Ej. Palermo"
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
