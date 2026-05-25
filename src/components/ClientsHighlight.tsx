import {
  Building2,
  Coffee,
  Dumbbell,
  GraduationCap,
  Landmark,
  Plane,
  Shield,
  ShoppingBag,
  Utensils,
} from "lucide-react";

const clientCategories = [
  {
    icon: ShoppingBag,
    title: "Retail",
    examples: "Tractor Supply",
    detail: "Multi-location retail cleaning programs",
  },
  {
    icon: Utensils,
    title: "Restaurants",
    examples: "Wendy's, Hwy 55",
    detail: "Front-of-house and BOH deep cleans",
  },
  {
    icon: Coffee,
    title: "Quick Serve",
    examples: "Dunkin' Donuts",
    detail: "Daily and overnight refreshes",
  },
  {
    icon: Plane,
    title: "Aviation",
    examples: "3 Hangars",
    detail: "Hangar floors, offices, and shops",
  },
  {
    icon: Landmark,
    title: "Government",
    examples: "Health Dept., Courthouse, Jail",
    detail: "Sensitive-environment janitorial",
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    examples: "5 Local Gyms",
    detail: "Sanitization-focused programs",
  },
  {
    icon: GraduationCap,
    title: "Education",
    examples: "3 Schools",
    detail: "Daily janitorial and floor care",
  },
  {
    icon: Shield,
    title: "Military Bases",
    examples: "200+ Buildings",
    detail: "Camp Lejeune & MCAS New River",
  },
  {
    icon: Building2,
    title: "Residential",
    examples: "Hundreds of Homes",
    detail: "Recurring and one-time service",
  },
];

export default function ClientsHighlight() {
  return (
    <section className="section bg-white">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Client Experience</span>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Trusted by Businesses, Facilities, and Homeowners Across Eastern
            North Carolina
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate1-600 sm:text-lg">
            Our crews have served everything from nationally-known restaurants
            and big-box retail to military base buildings, government
            facilities, gyms, schools, and hundreds of homes.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientCategories.map((c) => (
            <div
              key={c.title}
              className="card flex items-start gap-4 p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky2-100 text-sky2-700">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="text-base font-semibold text-navy-900">
                    {c.title}
                  </h3>
                  <p className="text-sm font-semibold text-sky2-700">
                    {c.examples}
                  </p>
                </div>
                <p className="mt-1 text-sm text-slate1-600">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
