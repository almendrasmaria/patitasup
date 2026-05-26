export type AuthFieldName = "name" | "email" | "password" | "confirmPassword";

export type AuthActionState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Partial<Record<AuthFieldName, string[]>>;
  values?: {
    email?: string;
    name?: string;
  };
};

export const INITIAL_AUTH_ACTION_STATE: AuthActionState = {
  status: "idle",
};