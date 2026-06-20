import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { getContent, toRuntimeConfig } from "@/lib/content";
import { t } from "@/lib/props";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.ui.nav_activites,
    description: t(toRuntimeConfig(content), "activites_meta_description"),
  };
}

export default async function ActivitesPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);

  return (
    <>
      <Hero
        runtime={runtime}
        title={t(runtime, "activites_hero_titre")}
        highlight={t(runtime, "activites_hero_highlight")}
        subtitle={t(runtime, "activites_hero_sous_titre")}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-vcp-blue">
            {t(runtime, "saison_courante")}
          </p>
          <h2 className="font-display mt-1 text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
            {t(runtime, "activites_section_titre")}
          </h2>

          <div className="mt-10 space-y-6">
            {content.activities.map((activity) => (
              <article
                key={activity.id}
                className="card-lift rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <time className="text-sm font-bold text-vcp-red">
                      {activity.date}
                    </time>
                    <h3 className="font-display mt-1 text-xl font-bold text-vcp-red">
                      {activity.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {activity.description}
                    </p>
                    {activity.time && (
                      <p className="mt-2 text-sm text-gray-500">
                        {t(runtime, "label_horaire")} {activity.time}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      📍 {activity.location}
                    </p>
                  </div>
                  {activity.inscriptionUrl && (
                    <Link
                      href={activity.inscriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full bg-vcp-red px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
                    >
                      {t(runtime, "cta_inscrire")}
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            {t(runtime, "texte_contact_footer")}{" "}
            <Link href="/contact" className="font-semibold text-vcp-red hover:underline">
              {t(runtime, "cta_contactez_nous")}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-vcp-red py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
            {t(runtime, "activites_lieu_titre")}
          </h2>
          <p className="mt-4 text-base text-white/80">
            {runtime.contact.address.name}
            <br />
            {runtime.contact.address.street}
            <br />
            {runtime.contact.address.zip} {runtime.contact.address.city}
          </p>
        </div>
      </section>
    </>
  );
}
