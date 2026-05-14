import { FiMail, FiClock, FiUserPlus } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

const ContactInfoCard = () => {
  return (
    <article className="rounded-[22px] bg-white p-6 shadow-[var(--shadow-contact-card)] ring-1 ring-black/5 sm:p-7">
      <h3 className="text-[18px] font-bold text-black/85">Información de contacto</h3>

      <div className="mt-6 space-y-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--contact-icon-muted-bg)] text-[var(--contact-icon-muted-fg)]">
            <FiMail className="text-[18px]" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-black/75">Correo electrónico</p>
            <p className="text-[13px] text-black/55">patitasup.ar@gmail.com</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--contact-social-bg)] text-[var(--contact-social-fg)]">
            <FaInstagram className="text-[18px]" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-black/75">Redes sociales</p>
            <a
              href="https://www.instagram.com/patitasup.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-[13px] font-medium text-black/55 hover:underline"
            >
              @patitasup.ar
            </a>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--contact-hours-bg)] text-[var(--contact-hours-fg)]">
            <FiClock className="text-[18px]" />
          </div>
          <div>
            <p className="text-[13px] font-semibold text-black/75">Horarios de atención</p>
            <p className="text-[13px] text-black/55">Lun a Vie: 9:00 – 18:00</p>
            <p className="text-[13px] text-black/55">Sáb: 10:00 – 14:00</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-px w-full bg-black/5" />
        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[var(--contact-panel-bg)] px-4 py-4 ring-1 ring-[var(--contact-panel-ring)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--contact-panel-chip-bg)] text-[var(--warm-orange)]">
            <FiUserPlus className="text-[20px]" />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold text-black/80">¿Eres un refugio?</p>
            <a
              href="/register"
              className="mt-1 inline-block text-[13px] font-semibold text-[var(--warm-orange)] hover:underline"
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
