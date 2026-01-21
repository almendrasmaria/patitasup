import { FiUser, FiMail, FiSend } from "react-icons/fi";

const ContactFormCard = () => {
  return (
    <article className="rounded-[22px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] ring-1 ring-black/5 sm:p-7">
      <h3 className="text-[18px] font-bold text-black/85">
        Envíanos un mensaje
      </h3>

      <p className="mt-1 text-[13px] text-black/55">Completá el formulario y te responderemos a la brevedad.</p>

      <form className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-semibold text-black/60">Nombre completo</span>
            <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#F6F7F9] px-3 py-2.5 ring-1 ring-black/10">
              <FiUser className="text-black/35" />
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/35"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-[12px] font-semibold text-black/60">Email</span>

            <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#F6F7F9] px-3 py-2.5 ring-1 ring-black/10">
              <FiMail className="text-black/35" />
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/35"
              />
            </div>
          </label>
        </div>

        <label className="block">
          <span className="text-[12px] font-semibold text-black/60">Asunto</span>
          <div className="mt-2 rounded-xl bg-[#F6F7F9] px-3 py-2.5 ring-1 ring-black/10">
            <select className="w-full bg-transparent text-[13px] text-black/70 outline-none">
              <option>Quiero adoptar un gatito</option>
              <option>Quiero publicar un gatito</option>
              <option>Quiero hacer una consulta</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-[12px] font-semibold text-black/60">Mensaje</span>
          <textarea
            placeholder="Escribí aquí tu consulta..."
            className="mt-2 min-h-[140px] w-full resize-none rounded-xl bg-[#F6F7F9] px-4 py-3 text-[13px] outline-none placeholder:text-black/35 ring-1 ring-black/10"
          />
        </label>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-[#5A7BFF] px-5 py-3 text-[13px] font-semibold text-white hover:brightness-95"
        >
          Enviar mensaje <FiSend />
        </button>
      </form>
    </article>
  );
};

export default ContactFormCard;