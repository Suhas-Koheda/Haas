interface SectionHeadingProps {
  index: string;
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ index, title, subtitle, id }: SectionHeadingProps) {
  return (
    <div id={id} className="mb-5 scroll-mt-24 sm:mb-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-widest text-accent">{index}</span>
        <div className="h-6 w-1 rounded-full bg-gradient-to-b from-accent to-accent-2 sm:h-7" />
        <h2 className="font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-1.5 pl-[4.4rem] font-mono text-[11px] text-faint">{subtitle}</p>
      )}
    </div>
  );
}