export const site = {
  name: "Summers Cleaning LLC",
  shortName: "Summers Cleaning",
  owner: "Summer",
  phone: "(843) 666-7733",
  phoneTel: "+18436667733",
  email: "summerscleaning4u@gmail.com",
  domain: "summerscleaning.com",
  rating: 5.0,
  reviewCount: 27,
  tagline: "Clean Fresh Vibes",
  primaryCity: "Charleston, SC",
  serviceArea: "Charleston, SC and surrounding Lowcountry areas",
  category: "Janitorial Service",
};

export type ServiceSlug =
  | "residential-cleaning"
  | "commercial-cleaning"
  | "deep-cleaning"
  | "move-in-move-out-cleaning"
  | "bathroom-cleaning"
  | "kitchen-cleaning"
  | "pet-friendly-cleaning";

export interface ServiceItem {
  slug: ServiceSlug;
  title: string;
  short: string;
  blurb: string;
  icon: string;
}

export const services: ServiceItem[] = [
  {
    slug: "residential-cleaning",
    title: "Residential Cleaning",
    short: "Home Cleaning",
    blurb:
      "Recurring and one-time home cleans using all-natural, pet-safe products that leave every room with Clean Fresh Vibes.",
    icon: "home",
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    short: "Office & Business",
    blurb:
      "Offices, small businesses, and Airbnb properties cleaned on a schedule that keeps your space professional and welcoming.",
    icon: "building",
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    short: "Top-to-Bottom Reset",
    blurb:
      "A thorough top-to-bottom reset for seasonal cleans, post-construction dust, or homes that need extra love.",
    icon: "sparkle",
  },
  {
    slug: "move-in-move-out-cleaning",
    title: "Move-In / Move-Out Cleaning",
    short: "Moving Day Ready",
    blurb:
      "Hand back the keys with confidence or arrive at a spotless new home — perfect for renters, sellers, and landlords.",
    icon: "box",
  },
  {
    slug: "bathroom-cleaning",
    title: "Bathroom Cleaning",
    short: "Showers, Tubs & Tile",
    blurb:
      "Showers, tubs, tile, and grout brought back to life with safe, non-toxic products that beat soap scum and mildew.",
    icon: "droplet",
  },
  {
    slug: "kitchen-cleaning",
    title: "Kitchen Cleaning",
    short: "Counters & Appliances",
    blurb:
      "Counters, cabinets, appliances, and sinks degreased and detailed using kitchen-safe, food-friendly cleaners.",
    icon: "utensils",
  },
  {
    slug: "pet-friendly-cleaning",
    title: "Pet-Friendly Cleaning",
    short: "Safe for Pets",
    blurb:
      "All-natural products, fur and dander removal, odor control, and litter-area attention — safe for cats, dogs, and humans.",
    icon: "paw",
  },
];

export type LocationSlug =
  | "charleston-sc"
  | "summerville-sc"
  | "ladson-sc"
  | "goose-creek-sc"
  | "hanahan-sc"
  | "north-charleston-sc"
  | "james-island-sc"
  | "folly-beach-sc"
  | "johns-island-sc"
  | "kiawah-island-sc"
  | "seabrook-island-sc"
  | "wadmalaw-island-sc"
  | "meggett-sc"
  | "hollywood-sc"
  | "ravenel-sc"
  | "adams-run-sc"
  | "awendaw-sc"
  | "wando-sc"
  | "isle-of-palms-sc"
  | "sullivans-island-sc"
  | "mount-pleasant-sc"
  | "ridgeville-sc"
  | "bonneau-sc";

export interface LocationItem {
  slug: LocationSlug;
  name: string;
  displayName: string;
}

