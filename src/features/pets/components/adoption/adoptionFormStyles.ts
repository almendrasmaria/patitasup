export const adoptionFieldGapClassName = "mt-2.5";

export const adoptionInputWrapClassName =
  "flex h-11 w-full items-center gap-2.5 rounded-lg border border-[var(--border-input-soft)] bg-[var(--surface-select)] px-3 transition focus-within:border-[var(--accent)] focus-within:ring-2 focus-within:ring-[var(--accent-ring-10)]";

export const adoptionInputInnerClassName =
  "min-w-0 flex-1 bg-transparent text-[14px] text-[var(--foreground-body)] outline-none placeholder:text-[var(--placeholder-soft)]";

export const adoptionInputIconClassName = "shrink-0 text-[var(--caption-icon)]";

export const adoptionTextareaClassName =
  "min-h-[120px] w-full resize-y rounded-lg border border-[var(--border-input-soft)] bg-[var(--surface-select)] px-3 py-3 text-[14px] leading-relaxed text-[var(--foreground-body)] outline-none transition placeholder:text-[var(--placeholder-soft)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring-10)]";

export const adoptionSelectTriggerClassName =
  "flex h-11 w-full items-center gap-2.5 rounded-lg border border-[var(--border-input-soft)] bg-[var(--surface-select)] px-3 text-left text-[14px] text-[var(--foreground-body)] outline-none transition data-placeholder:text-[var(--placeholder-soft)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-ring-10)]";

export function adoptionRadioCardClass(selected: boolean) {
  return `flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-3 text-[14px] transition ${
    selected
      ? "border-[var(--accent)] bg-[var(--accent-bg-subtle)] text-[var(--foreground-body)] ring-2 ring-[var(--accent-ring-10)]"
      : "border-[var(--border-input-soft)] bg-[var(--surface-select)] text-[var(--neutral-600)] hover:border-[var(--accent-border-hover)]"
  }`;
}
