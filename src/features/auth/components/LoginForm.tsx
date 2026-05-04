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
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-2xl bg-[#7061F0] shadow-[0_12px_30px_rgba(112,97,240,0.25)]">
          <Image
            src="/logo.webp"
            alt="PatitasUp"
            width={56}
            height={56}
            className="h-20 w-20"
          />
        </div>
      </div>

      <div className="mb-7">
        <h1 className="text-[32px] font-semibold leading-[1.1] text-[#242424] md:text-[36px]">
          Bienvenido de nuevo
        </h1>

        <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[#6b7280]">
          Ingresá a tu cuenta para gestionar publicaciones y seguir ayudando a
          más gatos a encontrar una familia.
        </p>
      </div>

      <div className="mb-7 h-px w-full bg-[#ececf2]" />

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={next} />

        {statusMessage ? (
          <div
            className="rounded-md border border-[#ef4444]/20 bg-[#fef2f2] px-4 py-3 text-[14px] text-[#b91c1c]"
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
            className="mb-2 block text-[14px] font-medium text-[#374151]"
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

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-[13px] font-medium text-[#7061F0] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-[46px] w-full rounded-md bg-[#7061F0] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          {pending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-[#4b5563]">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/register"
          className="font-medium text-[#7061F0] hover:underline"
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

export default LoginForm;