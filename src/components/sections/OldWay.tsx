"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display } from "@/components/ui/Type";
import { Mark } from "@/components/ui/Wordmark";
import { useSceneProgress } from "@/lib/motion";
import { pointField } from "@/lib/field";
import { oldWay } from "@/content/site";

const SPOTS = pointField(oldWay.pieces.length, 55);

/**
 * Chapter twelve.
 *
 * The bookend to chapter two. All the disconnected pieces return, overlap,
 * and then collapse inward until they resolve into the Aurex mark. The
 * chaos does not get replaced by the system, it becomes the system.
 */
export function OldWay() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  const before = useTransform(p, [0.06, 0.16, 0.4, 0.5], [0, 1, 1, 0]);
  const markOpacity = useTransform(p, [0.62, 0.74], [0, 1]);
  const markScale = useTransform(p, [0.62, 0.78], [0.86, 1]);
  const afterOpacity = useTransform(p, [0.78, 0.88], [0, 1]);

  return (
    <Scene ref={ref} chapter="The Old Way" track="220svh">
      <div className="absolute inset-0">
        {oldWay.pieces.map((piece, i) => (
          <Loose key={piece} label={piece} spot={SPOTS[i]} p={p} index={i} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        {/* Everything converges into the mark. */}
        <motion.div
          style={{ opacity: markOpacity, scale: markScale }}
          className="flex flex-col items-center"
        >
          <Mark className="!h-[clamp(6.5rem,17vw,13rem)]" />
          <span className="mt-6 text-[clamp(1.75rem,5.5vw,4rem)] leading-none font-bold tracking-[0.2em] text-bone uppercase [font-stretch:88%]">
            Aurex
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 w-full">
        <Frame>
          <motion.div style={{ opacity: before }} className="max-w-2xl">
            <Display>{oldWay.before}</Display>
          </motion.div>

          <motion.div style={{ opacity: afterOpacity }} className="mt-[42svh] text-center">
            <p className="font-mono text-sm tracking-[0.3em] text-signal uppercase sm:text-base">
              {oldWay.after.join("  ·  ")}
            </p>
          </motion.div>
        </Frame>
      </div>
    </Scene>
  );
}

function Loose({
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

  // Scatter wide, then collapse to the centre point where the mark forms.
  const x = useTransform(p, [0, 0.4, 0.68], [`${dir * 10}%`, `${dir * 46}%`, "0%"]);
  const y = useTransform(p, [0, 0.4, 0.68], ["0%", `${(spot.seed - 0.5) * 70}%`, "0%"]);
  const scale = useTransform(p, [0.4, 0.68], [1, 0.2]);
  const opacity = useTransform(p, [0.02, 0.14, 0.5, 0.68], [0, 0.85, 0.85, 0]);
  const rotate = useTransform(p, [0, 0.4, 0.68], [0, dir * 9, 0]);

  return (
    <motion.span
      style={{
        left: `${8 + spot.x * 0.84}%`,
        top: `${12 + spot.y * 0.74}%`,
        x,
        y,
        scale,
        opacity,
        rotate,
      }}
      className="absolute rounded border border-bone/12 bg-panel/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] whitespace-nowrap text-ash uppercase backdrop-blur-sm sm:text-[11px]"
    >
      {label}
    </motion.span>
  );
}
