"use client";

import { useState } from "react";
import type { SiteRuntimeConfig } from "@/lib/content";
import { t } from "@/lib/props";

type ContactFormProps = {
  contactEmail: string;
  runtime: SiteRuntimeConfig;
};

export function ContactForm({ contactEmail, runtime }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subject = data.get("subject") as string;
    const message = data.get("message") as string;

    const body = encodeURIComponent(
      `${runtime.ui.form_label_nom}: ${name}\n${runtime.ui.form_label_email}: ${email}\n\n${message}`
    );
    const mailSubject = encodeURIComponent(
      `[${runtime.ui.site_short_name}] ${subject}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${mailSubject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border-2 border-vcp-dark/10 bg-vcp-cream/50 px-4 py-3 text-sm outline-none transition-colors focus:border-vcp-red focus:bg-white focus:ring-2 focus:ring-vcp-red/15";

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-vcp-blue/20 bg-vcp-cream p-6 text-center">
        <p className="font-display text-lg font-bold uppercase text-vcp-dark">
          {t(runtime, "form_success_titre")}
        </p>
        <p className="mt-2 text-sm text-vcp-dark/70">
          {t(runtime, "form_success_texte")}{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-bold text-vcp-red hover:underline"
          >
            {contactEmail}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-bold uppercase tracking-wide text-vcp-red hover:underline"
        >
          {t(runtime, "form_nouveau_message")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
            {t(runtime, "form_label_nom")}
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder={runtime.ui.form_placeholder_nom} />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
            {t(runtime, "form_label_email")}
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder={runtime.ui.form_placeholder_email} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
          {t(runtime, "form_label_sujet")}
        </label>
        <input id="subject" name="subject" type="text" required className={inputClass} placeholder={runtime.ui.form_placeholder_sujet} />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
          {t(runtime, "form_label_message")}
        </label>
        <textarea id="message" name="message" required rows={5} className={`${inputClass} resize-y`} placeholder={runtime.ui.form_placeholder_message} />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-vcp-red px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-vcp-red-dark hover:shadow-lg sm:w-auto"
      >
        {t(runtime, "form_submit")}
      </button>
    </form>
  );
}
