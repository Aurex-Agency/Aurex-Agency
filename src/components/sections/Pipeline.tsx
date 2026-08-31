"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { useSceneProgress, useStepIndex } from "@/lib/motion";
import { pipeline } from "@/content/site";

/**
 * Chapter seven.
 *
 * Vertical scrolling drives the lead horizontally through the pipeline.
 * The figure above it climbs as it goes, so the reader is watching the
 * business get more efficient rather than reading a claim that it does.
 */
export function Pipeline() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);
  const stages = pipeline.stages;
  const step = useStepIndex(p, stages.length, 0.14);

  // The travelling lead. Horizontal on desktop, vertical on small screens,
  // where a sideways journey would be unreadable.
  const travel = useTransform(
    p,
    [0.14, 0.86],
    ["0%", `${((stages.length - 1) / stages.length) * 100}%`],
  );
  const intro = useTransform(p, [0.02, 0.12], [0, 1]);
  const trackDraw = useTransform(p, [0.14, 0.86], [0, 1]);

  return (
    <Scene ref={ref} chapter="Pipeline" track="220svh">
      <div className="relative z-10 w-full">
        <Frame>
          <motion.div style={{ opacity: intro }}>
            <Eyebrow className="mb-8">Chapter 07</Eyebrow>
            <Display size="sentence" className="max-w-3xl">{pipeline.headline}</Display>
            <p className="mt-5 max-w-lg text-pretty text-lg text-linen/65">{pipeline.sub}</p>
          </motion.div>

          {/* The live conversion figure. */}
          <div className="mt-14 flex items-end gap-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.26em] text-ash uppercase">
                Conversion
              </p>
              {/* The last stage is a word, not a percentage. Rendering it at
                  the numeric scale looks like a broken figure, so the type
                  steps down when the value stops being a number. */}
              <p
                className={`mt-1 leading-none font-bold text-signal ${
                  stages[step].rate.endsWith("%")
                    ? "tabular text-[clamp(3rem,8vw,6rem)]"
                    : "text-[clamp(2rem,4.6vw,3.5rem)] tracking-[-0.02em]"
                }`}
              >
                {stages[step].rate}
              </p>
            </div>
            <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
              Illustrative
            </p>
          </div>

          {/* The pipeline itself. */}
          <div className="relative mt-10">
            {/* Track */}
            <div className="absolute top-[7px] right-0 left-0 hidden h-px bg-bone/10 sm:block" />
            <motion.div
              style={{ scaleX: trackDraw }}
              className="absolute top-[7px] right-0 left-0 hidden h-px origin-left bg-signal/60 shadow-[0_0_10px_var(--color-signal)] sm:block"
            />

            <ol className="relative grid gap-6 sm:grid-cols-5 sm:gap-3">
              {stages.map((stage, i) => {
                const active = i <= step;
                return (
                  <li key={stage.name} className="relative">
                    <span
                      className={`mb-4 hidden size-3.5 items-center justify-center rounded-full border transition-colors duration-500 motion-reduce:transition-none sm:flex ${
                        active
                          ? "border-signal bg-signal/25"
                          : "border-charcoal bg-void"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none ${
                          active ? "bg-signal shadow-[0_0_8px_var(--color-signal)]" : "bg-charcoal"
                        }`}
                      />
                    </span>
                    <p
                      className={`font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 motion-reduce:transition-none ${
                        active ? "text-bone" : "text-dim"
                      }`}
                    >
                      {stage.name}
                    </p>
                    <p
                      className={`tabular mt-1.5 text-sm transition-colors duration-500 motion-reduce:transition-none ${
                        active ? "text-signal" : "text-dim"
                      }`}
                    >
                      {stage.rate}
                    </p>
                  </li>
                );
              })}
            </ol>

            {/* The lead in transit. */}
            <motion.div
              style={{ left: travel }}
              className="pointer-events-none absolute top-0 hidden sm:block"
              aria-hidden
            >
              <span className="relative block translate-x-[6px]">
                <span className="absolute -inset-2 rounded-full bg-signal/25 blur-md" />
                <span className="relative block size-3.5 rounded-full bg-signal-bright shadow-[0_0_14px_var(--color-signal)]" />
              </span>
            </motion.div>
          </div>
        </Frame>
      </div>
    </Scene>
  );
}
