"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-navy/10 bg-white/95 p-3 shadow-[0_-10px_30px_-12px_rgba(12,42,77,0.18)] backdrop-blur md:hidden"
        >
          <div className="container-tight flex gap-2">
            <a href={`tel:${site.phoneTel}`} className="btn-outline flex-1 !px-3 !py-2.5 text-sm">
              Call Now
            </a>
            <a href="#contact" className="btn-primary flex-1 !px-3 !py-2.5 text-sm">
              Get Estimate
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
