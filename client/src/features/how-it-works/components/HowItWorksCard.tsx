import type { HowItWorksCardData } from "../model";
import HowItWorksStep from "./HowItWorksStep";

type Props = {
  data: HowItWorksCardData;
};

const HowItWorksCard = ({ data }: Props) => {
  const TagIcon = data.tag.icon;

  const highlightColor =
    data.tone === "blue" ? "text-[#2F55FF]" : "text-[#FF6A1A]";

  const tagStyles =
    data.tone === "blue"
      ? "bg-[#EEF2FF] text-[#2F55FF]"
      : "bg-[#FFF2EA] text-[#FF6A1A]";

  const buttonStyles =
    data.cta.variant === "primary"
      ? "bg-[#5A7BFF] text-white hover:brightness-95"
      : "bg-white text-black/70 ring-1 ring-black/10 hover:bg-black/5";

  return (
    <article className="rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)] ring-1 ring-black/5 p-6 sm:p-7">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold ${tagStyles}`}>
        <TagIcon className="text-[14px]" />
        {data.tag.label}
      </div>

      <h3 className="mt-4 text-[22px] sm:text-[26px] font-bold text-black/85 leading-tight">
        {data.title} <span className={highlightColor}>{data.highlight}</span>
      </h3>

      <p className="mt-2 text-sm text-black/55">{data.subtitle}</p>

      <div className="mt-6 space-y-5">
        {data.steps.map((s, idx) => (
          <HowItWorksStep
            key={s.title}
            step={s}
            tone={data.tone}
            showLine={idx !== data.steps.length - 1}
          />
        ))}
      </div>

      <a href={data.cta.href} className={`mt-7 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition ${buttonStyles}`}>
        {data.cta.label}
      </a>
    </article>
  );
};

export default HowItWorksCard;


