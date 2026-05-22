import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white";
  className?: string;
  showText?: boolean;
}

export default function Logo({ variant = "default", className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative inline-block h-12 w-12 sm:h-14 sm:w-14 shrink-0">
        <Image
          src="/assets/logo/logo.png"
          alt="Summers Cleaning LLC logo"
          fill
          sizes="56px"
          className="object-contain drop-shadow-sm"
          priority
        />
      </span>
      {showText && (
        <span className="flex flex-col leading-tight">
          <span
            className={`font-display font-extrabold text-lg sm:text-xl tracking-tight ${
              variant === "white" ? "text-white" : "text-brand-navy"
            }`}
          >
            Summers Cleaning
          </span>
          <span
            className={`text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase ${
              variant === "white" ? "text-brand-aquaSoft" : "text-brand-aquaDeep"
            }`}
          >
            Clean Fresh Vibes
          </span>
        </span>
      )}
    </Link>
  );
}
