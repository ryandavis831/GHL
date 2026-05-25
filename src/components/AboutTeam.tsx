import { CheckCircle2, Users, HeartHandshake, Award } from "lucide-react";
import { site, trustStats } from "@/lib/site";

const pillars = [
  {
    icon: Users,
    title: "Family-rooted team",
    body: "Long-tenured employees who treat your space like their own.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-first",
    body: "We do more than expected — happy clients are our best advertising.",
  },
  {
    icon: Award,
    title: "Quality that lasts",
    body: "Detailed scopes, supervised crews, and consistent results since 2006.",
  },
];

export default function AboutTeam() {
  return (
    <section className="section bg-soft-blue">
      <div className="container-wide grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="relative">
            {/*
              REAL COMPANY PHOTO:
              To use the actual team photo, drop the file at:
                /public/assets/team/team-photo.jpg
              and change the `src` below to "/assets/team/team-photo.jpg".
              Until then, we show a neutral stock placeholder so the layout
              renders cleanly in the demo.
            */}
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80"
              alt={`The ${site.name} team — locally-owned and operated in Eastern North Carolina`}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-cardHover ring-1 ring-navy-900/5"
              loading="lazy"
            />
            <div className="absolute -bottom-6 left-6 right-6 rounded-xl bg-white p-4 shadow-card ring-1 ring-navy-900/5 sm:right-auto sm:max-w-sm">
              <p className="text-sm font-semibold text-navy-900">
                The Carolina Commercial Cleaning family
              </p>
              <p className="mt-1 text-xs text-slate1-600">
                Together since {site.founded} — built on trust, consistency,
                and care.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <span className="eyebrow">About Us</span>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            A locally-owned cleaning company that&apos;s been growing every
            year since 2006.
          </h2>

          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate1-700">
            <p>
              {site.name} was established in {site.founded} as a residential
              cleaning company. As customer needs grew, the company expanded
              into post-construction cleaning, janitorial services, and
              commercial cleaning.
            </p>
            <p>
              Since then, the company has continued to grow each year by adding
              services, employees, and satisfied customers.
            </p>
            <p>
              Through the years, many cleaning companies have come and gone in
              the area. {site.shortName} has remained because of its commitment
              to customer satisfaction, quality work, and reasonable pricing.
            </p>
            <p>
              The company believes in doing more than customers expect — and
              its greatest advertising comes from happy clients.
            </p>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {pillars.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-xl border border-navy-100 bg-white p-4 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky2-100 text-sky2-700">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-navy-900">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate1-600">
                  {body}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trustStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-navy-deep p-4 text-white"
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-sky2-200">
                  {s.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
