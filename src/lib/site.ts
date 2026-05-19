export const site = {
  name: "The Perfect Clean LLC",
  shortName: "The Perfect Clean",
  phone: "(252) 668-1898",
  phoneTel: "+12526681898",
  domain: "theperfectcleanllc.net",
  rating: 5.0,
  reviewCount: 13,
  serviceArea: "Wake County and surrounding areas",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Transformations", href: "#transformations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Residential Cleaning",
    desc: "Recurring or one-time house cleaning that leaves every room fresh, tidy, and welcoming.",
    icon: "home",
  },
  {
    title: "AirBnB / STR Cleaning",
    desc: "Fast, detail-oriented turnovers between guests so your listing always earns five stars.",
    icon: "key",
  },
  {
    title: "Commercial Cleaning",
    desc: "Offices, churches, and commercial spaces cleaned on a schedule that fits your business.",
    icon: "building",
  },
  {
    title: "Deep Cleaning",
    desc: "Top-to-bottom deep cleans for buildup, neglected spaces, or seasonal resets.",
    icon: "sparkle",
  },
  {
    title: "Standard Cleaning",
    desc: "Regular maintenance cleans covering dusting, surfaces, floors, kitchens, and bathrooms.",
    icon: "broom",
  },
  {
    title: "Move-In / Move-Out Cleaning",
    desc: "Reset a space for the next tenant or arrive at a fresh home on day one.",
    icon: "box",
  },
  {
    title: "Carpet & Rug Cleaning",
    desc: "Lift dirt, refresh fibers, and bring tired carpets back to life.",
    icon: "rug",
  },
  {
    title: "Appliance Cleaning",
    desc: "Ovens, fridges, microwaves, and more, cleaned inside and out.",
    icon: "fridge",
  },
  {
    title: "Decluttering & Detailing",
    desc: "Organize, tidy, and detail rooms so they feel calm and intentional.",
    icon: "stack",
  },
  {
    title: "Blinds, Drapes, Walls & Ceilings",
    desc: "Often-missed surfaces dusted and wiped for a truly complete clean.",
    icon: "window",
  },
];

export const beforeAfter = [
  {
    id: "pair1",
    title: "Cluttered Bedroom Reset",
    description: "Trash and clutter cleared, floors mopped, room restored.",
    before: "/assets/before-after/pair1-before.png",
    after: "/assets/before-after/pair1-after.png",
  },
  {
    id: "pair2",
    title: "Living Room Refresh",
    description: "Surfaces wiped, items organized, hardwoods polished.",
    before: "/assets/before-after/pair2-before.png",
    after: "/assets/before-after/pair2-after.png",
  },
  {
    id: "pair3",
    title: "Bedroom Tidy-Up",
    description: "Beds made, floors cleared, room ready to rest in.",
    before: "/assets/before-after/pair3-before.png",
    after: "/assets/before-after/pair3-after.png",
  },
];

export type GalleryCategory =
  | "Bedrooms"
  | "Hardwood Floors"
  | "Kitchens"
  | "Bathrooms"
  | "Carpets"
  | "Tile & Entryways";

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Bedrooms",
  "Hardwood Floors",
  "Kitchens",
  "Bathrooms",
  "Carpets",
  "Tile & Entryways",
];

export interface GalleryImage {
  src: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
}

