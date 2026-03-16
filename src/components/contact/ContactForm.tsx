"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const SUPPORT_EMAIL = "support@convertaro.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Convertaro Support Request");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  return (
    <div className="space-y-8 text-text-secondary">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-text-primary">Support email</h2>
        <p className="leading-relaxed">
          Prefer email? Contact us at{" "}
          <a className="text-primary hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Send a message</h2>

        {submitted ? (
          <div className="rounded-xl border border-border/60 bg-white/70 backdrop-blur p-5 shadow-sm">
            <div className="text-sm font-semibold text-text-primary">Message prepared</div>
            <p className="mt-2 text-sm leading-relaxed">
              Your message is ready to send. Click the button below to open your email client.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={mailtoHref}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:from-primary-dark hover:to-[#6D28D9] transition-colors"
              >
                Email Support
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-border/70 px-5 py-2 text-sm font-semibold text-text-primary shadow-sm hover:bg-white hover:shadow-md transition-all"
              >
                Edit message
              </button>
            </div>
          </div>
        ) : (
          <form
            className="grid grid-cols-1 gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-text-primary">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-xl bg-white/80 backdrop-blur border border-border/70 px-4 text-sm text-text-primary outline-none focus:ring-4 focus:ring-primary/15"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-text-primary">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl bg-white/80 backdrop-blur border border-border/70 px-4 text-sm text-text-primary outline-none focus:ring-4 focus:ring-primary/15"
                  placeholder="you@example.com"
                  type="email"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-semibold text-text-primary">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[140px] w-full rounded-xl bg-white/80 backdrop-blur border border-border/70 px-4 py-3 text-sm text-text-primary outline-none focus:ring-4 focus:ring-primary/15"
                placeholder="Tell us how we can help..."
              />
            </label>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-primary-dark hover:to-[#6D28D9] transition-colors"
              >
                Continue
              </button>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-border/70 px-6 py-2.5 text-sm font-semibold text-text-primary shadow-sm hover:bg-white hover:shadow-md transition-all"
              >
                Privacy
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

