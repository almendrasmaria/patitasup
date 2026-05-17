"use client";

import { useActionState, useState, type HTMLInputTypeAttribute } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { loginAction } from "@/features/auth/actions";
import { INITIAL_AUTH_ACTION_STATE } from "@/features/auth/types";

const LoginForm = () => {
  const [state, formAction, pending] = useActionState(
    loginAction,
    INITIAL_AUTH_ACTION_STATE,
  );
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/profile";
  const confirmationError = searchParams.get("error") === "confirm";
  const statusMessage = state.message ??
    (confirmationError ? "No pudimos confirmar tu correo. Intentá nuevamente." : undefined);

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
          Bienvenido de nuevo
        </h1>

        <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[var(--neutral-500)]">
          Ingresá a tu cuenta para gestionar publicaciones y seguir ayudando a
          más gatos a encontrar una familia.
        </p>
      </div>

      <div className="mb-7 h-px w-full bg-[var(--border-hairline)]" />

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={next} />

        {statusMessage ? (
          <div
            className="rounded-md border border-[var(--destructive-border-soft)] bg-[var(--destructive-bg)] px-4 py-3 text-[14px] text-[var(--destructive-strong)]"
          >
            {statusMessage}
          </div>
        ) : null}

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
              placeholder="Ingresá tu contraseña"
              autoComplete="current-password"
              required
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

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[13px] font-medium text-[var(--accent)] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-[46px] w-full rounded-md bg-[var(--accent)] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          {pending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-[var(--neutral-600)]">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Crear cuenta
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

export default LoginForm;