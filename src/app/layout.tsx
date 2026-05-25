import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/seo";
import { QuoteModalProvider } from "@/components/QuoteModalContext";
import QuoteModal from "@/components/QuoteModal";
import ChatWidget from "@/components/ChatWidget";

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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Commercial & Residential Cleaning in Richlands, NC`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Locally owned commercial, janitorial, post-construction, and residential cleaning company serving Richlands, Jacksonville, Onslow County, and Sneads Ferry, NC since 2006.",
  applicationName: site.name,
  keywords: [
    "commercial cleaning Richlands NC",
    "janitorial services Richlands NC",
    "post-construction cleaning Richlands NC",
    "residential cleaning Richlands NC",
    "cleaning services Jacksonville NC",
    "cleaning services Onslow County NC",
    "Sneads Ferry cleaning",
    "Carolina Commercial Cleaning Services",
  ],
  openGraph: {
    title: `${site.name} — Commercial & Residential Cleaning, Richlands NC`,
    description:
      "Trusted by businesses, facilities, and homeowners across Eastern North Carolina since 2006.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Cleaning Services in Richlands, NC`,
    description:
      "Commercial, janitorial, post-construction, and residential cleaning since 2006.",
  },
  robots: { index: true, follow: true },
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
          <Header />
          <main className="pb-20 sm:pb-0">{children}</main>
          <Footer />
          <StickyCTA />
          <ChatWidget />
          <QuoteModal />
        </QuoteModalProvider>
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
