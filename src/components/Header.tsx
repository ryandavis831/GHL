"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, site } from "@/lib/site";
import QuoteButton from "./QuoteButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(12,42,77,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight flex h-20 items-center justify-between md:h-24">
        <a href="#home" className="flex items-center gap-2">
          <Image
            src="/assets/logo/logo.png"
            alt={`${site.name} logo`}
            width={220}
            height={100}
            className="h-14 w-auto md:h-16"
            priority
          />
          <span className="sr-only">{site.name}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-brand-navy/80 transition hover:bg-brand-soft hover:text-brand-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${site.phoneTel}`} className="text-sm font-semibold text-brand-navy">
            {site.phone}
          </a>
          <QuoteButton />
        </div>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white ring-1 ring-brand-navy/10 lg:hidden"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 bg-brand-navy transition-transform duration-200 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-5 bg-brand-navy transition-transform duration-200 ${
                open ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden"
          >
            <div className="container-tight pb-5">
              <div className="card-soft p-4">
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-base font-medium text-brand-navy hover:bg-brand-soft"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-3 flex flex-col gap-2">
                  <a href={`tel:${site.phoneTel}`} className="btn-outline w-full">
                    Call {site.phone}
                  </a>
                  <QuoteButton className="btn-primary w-full" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
