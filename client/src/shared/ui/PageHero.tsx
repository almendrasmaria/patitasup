type Props = {
  title: string;
  subtitle: string;
};

const PageHero = ({ title, subtitle }: Props) => {
  return (
    <header className="text-center text-white">
      <h1 className="text-[36px] sm:text-[40px] lg:text-[44px] font-semibold leading-[1.05] drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
        {title}
      </h1>

      <p className="mt-4 mx-auto max-w-[28rem] sm:max-w-[32rem] text-white/90 text-[15px] sm:text-[16px] lg:text-base leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
};

export default PageHero;