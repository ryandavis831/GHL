"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, MouseEvent } from "react";

interface QuoteCTAProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Smart CTA that scrolls to the #contact form when already on the homepage
 * and navigates to /#contact from any other page. Works correctly on Vercel
 * because the anchor is part of the rendered URL.
 */
export default function QuoteCTA({ children, className = "btn-primary", ariaLabel }: QuoteCTAProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!onHome) return;
    const el = document.getElementById("contact");
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#contact");
    }
  }

  return (
    <Link
      href="/#contact"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
