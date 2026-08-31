"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { system } from "@/content/site";

/**
 * Chapter nine.
 *
 * Only now, once the reader understands the machine, does the site say
 * what Aurex actually does. Each part is a branch off the Signal rather
 * than a card in a grid, so the services still read as one system.
 *
 * Pacing note: the pinned scenes stop here. After eight chapters of
 * scrubbing, ordinary scrolling is a relief and makes the next full screen
 * moment land harder.
 */
export function System() {
  return (
    <section id="system" data-chapter="The System" className="relative py-28 sm:py-36">
      <Frame>
        <div className="max-w-3xl">
          <Eyebrow className="mb-8">Chapter 09</Eyebrow>
          <Display>
            Five parts. <span className="text-signal">One machine.</span>
          </Display>
          <p className="mt-5 max-w-xl text-pretty text-lg text-linen/65">
            Every piece below works with the others. That is the entire difference between a
            growth system and a stack of subscriptions.
          </p>
        </div>

        <ul className="mt-16 sm:mt-20">
          {system.map((part, i) => (
            <Part key={part.key} part={part} index={i} />
          ))}
        </ul>
      </Frame>
    </section>
  );
}

function Part({
  part,
  index,
}: {
  part: (typeof system)[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
      className="group relative grid gap-5 border-t border-bone/10 py-9 lg:grid-cols-[5rem_minmax(0,20rem)_1fr] lg:items-baseline lg:gap-10"
    >
      {/* The branch connecting this part back to the Signal. */}
      <span
        aria-hidden
        className="absolute top-0 -left-8 hidden h-px w-8 bg-linear-to-r from-signal/0 to-signal/50 sm:-left-14 sm:w-14 lg:-left-24 lg:w-24 xl:-left-32 xl:w-32 xl:block"
      />

      <span className="tabular text-sm text-signal/70">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-bone">
          {part.name}
        </h3>
        <p className="mt-2.5 text-base text-linen/65">{part.promise}</p>
      </div>

      <ul className="flex flex-wrap gap-x-2 gap-y-2 lg:justify-end">
        {part.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-bone/12 bg-panel/60 px-3.5 py-1.5 text-[13px] text-linen/80 transition-colors duration-300 group-hover:border-signal/30 motion-reduce:transition-none"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.li>
  );
}
