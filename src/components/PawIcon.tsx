interface PawIconProps {
  className?: string;
}

export default function PawIcon({ className = "h-5 w-5" }: PawIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="6" cy="9" rx="1.8" ry="2.4" />
      <ellipse cx="10" cy="6.5" rx="1.8" ry="2.4" />
      <ellipse cx="14" cy="6.5" rx="1.8" ry="2.4" />
      <ellipse cx="18" cy="9" rx="1.8" ry="2.4" />
      <path d="M12 11.5c-3 0-5.4 2.2-5.4 4.6 0 1.7 1.3 2.9 3 2.9 1 0 1.7-.4 2.4-.4s1.4.4 2.4.4c1.7 0 3-1.2 3-2.9 0-2.4-2.4-4.6-5.4-4.6z" />
    </svg>
  );
}
