import Link from "next/link";
import PawIcon from "./PawIcon";

const POINTS = [
  { title: "Cat-Friendly Homes", desc: "Soft cleaning for litter spaces, scratching posts, and feline-favorite spots." },
  { title: "Pet Odor Control", desc: "Natural deodorizers neutralize odors without overpowering chemical scents." },
  { title: "Fur & Hair Cleanup", desc: "Specialized tools and techniques to lift hair from carpet, furniture, and corners." },
  { title: "Paw Print Cleaning", desc: "Floors mopped with safe, residue-free products — perfect for pets and bare feet." },
  { title: "Litter Box Areas", desc: "Litter zones detailed and freshened so the whole room feels clean." },
  { title: "No Harsh Smells", desc: "Plant-based products leave behind real freshness — no chemical fog." },
];

export default function PetFriendly() {
  return (
    <section className="relative overflow-hidden bg-navy-wash py-20 sm:py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-20 -left-10 h-72 w-72 rounded-full bg-brand-aqua blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-gold blur-3xl" />
      </div>

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wider uppercase text-brand-gold ring-1 ring-white/15">
              <PawIcon className="h-4 w-4" />
              Pet-Friendly Cleaning
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Safe cleaning for{" "}
              <span className="text-brand-gold">families &amp; pets</span>
            </h2>
            <p className="mt-5 text-white/80 text-base sm:text-lg leading-relaxed">
              Summers Cleaning uses <strong className="text-white">all-natural, plant-based products</strong>{" "}
              that are safer for your pets and family while still delivering professional-level results.
              No mystery chemicals. No harsh fumes. Just Clean Fresh Vibes.
            </p>

            <div className="mt-7 rounded-2xl bg-brand-gold p-5 text-brand-navy shadow-gold">
              <div className="flex items-center gap-3">
                <PawIcon className="h-6 w-6" />
                <div>
                  <div className="font-extrabold text-lg">10% Off for Pet Owners</div>
                  <div className="text-sm font-semibold text-brand-navy/80">
                    Mention your pets when you book.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-gold">
                Claim Your 10% Pet Owner Discount
              </Link>
              <Link href="/services/pet-friendly-cleaning" className="btn-outline bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white">
                Learn More
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-white/10 backdrop-blur-sm p-5 ring-1 ring-white/15 transition hover:bg-white/15"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold text-brand-navy shrink-0">
                    <PawIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-bold text-white">{p.title}</div>
                    <p className="mt-1 text-sm text-white/75 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
