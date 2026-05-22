import { reviews, site } from "@/lib/site";
import FacebookIcon from "./FacebookIcon";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-5 w-5 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleG() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41.7 35.5 44 30.1 44 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-cream-wash py-20 sm:py-24">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow-gold">Reviews</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
            What our Charleston neighbors are saying
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <Stars />
            <span className="font-bold text-brand-navy">{site.rating.toFixed(1)}</span>
            <span className="text-brand-slate">on Google</span>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="relative rounded-3xl bg-white p-7 sm:p-9 shadow-soft ring-1 ring-brand-navy/5"
            >
              <div className="absolute -top-4 left-7 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand-navy shadow-card ring-1 ring-brand-navy/5">
                <GoogleG />
                Verified Google Review
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-aqua text-white font-display font-bold text-lg">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-bold text-brand-navy">{r.name}</div>
                    <div className="text-xs text-brand-slate">{r.location}</div>
                  </div>
                </div>
                <Stars />
              </div>
              <div className="mt-5 space-y-3 text-brand-slate leading-relaxed">
                {r.text.split("\n\n").map((para, idx) => (
                  <p key={idx}>&ldquo;{para}&rdquo;</p>
                ))}
              </div>
            </article>
          ))}

          <div className="mt-10 rounded-3xl bg-white p-7 sm:p-9 shadow-card ring-1 ring-brand-navy/5 text-center">
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy">
              Loved your clean? Help Summer&apos;s small business grow.
            </h3>
            <p className="mt-2 text-brand-slate">
              Share your experience on Google or follow along on Facebook for cleaning transformations and tips.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy shadow-card ring-1 ring-brand-navy/10 transition hover:-translate-y-0.5 hover:shadow-soft hover:ring-brand-aqua/40"
              >
                <GoogleG />
                Leave a Google Review
                <svg
                  className="h-3.5 w-3.5 text-brand-slate"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#0e62d1] hover:-translate-y-0.5"
              >
                <FacebookIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
