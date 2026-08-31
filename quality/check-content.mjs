/**
 * Lists content that is still placeholder, so nothing unfinished is
 * forgotten before launch. Advisory by design: the site renders correctly
 * with placeholders outstanding because the proof and case study sections
 * filter on the `verified` flag rather than trusting the author.
 */
import { readFileSync } from "node:fs";

const src = readFileSync("src/content/site.ts", "utf8");
const findings = [];

const unverified = (src.match(/verified:\s*false/g) ?? []).length;
if (unverified) findings.push(`${unverified} unverified proof or case study entries (they will not render)`);

for (const m of src.matchAll(/REPLACE/g)) void m;
const replaces = (src.match(/REPLACE/g) ?? []).length;
if (replaces) findings.push(`${replaces} REPLACE placeholders in content`);

for (const m of src.matchAll(/TODO\(kalob\):\s*(.+)/g)) findings.push(`TODO: ${m[1].trim()}`);
if (/photo:\s*null/.test(src)) findings.push("Founder photo not supplied (About renders a marked placeholder)");
if (/phone:\s*null/.test(src)) findings.push("Public phone number not set");

if (findings.length === 0) {
  console.log("Content check: nothing outstanding.");
} else {
  console.log("Content still outstanding before launch:\n");
  for (const f of findings) console.log("  -", f);
  console.log("\nNone of these block a deploy. Unverified items are filtered out at render.");
}
