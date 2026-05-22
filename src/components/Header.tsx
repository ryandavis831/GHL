"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import Logo from "./Logo";
import FacebookIcon from "./FacebookIcon";
import QuoteCTA from "./QuoteCTA";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex items-center gap-4 lg:gap-6 py-2.5">
          <Logo className="shrink-0" />

          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              if (link.children) {
                return (
                  <div key={link.label} className="relative group">
                    <button
                      type="button"
                      className={`relative flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition ${
                        active
                          ? "text-brand-aquaDeep"
                          : "text-brand-navy hover:text-brand-aquaDeep"
                      }`}
                    >
                      {link.label}
                      <svg
                        className="h-3 w-3 transition group-hover:rotate-180"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {active && (
                        <span className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-brand-aqua" />
                      )}
                    </button>
                    <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute left-0 top-full pt-2 transition-all duration-200">
                      <div
                        className={`rounded-xl bg-white shadow-soft ring-1 ring-brand-navy/10 p-1.5 ${
                          link.children.length > 10 ? "w-[440px] grid grid-cols-2 gap-0.5" : "w-60"
                        }`}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-lg px-3 py-1.5 text-[13px] font-medium text-brand-navy hover:bg-brand-aquaMist hover:text-brand-aquaDeep transition"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.href === "/contact") {
                return (
                  <QuoteCTA
                    key={link.href}
                    className="relative rounded-md px-2.5 py-1.5 text-[13px] font-semibold text-brand-navy hover:text-brand-aquaDeep transition"
                  >
                    {link.label}
                  </QuoteCTA>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition ${
                    active
                      ? "text-brand-aquaDeep"
                      : "text-brand-navy hover:text-brand-aquaDeep"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-2 right-2 h-[2px] rounded-full bg-brand-aqua" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-auto">
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Summers Cleaning on Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1877F2] transition hover:bg-[#1877F2] hover:text-white hover:-translate-y-0.5"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold text-brand-navy hover:text-brand-aquaDeep transition"
            >
              <svg
                className="h-4 w-4 text-brand-aquaDeep"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
              </svg>
              {site.phone}
            </a>
            <QuoteCTA className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-aqua px-4 py-2 text-[13px] font-semibold text-white shadow-glow transition hover:bg-brand-aquaDeep hover:-translate-y-0.5 whitespace-nowrap">
              Get a Free Quote
            </QuoteCTA>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="lg:hidden ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-aquaMist text-brand-navy"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bottom-0 z-40 bg-white overflow-y-auto">
          <div className="container-tight py-5">
            <nav className="space-y-0.5">
              {navLinks.map((link) => {
                if (link.children) {
                  const isOpen = openSubmenu === link.label;
                  return (
                    <div key={link.label} className="border-b border-brand-navy/5">
                      <button
                        type="button"
                        onClick={() => setOpenSubmenu(isOpen ? null : link.label)}
                        className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-brand-navy"
                      >
                        {link.label}
                        <svg
                          className={`h-4 w-4 text-brand-aquaDeep transition ${isOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="pb-3 pl-3 space-y-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-lg px-2 py-2 text-sm font-medium text-brand-slate hover:bg-brand-aquaMist hover:text-brand-aquaDeep"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                if (link.href === "/contact") {
                  return (
                    <QuoteCTA
                      key={link.href}
                      className="block w-full text-left border-b border-brand-navy/5 py-3.5 text-base font-semibold text-brand-navy"
                    >
                      {link.label}
                    </QuoteCTA>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-brand-navy/5 py-3.5 text-base font-semibold text-brand-navy"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <QuoteCTA className="btn-primary w-full">Get a Free Quote</QuoteCTA>
              <a href={`tel:${site.phoneTel}`} className="btn-outline w-full">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {site.phone}
              </a>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#0e62d1]"
              >
                <FacebookIcon className="h-4 w-4" />
                Follow on Facebook
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
