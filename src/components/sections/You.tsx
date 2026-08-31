"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display } from "@/components/ui/Type";
import { Cta } from "@/components/ui/Cta";
import { useSceneProgress } from "@/lib/motion";
import { you } from "@/content/site";

/**
 * Chapter fourteen.
 *
 * The reader is written into the story. A new node appears labelled YOU
 * and the Signal runs it through the same machine the whole page has been
 * assembling.
 */
export function You() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  const chainOpacity = useTransform(p, [0.68, 0.78], [1, 0]);
  const resolve = useTransform(p, [0.78, 0.88], [0, 1]);
  const resolveY = useTransform(p, [0.78, 0.88], [30, 0]);

  return (
    <Scene ref={ref} chapter="You" track="200svh">
      <div className="relative z-10 w-full">
        <Frame>
          <motion.ol style={{ opacity: chainOpacity }} className="mx-auto w-full max-w-[min(46rem,80vw)]">
            {you.chain.map((label, i) => (
              <Link key={label} label={label} index={i} total={you.chain.length} p={p} />
            ))}
          </motion.ol>

          <motion.div
            style={{ opacity: resolve, y: resolveY }}
            className="absolute inset-0 grid place-items-center"
          >
            <div className="text-center">
              <Display>{you.headline}</Display>
              <div className="mt-10 flex justify-center">
                <Cta href="#build" className="px-9 py-4 text-base">
                  {you.cta}
                </Cta>
              </div>
            </div>
          </motion.div>
        </Frame>
      </div>
    </Scene>
  );
}

function Link({
  label,
  index,
  total,
  p,
}: {
  label: string;
  index: number;
  total: number;
  p: MotionValue<number>;
}) {
  const start = 0.06 + (index / total) * 0.58;
  const opacity = useTransform(p, [start, start + 0.07], [0, 1]);
  const y = useTransform(p, [start, start + 0.07], [18, 0]);
  const connector = useTransform(p, [start + 0.04, start + 0.11], [0, 1]);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <li>
      {!isFirst && (
        <motion.span
          aria-hidden
          style={{ scaleY: connector }}
          className="mx-auto block h-[clamp(1.75rem,3.4vw,4rem)] w-px origin-top bg-linear-to-b from-signal/70 to-signal/25"
        />
      )}
      <motion.p
        style={{ opacity, y }}
        className={`text-center font-mono tracking-[0.24em] uppercase ${
          isFirst || isLast
            ? "text-[clamp(1rem,1.9vw,2rem)] text-signal"
            : "text-[clamp(0.6875rem,1.15vw,1.125rem)] text-linen/70"
        }`}
      >
        {label}
      </motion.p>
    </li>
  );
}
