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
};

type SizeTokens = {
  icon: string;
  paw: string;
  text: string;
  gap: string;
};

const SIZE_TOKENS: Record<BrandLogoSize, SizeTokens> = {
  sm: {
    icon: "h-7 w-7 rounded-lg",
    paw: "text-[14px]",
    text: "text-base",
    gap: "gap-2",
  },
  md: {
    icon: "h-9 w-9 rounded-xl",
    paw: "text-[18px]",
    text: "text-xl",
    gap: "gap-2.5",
  },
  lg: {
    icon: "h-12 w-12 rounded-2xl",
    paw: "text-[24px]",
    text: "text-[28px]",
    gap: "gap-3",
  },
};

const TONE_TEXT_CLASS: Record<BrandLogoTone, string> = {
  dark: "text-[var(--foreground-strong)]",
  light: "text-white",
};

export default function BrandLogo({
  tone = "dark",
  size = "md",
  href = "/",
  onClick,
  className,
}: BrandLogoProps) {
  const tokens = SIZE_TOKENS[size];
  const textColor = TONE_TEXT_CLASS[tone];

  const content = (
    <span className={`inline-flex items-center ${tokens.gap}`}>
      <span
        aria-hidden
        className={`${tokens.icon} inline-flex shrink-0 items-center justify-center bg-[var(--warm-orange)] text-white shadow-sm`}
      >
        <FaPaw className={tokens.paw} />
      </span>
      <span className={`font-bold leading-none tracking-tight ${tokens.text} ${textColor}`}>
        Patitas<span className="text-[var(--warm-orange)]">Up</span>
      </span>
    </span>
  );

  if (!href) {
    return (
      <span className={className} aria-label="PatitasUp">
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="PatitasUp, ir al inicio"
      className={`inline-flex shrink-0 items-center outline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--warm-orange)] ${className ?? ""}`}
    >
      {content}
    </Link>
  );
}
