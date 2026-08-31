import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = process.env.OUT ?? "quality/shots";
const WIDTH = Number(process.env.W ?? 1440);
const HEIGHT = Number(process.env.H ?? 900);
const REDUCED = process.env.REDUCED === "1";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
  reducedMotion: REDUCED ? "reduce" : "no-preference",
});

await page.goto(BASE, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
await page.waitForTimeout(1200);

const total = await page.evaluate(() => document.body.scrollHeight);
const chapters = await page.evaluate(() =>
  [...document.querySelectorAll("[data-chapter]")].map((s) => ({
    ch: s.dataset.chapter,
    top: Math.round(s.offsetTop),
    h: Math.round(s.offsetHeight),
  })),
);

console.log(JSON.stringify({ total, screens: (total / HEIGHT).toFixed(1), chapters }, null, 1));

/** Scrolls in real steps so scroll events fire and Motion advances. */
async function scrollTo(y) {
  await page.evaluate(async (target) => {
    const step = () =>
      new Promise((r) => requestAnimationFrame(() => r()));
    const start = window.scrollY;
    const delta = target - start;
    const frames = 18;
    for (let i = 1; i <= frames; i++) {
      window.scrollTo(0, start + (delta * i) / frames);
      await step();
    }
  }, y);
  await page.waitForTimeout(400);
}

// Capture each chapter at the point its scene has played out.
const marks = [];
for (const c of chapters) {
  // Mid-scene for pinned chapters, top for ordinary ones.
  const y = c.h > HEIGHT * 1.5 ? c.top + (c.h - HEIGHT) * 0.72 : c.top;
  marks.push({ name: c.ch, y: Math.round(y) });
}
marks.unshift({ name: "00 Hero", y: 0 });

let i = 0;
for (const m of marks) {
  await scrollTo(m.y);
  const file = `${OUT}/${String(i).padStart(2, "0")}-${m.name.replace(/\W+/g, "-").toLowerCase()}.png`;
  await page.screenshot({ path: file });
  console.log("shot", file);
  i++;
}

// Horizontal overflow check across the whole page.
const overflow = await page.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const bad = [];
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > docW + 1.5 || r.left < -1.5) {
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString?.() ?? "").slice(0, 70),
        left: Math.round(r.left),
        right: Math.round(r.right),
      });
    }
  }
  return { docW, scrollW: document.documentElement.scrollWidth, count: bad.length, sample: bad.slice(0, 8) };
});
console.log("OVERFLOW", JSON.stringify(overflow, null, 1));

await browser.close();
