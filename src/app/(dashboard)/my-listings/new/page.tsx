import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import NewListingForm from "@/features/listings/components/NewListingForm";
import SectionTitle from "@/features/listings/components/SectionTitle";
import { secondaryCtaClass } from "@/features/listings/lib/listingStyles";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F6FB]">
      <section className="mx-auto max-w-[87.5rem] px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:py-10 2xl:py-12">
        <div className="min-w-0 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 md:p-8">
          <div className="mx-auto w-full max-w-6xl xl:max-w-[85rem] 2xl:max-w-[94rem]">
            <div className="space-y-7">
              <SectionTitle
                title="Nueva publicación"
                action={
                  <Link href="/my-listings" className={`${secondaryCtaClass} w-full justify-center sm:w-auto`}>
                    <FiArrowLeft className="h-5 w-5" aria-hidden />
                    <span>Volver</span>
                  </Link>
                }
              />

              <NewListingForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}