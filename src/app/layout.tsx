import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

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
  title: `${site.name} | All-Natural Cleaning in Charleston, SC — Pet-Friendly`,
  description:
    "Summers Cleaning LLC, owned by Summer, provides residential and commercial cleaning across Charleston, SC and the Lowcountry. All-natural, pet-friendly products and Clean Fresh Vibes guaranteed.",
  metadataBase: new URL(`https://${site.domain}`),
  keywords: [
    "Charleston cleaning service",
    "all-natural cleaning Charleston SC",
    "pet-friendly cleaning",
    "residential cleaning Charleston",
    "commercial cleaning Charleston",
    "Summers Cleaning LLC",
    "house cleaning Lowcountry",
  ],
  openGraph: {
    title: `${site.name} — Charleston, SC Cleaning`,
    description:
      "All-natural, pet-friendly residential and commercial cleaning across Charleston, SC and the Lowcountry. Clean Fresh Vibes by Summer.",
    type: "website",
    images: ["/assets/brand/hero-cover.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
