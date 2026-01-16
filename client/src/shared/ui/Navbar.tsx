import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showMobileMenu]);

  return (
    <nav className="sticky top-0 left-0 w-full z-20 bg-white shadow-sm">
      <div className="w-full flex justify-between items-center h-16 px-4 md:px-[50px]">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="PatitasUp" className="h-10 md:h-12 object-contain" />
        </Link>

        <ul className="hidden md:flex gap-6 text-gray-800 ml-auto mr-6 text-sm">
          <li><NavLink to="/" className="hover:text-[#5170FF] transition">Inicio</NavLink></li>
          <li><NavLink to="/como-funciona" className="hover:text-[#5170FF] transition">Cómo funciona</NavLink></li>
          <li><NavLink to="/contacto" className="hover:text-[#5170FF] transition">Contacto</NavLink></li>
        </ul>

        <div className="hidden md:flex items-center gap-3 text-sm">
          <Link to="/registro" className="px-4 py-1.5 rounded-full font-semibold border border-[#FF914D] text-[#FF914D] hover:bg-[#FF914D] hover:text-white">Crear cuenta</Link>
          <Link to="/login" className="px-4 py-1.5 rounded-full font-semibold bg-[#5170FF] text-white hover:bg-[#3f5de0]">Iniciar sesión</Link>
        </div>

        <button className="md:hidden text-gray-800 text-3xl" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {showMobileMenu && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col gap-0 text-gray-800 px-6 py-6 text-base">
            <li className="py-3 border-b border-gray-300"><NavLink onClick={() => setShowMobileMenu(false)} to="/">Inicio</NavLink></li>
            <li className="py-3 border-b border-gray-300"><NavLink onClick={() => setShowMobileMenu(false)} to="/como-funciona">Cómo funciona</NavLink></li>
            <li className="py-3 border-b border-gray-300"><NavLink onClick={() => setShowMobileMenu(false)} to="/contacto">Contacto</NavLink></li>
          </ul>
          <div className="flex flex-col gap-3 px-6 py-6 text-sm">
            <Link onClick={() => setShowMobileMenu(false)} to="/registro" className="w-full bg-[#FF914D] text-white px-4 py-2 rounded-full font-semibold text-center hover:bg-[#FF6F3C]">
              Crear cuenta
            </Link>
            <Link onClick={() => setShowMobileMenu(false)} to="/login" className="w-full bg-[#5170FF] text-white px-4 py-2 rounded-full font-semibold text-center hover:bg-[#3f5de0]">
              Iniciar sesión
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;