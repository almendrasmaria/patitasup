import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const closeMenu = () => setShowMobileMenu(false);
  const linkBase = "font-medium text-white/80 hover:text-white transition";

  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <div className="w-full px-6 lg:px-16 py-5">
        <div className="relative flex w-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="PatitasUp" className="h-10 md:h-11 w-auto" />
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[15px] md:flex">
            <li><NavLink to="/" className={linkBase}>Inicio</NavLink></li>
            <li><NavLink to="/como-funciona" className={linkBase}>Cómo funciona</NavLink></li>
            <li><NavLink to="/contacto" className={linkBase}>Contacto</NavLink></li>
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <Link to="/donar" className="rounded-lg px-4 py-2 text-[15px] font-medium text-white transition hover:bg-slate-100 hover:text-slate-900">Donar</Link>
            <Link to="/publicar" className="rounded-lg bg-[#292B2D] px-4 py-2 text-[15px] font-semibold text-white hover:opacity-90 transition shadow-sm">Publicar gato</Link>
          </div>

          <button className="text-3xl text-white md:hidden" onClick={() => setShowMobileMenu(true)} aria-label="Abrir menú">
            <FiMenu />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[9999] transform transition-transform duration-300 md:hidden ${showMobileMenu ? "translate-x-0" : "translate-x-full"} bg-[#5170ff]`}
        style={{ pointerEvents: showMobileMenu ? "auto" : "none" }}
      >
        <div className="flex h-full w-full flex-col text-white">
          <div className="flex justify-end px-6 py-6">
            <button className="text-3xl" onClick={closeMenu} aria-label="Cerrar menú"><FiX /></button>
          </div>

          <ul className="flex flex-col gap-6 px-8 text-lg">
            <li className="border-b border-white/40 pb-3"><NavLink to="/" onClick={closeMenu}>Inicio</NavLink></li>
            <li className="border-b border-white/40 pb-3"><NavLink to="/como-funciona" onClick={closeMenu}>Cómo funciona</NavLink></li>
            <li className="border-b border-white/40 pb-3"><NavLink to="/contacto" onClick={closeMenu}>Contacto</NavLink></li>
          </ul>

          <div className="mt-auto flex flex-col gap-4 px-8 pb-10 text-sm">
            <Link to="/donar" onClick={closeMenu} className="w-full rounded-full border border-white py-3 text-center font-semibold text-white">Donar</Link>
            <Link to="/registro" onClick={closeMenu} className="w-full rounded-full bg-[#ff914d] py-3 text-center font-semibold text-white">Publicar gato</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;