import Badge from "./Badge";

type Props = {
  title: string;
  subtitle: string;
  variant?: "home" | "page";
  badgeText?: string;
};

const Hero = ({ title, subtitle, variant = "page", badgeText }: Props) => {
  const isHome = variant === "home";

  return (
    <header className="flex flex-col items-center text-center text-white">
      {badgeText && (
        <div className="mb-4">
          <Badge text={badgeText} />
        </div>
      )}

      <h1
        className={
          isHome
            ? "mt-6 text-balance font-extrabold leading-[1.05] tracking-tight text-[40px] sm:text-[48px] lg:text-[64px]"
            : "text-[36px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.05] drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
        }
      >
        {title}
      </h1>

      <p
        className={
          isHome
            ? "mt-5 max-w-2xl text-pretty leading-7 text-white/85 text-[15px] sm:text-[16px] lg:text-[18px]"
            : "mt-4 mx-auto max-w-[28rem] sm:max-w-[32rem] text-white/90 text-[15px] sm:text-[16px] lg:text-base leading-relaxed"
        }
      >
        {subtitle}
      </p>
    </header>
  );
};

export default Hero;