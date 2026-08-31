import type { ReactNode } from "react";

/** Small mono label. The site's system voice. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[10px] tracking-[0.3em] text-ash uppercase sm:text-[11px] ${className}`}
    >
      {children}
    </p>
  );
}

/**
 * The storytelling headline. Deliberately large and tightly tracked, and
 * it steps down hard on small screens rather than scaling forever.
 */
export function Display({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Tag
      className={`text-balance font-semibold tracking-[-0.035em] text-bone [font-stretch:95%] text-[clamp(2rem,5.8vw,7rem)] leading-[0.95] ${className}`}
    >
      {children}
    </Tag>
  );
}

export function Lede({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-pretty text-[clamp(1rem,1.5vw,1.625rem)] leading-[1.5] text-linen/75 ${className}`}
    >
      {children}
    </p>
  );
}
