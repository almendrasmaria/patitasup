import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showMobileMenu]);

  return (
    <nav className="absolute top-0 left-0 w-full z-30 bg-transparent">
      <div className="w-full flex items-center justify-between px-4 md:px-[50px] py-5">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PatitasUp" className="h-10 md:h-12" />
        </Link>

        <ul className="hidden md:flex items-center gap-6 ml-auto mr-6 text-sm text-white">
          <li><NavLink to="/" className="hover:opacity-80">Inicio</NavLink></li>
          <li><NavLink to="/como-funciona" className="hover:opacity-80">Cómo funciona</NavLink></li>
          <li><NavLink to="/contacto" className="hover:opacity-80">Contacto</NavLink></li>
        </ul>

        <div className="hidden md:flex items-center gap-3 text-sm">
          <Link to="/donar" className="px-4 py-1.5 rounded-full border border-white text-white hover:bg-white hover:text-[#5170ff]">Donar</Link>
          <Link to="/publicar" className="px-4 py-1.5 rounded-full bg-[#ff914d] text-white border border-white hover:bg-[#ff7a2f]">Publicar gato</Link>
        </div>

        <button className="md:hidden text-white text-3xl" onClick={() => setShowMobileMenu(true)} aria-label="Abrir menú">
          <FiMenu />
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${showMobileMenu ? "translate-x-0" : "translate-x-full"}`} style={{ pointerEvents: showMobileMenu ? "auto" : "none" }}>
        <div className="w-full h-full bg-[#5170ff] flex flex-col text-white">
          <div className="flex justify-end px-6 py-6">
            <button className="text-3xl" onClick={() => setShowMobileMenu(false)} aria-label="Cerrar menú"><FiX /></button>
          </div>

          <ul className="flex flex-col gap-6 px-8 text-lg">
            <li className="border-b border-white/40 pb-3"><NavLink to="/" onClick={() => setShowMobileMenu(false)}>Inicio</NavLink></li>
            <li className="border-b border-white/40 pb-3"><NavLink to="/como-funciona" onClick={() => setShowMobileMenu(false)}>Cómo funciona</NavLink></li>
            <li className="border-b border-white/40 pb-3"><NavLink to="/contacto" onClick={() => setShowMobileMenu(false)}>Contacto</NavLink></li>
          </ul>

          <div className="mt-auto px-8 pb-10 flex flex-col gap-4 text-sm">
            <Link to="/donar" onClick={() => setShowMobileMenu(false)} className="w-full rounded-full border border-white text-white py-3 font-semibold text-center">Donar</Link>
            <Link to="/registro" onClick={() => setShowMobileMenu(false)} className="w-full rounded-full bg-[#ff914d] text-white py-3 font-semibold text-center">Publicar gato</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;