export const gallery: GalleryImage[] = [
  {
    src: "/assets/gallery/bedroom-1.png",
    category: "Bedrooms",
    caption: "Bedroom made up and dusted",
    alt: "Freshly made bedroom with neat bed and clean floor",
  },
  {
    src: "/assets/gallery/hardwood-1.png",
    category: "Hardwood Floors",
    caption: "Polished hardwood entry",
    alt: "Shiny dark hardwood floor reflecting natural light near a doorway",
  },
  {
    src: "/assets/gallery/hardwood-2.png",
    category: "Hardwood Floors",
    caption: "Open-plan hardwood floor",
    alt: "Open living area with freshly cleaned dark hardwood floor",
  },
  {
    src: "/assets/gallery/kitchen-white.png",
    category: "Kitchens",
    caption: "White cabinet kitchen detail",
    alt: "Kitchen with white cabinets, dark countertops, and stainless appliances",
  },
  {
    src: "/assets/gallery/kitchen-yellow.png",
    category: "Kitchens",
    caption: "Warm yellow kitchen",
    alt: "Kitchen with yellow walls, wood cabinets, and clean countertops",
  },
  {
    src: "/assets/gallery/kitchen-wood.png",
    category: "Kitchens",
    caption: "Wood cabinet kitchen",
    alt: "Wood cabinet kitchen with dark countertop and light hardwood floor",
  },
  {
    src: "/assets/gallery/kitchen-island.png",
    category: "Kitchens",
    caption: "Black island kitchen",
    alt: "Modern kitchen with black island and white countertop",
  },
  {
    src: "/assets/gallery/bathroom-tub.png",
    category: "Bathrooms",
    caption: "Bath and tub combo",
    alt: "Clean bathroom with white bathtub and toilet on hardwood-look floor",
  },
  {
    src: "/assets/gallery/bathroom-shower.png",
    category: "Bathrooms",
    caption: "Walk-in shower bathroom",
    alt: "White walk-in shower next to clean toilet in a refreshed bathroom",
  },
  {
    src: "/assets/gallery/bathroom-tile-shower.png",
    category: "Bathrooms",
    caption: "Spotless tile shower",
    alt: "Tile shower with light gray walls and clean white base",
  },
  {
    src: "/assets/gallery/bathroom-bathtub.png",
    category: "Bathrooms",
    caption: "Polished white bathtub",
    alt: "Freshly cleaned white bathtub with shiny finish",
  },
  {
    src: "/assets/gallery/carpet-1.png",
    category: "Carpets",
    caption: "Cleaned bedroom carpet",
    alt: "Beige bedroom carpet showing fresh vacuum lines after cleaning",
  },
  {
    src: "/assets/gallery/carpet-2.png",
    category: "Carpets",
    caption: "Carpet close-up detail",
    alt: "Close-up of beige carpet freshly cleaned with visible texture",
  },
  {
    src: "/assets/gallery/carpet-dining.png",
    category: "Carpets",
    caption: "Dining area carpet refresh",
    alt: "Dining area carpet with fresh cleaning marks and striped pillow",
  },
  {
    src: "/assets/gallery/tile-entryway.png",
    category: "Tile & Entryways",
    caption: "Tile entryway shine",
    alt: "Tiled entryway with sliding doors and clean tile floor",
  },
];

export const reasons = [
  { title: "Supplies Included", desc: "We bring everything we need — no need to stock cleaning gear." },
  { title: "Flexible Scheduling", desc: "One-time, weekly, bi-weekly, or monthly — built around your week." },
  { title: "Free Estimates", desc: "No-cost, no-pressure quotes so you know exactly what to expect." },
  { title: "Detail-Focused Cleaning", desc: "Baseboards, blinds, behind appliances — the spots most cleaners skip." },
  { title: "Residential & Commercial", desc: "Homes, AirBnBs, offices, churches, and commercial spaces." },
  { title: "Move-In / Move-Out Ready", desc: "Hand back keys with confidence or arrive to a spotless home." },
];

export const reviews = [
  { name: "Church Client", text: "Jessica and her team clean our church and they do an excellent job." },
  { name: "Homeowner", text: "Very professional… wonderful job cleaning my house." },
  { name: "Happy Customer", text: "Outstanding service. Book now!" },
  { name: "Local Client", text: "Awesome customer service and very professional." },
  { name: "Homeowner", text: "Jessica is amazing… perfectly cleaned my house." },
  { name: "Repeat Client", text: "Jessica is a very nice person and efficient in her work." },
  { name: "Local Resident", text: "Very reliable and got the job done!" },
];

export const propertyTypes = [
  "Home",
  "Apartment",
  "AirBnB / STR",
  "Office",
  "Commercial Space",
  "Other",
];

export const servicesNeeded = [
  "Deep Cleaning",
  "Standard Cleaning",
  "Basic Cleaning",
  "Move-In / Move-Out",
  "Carpet Cleaning",
  "Appliance Cleaning",
  "Decluttering",
  "Commercial Cleaning",
  "Other",
];

export const frequencies = [
  "One-Time",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Not Sure Yet",
];
