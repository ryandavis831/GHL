// One-off generator for the static HTML pages.
// Run with:  node ghl-site/_build.mjs
// Uses only the Node built-in `fs` module. No npm install required.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;

/* ============================================================
   Site data (mirrors the Next version)
   ============================================================ */
const SITE = {
  name: "Carolina Commercial Cleaning Services Inc",
  shortName: "Carolina Commercial Cleaning",
  founded: "2006",
  primaryTagline: "When the quality matters.",
  phone: "(910) 467-6357",
  phoneRaw: "+19104676357",
  email: "Info@carolinascleaning.com",
  city: "Richlands",
  region: "NC",
  postalCode: "28574",
  url: "https://carolinascleaning.com",
  geo: { lat: 34.8979, lng: -77.5469 },
  serviceAreas: [
    "Richlands, NC",
    "Jacksonville, NC",
    "Onslow County, NC",
    "Sneads Ferry, NC",
    "Camp Lejeune",
    "MCAS New River",
  ],
};

const services = [
  {
    slug: "commercial-cleaning",
    file: "commercial-cleaning-richlands-nc.html",
    name: "Commercial Cleaning",
    shortName: "Commercial",
    tagline: "Commercial-grade cleaning for offices, retail, and facilities.",
    blurb:
      "Reliable, fully-insured commercial cleaning for offices, retail spaces, banks, medical facilities, and government buildings across Eastern North Carolina.",
    description:
      "Our commercial cleaning crews keep your business looking its best every day. From single-location storefronts to multi-building campuses, we tailor scopes and schedules to match your operations — with consistent quality and on-time performance.",
    bullets: [
      "Offices, retail, banks, medical, and government",
      "Day porter, nightly, weekly, or custom schedules",
      "Trained, supervised crews",
      "OSHA-compliant chemicals and equipment",
      "On-site supervision and quality audits",
    ],
    audiences: ["Restaurants", "Retail", "Medical Offices", "Government"],
    icon: iconBuilding(),
  },
  {
    slug: "janitorial-services",
    file: "janitorial-services-richlands-nc.html",
    name: "Janitorial Services",
    shortName: "Janitorial",
    tagline: "Recurring janitorial programs built around your facility.",
    blurb:
      "Daily, weekly, and nightly janitorial programs for schools, gyms, hangars, and military base buildings — backed by checklists, audits, and dependable people.",
    description:
      "We design recurring janitorial programs around your facility's traffic patterns and compliance requirements. Every job is supervised, documented, and quality-checked so you always know exactly what's being done.",
    bullets: [
      "Customizable nightly or daytime programs",
      "Restroom sanitation and restocking",
      "Floor care: VCT, tile, concrete, and carpet",
      "Trash and recycling management",
      "Detailed scopes of work and reporting",
    ],
    audiences: ["Schools", "Gyms", "Hangars", "Base Buildings"],
    icon: iconSparkle(),
  },
  {
    slug: "post-construction-cleaning",
    file: "post-construction-cleaning-richlands-nc.html",
    name: "Post-Construction Cleaning",
    shortName: "Post-Construction",
    tagline: "Punch-list ready, move-in clean — on schedule.",
    blurb:
      "Rough, final, and touch-up post-construction cleans that get new builds, remodels, and tenant fit-outs ready for inspections and grand openings.",
    description:
      "We've cleaned hundreds of new builds, remodels, and base projects across Eastern North Carolina. From dust extraction and debris haul-off to streak-free glass and detailed final passes — we know exactly what GCs need to hit punch list deadlines.",
    bullets: [
      "Rough, final, and touch-up cleans",
      "Drywall dust extraction and debris removal",
      "Window, glass, and fixture detailing",
      "Floor scrub, polish, and seal",
      "Coordinated with GC schedules",
    ],
    audiences: ["General Contractors", "Builders", "Property Developers"],
    icon: iconHardHat(),
  },
  {
    slug: "residential-cleaning",
    file: "residential-cleaning-richlands-nc.html",
    name: "Residential Cleaning",
    shortName: "Residential",
    tagline: "House cleaning trusted by hundreds of local families.",
    blurb:
      "Weekly, bi-weekly, monthly, and one-time house cleaning that treats your home with the same care we've delivered since 2006.",
    description:
      "Whether you want a recurring clean to free up your weekends or a deep refresh before family visits, our residential teams bring consistent quality, friendly faces, and the same attention to detail in every room.",
    bullets: [
      "Weekly, bi-weekly, monthly, or one-time",
      "Move-in and move-out cleans",
      "Same-team consistency when possible",
      "Pet-friendly, family-safe products available",
      "Custom scopes for your priority areas",
    ],
    audiences: ["Homeowners", "Renters", "Realtors", "Property Managers"],
    icon: iconHome(),
  },
  {
    slug: "deep-cleaning",
    file: "deep-cleaning-richlands-nc.html",
    name: "Deep Cleaning",
    shortName: "Deep Clean",
    tagline: "Top-to-bottom deep cleans that reset every surface.",
    blurb:
      "Detailed top-to-bottom deep cleans for homes, restaurants, gyms, and commercial spaces that need a true reset.",
    description:
      "Our deep cleans go beyond routine maintenance — hand-detailed baseboards, vents, fixtures, kitchens, and bathrooms. Ideal for seasonal resets, post-event recovery, or preparing for inspections.",
    bullets: [
      "Hand-detailed surfaces and fixtures",
      "Baseboards, vents, blinds, and trim",
      "Kitchen degreasing and appliance detailing",
      "Bathroom descaling and sanitization",
      "Ideal for seasonal or pre-inspection resets",
    ],
    audiences: ["Homeowners", "Restaurants", "Gyms", "Commercial Spaces"],
    icon: iconDroplets(),
  },
];

