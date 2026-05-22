"use client";

import { useEffect, useRef, useState } from "react";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  name?: string;
}

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Choose one or more...",
  name,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  function remove(option: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange(value.filter((v) => v !== option));
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={value.join(", ")} />}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full min-h-[46px] rounded-xl border border-brand-navy/10 bg-white px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value.length === 0 ? (
          <span className="text-brand-slate/70">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {value.map((v) => (
              <span
                key={v}
                className="inline-flex items-center gap-1 rounded-full bg-brand-aquaMist px-2.5 py-1 text-xs font-semibold text-brand-aquaDeep"
              >
                {v}
                <span
                  onClick={(e) => remove(v, e)}
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-brand-aqua/30 cursor-pointer"
                  aria-label={`Remove ${v}`}
                >
                  <svg className="h-2.5 w-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="2" y1="2" x2="10" y2="10" />
                    <line x1="10" y1="2" x2="2" y2="10" />
                  </svg>
                </span>
              </span>
            ))}
          </div>
        )}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className={`h-4 w-4 text-brand-slate transition ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1.5 max-h-64 w-full overflow-y-auto rounded-xl bg-white shadow-soft ring-1 ring-brand-navy/10 p-1.5">
          {options.map((option) => {
            const selected = value.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-brand-navy hover:bg-brand-aquaMist transition"
              >
                <span
                  className={`inline-flex h-4 w-4 items-center justify-center rounded border-2 shrink-0 transition ${
                    selected
                      ? "bg-brand-aqua border-brand-aqua"
                      : "border-brand-navy/20 bg-white"
                  }`}
                >
                  {selected && (
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  )}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
