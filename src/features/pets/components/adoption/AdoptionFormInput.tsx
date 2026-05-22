"use client";

import type { IconType } from "react-icons";

import {
  adoptionInputIconClassName,
  adoptionInputInnerClassName,
  adoptionInputWrapClassName,
  adoptionInputWrapErrorClassName,
} from "./adoptionFormStyles";

type Props = {
  id: string;
  name: string;
  type?: string;
  icon: IconType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  error?: string;
  invalid?: boolean;
};

export default function AdoptionFormInput({
  id,
  name,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  error,
  invalid,
}: Props) {
  const hasError = Boolean(error) || invalid;

  return (
    <div
      className={`${adoptionInputWrapClassName} ${hasError ? adoptionInputWrapErrorClassName : ""}`}
    >
      <Icon className={adoptionInputIconClassName} size={16} aria-hidden />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={hasError}
        aria-describedby={error ? `${id}-error` : undefined}
        className={adoptionInputInnerClassName}
      />
    </div>
  );
}
