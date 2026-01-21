type Props = {
  text: string;
};

const Badge = ({ text }: Props) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/25 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {text}
    </span>
  );
};

export default Badge;