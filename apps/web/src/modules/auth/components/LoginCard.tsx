import Image from "next/image";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <section className="h-full w-full p-0 md:p-0">
      <div className="grid h-full w-full grid-cols-1 overflow-hidden bg-white md:grid-cols-[1fr_1fr]">
        <div className="relative hidden h-full md:block">
          <Image
            src="/cat-register.jpg"
            alt="Gatito PatitasUp"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

          <div className="absolute bottom-12 left-12 max-w-[420px]">
            <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
              Cada rescate cuenta una historia.
            </h2>

            <p className="mt-5 max-w-[340px] text-[15px] leading-7 text-white/85">
              Volvé a tu cuenta y seguí ayudando a más gatos a encontrar un hogar.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <span className="h-[4px] w-10 rounded-full bg-white" />
              <span className="h-[4px] w-3 rounded-full bg-white/45" />
              <span className="h-[4px] w-3 rounded-full bg-white/45" />
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center bg-white px-6 py-10 sm:px-10 md:px-16 lg:px-20">
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginCard;
