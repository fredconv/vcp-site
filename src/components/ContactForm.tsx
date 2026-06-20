"use client";

import { useState } from "react";

type ContactFormProps = {
  contactEmail: string;
};

export function ContactForm({ contactEmail }: ContactFormProps) {
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
      `Nom: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailSubject = encodeURIComponent(`[VCP] ${subject}`);
    window.location.href = `mailto:${contactEmail}?subject=${mailSubject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border-2 border-vcp-dark/10 bg-vcp-cream/50 px-4 py-3 text-sm outline-none transition-colors focus:border-vcp-red focus:bg-white focus:ring-2 focus:ring-vcp-red/15";

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-vcp-blue/20 bg-vcp-cream p-6 text-center">
        <p className="font-display text-lg font-bold uppercase text-vcp-dark">
          Merci !
        </p>
        <p className="mt-2 text-sm text-vcp-dark/70">
          Votre client mail devrait s&apos;ouvrir. Sinon, écrivez à{" "}
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
          Nouveau message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
            Nom complet
          </label>
          <input id="name" name="name" type="text" required className={inputClass} placeholder="Votre nom" />
        </div>
        <div>
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="votre@email.com" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
          Sujet
        </label>
        <input id="subject" name="subject" type="text" required className={inputClass} placeholder="Inscription, sponsor..." />
      </div>
      <div>
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-vcp-dark/60">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={`${inputClass} resize-y`} placeholder="Votre message..." />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-vcp-red px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-vcp-red-dark hover:shadow-lg sm:w-auto"
      >
        Envoyer
      </button>
    </form>
  );
}
