"use client";

import { Phone, CalendarCheck2 } from "lucide-react";
import QuoteButton from "@/components/QuoteButton";
import { site } from "@/lib/site";

export default function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-3 py-2 backdrop-blur sm:hidden">
      <div className="flex items-center gap-2">
        <a
          href={`tel:${site.phoneRaw}`}
          className="btn-outline flex-1 py-2.5"
          aria-label={`Call ${site.phone}`}
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <QuoteButton className="flex-1 py-2.5">
          <CalendarCheck2 className="h-4 w-4" />
          Book Now
        </QuoteButton>
      </div>
    </div>
  );
}
