import { NextResponse } from "next/server";

/**
 * Lead intake.
 *
 * Client validation is a convenience, never a guarantee, so everything is
 * revalidated here before it goes anywhere.
 *
 * DELIVERY
 * Set LEAD_WEBHOOK_URL to the GoHighLevel inbound webhook. Without it the
 * route still validates and responds correctly but only records the lead
 * in the server log, which keeps local development working while making
 * an unconfigured production deploy loud rather than silent.
 */

type Payload = Record<string, unknown>;

const MAX = 200;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function validate(body: Payload) {
  const errors: Record<string, string> = {};

  const name = str(body.name);
  const company = str(body.company);
  const phone = str(body.phone);
  const email = str(body.email);
  const goal = str(body.goal);
  const blocker = str(body.blocker);

  if (name.length < 2 || name.length > MAX) errors.name = "Please enter your name.";
  if (company.length < 2 || company.length > MAX) errors.company = "Please enter your business name.";
  // Deliberately permissive: real people write numbers many different ways.
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Please enter a valid phone number.";
  if (!EMAIL.test(email) || email.length > MAX) errors.email = "Please enter a valid email address.";

  return { errors, lead: { name, company, phone, email, goal, blocker } };
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Malformed request." }, { status: 400 });
  }

  // Honeypot. Real people never fill a hidden field.
  if (str(body.website)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { errors, lead } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const record = { ...lead, submittedAt: new Date().toISOString() };
  const endpoint = process.env.LEAD_WEBHOOK_URL;

  if (!endpoint) {
    console.warn("[lead] LEAD_WEBHOOK_URL is not set. Lead was not delivered:", {
      company: record.company,
      submittedAt: record.submittedAt,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    // The lead must never be lost to a downstream outage. Log enough to
    // recover it by hand, without dumping the whole payload.
    console.error("[lead] Delivery failed.", {
      company: record.company,
      email: record.email,
      submittedAt: record.submittedAt,
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { ok: false, message: "We could not submit that. Please call or email instead." },
      { status: 502 },
    );
  }
}
