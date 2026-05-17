import { getHomeSpotlightPets } from "../lib/getHomeSpotlightPets";

import HomeFinalCtaSection from "./HomeFinalCtaSection";
import HomeHero from "./HomeHero";
import HomeProcessSection from "./HomeProcessSection";
import HomeSpotlightPetsSection from "./HomeSpotlightPetsSection";

export default async function HomeView() {
  const spotlightPets = await getHomeSpotlightPets();

  return (
    <div className="min-h-screen bg-white">
      <div>
        <HomeHero />
        <HomeSpotlightPetsSection pets={spotlightPets} />
        <HomeProcessSection />
        <HomeFinalCtaSection />
      </div>
    </div>
  );
}
