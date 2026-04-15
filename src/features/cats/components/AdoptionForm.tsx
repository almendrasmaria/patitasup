"use client";

import { useMemo, useState } from "react";
import * as Select from "@radix-ui/react-select";
import {
  HiCheck,
  HiChevronDown,
  HiOutlineHome,
  HiOutlineShieldCheck,
  HiOutlineUser,
} from "react-icons/hi";
import { FaHeart, FaPaw } from "react-icons/fa";
import type { Cat } from "../types";

type Props = {
  cat: Cat;
};

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  housingType: string;
  environment: string;
  protection: string;
  otherPets: string;
  reason: string;
  experience: string;
};

type SelectFieldProps = {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
};

const initialForm: FormData = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  housingType: "",
  environment: "",
  protection: "",
  otherPets: "",
  reason: "",
  experience: "",
};

const inputClassName =
  "h-14 w-full rounded-[18px] border border-[#E7E7EF] bg-white px-4 text-[15px] text-[#1E1B39] outline-none transition placeholder:text-[#A0A3B1] focus:border-[#7061F0] focus:ring-4 focus:ring-[#7061F0]/10";

const textareaClassName =
  "w-full rounded-[18px] border border-[#E7E7EF] bg-white px-4 py-3 text-[15px] text-[#1E1B39] outline-none transition placeholder:text-[#A0A3B1] focus:border-[#7061F0] focus:ring-4 focus:ring-[#7061F0]/10";