const areas = [
  {
    slug: "richlands-nc",
    file: "cleaning-services-richlands-nc.html",
    name: "Richlands, NC",
    shortName: "Richlands",
    blurb:
      "Our hometown. Trusted by Richlands businesses and homeowners since 2006.",
    description:
      "Carolina Commercial Cleaning Services Inc has called Richlands home for nearly two decades. We clean offices, retail, schools, government buildings, and hundreds of homes across the 28574 zip code and the surrounding communities.",
    highlights: [
      "Offices and retail along NC-258 and NC-24",
      "Schools and town buildings",
      "Hundreds of residential homes",
      "Same-day and next-day response across 28574",
    ],
  },
  {
    slug: "jacksonville-nc",
    file: "cleaning-services-jacksonville-nc.html",
    name: "Jacksonville, NC",
    shortName: "Jacksonville",
    blurb:
      "Commercial and residential cleaning across Jacksonville and the Camp Lejeune corridor.",
    description:
      "We serve businesses, restaurants, gyms, and homes throughout Jacksonville, NC. With hundreds of cleanings completed across Camp Lejeune and MCAS New River base buildings, our crews know how to deliver to military and commercial standards.",
    highlights: [
      "Restaurants, retail, and medical offices",
      "Gyms, schools, and government buildings",
      "Experience on Camp Lejeune and MCAS New River",
      "Move-in / move-out for service families",
    ],
  },
  {
    slug: "onslow-county-nc",
    file: "cleaning-services-onslow-county-nc.html",
    name: "Onslow County, NC",
    shortName: "Onslow County",
    blurb: "County-wide commercial, janitorial, and residential cleaning.",
    description:
      "From Holly Ridge to Half Moon, we provide commercial cleaning, janitorial services, post-construction cleaning, and residential cleaning across Onslow County. Local routes, local teams, and dependable scheduling.",
    highlights: [
      "Multi-site facility programs",
      "Commercial, government, and education accounts",
      "Restaurant chain support across the county",
      "Established local routes and fast response",
    ],
  },
  {
    slug: "sneads-ferry-nc",
    file: "cleaning-services-sneads-ferry-nc.html",
    name: "Sneads Ferry, NC",
    shortName: "Sneads Ferry",
    blurb:
      "Coastal residential and commercial cleaning, including vacation rentals.",
    description:
      "Sneads Ferry homeowners, vacation rentals, and small businesses count on us for dependable cleaning year-round. We handle turn cleans, deep cleans, and recurring service across the North Topsail Beach area.",
    highlights: [
      "Vacation rental turn cleans",
      "Coastal residential service",
      "Small business and retail",
      "Deep cleans and seasonal resets",
    ],
  },
];

/* ============================================================
   Inline SVG helpers (lucide-style)
   ============================================================ */
