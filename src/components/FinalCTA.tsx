import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import QuoteButton from "@/components/QuoteButton";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-wide relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow-dark">When the quality matters</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Ready for dependable, professional cleaning?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate1-200 sm:text-lg">
            Whether you run a single location or manage a multi-building
            facility, our team is ready to put nearly two decades of local
            experience to work for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <QuoteButton variant="secondary">Book Cleaning Now</QuoteButton>
            <a href={`tel:${site.phoneRaw}`} className="btn-ghost-light">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
