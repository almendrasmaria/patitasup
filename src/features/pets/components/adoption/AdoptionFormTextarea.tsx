"use client";

import type { IconType } from "react-icons";

import {
  adoptionInputIconClassName,
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
};

export default function AdoptionFormTextarea({
  id,
  name,
  icon: Icon,
  value,
  onChange,
  placeholder,
  rows = 3,
}: Props) {
  return (
    <div className={adoptionTextareaWrapClassName}>
      {Icon ? <Icon className={`${adoptionInputIconClassName} mt-0.5`} size={16} aria-hidden /> : null}
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={adoptionTextareaInnerClassName}
      />
    </div>
  );
}
