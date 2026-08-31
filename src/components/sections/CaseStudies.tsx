"use client";

import { motion } from "motion/react";
import { Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { caseStudies } from "@/content/site";

/**
 * Chapter eleven.
 *
 * Same policy as the proof section: only case studies marked `verified`
 * are rendered. With none verified the section removes itself entirely
 * rather than shipping a row of empty cards, so the page reads as finished
 * either way.
 */
export function CaseStudies() {
  const live = caseStudies.filter((c) => c.verified);
  if (live.length === 0) return null;

  return (
    <section id="work" data-chapter="Case Studies" className="relative py-28 sm:py-36">
      <Frame>
        <div className="max-w-3xl">
          <Eyebrow className="mb-8">Chapter 11</Eyebrow>
          <Display>
            The work, <span className="text-signal">in detail.</span>
          </Display>
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {live.map((c, i) => (
            <motion.article
              key={`${c.client}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className="order-2 lg:order-none">
                <p className="font-mono text-[11px] tracking-[0.24em] text-signal uppercase">
                  {c.industry} · {c.location}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-bone">
                  {c.client}
                </h3>

                <dl className="mt-9 space-y-6">
                  {[
                    ["The problem", c.problem],
                    ["What changed", c.change],
                    ["The result", c.result],
                  ].map(([term, detail]) => (
                    <div key={term} className="border-l border-signal/30 pl-5">
                      <dt className="font-mono text-[10px] tracking-[0.22em] text-ash uppercase">
                        {term}
                      </dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-linen/75 text-pretty">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="order-1 lg:order-none">
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.image}
                    alt={`${c.client} website`}
                    className="w-full rounded-xl border border-bone/10"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid aspect-[4/3] w-full place-items-center rounded-xl border border-dashed border-bone/15 bg-pit">
                    <p className="px-6 text-center font-mono text-[10px] tracking-[0.2em] text-dim uppercase">
                      Screenshot needed
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Frame>
    </section>
  );
}
