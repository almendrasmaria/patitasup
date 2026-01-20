import type { HowItWorksCardData } from "../model";
import HowItWorksCard from "./HowItWorksCard";

type Props = { cards: HowItWorksCardData[] };

const HowItWorksColumns = ({ cards }: Props) => {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
        {cards.map((c) => (
          <HowItWorksCard key={c.tag.label} data={c} />
        ))}
      </div>
    </div>
  );
};


export default HowItWorksColumns;