import Link from "next/link";
import { SectionHeader } from "@/components/ui";
import type { EventsSectionProps, NewsSectionProps } from "@/lib/props";
import { t } from "@/lib/props";
import type { ActivityItem } from "@/lib/types";

function ActivityPreviewRow({ activity }: { activity: ActivityItem }) {
  const title = activity.hasDetailPage ? (
    <Link
      href={`/activites/${activity.slug}`}
      className="hover:text-vcp-red hover:underline"
    >
      {activity.title}
    </Link>
  ) : (
    activity.title
  );

  return (
    <div className="card-lift flex flex-col gap-2 rounded-2xl border border-vcp-dark/5 bg-vcp-cream px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <h3 className="font-display text-lg font-extrabold uppercase leading-tight text-vcp-dark">
        {title}
      </h3>
      <time
        className="shrink-0 text-sm font-bold text-vcp-red"
        dateTime={activity.dateEnd || activity.dateStart || undefined}
      >
        {activity.date}
      </time>
    </div>
  );
}

export function NewsSection({ runtime, news }: NewsSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t(runtime, "home_news_eyebrow")}
          title={t(runtime, "home_news_titre")}
          highlight={t(runtime, "home_news_highlight")}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, i) => (
            <article
              key={item.id}
              data-num={String(i + 1).padStart(2, "0")}
              className="card-watermark card-lift group flex flex-col rounded-2xl border border-vcp-dark/5 bg-white p-6"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-vcp-red px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {item.category}
                </span>
                <time className="text-xs font-medium text-vcp-dark/40">
                  {item.date}
                </time>
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold uppercase leading-tight text-vcp-dark group-hover:text-vcp-red">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-vcp-dark/65">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection({ runtime, activities }: EventsSectionProps) {
  if (!activities.length) return null;

  return (
    <section className="relative bg-white py-16 sm:py-24">
      <div className="absolute left-0 top-0 h-2 w-full bg-vcp-red" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t(runtime, "home_events_eyebrow")}
          title={t(runtime, "home_events_titre")}
          highlight={t(runtime, "home_events_highlight")}
        />

        <div className="mt-10 space-y-3">
          {activities.map((activity) => (
            <ActivityPreviewRow key={activity.id} activity={activity} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-vcp-dark/50">
          <Link
            href="/activites"
            className="font-bold text-vcp-red hover:underline"
          >
            {t(runtime, "nav_activites")} →
          </Link>
        </p>
      </div>
    </section>
  );
}
