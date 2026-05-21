export const adoptionFieldGapClassName = "mt-1.5";

export const adoptionLabelClassName =
  "text-sm font-medium text-[var(--neutral-700)]";

export const adoptionInputWrapClassName =
  "group flex w-full items-center gap-3 rounded-xl border-[1.5px] border-[var(--border-neutral)] bg-[#fafafa] px-4 py-3 transition-all duration-200 focus-within:border-[var(--accent)] focus-within:bg-white focus-within:shadow-[0_0_0_3px_var(--accent-ring-10)]";

export const adoptionInputInnerClassName =
  "min-w-0 flex-1 bg-transparent text-sm text-[var(--foreground-body)] outline-none placeholder:text-[var(--placeholder)]";

export const adoptionInputIconClassName =
  "shrink-0 text-[var(--neutral-400)] transition-colors duration-200 group-focus-within:text-[var(--accent)]";

export const adoptionTextareaWrapClassName =
  "group flex w-full gap-3 rounded-xl border-[1.5px] border-[var(--border-neutral)] bg-[#fafafa] px-4 py-3 transition-all duration-200 focus-within:border-[var(--accent)] focus-within:bg-white focus-within:shadow-[0_0_0_3px_var(--accent-ring-10)]";

export const adoptionTextareaInnerClassName =
  "min-h-[5rem] w-full flex-1 resize-none bg-transparent text-sm leading-relaxed text-[var(--foreground-body)] outline-none placeholder:text-[var(--placeholder)]";

export const adoptionSelectTriggerClassName =
  "group flex w-full items-center gap-3 rounded-xl border-[1.5px] border-[var(--border-neutral)] bg-[#fafafa] px-4 py-3 text-left text-sm text-[var(--foreground-body)] outline-none transition-all duration-200 data-placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_3px_var(--accent-ring-10)]";

export function adoptionRadioCardClass(selected: boolean) {
  return `flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3 text-sm transition-all duration-200 ${
    selected
      ? "border-[var(--accent)] bg-white text-[var(--foreground-body)] shadow-[0_0_0_3px_var(--accent-ring-10)]"
      : "border-[var(--border-neutral)] bg-[#fafafa] text-[var(--neutral-600)] hover:border-[var(--accent-border-hover)]"
  }`;
}

export const adoptionStepGridClassName = "grid grid-cols-1 gap-4 md:grid-cols-2";

export const adoptionStepStackClassName = "flex flex-col gap-4";
