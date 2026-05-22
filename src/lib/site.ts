export const site = {
  name: "Summers Cleaning LLC",
  shortName: "Summers Cleaning",
  owner: "Summer",
  phone: "(843) 666-7733",
  phoneTel: "+18436667733",
  email: "summerscleaning4u@gmail.com",
  domain: "summerscleaning.com",
  rating: 5.0,
  reviewCount: 1,
  tagline: "Clean Fresh Vibes",
  primaryCity: "Charleston, SC",
  serviceArea: "Charleston, SC and surrounding Lowcountry areas",
  category: "Janitorial Service",
  facebookUrl: "https://www.facebook.com/profile.php?id=61559253422413",
  googleReviewUrl:
    "https://www.google.com/maps/place/Summers+Cleaning+LLC/@32.8353539,-80.1892377,10.45z/data=!4m18!1m9!3m8!1s0xd5442eee5dedb8f:0x1ce3f91e4fbb203d!2sSummers+Cleaning+LLC!8m2!3d32.8399876!4d-79.9465538!9m1!1b1!16s%2Fg%2F11y4zgfrr6!3m7!1s0xd5442eee5dedb8f:0x1ce3f91e4fbb203d!8m2!3d32.8399876!4d-79.9465538!9m1!1b1!16s%2Fg%2F11y4zgfrr6?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D",
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
    name: "Matthew Musick",
    location: "Google Review",
    text:
      "Summer and her team are TOP NOTCH. We use her for our home cleaning every month or so and it always feels squeaky clean after they've been here. They use all natural products that are dog-friendly which we so appreciate. Fairly priced too.\n\nDon't think twice! Call Summer for your regular cleaning and to clean up for - or from - your next hosting.",
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
