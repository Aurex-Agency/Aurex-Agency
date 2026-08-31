"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, useReducedMotion } from "motion/react";
import { usePageProgress } from "@/lib/motion";

/**
 * The Aurex Signal.
 *
 * One continuous glowing line pinned to the edge of the viewport for the
 * entire page. Its drawn length is the reader's progress through the
 * story, and its head carries the name of the chapter they are inside.
 *
 * This is the object that makes the page one machine instead of fifteen
 * stacked sections. Individual scenes branch their own geometry off it.
 */
export function SignalRail() {
  const reduced = useReducedMotion();
  const progress = usePageProgress();
  const smooth = useSpring(progress, { stiffness: 90, damping: 26, mass: 0.4 });

  const drawn = useTransform(smooth, (v) => Math.max(v, 0.001));
  // Kept clear of both edges so the chapter label beside the head is never
  // clipped by the top or bottom of the viewport.
  const headY = useTransform(smooth, [0, 1], ["8svh", "88svh"]);

  const chapter = useCurrentChapter();

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-4 z-40 w-px sm:left-7 lg:left-10"
    >
      {/* Unlit track. The system exists before the signal reaches it. */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-bone/12 to-transparent" />

      {/* The drawn signal. */}
      <motion.div
        style={{ scaleY: drawn }}
        className="absolute inset-0 origin-top bg-linear-to-b from-signal-deep/0 via-signal/70 to-signal shadow-[0_0_12px_var(--color-signal)]"
      />

      {/* The head, and the chapter it is currently inside. */}
      <motion.div style={{ y: headY }} className="absolute top-0 left-1/2 -translate-x-1/2">
        <div className="relative">
          <span className="absolute -inset-2 rounded-full bg-signal/25 blur-md" />
          <span className="animate-pulse-node absolute -inset-1 rounded-full bg-signal/40" />
          <span className="relative block size-[5px] -translate-x-px rounded-full bg-signal-bright shadow-[0_0_10px_var(--color-signal-bright)]" />
        </div>

        {/* Set vertically so the chapter name lives entirely inside the
            Signal's own gutter and can never collide with the composition,
            at any viewport width. */}
        <div className="absolute top-1/2 left-3.5 hidden -translate-y-1/2 lg:block">
          <motion.span
            key={chapter.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] whitespace-nowrap text-ash uppercase [writing-mode:vertical-rl]"
          >
            <span className="text-signal">{chapter.index}</span>
            <span className="text-dim">/</span>
            {chapter.label}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

/** Reads the nearest `data-chapter` section so the head can name it. */
function useCurrentChapter() {
  const [chapter, setChapter] = useState({ index: "01", label: "Signal" });

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]"),
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const el = hit.target as HTMLElement;
        setChapter({
          index: String(sections.indexOf(el) + 1).padStart(2, "0"),
          label: el.dataset.chapter ?? "",
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return chapter;
}
