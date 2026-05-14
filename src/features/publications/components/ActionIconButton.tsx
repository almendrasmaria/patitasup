"use client";

type ActionIconButtonProps = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function ActionIconButton({ label, onClick, children }: ActionIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="cursor-pointer rounded-lg p-2 text-[var(--placeholder)] transition hover:bg-black/4 hover:text-[var(--neutral-500)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--warm-orange)]"
    >
      {children}
    </button>
  );
}
