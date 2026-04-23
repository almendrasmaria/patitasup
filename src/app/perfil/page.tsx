import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F6FB]">
      <div className="flex min-h-screen w-full">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Topbar />
        </div>
      </div>
    </main>
  );
}
