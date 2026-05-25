export const site = {
  name: "Carolina Commercial Cleaning Services Inc",
  shortName: "Carolina Commercial Cleaning",
  legalName: "Carolina Commercial Cleaning Services Inc",
  founded: "2006",
  taglines: [
    "When the quality matters.",
    "To Live, Work and Grow",
  ],
  primaryTagline: "When the quality matters.",
  phone: "(910) 467-6357",
  phoneRaw: "+19104676357",
  email: "Info@carolinascleaning.com",
  domain: "carolinascleaning.com",
  url: "https://carolinascleaning.com",
  address: {
    street: "",
    city: "Richlands",
    region: "NC",
    postalCode: "28574",
    country: "US",
  },
  geo: {
    latitude: 34.8979,
    longitude: -77.5469,
  },
  hours: [
    { day: "Mon-Fri", time: "7:00 AM – 6:00 PM" },
    { day: "Saturday", time: "By Appointment" },
    { day: "Sunday", time: "Closed" },
  ],
  social: {
    facebook: "",
    google: "",
  },
  serviceAreas: [
    "Richlands, NC",
    "Jacksonville, NC",
    "Onslow County, NC",
    "Sneads Ferry, NC",
    "Camp Lejeune",
    "MCAS New River",
  ],
};

export type ServiceSlug =
  | "commercial-cleaning"
  | "janitorial-services"
  | "post-construction-cleaning"
  | "residential-cleaning"
  | "deep-cleaning";

export const services: {
  slug: ServiceSlug;
  url: string;
  name: string;
  shortName: string;
  tagline: string;
  blurb: string;
  description: string;
  icon: "Building2" | "Sparkles" | "HardHat" | "Home" | "Droplets";
  heroImage: string;
  bullets: string[];
  audiences: string[];
}[] = [
  {
    slug: "commercial-cleaning",
    url: "/commercial-cleaning-richlands-nc",
    name: "Commercial Cleaning",
    shortName: "Commercial",
    tagline: "Commercial-grade cleaning for offices, retail, and facilities.",
    blurb:
      "Reliable, fully-insured commercial cleaning for offices, retail spaces, banks, medical facilities, and government buildings across Eastern North Carolina.",
    description:
      "Our commercial cleaning crews keep your business looking its best every day. From single-location storefronts to multi-building campuses, we tailor scopes and schedules to match your operations — with consistent quality and on-time performance.",
    icon: "Building2",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Offices, retail, banks, medical, and government",
      "Day porter, nightly, weekly, or custom schedules",
      "Trained, background-checked staff",
      "OSHA-compliant chemicals and equipment",
      "On-site supervision and quality audits",
    ],
    audiences: ["Restaurants", "Retail", "Medical Offices", "Government"],
  },
  {
    slug: "janitorial-services",
    url: "/janitorial-services-richlands-nc",
    name: "Janitorial Services",
    shortName: "Janitorial",
    tagline: "Recurring janitorial programs built around your facility.",
    blurb:
      "Daily, weekly, and nightly janitorial programs for schools, gyms, hangars, and military base buildings — backed by checklists, audits, and dependable people.",
    description:
      "We design recurring janitorial programs around your facility's traffic patterns and compliance requirements. Every job is supervised, documented, and quality-checked so you always know exactly what's being done.",
    icon: "Sparkles",
    heroImage:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Customizable nightly or daytime programs",
      "Restroom sanitation and restocking",
      "Floor care: VCT, tile, concrete, and carpet",
      "Trash and recycling management",
      "Detailed scopes of work and reporting",
    ],
    audiences: ["Schools", "Gyms", "Hangars", "Base Buildings"],
  },
  {
    slug: "post-construction-cleaning",
    url: "/post-construction-cleaning-richlands-nc",
    name: "Post-Construction Cleaning",
    shortName: "Post-Construction",
    tagline: "Punch-list ready, move-in clean — on schedule.",
    blurb:
      "Rough, final, and touch-up post-construction cleans that get new builds, remodels, and tenant fit-outs ready for inspections and grand openings.",
    description:
      "We've cleaned hundreds of new builds, remodels, and base projects across Eastern North Carolina. From dust extraction and debris haul-off to streak-free glass and detailed final passes — we know exactly what GCs need to hit punch list deadlines.",
    icon: "HardHat",
    heroImage:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Rough, final, and touch-up cleans",
      "Drywall dust extraction and debris removal",
      "Window, glass, and fixture detailing",
      "Floor scrub, polish, and seal",
      "Coordinated with GC schedules",
    ],
    audiences: ["General Contractors", "Builders", "Property Developers"],
  },
  {
    slug: "residential-cleaning",
    url: "/residential-cleaning-richlands-nc",
    name: "Residential Cleaning",
    shortName: "Residential",
    tagline: "House cleaning trusted by hundreds of local families.",
    blurb:
      "Weekly, bi-weekly, monthly, and one-time house cleaning that treats your home with the same care we've delivered since 2006.",
    description:
      "Whether you want a recurring clean to free up your weekends or a deep refresh before family visits, our residential teams bring consistent quality, friendly faces, and the same attention to detail in every room.",
    icon: "Home",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Weekly, bi-weekly, monthly, or one-time",
      "Move-in and move-out cleans",
      "Same-team consistency when possible",
      "Pet-friendly, family-safe products available",
      "Custom scopes for your priority areas",
    ],
    audiences: ["Homeowners", "Renters", "Realtors", "Property Managers"],
  },
  {
    slug: "deep-cleaning",
    url: "/deep-cleaning-richlands-nc",
    name: "Deep Cleaning",
    shortName: "Deep Clean",
    tagline: "Top-to-bottom deep cleans that reset every surface.",
    blurb:
      "Detailed top-to-bottom deep cleans for homes, restaurants, gyms, and commercial spaces that need a true reset.",
    description:
      "Our deep cleans go beyond routine maintenance — hand-detailed baseboards, vents, fixtures, kitchens, and bathrooms. Ideal for seasonal resets, post-event recovery, or preparing for inspections.",
    icon: "Droplets",
    heroImage:
      "https://images.unsplash.com/photo-1556909114-44e3e9399a2c?auto=format&fit=crop&w=1600&q=80",
    bullets: [
      "Hand-detailed surfaces and fixtures",
      "Baseboards, vents, blinds, and trim",
      "Kitchen degreasing and appliance detailing",
      "Bathroom descaling and sanitization",
      "Ideal for seasonal or pre-inspection resets",
    ],
    audiences: ["Homeowners", "Restaurants", "Gyms", "Commercial Spaces"],
  },
];

