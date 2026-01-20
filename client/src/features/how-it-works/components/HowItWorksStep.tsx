import type { HowItWorksStep as StepT } from "../model";

type Props = {
  step: StepT;
  tone: "blue" | "orange";
  showLine?: boolean;
};

const HowItWorksStep = ({ step, tone, showLine = true }: Props) => {
  const Icon = step.icon;

  const ring =
    tone === "blue"
      ? "ring-[#5A7BFF]/15 bg-[#5A7BFF]/10 text-[#2F55FF]"
      : "ring-[#FF914D]/15 bg-[#FF914D]/10 text-[#FF6A1A]";

  return (
    <div className="relative flex gap-3">
      <div className="relative flex flex-col items-center">
        <div className={`h-10 w-10 rounded-full ring-1 ${ring} flex items-center justify-center`}>
          <Icon className="text-[18px]" />
        </div>

        {showLine && (
          <div className="mt-2 w-[2px] flex-1 rounded-full bg-black/10" />
        )}
      </div>

      <div className="pt-1">
        <h4 className="font-semibold text-[15px] text-black/85">{step.title}</h4>
        <p className="mt-1 text-[12.5px] leading-relaxed text-black/55 max-w-[460px]">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default HowItWorksStep;