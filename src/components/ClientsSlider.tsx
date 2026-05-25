"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { clients } from "@/lib/site";

export default function ClientsSlider() {
  return (
    <section className="bg-navy-deep py-16 text-white sm:py-20">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow-dark">Trusted Partners</span>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Trusted By Businesses &amp; Facilities Across Eastern North
            Carolina
          </h2>
          <p className="mt-3 text-sm text-slate1-300 sm:text-base">
            Hundreds of completed jobs across commercial, government, and
            military accounts.
          </p>
        </div>
      </div>

      <div className="relative mt-10 h-[110px] w-full overflow-hidden">
        <InfiniteSlider
          className="flex h-full w-full items-center"
          duration={38}
          durationOnHover={90}
          gap={20}
        >
          {clients.map((name) => (
            <div
              key={name}
              className="flex h-16 min-w-[200px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 backdrop-blur-sm transition hover:border-sky2-400/40 hover:bg-white/[0.08]"
            >
              <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-wider text-slate1-100 sm:text-base">
                {name}
              </span>
            </div>
          ))}
        </InfiniteSlider>

        {/*
          Edge fade — both sides. Using the navy background color so the
          fade blends seamlessly into the section.
        */}
        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-[160px]"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-[160px]"
          direction="right"
          blurIntensity={1}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-[160px]"
          style={{
            background:
              "linear-gradient(to right, rgba(11,29,56,1) 10%, rgba(11,29,56,0) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-[160px]"
          style={{
            background:
              "linear-gradient(to left, rgba(11,29,56,1) 10%, rgba(11,29,56,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}
