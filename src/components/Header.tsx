"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-wide flex items-center justify-between py-3">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="relative group">
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-brand-navy hover:text-brand-aquaDeep transition"
                  >
                    {link.label}
                    <svg className="h-3.5 w-3.5 transition group-hover:rotate-180" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-2 transition"
                  >
                    <div
                      className={`rounded-2xl bg-white shadow-soft ring-1 ring-brand-navy/10 p-2 ${
                        link.children.length > 10 ? "w-[520px] grid grid-cols-2" : "w-64"
                      }`}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-brand-navy hover:bg-brand-aquaMist hover:text-brand-aquaDeep transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-brand-navy hover:text-brand-aquaDeep transition"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${site.phoneTel}`}
            className="hidden xl:inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-aquaDeep transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.08.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.02-2.29a2 2 0 0 1 2.11-.45c.98.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
            </svg>
            {site.phone}
          </a>
          <Link href="/contact" className="btn-primary">
            Get a Free Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-aquaMist text-brand-navy"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-40 bg-white overflow-y-auto">
          <div className="container-tight py-6">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                if (link.children) {
                  const isOpen = openSubmenu === link.label;
                  return (
                    <div key={link.label} className="border-b border-brand-navy/5">
                      <button
                        type="button"
                        onClick={() => setOpenSubmenu(isOpen ? null : link.label)}
                        className="flex w-full items-center justify-between py-3 text-base font-semibold text-brand-navy"
                      >
                        {link.label}
                        <svg
                          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="pb-3 pl-3 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm font-medium text-brand-slate hover:text-brand-aquaDeep"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-brand-navy/5 py-3 text-base font-semibold text-brand-navy"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <a href={`tel:${site.phoneTel}`} className="btn-outline w-full">
                Call {site.phone}
              </a>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
