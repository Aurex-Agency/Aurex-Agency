/**
 * Renders the social share card once, at build-authoring time, into a
 * static PNG that Next picks up via the opengraph-image file convention.
 * Static beats runtime generation here: the card never changes per
 * request, so there is no reason to pay for it on every crawl.
 */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const mark = readFileSync("public/brand/aurex-mark.png").toString("base64");

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#06080b;font-family:Archivo,sans-serif;
       position:relative;overflow:hidden;color:#f2f5f8}
  .glow{position:absolute;left:-10%;top:20%;width:900px;height:900px;border-radius:50%;
        background:radial-gradient(circle,#00c4e4 0%,transparent 62%);opacity:.16;filter:blur(90px)}
  .rail{position:absolute;left:64px;top:0;bottom:0;width:2px;
        background:linear-gradient(to bottom,transparent,#00c4e4 22%,#00c4e4 78%,transparent)}
  .node{position:absolute;left:58px;top:46%;width:14px;height:14px;border-radius:50%;
        background:#5be8ff;box-shadow:0 0 24px 6px rgba(0,196,228,.75)}
  .wrap{position:absolute;left:132px;top:96px;right:96px;bottom:88px;display:flex;
        flex-direction:column;justify-content:space-between}
  h1{font-size:74px;line-height:.98;letter-spacing:-.035em;font-weight:700;max-width:14ch}
  .accent{color:#00c4e4}
  p{margin-top:26px;font-size:27px;color:#d3d9e0;max-width:26ch;line-height:1.4}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.3em;
           text-transform:uppercase;color:#98a1ac}
  .foot{display:flex;align-items:center;justify-content:space-between}
  .mark{position:absolute;right:70px;top:64px;height:150px;opacity:.9}
</style></head><body>
  <div class="glow"></div><div class="rail"></div><div class="node"></div>
  <img class="mark" src="data:image/png;base64,${mark}">
  <div class="wrap">
    <div>
      <div class="eyebrow">Growth systems for Southern service businesses</div>
      <h1 style="margin-top:26px">Growth doesn't happen <span class="accent">by accident.</span></h1>
      <p>We build the systems that turn attention into revenue.</p>
    </div>
    <div class="foot">
      <span style="display:inline-flex;align-items:center;gap:16px">
        <img src="data:image/png;base64,${mark}" style="height:52px">
        <span style="font-weight:700;font-size:27px;letter-spacing:.22em;color:#f2f5f8">AUREX</span>
      </span>
      <div class="eyebrow">aurexagency.com</div>
    </div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: "src/app/opengraph-image.png" });
await browser.close();
console.log("wrote src/app/opengraph-image.png");
