import Link from "next/link";
import { FaPaw } from "react-icons/fa";

type BrandLogoTone = "dark" | "light";
type BrandLogoSize = "sm" | "md" | "lg";

type BrandLogoProps = {
  tone?: BrandLogoTone;
  size?: BrandLogoSize;
  href?: string | null;
  onClick?: () => void;
  className?: string;
  iconOnly?: boolean;
};

const SIZE_TEXT_CLASS: Record<BrandLogoSize, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-[26px] xl:text-[34px]",
};

const ICON_ONLY_SIZE_CLASS: Record<BrandLogoSize, string> = {
  sm: "text-[28px]",
  md: "text-[36px]",
  lg: "text-[64px]",
};

const TONE_TEXT_CLASS: Record<BrandLogoTone, string> = {
  dark: "text-[var(--brand-teal)]",
  light: "text-white",
};

export default function BrandLogo({
  tone = "dark",
  size = "md",
  href = "/",
  onClick,
  className,
  iconOnly = false,
}: BrandLogoProps) {
  const textColor = TONE_TEXT_CLASS[tone];

  const content = iconOnly ? (
    <FaPaw
      aria-hidden
      className={`${ICON_ONLY_SIZE_CLASS[size]} text-[var(--warm-orange)]`}
    />
  ) : (
    <span
      className={`inline-flex items-center font-extrabold lowercase leading-none tracking-tight ${SIZE_TEXT_CLASS[size]} ${textColor}`}
    >
      <span>p</span>
      <FaPaw
        aria-hidden
        className="mx-[0.02em] shrink-0 text-[var(--warm-orange)]"
      />
      <span>titas</span>
      <span className="text-[var(--warm-orange)]">up</span>
    </span>
  );

  if (!href) {
    return (
      <span className={className} aria-label="patitasup">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="patitasup, ir al inicio"
      className={`inline-flex shrink-0 items-center outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--warm-orange)] ${className ?? ""}`}
    >
      {content}
    </Link>
  );
}
