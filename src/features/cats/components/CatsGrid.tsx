import type { Pet } from "@/features/pets/types";
import CatCard from "./CatCard";

type Props = {
  pets: Pet[];
  petFavorite?: (pet: Pet) => { active: boolean; onToggle: () => void } | undefined;
};

const CatsGrid = ({ pets, petFavorite }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {pets.map((pet) => (
        <CatCard key={pet.id} pet={pet} favorite={petFavorite?.(pet)} />
      ))}
    </div>
  );
};

export default CatsGrid;
