import { site } from "@/lib/site";
import QuoteCTA from "./QuoteCTA";

export default function StickyCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-navy/10 px-4 py-3 shadow-soft">
      <div className="flex gap-2">
        <a href={`tel:${site.phoneTel}`} className="btn-outline flex-1 !py-2.5 text-xs">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Summer
        </a>
        <QuoteCTA className="btn-primary flex-1 !py-2.5 text-xs">Get Free Quote</QuoteCTA>
      </div>
    </div>
  );
}
