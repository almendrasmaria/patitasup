import NewListingForm from "@/features/listings/components/NewListingForm";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--warm-sand)]">
      <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <NewListingForm />
      </section>
    </div>
  );
}
