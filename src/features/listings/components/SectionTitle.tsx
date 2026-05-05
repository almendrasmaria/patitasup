import { sectionTitleUnderlineClass, sectionTitleWordClass } from "../lib/listingStyles";

type SectionTitleProps = {
  title: string;
  highlightFirstWord?: boolean;
  action?: React.ReactNode;
  headingOnly?: boolean;
};

export default function SectionTitle({
  title,
  highlightFirstWord = true,
  action,
  headingOnly = false,
}: SectionTitleProps) {
  const words = title.trim().split(/\s+/);
  const first = words[0] ?? title;
  const rest = words.slice(1).join(" ");

  const headingContent =
    highlightFirstWord && words.length > 1 ? (
      <>
        <span className={sectionTitleWordClass}>
          {first}
          <span className={sectionTitleUnderlineClass} aria-hidden />
        </span>
        <span> {rest}</span>
      </>
    ) : highlightFirstWord ? (
      <span className={sectionTitleWordClass}>
        {title}
        <span className={sectionTitleUnderlineClass} aria-hidden />
      </span>
    ) : (
      title
    );

  const heading = (
    <h1 className="text-[26px] font-semibold tracking-tight text-[#111827] md:text-[28px]">
      {headingContent}
    </h1>
  );

  if (headingOnly) {
    return heading;
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      {heading}

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
