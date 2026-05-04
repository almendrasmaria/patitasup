import MyListingsClient from "@/features/publications/components/MyListingsClient";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F6FB]">
      <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8 xl:py-10 2xl:py-12">
        <div className="min-w-0 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6 md:p-8">
          <MyListingsClient />
        </div>
      </section>
    </main>
  );
}
