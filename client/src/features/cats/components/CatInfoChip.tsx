
type Props = {
  label: string;
  value: string;
};

const CatInfoChip = ({ label, value }: Props) => {
  return (
    <div className="rounded-2xl bg-[#EDE9FE] px-4 py-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-[#7061F0]">
        {label}
      </div>
      <div className="mt-1 text-base font-semibold text-slate-800">
        {value}
      </div>
    </div>
  );
};

export default CatInfoChip;