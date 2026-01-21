import { FiArrowRight } from "react-icons/fi";
import { PiGenderMaleFill, PiGenderFemaleFill } from "react-icons/pi";
import { HiOutlineCake } from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { FaInstagram } from "react-icons/fa";
import CatInfoChip from "./CatInfoChip";
import type { Cat } from "../model";

type Props = { cat: Cat };

const CatCard = ({ cat }: Props) => {
	const isMale = cat.sex === "male";

	return (
		<article className="w-full overflow-hidden rounded-[28px] bg-white shadow-md ring-1 ring-black/5">
			<div className="relative h-[300px] w-full overflow-hidden">
				<img src={cat.image} alt={cat.name} className="h-full w-full object-cover" loading="lazy" />
			</div>

			<div className="px-6 pt-5 pb-6">
				<h3 className="text-center text-3xl font-extrabold text-[#5170ff]">{cat.name}</h3>

				<div className="mt-5 grid grid-cols-2 gap-3">
					<CatInfoChip
						label="Sexo"
						value={isMale ? "Macho" : "Hembra"}
						tone={isMale ? "male" : "female"}
						icon={isMale ? <PiGenderMaleFill /> : <PiGenderFemaleFill />}
					/>
					<CatInfoChip
						label="Edad"
						value={cat.ageLabel}
						tone="orange"
						icon={<HiOutlineCake />}
					/>
					<CatInfoChip
						label="Zona"
						value={cat.locationLabel}
						tone="purple"
						icon={<HiOutlineMapPin />}
					/>
					<CatInfoChip
						label="Hogar"
						value={cat.rescueInstagram}
						tone="green"
						icon={<FaInstagram />}
					/>
				</div>

				<p className="mt-5 text-left text-sm leading-relaxed text-slate-500 line-clamp-4">{cat.description}</p>

				<button
					type="button"
					className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5170ff] px-5 py-3 text-base font-semibold text-white hover:bg-[#405de6] transition"
				>
					Adoptar a {cat.name}
					<FiArrowRight className="text-lg" />
				</button>
			</div>
		</article>
	);
};

export default CatCard;