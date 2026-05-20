export const site = {
  name: "The Perfect Clean LLC",
  shortName: "The Perfect Clean",
  owner: "Jessica",
  phone: "(252) 668-1898",
  phoneTel: "+12526681898",
  domain: "theperfectcleanllc.net",
  rating: 5.0,
  reviewCount: 13, // matches reviews.length

  primaryCity: "Raleigh, NC",
  serviceArea: "Raleigh, NC and surrounding areas",
  serviceAreaLong:
    "Raleigh, NC and surrounding areas including Nash County, Durham, Cary, and Johnston County",
  surroundingAreas: ["Nash County", "Durham", "Cary", "Johnston County"],
  googleReviewUrl:
    "https://www.google.com/search?sca_esv=afc85aa92f7b31d4&rlz=1C5AJCO_enUS1195US1196&sxsrf=ANbL-n5UQFQh0sbosOvjoxCSuSJpNF9NoA:1779220170892&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOUSNcpoPA9JUE_p27pnPhb-xwduvgC32Xjm4IqWrW9U3gcIev6XDO35j0FjUh0izmyDnbKEjtyUMclJgKxLz6NCYqnldTFPaIGnWEnr5bOcrwxeKtw%3D%3D&q=The+Perfect+Clean+LLC+Reviews&sa=X&ved=2ahUKEwjWm43Sj8aUAxXwGFkFHUEvOUQQ0bkNegQINRAD",
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
  | "Kitchens"
  | "Hardwood Floors"
  | "Bathrooms"
  | "Bedrooms"
  | "Carpets";

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Kitchens",
  "Hardwood Floors",
  "Bathrooms",
  "Bedrooms",
  "Carpets",
];

export interface GalleryImage {
  src: string;
  category: GalleryCategory;
  caption: string;
  alt: string;
  width: number;
  height: number;
}

