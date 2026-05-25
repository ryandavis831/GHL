"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { navigation, site, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

function hasChildren(
  item: NavItem,
): item is Extract<NavItem, { children: unknown }> {
  return "children" in item && Array.isArray(item.children);
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const onLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  if (!hasChildren(item)) {
    return (
      <Link
        href={item.href}
        className="rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-slate1-50 hover:text-navy-900"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        href={item.href}
        onFocus={onEnter}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-navy-700 transition hover:bg-slate1-50 hover:text-navy-900"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </Link>

      <div
        className={cn(
          "absolute left-0 top-full z-50 pt-3 transition",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="w-[340px] rounded-2xl border border-navy-100 bg-white p-2 shadow-cardHover">
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate1-50"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky2-100 text-sky2-700 transition group-hover:bg-sky2-200">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-navy-900">
                  {c.label}
                </span>
                {c.description && (
                  <span className="mt-0.5 block text-xs leading-snug text-slate1-600">
                    {c.description}
                  </span>
                )}
              </span>
            </Link>
          ))}
          <div className="mt-1 border-t border-navy-100 px-3 py-2">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky2-700 hover:text-sky2-800"
            >
              View all {item.label.toLowerCase()}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSection({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (!hasChildren(item)) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block rounded-md px-3 py-3 text-base font-medium text-navy-800 hover:bg-slate1-50"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="rounded-md">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium text-navy-800 hover:bg-slate1-50"
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate1-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="mb-2 mt-1 space-y-0.5 border-l-2 border-sky2-100 pl-3">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="block rounded-md px-3 py-2 text-sm font-semibold text-sky2-700 hover:bg-slate1-50"
          >
            All {item.label}
          </Link>
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              onClick={onNavigate}
              className="block rounded-md px-3 py-2 text-sm text-navy-800 hover:bg-slate1-50"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
            <DesktopDropdown key={item.label} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneRaw}`}
            className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-navy-700 hover:text-navy-900 xl:inline-flex"
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
              <MobileSection
                key={item.label}
                item={item}
                onNavigate={() => setOpen(false)}
              />
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-navy-100 pt-3">
              <a href={`tel:${site.phoneRaw}`} className="btn-outline w-full">
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
