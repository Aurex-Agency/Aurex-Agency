"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display } from "@/components/ui/Type";
import { useSceneProgress, useScrubbedNumber } from "@/lib/motion";
import { speed } from "@/content/site";

const clock = (n: number) => `00:${String(Math.floor(n)).padStart(2, "0")}`;

/**
 * Chapter six.
 *
 * Everything stops and a clock starts. The lead is sitting there. Then the
 * system fires and the whole sequence resolves before the competition has
 * looked at their inbox.
 *
 * This is the chapter that has to be memorable, because response speed is
 * the single thing that decides most of these jobs.
 */
export function Speed() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);
  const reduced = useReducedMotion();

  const timerRef = useScrubbedNumber(p, [0, 0, 14, 14, 14], clock);

  const waitOpacity = useTransform(p, [0.04, 0.12, 0.26, 0.32], [0, 1, 1, 0]);
  const timerScale = useTransform(p, [0.06, 0.2], [0.9, 1]);
  const timerColor = useTransform(
    p,
    [0.28, 0.36, 0.74],
    ["#f4f1ea", "#f0b429", "#f0b429"],
  );
  const frozen = useTransform(p, [0.72, 0.78], [0, 1]);
  const eventsOut = useTransform(p, [0.74, 0.82], [1, 0]);
  const resolve = useTransform(p, [0.8, 0.89], [0, 1]);
  const resolveY = useTransform(p, [0.8, 0.89], [26, 0]);

  return (
    <Scene ref={ref} chapter="Speed to Lead" track="260svh">
      <div className="relative z-10 w-full">
        <Frame>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-20">
            {/* The clock. */}
            <motion.div style={{ scale: timerScale }} className="relative">
              <motion.p
                style={{ opacity: waitOpacity }}
                className="absolute -top-7 left-0 font-mono text-[10px] tracking-[0.28em] text-alert uppercase"
              >
                Lead waiting
              </motion.p>

              <motion.p
                style={{ color: timerColor }}
                className="tabular text-[clamp(4.5rem,14vw,14rem)] leading-[0.82] font-bold tracking-tight"
              >
                <span ref={timerRef}>00:00</span>
              </motion.p>

              <motion.p
                style={{ opacity: frozen }}
                className="mt-4 font-mono text-[10px] tracking-[0.28em] text-live uppercase"
              >
                Booked
              </motion.p>
            </motion.div>

            {/* The right column carries the event log, then hands the same
                space to the payoff copy rather than stacking below it.
                Reduced motion keeps both, in flow, so the six steps the
                system actually performs are never lost. */}
            <div className={reduced ? "space-y-12" : "relative min-h-[26rem]"}>
              <motion.ol
                style={{ opacity: reduced ? 1 : eventsOut }}
                className={`space-y-3 ${reduced ? "" : "absolute inset-x-0 top-0"}`}
              >
                {speed.events.map((e, i) => (
                  <Event key={e.label} event={e} index={i} p={p} />
                ))}
              </motion.ol>

              <motion.div
                style={{ opacity: reduced ? 1 : resolve, y: reduced ? 0 : resolveY }}
                className={reduced ? "" : "absolute inset-0 flex flex-col justify-center"}
              >
                <Display>
                  Speed changes <span className="text-signal">everything.</span>
                </Display>
                <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-linen/70">
                  {speed.sub}
                </p>
                <p className="mt-6 rounded-lg border border-signal/25 bg-signal/8 px-5 py-3.5 text-sm leading-relaxed text-signal-bright text-pretty">
                  {speed.guarantee}
                </p>
              </motion.div>
            </div>
          </div>
        </Frame>
      </div>
    </Scene>
  );
}

function Event({
  event,
  index,
  p,
}: {
  event: { t: string; label: string; detail: string };
  index: number;
  p: MotionValue<number>;
}) {
  // Events land in a burst once the system activates, not evenly spread,
  // so the sequence feels like a machine firing rather than a slideshow.
  const start = 0.3 + index * 0.068;
  const opacity = useTransform(p, [start, start + 0.05], [0, 1]);
  const x = useTransform(p, [start, start + 0.05], [-14, 0]);

  return (
    <motion.li
      style={{ opacity, x }}
      className="flex items-baseline gap-4 border-b border-bone/8 pb-3"
    >
      <span className="tabular w-12 shrink-0 text-xs text-signal">{event.t}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-bone">{event.label}</span>
        <span className="block text-[13px] leading-snug text-linen/55">{event.detail}</span>
      </span>
    </motion.li>
  );
}
