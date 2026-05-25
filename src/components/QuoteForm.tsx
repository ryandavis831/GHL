import { CheckCircle2 } from "lucide-react";
import QuoteFormBody from "@/components/QuoteFormBody";

const bullets = [
  "Free, no-obligation estimates",
  "Locally owned and operated since 2006",
  "Commercial, residential, and post-construction cleaning",
  "Trusted by businesses, facilities, and homeowners across Eastern NC",
];

export default function QuoteForm({ idHash }: { idHash?: string }) {
  return (
    <section id={idHash ?? "book"} className="section bg-white">
      <div className="container-wide grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="eyebrow">Book Cleaning Now</span>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Request Your Free Cleaning Quote
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate1-600 sm:text-lg">
            Tell us what type of space you need cleaned, where it is located,
            and how soon you are looking to get started. We&apos;ll follow up
            with pricing, availability, and the best cleaning plan for your
            needs.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-navy-800">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-8">
            <QuoteFormBody />
          </div>
        </div>
      </div>
    </section>
  );
}
