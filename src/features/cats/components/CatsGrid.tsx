import type { Cat } from "../types";
import CatCard from "./CatCard";

type Props = {
  cats: Cat[];
  catFavorite?: (cat: Cat) => { active: boolean; onToggle: () => void } | undefined;
};

const CatsGrid = ({ cats, catFavorite }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} favorite={catFavorite?.(cat)} />
      ))}
    </div>
  );
};

export default CatsGrid;
