import { site } from "@/lib/site";
import FacebookIcon from "./FacebookIcon";

interface FollowFacebookProps {
  variant?: "light" | "dark";
}

export default function FollowFacebook({ variant = "light" }: FollowFacebookProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={`relative overflow-hidden py-16 sm:py-20 ${
        isDark ? "bg-brand-navyDeep text-white" : "bg-cream-wash"
      }`}
    >
      <div className="pointer-events-none absolute -top-20 -left-10 h-72 w-72 rounded-full bg-[#1877F2]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-aqua/10 blur-3xl" />

      <div className="container-tight relative">
        <div
          className={`rounded-3xl p-8 sm:p-12 ring-1 shadow-soft text-center ${
            isDark
              ? "bg-white/5 ring-white/10 backdrop-blur-sm"
              : "bg-white ring-brand-navy/5"
          }`}
        >
          <span className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#1877F2] text-white shadow-soft transition-transform hover:scale-110 hover:rotate-3 duration-300">
            <FacebookIcon className="h-8 w-8" />
          </span>
          <h2
            className={`mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight ${
              isDark ? "text-white" : "text-brand-navy"
            }`}
          >
            Follow Summer&apos;s Cleaning on Facebook
          </h2>
          <p
            className={`mt-3 max-w-xl mx-auto text-base sm:text-lg ${
              isDark ? "text-white/75" : "text-brand-slate"
            }`}
          >
            Cleaning transformations, all-natural product tips, before-and-after photos, and updates straight
            from Summer.
          </p>
          <div className="mt-7">
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#1877F2] px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-soft transition hover:bg-[#0e62d1] hover:-translate-y-0.5 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877F2] focus-visible:ring-offset-2"
            >
              <FacebookIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
              Follow on Facebook
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 -mr-0.5"
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
          </div>
        </div>
      </div>
    </section>
  );
}
