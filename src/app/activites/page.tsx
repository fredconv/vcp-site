import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { splitActivities } from "@/lib/activity-dates";
import { getContent, toRuntimeConfig } from "@/lib/content";
import { pageHeroImage } from "@/lib/image-url";
import { t } from "@/lib/props";
import type { SiteRuntimeConfig } from "@/lib/content";
import type { ActivityItem } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.ui.nav_activites,
    description: t(toRuntimeConfig(content), "activites_meta_description"),
  };
}

function ActivityCard({
  activity,
  runtime,
  past = false,
}: {
  activity: ActivityItem;
  runtime: SiteRuntimeConfig;
  past?: boolean;
}) {
  return (
    <article
      className={`card-lift rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
        past
          ? "border-gray-100 opacity-80"
          : "border-gray-100"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <time
            className={`text-sm font-bold ${past ? "text-gray-500" : "text-vcp-red"}`}
            dateTime={activity.dateEnd || activity.dateStart || undefined}
          >
            {activity.date}
          </time>
          <h3
            className={`font-display mt-1 text-xl font-bold ${
              past ? "text-gray-600" : "text-vcp-red"
            }`}
          >
            {activity.hasDetailPage ? (
              <Link
                href={`/activites/${activity.slug}`}
                className="hover:underline"
              >
                {activity.title}
              </Link>
            ) : (
              activity.title
            )}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {activity.description}
          </p>
          {activity.time && (
            <p className="mt-2 text-sm text-gray-500">
              {t(runtime, "label_horaire")} {activity.time}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">📍 {activity.location}</p>
          {activity.hasDetailPage && (
            <Link
              href={`/activites/${activity.slug}`}
              className="mt-4 inline-block text-sm font-bold uppercase tracking-wide text-vcp-blue hover:text-vcp-red"
            >
              {t(runtime, "cta_voir_evenement")} →
            </Link>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3">
        {!past && activity.inscriptionUrl && (
          <Link
            href={activity.inscriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-vcp-red px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
          >
            {t(runtime, "cta_inscrire")}
          </Link>
        )}
        </div>
      </div>
    </article>
  );
}

function ActivityList({
  activities,
  runtime,
  past = false,
}: {
  activities: ActivityItem[];
  runtime: SiteRuntimeConfig;
  past?: boolean;
}) {
  if (!activities.length) return null;

  return (
    <div className="mt-8 space-y-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          runtime={runtime}
          past={past}
        />
      ))}
    </div>
  );
}

export default async function ActivitesPage() {
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const { upcoming, past } = splitActivities(content.activities);

  return (
    <>
      <Hero
        runtime={runtime}
        title={t(runtime, "activites_hero_titre")}
        highlight={t(runtime, "activites_hero_highlight")}
        subtitle={t(runtime, "activites_hero_sous_titre")}
        imageUrl={pageHeroImage(runtime.ui, "activites")}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-vcp-blue">
            {t(runtime, "saison_courante")}
          </p>

          <h2 className="font-display mt-1 text-2xl font-extrabold uppercase tracking-tight text-vcp-red">
            {t(runtime, "activites_section_a_venir")}
          </h2>

          {upcoming.length > 0 ? (
            <ActivityList activities={upcoming} runtime={runtime} />
          ) : (
            <p className="mt-8 text-base text-gray-500">
              {t(runtime, "activites_aucun_a_venir")}
            </p>
          )}

          {past.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-16">
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-gray-500">
                {t(runtime, "activites_section_termines")}
              </h2>
              <ActivityList activities={past} runtime={runtime} past />
            </div>
          )}

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
