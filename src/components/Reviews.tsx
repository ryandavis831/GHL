import { reviews, site } from "@/lib/site";

function Stars() {
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-4 w-4 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream-wash py-20 sm:py-24">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow-gold">Reviews</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
            Loved by Charleston families &amp; businesses
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-brand-slate">
            <Stars />
            <span className="font-bold text-brand-navy">{site.rating.toFixed(1)}</span>
            <span>· {site.reviewCount}+ five-star reviews</span>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="relative rounded-2xl bg-white p-6 shadow-card ring-1 ring-brand-navy/5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <Stars />
                <svg className="h-4 w-4 text-brand-aquaDeep" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.5 12.5c0-5.523-4.477-10-10-10S2.5 6.977 2.5 12.5c0 5.522 4.477 10 10 10 1.732 0 3.362-.441 4.78-1.217l4.22 1.217-1.217-4.22A9.957 9.957 0 0 0 22.5 12.5z" />
                </svg>
              </div>
              <p className="mt-4 text-brand-slate leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-aqua text-white font-display font-bold">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="font-bold text-brand-navy text-sm">{r.name}</div>
                  <div className="text-xs text-brand-slate">{r.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
