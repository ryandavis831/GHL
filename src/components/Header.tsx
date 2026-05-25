"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        scrolled
          ? "border-b border-navy-100 bg-white/90 backdrop-blur"
          : "bg-white",
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-deep text-white shadow-card">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-navy-900 sm:text-base">
              Carolina Commercial
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky2-600">
              Cleaning Services Inc
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-slate1-50 hover:text-navy-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneRaw}`}
            className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-navy-700 hover:text-navy-900 lg:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Book Cleaning Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy-100 text-navy-800 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white lg:hidden">
          <nav className="container-wide flex flex-col py-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-navy-800 hover:bg-slate1-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-navy-100 pt-3">
              <a
                href={`tel:${site.phoneRaw}`}
                className="btn-outline w-full"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Book Cleaning Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
