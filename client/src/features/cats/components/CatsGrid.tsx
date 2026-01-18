import type { Cat } from "../model";
import CatCard from "./CatCard";

type Props = {
  cats: Cat[];
};

const CatsGrid = ({ cats }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

export default CatsGrid;