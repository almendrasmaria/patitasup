"use client";

import type { IconType } from "react-icons";

import {
  adoptionInputIconClassName,
  adoptionInputInnerClassName,
  adoptionInputWrapClassName,
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
}: Props) {
  return (
    <div className={adoptionInputWrapClassName}>
      <Icon className={adoptionInputIconClassName} size={18} aria-hidden />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={adoptionInputInnerClassName}
      />
    </div>
  );
}
