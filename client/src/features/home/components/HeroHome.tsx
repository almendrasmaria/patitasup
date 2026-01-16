import { Link } from "react-router-dom";
import heroImg from "../../../assets/hero.png";

const HeroHome = () => {
  return (
    <section
      className="relative w-full text-white"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center z-10">
        <h1 className="text-[48px] sm:text-[80px] leading-[1] font-semibold drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]">PatitasUp</h1>
        <p className="mt-4 text-[14px] sm:text-base md:text-lg text-white/90 font-semibold max-w-2xl mx-auto">Conectamos gatitos rescatados con familias listas para brindar amor.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/gatos" className="inline-flex items-center justify-center px-12 py-3 rounded-full text-sm sm:text-base bg-[#ff914d] text-white shadow-md hover:bg-[#ff7a26] 
          hover:shadow-lg transition">
            Adoptar Felino
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center px-12 py-3 rounded-full text-sm sm:text-base border border-white text-white bg-white/10 hover:bg-[#8c52ff]/30
          hover:text-white transition">
            Publicar Felino
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
