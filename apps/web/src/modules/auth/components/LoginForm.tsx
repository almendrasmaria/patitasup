"use client";

import {
  useState,
  type ChangeEvent,
  type HTMLInputTypeAttribute,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="w-full max-w-[520px]">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-2xl bg-[#7061F0] shadow-[0_12px_30px_rgba(112,97,240,0.25)]">
          <Image
            src="/logo.png"
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

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          placeholder="Ej: contacto@refugio.com"
          value={form.email}
          onChange={handleChange("email")}
          autoComplete="email"
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
              type={showPassword ? "text" : "password"}
              placeholder="Ingresá tu contraseña"
              value={form.password}
              onChange={handleChange("password")}
              autoComplete="current-password"
              required
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
        </div>

        <div className="flex justify-end">
          <Link
            href="/recuperar-contrasena"
            className="text-[13px] font-medium text-[#7061F0] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          type="submit"
          className="h-[46px] w-full rounded-md bg-[#7061F0] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          Iniciar sesión
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
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
};

const Input = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required
        className="h-[48px] w-full rounded-md border border-[#d9dbe8] bg-white px-4 text-[14px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#7061F0] focus:ring-2 focus:ring-[#7061F0]/15"
      />
    </div>
  );
};

export default LoginForm;