import { FiMail, FiClock, FiUserPlus } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const ContactInfoCard = () => {
  return (
    <article className="rounded-[24px] bg-white p-7 shadow-[var(--shadow-contact-card)] ring-1 ring-black/5 sm:p-9">
      <h3 className="text-lg font-bold text-black/85 sm:text-xl">Información de contacto</h3>

      <div className="mt-7 space-y-6">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--contact-icon-muted-bg)] text-[var(--contact-icon-muted-fg)]">
            <FiMail className="text-xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black/75">Correo electrónico</p>
            <p className="mt-0.5 text-sm text-black/55">patitasup.ar@gmail.com</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--contact-social-bg)] text-[var(--contact-social-fg)]">
            <FaInstagram className="text-xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black/75">Redes sociales</p>
            <a
              href="https://www.instagram.com/patitasup.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-block text-sm font-medium text-black/55 hover:underline"
            >
              @patitasup.ar
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--contact-hours-bg)] text-[var(--contact-hours-fg)]">
            <FiClock className="text-xl" />
          </div>
          <div>
            <p className="text-sm font-semibold text-black/75">Horarios de atención</p>
            <p className="mt-0.5 text-sm text-black/55">Lun a Vie: 9:00 – 18:00</p>
            <p className="text-sm text-black/55">Sáb: 10:00 – 14:00</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-px w-full bg-black/5" />
        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[var(--contact-panel-bg)] px-5 py-5 ring-1 ring-[var(--contact-panel-ring)]">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--contact-panel-chip-bg)] text-[var(--warm-orange)]">
            <FiUserPlus className="text-[22px]" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-black/80">¿Eres un refugio?</p>
            <a
              href="/register"
              className="mt-1 inline-block text-sm font-semibold text-[var(--warm-orange)] hover:underline"
            >
              Registrate como socio aquí
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactInfoCard;
