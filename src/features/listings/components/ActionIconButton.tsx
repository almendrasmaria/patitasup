"use client";

type ActionIconButtonProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function ActionIconButton({
  label,
  onClick,
  children,
  className,
  disabled = false,
}: ActionIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl border border-transparent bg-white p-2 text-[var(--placeholder)] shadow-sm ring-1 ring-black/5 transition duration-150 hover:-translate-y-px hover:bg-[var(--surface-hover-light)] hover:text-[var(--neutral-600)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--warm-orange)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
