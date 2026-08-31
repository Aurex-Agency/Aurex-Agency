/**
 * Typographic lockup used until the real logo files land.
 *
 * ASSET SWAP: replace the markup below with the supplied Aurex SVG. The
 * gold node is deliberate: it is the same object as the Signal, so the
 * brand mark and the page mechanic are literally the same element.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex size-2 items-center justify-center">
        <span className="absolute size-2 rounded-full bg-signal/30 blur-[3px]" />
        <span className="relative size-[5px] rounded-full bg-signal shadow-[0_0_8px_var(--color-signal)]" />
      </span>
      <span className="text-[15px] font-bold tracking-[0.24em] text-bone uppercase [font-stretch:88%]">
        Aurex
      </span>
    </span>
  );
}
