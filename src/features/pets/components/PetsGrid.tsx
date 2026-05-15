import type { Pet } from "@/features/pets/types";

import PetCard from "./PetCard";

type Props = {
  pets: Pet[];
  petFavorite?: (pet: Pet) => { active: boolean; onToggle: () => void } | undefined;
};

export default function PetsGrid({ pets, petFavorite }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} favorite={petFavorite?.(pet)} />
      ))}
    </div>
  );
}
