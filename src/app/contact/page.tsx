import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { getContent, toRuntimeConfig } from "@/lib/content";
import { t } from "@/lib/props";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.ui.nav_contact,
    description: t(toRuntimeConfig(content), "contact_meta_description"),
  };
}

export default async function ContactPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const { contact, social } = runtime;
  const president = content.committee[0];

  return (
    <>
      <Hero
        runtime={runtime}
        title={t(runtime, "contact_hero_titre")}
        highlight={t(runtime, "contact_hero_highlight")}
        subtitle={t(runtime, "contact_hero_sous_titre")}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
                {t(runtime, "contact_coord_titre")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {t(runtime, "contact_coord_texte")}
              </p>

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t(runtime, "label_email_general")}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-base font-medium text-vcp-blue hover:text-vcp-red"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                {president && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {t(runtime, "label_president")}
                    </dt>
                    <dd className="mt-1 space-y-1">
                      <p className="font-medium text-gray-800">{president.name}</p>
                      <a
                        href={`mailto:${contact.presidentEmail}`}
                        className="block text-sm text-vcp-blue hover:text-vcp-red"
                      >
                        {contact.presidentEmail}
                      </a>
                      <a
                        href={contact.phoneHref}
                        className="block text-sm text-gray-600 hover:text-vcp-red"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t(runtime, "label_tresorier")}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contact.treasurerEmail}`}
                      className="text-sm text-vcp-blue hover:text-vcp-red"
                    >
                      {contact.treasurerEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {t(runtime, "label_salle")}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-600">
                    <strong>{contact.address.name}</strong>
                    <br />
                    {contact.address.street}
                    <br />
                    {contact.address.zip} {contact.address.city}
                    <br />
                    {contact.address.region}, {contact.address.country}
                  </dd>
                </div>
              </dl>

              <div className="mt-8">
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-vcp-blue">
                  {t(runtime, "label_suivez_nous")}
                </h3>
                <div className="mt-4 flex gap-3">
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-vcp-red px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
                  >
                    {t(runtime, "label_facebook")}
                  </a>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-vcp-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-vcp-blue-dark"
                  >
                    {t(runtime, "label_instagram")}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-vcp-red">
                {t(runtime, "contact_form_titre")}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {t(runtime, "contact_form_texte")}
              </p>
              <div className="mt-6">
                <ContactForm contactEmail={contact.email} runtime={runtime} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
            {t(runtime, "contact_inscriptions_titre")}
          </h2>
          <p className="mt-4 text-base text-gray-600">
            {t(runtime, "contact_inscriptions_texte")}
          </p>
          <Link
            href="/inscriptions"
            className="mt-8 inline-flex rounded-full bg-vcp-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
          >
            {t(runtime, "cta_page_inscriptions")}
          </Link>
        </div>
      </section>
    </>
  );
}
