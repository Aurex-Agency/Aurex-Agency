import Image from "next/image";
import mark from "../../../public/brand/aurex-mark.png";

/**
 * The Aurex lockup for a dark interface.
 *
 * The supplied wordmark was drawn for light backgrounds: the left half of
 * AUREX is deep navy and the word AGENCY is mid grey, both of which fall
 * away almost completely on near-black. Rather than wash the brand out
 * with a brightness filter, this pairs the real mark, which is bright
 * cyan and reads perfectly here, with AUREX set in the site's own type.
 *
 * ASSET NEEDED: a reversed logo variant drawn for dark backgrounds. Once
 * that exists, this component becomes a single Image again.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={mark}
        alt=""
        aria-hidden
        priority
        className="h-7 w-auto sm:h-8"
      />
      <span className="text-[15px] font-bold tracking-[0.22em] text-bone uppercase [font-stretch:88%] sm:text-base">
        Aurex
      </span>
    </span>
  );
}

/** The mark on its own, for moments where the full lockup is too wide. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <Image src={mark} alt="" aria-hidden className={`h-10 w-auto ${className}`} />
  );
}
