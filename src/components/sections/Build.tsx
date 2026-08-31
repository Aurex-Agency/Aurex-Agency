"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Frame } from "@/components/ui/Scene";
import { Display, Eyebrow } from "@/components/ui/Type";
import { contact, business } from "@/content/site";

type Answers = { goal: string; blocker: string };
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Chapter fifteen. The conversion.
 *
 * A short qualifying flow rather than a calendar dropped on the reader,
 * which keeps the site's own argument intact through the last screen: the
 * system asks the right questions before it books anything.
 *
 * The steps are real radio groups inside fieldsets, so the whole flow is
 * keyboard and screen reader navigable. Progress is announced, errors are
 * tied to their inputs, and nothing depends on hover.
 */
export function Build() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ goal: "", blocker: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formId = useId();

  const total = contact.steps.length + 1;

  function choose(id: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
    setStep((s) => s + 1);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      ...answers,
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error(json.message ?? "Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="build" data-chapter="Build Mine" className="relative py-28 sm:py-36">
      {/* The Signal resolves into the conversion point. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 size-[60vw] max-w-[760px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.13] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-signal) 0%, transparent 62%)" }}
      />

      <Frame>
        <div className="relative mx-auto max-w-2xl">
          <div className="text-center">
            <Eyebrow className="mb-7">Chapter 15</Eyebrow>
            <Display>{contact.closing}</Display>
            <p className="mx-auto mt-5 max-w-md text-pretty text-base text-linen/65">
              {contact.reassurance}
            </p>
          </div>

          {status === "sent" ? (
            <Sent />
          ) : (
            <div className="mt-12 rounded-2xl border border-bone/12 bg-pit/80 p-6 backdrop-blur-sm sm:p-9">
              {/* Progress. Announced, not just drawn. */}
              <div className="mb-8 flex items-center gap-3">
                {Array.from({ length: total }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 motion-reduce:transition-none ${
                      i <= step ? "bg-signal" : "bg-bone/12"
                    }`}
                  />
                ))}
                <span className="tabular ml-1 text-[11px] text-ash" aria-live="polite">
                  {Math.min(step + 1, total)}/{total}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {step < contact.steps.length ? (
                  <motion.div
                    key={contact.steps[step].id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <fieldset>
                      <legend className="text-xl font-semibold tracking-tight text-bone sm:text-2xl">
                        {contact.steps[step].question}
                      </legend>
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {contact.steps[step].options.map((option) => {
                          const id = `${formId}-${contact.steps[step].id}-${option}`;
                          return (
                            <div key={option}>
                              <input
                                type="radio"
                                id={id}
                                name={contact.steps[step].id}
                                value={option}
                                className="peer sr-only"
                                onChange={() =>
                                  choose(contact.steps[step].id as keyof Answers, option)
                                }
                              />
                              <label
                                htmlFor={id}
                                className="block cursor-pointer rounded-full border border-bone/15 px-5 py-2.5 text-sm text-linen transition-colors duration-200 hover:border-signal/50 hover:text-bone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-signal motion-reduce:transition-none"
                              >
                                {option}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </fieldset>

                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="mt-7 text-sm text-ash underline underline-offset-4 hover:text-linen"
                      >
                        Back
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.form
                    key="details"
                    onSubmit={submit}
                    noValidate
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="text-xl font-semibold tracking-tight text-bone sm:text-2xl">
                      {contact.detailStep.question}
                    </h3>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {contact.detailStep.fields.map((field) => {
                        const id = `${formId}-${field.name}`;
                        const error = errors[field.name];
                        return (
                          <div key={field.name}>
                            <label
                              htmlFor={id}
                              className="mb-1.5 block font-mono text-[10px] tracking-[0.2em] text-ash uppercase"
                            >
                              {field.label}
                            </label>
                            <input
                              id={id}
                              name={field.name}
                              type={field.type}
                              autoComplete={field.autoComplete}
                              required={field.required}
                              aria-invalid={error ? true : undefined}
                              aria-describedby={error ? `${id}-error` : undefined}
                              className={`w-full rounded-lg border bg-void/60 px-4 py-3 text-[15px] text-bone placeholder:text-dim ${
                                error ? "border-alert" : "border-bone/15"
                              }`}
                            />
                            {error && (
                              <p id={`${id}-error`} className="mt-1.5 text-xs text-alert">
                                {error}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Honeypot. Hidden from people, visible to bots. */}
                    <div aria-hidden className="absolute -left-[9999px]">
                      <label htmlFor={`${formId}-website`}>Website</label>
                      <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="inline-flex items-center gap-2.5 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-void transition-colors duration-300 hover:bg-signal-bright disabled:opacity-60 motion-reduce:transition-none"
                      >
                        {status === "sending" ? "Sending" : contact.submit}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="text-sm text-ash underline underline-offset-4 hover:text-linen"
                      >
                        Back
                      </button>
                    </div>

                    <p aria-live="polite" className="mt-4 text-sm text-alert">
                      {status === "error"
                        ? `Something went wrong on our end. Email ${business.email} and I'll pick it up straight away.`
                        : ""}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </Frame>
    </section>
  );
}

function Sent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      className="mt-12 rounded-2xl border border-signal/30 bg-signal/8 p-9 text-center"
    >
      <span className="mx-auto mb-5 block size-2.5 rounded-full bg-signal shadow-[0_0_16px_var(--color-signal)]" />
      <h3 className="text-2xl font-semibold tracking-tight text-bone">Got it.</h3>
      <p className="mx-auto mt-3 max-w-sm text-pretty text-[15px] leading-relaxed text-linen/75">
        I&rsquo;ll reach out shortly to set up the call. If it&rsquo;s urgent, email{" "}
        <a href={`mailto:${business.email}`} className="text-signal underline underline-offset-4">
          {business.email}
        </a>
        .
      </p>
    </motion.div>
  );
}
