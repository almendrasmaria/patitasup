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
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl border border-transparent bg-white p-2 text-[#9ca3af] shadow-sm ring-1 ring-black/5 transition duration-150 hover:-translate-y-px hover:bg-[#f8f8fc] hover:text-[#4b5563] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
