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

  return (
    <nav className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <div className="flex w-full items-center justify-between px-4 py-5 md:px-[50px]">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PatitasUp" className="h-10 md:h-12" />
        </Link>

        <ul className="ml-auto mr-6 hidden items-center gap-6 text-sm text-white md:flex">
          <li><NavLink to="/" className="hover:opacity-80">Inicio</NavLink></li>
          <li><NavLink to="/como-funciona" className="hover:opacity-80">Cómo funciona</NavLink></li>
          <li><NavLink to="/contacto" className="hover:opacity-80">Contacto</NavLink></li>
        </ul>

        <div className="hidden items-center gap-3 text-sm md:flex">
          <Link to="/donar" className="rounded-full border border-white px-4 py-1.5 text-white hover:bg-white hover:text-[#5170ff]">Donar</Link>
          <Link to="/publicar" className="rounded-full border border-white bg-[#ff914d] px-4 py-1.5 text-white hover:bg-[#ff7a2f]">Publicar gato</Link>
        </div>

        <button className="text-3xl text-white md:hidden" onClick={() => setShowMobileMenu(true)}><FiMenu /></button>
      </div>

      <div
        className={`fixed inset-0 z-[9999] transform transition-transform duration-300 md:hidden ${
          showMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ pointerEvents: showMobileMenu ? "auto" : "none" }}
      >
        <div className="flex h-full w-full flex-col bg-[#5170ff] text-white">
          <div className="flex justify-end px-6 py-6">
            <button className="text-3xl" onClick={() => setShowMobileMenu(false)}><FiX /></button>
          </div>

          <ul className="flex flex-col gap-6 px-8 text-lg">
            <li className="border-b border-white/40 pb-3"><NavLink to="/" onClick={() => setShowMobileMenu(false)}>Inicio</NavLink></li>
            <li className="border-b border-white/40 pb-3"><NavLink to="/como-funciona" onClick={() => setShowMobileMenu(false)}>Cómo funciona</NavLink></li>
            <li className="border-b border-white/40 pb-3"><NavLink to="/contacto" onClick={() => setShowMobileMenu(false)}>Contacto</NavLink></li>
          </ul>

          <div className="mt-auto flex flex-col gap-4 px-8 pb-10 text-sm">
            <Link
              to="/donar"
              onClick={() => setShowMobileMenu(false)}
              className="w-full rounded-full border border-white py-3 text-center font-semibold text-white"
            >
              Donar
            </Link>
            <Link
              to="/registro"
              onClick={() => setShowMobileMenu(false)}
              className="w-full rounded-full bg-[#ff914d] py-3 text-center font-semibold text-white"
            >
              Publicar gato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;