"use client";

import { motion } from "motion/react";
import { Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { about, business } from "@/content/site";

/**
 * Chapter thirteen.
 *
 * The agency finally introduces itself, and only now, because the reader
 * has already seen what it builds. Kept short on purpose.
 */
export function About() {
  return (
    <section id="about" data-chapter="About" className="relative py-28 sm:py-36">
      <Frame>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
          <div className="max-w-2xl">
            <Eyebrow className="mb-8">Chapter 13</Eyebrow>
            <Display size="sentence">{about.headline}</Display>

            <div className="mt-9 space-y-5">
              {about.body.map((para) => (
                <motion.p
                  key={para.slice(0, 24)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-xl text-pretty text-[17px] leading-[1.65] text-linen/75"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {about.disciplines.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-bone/12 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-linen/70 uppercase"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {about.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={about.photo}
                alt="Kalob Adair, founder of Aurex"
                className="w-full rounded-xl border border-bone/10 object-cover"
                loading="lazy"
              />
            ) : (
              /* ASSET NEEDED: environmental founder photo. See ASSETS.md. */
              <div className="grid aspect-[4/5] w-full place-items-center rounded-xl border border-dashed border-bone/15 bg-linear-to-b from-panel to-pit">
                <div className="px-8 text-center">
                  <span className="mx-auto mb-4 block size-2 rounded-full bg-signal/60" />
                  <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] text-dim uppercase">
                    Founder photo
                    <br />
                    goes here
                  </p>
                </div>
              </div>
            )}

            <p className="mt-5 font-mono text-[10px] leading-relaxed tracking-[0.16em] text-dim uppercase">
              {business.serviceArea}
            </p>
          </div>
        </div>
      </Frame>
    </section>
  );
}
