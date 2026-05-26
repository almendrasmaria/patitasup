"use client";

import { useActionState, type HTMLInputTypeAttribute } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { forgotPasswordAction } from "@/features/auth/actions";
import { INITIAL_AUTH_ACTION_STATE } from "@/features/auth/types";

const ForgotPasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    INITIAL_AUTH_ACTION_STATE,
  );
  const searchParams = useSearchParams();
  const linkError = searchParams.get("error");
  const fallbackMessage =
    linkError === "confirm" || linkError === "session"
      ? "El enlace expiró o ya fue usado. Pedí uno nuevo para continuar."
      : undefined;
  const statusMessage = state.message ?? fallbackMessage;

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
          Recuperá tu contraseña
        </h1>

        <p className="mt-3 max-w-[500px] text-[15px] leading-7 text-[var(--neutral-500)]">
          Ingresá el correo de tu cuenta y te enviaremos un enlace para crear
          una nueva contraseña.
        </p>
      </div>

      <div className="mb-7 h-px w-full bg-[var(--border-hairline)]" />

      <form action={formAction} className="space-y-5">
        {statusMessage ? (
          <div
            className={`rounded-md px-4 py-3 text-[14px] ${
              state.status === "success"
                ? "border border-[var(--success-border-soft)] bg-[var(--success-bg)] text-[var(--success-fg)]"
                : "border border-[var(--destructive-border-soft)] bg-[var(--destructive-bg)] text-[var(--destructive-strong)]"
            }`}
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

        <button
          type="submit"
          disabled={pending}
          className="h-[46px] w-full rounded-md bg-[var(--accent)] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          {pending ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>

      <p className="mt-7 text-center text-[14px] text-[var(--neutral-600)]">
        ¿Recordaste tu contraseña?{" "}
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

export default ForgotPasswordForm;