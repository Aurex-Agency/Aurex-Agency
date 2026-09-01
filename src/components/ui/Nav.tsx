"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { Wordmark } from "@/components/ui/Wordmark";
import { nav } from "@/content/site";

/**
 * Navigation stays quiet while the story runs, then firms up once the
 * reader is past the hero, so the conversion path is always one tap away
 * without competing with the scene on screen.
 *
 * The page is long, so small screens get a real jump menu rather than
 * being asked to scroll twenty nine screens to reach a section.
 */
export function Nav() {
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => setLifted(v > 260));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: lifted || open ? "rgba(6,8,11,0.78)" : "rgba(6,8,11,0)",
        borderColor: lifted || open ? "rgba(242,245,248,0.08)" : "rgba(242,245,248,0)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-[88rem] items-center justify-between px-8 py-4 sm:px-14 lg:px-24 xl:px-32">
        <a href="#top" className="rounded-sm" aria-label="Aurex, back to top">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-linen/70 transition-colors duration-200 hover:text-bone motion-reduce:transition-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#build"
            className="rounded-full border border-signal/40 bg-signal/10 px-5 py-2 text-sm font-semibold text-signal transition-colors duration-200 hover:bg-signal hover:text-void motion-reduce:transition-none"
          >
            Build mine
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="nav-jump"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid size-10 place-items-center rounded-full text-linen md:hidden"
          >
            <span className="grid gap-[5px]">
              <span
                className={`block h-px w-4 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-jump"
            ref={panelRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="border-t border-bone/8 px-8 py-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-bone/6 py-3.5 text-[15px] text-linen/80 last:border-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
