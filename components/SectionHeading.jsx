export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="mb-3 flex items-center gap-3">
        <span className="section-heading-line h-px w-8" />
        <p className="section-heading-eyebrow text-[10px] font-black uppercase tracking-[.22em]">{eyebrow}</p>
      </div>
      <h2 className="font-display text-3xl font-bold tracking-[-.055em] text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-6 text-white/45 sm:text-base">{subtitle}</p>}
    </div>
  );
}
