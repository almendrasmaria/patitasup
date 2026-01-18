import Navbar from "../../../shared/ui/Navbar";
import HeroHome from "../components/HeroHome";
import CatsGrid from "../../cats/components/CatsGrid";
import { mockCats } from "../../cats/data/mockCats";

const HomePage = () => {
	return (
		<div className="min-h-screen bg-[#F6F7F9]">
			<Navbar />
			<main>
				<HeroHome />

				<section className="py-12">
					<div className="w-full px-5 md:px-[50px]">
						<div className="mt-6">
							<CatsGrid cats={mockCats} />
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default HomePage;