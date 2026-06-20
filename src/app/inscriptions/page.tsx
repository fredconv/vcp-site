import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { getContent, toRuntimeConfig } from "@/lib/content";
import { t } from "@/lib/props";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.ui.nav_inscriptions,
    description: t(toRuntimeConfig(content), "inscriptions_meta_description"),
  };
}

export default async function InscriptionsPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const { contact, links } = runtime;

  return (
    <>
      <Hero
        runtime={runtime}
        title={t(runtime, "inscriptions_hero_titre")}
        highlight={t(runtime, "inscriptions_hero_highlight")}
        subtitle={t(runtime, "inscriptions_hero_sous_titre")}
        cta={{
          label: t(runtime, "cta_formulaire"),
          href: links.inscription,
          external: true,
        }}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
                {t(runtime, "inscriptions_titre")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {t(runtime, "inscriptions_intro")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {content.teamsIntro}
              </p>

              <div className="mt-8 space-y-6">
                {content.steps.map((step, i) => (
                  <div key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-vcp-red text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-vcp-red">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-vcp-red">
                {t(runtime, "inscriptions_pratique_titre")}
              </h2>
              <ul className="mt-6 space-y-4 text-sm text-gray-600">
                <li>
                  <strong className="text-vcp-red">{t(runtime, "label_age")}</strong>{" "}
                  {t(runtime, "age_range")}
                </li>
                <li>
                  <strong className="text-vcp-red">{t(runtime, "label_lieu")}</strong>{" "}
                  {contact.address.name}, {contact.address.street},{" "}
                  {contact.address.zip} {contact.address.city}
                </li>
                <li>
                  <strong className="text-vcp-red">{t(runtime, "label_contact")}</strong>{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-vcp-red hover:underline"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <strong className="text-vcp-red">{t(runtime, "label_telephone")}</strong>{" "}
                  <a
                    href={contact.phoneHref}
                    className="text-vcp-red hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              </ul>

              <Link
                href={links.inscription}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center rounded-full bg-vcp-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
              >
                {t(runtime, "cta_formulaire_long")}
              </Link>

              <p className="mt-4 text-center text-xs text-gray-400">
                {t(runtime, "inscriptions_questions")}{" "}
                <Link href="/contact" className="text-vcp-red hover:underline">
                  {t(runtime, "cta_renseignements")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