function SelectField({
  label,
  required,
  placeholder,
  value,
  onValueChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-[15px] font-medium text-[#2D325A]">
        {label} {required && <span className="text-[#F97316]">*</span>}
      </label>

      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger className="flex h-14 w-full items-center justify-between rounded-[18px] border border-[#E7E7EF] bg-white px-4 text-left text-[15px] text-[#1E1B39] outline-none transition data-placeholder:text-[#A0A3B1] focus:border-[#7061F0] focus:ring-4 focus:ring-[#7061F0]/10">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="text-[#8E93A8]">
            <HiChevronDown size={20} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={8}
            className="z-50 overflow-hidden rounded-[18px] border border-[#ECECF3] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]"
          >
            <Select.Viewport className="p-2">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex h-11 cursor-pointer items-center rounded-xl px-10 pr-4 text-[15px] text-[#1E1B39] outline-none transition hover:bg-[#F7F5FF] data-highlighted:bg-[#F7F5FF]"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-3 inline-flex items-center text-[#7061F0]">
                    <HiCheck size={18} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

const AdoptionForm = ({ cat }: Props) => {
  const [form, setForm] = useState<FormData>(initialForm);

  const handleChange =
    (field: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const personalStepDone = useMemo(() => {
    return (
      form.fullName.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.email.trim() !== "" &&
      form.address.trim() !== ""
    );
  }, [form.fullName, form.phone, form.email, form.address]);

  const homeStepDone = useMemo(() => {
    return (
      form.housingType.trim() !== "" &&
      form.environment.trim() !== "" &&
      form.protection.trim() !== ""
    );
  }, [form.housingType, form.environment, form.protection]);

  const catStepDone = useMemo(() => {
    return form.reason.trim() !== "" && form.experience.trim() !== "";
  }, [form.reason, form.experience]);

  const isFormValid = personalStepDone && homeStepDone && catStepDone;

  const radioCardClass = (selected: boolean) =>
    `flex min-h-[56px] cursor-pointer items-center gap-3 rounded-[18px] border px-4 py-3 text-[15px] transition ${
      selected
        ? "border-[#7061F0] bg-[#F7F5FF] text-[#1E1B39] ring-4 ring-[#7061F0]/10"
        : "border-[#E7E7EF] bg-white text-[#4B5563] hover:border-[#D9D3FF]"
    }`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) return;

    console.log("Solicitud enviada:", form);
  };

  return (
    <article className="rounded-[28px] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)] ring-1 ring-black/5 md:p-8">
      <div className="mb-10">
        <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-start gap-4">
          <div className="flex min-w-[72px] flex-col items-center text-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7061F0] text-xs font-semibold text-white">
              1
            </div>
            <span className="mt-2 text-xs font-medium text-[#7061F0]">
              Tus Datos
            </span>
          </div>

          <div className="mt-4 h-px w-full bg-[#E5E7EB]" />

          <div className="flex min-w-[72px] flex-col items-center text-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                homeStepDone
                  ? "bg-[#7061F0] text-white"
                  : "bg-[#EEF0F5] text-[#A7ADBC]"
              }`}
            >
              2
            </div>
            <span
              className={`mt-2 text-xs font-medium transition-colors ${
                homeStepDone ? "text-[#7061F0]" : "text-[#A7ADBC]"
              }`}
            >
              Tu Hogar
            </span>
          </div>

          <div className="mt-4 h-px w-full bg-[#E5E7EB]" />

          <div className="flex min-w-[72px] flex-col items-center text-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                catStepDone
                  ? "bg-[#7061F0] text-white"
                  : "bg-[#EEF0F5] text-[#A7ADBC]"
              }`}
            >
              3
            </div>
            <span
              className={`mt-2 text-xs font-medium transition-colors ${
                catStepDone ? "text-[#7061F0]" : "text-[#A7ADBC]"
              }`}
            >
              Sobre {cat.name}
            </span>
          </div>
        </div>
      </div>

      <form className="space-y-10" onSubmit={handleSubmit}>
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1EEFF] text-[#7061F0]">
              <HiOutlineUser size={20} />
            </div>

            <div>
              <h2 className="text-[22px] font-semibold text-[#171C3D]">
                Tus Datos
              </h2>
              <p className="text-sm text-[#7A8097]">
                Completa tu información personal para avanzar con la solicitud.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fullName" className="text-[15px] font-medium text-[#2D325A]">
              Nombre completo <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange("fullName")}
              placeholder="Ej: María González"
              className={inputClassName}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-[15px] font-medium text-[#2D325A]">
                Teléfono / WhatsApp <span className="text-[#F97316]">*</span>
              </label>
              <input
                id="phone"
                type="text"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="Ej: 11 1234 5678"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-[15px] font-medium text-[#2D325A]">
                Email <span className="text-[#F97316]">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="Ej: maria@email.com"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-[15px] font-medium text-[#2D325A]">
              Dirección y barrio <span className="text-[#F97316]">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={form.address}
              onChange={handleChange("address")}
              placeholder="Ej: Av. Santa Fe 1234, Palermo"
              className={inputClassName}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF3E6] text-[#F59E0B]">
              <HiOutlineHome size={20} />
            </div>

            <div>
              <h2 className="text-[22px] font-semibold text-[#171C3D]">
                Tu Hogar
              </h2>
              <p className="text-sm text-[#7A8097]">
                Queremos asegurarnos de que el espacio sea seguro para {cat.name}.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Tipo de vivienda"
              required
              placeholder="Selecciona una opción"
              value={form.housingType}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, housingType: value }))
              }
              options={[
                { label: "Departamento", value: "departamento" },
                { label: "Casa", value: "casa" },
                { label: "PH", value: "ph" },
              ]}
            />

            <SelectField
              label="Ambiente"
              required
              placeholder="Selecciona una opción"
              value={form.environment}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, environment: value }))
              }
              options={[
                { label: "Monoambiente", value: "monoambiente" },
                { label: "2 ambientes", value: "2" },
                { label: "3 ambientes o más", value: "3+" },
              ]}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[15px] font-medium text-[#2D325A]">
              ¿Tienes protección en balcones y ventanas? <span className="text-[#F97316]">*</span>
            </label>

            <div className="grid gap-3 md:grid-cols-2">
              <label className={radioCardClass(form.protection === "si")}>
                <input
                  type="radio"
                  name="protection"
                  value="si"
                  checked={form.protection === "si"}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, protection: e.target.value }))
                  }
                  className="h-4 w-4 accent-[#7061F0]"
                />
                <span>Sí, tengo redes</span>
              </label>

              <label className={radioCardClass(form.protection === "puedo")}>
                <input
                  type="radio"
                  name="protection"
                  value="puedo"
                  checked={form.protection === "puedo"}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, protection: e.target.value }))
                  }
                  className="h-4 w-4 accent-[#7061F0]"
                />
                <span>No, pero puedo colocarlas</span>
              </label>
            </div>

            <p className="text-xs text-[#989DB0]">
              Este requisito es importante para garantizar una adopción segura.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="otherPets" className="text-[15px] font-medium text-[#2D325A]">
              ¿Tienes otras mascotas?
            </label>
            <textarea
              id="otherPets"
              rows={4}
              value={form.otherPets}
              onChange={handleChange("otherPets")}
              placeholder="Cuéntanos si convives con otros gatos o perros y cómo es su comportamiento."
              className={textareaClassName}
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6EEFF] text-[#A855F7]">
              <FaHeart size={16} />
            </div>

            <div>
              <h2 className="text-[22px] font-semibold text-[#171C3D]">
                Sobre {cat.name}
              </h2>
              <p className="text-sm text-[#7A8097]">
                Queremos conocer tus motivaciones y tu experiencia previa.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="reason" className="text-[15px] font-medium text-[#2D325A]">
              ¿Por qué quieres adoptar a {cat.name}? <span className="text-[#F97316]">*</span>
            </label>
            <textarea
              id="reason"
              rows={5}
              value={form.reason}
              onChange={handleChange("reason")}
              placeholder={`Cuéntanos qué te enamoró de ${cat.name}, cómo imaginas su adaptación y qué tipo de hogar le darías.`}
              className={textareaClassName}
            />
          </div>

          <SelectField
            label="¿Tienes experiencia con gatos?"
            required
            placeholder="Selecciona una opción"
            value={form.experience}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, experience: value }))
            }
            options={[
              { label: "Sí, convivo actualmente con gatos", value: "actualmente" },
              { label: "Sí, tuve gatos anteriormente", value: "anteriormente" },
              { label: "Tengo algo de experiencia", value: "algo" },
              { label: "No, sería mi primera vez", value: "no" },
            ]}
          />

          <div className="flex items-start gap-3 rounded-[20px] bg-[#FFF8D8] px-4 py-4 text-sm text-[#A16207]">
            <HiOutlineShieldCheck size={18} className="mt-0.5 shrink-0" />
            <p>
              Al enviar esta solicitud te comprometes a brindar un hogar responsable,
              amoroso y seguro. Revisaremos la información y nos pondremos en contacto
              contigo dentro de las próximas 48 hs.
            </p>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex h-14 w-full items-center justify-center gap-2 rounded-[18px] text-sm font-semibold text-white transition ${
              isFormValid
                ? "bg-[#7061F0] shadow-[0_12px_28px_rgba(112,97,240,0.28)] hover:bg-[#5E50DB]"
                : "cursor-not-allowed bg-[#CFC8FF]"
            }`}
          >
            Enviar solicitud para {cat.name}
            <FaPaw />
          </button>
        </section>
      </form>
    </article>
  );
};

export default AdoptionForm;