import { chromium } from "playwright";
const BASE = process.env.BASE ?? "http://localhost:3100";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });

// Reach the conversion flow the way a reader would.
await page.getByRole("link", { name: "Build mine" }).first().click();
await page.waitForTimeout(600);

// The radios are visually hidden and driven by their labels, which is how
// a sighted user interacts with them and how a keyboard user reaches them.
await page.locator('label[for*="goal"]', { hasText: "Revenue" }).click();
await page.waitForTimeout(500);
console.log("step1 ok");

await page.locator('label[for*="blocker"]', { hasText: "Follow-up" }).click();
await page.waitForTimeout(500);
console.log("step2 ok");

// Submit with a bad email first to prove server validation is reachable.
await page.getByLabel("Name").fill("Kalob Adair");
await page.getByLabel("Company").fill("Test Roofing Co");
await page.getByLabel("Phone").fill("662-555-0134");
await page.getByLabel("Email").fill("not-an-email");
await page.getByRole("button", { name: "Book consultation" }).click();
await page.waitForTimeout(900);
const invalidShown = await page.locator("text=Please enter a valid email address.").count();
console.log("server rejected bad email:", invalidShown > 0);

await page.getByLabel("Email").fill("kalob@example.com");
await page.getByRole("button", { name: "Book consultation" }).click();
await page.waitForTimeout(1200);
const success = await page.locator("text=Got it.").count();
console.log("submitted ok:", success > 0);

// Focus visibility on the primary CTA.
await page.keyboard.press("Tab");
console.log("console errors:", errors.length, errors.slice(0, 3));
await browser.close();
