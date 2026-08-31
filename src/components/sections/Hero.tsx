"use client";

import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { Cta, GhostCta } from "@/components/ui/Cta";
import { useSceneProgress } from "@/lib/motion";
import { pointField } from "@/lib/field";
import { hero } from "@/content/site";

const DUST = pointField(46, 21);

/**
 * Chapter one.
 *
 * A single node on a dark field. As the reader scrolls, the node stretches
 * downward and becomes the Signal that runs the rest of the page. Nothing
 * is hidden behind the animation: the headline and both calls to action
 * are fully readable at rest, before any scrolling happens.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  // The copy clears out as the node takes over the screen.
  const copyOpacity = useTransform(p, [0, 0.42], [1, 0]);
  const copyY = useTransform(p, [0, 0.6], [0, -70]);

  // The node stretches into the Signal. It sits on the rail's own axis, so
  // the mark the reader meets first is literally the line that then runs
  // the length of the site.
  const nodeScaleY = useTransform(p, [0.05, 0.78], [1, 90]);
  const nodeOpacity = useTransform(p, [0, 0.78, 1], [1, 1, 0.3]);
  const haloScale = useTransform(p, [0, 0.34], [1, 3]);
  const haloOpacity = useTransform(p, [0, 0.34], [0.7, 0]);
  const hintOpacity = useTransform(p, [0, 0.14], [1, 0]);

  return (
    <Scene ref={ref} id="top" chapter="Signal" track="170svh" stageClassName="items-center">
      {/* Ambient dust. Present at rest so the page feels alive when still. */}
      <div className="ambient pointer-events-none absolute inset-0">
        {DUST.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-bone/25"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.r,
              height: d.r,
              animation: `flicker ${5 + d.seed * 7}s ease-in-out ${d.d}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Warm floor glow. Gives the near-black some depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 left-1/2 size-[85vw] max-w-[1100px] -translate-x-1/2 rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-signal) 0%, transparent 62%)" }}
      />

      {/* The node, and the line it becomes. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-4 -translate-x-1/2 -translate-y-1/2 sm:left-7 lg:left-10">
          <motion.span
            style={{ scale: haloScale, opacity: haloOpacity }}
            className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/25 blur-2xl"
          />
          <motion.span
            style={{ scaleY: nodeScaleY, opacity: nodeOpacity }}
            className="block h-3 w-px origin-center rounded-full bg-signal-bright shadow-[0_0_14px_var(--color-signal)]"
          />
        </div>
      </div>

      <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-10 w-full">
        <Frame>
          <div className="max-w-4xl">
            <Eyebrow className="mb-8 sm:mb-10">{hero.eyebrow}</Eyebrow>

            <Display as="h1">{hero.headline}</Display>

            <p className="mt-7 max-w-xl text-[clamp(1.0625rem,1.6vw,1.75rem)] leading-[1.45] text-linen/70 text-pretty">
              {hero.sub}
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-3.5">
              <Cta href={hero.altCta.href}>{hero.altCta.label}</Cta>
              <GhostCta href={hero.cta.href}>{hero.cta.label}</GhostCta>
            </div>
          </div>
        </Frame>
      </motion.div>

      {/* Scroll affordance. The page asks to be scrolled, it never forces it. */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-dim uppercase">
          Scroll
        </span>
      </motion.div>
    </Scene>
  );
}
