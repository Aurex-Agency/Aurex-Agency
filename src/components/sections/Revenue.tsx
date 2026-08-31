"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display } from "@/components/ui/Type";
import { useSceneProgress, useScrubbedNumber, money } from "@/lib/motion";
import { revenue } from "@/content/site";

/**
 * Where each piece of the system sits while the number climbs.
 *
 * Positions deliberately avoid the horizontal band the figure occupies.
 * A label crossing the number would make the one piece of hard
 * information on screen harder to read, which is exactly the trade the
 * house rules refuse.
 */
const ORBIT = [
  { x: -30, y: -27 },
  { x: 2, y: -33 },
  { x: 34, y: -27 },
  { x: -42, y: -1 },
  { x: 42, y: -1 },
  { x: -27, y: 24 },
  { x: 28, y: 26 },
];

/**
 * Chapter eight. The climax.
 *
 * An almost empty screen with one enormous number on it. Each piece of the
 * system that arrives makes the number bigger, which is the argument of
 * the whole site compressed into a single image.
 */
export function Revenue() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  const values = revenue.steps.map((s) => s.value);
  const numberRef = useScrubbedNumber(p, [0, ...values, values[values.length - 1]], money);

  const numberScale = useTransform(p, [0.05, 0.62, 0.82], [0.82, 1, 0.66]);
  const numberY = useTransform(p, [0.66, 0.84], [0, -150]);
  const orbitOpacity = useTransform(p, [0.66, 0.76], [1, 0]);
  const glowOpacity = useTransform(p, [0.1, 0.6], [0.05, 0.24]);

  const resolve = useTransform(p, [0.78, 0.87], [0, 1]);
  const resolveY = useTransform(p, [0.78, 0.87], [30, 0]);
  const lineTwo = useTransform(p, [0.87, 0.93], [0, 1]);
  const lineThree = useTransform(p, [0.93, 0.98], [0, 1]);

  const pieces = revenue.steps
    .map((s) => s.piece)
    .filter((x): x is string => Boolean(x))
    .concat(revenue.finalPiece);

  return (
    <Scene ref={ref} chapter="Revenue" track="260svh">
      <motion.div
        aria-hidden
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(circle, var(--color-signal) 0%, transparent 62%)",
        }}
        className="pointer-events-none absolute top-1/2 left-1/2 size-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
      />

      {/* The system assembling around the figure. */}
      <motion.div
        style={{ opacity: orbitOpacity }}
        className="pointer-events-none absolute inset-0 hidden sm:block"
      >
        {pieces.map((piece, i) => (
          <Piece key={piece} label={piece} spot={ORBIT[i]} index={i} p={p} />
        ))}
      </motion.div>

      {/* The figure itself, always the brightest thing on the screen. */}
      <motion.div
        style={{ y: numberY, scale: numberScale }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8"
      >
        <p className="tabular text-center text-[clamp(3rem,12.5vw,13rem)] leading-[0.85] font-bold tracking-[-0.04em] text-bone">
          <span ref={numberRef}>$0</span>
        </p>
      </motion.div>

      {/* Small screens get the pieces as an honest list, not a ring. */}
      <motion.ul
        style={{ opacity: orbitOpacity }}
        className="absolute inset-x-0 top-[62%] flex flex-wrap justify-center gap-2 px-8 sm:hidden"
      >
        {pieces.map((piece) => (
          <li
            key={piece}
            className="rounded border border-signal/25 bg-signal/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-signal uppercase"
          >
            {piece}
          </li>
        ))}
      </motion.ul>

      <motion.div
        style={{ opacity: resolve, y: resolveY }}
        className="absolute inset-x-0 bottom-[10svh]"
      >
        <Frame>
          <div className="text-center">
            <Display>{revenue.line1}</Display>
            <motion.div style={{ opacity: lineTwo }} className="mt-2">
              <Display>
                It&rsquo;s a <span className="text-signal">system.</span>
              </Display>
            </motion.div>
            <motion.p
              style={{ opacity: lineThree }}
              className="mt-7 font-mono text-xs tracking-[0.28em] text-ash uppercase sm:text-sm"
            >
              Aurex builds the system
            </motion.p>
            <motion.p
              style={{ opacity: lineThree }}
              className="mt-5 font-mono text-[10px] tracking-[0.18em] text-dim uppercase"
            >
              {revenue.disclaimer}
            </motion.p>
          </div>
        </Frame>
      </motion.div>
    </Scene>
  );
}

function Piece({
  label,
  spot,
  index,
  p,
}: {
  label: string;
  spot: { x: number; y: number };
  index: number;
  p: MotionValue<number>;
}) {
  const start = 0.1 + index * 0.075;
  const opacity = useTransform(p, [start, start + 0.05], [0, 1]);
  const scale = useTransform(p, [start, start + 0.06], [0.85, 1]);

  return (
    <motion.span
      style={{ opacity, scale, left: `${50 + spot.x}%`, top: `${50 + spot.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/30 bg-signal/8 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] whitespace-nowrap text-signal uppercase lg:text-[11px]"
    >
      {label}
    </motion.span>
  );
}
