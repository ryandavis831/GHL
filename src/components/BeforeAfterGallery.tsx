import { beforeAfter } from "@/lib/site";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function BeforeAfterGallery() {
  return (
    <section id="before-after" className="bg-white py-20 sm:py-24">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Before &amp; After</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
            The kind of difference{" "}
            <span className="text-brand-aquaDeep">you can drag &amp; see</span>
          </h2>
          <p className="mt-4 text-brand-slate text-base sm:text-lg">
            Real cleans from real Charleston-area homes. Drag the slider on each photo to reveal the
            transformation.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-aquaMist px-3.5 py-1.5 text-xs font-semibold text-brand-aquaDeep">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6 0)" />
            </svg>
            Drag · swipe · or use arrow keys
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {beforeAfter.map((item) => (
            <BeforeAfterSlider
              key={item.id}
              title={item.title}
              description={item.description}
              beforeSrc={item.before}
              afterSrc={item.after}
              beforeAlt={`${item.title} — before cleaning`}
              afterAlt={`${item.title} — after cleaning by Summers Cleaning`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
