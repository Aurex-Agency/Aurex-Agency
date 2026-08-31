import type { ReactNode } from "react";

/**
 * Primary conversion control. Solid gold, so it is unmistakably the
 * brightest thing on any screen it appears on, matching the Signal.
 */
export function Cta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold tracking-tight text-void transition-[background-color,box-shadow,transform] duration-300 hover:bg-signal-bright hover:shadow-[0_0_36px_-4px_var(--color-signal)] active:scale-[0.98] motion-reduce:transition-none ${className}`}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      >
        <path
          d="M1 8h13M9 3l5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

/** Lower-commitment path. Reads as a control, not a decoration. */
export function GhostCta({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border border-bone/15 px-6 py-3.5 text-sm font-medium text-linen transition-colors duration-300 hover:border-signal/50 hover:text-bone motion-reduce:transition-none ${className}`}
    >
      {children}
    </a>
  );
}
