import PawIcon from "./PawIcon";

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-navyDeep text-white text-[12px] sm:text-[13px]">
      <div className="container-wide flex items-center justify-center gap-3 sm:gap-5 py-2 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-brand-aqua" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 3c-9 0-15 6-15 14 0 1.4.4 2.7 1 4 1.3-.6 2.6-1 4-1 8 0 14-6 14-15-1.3.3-2.7.5-4 .5z" />
            <path d="M6 21c2-4 5-7 9-9" />
          </svg>
          All-Natural
        </span>
        <span className="text-white/40">·</span>
        <span className="inline-flex items-center gap-1.5">
          <PawIcon className="h-3.5 w-3.5 text-brand-gold" />
          Pet-Friendly
        </span>
        <span className="hidden sm:inline text-white/40">·</span>
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-brand-aqua" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Safe for Your Family
        </span>
      </div>
    </div>
  );
}
