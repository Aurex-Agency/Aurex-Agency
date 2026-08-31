"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * The Aurex motion system.
 *
 * Three levels of motion, per the creative direction:
 *   primary   scroll-scrubbed storytelling (this file)
 *   secondary reveals, counters, locking into place
 *   ambient   grain, drift, glow (CSS only, killed by reduced motion)
 *
 * Everything scroll-linked routes through `useSceneProgress` so that
 * reduced-motion users get the resolved end state of every scene rather
 * than an empty stage.
 */

export const EASE = {
  signal: [0.22, 1, 0.36, 1],
  machine: [0.65, 0, 0.35, 1],
  snap: [0.34, 1.4, 0.64, 1],
} as const;

type Offset = Parameters<typeof useScroll>[0] extends { offset?: infer O } ? O : never;

/**
 * Progress 0 to 1 across a pinned scene.
 *
 * Returns a frozen value of 1 when the user prefers reduced motion, which
 * pairs with the CSS in globals.css that un-pins `.scene` so the section
 * simply renders its finished composition.
 */
export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  offset: Offset = ["start start", "end end"] as Offset,
): MotionValue<number> {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const resolved = useMotionValue(1);
  return reduced ? resolved : scrollYProgress;
}

/** Page-wide progress, used by the Signal rail that threads the whole site. */
export function usePageProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}

/**
 * Maps a scene's progress onto a discrete step index, so a sequence of
 * labels or stages can advance in time with the scroll.
 */
export function useStepIndex(progress: MotionValue<number>, steps: number, pad = 0.08) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useMotionValueEvent(progress, "change", (v) => {
    const usable = Math.min(Math.max((v - pad) / (1 - pad * 2), 0), 0.999);
    setIndex(Math.floor(usable * steps));
  });

  // Reduced motion resolves to the final step rather than an empty stage.
  return reduced ? steps - 1 : index;
}

/**
 * A number that counts as the scene scrubs. Kept out of React state per
 * frame by writing straight to the node, so scrubbing a big figure does
 * not re-render the tree sixty times a second.
 */
export function useScrubbedNumber(
  progress: MotionValue<number>,
  stops: number[],
  format: (n: number) => string,
) {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useTransform(
    progress,
    stops.map((_, i) => i / (stops.length - 1)),
    stops,
  );

  useMotionValueEvent(value, "change", (v) => {
    if (ref.current) ref.current.textContent = format(v);
  });

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(value.get());
  }, [format, value]);

  return ref;
}

/** Fires once when an element first enters the viewport. */
export function useHasEntered(ref: RefObject<Element | null>, margin = "-15%") {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || entered) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setEntered(true),
      { rootMargin: `0px 0px ${margin} 0px` },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref, entered, margin]);

  return entered;
}

export const money = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

export const whole = (n: number) => Math.round(n).toLocaleString("en-US");
