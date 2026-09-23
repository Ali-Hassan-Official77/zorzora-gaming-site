export default function SectionHeading({ eyebrow, title, subtitle }) {
  return <div className="mb-8 max-w-2xl"><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#ff6259]">{eyebrow}</p><h2 className="mt-2 font-display text-3xl font-bold tracking-[-.04em] text-white sm:text-4xl">{title}</h2>{subtitle && <p className="mt-3 text-sm leading-6 text-white/45 sm:text-base">{subtitle}</p>}</div>;
}
