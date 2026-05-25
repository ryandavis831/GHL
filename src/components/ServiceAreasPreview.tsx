import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { areas } from "@/lib/site";

export default function ServiceAreasPreview() {
  return (
    <section className="section bg-soft-blue">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Service Areas</span>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Serving Richlands &amp; Eastern North Carolina
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate1-600 sm:text-lg">
            Local routes, local teams, and fast response across Onslow County
            and beyond.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <Link
              key={a.slug}
              href={a.url}
              className="card group flex flex-col p-6"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-deep text-white">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-navy-900">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate1-600">
                {a.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky2-700 transition group-hover:gap-2.5">
                View {a.shortName} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
