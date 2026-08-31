"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Scene, Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { useSceneProgress } from "@/lib/motion";
import { proof, commitments, type Stat } from "@/content/site";

/**
 * Chapter ten.
 *
 * PROOF POLICY, ENFORCED IN CODE.
 *
 * Only statistics carrying `verified: true` are ever rendered as claims.
 * Everything else is filtered out before it reaches the DOM, so an
 * unfinished placeholder cannot be published as a result by accident.
 *
 * The commitments below carry this section on their own until measured
 * client numbers exist, which means the page is honest and complete today
 * rather than sitting empty waiting on data.
 */
export function Proof() {
  const verified = proof.filter((s) => s.verified);

  return (
    <>
      {verified.length > 0 && <StatSequence stats={verified} />}
      <Commitments hasStats={verified.length > 0} />
    </>
  );
}

/** Full screen interruptions. One number, nothing else on the screen. */
function StatSequence({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const p = useSceneProgress(ref);

  return (
    <Scene ref={ref} id="proof" chapter="Proof" track={`${stats.length * 130}svh`}>
      {stats.map((stat, i) => (
        <StatCard key={stat.label} stat={stat} index={i} total={stats.length} p={p} />
      ))}
    </Scene>
  );
}

function StatCard({
  stat,
  index,
  total,
  p,
}: {
  stat: Stat;
  index: number;
  total: number;
  p: MotionValue<number>;
}) {
  const slot = 1 / total;
  const start = index * slot;
  const opacity = useTransform(
    p,
    [start, start + slot * 0.18, start + slot * 0.8, start + slot],
    [0, 1, 1, 0],
  );
  const y = useTransform(p, [start, start + slot], [40, -40]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 grid place-items-center">
      <Frame>
        <p className="tabular text-center text-[clamp(3.5rem,13vw,10rem)] leading-[0.85] font-bold tracking-[-0.04em] text-signal">
          {stat.value}
        </p>
        <p className="mt-6 text-center text-[clamp(1.125rem,2.4vw,1.75rem)] font-semibold text-bone">
          {stat.label}
        </p>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-linen/55 text-pretty">
          {stat.context}
        </p>
      </Frame>
    </motion.div>
  );
}

/** Risk reversal. What Aurex will put in writing. */
function Commitments({ hasStats }: { hasStats: boolean }) {
  return (
    <section
      id={hasStats ? undefined : "proof"}
      data-chapter={hasStats ? undefined : "Proof"}
      className="relative py-28 sm:py-36"
    >
      <Frame>
        <div className="max-w-3xl">
          <Eyebrow className="mb-8">{hasStats ? "Chapter 10b" : "Chapter 10"}</Eyebrow>
          <Display>
            What I&rsquo;ll put <span className="text-signal">in writing.</span>
          </Display>
          <p className="mt-5 max-w-xl text-pretty text-lg text-linen/65">
            Anyone can promise growth. These are the four things I will commit to before you
            spend a dollar.
          </p>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-2">
          {commitments.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="bg-pit p-7 sm:p-9"
            >
              <span className="tabular text-xs text-signal/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-bone">{c.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-linen/65 text-pretty">
                {c.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </Frame>
    </section>
  );
}
