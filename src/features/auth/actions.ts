"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { getDisplayName } from "@/features/auth/lib/displayName";
import { syncAuthProfile } from "@/features/auth/lib/syncAuthProfile";
import {
  INITIAL_AUTH_ACTION_STATE,
  type AuthActionState,
  type AuthFieldName,
} from "@/features/auth/types";
import { getSafeRedirectPath } from "@/lib/redirect";
import { getAbsoluteUrl } from "@/lib/site-url";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().trim().email("Ingresá un correo válido."),
  password: z.string().min(1, "Ingresá tu contraseña."),
});

const registerSchema = z.object({
  name: z.string().trim().min(2, "Ingresá un nombre de al menos 2 caracteres."),
  email: z.string().trim().email("Ingresá un correo válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

function getString(formDataEntryValue: FormDataEntryValue | null) {
  return typeof formDataEntryValue === "string" ? formDataEntryValue : "";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function mapSupabaseError(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("invalid login credentials")) {
    return "Correo o contraseña incorrectos.";
  }

  if (normalizedMessage.includes("email not confirmed")) {
    return "Confirmá tu correo antes de iniciar sesión.";
  }

  if (normalizedMessage.includes("user already registered")) {
    return "Ya existe una cuenta registrada con ese correo.";
  }

  if (normalizedMessage.includes("password should be at least")) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  return "No pudimos completar la operación. Intentá nuevamente.";
}

function buildValidationErrorState(
  fieldErrors: Partial<Record<AuthFieldName, string[]>>,
  values: AuthActionState["values"],
) {
  return {
    status: "error",
    message: "Revisá los campos marcados.",
    fieldErrors,
    values,
  } satisfies AuthActionState;
}

function buildAuthErrorState(message: string, values: AuthActionState["values"]) {
  return {
    status: "error",
    message,
    values,
  } satisfies AuthActionState;
}

export async function loginAction(
  previousState: AuthActionState = INITIAL_AUTH_ACTION_STATE,
  formData: FormData,
): Promise<AuthActionState> {
  void previousState;

  const email = normalizeEmail(getString(formData.get("email")));
  const password = getString(formData.get("password"));
  const next = getSafeRedirectPath(getString(formData.get("next")) || "/profile");

  const parsed = loginSchema.safeParse({ email, password });

  if (!parsed.success) {
    return buildValidationErrorState(parsed.error.flatten().fieldErrors, { email });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return buildAuthErrorState(mapSupabaseError(error.message), { email });
  }

  if (data.user?.email) {
    await syncAuthProfile({
      userId: data.user.id,
      email: data.user.email,
      displayName: getDisplayName(data.user.user_metadata?.display_name, data.user.email),
    });
  }

  redirect(next);
}

export async function registerAction(
  previousState: AuthActionState = INITIAL_AUTH_ACTION_STATE,
  formData: FormData,
): Promise<AuthActionState> {
  void previousState;

  const name = getString(formData.get("name")).trim();
  const email = normalizeEmail(getString(formData.get("email")));
  const password = getString(formData.get("password"));

  const parsed = registerSchema.safeParse({
    name,
    email,
    password,
  });

  if (!parsed.success) {
    return buildValidationErrorState(parsed.error.flatten().fieldErrors, {
      email,
      name,
    });
  }

  const supabase = await createSupabaseServerClient();
  const emailRedirectTo = await getAbsoluteUrl("/auth/confirm?next=/profile");
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo,
      data: {
        display_name: parsed.data.name,
      },
    },
  });

  if (error) {
    return buildAuthErrorState(mapSupabaseError(error.message), {
      email: parsed.data.email,
      name: parsed.data.name,
    });
  }

  if (!data.user?.email) {
    return buildAuthErrorState("No pudimos crear la cuenta. Intentá nuevamente.", {
      email: parsed.data.email,
      name: parsed.data.name,
    });
  }

  await syncAuthProfile({
    userId: data.user.id,
    email: data.user.email,
    displayName: getDisplayName(parsed.data.name, data.user.email),
  });

  if (data.session) {
    redirect("/profile");
  }

  return {
    status: "success",
    message: "Te enviamos un correo para confirmar tu cuenta antes de ingresar.",
    values: {
      email: parsed.data.email,
      name: parsed.data.name,
    },
  };
}