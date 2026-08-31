"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { Crossfade } from "@/components/ui/Crossfade";
import { useSceneProgress, useStepIndex, useScrubbedNumber, whole } from "@/lib/motion";
import { capture } from "@/content/site";

/**
 * Chapter five.
 *
 * One of the lit dots from the previous chapter detaches and becomes a
 * visitor. Infrastructure assembles around it as it travels, and it comes
 * out the other side as a captured lead.
 */
export function Capture() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);
  const step = useStepIndex(p, capture.stages.length, 0.12);

  const travelY = useTransform(p, [0.12, 0.82], ["0%", "100%"]);
  const frameOpacity = useTransform(p, [0.06, 0.2], [0, 1]);
  const frameScale = useTransform(p, [0.06, 0.24], [0.965, 1]);

  const lineOne = useTransform(p, [0.5, 0.6, 0.76, 0.84], [0, 1, 1, 0]);
  const lineTwo = useTransform(p, [0.84, 0.93], [0, 1]);

  const counterRef = useScrubbedNumber(p, capture.counter, whole);

  return (
    <Scene ref={ref} chapter="Lead Capture" track="210svh">
      <div className="relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1fr_minmax(0,26rem)]">
        <Frame className="lg:pr-0">
          <div className="max-w-2xl">
            <Eyebrow className="mb-8">Chapter 05</Eyebrow>
            <Crossfade
              layers={[
                { key: "setup", opacity: lineOne, node: <Display>{capture.line1}</Display> },
                {
                  key: "payoff",
                  opacity: lineTwo,
                  node: (
                    <Display>
                      We build the <span className="text-signal">infrastructure.</span>
                    </Display>
                  ),
                },
              ]}
            />

            {/* Illustrative counter, labelled honestly. */}
            <div className="mt-10 inline-flex items-baseline gap-4 rounded-lg border border-bone/10 bg-pit/80 px-5 py-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] text-ash uppercase">
                  Leads generated
                </p>
                <p className="tabular mt-1 text-4xl font-bold text-signal">
                  <span ref={counterRef}>0</span>
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
                Illustrative
              </span>
            </div>
          </div>
        </Frame>

        {/* The infrastructure the visitor moves through. */}
        <motion.div
          style={{ opacity: frameOpacity, scale: frameScale }}
          className="mx-8 sm:mx-14 lg:mr-24 lg:ml-0 xl:mr-32"
        >
          <div className="relative overflow-hidden rounded-xl border border-bone/12 bg-linear-to-b from-panel to-pit shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            {/* Browser chrome, kept minimal so it reads as interface not decoration. */}
            <div className="flex items-center gap-1.5 border-b border-bone/8 px-4 py-3">
              <span className="size-2 rounded-full bg-charcoal" />
              <span className="size-2 rounded-full bg-charcoal" />
              <span className="size-2 rounded-full bg-charcoal" />
              <span className="ml-3 h-1.5 w-28 rounded-full bg-charcoal/70" />
            </div>

            <div className="relative grid grid-cols-[auto_1fr] gap-5 p-6">
              {/* The path the visitor travels. */}
              <div className="relative w-3">
                <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-bone/12" />
                <motion.div
                  style={{ top: travelY }}
                  className="absolute left-1/2 -translate-x-1/2"
                >
                  <span className="absolute -inset-1.5 rounded-full bg-signal/30 blur-sm" />
                  <span className="relative block size-2 rounded-full bg-signal-bright shadow-[0_0_10px_var(--color-signal)]" />
                </motion.div>
              </div>

              <ol className="space-y-6">
                {capture.stages.map((stage, i) => {
                  const active = i <= step;
                  return (
                    <li key={stage} className="flex items-center justify-between gap-4">
                      <span
                        className={`font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 motion-reduce:transition-none ${
                          active ? "text-bone" : "text-dim"
                        }`}
                      >
                        {stage}
                      </span>
                      <span
                        className={`h-px flex-1 transition-colors duration-500 motion-reduce:transition-none ${
                          active ? "bg-signal/50" : "bg-bone/8"
                        }`}
                      />
                      <span
                        className={`size-1.5 shrink-0 rounded-full transition-all duration-500 motion-reduce:transition-none ${
                          active
                            ? "bg-signal shadow-[0_0_8px_var(--color-signal)]"
                            : "bg-charcoal"
                        }`}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </Scene>
  );
}
