import { site } from "@/lib/site";

export default function SchemaOrg() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://${site.domain}/#business`,
    name: site.name,
    image: `https://${site.domain}/assets/logo/logo.png`,
    description:
      "All-natural, pet-friendly residential and commercial cleaning by Summer, serving Charleston, SC and the surrounding Lowcountry.",
    url: `https://${site.domain}`,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Charleston",
      addressRegion: "SC",
      addressCountry: "US",
    },
    areaServed: [
      "Charleston, SC",
      "Summerville, SC",
      "Mount Pleasant, SC",
      "James Island, SC",
      "Folly Beach, SC",
      "Goose Creek, SC",
      "North Charleston, SC",
      "Johns Island, SC",
      "Isle of Palms, SC",
      "Sullivan's Island, SC",
      "Kiawah Island, SC",
      "Seabrook Island, SC",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: site.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
