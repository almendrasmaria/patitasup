"use client";

import type { ReactNode } from "react";

import { adoptionFieldGapClassName } from "./adoptionFormStyles";

type Props = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function AdoptionFormField({
  label,
  htmlFor,
  required,
  footer,
  children,
  className = "",
}: Props) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="block text-[13px] font-medium leading-snug text-[var(--neutral-600)]"
      >
        {label} {required ? <span className="text-[var(--accent-ember)]">*</span> : null}
      </label>
      <div className={adoptionFieldGapClassName}>
        {children}
        {footer ? <div className="mt-2">{footer}</div> : null}
      </div>
    </div>
  );
}
