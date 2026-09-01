# Deploying to Vercel

Everything below is ready in the repo. This is the order to do it in.

## 1. Import the project

In Vercel, **Add New > Project**, pick `Aurex-Agency/Aurex-Agency`.

Framework preset, build command, output directory and install command are
all detected automatically. Do not override them.

## 2. Add the one environment variable

Before the first deploy, under **Settings > Environment Variables**:

| Name | Value | Environments |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | your GoHighLevel inbound webhook URL | Production, Preview |

**This matters.** Without it the contact form still validates, still shows
the success state, and still returns a clean response, but the lead is only
written to the server log. It will not reach your CRM and you will not know
it happened. Set it before you send anyone to the site.

To get the URL: in GoHighLevel, create a workflow with an **Inbound
Webhook** trigger and copy the URL it gives you. The form posts JSON with
these fields:

```json
{
  "name": "...",
  "company": "...",
  "phone": "...",
  "email": "...",
  "goal": "Leads | Revenue | Brand | Customers | All of it",
  "blocker": "Traffic | Conversion | Follow-up | Marketing strategy | Not sure",
  "submittedAt": "ISO 8601 timestamp"
}
```

## 3. Point the domain

Under **Settings > Domains**, add both:

- `aurexagency.com`  — set this as the primary
- `www.aurexagency.com` — Vercel will offer to redirect it to the apex, accept

The apex is what the site declares as canonical (`business.url` in
`src/content/site.ts`) and what `sitemap.xml` and `robots.txt` advertise.
If you would rather run `www` as primary, change that one value and the
rest follows.

Vercel prints the exact DNS records to add at your registrar. Typically an
`A` record on the apex and a `CNAME` on `www`. HTTPS is automatic once DNS
resolves.

Note the old site was on `www`. Search engines will need to see the
redirect to move over cleanly, which is why adding both matters.

## 4. After the first deploy, check these

- `aurexagency.com/robots.txt` names the sitemap and the apex host
- `aurexagency.com/sitemap.xml` lists the apex URL
- `aurexagency.com/opengraph-image.png` renders the share card
- Paste the URL into a Slack or iMessage draft and confirm the card previews
- Submit the contact form once and confirm the lead arrives in GoHighLevel
- Open it on a real phone and scroll the whole story

## 5. Things deliberately not set up

- **No analytics.** Nothing is tracking visitors yet. Vercel Analytics is
  one toggle in the dashboard if you want it. Anything heavier is worth a
  conversation first, because this page's quality depends on staying light.
- **No cookie banner**, because the site sets no cookies and loads no third
  party scripts. If you add analytics, revisit this.
- **No CSP header.** The other security headers are set in
  `next.config.ts`. A Content Security Policy is worth adding but needs
  testing against the real deploy, so it should not be guessed at now.
