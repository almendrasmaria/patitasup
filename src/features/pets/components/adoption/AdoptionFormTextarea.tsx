"use client";

import type { IconType } from "react-icons";

import {
  adoptionInputIconClassName,
  adoptionInputWrapErrorClassName,
  adoptionTextareaInnerClassName,
  adoptionTextareaWrapClassName,
} from "./adoptionFormStyles";

type Props = {
  id: string;
  name: string;
  icon?: IconType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  invalid?: boolean;
};

export default function AdoptionFormTextarea({
  id,
  name,
  icon: Icon,
  value,
  onChange,
  placeholder,
  rows = 3,
  error,
  invalid,
}: Props) {
  const hasError = Boolean(error) || invalid;

  return (
    <div
      className={`${adoptionTextareaWrapClassName} ${hasError ? adoptionInputWrapErrorClassName : ""}`}
    >
      {Icon ? <Icon className={`${adoptionInputIconClassName} mt-0.5`} size={16} aria-hidden /> : null}
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={error ? `${id}-error` : undefined}
        className={adoptionTextareaInnerClassName}
      />
    </div>
  );
}
