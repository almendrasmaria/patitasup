import HomeHero from "./HomeHero";
import HomeFinalCtaSection from "./HomeFinalCtaSection";
import HomeProcessSection from "./HomeProcessSection";

export default function HomeView() {
  return (
    <div className="min-h-screen bg-white">
      <div>
        <HomeHero />
        <HomeProcessSection />
        <HomeFinalCtaSection />
      </div>
    </div>
  );
}
