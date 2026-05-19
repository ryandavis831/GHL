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
  title: `${site.name} | Professional Cleaning in Wake County`,
  description:
    "Residential, AirBnB, STR, and commercial cleaning services with flexible scheduling, free estimates, and detail-focused results in Wake County, NC.",
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: site.name,
    description:
      "Professional cleaning that makes your space sparkle. Serving Wake County and surrounding areas.",
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
