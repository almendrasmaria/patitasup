type Props = {
  title: string;
  subtitle: string;
  variant?: "home" | "page";
};

const PageHero = ({ title, subtitle, variant = "page" }: Props) => {
  const isHome = variant === "home";

  return (
    <header className="text-center text-white">
      <h1
        className={
          isHome
            ? "text-[54px] font-semibold leading-[1] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)] sm:text-[80px]"
            : "text-[36px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.05] drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
        }
      >
        {title}
      </h1>

      <p
        className={
          isHome
            ? "mx-auto mt-4 max-w-2xl text-[14px] text-white/90 sm:text-base md:text-lg leading-relaxed"
            : "mt-4 mx-auto max-w-[28rem] sm:max-w-[32rem] text-white/90 text-[15px] sm:text-[16px] lg:text-base leading-relaxed"
        }
      >
        {subtitle}
      </p>
    </header>
  );
};

export default PageHero;