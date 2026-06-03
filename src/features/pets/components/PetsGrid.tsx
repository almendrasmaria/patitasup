import type { Pet } from "@/features/pets/types";

import PetCard from "./PetCard";

type Props = {
  pets: Pet[];
  petFavorite?: (pet: Pet) => { active: boolean; onToggle: () => void } | undefined;
  onOpenDetail?: (pet: Pet) => void;
};

export default function PetsGrid({ pets, petFavorite, onOpenDetail }: Props) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          favorite={petFavorite?.(pet)}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
}
