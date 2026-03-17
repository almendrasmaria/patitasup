import Badge from "@/shared/ui/Badge";

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
          ? "relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-32 pb-24 text-center sm:px-6 sm:pt-36 sm:pb-28 lg:px-8"
          : "relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-10 pb-12 text-center sm:px-6 sm:pt-12 sm:pb-14 lg:px-8"
      }
    >
      {isHome && (
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      )}

      <header className="flex flex-col items-center text-center text-white">
        {badgeText && (
          <div className="mb-4">
            <Badge text={badgeText} />
          </div>
        )}

        <h1
          className={
            isHome
              ? "mt-6 text-balance text-[40px] font-extrabold leading-[1.05] tracking-tight sm:text-[48px] lg:text-[64px]"
              : "text-balance text-[36px] font-semibold leading-[1.05] sm:text-[40px] lg:text-[44px]"
          }
        >
          {title}
        </h1>

        <p
          className={
            isHome
              ? "mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-white/85 sm:text-[16px] lg:text-[18px]"
              : "mt-4 max-w-3xl text-pretty text-[15px] leading-relaxed text-white/90 sm:text-[16px] lg:text-base"
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
              className="rounded-lg bg-white px-6 py-3 text-[14px] font-semibold text-[#7061F0] shadow-md shadow-black/15 transition hover:bg-white/95 active:translate-y-[1px]"
            >
              {primaryButton.label}
            </button>
          )}

          {secondaryButton && (
            <button
              onClick={secondaryButton.onClick}
              className="rounded-lg bg-transparent px-6 py-3 text-[14px] font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/10 active:translate-y-[1px]"
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