"use client";

import Image from "next/image";
import { useState } from "react";
import { beforeAfter } from "@/lib/site";

export default function BeforeAfterGallery() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="before-after" className="bg-white py-20 sm:py-24">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Before &amp; After</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy">
            The kind of difference{" "}
            <span className="text-brand-aquaDeep">you can see</span>
          </h2>
          <p className="mt-4 text-brand-slate text-base sm:text-lg">
            Real cleans from real Charleston-area homes. Hover or tap each photo to see the transformation.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {beforeAfter.map((item) => {
            const isShowingAfter = hovered === item.id;
            return (
              <figure
                key={item.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-navy/5"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onTouchStart={() => setHovered(item.id)}
                onTouchEnd={() => setHovered(null)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.before}
                    alt={`${item.title} — before cleaning`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-opacity duration-500 ${
                      isShowingAfter ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <Image
                    src={item.after}
                    alt={`${item.title} — after cleaning by Summers Cleaning`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-opacity duration-500 ${
                      isShowingAfter ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <span
                    className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase shadow-card transition ${
                      isShowingAfter
                        ? "bg-brand-aqua text-white"
                        : "bg-white text-brand-navy"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {isShowingAfter ? "After" : "Before"}
                  </span>
                </div>
                <figcaption className="p-5">
                  <h3 className="font-bold text-brand-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-brand-slate leading-relaxed">{item.description}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
