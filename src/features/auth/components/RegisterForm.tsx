"use client";

import { useActionState, useState, type HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { registerAction } from "@/features/auth/actions";
import { INITIAL_AUTH_ACTION_STATE } from "@/features/auth/types";

const RegisterForm = () => {
  const [state, formAction, pending] = useActionState(
    registerAction,
    INITIAL_AUTH_ACTION_STATE,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[520px]">
      <div className="mb-5">
        <Link href="/" className="inline-flex">
          <Image
            src="/logo.webp"
            alt="PatitasUp Logo"
            width={240}
            height={64}
            className="h-14 w-auto max-w-full object-contain object-left sm:h-16"
          />
        </Link>
      </div>

      <div className="mb-7">
        <h1 className="text-[32px] font-semibold leading-[1.1] text-[#242424] md:text-[36px]">
          Crea tu cuenta
        </h1>

        <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[#6b7280]">
          Unite a PatitasUp y empezá a publicar gatos en adopción para ayudarles
          a encontrar una familia.
        </p>
      </div>

      <div className="mb-7 h-px w-full bg-[#ececf2]" />

      <form action={formAction} className="space-y-5">
        {state.message ? (
          <div
            className={`rounded-md px-4 py-3 text-[14px] ${
              state.status === "success"
                ? "border border-[#16a34a]/20 bg-[#f0fdf4] text-[#166534]"
                : "border border-[#ef4444]/20 bg-[#fef2f2] text-[#b91c1c]"
            }`}
          >
            {state.message}
          </div>
        ) : null}

        <Input
          id="name"
          name="name"
          label="Nombre del refugio o rescatista"
          placeholder="Ej: Refugio San Roque"
          defaultValue={state.values?.name}
          autoComplete="name"
          error={state.fieldErrors?.name?.[0]}
        />

        <Input
          id="email"
          name="email"
          label="Correo electrónico"
          type="email"
          placeholder="Ej: contacto@refugio.com"
          defaultValue={state.values?.email}
          autoComplete="email"
          error={state.fieldErrors?.email?.[0]}
        />

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[14px] font-medium text-[#374151]"
          >
            Contraseña
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Al menos 8 caracteres"
              autoComplete="new-password"
              required
              minLength={8}
              aria-invalid={Boolean(state.fieldErrors?.password?.[0])}
              className="h-[48px] w-full rounded-md border border-[#d9dbe8] bg-white px-4 pr-11 text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#7061F0] focus:ring-2 focus:ring-[#7061F0]/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] transition hover:text-[#7061F0]"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {state.fieldErrors?.password?.[0] ? (
            <p className="mt-2 text-[13px] text-[#dc2626]">
              {state.fieldErrors.password[0]}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-[46px] w-full rounded-md bg-[#7061F0] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-[#4b5563]">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-[#7061F0] hover:underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
};

type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  defaultValue?: string;
  autoComplete?: string;
  error?: string;
};

const Input = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  autoComplete,
  error,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-medium text-[#374151]"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        className="h-[48px] w-full rounded-md border border-[#d9dbe8] bg-white px-4 text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#7061F0] focus:ring-2 focus:ring-[#7061F0]/15"
      />

      {error ? <p className="mt-2 text-[13px] text-[#dc2626]">{error}</p> : null}
    </div>
  );
};

export default RegisterForm;