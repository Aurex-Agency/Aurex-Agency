import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE ?? "http://localhost:3100";
const browser = await chromium.launch();

for (const [label, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  await page.waitForTimeout(900);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  console.log(`\n=== ${label} ===`);
  console.log("violations:", results.violations.length);
  for (const v of results.violations) {
    console.log(` [${v.impact}] ${v.id}: ${v.help}`);
    for (const n of v.nodes.slice(0, 3)) {
      console.log("   ", n.target.join(" "), "|", (n.failureSummary ?? "").split("\n")[1]?.trim() ?? "");
    }
  }
  await context.close();
}
await browser.close();
