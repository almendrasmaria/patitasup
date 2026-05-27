"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

import BrandLogo from "@/components/BrandLogo";
import { resetPasswordAction } from "@/features/auth/actions";
import { INITIAL_AUTH_ACTION_STATE } from "@/features/auth/types";

const ResetPasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    INITIAL_AUTH_ACTION_STATE,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordUpdated = state.status === "success";

  return (
    <div className="w-full max-w-[520px]">
      <div className="mb-5">
        <BrandLogo tone="dark" size="lg" iconOnly />
      </div>

      <div className="mb-7">
        <h1 className="text-[32px] font-semibold leading-[1.1] text-[var(--foreground-strong)] md:text-[36px]">
          Nueva contraseña
        </h1>

        <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[var(--neutral-500)]">
          Elegí una contraseña nueva para proteger tu cuenta y volver a ingresar
          a PatitasUp.
        </p>
      </div>

      <div className="mb-7 h-px w-full bg-[var(--border-hairline)]" />

      {passwordUpdated ? (
        <div className="space-y-5">
          <div className="rounded-md border border-[var(--success-border-soft)] bg-[var(--success-bg)] px-4 py-3 text-[14px] text-[var(--success-fg)]">
            {state.message}
          </div>

          <Link
            href="/profile"
            className="flex h-[46px] w-full items-center justify-center rounded-md bg-[var(--accent)] text-[14px] font-medium text-white transition hover:opacity-95"
          >
            Ir a mi perfil
          </Link>
        </div>
      ) : (
        <form action={formAction} className="space-y-5">
          {state.message ? (
            <div className="rounded-md border border-[var(--destructive-border-soft)] bg-[var(--destructive-bg)] px-4 py-3 text-[14px] text-[var(--destructive-strong)]">
              {state.message}
            </div>
          ) : null}

          <PasswordInput
            id="password"
            name="password"
            label="Nueva contraseña"
            placeholder="Al menos 8 caracteres"
            autoComplete="new-password"
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((prev) => !prev)}
            error={state.fieldErrors?.password?.[0]}
          />

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar contraseña"
            placeholder="Repetí la nueva contraseña"
            autoComplete="new-password"
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
            error={state.fieldErrors?.confirmPassword?.[0]}
          />

          <button
            type="submit"
            disabled={pending}
            className="h-[46px] w-full rounded-md bg-[var(--accent)] text-[14px] font-medium text-white transition hover:opacity-95"
          >
            {pending ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      )}
    </div>
  );
};

type PasswordInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  error?: string;
};

const PasswordInput = ({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  showPassword,
  onTogglePassword,
  error,
}: PasswordInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[14px] font-medium text-[var(--neutral-700)]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          minLength={8}
          aria-invalid={Boolean(error)}
          className="h-[48px] w-full rounded-md border border-[var(--border-input)] bg-white px-4 pr-11 text-[14px] text-[var(--foreground-inverse)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring-15)]"
        />

        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--placeholder)] transition hover:text-[var(--accent)]"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {error ? <p className="mt-2 text-[13px] text-[var(--destructive)]">{error}</p> : null}
    </div>
  );
};

export default ResetPasswordForm;