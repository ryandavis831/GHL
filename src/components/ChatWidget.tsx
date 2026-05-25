"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  ChevronDown,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: number;
  from: "bot" | "user";
  text: string;
};

const INTRO_MESSAGE =
  "Hi! Need a cleaning quote? Send us a message and we'll follow up soon.";

export default function ChatWidget() {
  const { openModal } = useQuoteModal();
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "bot", text: INTRO_MESSAGE },
  ]);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen((v) => !v);
    setSeen(true);
  };

  // Auto-scroll to newest message when the list updates or the panel opens.
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length, from: "user", text },
      {
        id: prev.length + 1,
        from: "bot",
        // Demo-only canned reply. Replace with a real chat backend
        // (GoHighLevel, Tawk.to, Intercom, etc.) when ready.
        text: "Thanks! A team member will reach out shortly. For a faster reply you can also tap Get a Quote or Call Now.",
      },
    ]);
    setDraft("");
  };

  return (
    <div
      className={cn(
        // Positioned above the mobile sticky CTA (sm:hidden bar is ~56px tall).
        "fixed right-4 z-[55] sm:right-6",
        "bottom-20 sm:bottom-6",
      )}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="dialog"
            aria-modal="false"
            aria-label="Carolina Commercial Cleaning chat"
            className={cn(
              "absolute bottom-16 right-0 flex w-[min(360px,calc(100vw-2rem))]",
              "origin-bottom-right flex-col overflow-hidden rounded-2xl",
              "bg-white shadow-cardHover ring-1 ring-navy-900/10",
            )}
          >
            {/* Header */}
            <div className="relative bg-navy-deep px-4 py-4 text-white">
              <div className="flex items-start gap-3 pr-9">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky2-500 text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-bold leading-tight">
                    Carolina Commercial Cleaning
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate1-200">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                    </span>
                    How can we help?
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex max-h-[320px] flex-col gap-3 overflow-y-auto bg-slate1-50 px-4 py-4"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex",
                    m.from === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug shadow-sm",
                      m.from === "user"
                        ? "rounded-br-md bg-navy-800 text-white"
                        : "rounded-bl-md bg-white text-navy-900 ring-1 ring-navy-900/5",
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="border-t border-navy-100 bg-white px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate1-500">
                Quick options
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openModal();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-navy-700"
                >
                  <CalendarCheck2 className="h-3.5 w-3.5" />
                  Get a Quote
                </button>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sky2-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky2-600"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Now
                </a>
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 transition hover:border-navy-400"
                >
                  Services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-navy-100 bg-white px-3 py-3"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message..."
                aria-label="Type your message"
                className="flex-1 rounded-full border border-navy-200 bg-white px-4 py-2 text-sm text-navy-900 placeholder:text-slate1-400 focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!draft.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 text-white transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-cardHover transition",
          "bg-navy-deep hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky2-400 focus-visible:ring-offset-2",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <ChevronDown className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {!seen && (
          <span
            aria-hidden
            className="absolute right-1 top-1 flex h-3 w-3"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-green ring-2 ring-navy-deep" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
