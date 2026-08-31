"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type MotionValue } from "motion/react";

export type Layer = {
  key: string;
  opacity: MotionValue<number>;
  y?: MotionValue<number>;
  node: ReactNode;
};

/**
 * Two or more pieces of copy that occupy the same space, one replacing the
 * next as the scene scrubs.
 *
 * Layers are overlapped with grid cells rather than absolute positioning,
 * so the container always sizes itself to the tallest layer and nothing
 * below it can be collided into.
 *
 * Under reduced motion the layers stack in normal flow at full opacity
 * instead of crossfading. That matters: a crossfade has no single resting
 * state that contains all of its content, so freezing one would silently
 * drop the others. Stacked, they read as the sequence they always were.
 */
export function Crossfade({
  layers,
  className = "",
  stackedGap = "space-y-4",
}: {
  layers: Layer[];
  className?: string;
  stackedGap?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={`${stackedGap} ${className}`}>
        {layers.map((l) => (
          <div key={l.key}>{l.node}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${className}`}>
      {layers.map((l) => (
        <motion.div
          key={l.key}
          style={{ opacity: l.opacity, y: l.y }}
          className="[grid-area:1/1]"
        >
          {l.node}
        </motion.div>
      ))}
    </div>
  );
}
