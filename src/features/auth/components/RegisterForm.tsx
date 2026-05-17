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
            src="/logo-dark.webp"
            alt="PatitasUp Logo"
            width={320}
            height={84}
            sizes="(max-width: 640px) 240px, 280px"
            className="aspect-[320/84] h-14 w-auto max-h-14 max-w-full object-contain object-left sm:h-16 sm:max-h-16"
          />
        </Link>
      </div>

      <div className="mb-7">
        <h1 className="text-[32px] font-semibold leading-[1.1] text-[var(--foreground-strong)] md:text-[36px]">
          Crea tu cuenta
        </h1>

        <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[var(--neutral-500)]">
          Unite a PatitasUp y empezá a publicar gatos en adopción para ayudarles
          a encontrar una familia.
        </p>
      </div>

      <div className="mb-7 h-px w-full bg-[var(--border-hairline)]" />

      <form action={formAction} className="space-y-5">
        {state.message ? (
          <div
            className={`rounded-md px-4 py-3 text-[14px] ${
              state.status === "success"
                ? "border border-[var(--success-border-soft)] bg-[var(--success-bg)] text-[var(--success-fg)]"
                : "border border-[var(--destructive-border-soft)] bg-[var(--destructive-bg)] text-[var(--destructive-strong)]"
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
            className="mb-2 block text-[14px] font-medium text-[var(--neutral-700)]"
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
              className="h-[48px] w-full rounded-md border border-[var(--border-input)] bg-white px-4 pr-11 text-[14px] text-[var(--foreground-inverse)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring-15)]"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--placeholder)] transition hover:text-[var(--accent)]"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          {state.fieldErrors?.password?.[0] ? (
            <p className="mt-2 text-[13px] text-[var(--destructive)]">
              {state.fieldErrors.password[0]}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-[46px] w-full rounded-md bg-[var(--accent)] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-[var(--neutral-600)]">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--accent)] hover:underline"
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
        className="mb-2 block text-[14px] font-medium text-[var(--neutral-700)]"
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
        className="h-[48px] w-full rounded-md border border-[var(--border-input)] bg-white px-4 text-[14px] text-[var(--foreground-inverse)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring-15)]"
      />

      {error ? <p className="mt-2 text-[13px] text-[var(--destructive)]">{error}</p> : null}
    </div>
  );
};

export default RegisterForm;