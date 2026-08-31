import { FiUser, FiMail, FiSend } from "react-icons/fi";

const ContactFormCard = () => {
  return (
    <article className="rounded-[24px] bg-white p-7 shadow-[var(--shadow-contact-card)] ring-1 ring-black/5 sm:p-9">
      <h3 className="text-lg font-bold text-black/85 sm:text-xl">Envíanos un mensaje</h3>

      <p className="mt-2 text-sm text-black/55">
        Completá el formulario y te responderemos a la brevedad.
      </p>

      <form className="mt-7 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-black/60">Nombre completo</span>
            <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-[var(--surface-select)] px-4 py-3 ring-1 ring-black/10">
              <FiUser className="shrink-0 text-black/35" />
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-black/60">Email</span>

            <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-[var(--surface-select)] px-4 py-3 ring-1 ring-black/10">
              <FiMail className="shrink-0 text-black/35" />
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
              />
            </div>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-black/60">Asunto</span>
          <div className="mt-2 rounded-xl bg-[var(--surface-select)] px-4 py-3 ring-1 ring-black/10">
            <select className="w-full bg-transparent text-sm text-black/70 outline-none">
              <option>Quiero adoptar un gatito</option>
              <option>Quiero publicar un gatito</option>
              <option>Quiero hacer una consulta</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-black/60">Mensaje</span>
          <textarea
            placeholder="Escribí aquí tu consulta..."
            className="mt-2 min-h-[160px] w-full resize-none rounded-xl bg-[var(--surface-select)] px-4 py-3.5 text-sm outline-none placeholder:text-black/35 ring-1 ring-black/10"
          />
        </label>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--contact-cta)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-accent-button)] transition hover:brightness-95"
        >
          Enviar mensaje <FiSend />
        </button>
      </form>
    </article>
  );
};

export default ContactFormCard;
