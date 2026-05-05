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
      className="rounded-lg p-2 text-[#9ca3af] transition hover:bg-black/[0.04] hover:text-[#6b7280] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7061F0]"
    >
      {children}
    </button>
  );
}
