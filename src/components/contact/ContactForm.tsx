"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";

const SUPPORT_EMAIL = "support@convertaro.com";

type FormStatus = {
  type: "idle" | "success" | "error";
  message?: string;
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Convertaro Support Request");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [name, email, message]);

  function resetStatus() {
    if (status.type !== "idle") {
      setStatus({ type: "idle" });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (company.trim()) {
      setStatus({
        type: "success",
        message: "Thanks. Your message was accepted.",
      });
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({
        type: "error",
        message: "Please complete your name, email, and message before sending.",
      });
      return;
    }

    try {
      window.location.href = mailtoHref;
      setStatus({
        type: "success",
        message: "Your email draft is ready. If your mail app opened, send it there and we will review it as soon as possible.",
      });
    } catch {
      setStatus({
        type: "error",
        message: `We could not open your email app. Please email us directly at ${SUPPORT_EMAIL}.`,
      });
    }
  }

  return (
    <div className="space-y-8 text-text-secondary">
      <section className="space-y-4">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">How to reach us</h2>
          <p className="leading-relaxed">
            Contact us for converter questions, calculator feedback, broken-page reports, or partnership inquiries.
            We read messages regularly and aim to reply as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Mail className="h-4 w-4 text-primary" />
              Contact reasons
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Questions, corrections, feedback, and business inquiries.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              What happens next
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Your message opens in your email app so you can review and send it before it reaches us.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-white/70 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Trust note
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              We review messages regularly and keep the contact flow lightweight and privacy-conscious.
            </p>
          </div>
        </div>

        <p className="leading-relaxed">
          Prefer direct email? Contact us at{" "}
          <a className="text-primary hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text-primary">Send a message</h2>
        {status.type !== "idle" ? (
          <div
            role={status.type === "error" ? "alert" : "status"}
            className={`rounded-xl border p-5 shadow-sm ${
              status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <div className="text-sm font-semibold">
              {status.type === "success" ? "Email draft ready" : "We could not prepare your message"}
            </div>
            <p className="mt-2 text-sm leading-relaxed">{status.message}</p>
          </div>
        ) : null}

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-2" htmlFor="contact-name">
              <span className="text-sm font-semibold text-text-primary">Name</span>
              <input
                id="contact-name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  resetStatus();
                }}
                className="h-11 w-full rounded-xl bg-white/80 backdrop-blur border border-border/70 px-4 text-sm text-text-primary outline-none focus:ring-4 focus:ring-primary/15"
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </label>
            <label className="space-y-2" htmlFor="contact-email">
              <span className="text-sm font-semibold text-text-primary">Email</span>
              <input
                id="contact-email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  resetStatus();
                }}
                className="h-11 w-full rounded-xl bg-white/80 backdrop-blur border border-border/70 px-4 text-sm text-text-primary outline-none focus:ring-4 focus:ring-primary/15"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                required
              />
            </label>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <label className="space-y-2" htmlFor="contact-message">
            <span className="text-sm font-semibold text-text-primary">Message</span>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                resetStatus();
              }}
              className="min-h-[140px] w-full rounded-xl bg-white/80 backdrop-blur border border-border/70 px-4 py-3 text-sm text-text-primary outline-none focus:ring-4 focus:ring-primary/15"
              placeholder="Tell us how we can help..."
              required
            />
          </label>

          <p className="text-xs leading-relaxed text-text-secondary">
            When you submit, we will prepare your message in your email app so you can review it before sending. Please avoid sharing passwords or sensitive personal data.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-primary-dark hover:to-[#6D28D9] transition-colors"
            >
              Prepare email
            </button>
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-border/70 px-6 py-2.5 text-sm font-semibold text-text-primary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Email directly
            </a>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-border/70 px-6 py-2.5 text-sm font-semibold text-text-primary shadow-sm hover:bg-white hover:shadow-md transition-all"
            >
              Privacy
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

