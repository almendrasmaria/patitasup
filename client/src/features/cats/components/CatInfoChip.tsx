import type React from "react";

type Props = {
	label: string;
	value: string;
	tone: "male" | "female" | "orange" | "purple" | "green";
	icon: React.ReactNode;
};

const CatInfoChip = ({ label, value, tone, icon }: Props) => {
	const styles =
		tone === "male"
			? "bg-blue-100 text-blue-700"
			: tone === "female"
			? "bg-pink-100 text-pink-600"
			: tone === "orange"
			? "bg-orange-100 text-orange-700"
			: tone === "purple"
			? "bg-purple-100 text-purple-700"
			: "bg-emerald-100 text-emerald-700";

	return (
		<div className={`rounded-2xl px-4 py-3 ${styles}`}>
			<div className="flex items-center gap-2">
				<span className="text-base">{icon}</span>
				<span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
					{label}
				</span>
			</div>

			<div className="mt-1 text-sm font-semibold leading-tight">
				{value}
			</div>
		</div>
	);
};

export default CatInfoChip;