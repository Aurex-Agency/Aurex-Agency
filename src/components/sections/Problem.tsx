"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { Crossfade } from "@/components/ui/Crossfade";
import { useSceneProgress } from "@/lib/motion";
import { pointField } from "@/lib/field";
import { problem } from "@/content/site";

const SPOTS = pointField(problem.fragments.length, 91);

/**
 * Chapter two.
 *
 * The tools a business already pays for, floating without connection to
 * each other. Chaos rises with the scroll, then stops dead, which is what
 * sets up the Signal cutting through in the next chapter.
 */
export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  const lineOne = useTransform(p, [0.04, 0.16, 0.36, 0.46], [0, 1, 1, 0]);
  const lineOneY = useTransform(p, [0.04, 0.16], [22, 0]);
  const lineTwo = useTransform(p, [0.46, 0.58], [0, 1]);
  const lineTwoY = useTransform(p, [0.46, 0.58], [22, 0]);

  const symptomsOpacity = useTransform(p, [0.68, 0.8], [0, 1]);
  const fieldDim = useTransform(p, [0.62, 0.82], [1, 0.28]);

  return (
    <Scene ref={ref} id="problem" chapter="The Problem" track="220svh">
      {/* The disconnected field. */}
      <motion.div style={{ opacity: fieldDim }} className="absolute inset-0">
        {problem.fragments.map((label, i) => (
          <Fragment key={label} label={label} spot={SPOTS[i]} p={p} index={i} />
        ))}
      </motion.div>

      {/* Keeps the copy readable over the field without hiding it. */}
      <div className="pointer-events-none absolute inset-0 bg-radial-[at_30%_50%] from-void/85 via-void/40 to-transparent" />

      <div className="relative z-10 w-full">
        <Frame>
          <div className="relative max-w-3xl">
            <Eyebrow className="mb-8">Chapter 02</Eyebrow>

            <Crossfade
              layers={[
                {
                  key: "setup",
                  opacity: lineOne,
                  y: lineOneY,
                  node: <Display>{problem.line1}</Display>,
                },
                {
                  key: "payoff",
                  opacity: lineTwo,
                  y: lineTwoY,
                  node: (
                    <Display>
                      They have a <span className="text-signal">system</span> problem.
                    </Display>
                  ),
                },
              ]}
            />

            <motion.ul
              style={{ opacity: symptomsOpacity }}
              className="mt-12 grid max-w-2xl gap-px overflow-hidden rounded-lg border border-bone/10 bg-bone/10 sm:grid-cols-2"
            >
              {problem.symptoms.map((s) => (
                <li key={s.label} className="bg-pit p-5">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-alert uppercase">
                    {s.label}
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-linen/65 text-pretty">
                    {s.detail}
                  </p>
                </li>
              ))}
            </motion.ul>
          </div>
        </Frame>
      </div>
    </Scene>
  );
}

/**
 * One floating tool. Drifts further from centre as the scene progresses,
 * then locks in place when the chaos is allowed to settle.
 */
function Fragment({
  label,
  spot,
  p,
  index,
}: {
  label: string;
  spot: { x: number; y: number; seed: number };
  p: MotionValue<number>;
  index: number;
}) {
  const dir = index % 2 === 0 ? 1 : -1;
  const drift = 26 + spot.seed * 54;

  const x = useTransform(p, [0, 0.62], [0, dir * drift]);
  const y = useTransform(p, [0, 0.62], [0, (spot.seed - 0.5) * drift * 1.8]);
  const rotate = useTransform(p, [0, 0.62], [0, dir * (2 + spot.seed * 7)]);
  const opacity = useTransform(p, [0, 0.1, 0.62], [0, 0.5 + spot.seed * 0.4, 1]);

  return (
    <motion.span
      style={{
        left: `${6 + spot.x * 0.86}%`,
        top: `${10 + spot.y * 0.78}%`,
        x,
        y,
        rotate,
        opacity,
      }}
      className="absolute rounded border border-bone/12 bg-panel/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-ash uppercase backdrop-blur-sm sm:text-[11px]"
    >
      {label}
    </motion.span>
  );
}