function svg(content, opts = {}) {
  const cls = opts.className ? ` class="${opts.className}"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${cls}>${content}</svg>`;
}
function iconSparkle()  { return svg(`<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>`); }
function iconPhone()    { return svg(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`); }
function iconMail()     { return svg(`<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`); }
function iconMapPin()   { return svg(`<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`); }
function iconBuilding() { return svg(`<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>`); }
function iconHome()     { return svg(`<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`); }
function iconHardHat()  { return svg(`<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>`); }
function iconDroplets() { return svg(`<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>`); }
function iconShield()   { return svg(`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`); }
function iconChevDown() { return svg(`<path d="m6 9 6 6 6-6"/>`, { className: "chevron" }); }
function iconChevRight(){ return svg(`<path d="m9 18 6-6-6-6"/>`); }
function iconCheck()    { return svg(`<path d="M20 6 9 17l-5-5"/>`); }
function iconCheckCircle(){ return svg(`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>`); }
function iconShieldCheck(){ return svg(`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>`); }
function iconAward()    { return svg(`<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/>`); }
function iconArrowRight(){ return svg(`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`); }
function iconUsers()    { return svg(`<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`); }
function iconHeart()    { return svg(`<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>`); }
function iconUtensils() { return svg(`<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>`); }
function iconShoppingBag(){return svg(`<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>`); }
function iconCoffee()   { return svg(`<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/>`); }
function iconPlane()    { return svg(`<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>`); }
function iconLandmark() { return svg(`<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>`); }
function iconDumbbell() { return svg(`<path d="M14.4 14.4 9.6 9.6"/><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z"/><path d="m21.5 21.5-1.4-1.4"/><path d="M3.9 3.9 2.5 2.5"/><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z"/>`); }
function iconGradCap()  { return svg(`<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>`); }
function iconClock()    { return svg(`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`); }
function iconMessage()  { return svg(`<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`); }
function iconSend()     { return svg(`<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>`); }
function iconClose()    { return svg(`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`); }
function iconMenu()     { return svg(`<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>`); }
function iconCalendar() { return svg(`<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/>`); }
function iconImg()      { return svg(`<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><path d="M16 5h6"/><path d="M19 2v6"/>`); }

/* ============================================================
   Shared HTML fragments
   ============================================================ */
function head({ title, description, path }) {
  const url = SITE.url + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${SITE.name}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="./styles.css" />
${localBusinessSchema()}
</head>
<body>`;
}

function localBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: SITE.founded,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.serviceAreas.map((a) => ({ "@type": "Place", name: a })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function cleaningServiceSchema({ name, description, url, serviceType, areaServed }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name, description, url, serviceType,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name, telephone: SITE.phone,
      address: { "@type": "PostalAddress", addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.postalCode, addressCountry: "US" },
    },
    areaServed: (areaServed || SITE.serviceAreas).map((a) => ({ "@type": "Place", name: a })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function header() {
  const servicesItems = services.map((s) => `
    <a class="dropdown-link" href="./${s.file}">
      <span class="icon">${iconChevRight()}</span>
      <span><strong>${s.name}</strong><span>${s.tagline}</span></span>
    </a>`).join("");
  const areaItems = areas.map((a) => `
    <a class="dropdown-link" href="./${a.file}">
      <span class="icon">${iconChevRight()}</span>
      <span><strong>${a.name}</strong><span>${a.blurb}</span></span>
    </a>`).join("");

  const mobileServicesLinks = services.map((s) =>
    `<a href="./${s.file}">${s.name}</a>`).join("");
  const mobileAreasLinks = areas.map((a) =>
    `<a href="./${a.file}">${a.name}</a>`).join("");

  return `
<header class="site-header">
  <div class="container header-row">
    <a class="brand" href="./index.html" aria-label="${SITE.name} home">
      <span class="brand-mark">${iconSparkle()}</span>
      <span class="brand-text">
        <strong>Carolina Commercial</strong>
        <small>Cleaning Services Inc</small>
      </span>
    </a>

    <nav class="nav-desktop" aria-label="Primary">
      <div class="nav-item"><a class="nav-link" href="./index.html">Home</a></div>
      <div class="nav-item"><a class="nav-link" href="./about.html">About</a></div>

      <div class="nav-item">
        <a class="nav-link" href="./services.html">Services ${iconChevDown()}</a>
        <div class="dropdown">
          <div class="dropdown-panel">
            ${servicesItems}
            <div class="dropdown-foot"><a href="./services.html">View all services ${iconChevRight()}</a></div>
          </div>
        </div>
      </div>

      <div class="nav-item">
        <a class="nav-link" href="./service-areas.html">Service Areas ${iconChevDown()}</a>
        <div class="dropdown">
          <div class="dropdown-panel">
            ${areaItems}
            <div class="dropdown-foot"><a href="./service-areas.html">View all areas ${iconChevRight()}</a></div>
          </div>
        </div>
      </div>

      <div class="nav-item"><a class="nav-link" href="./clients.html">Clients</a></div>
      <div class="nav-item"><a class="nav-link" href="./contact.html">Contact</a></div>
    </nav>

    <div class="nav-actions">
      <a class="tel-inline" href="tel:${SITE.phoneRaw}">${iconPhone()} ${SITE.phone}</a>
      <button class="btn btn-primary book-desktop" data-open-quote>Book Cleaning Now</button>
      <button class="hamburger" type="button" data-nav-toggle aria-expanded="false" aria-label="Open menu">${iconMenu()}</button>
    </div>
  </div>

  <div class="nav-mobile" data-nav-mobile>
    <div class="nav-mobile-inner">
      <a href="./index.html">Home</a>
      <a href="./about.html">About</a>

      <button class="m-toggle" type="button" data-m-toggle="m-services" aria-expanded="false">
        Services ${iconChevDown()}
      </button>
      <div class="m-sub" id="m-services">
        <a href="./services.html" class="m-sub-head">All Services</a>
        ${mobileServicesLinks}
      </div>

      <button class="m-toggle" type="button" data-m-toggle="m-areas" aria-expanded="false">
        Service Areas ${iconChevDown()}
      </button>
      <div class="m-sub" id="m-areas">
        <a href="./service-areas.html" class="m-sub-head">All Service Areas</a>
        ${mobileAreasLinks}
      </div>

      <a href="./clients.html">Clients</a>
      <a href="./contact.html">Contact</a>

      <div class="nav-mobile-cta">
        <a class="btn btn-outline btn-block" href="tel:${SITE.phoneRaw}">${iconPhone()} ${SITE.phone}</a>
        <button class="btn btn-primary btn-block" data-open-quote>Book Cleaning Now</button>
      </div>
    </div>
  </div>
</header>`;
}

function footer() {
  const svcLinks = services.map((s) => `<li><a href="./${s.file}">${s.name}</a></li>`).join("");
  const areaLinks = areas.map((a) => `<li><a href="./${a.file}">${a.name}</a></li>`).join("");
  return `
<footer class="site-footer">
  <div class="container foot-grid">
    <div class="foot-brand">
      <a class="brand" href="./index.html">
        <span class="brand-mark">${iconSparkle()}</span>
        <span class="brand-text">
          <strong>Carolina Commercial</strong>
          <small>Cleaning Services Inc</small>
        </span>
      </a>
      <p>Family-rooted, locally-owned cleaning company serving Eastern North Carolina since ${SITE.founded}. ${SITE.primaryTagline}</p>
      <ul>
        <li>${iconMapPin()}<span>${SITE.city}, ${SITE.region} ${SITE.postalCode}</span></li>
        <li>${iconPhone()}<a href="tel:${SITE.phoneRaw}">${SITE.phone}</a></li>
        <li>${iconMail()}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
      </ul>
    </div>
    <div>
      <h4>Services</h4>
      <ul>${svcLinks}</ul>
    </div>
    <div>
      <h4>Service Areas</h4>
      <ul>${areaLinks}</ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="./about.html">About</a></li>
        <li><a href="./services.html">All Services</a></li>
        <li><a href="./service-areas.html">Service Areas</a></li>
        <li><a href="./clients.html">Clients</a></li>
        <li><a href="./contact.html">Contact / Book Cleaning</a></li>
      </ul>
    </div>
  </div>
  <div class="container foot-bottom">
    <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
    <p>Locally owned &amp; operated • ${SITE.city}, ${SITE.region} • &ldquo;${SITE.primaryTagline}&rdquo;</p>
  </div>
</footer>`;
}

function stickyCta() {
  return `
<div class="sticky-cta">
  <a class="btn btn-outline" href="tel:${SITE.phoneRaw}">${iconPhone()} Call</a>
  <button class="btn btn-primary" data-open-quote>${iconCalendar()} Book Now</button>
</div>`;
}

function quoteFormBody({ compact = true } = {}) {
  const compactClass = compact ? " compact" : "";
  const chips = services.map((s) =>
    `<button type="button" class="chip" data-service="${s.name}" aria-pressed="false">
        <span class="ck">${iconCheck()}</span>${s.name}
     </button>`
  ).join("");
  const propertyTypes = [
    "Commercial Building","Office","Restaurant","School","Gym",
    "Government Facility","Residential Home","Post-Construction Site","Other",
  ];
  const timings = [
    "As soon as possible","This week","Next week","Within 2–4 weeks","Flexible / Not sure yet",
  ];
  return `
<form class="form${compactClass}" data-quote-form>
  <div class="row cols-2">
    <div class="field">
      <label for="qf-name">Full name</label>
      <input id="qf-name" name="name" required placeholder="Jane Doe" autocomplete="name" />
    </div>
    <div class="field">
      <label for="qf-phone">Phone number</label>
      <input id="qf-phone" name="phone" required type="tel" placeholder="(910) 555-0123" autocomplete="tel" />
    </div>
  </div>
  <div class="row cols-2">
    <div class="field">
      <label for="qf-email">Email</label>
      <input id="qf-email" name="email" required type="email" placeholder="you@example.com" autocomplete="email" />
    </div>
    <div class="field">
      <label for="qf-address">Address / Service location</label>
      <input id="qf-address" name="address" required placeholder="123 Main St, Richlands, NC" autocomplete="street-address" />
    </div>
  </div>
  <div class="field">
    <label>Service(s) needed <span class="opt">(select one or more)</span></label>
    <div class="chips">${chips}</div>
  </div>
  <div class="row cols-2">
    <div class="field">
      <label for="qf-property">Property type</label>
      <select id="qf-property" name="propertyType">
        <option value="">Select property type…</option>
        ${propertyTypes.map((p) => `<option value="${p}">${p}</option>`).join("")}
      </select>
    </div>
    <div class="field">
      <label for="qf-timing">Preferred timing</label>
      <select id="qf-timing" name="timing">
        <option value="">When are you looking to start?</option>
        ${timings.map((t) => `<option value="${t}">${t}</option>`).join("")}
      </select>
    </div>
  </div>
  <div class="field">
    <label for="qf-message">Message / Project details</label>
    <textarea id="qf-message" name="message" rows="${compact ? 3 : 4}" placeholder="Square footage, frequency, special requests, deadlines…"></textarea>
  </div>
  <div class="field">
    <label>Photos <span class="opt">(optional)</span></label>
    <div class="dropzone">
      <div class="inner">
        ${iconImg()}
        <div>Drag &amp; drop, or click to upload</div>
        <small>Photos help us prepare an accurate quote</small>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary btn-block">${iconCalendar()} Book Cleaning Now</button>
</form>
<div class="form-success" data-quote-success style="display:none">
  <span class="ic">${iconCheckCircle()}</span>
  <h3>Thanks — we&rsquo;ve got it!</h3>
  <p>A team member will reach out shortly to confirm your details and scheduling.</p>
  <button type="button" class="btn btn-outline" data-close-quote>Close</button>
</div>`;
}

function quoteModal() {
  return `
<div class="modal" id="quote-modal" aria-hidden="true">
  <div class="modal-backdrop" data-close-quote></div>
  <div class="modal-dialog-wrap">
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div class="modal-head">
        <button type="button" class="modal-close" data-close-quote aria-label="Close">${iconClose()}</button>
        <div class="row1">
          <span class="ic">${iconSparkle()}</span>
          <div>
            <small>Free, no-obligation</small>
            <h2 id="quote-modal-title">Request Your Free Cleaning Quote</h2>
          </div>
        </div>
        <div class="row2">
          <span>${iconShieldCheck()} Locally owned since ${SITE.founded}</span>
          <span>${iconMapPin()} Eastern NC</span>
          <a href="tel:${SITE.phoneRaw}">${iconPhone()} ${SITE.phone}</a>
        </div>
      </div>
      <div class="modal-body">
        <div data-quote-body>${quoteFormBody({ compact: true })}</div>
      </div>
    </div>
  </div>
</div>`;
}

function chatWidget() {
  return `
<div class="chat">
  <div class="chat-panel">
    <div class="chat-head">
      <button type="button" class="chat-close" aria-label="Close chat">${iconClose()}</button>
      <div class="row">
        <span class="ic">${iconSparkle()}</span>
        <div>
          <strong>Carolina Commercial Cleaning</strong>
          <span class="status"><span class="dot"></span>How can we help?</span>
        </div>
      </div>
    </div>
    <div class="chat-messages">
      <div class="chat-msg bot"><div class="chat-bubble">Hi! Need a cleaning quote? Send us a message and we&rsquo;ll follow up soon.</div></div>
    </div>
    <div class="chat-actions">
      <small>Quick options</small>
      <div class="row">
        <button type="button" class="chat-pill primary" data-open-quote>${iconCalendar()} Get a Quote</button>
        <a class="chat-pill secondary" href="tel:${SITE.phoneRaw}">${iconPhone()} Call Now</a>
        <a class="chat-pill outline" href="./services.html">Services ${iconArrowRight()}</a>
      </div>
    </div>
    <form class="chat-input">
      <input type="text" placeholder="Type your message..." aria-label="Type your message" />
      <button type="submit" class="chat-send" aria-label="Send" disabled>${iconSend()}</button>
    </form>
  </div>
  <button type="button" class="chat-toggle" aria-label="Open chat" aria-expanded="false">
    <span class="ic-open">${iconMessage()}</span>
    <span class="ic-close">${iconChevDown()}</span>
    <span class="chat-dot"></span>
  </button>
</div>`;
}

function pageEnd(extraSchema = "") {
  return `
${stickyCta()}
${footer()}
${chatWidget()}
${quoteModal()}
${extraSchema}
<script src="./scripts.js" defer></script>
</body>
</html>`;
}

/* ============================================================
   Reusable sections
   ============================================================ */
function pageHero({ eyebrow, title, subtitle, crumbs = [] }) {
  const crumbHtml = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb">
         ${crumbs.map((c, i) => {
           const sep = i < crumbs.length - 1 ? `<span class="sep">/</span>` : "";
           if (c.href) return `<a href="${c.href}">${c.label}</a>${sep}`;
           return `<span>${c.label}</span>${sep}`;
         }).join("")}
       </nav>` : "";
  return `
<section class="pagehero bg-hero">
  <div class="bg-dots"></div>
  <div class="container" style="position:relative">
    ${crumbHtml}
    ${eyebrow ? `<span class="eyebrow-dark"><span class="dot"></span>${eyebrow}</span>` : ""}
    <h1>${title}</h1>
    ${subtitle ? `<p class="lead">${subtitle}</p>` : ""}
    <div class="pagehero-cta">
      <button class="btn btn-secondary" data-open-quote>Book Cleaning Now</button>
      <a class="btn btn-ghost-light" href="tel:${SITE.phoneRaw}">${iconPhone()} Call ${SITE.phone}</a>
    </div>
  </div>
</section>`;
}

function servicesPreview() {
  return `
<section class="section">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow">Our Services</span>
      <h2>Commercial-grade cleaning, built for every kind of space</h2>
      <p>From restaurants and retail to military base buildings and hundreds of homes — we deliver the same dependable quality everywhere we work.</p>
    </div>
    <div class="svc-grid">
      ${services.map((s) => `
        <a class="card is-hover svc-card" href="./${s.file}">
          <span class="ic">${s.icon}</span>
          <h3>${s.name}</h3>
          <p>${s.blurb}</p>
          <span class="more">Learn more ${iconArrowRight()}</span>
        </a>`).join("")}
    </div>
  </div>
</section>`;
}

function clientsSlider() {
  const items = [
    { kind: "logo", name: "Wendy's", png: "./assets/clients/wendys.png", webp: "./assets/clients/wendys.webp" },
    { kind: "logo", name: "Dunkin' Donuts", png: "./assets/clients/dunkin.png", webp: "./assets/clients/dunkin.webp" },
    { kind: "logo", name: "Tractor Supply Co.", png: "./assets/clients/tractor-supply.png", webp: "./assets/clients/tractor-supply.webp" },
    { kind: "wordmark", name: "Hwy 55", sub: "Burgers · Shakes · Fries", color: "#D72027" },
    { kind: "icon", name: "Health Department", sub: "Government", icon: iconLandmark() },
    { kind: "icon", name: "Court House", sub: "Government", icon: iconLandmark() },
    { kind: "icon", name: "Local Schools", sub: "Education", icon: iconGradCap() },
    { kind: "icon", name: "Local Gyms", sub: "Fitness", icon: iconDumbbell() },
    { kind: "icon", name: "Military Base Buildings", sub: "200+ on Lejeune & MCAS", icon: iconShield() },
  ];
  const cards = items.map((it) => {
    if (it.kind === "logo") {
      return `<div class="client-card" title="${it.name}">
        <picture>
          <source srcset="${it.webp}" type="image/webp" />
          <img src="${it.png}" alt="${it.name} logo" loading="lazy" />
        </picture>
      </div>`;
    }
    if (it.kind === "wordmark") {
      return `<div class="client-card wordmark" title="${it.name}">
        <span class="w" style="color:${it.color}">${it.name}</span>
        <span>${it.sub}</span>
      </div>`;
    }
    return `<div class="client-card with-icon" title="${it.name}">
      <span class="ic">${it.icon}</span>
      <span class="meta"><strong>${it.name}</strong><span>${it.sub}</span></span>
    </div>`;
  }).join("");

  return `
<section class="clients">
  <div class="bg-dots"></div>
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow-dark">Trusted Partners</span>
      <h2 style="color:#fff">Trusted By Businesses &amp; Facilities Across Eastern North Carolina</h2>
      <p style="color:#cad6e6">From national restaurant brands to government, schools, gyms, and over 200 buildings on local military bases — we&rsquo;ve cleaned them all.</p>
    </div>
  </div>
  <div class="slider-wrap">
    <div class="slider-track">
      ${cards}
    </div>
    <div class="fade l"></div>
    <div class="fade r"></div>
  </div>
</section>`;
}

function aboutTeam() {
  return `
<section class="section bg-soft">
  <div class="container about-grid">
    <div>
      <div class="team-photo-wrap">
        <!--
          Team photo - real photo from /assets/team/.
          To swap: drop a new file at ./assets/team/team-photo.jpg (and .webp)
        -->
        <picture>
          <source srcset="./assets/team/team-photo.webp" type="image/webp" />
          <img class="team-photo"
               src="./assets/team/team-photo.jpg"
               alt="The Carolina Commercial Cleaning Services Inc team — locally owned in Richlands, NC since 2006" />
        </picture>
        <div class="team-photo-tag">
          <strong>The Carolina Commercial Cleaning family</strong>
          <span>Together since ${SITE.founded} — built on trust, consistency, and care.</span>
        </div>
      </div>
    </div>
    <div class="about-copy">
      <span class="eyebrow">About Us</span>
      <h2>A locally-owned cleaning company that&rsquo;s been growing every year since 2006.</h2>
      <div class="lead-block">
        <p>${SITE.name} was established in ${SITE.founded} as a residential cleaning company. As customer needs grew, the company expanded into post-construction cleaning, janitorial services, and commercial cleaning.</p>
        <p>Since then, the company has continued to grow each year by adding services, employees, and satisfied customers.</p>
        <p>Through the years, many cleaning companies have come and gone in the area. ${SITE.shortName} has remained because of its commitment to customer satisfaction, quality work, and reasonable pricing.</p>
        <p>The company believes in doing more than customers expect — and its greatest advertising comes from happy clients.</p>
      </div>
      <ul class="pillars">
        <li class="pillar">
          <span class="ic">${iconUsers()}</span>
          <strong>Family-rooted team</strong>
          <span>Long-tenured employees who treat your space like their own.</span>
        </li>
        <li class="pillar">
          <span class="ic">${iconHeart()}</span>
          <strong>Customer-first</strong>
          <span>We do more than expected — happy clients are our best advertising.</span>
        </li>
        <li class="pillar">
          <span class="ic">${iconAward()}</span>
          <strong>Quality that lasts</strong>
          <span>Detailed scopes, supervised crews, and consistent results since 2006.</span>
        </li>
      </ul>
      <dl class="stats">
        <div class="stat"><dt>Years in Business</dt><dd>20+</dd></div>
        <div class="stat"><dt>Buildings on Base</dt><dd>200+</dd></div>
        <div class="stat"><dt>Of Homes Served</dt><dd>Hundreds</dd></div>
        <div class="stat"><dt>Local Gyms Cleaned</dt><dd>5</dd></div>
      </dl>
    </div>
  </div>
</section>`;
}

function legacyBanner() {
  return `
<section class="legacy">
  <div class="container">
    <div class="legacy-card">
      <div class="legacy-grid">
        <div class="legacy-photo">
          <picture>
            <source srcset="./assets/team/team-photo.webp" type="image/webp" />
            <img src="./assets/team/team-photo.jpg"
                 alt="${SITE.name} team — a multi-generational, family-rooted cleaning company in Eastern North Carolina" />
          </picture>
        </div>
        <div class="legacy-text">
          <span class="eyebrow-dark">Our Legacy</span>
          <h2>Twenty years strong — built by people who care.</h2>
          <p>Cleaning companies come and go in our area. We&rsquo;ve been here since ${SITE.founded} because our team treats every building like it&rsquo;s our own — and our clients keep referring us because of it.</p>
          <dl class="legacy-mini">
            <div class="m"><dt>Established</dt><dd class="big">${SITE.founded}</dd></div>
            <div class="m"><dt>Based In</dt><dd>Richlands, NC</dd></div>
            <div class="m"><dt>Promise</dt><dd>Quality first</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function clientsHighlight() {
  const data = [
    { ic: iconShoppingBag(), title: "Retail",        ex: "Tractor Supply",                        detail: "Multi-location retail cleaning programs" },
    { ic: iconUtensils(),    title: "Restaurants",   ex: "Wendy's, Hwy 55",                       detail: "Front-of-house and BOH deep cleans" },
    { ic: iconCoffee(),      title: "Quick Serve",   ex: "Dunkin' Donuts",                        detail: "Daily and overnight refreshes" },
    { ic: iconPlane(),       title: "Aviation",      ex: "3 Hangars",                             detail: "Hangar floors, offices, and shops" },
    { ic: iconLandmark(),    title: "Government",    ex: "Health Dept., Courthouse, Jail",        detail: "Sensitive-environment janitorial" },
    { ic: iconDumbbell(),    title: "Fitness",       ex: "5 Local Gyms",                          detail: "Sanitization-focused programs" },
    { ic: iconGradCap(),     title: "Education",     ex: "3 Schools",                             detail: "Daily janitorial and floor care" },
    { ic: iconShield(),      title: "Military Bases",ex: "200+ Buildings",                        detail: "Camp Lejeune & MCAS New River" },
    { ic: iconBuilding(),    title: "Residential",   ex: "Hundreds of Homes",                     detail: "Recurring and one-time service" },
  ];
  return `
<section class="section">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow">Client Experience</span>
      <h2>Trusted by Businesses, Facilities, and Homeowners Across Eastern North Carolina</h2>
      <p>Our crews have served everything from nationally-known restaurants and big-box retail to military base buildings, government facilities, gyms, schools, and hundreds of homes.</p>
    </div>
    <div class="experience-grid">
      ${data.map((d) => `
        <div class="card is-hover exp-card">
          <span class="ic">${d.ic}</span>
          <div>
            <h3>${d.title}</h3><span class="examples">${d.ex}</span>
            <p>${d.detail}</p>
          </div>
        </div>`).join("")}
    </div>
  </div>
</section>`;
}

function serviceAreasPreview() {
  return `
<section class="section bg-soft">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow">Service Areas</span>
      <h2>Serving Richlands &amp; Eastern North Carolina</h2>
      <p>Local routes, local teams, and fast response across Onslow County and beyond.</p>
    </div>
    <div class="areas-grid">
      ${areas.map((a) => `
        <a class="card is-hover area-card" href="./${a.file}">
          <span class="ic">${iconMapPin()}</span>
          <h3>${a.name}</h3>
          <p>${a.blurb}</p>
          <span class="more">View ${a.shortName} ${iconArrowRight()}</span>
        </a>`).join("")}
    </div>
  </div>
</section>`;
}

function quoteSection() {
  return `
<section id="book" class="quote-section">
  <div class="container quote-grid">
    <div class="quote-copy">
      <span class="eyebrow">Book Cleaning Now</span>
      <h2>Request Your Free Cleaning Quote</h2>
      <p class="lead-p">Tell us what type of space you need cleaned, where it is located, and how soon you are looking to get started. We&rsquo;ll follow up with pricing, availability, and the best cleaning plan for your needs.</p>
      <ul class="quote-bullets">
        <li>${iconCheckCircle()}<span>Free, no-obligation estimates</span></li>
        <li>${iconCheckCircle()}<span>Locally owned and operated since 2006</span></li>
        <li>${iconCheckCircle()}<span>Commercial, residential, and post-construction cleaning</span></li>
        <li>${iconCheckCircle()}<span>Trusted by businesses, facilities, and homeowners across Eastern NC</span></li>
      </ul>
    </div>
    <div>
      <div class="card card-pad">
        <div data-quote-body>${quoteFormBody({ compact: false })}</div>
      </div>
    </div>
  </div>
</section>`;
}

function finalCta() {
  return `
<section class="final-cta">
  <div class="bg-dots"></div>
  <div class="container">
    <div class="inner">
      <span class="eyebrow-dark">When the quality matters</span>
      <h2>Ready for dependable, professional cleaning?</h2>
      <p>Whether you run a single location or manage a multi-building facility, our team is ready to put nearly two decades of local experience to work for you.</p>
      <div class="actions">
        <button class="btn btn-secondary" data-open-quote>Book Cleaning Now</button>
        <a class="btn btn-ghost-light" href="tel:${SITE.phoneRaw}">${iconPhone()} Call ${SITE.phone}</a>
      </div>
    </div>
  </div>
</section>`;
}

/* ============================================================
   Page builders
   ============================================================ */
function pageHome() {
  const hero = `
<section class="hero bg-hero">
  <div class="bg-dots"></div>
  <div class="container hero-grid">
    <div>
      <span class="eyebrow-dark"><span class="dot"></span>Serving Eastern NC since ${SITE.founded}</span>
      <h1>Professional Commercial &amp; Residential Cleaning in <span class="hl">Richlands, NC</span></h1>
      <p class="lead">${SITE.name} has provided dependable janitorial, post-construction, commercial, and residential cleaning services since ${SITE.founded}.</p>
      <div class="hero-cta">
        <button class="btn btn-secondary" data-open-quote>Book Cleaning Now</button>
        <a class="btn btn-ghost-light" href="tel:${SITE.phoneRaw}">${iconPhone()} Call ${SITE.phone}</a>
      </div>
    </div>
    <div class="hero-visual">
      <!--
        HERO IMAGE — commercial cleaning crew + ride-on scrubber in a modern
        lobby. Naturally integrated with a left-edge dark blend so it melts
        into the navy hero background. To swap, replace the two files at
        ./assets/brand/hero-commercial.{jpg,webp}.
      -->
      <div class="hero-image-wrap">
        <picture>
          <source srcset="./assets/brand/hero-commercial.webp" type="image/webp" />
          <img class="hero-image"
               src="./assets/brand/hero-commercial.jpg"
               alt="${SITE.name} crew operating a ride-on floor scrubber in a modern office lobby"
               loading="eager" width="1600" height="1856" />
        </picture>
        <span class="hero-image-ring"></span>
      </div>
      <div class="hero-tag hero-tag-top">
        <span class="ic">${iconAward()}</span>
        <div>
          <div class="lbl">Established</div>
          <div class="val">Since ${SITE.founded}</div>
        </div>
      </div>
      <div class="hero-tag hero-tag-bottom">
        <span class="ic">${iconShieldCheck()}</span>
        <div>
          <div class="t">Fully Insured &amp; Locally Owned</div>
          <div class="s">${SITE.city}, ${SITE.region} • ${SITE.postalCode}</div>
        </div>
      </div>
    </div>
  </div>
</section>`;
  const body =
    head({
      title: `${SITE.name} | Commercial & Residential Cleaning in Richlands, NC`,
      description:
        "Locally owned commercial, janitorial, post-construction, and residential cleaning company serving Richlands, Jacksonville, Onslow County, and Sneads Ferry, NC since 2006.",
      path: "/",
    }) +
    header() +
    hero +
    servicesPreview() +
    clientsSlider() +
    aboutTeam() +
    clientsHighlight() +
    serviceAreasPreview() +
    quoteSection() +
    finalCta() +
    pageEnd();
  return body;
}

function pageAbout() {
  return head({
    title: `About ${SITE.shortName} | Trusted Cleaning Company Since 2006`,
    description: `${SITE.name} has served commercial and residential clients across Eastern North Carolina since ${SITE.founded}. Locally owned, family-rooted, quality-focused.`,
    path: "/about",
  }) +
  header() +
  pageHero({
    eyebrow: "About Us",
    title: "A locally-owned cleaning company built on trust and quality.",
    subtitle: `Since ${SITE.founded}, ${SITE.name} has grown by doing more than customers expect — one happy client at a time.`,
    crumbs: [{ label: "Home", href: "./index.html" }, { label: "About" }],
  }) +
  legacyBanner() +
  aboutTeam() +
  clientsHighlight() +
  finalCta() +
  pageEnd();
}

function pageServicesIndex() {
  return head({
    title: "Cleaning Services in Richlands, NC | Commercial, Janitorial, Residential",
    description: "Explore our full range of cleaning services — commercial, janitorial, post-construction, residential, and deep cleaning across Eastern North Carolina.",
    path: "/services",
  }) +
  header() +
  pageHero({
    eyebrow: "Our Services",
    title: "Cleaning services built for every kind of space.",
    subtitle: "One trusted local team. Commercial, janitorial, post-construction, residential, and deep cleaning — across Eastern North Carolina.",
    crumbs: [{ label: "Home", href: "./index.html" }, { label: "Services" }],
  }) +
  servicesPreview() +
  quoteSection() +
  finalCta() +
  pageEnd();
}

function pageAreasIndex() {
  return head({
    title: "Service Areas | Cleaning in Richlands, Jacksonville & Onslow County, NC",
    description: "Carolina Commercial Cleaning Services Inc serves Richlands, Jacksonville, Onslow County, and Sneads Ferry, NC with commercial and residential cleaning.",
    path: "/service-areas",
  }) +
  header() +
  pageHero({
    eyebrow: "Service Areas",
    title: "Serving Richlands &amp; Eastern North Carolina.",
    subtitle: "Local crews, local routes, and dependable scheduling across Onslow County and beyond.",
    crumbs: [{ label: "Home", href: "./index.html" }, { label: "Service Areas" }],
  }) +
  serviceAreasPreview() +
  quoteSection() +
  finalCta() +
  pageEnd();
}

function pageClients() {
  return head({
    title: "Our Clients | Trusted Cleaning Across Eastern NC",
    description: "From Tractor Supply, Wendy's, and Dunkin' Donuts to military base buildings, schools, and gyms — see who trusts Carolina Commercial Cleaning Services Inc.",
    path: "/clients",
  }) +
  header() +
  pageHero({
    eyebrow: "Our Clients",
    title: "Trusted by businesses, facilities, and homeowners across Eastern North Carolina.",
    subtitle: "Hundreds of jobs across restaurants, retail, government, gyms, schools, hangars, and military base buildings.",
    crumbs: [{ label: "Home", href: "./index.html" }, { label: "Clients" }],
  }) +
  clientsSlider() +
  clientsHighlight() +
  finalCta() +
  pageEnd();
}

function pageContact() {
  const ccards = `
<section class="section bg-soft">
  <div class="container contact-cards">
    <a class="cc" href="tel:${SITE.phoneRaw}">
      <span class="ic">${iconPhone()}</span><strong>Phone</strong><span>${SITE.phone}</span>
    </a>
    <a class="cc" href="mailto:${SITE.email}">
      <span class="ic">${iconMail()}</span><strong>Email</strong><span>${SITE.email}</span>
    </a>
    <div class="cc">
      <span class="ic">${iconMapPin()}</span><strong>Location</strong><span>${SITE.city}, ${SITE.region} ${SITE.postalCode}</span>
    </div>
    <div class="cc">
      <span class="ic">${iconClock()}</span><strong>Hours</strong><span>Mon–Fri 7AM–6PM</span>
    </div>
  </div>
</section>`;
  return head({
    title: "Contact & Book Cleaning Now | Richlands, NC",
    description: `Call ${SITE.phone} or request a free cleaning quote online. Serving Richlands, Jacksonville, Onslow County, and Sneads Ferry, NC.`,
    path: "/contact",
  }) +
  header() +
  pageHero({
    eyebrow: "Get In Touch",
    title: "Book your cleaning. Get a free quote.",
    subtitle: `Call ${SITE.phone}, email ${SITE.email}, or use the form below — we&rsquo;ll respond quickly with pricing and scheduling.`,
    crumbs: [{ label: "Home", href: "./index.html" }, { label: "Contact" }],
  }) +
  ccards +
  quoteSection() +
  pageEnd();
}

function pageService(s) {
  const others = services.filter((x) => x.slug !== s.slug);
  const cityName = "Richlands, NC";
  const main = `
<section class="section">
  <div class="container lead-layout">
    <div class="lead-main">
      <h2>Dependable ${s.name.toLowerCase()} for ${cityName} &amp; the surrounding area</h2>
      <p class="lead-p">${s.description}</p>

      <h3>What&rsquo;s included</h3>
      <ul class="lead-bullets">
        ${s.bullets.map((b) => `<li>${iconCheckCircle()}<span>${b}</span></li>`).join("")}
      </ul>

      <h3>Who we serve</h3>
      <div class="tag-row">
        ${s.audiences.map((a) => `<span class="tag">${a}</span>`).join("")}
      </div>

      <h3>Why ${SITE.shortName}?</h3>
      <p class="lead-p">We&rsquo;ve been serving ${cityName} and Eastern North Carolina since ${SITE.founded}. From hundreds of homes to over 200 buildings on local military bases, our crews bring consistent, commercial-grade quality to every job — and we back it with direct, local communication.</p>
    </div>

    <aside class="lead-aside">
      <div class="card">
        <h3>Get a fast, free quote</h3>
        <p>Tell us about your ${s.shortName.toLowerCase()} needs in ${cityName} and we&rsquo;ll respond quickly with pricing and scheduling.</p>
        <div class="actions">
          <button class="btn btn-primary btn-block" data-open-quote data-prefill-service="${s.name}">Book Cleaning Now</button>
          <a class="btn btn-outline btn-block" href="tel:${SITE.phoneRaw}">Call ${SITE.phone}</a>
        </div>
        <hr />
        <h4>Service Areas</h4>
        <div class="lead-list">
          ${areas.map((a) => `<a href="./${a.file}"><span class="lbl">${iconMapPin()}${a.name}</span>${iconArrowRight()}</a>`).join("")}
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="lead-other">
  <div class="container">
    <h2>Other cleaning services we offer</h2>
    <div class="lead-other-grid">
      ${others.map((x) => `
        <a class="card is-hover svc-card" href="./${x.file}">
          <h3>${x.name}</h3>
          <p>${x.tagline}</p>
          <span class="more">Learn more ${iconArrowRight()}</span>
        </a>`).join("")}
    </div>
  </div>
</section>`;

  const extra = cleaningServiceSchema({
    name: `${s.name} in ${cityName}`,
    description: s.description,
    url: SITE.url + "/" + s.file.replace(".html", ""),
    serviceType: s.name,
  });

  return head({
    title: titleForService(s),
    description: descriptionForService(s),
    path: "/" + s.file.replace(".html", ""),
  }) +
  header() +
  pageHero({
    eyebrow: s.shortName,
    title: `${s.name} in ${cityName}`,
    subtitle: s.blurb,
    crumbs: [
      { label: "Home", href: "./index.html" },
      { label: "Services", href: "./services.html" },
      { label: s.name },
    ],
  }) +
  main +
  quoteSection() +
  finalCta() +
  pageEnd(extra);
}

function pageArea(a) {
  const others = areas.filter((x) => x.slug !== a.slug);
  const main = `
<section class="section">
  <div class="container lead-layout">
    <div class="lead-main">
      <h2>Your local cleaning team in ${a.name}</h2>
      <p class="lead-p">${a.description}</p>

      <h3>What we cover in ${a.shortName}</h3>
      <ul class="lead-bullets">
        ${a.highlights.map((h) => `<li>${iconCheckCircle()}<span>${h}</span></li>`).join("")}
      </ul>

      <h3>Services available in ${a.shortName}</h3>
      <div class="lead-other-grid" style="margin-top:16px">
        ${services.map((s) => `
          <a class="card is-hover svc-card" href="./${s.file}">
            <h3 style="font-size:15px">${s.name}</h3>
            <span class="more" style="margin-top:10px">Learn more ${iconArrowRight()}</span>
          </a>`).join("")}
      </div>
    </div>

    <aside class="lead-aside">
      <div class="card">
        <h3>Request ${a.shortName} pricing</h3>
        <p>Tell us about your space and we&rsquo;ll send a fast, free estimate with scheduling options.</p>
        <div class="actions">
          <button class="btn btn-primary btn-block" data-open-quote>Book Cleaning Now</button>
          <a class="btn btn-outline btn-block" href="tel:${SITE.phoneRaw}">Call ${SITE.phone}</a>
        </div>
        <hr />
        <h4>Other Service Areas</h4>
        <div class="lead-list">
          ${others.map((x) => `<a href="./${x.file}"><span class="lbl">${iconMapPin()}${x.name}</span>${iconArrowRight()}</a>`).join("")}
        </div>
      </div>
    </aside>
  </div>
</section>`;

  const extra = cleaningServiceSchema({
    name: `Cleaning Services in ${a.name}`,
    description: a.description,
    url: SITE.url + "/" + a.file.replace(".html", ""),
    serviceType: "Cleaning Services",
    areaServed: [a.name],
  });

  return head({
    title: titleForArea(a),
    description: descriptionForArea(a),
    path: "/" + a.file.replace(".html", ""),
  }) +
  header() +
  pageHero({
    eyebrow: "Service Area",
    title: `Cleaning Services in ${a.name}`,
    subtitle: a.blurb,
    crumbs: [
      { label: "Home", href: "./index.html" },
      { label: "Service Areas", href: "./service-areas.html" },
      { label: a.name },
    ],
  }) +
  main +
  quoteSection() +
  finalCta() +
  pageEnd(extra);
}

/* ============================================================
   Per-page SEO copy
   ============================================================ */
function titleForService(s) {
  const map = {
    "commercial-cleaning": "Commercial Cleaning in Richlands, NC | Carolina Commercial Cleaning",
    "janitorial-services": "Janitorial Services in Richlands, NC | Schools, Gyms & Facilities",
    "post-construction-cleaning": "Post-Construction Cleaning in Richlands, NC | Punch-List Ready",
    "residential-cleaning": "Residential Cleaning in Richlands, NC | Weekly, Bi-Weekly & One-Time",
    "deep-cleaning": "Deep Cleaning in Richlands, NC | Top-to-Bottom Reset",
  };
  return map[s.slug];
}
function descriptionForService(s) {
  const map = {
    "commercial-cleaning":
      "Reliable, fully-insured commercial cleaning for offices, retail, restaurants, and facilities in Richlands, NC. Locally owned since 2006. Free quotes.",
    "janitorial-services":
      "Daily and nightly janitorial services in Richlands, NC for schools, gyms, hangars, and base buildings. Supervised crews, detailed scopes, dependable results.",
    "post-construction-cleaning":
      "Rough, final, and touch-up post-construction cleaning in Richlands, NC. Hundreds of new builds and remodels delivered punch-list ready for inspections.",
    "residential-cleaning":
      "House cleaning in Richlands, NC trusted by hundreds of local families. Weekly, bi-weekly, monthly, move-in / move-out, and one-time service. Free quote.",
    "deep-cleaning":
      "Detailed deep cleans in Richlands, NC for homes, restaurants, gyms, and commercial spaces. Hand-detailed surfaces, kitchens, baths, and fixtures.",
  };
  return map[s.slug];
}
function titleForArea(a) {
  const map = {
    "richlands-nc": "Cleaning Services in Richlands, NC | Local Crews Since 2006",
    "jacksonville-nc": "Cleaning Services in Jacksonville, NC | Commercial & Residential",
    "onslow-county-nc": "Cleaning Services in Onslow County, NC | County-Wide Coverage",
    "sneads-ferry-nc": "Cleaning Services in Sneads Ferry, NC | Coastal Homes & Rentals",
  };
  return map[a.slug];
}
function descriptionForArea(a) {
  const map = {
    "richlands-nc":
      "Commercial, janitorial, post-construction, and residential cleaning in Richlands, NC (28574). Family-owned, locally-rooted, and trusted since 2006.",
    "jacksonville-nc":
      "Commercial, janitorial, post-construction, and residential cleaning in Jacksonville, NC. Experienced with Camp Lejeune and MCAS New River facilities.",
    "onslow-county-nc":
      "County-wide commercial, janitorial, post-construction, and residential cleaning across Onslow County, NC. Local routes, local crews, dependable service.",
    "sneads-ferry-nc":
      "Residential, commercial, vacation-rental turn cleans, and deep cleaning in Sneads Ferry, NC. Coastal experience and dependable scheduling year-round.",
  };
  return map[a.slug];
}

/* ============================================================
   Write everything
   ============================================================ */
function write(file, content) {
  const path = resolve(OUT, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log("wrote", file);
}

write("index.html", pageHome());
write("about.html", pageAbout());
write("services.html", pageServicesIndex());
write("service-areas.html", pageAreasIndex());
write("clients.html", pageClients());
write("contact.html", pageContact());
services.forEach((s) => write(s.file, pageService(s)));
areas.forEach((a) => write(a.file, pageArea(a)));

// robots / sitemap
const allPages = [
  { p: "/", weight: 1.0 }, { p: "/about", weight: 0.8 },
  { p: "/services", weight: 0.8 }, { p: "/service-areas", weight: 0.8 },
  { p: "/clients", weight: 0.8 }, { p: "/contact", weight: 0.8 },
  ...services.map((s) => ({ p: "/" + s.file.replace(".html", ""), weight: 0.9 })),
  ...areas.map((a) => ({ p: "/" + a.file.replace(".html", ""), weight: 0.9 })),
];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((p) => `  <url><loc>${SITE.url}${p.p}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p.weight}</priority></url>`).join("\n")}
</urlset>`;
write("sitemap.xml", sitemap);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log("done.");