export type AreaSlug =
  | "richlands-nc"
  | "jacksonville-nc"
  | "onslow-county-nc"
  | "sneads-ferry-nc";

export const areas: {
  slug: AreaSlug;
  url: string;
  name: string;
  shortName: string;
  blurb: string;
  description: string;
  highlights: string[];
}[] = [
  {
    slug: "richlands-nc",
    url: "/cleaning-services-richlands-nc",
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
    url: "/cleaning-services-jacksonville-nc",
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
    url: "/cleaning-services-onslow-county-nc",
    name: "Onslow County, NC",
    shortName: "Onslow County",
    blurb:
      "County-wide commercial, janitorial, and residential cleaning.",
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
    url: "/cleaning-services-sneads-ferry-nc",
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

export const clients = [
  "Tractor Supply",
  "Wendy's",
  "Hwy 55",
  "Dunkin' Donuts",
  "Health Department",
  "Court House",
  "Local Gyms",
  "Schools",
  "Military Base Buildings",
];

export const trustStats = [
  { value: "20+", label: "Years in Business" },
  { value: "200+", label: "Buildings on Base" },
  { value: "Hundreds", label: "Of Homes Served" },
  { value: "5", label: "Local Gyms Cleaned" },
];

export type NavItem =
  | { label: string; href: string }
  | {
      label: string;
      href: string;
      children: { label: string; href: string; description?: string }[];
    };

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.name,
      href: s.url,
      description: s.tagline,
    })),
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: areas.map((a) => ({
      label: a.name,
      href: a.url,
      description: a.blurb,
    })),
  },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];