export const locations: LocationItem[] = [
  { slug: "charleston-sc", name: "Charleston", displayName: "Charleston, SC" },
  { slug: "summerville-sc", name: "Summerville", displayName: "Summerville, SC" },
  { slug: "ladson-sc", name: "Ladson", displayName: "Ladson, SC" },
  { slug: "goose-creek-sc", name: "Goose Creek", displayName: "Goose Creek, SC" },
  { slug: "hanahan-sc", name: "Hanahan", displayName: "Hanahan, SC" },
  { slug: "north-charleston-sc", name: "North Charleston", displayName: "North Charleston, SC" },
  { slug: "james-island-sc", name: "James Island", displayName: "James Island, SC" },
  { slug: "folly-beach-sc", name: "Folly Beach", displayName: "Folly Beach, SC" },
  { slug: "johns-island-sc", name: "Johns Island", displayName: "Johns Island, SC" },
  { slug: "kiawah-island-sc", name: "Kiawah Island", displayName: "Kiawah Island, SC" },
  { slug: "seabrook-island-sc", name: "Seabrook Island", displayName: "Seabrook Island, SC" },
  { slug: "wadmalaw-island-sc", name: "Wadmalaw Island", displayName: "Wadmalaw Island, SC" },
  { slug: "meggett-sc", name: "Meggett", displayName: "Meggett, SC" },
  { slug: "hollywood-sc", name: "Hollywood", displayName: "Hollywood, SC" },
  { slug: "ravenel-sc", name: "Ravenel", displayName: "Ravenel, SC" },
  { slug: "adams-run-sc", name: "Adams Run", displayName: "Adams Run, SC" },
  { slug: "awendaw-sc", name: "Awendaw", displayName: "Awendaw, SC" },
  { slug: "wando-sc", name: "Wando", displayName: "Wando, SC" },
  { slug: "isle-of-palms-sc", name: "Isle of Palms", displayName: "Isle of Palms, SC" },
  { slug: "sullivans-island-sc", name: "Sullivan's Island", displayName: "Sullivan's Island, SC" },
  { slug: "mount-pleasant-sc", name: "Mount Pleasant", displayName: "Mount Pleasant, SC" },
  { slug: "ridgeville-sc", name: "Ridgeville", displayName: "Ridgeville, SC" },
  { slug: "bonneau-sc", name: "Bonneau", displayName: "Bonneau, SC" },
];

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
    })),
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    children: locations.map((l) => ({
      label: l.displayName,
      href: `/service-areas/${l.slug}`,
    })),
  },
  { label: "Before & After", href: "/before-after" },
  { label: "About Summer", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const beforeAfter = [
  {
    id: "shower-01",
    title: "Shower Restoration",
    description: "Soap scum and buildup lifted away — fresh, gleaming tile restored.",
    before: "/assets/before-after/shower-01-before.png",
    after: "/assets/before-after/shower-01-after.png",
  },
  {
    id: "blinds-02",
    title: "Blind Dust Removal",
    description: "Layers of dust and grime wiped from every slat for a clean, bright window.",
    before: "/assets/before-after/blinds-02-before.png",
    after: "/assets/before-after/blinds-02-after.png",
  },
  {
    id: "shower-track-03",
    title: "Shower Track Detail",
    description: "Grimy shower tracks and corners scrubbed back to like-new condition.",
    before: "/assets/before-after/shower-track-03-before.png",
    after: "/assets/before-after/shower-track-03-after.png",
  },
  {
    id: "shower-04",
    title: "Mold & Soap Scum Removal",
    description: "Mold, mildew, and stubborn soap scum removed safely without harsh chemicals.",
    before: "/assets/before-after/shower-04-before.png",
    after: "/assets/before-after/shower-04-after.png",
  },
  {
    id: "tub-05",
    title: "Tub Refresh",
    description: "Bathtub deep-cleaned and refreshed to a bright, welcoming finish.",
    before: "/assets/before-after/tub-05-before.png",
    after: "/assets/before-after/tub-05-after.png",
  },
];

export const reasons = [
  {
    title: "All-Natural Products",
    desc: "Plant-based, non-toxic cleaners that leave behind freshness — not chemical fumes.",
    icon: "leaf",
  },
  {
    title: "Pet-Friendly Cleaning",
    desc: "Safe around cats, dogs, and curious little ones. Paws and noses approved.",
    icon: "paw",
  },
  {
    title: "Residential & Commercial",
    desc: "From cozy homes to busy offices and Airbnb turnovers across the Lowcountry.",
    icon: "building",
  },
  {
    title: "Charleston Local",
    desc: "A locally owned business serving Charleston and the surrounding Lowcountry communities.",
    icon: "pin",
  },
  {
    title: "Reliable & Detail-Oriented",
    desc: "Show-up-on-time, do-it-right cleaning with the small details you'll actually notice.",
    icon: "check",
  },
  {
    title: "Clean Fresh Vibes",
    desc: "Every space we touch is left bright, breathable, and welcoming. That's the promise.",
    icon: "sparkle",
  },
];

export const reviews = [
  {
    name: "Ashley M.",
    location: "Mount Pleasant, SC",
    text:
      "Summer is incredible. My house has never felt so fresh and clean — and I love that she uses natural products that are safe for my two cats. Highly recommend!",
  },
  {
    name: "Jared P.",
    location: "Charleston, SC",
    text:
      "Booked Summers Cleaning for our Airbnb turnovers and she has been a lifesaver. Fast, thorough, and the place always smells amazing without that harsh chemical smell.",
  },
  {
    name: "Megan R.",
    location: "Summerville, SC",
    text:
      "Hired Summer for a deep clean before our move-in. Every surface sparkled. She even cleaned the inside of the oven and fridge perfectly. Clean Fresh Vibes for sure!",
  },
  {
    name: "Daniel K.",
    location: "James Island, SC",
    text:
      "Reliable, friendly, and detail-oriented. Summer treats our home like it's her own. The natural cleaners are a huge plus for our family.",
  },
  {
    name: "Brittany H.",
    location: "Goose Creek, SC",
    text:
      "I have a long-haired cat and pet hair was always an issue. Summer's pet-friendly cleaning is a game changer. The house smells fresh and my kitty is happy too.",
  },
  {
    name: "Chris T.",
    location: "Folly Beach, SC",
    text:
      "Excellent service for our vacation rental. Summer turns our place around fast between guests and the reviews from renters speak for themselves.",
  },
];

export const servicesNeeded = services.map((s) => s.title);

export const frequencies = [
  "One-Time",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Not Sure Yet",
];
