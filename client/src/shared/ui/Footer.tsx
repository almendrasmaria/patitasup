import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { useCallback } from "react";
import logo from "../../assets/logo.png";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const go = useCallback(
    (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (pathname !== to) navigate(to);

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    },
    [navigate, pathname]
  );

  return (
    <footer className="w-full border-t border-white/10 bg-[#0F172A] mt-8 sm:mt-12">
      <div className="container mx-auto px-4 md:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7061F0]">
                <img src={logo} alt="PatitasUp" className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold text-white">PatitasUp</span>
            </div>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              Conectamos gatitos rescatados con familias responsables, promoviendo la adopción responsable.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/patitasup.ar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20"
              >
                <FaInstagram className="text-lg" />
              </a>

              <a
                href="https://github.com/almendrasmaria/patitasup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/80 hover:bg-white/20"
              >
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>

          <nav className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-white/70 lg:w-auto">
            <Link to="/" onClick={go("/")} className="hover:text-white">Inicio</Link>
            <Link to="/como-funciona" onClick={go("/como-funciona")} className="hover:text-white">Cómo funciona</Link>
            <Link to="/contacto" onClick={go("/contacto")} className="hover:text-white">Contacto</Link>
            <Link to="/publicar" onClick={go("/publicar")} className="hover:text-white">Publicar</Link>
          </nav>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <p className="py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} PatitasUp · Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;