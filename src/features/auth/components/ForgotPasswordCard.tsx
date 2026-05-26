import AuthCarousel from "./AuthCarousel";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { passwordRecoverySlides } from "../data/authCarouselSlides";

const ForgotPasswordCard = () => {
  return (
    <section className="h-full w-full p-0 md:p-0">
      <div className="grid h-full w-full grid-cols-1 overflow-hidden bg-white md:grid-cols-[1fr_1fr]">
        <div className="flex h-full items-center justify-center bg-white px-6 py-10 sm:px-10 md:px-16 lg:px-20">
          <ForgotPasswordForm />
        </div>

        <AuthCarousel slides={passwordRecoverySlides} />
      </div>
    </section>
  );
};

export default ForgotPasswordCard;