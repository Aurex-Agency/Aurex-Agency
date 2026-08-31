"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display } from "@/components/ui/Type";
import { useSceneProgress } from "@/lib/motion";
import { pointField } from "@/lib/field";
import { activation } from "@/content/site";

const SCATTER = pointField(12, 91);

/**
 * Chapter three.
 *
 * The Signal sweeps down the stage and every piece it touches leaves the
 * chaos and takes its place in a column. These are the same twelve pieces
 * that were floating loose in chapter two, which is what makes this feel
 * like a transformation rather than a new section.
 */
export function Activation() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  const sweepY = useTransform(p, [0.05, 0.72], ["-6%", "104%"]);
  const sweepOpacity = useTransform(p, [0.02, 0.1, 0.68, 0.78], [0, 1, 1, 0]);
  const headline = useTransform(p, [0.74, 0.86], [0, 1]);
  const headlineY = useTransform(p, [0.74, 0.86], [24, 0]);

  return (
    <Scene ref={ref} chapter="Connection" track="220svh">
      {/* The sweep. The Signal crossing the disorder. */}
      <motion.div
        aria-hidden
        style={{ y: sweepY, opacity: sweepOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-signal to-transparent shadow-[0_0_24px_var(--color-signal)]"
      />

      <div className="relative z-10 w-full">
        <Frame>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {activation.columns.map((col, ci) => (
              <Column key={col.name} column={col} ci={ci} p={p} />
            ))}
          </div>

          <motion.div style={{ opacity: headline, y: headlineY }} className="mt-14 max-w-3xl">
            <Display>
              Aurex connects the <span className="text-signal">pieces.</span>
            </Display>
            <p className="mt-5 font-mono text-xs tracking-[0.22em] text-ash uppercase sm:text-sm">
              {activation.sub}
            </p>
          </motion.div>
        </Frame>
      </div>
    </Scene>
  );
}

function Column({
  column,
  ci,
  p,
}: {
  column: { name: string; items: string[] };
  ci: number;
  p: MotionValue<number>;
}) {
  // Each column resolves as the sweep reaches it.
  const start = 0.12 + ci * 0.13;
  const headerOpacity = useTransform(p, [start, start + 0.1], [0, 1]);
  const railScale = useTransform(p, [start, start + 0.18], [0, 1]);

  return (
    <div className="relative">
      <motion.div style={{ opacity: headerOpacity }} className="mb-3 flex items-baseline gap-2.5">
        <span className="size-1.5 rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
        <h3 className="font-mono text-[11px] tracking-[0.24em] text-bone uppercase">
          {column.name}
        </h3>
      </motion.div>

      {/* A branch off the main Signal, drawn as the column assembles. */}
      <motion.div
        style={{ scaleX: railScale }}
        className="mb-3 h-px origin-left bg-linear-to-r from-signal/70 to-signal/0"
      />

      <ul className="space-y-2">
        {column.items.map((item, ii) => (
          <Piece key={item} label={item} p={p} start={start + 0.04 + ii * 0.045} index={ci * 3 + ii} />
        ))}
      </ul>
    </div>
  );
}

/** Travels from its scattered position to its place in the system. */
function Piece({
  label,
  p,
  start,
  index,
}: {
  label: string;
  p: MotionValue<number>;
  start: number;
  index: number;
}) {
  const spot = SCATTER[index];
  const fromX = (spot.x - 50) * 3.4;
  const fromY = (spot.y - 50) * 2.6;

  const x = useTransform(p, [start, start + 0.16], [fromX, 0]);
  const y = useTransform(p, [start, start + 0.16], [fromY, 0]);
  const rotate = useTransform(p, [start, start + 0.16], [(spot.seed - 0.5) * 18, 0]);
  const opacity = useTransform(p, [start - 0.06, start, start + 0.16], [0.28, 0.5, 1]);
  const borderOpacity = useTransform(p, [start + 0.08, start + 0.18], [0.1, 0.3]);

  return (
    <motion.li
      style={{ x, y, rotate, opacity }}
      className="relative rounded border border-bone/10 bg-panel/80 px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-linen uppercase"
    >
      <motion.span
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute inset-0 rounded border border-signal"
        aria-hidden
      />
      {label}
    </motion.li>
  );
}
