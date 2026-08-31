"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { Crossfade } from "@/components/ui/Crossfade";
import { useSceneProgress } from "@/lib/motion";
import { pointField } from "@/lib/field";
import { attention } from "@/content/site";

const BANDS = 7;
const PER_BAND = 22;

/**
 * PERFORMANCE NOTE
 *
 * The obvious way to build this scene is one motion value per dot, which
 * for a convincing crowd means several hundred scroll subscriptions and a
 * main thread that cannot keep up.
 *
 * Instead the crowd is split into horizontal bands. Each band owns a
 * single opacity transform and the dots inside it are ordinary static
 * DOM. Bands resolve in sequence, which reads exactly like a scan passing
 * down the field, at roughly two percent of the cost.
 */
const FIELD = Array.from({ length: BANDS }, (_, b) => {
  const pts = pointField(PER_BAND, 400 + b * 13);
  return {
    noise: pts.filter((p) => p.seed <= 0.78),
    qualified: pts.filter((p) => p.seed > 0.78),
  };
});

/**
 * Chapter four.
 *
 * A field of everyone. The Signal searches it, most of it goes dark, and
 * what stays lit is the handful of people nearby who actually need the
 * work this month.
 */
export function Attention() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  const scanY = useTransform(p, [0.08, 0.62], ["0%", "100%"]);
  const scanOpacity = useTransform(p, [0.04, 0.12, 0.58, 0.68], [0, 1, 1, 0]);

  const lineOne = useTransform(p, [0.06, 0.16, 0.44, 0.54], [0, 1, 1, 0]);
  const lineTwo = useTransform(p, [0.58, 0.7], [0, 1]);
  const lineTwoY = useTransform(p, [0.58, 0.7], [20, 0]);
  const footnote = useTransform(p, [0.78, 0.9], [0, 1]);

  return (
    <Scene ref={ref} chapter="Attention" track="220svh">
      <div className="absolute inset-0 px-6 py-20">
        <div className="relative size-full">
          {FIELD.map((band, i) => (
            <Band key={i} band={band} index={i} p={p} />
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ top: scanY, opacity: scanOpacity }}
        className="pointer-events-none absolute inset-x-0 h-px bg-linear-to-r from-transparent via-signal-bright to-transparent shadow-[0_0_28px_var(--color-signal)]"
      />

      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {attention.channels.map((c, i) => (
          <ChannelLabel key={c} label={c} index={i} total={attention.channels.length} p={p} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-radial-[at_28%_52%] from-void/90 via-void/55 to-transparent" />

      <div className="relative z-10 w-full">
        <Frame>
          <div className="max-w-3xl">
            <Eyebrow className="mb-8">Chapter 04</Eyebrow>
            <Crossfade
              layers={[
                { key: "setup", opacity: lineOne, node: <Display>{attention.line1}</Display> },
                {
                  key: "payoff",
                  opacity: lineTwo,
                  y: lineTwoY,
                  node: (
                    <Display>
                      Getting the <span className="text-signal">right</span> attention is what
                      matters.
                    </Display>
                  ),
                },
              ]}
            />
            <motion.p
              style={{ opacity: footnote }}
              className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-linen/60"
            >
              {attention.footnote}
            </motion.p>
          </div>
        </Frame>
      </div>
    </Scene>
  );
}

/** One horizontal slice of the crowd. Two motion values, however many dots. */
function Band({
  band,
  index,
  p,
}: {
  band: { noise: { x: number; y: number; r: number }[]; qualified: { x: number; y: number; r: number }[] };
  index: number;
  p: MotionValue<number>;
}) {
  const pass = 0.1 + (index / BANDS) * 0.5;
  const noiseOpacity = useTransform(p, [0.02, pass, pass + 0.09], [0.34, 0.36, 0.06]);
  const liveOpacity = useTransform(p, [0.02, pass, pass + 0.09], [0.34, 0.5, 1]);

  const top = (index / BANDS) * 100;
  const height = 100 / BANDS;

  return (
    <>
      <motion.div
        style={{ opacity: noiseOpacity, top: `${top}%`, height: `${height}%` }}
        className="absolute inset-x-0"
      >
        {band.noise.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-bone"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.r * 2.2, height: d.r * 2.2 }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: liveOpacity, top: `${top}%`, height: `${height}%` }}
        className="absolute inset-x-0"
      >
        {band.qualified.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-signal shadow-[0_0_10px_var(--color-signal)]"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.r * 3.4, height: d.r * 3.4 }}
          />
        ))}
      </motion.div>
    </>
  );
}

function ChannelLabel({
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
  const start = 0.1 + index * 0.09;
  const opacity = useTransform(p, [start, start + 0.08, 0.72, 0.8], [0, 0.9, 0.9, 0.25]);
  const top = 12 + (index / (total - 1)) * 70;

  return (
    <motion.span
      style={{ opacity, top: `${top}%` }}
      className="absolute right-[6%] font-mono text-[11px] tracking-[0.26em] text-signal/80 uppercase"
    >
      {label}
    </motion.span>
  );
}