// Ordered so groups stay clustered even in "All": Kitchens → Hardwood Floors → Bathrooms → Bedrooms → Carpets.
// Intrinsic width/height drive the masonry column layout.
export const gallery: GalleryImage[] = [
  // Kitchens.
  {
    src: "/assets/gallery/kitchen-warm-island.png",
    category: "Kitchens",
    caption: "Wood-floor kitchen with polished island",
    alt: "Warm wood kitchen with island and freshly cleaned hardwood floor",
    width: 243,
    height: 406,
  },
  {
    src: "/assets/gallery/kitchen-white.png",
    category: "Kitchens",
    caption: "White cabinet kitchen detail",
    alt: "Kitchen with white cabinets, dark countertops, and stainless appliances",
    width: 243,
    height: 244,
  },
  {
    src: "/assets/gallery/kitchen-island.png",
    category: "Kitchens",
    caption: "Black island kitchen",
    alt: "Modern kitchen with black island and white countertop",
    width: 243,
    height: 304,
  },
  {
    src: "/assets/gallery/kitchen-wood.png",
    category: "Kitchens",
    caption: "Wood cabinet kitchen",
    alt: "Wood cabinet kitchen with dark countertop and light hardwood floor",
    width: 243,
    height: 406,
  },
  {
    src: "/assets/gallery/kitchen-darkwood-floor.png",
    category: "Kitchens",
    caption: "Kitchen with dark wood floor",
    alt: "Kitchen with granite counters and clean dark wood floor",
    width: 243,
    height: 203,
  },

  // Hardwood Floors.
  {
    src: "/assets/gallery/hardwood-2.png",
    category: "Hardwood Floors",
    caption: "Open-plan hardwood floor",
    alt: "Open living area with freshly cleaned dark hardwood floor",
    width: 243,
    height: 304,
  },
  {
    src: "/assets/gallery/hardwood-1.png",
    category: "Hardwood Floors",
    caption: "Polished hardwood entry",
    alt: "Shiny dark hardwood floor reflecting natural light near a doorway",
    width: 243,
    height: 304,
  },
  {
    src: "/assets/gallery/tile-entryway.png",
    category: "Hardwood Floors",
    caption: "Tile entryway shine",
    alt: "Tiled entryway with sliding doors and clean tile floor",
    width: 243,
    height: 244,
  },

  // Bathrooms.
  {
    src: "/assets/gallery/bathroom-tub.png",
    category: "Bathrooms",
    caption: "Bath and tub combo",
    alt: "Clean bathroom with white bathtub and toilet on hardwood-look floor",
    width: 243,
    height: 406,
  },
  {
    src: "/assets/gallery/bathroom-shower.png",
    category: "Bathrooms",
    caption: "Walk-in shower bathroom",
    alt: "White walk-in shower next to clean toilet in a refreshed bathroom",
    width: 243,
    height: 304,
  },
  {
    src: "/assets/gallery/bathroom-tile-shower.png",
    category: "Bathrooms",
    caption: "Spotless tile shower",
    alt: "Tile shower with light gray walls and clean white base",
    width: 243,
    height: 304,
  },
  {
    src: "/assets/gallery/bathroom-bathtub.png",
    category: "Bathrooms",
    caption: "Polished white bathtub",
    alt: "Freshly cleaned white bathtub with shiny finish",
    width: 243,
    height: 244,
  },

  // Bedrooms.
  {
    src: "/assets/gallery/bedroom-1.png",
    category: "Bedrooms",
    caption: "Bedroom made up and dusted",
    alt: "Freshly made bedroom with neat bed and clean floor",
    width: 243,
    height: 244,
  },

  // Carpets.
  {
    src: "/assets/gallery/carpet-dining.png",
    category: "Carpets",
    caption: "Dining area carpet refresh",
    alt: "Dining area carpet with fresh cleaning marks and striped pillow",
    width: 243,
    height: 406,
  },
  {
    src: "/assets/gallery/carpet-fresh.png",
    category: "Carpets",
    caption: "Carpet with fresh sweep lines",
    alt: "Beige carpet showing freshly cleaned sweep lines",
    width: 243,
    height: 244,
  },
  {
    src: "/assets/gallery/carpet-texture.png",
    category: "Carpets",
    caption: "Carpet close-up detail",
    alt: "Close-up of carpet freshly cleaned with visible texture",
    width: 243,
    height: 244,
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

export const reviews: { name: string; text: string }[] = [
  {
    name: "Peggy Blackburn",
    text:
      "Rick was great! He was quick and flexible with his schedule and his work was excellent! Great master of all trades!",
  },
  {
    name: "Aliyah N (Umm Ibraheem)",
    text:
      "Jessica is a very nice person and efficient in her work. She wants to make sure she does what she can to please the client. The main thing I needed help with was laundry. Jessica was able to fold our clothes, organize my children’s closet and storage closet in a timely manner. I have been a repeat customer of hers and definitely recommend if you need help with cleaning and organizing.",
  },
  {
    name: "Durham Cleaning Pros",
    text:
      "Jessica’s team is amazing to work with and has stepped in on commercial opportunities and crushed it every time! I would highly recommend working with the Perfect Clean for residential and commercial jobs.",
  },
  {
    name: "Jonne Boone",
    text:
      "Jessica is willing to go way beyond the extra mile. I hired her to clean our house after a huge and messy move and she stayed for hours and did many things we simply could not do because of time restraints. So I hired her to clean my office as well. That was 3 years ago. She recently did the same thing at my office.",
  },
  {
    name: "ραιи fυll",
    text:
      "Very professional she did a wonderful job cleaning my house. I would recommend her to anyone. If your looking for someone to clean your house very professionally she is your person you will not regret it.",
  },
  {
    name: "L Cheeks",
    text:
      "5 stars!!! Jessica is amazing, I booked her last minute and perfectly cleaned my house!! Highly recommended.",
  },
  {
    name: "Pedro Rosario",
    text: "Jessica and her team clean our church and they do an excellent job",
  },
  {
    name: "Rob Wright",
    text:
      "Awesome Customer Service and very professional. This company is committed to getting the job right and exceeded expectations!",
  },
  {
    name: "Rissa greene",
    text: "very reliable and got the job done! very much recommend 😁",
  },
  {
    name: "Michael Germaine",
    text: "Jessica is a really good person with a good heart",
  },
  {
    name: "Craig McDaniel",
    text: "Outstanding service. Book now!",
  },
  { name: "Wilma Gainey", text: "" },
  { name: "Marchia Jones", text: "" },
];

export const servicesNeeded = [
  "Residential Cleaning",
  "AirBnB / STR Cleaning",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Standard Cleaning",
  "Move-In / Move-Out Cleaning",
  "Carpet & Rug Cleaning",
  "Appliance Cleaning",
  "Decluttering",
  "Detailing",
  "Other",
];

export const frequencies = [
  "One-Time",
  "Weekly",
  "Bi-Weekly",
  "Monthly",
  "Not Sure Yet",
];
