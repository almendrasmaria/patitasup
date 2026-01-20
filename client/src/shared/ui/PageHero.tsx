type Props = {
  title: string;
  subtitle: string;
};

const PageHero = ({ title, subtitle }: Props) => {
  return (
    <header className="text-center text-white px-4">
      <h1 className="text-[34px] sm:text-[44px] font-semibold leading-[1.05] drop-shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
        {title}
      </h1>

      <p className="mt-4 mx-auto max-w-[32rem] text-white/85 text-[12.5px] sm:text-base leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
};

export default PageHero;