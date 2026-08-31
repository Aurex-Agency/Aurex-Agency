# Assets Aurex needs to supply

The site is complete and deployable without any of these. Everything below
is currently either a marked placeholder or a section that removes itself,
so nothing false or unfinished is visible to a visitor. Each item makes the
page stronger when it arrives.

Ordered by how much difference each one makes.

---

## 1. Logo and wordmark  (high impact, blocks brand fidelity)

**What:** SVG preferred, or PNG at 1000px+ wide on transparent background.
Horizontal lockup and, if it exists, the mark on its own.

**Where it goes:** `src/components/ui/Wordmark.tsx`, plus the favicon and
the social share image.

**Right now:** the wordmark is set in type with the gold Signal node beside
it. That is a deliberate stand-in, not a guess at your logo. It reads well,
so there is no rush, but it is not your brand.

---

## 2. Founder photo  (high impact, carries the About section)

**What:** an environmental shot of you, portrait orientation, roughly 4:5.
On a job site, at a desk with the CRM open, or in a client's shop is far
better than a studio headshot. Shoot it in daylight against a darker
background so it sits naturally on the near-black page.

**Where it goes:** `about.photo` in `src/content/site.ts`.

**Right now:** a marked placeholder box. The About section is the one place
the site says "one person builds this", and a real photo is what makes that
claim land.

---

## 3. Real numbers for the proof section  (high impact)

**What:** for each result, four things: the figure, the client, what it
measured, and over what window. For example: "14 Google reviews to 61 in
three months, [client], review automation after every completed job."

**Where it goes:** the `proof` array in `src/content/site.ts`. Set
`verified: true` once the number and permission are both confirmed.

**Right now:** the proof section renders four written commitments instead:
the five minute guarantee, month to month terms, account ownership, and
direct access to you. Those are true today and they carry the section on
their own. The moment a verified stat exists, a full screen statistic
sequence appears above them automatically.

The `14 to 61` figure from your old site is in the file already but flagged
unverified, because I could not confirm the client or the exact window.
Confirm those two things and flip the flag.

---

## 4. Client logos and names  (medium impact)

**What:** logo files plus written permission to name each client.

**Where it goes:** a trust strip, which is not built yet because there was
nothing true to put in it. Send the logos and I will build it.

---

## 5. Case study material  (medium impact)

**What:** for each of two to four clients: the situation before, what was
put in place, the measured result, and one image. A screenshot of their
site or a photo of their business both work.

**Where it goes:** the `caseStudies` array in `src/content/site.ts`.

**Right now:** the entire case study section removes itself from the page
because none are verified. The page reads as finished without it. Add one
verified entry and the section appears.

You said you do not have dashboard or site screenshots yet. When you get
them, blur anything sensitive. Real client work beats anything generated,
and a generated screenshot would be a fabricated record, so that is not an
option here.

---

## 6. Public phone number  (small, quick)

**What:** the number you want on the site.

**Where it goes:** `business.phone` in `src/content/site.ts`. Once set I
will add a click to call control, which matters for the contractor audience
more than it does for most.

---

## 7. Social share image  (small)

**What:** 1200x630 image used when the site is shared. I can build this
from the logo once it arrives.

---

## What I can generate for you

Anything abstract and non factual: background textures, diagram artwork,
iconography, the social share card, favicon variants.

What I will not generate: photos of you, photos of clients, client
premises, dashboards, or screenshots. Those are factual claims about real
people and businesses. A generated version would be a fabrication, and your
own positioning is built on not doing that.
