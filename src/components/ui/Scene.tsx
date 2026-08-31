import type { CSSProperties, ReactNode, Ref } from "react";

/**
 * A scene is a tall scroll track containing a pinned stage.
 *
 * The user's scroll is never intercepted. The stage simply reads how far
 * through the track the page has travelled and composes itself
 * accordingly, so native scrolling, keyboard paging, and find-in-page all
 * behave normally.
 */
export function Scene({
  id,
  chapter,
  track = "300svh",
  ref,
  children,
  className = "",
  stageClassName = "",
}: {
  id?: string;
  chapter?: string;
  track?: string;
  ref?: Ref<HTMLElement>;
  children: ReactNode;
  className?: string;
  stageClassName?: string;
}) {
  return (
    <section
      id={id}
      ref={ref}
      data-chapter={chapter}
      className={`scene ${className}`}
      style={{ "--scene-track": track } as CSSProperties}
    >
      <div className={`scene-stage ${stageClassName}`}>{children}</div>
    </section>
  );
}

/** Consistent horizontal rhythm. The signal rail owns the left gutter. */
export function Frame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[88rem] px-8 sm:px-14 lg:px-24 xl:px-32 ${className}`}
    >
      {children}
    </div>
  );
}
