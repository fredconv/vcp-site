import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import {
  getActivitiesWithDetailPages,
  getActivityBySlug,
  getContent,
  toRuntimeConfig,
} from "@/lib/content";
import { splitParagraphs, t } from "@/lib/props";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getContent();
  return getActivitiesWithDetailPages(content).map((activity) => ({
    slug: activity.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const item = getActivityBySlug(content, slug);
  if (!item) return { title: "Activité" };

  return {
    title: item.detail.title,
    description: item.activity.description,
  };
}

export default async function ActiviteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContent();
  const runtime = toRuntimeConfig(content);
  const item = getActivityBySlug(content, slug);

  if (!item) notFound();

  const { activity, detail } = item;
  const paragraphs = splitParagraphs(detail.content);

  return (
    <>
      <Hero
        runtime={runtime}
        title={detail.title}
        subtitle={activity.date}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/activites"
            className="text-sm font-semibold text-vcp-blue hover:text-vcp-red"
          >
            {t(runtime, "activites_retour")}
          </Link>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-gray-600">
            {activity.time && (
              <p>
                <strong className="text-vcp-red">{t(runtime, "label_horaire")}</strong>{" "}
                {activity.time}
              </p>
            )}
            {activity.location && (
              <p>
                <strong className="text-vcp-red">{t(runtime, "label_lieu")}</strong>{" "}
                {activity.location}
              </p>
            )}
          </div>

          <div className="mt-10 space-y-4 text-base leading-relaxed text-gray-600">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {activity.inscriptionUrl && (
            <div className="mt-10">
              <Link
                href={activity.inscriptionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-vcp-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-vcp-red-dark"
              >
                {t(runtime, "cta_inscrire")}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
