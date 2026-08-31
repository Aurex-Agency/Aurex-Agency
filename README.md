# Aurex Agency

The Aurex homepage: one continuous growth system being assembled as the
reader scrolls. Attention enters, the system turns it into leads,
customers, and revenue.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion 13

No GSAP. Every scroll sequence is Motion driven and the page is DOM and SVG
throughout, which keeps it fast on the mid range Android phones a lot of
this audience actually uses.

## Running it

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `LEAD_WEBHOOK_URL` | Inbound webhook that receives homepage leads, e.g. GoHighLevel. Without it `/api/lead` still validates and responds correctly but only records the lead in the server log. |

## How the page is built

**Content lives in one file.** `src/content/site.ts` holds every piece of
copy and data. Sections read from it, so changing wording never means
touching a component.

**Scenes, not sections.** A scene is a tall scroll track containing a
pinned stage (`.scene` and `.scene-stage` in `globals.css`). The stage
reads how far through its track the page has travelled and composes itself
accordingly. Nothing is scroll jacked: the wheel, keyboard paging and find
in page all behave normally. Scene length is the `track` prop, and it is
the main dial for pacing.

**One Signal threads the whole page.** `SignalRail` is a single glowing
line pinned to the viewport edge for the entire site, drawn in proportion
to reading progress and labelled with the current chapter. Individual
scenes branch their own geometry off it. It is what makes the page one
machine rather than fifteen stacked sections.

**Motion is one system.** `src/lib/motion.ts` owns scene progress, step
indexing, and scrubbed numbers. Scenes never call `useScroll` directly.

### Reduced motion

`prefers-reduced-motion` is a first class path, not a fallback. Scenes stop
pinning and lay out as ordinary stacked sections showing their resolved
state, which takes the page from about 27 screens to 15. Crossfaded copy
stacks in flow rather than freezing on one layer, so no content is lost.
Verified with `REDUCED=1 npm run shots`.

### The proof policy

Only entries flagged `verified: true` render as claims. An unverified stat
does not appear, and with no verified case studies that section removes
itself from the page entirely. This is enforced in the components, not by
discipline, so an unfinished placeholder cannot be published by accident.

See `ASSETS.md` for what is still outstanding.

## Quality

```bash
npm run verify          # types, lint, production build, content check
npm run a11y            # axe against WCAG 2.2 AA, desktop and mobile
npm run flow            # drives the lead form end to end
npm run shots           # screenshots every chapter
REDUCED=1 npm run shots # the reduced motion composition
W=390 H=844 npm run shots
```

The screenshot and audit harnesses expect a server on `localhost:3100`
(`npm run build && npx next start -p 3100`), or set `BASE`.

Current state: 0 axe violations at 1440x900 and 390x844, no horizontal
overflow at any tested width, production build clean.

## Deploying

Vercel. Set `LEAD_WEBHOOK_URL` in project environment variables before
going live, otherwise leads are logged rather than delivered.
