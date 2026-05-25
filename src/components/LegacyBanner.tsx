import { site } from "@/lib/site";

export default function LegacyBanner() {
  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-navy-deep p-1 shadow-cardHover ring-1 ring-navy-900/10">
          <div className="grid gap-0 lg:grid-cols-12">
            <div className="relative lg:col-span-7">
              {/*
                Team photo — full image displayed via object-contain on a
                dark navy backdrop so no faces are cropped.
                Source: /public/assets/team/team-photo.jpg
              */}
              <picture>
                <source
                  srcSet="/assets/team/team-photo.webp"
                  type="image/webp"
                />
                <img
                  src="/assets/team/team-photo.jpg"
                  alt={`${site.name} team — a multi-generational, family-rooted cleaning company in Eastern North Carolina`}
                  className="h-full w-full rounded-2xl bg-navy-950 object-contain"
                  loading="lazy"
                />
              </picture>
            </div>

            <div className="flex flex-col justify-center p-8 text-white lg:col-span-5 lg:p-12">
              <span className="eyebrow-dark w-fit">Our Legacy</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Twenty years strong &mdash; built by people who care.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate1-200">
                Cleaning companies come and go in our area. We&apos;ve been
                here since {site.founded} because our team treats every
                building like it&apos;s our own &mdash; and our clients keep
                referring us because of it.
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-sky2-300">
                    Established
                  </dt>
                  <dd className="mt-1 text-2xl font-bold">{site.founded}</dd>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-sky2-300">
                    Based In
                  </dt>
                  <dd className="mt-1 text-base font-bold leading-tight">
                    Richlands, NC
                  </dd>
                </div>
                <div className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-sky2-300">
                    Promise
                  </dt>
                  <dd className="mt-1 text-base font-bold leading-tight">
                    Quality first
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
