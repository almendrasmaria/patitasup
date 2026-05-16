import HomeView from "@/features/home/components/HomeView";

export const revalidate = 60;

export default async function Page() {
  return <HomeView />;
}
