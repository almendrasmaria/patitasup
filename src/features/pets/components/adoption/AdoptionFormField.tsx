"use client";

import type { ReactNode } from "react";

import {
  adoptionFieldErrorClassName,
  adoptionFieldGapClassName,
  adoptionLabelClassName,
} from "./adoptionFormStyles";

type Props = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  error?: string;
};

export default function AdoptionFormField({
  label,
  htmlFor,
  required,
  footer,
  children,
  className = "",
  error,
}: Props) {
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className={adoptionLabelClassName}
      >
        {label} {required ? <span className="text-[var(--accent)]">*</span> : null}
      </label>
      <div className={adoptionFieldGapClassName}>
        {children}
        {error ? (
          <p id={errorId} className={adoptionFieldErrorClassName} role="alert">
            {error}
          </p>
        ) : null}
        {footer ? <div className="mt-2">{footer}</div> : null}
      </div>
    </div>
  );
}
