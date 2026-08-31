import Badge from "@/components/ui/Badge";

type HeroButton = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

type Props = {
  title: string;
  subtitle: string;
  variant?: "home" | "page";
  badgeText?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
};

const Hero = ({
  title,
  subtitle,
  variant = "page",
  badgeText,
  primaryButton,
  secondaryButton,
}: Props) => {
  const isHome = variant === "home";

  return (
    <div
      className={
        isHome
          ? "relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-14 pb-20 text-center sm:px-6 sm:pt-16 sm:pb-24 lg:px-8 lg:pt-20 lg:pb-28"
          : "relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-4 pb-6 text-center sm:px-6 sm:pt-6 sm:pb-8 lg:px-8"
      }
    >
      {isHome && (
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      )}

      <header className="flex flex-col items-center text-center text-white">
        {badgeText && (
          <div className="mb-4">
            <Badge text={badgeText} variant="onAccent" />
          </div>
        )}

        <h1
          className={
            isHome
              ? "mt-6 text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[48px] lg:text-[64px]"
              : "text-balance text-[30px] font-bold leading-[1.1] tracking-tight sm:text-[34px] lg:text-[40px]"
          }
        >
          {title}
        </h1>

        <p
          className={
            isHome
              ? "mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-white/85 sm:text-[16px] lg:text-[18px]"
              : "mt-4 max-w-2xl text-pretty text-[14px] leading-relaxed text-white/90 sm:text-[15px] lg:text-[16px]"
          }
        >
          {subtitle}
        </p>
      </header>

      {(primaryButton || secondaryButton) && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {primaryButton && (
            <button
              onClick={primaryButton.onClick}
              className="rounded-lg bg-white px-6 py-3 text-[14px] font-semibold text-[var(--warm-orange)] shadow-md shadow-black/15 transition hover:bg-white/95 active:translate-y-px"
            >
              {primaryButton.label}
            </button>
          )}

          {secondaryButton && (
            <button
              onClick={secondaryButton.onClick}
              className="rounded-lg bg-transparent px-6 py-3 text-[14px] font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10 active:translate-y-px"
            >
              {secondaryButton.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Hero;