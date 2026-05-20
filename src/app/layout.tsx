import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { QuoteModalProvider } from "@/components/QuoteModalContext";
import QuoteModal from "@/components/QuoteModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} | Raleigh, NC Cleaning Services — Locally Owned & Operated`,
  description:
    "Locally owned and operated. Residential, AirBnB, STR, and commercial cleaning serving Raleigh, NC and surrounding areas including Nash County, Durham, Cary, and Johnston County.",
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: `${site.name} — Raleigh, NC Cleaning`,
    description:
      "Trusted by homeowners and businesses across the Raleigh area. Free estimates, supplies included, detail-focused service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <QuoteModalProvider>
          {children}
          <QuoteModal />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
